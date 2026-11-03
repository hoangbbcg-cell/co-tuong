import express from 'express'
import type { ErrorRequestHandler } from 'express'
import { createServer } from 'node:http'
import { adminRouter } from './controllers/adminController'
import { paymentRouter } from './controllers/paymentController'
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
import { FairyStockfishService } from './services/fairyStockfishService'
import { fairyStockfishRouter } from './controllers/fairyStockfishController'
import { registerLobbyPresence } from './controllers/lobbyPresenceController'
import { LobbyPresenceService } from './services/lobbyPresenceService'
import { LobbyPresenceRepository } from './repositories/lobbyPresenceRepository'
import { AccountService,hashCredential } from './services/accountService'
import { accountRouter, cookieValue } from './controllers/accountController'
import { AccountError } from './errors'
import { notificationDeviceRouter } from './controllers/notificationDeviceController'
import { nativeFcmRouter } from './controllers/nativeFcmController'
import { RoomPersistence } from './services/roomPersistence'
import { closeMysqlPool } from './repositories/mysqlPool'
import { groupAvatarDirectory, messageImageDirectory } from './repositories/socialRepository'
import { PersistenceService } from './services/persistenceService'
import { NotificationConnectionTracker } from './services/notificationConnectionTracker'
import { NotificationOfflinePersistence } from './services/notificationOfflinePersistence'
import { NotificationOfflineRepository } from './repositories/notificationOfflineRepository'
import { startNativeFcmOfflineScheduler } from './services/nativeFcmScheduler'

