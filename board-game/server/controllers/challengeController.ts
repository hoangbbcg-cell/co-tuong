import type { Server } from 'socket.io'
import type { Ack, ClientEvents, ServerEvents } from '../../src/types/room'
import { ChallengeService } from '../services/challengeService'
import { RoomError } from '../services/roomService'

export function registerChallengeSockets(io: Server<ClientEvents, ServerEvents>, service: ChallengeService) {
  const finish = (id: string, senderId: string, targetId: string, message: string) => {
    io.to(senderId).to(targetId).emit('challenge:result', { id, message })
  }
  io.on('connection', socket => {
    let start = Date.now(), requests = 0
    const run = (ack: Ack<null>, action: () => void) => {
      if (typeof ack !== 'function') return
      if (Date.now() - start > 1000) { start = Date.now(); requests = 0 }
      if (++requests > 20) { ack({ ok: false, error: 'Thao tác quá nhanh. Vui lòng thử lại.' }); return }
      try { action(); ack({ ok: true, data: null }) }
      catch (error) { if (!(error instanceof RoomError)) console.error(error); ack({ ok: false, error: error instanceof RoomError ? error.message : 'Máy chủ gặp lỗi.' }) }
    }
    socket.on('presence:update', (profile, ack) => run(ack, () => service.update(socket.id, profile)))
    socket.on('challenge:send', (target, ack) => run(ack, () => {
      const { invite, replaced } = service.send(socket.id, target)
      for (const previous of replaced) io.to(previous.senderId).emit('challenge:result', {
        id: previous.id,
        message: 'Lời mời So tài đã được thay thế bởi lời mời mới.'
      })
      io.to(invite.targetId).emit('challenge:invite', invite)
    }))
    socket.on('challenge:reply', (input, ack) => run(ack, () => {
      const { invite, room, previousRooms } = service.reply(socket.id, input)
      if (!room) { finish(invite.id, invite.senderId, invite.targetId, 'Lời mời So tài đã bị từ chối.'); return }
      for (const previous of previousRooms) io.to(previous.id).emit('room:state', previous)
      for (const id of [invite.senderId, invite.targetId]) {
        const member = io.sockets.sockets.get(id)!
        for (const old of previousRooms) void member.leave(old.id)
        void member.join(room.id)
      }
      finish(invite.id, invite.senderId, invite.targetId, '')
      io.to(room.id).emit('room:state', room)
      io.to(invite.senderId).to(invite.targetId).emit('challenge:accepted', { room })
    }))
    socket.on('disconnect', () => {
      for (const invite of service.remove(socket.id)) finish(invite.id, invite.senderId, invite.targetId, 'Lời mời đã hủy vì người chơi mất kết nối.')
    })
  })
  return setInterval(() => {
    for (const invite of service.expire()) finish(invite.id, invite.senderId, invite.targetId, '')
  }, 1000)
}
