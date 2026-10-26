import { publicRoom } from '../services/publicRoom'
import { Router } from 'express'
import type { Server } from 'socket.io'
import type { Ack, ClientEvents, RoomSnapshot, ServerEvents } from '../../src/types/room'
import { RoomError, RoomService } from '../services/roomService'
import { RoomPersistence } from '../services/roomPersistence'
import { AccountError } from '../errors'

export function roomRouter(service: RoomService) {
  const router = Router()
  router.get('/', (_req, res) => res.json(service.list()))
  router.post('/', (req, res, next) => {
    try { res.status(201).json(service.create(req.body?.name, req.body?.minutes, req.body?.turnSeconds, req.body?.province, req.body?.password, req.body?.variant)) } catch (error) { next(error) }
  })
  return router
}
export function registerRoomSockets(io: Server<ClientEvents, ServerEvents>, service: RoomService, persistence?:RoomPersistence) {
  let serialized=Promise.resolve()
  const enqueue=(action:()=>Promise<void>)=>{serialized=serialized.then(action).catch(()=>{console.error('Room persistence operation failed; queued writes retained for retry.')});return serialized}
  if(persistence)persistence.waitForCommands=()=>serialized
  const publish = (room: RoomSnapshot) => {
    for(const player of room.players)player.userId=persistence?.identities.get(player.id)?.id
    io.to(room.id).emit('room:state', publicRoom(room))
  }
  io.on('connection', socket => {
    let windowStart = Date.now(), requests = 0
    const run = <T>(ack: Ack<T>, action: () => T, before?:()=>Promise<void>) => {
      if (typeof ack !== 'function') return
      if (Date.now() - windowStart > 1000) { windowStart = Date.now(); requests = 0 }
      if (++requests > 20) { ack({ ok: false, error: 'Thao tác quá nhanh. Vui lòng thử lại.' }); return }
      const perform=async()=>{try { await persistence?.authorize(socket.id);await persistence?.flush();await before?.(); const data=action();await persistence?.flush();await persistence?.activity(socket.id);ack({ ok: true, data }) } catch (error) {
        // A rejected command can still have advanced the authoritative clock to timeout.
        const room = service.roomFor(socket.id)
        if (room) publish(room)
        if (!(error instanceof RoomError)&&!(error instanceof AccountError)) console.error('Room command failed.')
        ack({ ok: false, error: error instanceof RoomError||error instanceof AccountError ? error.message : 'Máy chủ gặp lỗi.' })
      }}
      if(persistence)void enqueue(perform);else void perform()
    }
    socket.on('room:join', (input, ack) => run(ack, () => {
      const identity=persistence?.identities.get(socket.id)
      const room = service.join(input?.roomId, socket.id, identity?.name??input?.name, input?.password, input?.asViewer)
      // The default in-memory Socket.IO adapter joins synchronously.
      void socket.join(room.id)
      publish(room)
      return publicRoom(room)
    },persistence?async()=>{
      const identity=persistence.identities.get(socket.id)
      if(!identity)throw new AccountError('Cần đăng nhập.',401)
      const room=service.list().find(r=>r.id===input?.roomId)
      if(room?.phase!=='playing'&&!input?.asViewer)await persistence.canPlay(socket.id)
      for(const [otherId,other]of persistence.identities)if(otherId!==socket.id&&other.id===identity.id&&service.roomFor(otherId))throw new AccountError('Tài khoản đã ở trong một phòng.')
    }:undefined))
    socket.on('room:leave', ack => run(ack, () => {
      const room = service.leave(socket.id)
      if (room) { void socket.leave(room.id); publish(room) }
      return null
    }))
    socket.on('game:command', (command, ack) => run(ack, () => {
      const room = service.command(socket.id, command)
      publish(room)
      return publicRoom(room)
    },persistence&&command?.type==='ready'?async()=>{
      const room=service.roomFor(socket.id)
      if(room)for(const player of room.players)await persistence.canPlay(player.id)
    }:undefined))
    socket.on('room:reaction', (input, ack) => run(ack, () => {
      const reaction = service.reaction(socket.id, input)
      socket.to(reaction.roomId).emit('room:reaction', reaction)
      return null
    }))
    socket.on('chat:send', (text, ack) => run(ack, () => {
      const room = service.chat(socket.id, text)
      publish(room)
      return publicRoom(room)
    }))
    socket.on('disconnect', () => {
      const leave=async()=>{const room = service.leave(socket.id);persistence?.identities.delete(socket.id);await persistence?.flush();if (room) publish(room)}
      if(persistence)void enqueue(leave);else void leave()
    })
  })
  let ticking=false
  return setInterval(() => {
    if(ticking)return;ticking=true
    const tick=async()=>{try{await persistence?.flush();await persistence?.prepareStarts(service.readyPlayerIds());service.tick().forEach(publish);await persistence?.flush()}finally{ticking=false}}
    if(persistence)void enqueue(tick);else void tick()
  }, 250)
}