export function createApplication(options: { staticDirectory?: string } = {}) {
  const staticDirectory = options.staticDirectory ?? resolve(fileURLToPath(new URL('..', import.meta.url)), 'dist')
  const app = express()
  app.disable('x-powered-by')
  app.use('/media/group-avatars',express.static(groupAvatarDirectory,{index:false,dotfiles:'deny',setHeaders:res=>{res.setHeader('X-Content-Type-Options','nosniff')}}))

  app.use('/api/account/conversations/:id/images',express.json({limit:'14mb'}))
  app.use('/api/account',express.json({limit:'128kb'}))
  app.use(express.json({ limit: '4kb' }))
  const http = createServer(app)
  const io = new Server<ClientEvents, ServerEvents>(http, { maxHttpBufferSize: 8192 })
  let ready:Promise<void>=Promise.resolve()
  io.use((_socket,next)=>{void ready.then(()=>next()).catch(()=>next(new Error('Trạng thái ván chưa sẵn sàng.')))})
  const databaseEnabled=!!process.env.DB_NAME
  app.get('/media/message-images/:filename',async(req,res)=>{
    const filename=req.params.filename
    if(!databaseEnabled||! /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpg|png|webp|gif)$/i.test(filename))return res.sendStatus(404)
    const id=await account.authenticate(cookieValue(req.headers.cookie,'ct_guest_session'))
    if(!id)throw new AccountError('Cần đăng nhập.',401)
    if(!await persistenceService!.social.canReadImage(id,filename))return res.sendStatus(404)
    res.sendFile(filename,{
      root:messageImageDirectory,
      dotfiles:'deny',
      headers:{'X-Content-Type-Options':'nosniff','Cache-Control':'private, no-store'}
    })
  })
  const account=new AccountService()
  const persistence=databaseEnabled?new RoomPersistence():undefined
  const persistenceService=databaseEnabled?new PersistenceService():undefined
  const service = new RoomService(new RoomRepository(persistence?room=>persistence.observe(room):undefined,persistence?room=>persistence.canStart(room):undefined,persistence?(id,room)=>persistence.hasEnergy(id,room):undefined))
  // Checkpoint 2: no database snapshot restore on server startup.
  if(databaseEnabled) {
    app.use('/api/admin', adminRouter())
    app.use('/api/account',accountRouter(account,undefined,()=>new Set([...persistence!.identities.values()].map(p=>p.id))))
    app.use('/api/payments', paymentRouter(account))
    // HOVANG_FCM_DIAG_V1: temporary authenticated local-only diagnostic.
    app.post('/api/notifications/native/diagnostic', async (req, res) => {
      if (process.env.NODE_ENV === 'production' ||
          process.env.HOVANG_NATIVE_FCM_API !== 'enabled') {
        return res.sendStatus(404)
      }
      const origin = req.headers.origin
      if (!origin || new URL(origin).host !== req.headers.host) {
        return res.sendStatus(403)
      }
      const id = await account.authenticate(
        cookieValue(req.headers.cookie, 'ct_guest_session')
      )
      if (!id) return res.sendStatus(401)
      const allowed = new Set([
        'startup', 'permission_granted', 'permission_denied',
        'token_received', 'channel_ready', 'channel_attempt', 'channel_failed', 'registration_error', 'initialization_error',
        'binding_attempt', 'binding_ok', 'binding_401',
        'binding_403', 'binding_503', 'binding_other',
        'binding_network_error'
      ])
      const stage = req.body?.stage
      if (typeof stage !== 'string' || !allowed.has(stage)) {
        return res.sendStatus(400)
      }
      console.info('[HOVANG FCM DIAG]', stage)
      return res.sendStatus(204)
    })
    app.use('/api/notifications/native', nativeFcmRouter(account))
    app.use('/api/notifications', notificationDeviceRouter(account))
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
  const fairyStockfish = new FairyStockfishService()
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
  if(databaseEnabled)app.use('/api/rooms',async(req,res,next)=>{
    if(req.method!=='POST')return next()
    const id=await account.authenticate(cookieValue(req.headers.cookie,'ct_guest_session'))
    if(!id)throw new AccountError('Cần đăng nhập.',401)
    res.locals.roomCreatorId=id
    const profile=await account.repository.profile(id)
    if(!profile||(!profile.energyUnlimited&&profile.energy<1))throw new AccountError('Không đủ năng lượng.')
    next()
  })
  app.use('/api/rooms', roomRouter(service))
  app.use('/api/pikafish', pikafishRouter(pikafish))
  app.use('/api/fairy-stockfish', fairyStockfishRouter(fairyStockfish))
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
  const interval = registerRoomSockets(io, service,persistence,ready)
  registerLobbyPresence(io, new LobbyPresenceService(new LobbyPresenceRepository()), persistence ? id => persistence.authorize(id) : undefined)
  // Track game-wide authenticated sessions, not lobby presence or room membership.
  // Persistence/notification sending is intentionally NOT enabled in this phase.
  const notificationConnections = new NotificationConnectionTracker()
  // Opt-in only AFTER migration 019 has been run and verified separately.
  const offlinePersistence = databaseEnabled && process.env.HOVANG_NOTIFICATION_OFFLINE_DB_ENABLED === '1'
    ? new NotificationOfflinePersistence(new NotificationOfflineRepository(), () => console.error('Notification offline persistence failed.'))
    : null
  if (databaseEnabled) io.on('connection', socket => {
    const identity = persistence!.identities.get(socket.id)
    if (!identity) return
    offlinePersistence?.observe(identity.id, notificationConnections.connect(identity.id, socket.id))
    socket.on('disconnect', () => {
      const state = notificationConnections.disconnect(socket.id)
      if (state) offlinePersistence?.observe(identity.id, state)
    })
  })
  const challengeInterval = registerChallengeSockets(io, new ChallengeService(new ChallengeRepository(), service),persistence)
  const stopNativeFcmScheduler = startNativeFcmOfflineScheduler()
  http.on('close', () => { stopNativeFcmScheduler(); clearInterval(interval); clearInterval(challengeInterval); pikafish.close(); fairyStockfish.close() })
  return { app, http, io, service, ready, close: async () => { clearInterval(interval); clearInterval(challengeInterval); pikafish.close(); fairyStockfish.close(); await new Promise<void>(resolve => io.close(() => resolve()));await persistence?.waitForCommands();await persistence?.flush();await offlinePersistence?.flush();if(databaseEnabled)await closeMysqlPool() } }
}
