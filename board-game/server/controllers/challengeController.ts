import { publicRoom } from '../services/publicRoom'
import type { Server } from 'socket.io'
import type { Ack, ClientEvents, ServerEvents } from '../../src/types/room'
import { ChallengeService } from '../services/challengeService'
import { RoomError } from '../services/roomService'
import { RoomPersistence } from '../services/roomPersistence'
import { AccountRepository } from '../repositories/accountRepository'
import { AccountError } from '../errors'

export function registerChallengeSockets(io: Server<ClientEvents, ServerEvents>, service: ChallengeService,persistence?:RoomPersistence) {
  const finish = (id: string, senderId: string, targetId: string, message: string) => {
    io.to(senderId).to(targetId).emit('challenge:result', { id, message })
  }
  io.on('connection', socket => {
    let start = Date.now(), requests = 0
    const run = (ack: Ack<null>, action: () => void|Promise<void>) => {
      if (typeof ack !== 'function') return
      if (Date.now() - start > 1000) { start = Date.now(); requests = 0 }
      if (++requests > 20) { ack({ ok: false, error: 'Thao tác quá nhanh. Vui lòng thử lại.' }); return }
      void(async()=>{try {await persistence?.authorize(socket.id);await persistence?.flush();await action();await persistence?.flush();ack({ ok: true, data: null }) }
      catch (error) { if (!(error instanceof RoomError)&&!(error instanceof AccountError)) console.error('Challenge operation failed.'); ack({ ok: false, error: error instanceof RoomError||error instanceof AccountError ? error.message : 'Máy chủ gặp lỗi.' }) }})()
    }
    socket.on('presence:update', (profile, ack) => run(ack, async() => {
      if(!persistence){service.update(socket.id,profile);return}
      const id=persistence.identities.get(socket.id)!.id,p=await new AccountRepository().profile(id)
      if(!p)throw new AccountError('Tài khoản không còn hoạt động.',401)
      service.update(socket.id,{...profile,name:p.displayName,elo:p.stats.find(s=>s.variant==='xiangqi')?.elo??1000,avatarIndex:Number(p.avatarCode.replace('avatar-','')),avatarFrameIndex:Number(p.avatarFrameCode.replace('frame-',''))}, id)
    }))
    socket.on('challenge:send', (target, ack) => run(ack, () => {
      let resolved = target
      if (persistence && target && typeof target.id === 'string' && /^\d+$/.test(target.id)) {
        const recipient = [...persistence.identities].find(([connectionId, identity]) =>
          identity.id === target.id && connectionId !== socket.id && io.sockets.sockets.has(connectionId))
        if (!recipient) throw new RoomError('Người chơi không còn trực tuyến.')
        resolved = { ...target, id: recipient[0] }
      }
      const { invite, replaced } = service.send(socket.id, resolved)
      for (const previous of replaced.filter(item => item.senderId !== socket.id)) io.to(previous.senderId).emit('challenge:result', {
        id: previous.id,
        message: 'Lời mời So tài đã được thay thế bởi lời mời mới.'
      })
      io.to(invite.targetId).emit('challenge:invite', invite)
    }))
    socket.on('challenge:reply', (input, ack) => run(ack, async() => {
      if(input?.accepted)await persistence?.canPlay(socket.id)
      const { invite, room, previousRooms } = service.reply(socket.id, input)
      if (!room) {
        io.to(invite.senderId).emit('challenge:result', { id: invite.id, message: input.blockMinutes ? 'Đã bị chặn' : 'Lời mời So tài đã bị từ chối.' })
        io.to(invite.targetId).emit('challenge:result', { id: invite.id, message: '' })
        return
      }
      for (const previous of previousRooms) io.to(previous.id).emit('room:state', publicRoom(previous))
      for (const id of [invite.senderId, invite.targetId]) {
        const member = io.sockets.sockets.get(id)!
        for (const old of previousRooms) void member.leave(old.id)
        void member.join(room.id)
      }
      finish(invite.id, invite.senderId, invite.targetId, '')
      io.to(room.id).emit('room:state', publicRoom(room))
      io.to(invite.senderId).to(invite.targetId).emit('challenge:accepted', { room: publicRoom(room) })
    }))
    socket.on('disconnect', () => {
      for (const invite of service.remove(socket.id)) finish(invite.id, invite.senderId, invite.targetId, 'Lời mời đã hủy vì người chơi mất kết nối.')
    })
  })
  return setInterval(() => {
    for (const invite of service.expire()) finish(invite.id, invite.senderId, invite.targetId, '')
  }, 1000)
}
