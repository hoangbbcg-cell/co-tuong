import { randomUUID } from 'node:crypto'
import { playerNameError } from '../../src/lib/playerName'
import type { ChallengeProfile } from '../../src/types/challenge'
import { ChallengeRepository } from '../repositories/challengeRepository'
import { RoomError, RoomService } from './roomService'

const CHALLENGE_INVITE_DURATION_MS = 5000

export class ChallengeService {
  constructor(private repository: ChallengeRepository, private rooms: RoomService) {}
  update(id: string, value: ChallengeProfile) {
    if (!value || typeof value.name !== 'string' || !value.name.trim() || value.name.trim().length > 24
      || !Number.isInteger(value.avatarIndex) || value.avatarIndex < 0 || value.avatarIndex > 14
      || !Number.isInteger(value.avatarFrameIndex) || value.avatarFrameIndex < 0 || value.avatarFrameIndex > 3
      || !Number.isFinite(value.elo) || value.elo < 0 || value.elo > 100000 || typeof value.localBusy !== 'boolean') {
      throw new RoomError('Thông tin người chơi không hợp lệ.')
    }
    this.repository.profiles.set(id, { name: value.name.trim(), avatarIndex: value.avatarIndex,
      avatarFrameIndex: value.avatarFrameIndex, elo: value.elo, localBusy: value.localBusy })
  }
  private available(id: string) {
    const profile = this.repository.profiles.get(id)
    if (!profile) throw new RoomError('Người chơi không còn trực tuyến.')
    const room = this.rooms.roomFor(id)
    const player = room?.players.find(member => member.id === id)
    if (profile.localBusy || (player && ((player.ready && room?.game.phase === 'ready') || room?.game.phase === 'playing'))) {
      throw new RoomError('Người chơi đang chơi.')
    }
    return profile
  }
  send(senderId: string, target: { id?: string; name: string }) {
    const sender = this.available(senderId)
    if (!target || typeof target.name !== 'string' || target.name.length > 24) throw new RoomError('Người chơi không hợp lệ.')
    const matches = [...this.repository.profiles].filter(([id, profile]) => id !== senderId && profile.name === target.name.trim())
    const targetId = target.id || (matches.length === 1 ? matches[0][0] : undefined)
    if (!targetId || targetId === senderId) throw new RoomError(matches.length > 1 ? 'Tên người chơi bị trùng. Hãy mở hồ sơ từ phòng của người đó.' : 'Người chơi không còn trực tuyến.')
    this.available(targetId)
    const replaced = [...this.repository.invites.values()].filter(invite => invite.targetId === targetId)
    replaced.forEach(invite => this.repository.invites.delete(invite.id))
    const invite = { id: randomUUID(), senderId, targetId, sender: { ...sender }, expiresAt: Date.now() + CHALLENGE_INVITE_DURATION_MS }
    this.repository.invites.set(invite.id, invite)
    return { invite, replaced }
  }
  reply(targetId: string, input: { id: string; accepted: boolean }) {
    const invite = this.repository.invites.get(input?.id)
    if (!invite || invite.targetId !== targetId || typeof input.accepted !== 'boolean') throw new RoomError('Lời mời không còn hợp lệ.')
    if (invite.expiresAt <= Date.now()) throw new RoomError('Lời mời đã hết hạn.')
    if (!input.accepted) { this.repository.invites.delete(invite.id); return { invite, room: null, previousRooms: [] } }
    // Recheck both players at acceptance; they may have readied/started since delivery.
    const sender = this.available(invite.senderId), target = this.available(targetId)
    const nameError = playerNameError(sender.name) || playerNameError(target.name)
    if (nameError) throw new RoomError(nameError)
    // Resolve the destination at acceptance, using the sender's current room.
    const senderRoom = this.rooms.roomFor(invite.senderId)
    const targetRoom = this.rooms.roomFor(targetId)
    const destination = senderRoom ?? this.rooms.create(`So tài: ${sender.name} · ${target.name}`.slice(0, 40))
    if (destination.locked && targetRoom?.id !== destination.id) throw new RoomError('Bàn đang khóa. Hãy vào từ Chọn Bàn và nhập mật khẩu.')
    const previousRooms = targetRoom && targetRoom.id !== destination.id
      ? [this.rooms.leave(targetId)!] : []
    if (!senderRoom) this.rooms.join(destination.id, invite.senderId, sender.name)
    const room = this.rooms.join(destination.id, targetId, target.name)
    this.repository.invites.delete(invite.id)
    return { invite, room, previousRooms }
  }
  remove(id: string) {
    this.repository.profiles.delete(id)
    const removed = [...this.repository.invites.values()].filter(invite => invite.senderId === id || invite.targetId === id)
    removed.forEach(invite => this.repository.invites.delete(invite.id))
    return removed
  }
  expire() {
    const expired = [...this.repository.invites.values()].filter(invite => invite.expiresAt <= Date.now())
    expired.forEach(invite => this.repository.invites.delete(invite.id))
    return expired
  }
}
