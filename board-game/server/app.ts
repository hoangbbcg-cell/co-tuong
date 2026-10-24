import express from 'express'
import type { ErrorRequestHandler } from 'express'
import { createServer } from 'node:http'
import { adminRouter } from './controllers/adminController'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Server } from 'socket.io'
import type { ClientEvents, ServerEvents } from '../src/types/room'
import { RoomRepository } from './repositories/roomRepository'
import { RoomError, RoomService } from './services/roomService'
import { registerRoomSockets, roomRouter } from './controllers/roomController'
import { ChallengeRepository } from './repositories/challengeRepository'
import { ChallengeService } from './services/challengeService'
import { registerChallengeSockets } from './controllers/challengeController'
import { PikafishService } from './services/pikafishService'
import { pikafishRouter } from './controllers/pikafishController'
import { HovangService } from './services/hovangService'
import { hovangRouter } from './controllers/hovangController'
import { registerLobbyPresence } from './controllers/lobbyPresenceController'
import { LobbyPresenceService } from './services/lobbyPresenceService'
import { LobbyPresenceRepository } from './repositories/lobbyPresenceRepository'
import { AccountService,hashCredential } from './services/accountService'
import { accountRouter, cookieValue } from './controllers/accountController'
import { AccountError } from './errors'
import { RoomPersistence } from './services/roomPersistence'
import { closeMysqlPool } from './repositories/mysqlPool'
import { groupAvatarDirectory, messageImageDirectory } from './repositories/socialRepository'

export function createApplication(options: { staticDirectory?: string } = {}) {
  const staticDirectory = options.staticDirectory ?? resolve(fileURLToPath(new URL('..', import.meta.url)), 'dist')
  const app = express()
  app.disable('x-powered-by')
  app.use('/media/group-avatars',express.static(groupAvatarDirectory,{index:false,dotfiles:'deny',setHeaders:res=>{res.setHeader('X-Content-Type-Options','nosniff')}}))
  app.use('/media/message-images',express.static(messageImageDirectory,{index:false,dotfiles:'deny',setHeaders:res=>{res.setHeader('X-Content-Type-Options','nosniff')}}))
  app.use('/api/account/conversations/:id/images',express.json({limit:'14mb'}))
  app.use('/api/account',express.json({limit:'128kb'}))
  app.use(express.json({ limit: '4kb' }))
  const http = createServer(app)
  const io = new Server<ClientEvents, ServerEvents>(http, { maxHttpBufferSize: 8192 })
  const databaseEnabled=!!process.env.DB_NAME
  const account=new AccountService()
  const persistence=databaseEnabled?new RoomPersistence():undefined
  const service = new RoomService(new RoomRepository(persistence?room=>persistence.observe(room):undefined,persistence?room=>persistence.canStart(room):undefined))
  if(databaseEnabled) {
    app.use('/api/admin', adminRouter())
    app.use('/api/account',accountRouter(account,undefined,()=>new Set([...persistence!.identities.values()].map(p=>p.id))))
    io.use(async(socket,next)=>{
      try {
        const id=await account.authenticate(cookieValue(socket.handshake.headers.cookie,'ct_guest_session'))
        if(!id)return next(new Error('Cần đăng nhập.'))
        const profile=await account.repository.profile(id)
        if(!profile)return next(new Error('Tài khoản không còn hoạt động.'))
        persistence!.identities.set(socket.id,{id,name:profile.displayName,credentialHash:hashCredential(cookieValue(socket.handshake.headers.cookie,'ct_guest_session')!)})
        next()
      }catch{next(new Error('Không xác thực được tài khoản.'))}
    })
  }
  const pikafish = new PikafishService()
  const hovang = new HovangService()
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
  if(databaseEnabled)app.use('/api/rooms',async(req,_res,next)=>{
    if(req.method!=='POST')return next()
    const id=await account.authenticate(cookieValue(req.headers.cookie,'ct_guest_session'))
    if(!id)throw new AccountError('Cần đăng nhập.',401)
    const profile=await account.repository.profile(id)
    if(!profile||profile.energy<1)throw new AccountError('Không đủ năng lượng.')
    next()
  })
  app.use('/api/rooms', roomRouter(service))
  app.use('/api/pikafish', pikafishRouter(pikafish))
  app.use('/api/hovang', hovangRouter(hovang))
  app.use('/api', (_req, res) => res.status(404).json({ error: 'API không tồn tại.' }))
  const onError: ErrorRequestHandler = (error, _req, res, _next) => {
    const badInput = error instanceof RoomError || error instanceof AccountError || error?.type === 'entity.parse.failed'
    const tooLarge = error?.type === 'entity.too.large'
    if (!badInput && !tooLarge) console.error('API operation failed.')
    res.status(error instanceof AccountError?error.status:tooLarge ? 413 : badInput ? 400 : 500).json({ error: error instanceof RoomError||error instanceof AccountError ? error.message : badInput ? 'JSON không hợp lệ.' : tooLarge ? 'Dữ liệu quá lớn.' : 'Máy chủ gặp lỗi.' })
  }
  app.use(onError)
  app.use(express.static(staticDirectory))
  app.get(['/admin', '/admin/', '/mobile-preview', '/mobile-preview/'], (_req, res) => res.sendFile(resolve(staticDirectory, 'index.html')))
  const interval = registerRoomSockets(io, service,persistence)
  registerLobbyPresence(io, new LobbyPresenceService(new LobbyPresenceRepository()))
  const challengeInterval = registerChallengeSockets(io, new ChallengeService(new ChallengeRepository(), service),persistence)
  http.on('close', () => { clearInterval(interval); clearInterval(challengeInterval); pikafish.close(); hovang.close() })
  return { app, http, io, service, close: async () => { clearInterval(interval); clearInterval(challengeInterval); pikafish.close(); hovang.close(); await new Promise<void>(resolve => io.close(() => resolve()));await persistence?.waitForCommands();await persistence?.flush();if(databaseEnabled)await closeMysqlPool() } }
}
