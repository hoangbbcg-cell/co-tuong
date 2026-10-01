import { Router } from 'express'
import type { Server } from 'socket.io'
import type { Ack, ClientEvents, RoomSnapshot, ServerEvents } from '../../src/types/room'
import { RoomError, RoomService } from '../services/roomService'

export function roomRouter(service: RoomService) {
  const router = Router()
  router.get('/', (_req, res) => res.json(service.list()))
  router.post('/', (req, res, next) => {
    try { res.status(201).json(service.create(req.body?.name, req.body?.minutes)) } catch (error) { next(error) }
  })
  return router
}
export function registerRoomSockets(io: Server<ClientEvents, ServerEvents>, service: RoomService) {
  const publish = (room: RoomSnapshot) => io.to(room.id).emit('room:state', room)
  io.on('connection', socket => {
    let windowStart = Date.now(), requests = 0
    const run = <T>(ack: Ack<T>, action: () => T) => {
      if (typeof ack !== 'function') return
      if (Date.now() - windowStart > 1000) { windowStart = Date.now(); requests = 0 }
      if (++requests > 20) { ack({ ok: false, error: 'Thao tác quá nhanh. Vui lòng thử lại.' }); return }
      try { ack({ ok: true, data: action() }) } catch (error) {
        // A rejected command can still have advanced the authoritative clock to timeout.
        const room = service.roomFor(socket.id)
        if (room) publish(room)
        if (!(error instanceof RoomError)) console.error(error)
        ack({ ok: false, error: error instanceof RoomError ? error.message : 'Máy chủ gặp lỗi.' })
      }
    }
    socket.on('room:join', (input, ack) => run(ack, () => {
      const room = service.join(input?.roomId, socket.id, input?.name)
      // The default in-memory Socket.IO adapter joins synchronously.
      void socket.join(room.id)
      publish(room)
      return room
    }))
    socket.on('room:leave', ack => run(ack, () => {
      const room = service.leave(socket.id)
      if (room) { void socket.leave(room.id); publish(room) }
      return null
    }))
    socket.on('game:command', (command, ack) => run(ack, () => {
      const room = service.command(socket.id, command)
      publish(room)
      return room
    }))
    socket.on('chat:send', (text, ack) => run(ack, () => {
      const room = service.chat(socket.id, text)
      publish(room)
      return room
    }))
    socket.on('disconnect', () => {
      const room = service.leave(socket.id)
      if (room) publish(room)
    })
  })
  return setInterval(() => service.tick().forEach(publish), 250)
}
