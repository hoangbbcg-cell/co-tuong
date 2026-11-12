import { publicRoom } from '../services/publicRoom'
import { Router } from 'express'
import type { Server } from 'socket.io'
import type { Ack, ClientEvents, RoomSnapshot, ServerEvents } from '../../src/types/room'
import { RoomError, RoomService } from '../services/roomService'
import { RoomPersistence } from '../services/roomPersistence'
import { AccountError } from '../errors'
import { allowSocketEvent } from '../services/socketRateLimiter'

export function roomRouter(service: RoomService) {
  const router = Router()
  router.get('/', (_req, res) => res.json(service.list()))
  router.get('/by-code/:code', (req, res, next) => {
    try { res.json(service.byCode(req.params.code)) } catch (error) { next(error) }
  })
  router.post('/', (req, res, next) => {
    try { res.status(201).json(service.create(req.body?.name, req.body?.minutes, req.body?.turnSeconds, req.body?.province, req.body?.password, req.body?.variant, res.locals.roomCreatorId, req.body?.customFen, req.body?.incrementSeconds)) } catch (error) { next(error) }
  })
  return router
}
export function registerRoomSockets(io: Server<ClientEvents, ServerEvents>, service: RoomService, persistence?:RoomPersistence, ready:Promise<void>=Promise.resolve()) {
  let serialized=Promise.resolve()
  const commandResults=new Map<string,{roomId:string;expiresAt:number}>()
  let lastPersistenceErrorLogAt=0
  const enqueue=(action:()=>Promise<void>)=>{
    serialized=serialized.then(action).catch(()=>{
      const now=Date.now()
      if(now-lastPersistenceErrorLogAt>=5000){
        console.error('Room persistence operation failed; queued writes retained for retry.')
        lastPersistenceErrorLogAt=now
      }
    })
    return serialized
  }
  if(persistence)persistence.waitForCommands=()=>serialized
  const previousPublishedSeats = new Map<string, Set<string>>()
  const lobbyPresenceSignatures = new Map<string, string>()
  const publish = (room: RoomSnapshot) => {
    for(const player of room.players){const identity=persistence?.identities.get(player.id);if(identity)player.userId=identity.id}
    // HOVANG_ROOM_REALTIME_V632
    // Compare connected identities; do not broadcast on clock-only ticks.
    const lobbyConnectedIds = new Set([
      ...room.players
        .filter(player => player.connected !== false)
        .map(player => player.userId ?? player.id),
      ...(room.viewers ?? [])
        .map(viewer => viewer.userId ?? viewer.id),
    ])
    const lobbySignature = JSON.stringify([
      [...lobbyConnectedIds].sort(),
      room.players.length,
      room.viewers?.length ?? 0,
    ])
    if (lobbyPresenceSignatures.get(room.id) !== lobbySignature) {
      lobbyPresenceSignatures.set(room.id, lobbySignature)
      io.emit('rooms:changed')
    }
    for (const member of [...room.players, ...(room.viewers ?? [])]) {
      io.to(member.id).emit('room:state', publicRoom(room, member.id))
    }
    previousPublishedSeats.set(room.id, new Set(room.players.map(member => member.id)))
    for (const id of service.takeEnergyRemovals(room.id)) {
      io.to(id).emit('room:removed', room.id, 'energy')
      void io.sockets.sockets.get(id)?.leave(room.id)
    }
    for (const id of service.takeEnergyNotices(room.id)) io.to(id).emit('room:notice', 'Không đủ năng lượng.')
  }
  io.on('connection', socket => {
    let windowStart = Date.now(), requests = 0
    const run = <T>(ack: Ack<T>, action: () => T|Promise<T>, before?:()=>Promise<void>) => {
      if (typeof ack !== 'function') return
      if (!allowSocketEvent(socket)) { ack({ ok: false, error: 'Thao tác quá nhanh. Vui lòng thử lại.' }); return }
      if (Date.now() - windowStart > 1000) { windowStart = Date.now(); requests = 0 }
      if (++requests > 20) { ack({ ok: false, error: 'Thao tác quá nhanh. Vui lòng thử lại.' }); return }
      const perform=async()=>{try { await persistence?.authorize(socket.id);await persistence?.flush();await before?.(); const data=await action();await persistence?.flush();await persistence?.activity(socket.id);ack({ ok: true, data }) } catch (error) {
        // A rejected command can still have advanced the authoritative clock to timeout.
        const room = service.roomFor(socket.id)
        if (room && error instanceof RoomError) publish(room)
        if (!(error instanceof RoomError)&&!(error instanceof AccountError)) console.error('Room command failed.')
        ack({ ok: false, error: error instanceof RoomError||error instanceof AccountError ? error.message : 'Máy chủ gặp lỗi.' })
      }}
      void enqueue(perform)
    }
    // HOVANG_ROOM_SOUND_V1: server-confirmed room sound cues
    socket.on('room:join', (input, ack) => run(ack, () => {
      const identity=persistence?.identities.get(socket.id)
      const wasSeated = Boolean(service.roomFor(socket.id)?.players.some(member => member.id === socket.id))
      const room = service.join(input?.roomId, socket.id, identity?.name??input?.name, input?.password, input?.asViewer, identity?.id)
      // The default in-memory Socket.IO adapter joins synchronously.
      void socket.join(room.id)
      publish(room)
      if (!wasSeated && room.players.some(member => member.id === socket.id)) socket.to(room.id).emit('room:sound', { kind: 'seat', roomId: room.id, actorId: socket.id })
      return publicRoom(room , socket.id)
    },persistence?async()=>{
      const identity=persistence.identities.get(socket.id)
      if(!identity)throw new AccountError('Cần đăng nhập.',401)
      await persistence.prepareStarts([socket.id],service.roomsForPreparation().filter(room=>room.id===input?.roomId))
      for(const [otherId,other]of persistence.identities)if(otherId!==socket.id&&other.id===identity.id&&service.roomFor(otherId))throw new AccountError('Tài khoản đã ở trong một phòng.')
    }:undefined))
    socket.on('room:leave', ack => run(ack, () => {
      const room = service.leave(socket.id)
      if (room) {
        io.to(room.id).emit('room:sound', { kind: 'leave', roomId: room.id, actorId: socket.id })
        void socket.leave(room.id); publish(room)
      }
      return null
    }))
    socket.on('room:resume', ack => run(ack, async () => {
      const identity=persistence?.identities.get(socket.id)
      if(!identity)return null
      const resumed=service.resume(identity.id,socket.id)
      await persistence?.flush()
      if(!resumed){const finished=service.roomForAccount(identity.id);if(finished)publish(finished);return null}
      void socket.join(resumed.room.id)
      if(resumed.previousSocketId&&resumed.previousSocketId!==socket.id){
        io.to(resumed.previousSocketId).emit('room:control-replaced',resumed.room.id)
        void io.sockets.sockets.get(resumed.previousSocketId)?.leave(resumed.room.id)
      }
      publish(resumed.room)
      return publicRoom(resumed.room , socket.id)
    },persistence?async()=>{await persistence.authorize(socket.id)}:undefined))
    socket.on('game:command', (command, ack) => run(ack, async () => {
      if(command?.commandId!==undefined&&(!/^[\w-]{8,80}$/.test(command.commandId)))throw new RoomError('ID lệnh không hợp lệ.')
      const accountId=persistence?.identities.get(socket.id)?.id??socket.id
      const cacheKey=command?.commandId?`${accountId}:${command.commandId}`:null
      const previous=cacheKey?commandResults.get(cacheKey):undefined
      if(previous){
        if(previous.expiresAt>Date.now()){
          const current=service.roomFor(socket.id)
          if(current?.id===previous.roomId)return publicRoom(current , socket.id)
        }
        commandResults.delete(cacheKey!)
      }
      const alreadyProcessed=!!command?.commandId&&service.isCommandProcessed(accountId,command.commandId)
      if(alreadyProcessed){const existing=service.roomFor(socket.id)??service.roomForAccount(accountId);if(existing)return publicRoom(existing , socket.id)}
      const before = service.roomFor(socket.id)
      const previousMembers = before ? [...before.players, ...(before.viewers ?? [])] : []
      const previousQueued = before?.viewers?.filter(member => member.queued).map(member => member.id) ?? []
      const previousSeats = new Set(before?.players.map(member => member.id) ?? [])
      const room = service.command(socket.id, command)
      // Durable checkpoint and deduplication record must commit before broadcasting or ACK.
      await persistence?.flush()
      const members = new Set([...room.players, ...(room.viewers ?? [])].map(member => member.id))
      for (const member of previousMembers) if (!members.has(member.id) && !service.isEnergyRemoval(room.id, member.id)) {
        io.to(member.id).emit('room:removed', room.id)
        void io.sockets.sockets.get(member.id)?.leave(room.id)
      }
      if (command.type === 'room-settings' && command.queueBlocked) for (const id of previousQueued) io.to(id).emit('room:notice', 'Đã thoát hàng')
      publish(room)
      for (const seated of room.players) if (!previousSeats.has(seated.id)) {
        io.to(room.id).except(seated.id).emit('room:sound', { kind: 'seat', roomId: room.id, actorId: seated.id })
      }
      if(cacheKey){commandResults.set(cacheKey,{roomId:room.id,expiresAt:Date.now()+15*60_000});if(commandResults.size>10_000)commandResults.delete(commandResults.keys().next().value!)}
      return publicRoom(room , socket.id)
    },persistence?async()=>{
      const room=service.roomFor(socket.id)
      if (command?.type === 'ready' || command?.type === 'join-queue') await persistence.canPlay(socket.id,room??undefined)
      if (command?.type === 'moderate' && command.action === 'promote') await persistence.prepareStarts([command.targetId])
      if (room && command?.type === 'ready') await persistence.prepareStarts(room.players.map(player => player.id),[room])
    }:undefined))
    socket.on('room:reaction', (input, ack) => run(ack, () => {
      const reaction = service.reaction(socket.id, input)
      socket.to(reaction.roomId).emit('room:reaction', reaction)
      return null
    }))
    socket.on('chat:send', (text, ack) => run(ack, () => {
      const room = service.chat(socket.id, text)
      publish(room)
      return publicRoom(room , socket.id)
    }))
    socket.on('disconnect', () => {
      const leave=async()=>{const room = service.disconnect(socket.id);persistence?.identities.delete(socket.id);await persistence?.flush();if (room) publish(room)}
      void enqueue(leave)
    })
  })
  let ticking=false
  return setInterval(() => {
    if(ticking)return;ticking=true
    const tick=async()=>{try{await ready;await persistence?.flush();await persistence?.prepareStarts(service.readyPlayerIds(),service.roomsForPreparation().filter(room=>room.game.phase!=='playing'));service.tick().forEach(room => {
      const prior = previousPublishedSeats.get(room.id)
      const newlySeated = prior ? room.players.filter(p => !prior.has(p.id)).map(p => p.id) : []
      publish(room)
      for (const id of newlySeated) io.to(room.id).except(id).emit('room:sound', { kind: 'seat', roomId: room.id, actorId: id })
    });await persistence?.flush()}finally{ticking=false}}
    void enqueue(tick)
  }, 250)
}
