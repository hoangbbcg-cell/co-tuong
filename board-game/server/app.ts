import express from 'express'
import type { ErrorRequestHandler } from 'express'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Server } from 'socket.io'
import type { ClientEvents, ServerEvents } from '../src/types/room'
import { RoomRepository } from './repositories/roomRepository'
import { RoomError, RoomService } from './services/roomService'
import { registerRoomSockets, roomRouter } from './controllers/roomController'
import { PikafishService } from './services/pikafishService'
import { pikafishRouter } from './controllers/pikafishController'

export function createApplication() {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '4kb' }))
  const http = createServer(app)
  const io = new Server<ClientEvents, ServerEvents>(http, { maxHttpBufferSize: 8192 })
  const service = new RoomService(new RoomRepository())
  const pikafish = new PikafishService()
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
  app.use('/api/rooms', roomRouter(service))
  app.use('/api/pikafish', pikafishRouter(pikafish))
  app.use('/api', (_req, res) => res.status(404).json({ error: 'API không tồn tại.' }))
  const onError: ErrorRequestHandler = (error, _req, res, _next) => {
    const badInput = error instanceof RoomError || error?.type === 'entity.parse.failed'
    const tooLarge = error?.type === 'entity.too.large'
    if (!badInput && !tooLarge) console.error(error)
    res.status(tooLarge ? 413 : badInput ? 400 : 500).json({ error: error instanceof RoomError ? error.message : badInput ? 'JSON không hợp lệ.' : tooLarge ? 'Dữ liệu quá lớn.' : 'Máy chủ gặp lỗi.' })
  }
  app.use(onError)
  app.use(express.static(resolve(fileURLToPath(new URL('..', import.meta.url)), 'dist')))
  const interval = registerRoomSockets(io, service)
  http.on('close', () => { clearInterval(interval); pikafish.close() })
  return { app, http, io, service, close: () => { clearInterval(interval); pikafish.close(); return new Promise<void>(resolve => io.close(() => resolve())) } }
}
