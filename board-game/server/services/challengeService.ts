import { AVATAR_COUNT, FRAME_COUNT } from '../../src/lib/shopCosmetics'
import { randomUUID } from 'node:crypto'
import { playerNameError } from '../../src/lib/playerName'
import type { ChallengeProfile } from '../../src/types/challenge'
import { CHALLENGE_BLOCKED_MESSAGE, CHALLENGE_SEND_COOLDOWN_MS } from '../../src/types/challenge'
import { ChallengeRepository } from '../repositories/challengeRepository'
import { RoomError, RoomService } from './roomService'

const CHALLENGE_INVITE_DURATION_MS = 5000

export class ChallengeService {
  constructor(private repository: ChallengeRepository, private rooms: RoomService) {}
  update(id: string, value: ChallengeProfile, accountId?: string) {
    if (!value || typeof value.name !== 'string' || !value.name.trim() || value.name.trim().length > 24
      || !Number.isInteger(value.avatarIndex) || value.avatarIndex < 0 || value.avatarIndex >= AVATAR_COUNT
      || !Number.isInteger(value.avatarFrameIndex) || value.avatarFrameIndex < 0 || value.avatarFrameIndex >= FRAME_COUNT
      || !Number.isFinite(value.elo) || value.elo < 0 || value.elo > 100000 || typeof value.localBusy !== 'boolean') {
      throw new RoomError('Không thể gửi lời mời lúc này. Vui lòng thử lại.')
    }
    this.repository.identities.set(id, accountId ? `account:${accountId}` : `socket:${id}`)
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
    const blocks = this.repository.blocks.get(targetId)
    const senderKey = this.repository.identities.get(senderId) ?? `socket:${senderId}`
    if ((this.repository.sendCooldowns.get(senderKey) ?? 0) > Date.now()) throw new RoomError('Vui lòng chờ 5 giây trước khi mời chơi tiếp.')
    const blockedUntil = blocks?.get(senderKey)
    if (blockedUntil && blockedUntil > Date.now()) throw new RoomError(CHALLENGE_BLOCKED_MESSAGE)
    blocks?.delete(senderKey)
    this.available(targetId)
    this.repository.sendCooldowns.set(senderKey, Date.now() + CHALLENGE_SEND_COOLDOWN_MS)
    const replaced = [...this.repository.invites.values()].filter(invite => invite.targetId === targetId)
    replaced.forEach(invite => this.repository.invites.delete(invite.id))
    const invite = { id: randomUUID(), senderId, targetId, sender: { ...sender }, expiresAt: Date.now() + CHALLENGE_INVITE_DURATION_MS }
    this.repository.invites.set(invite.id, invite)
    return { invite, replaced }
  }
  reply(targetId: string, input: { id: string; accepted: boolean; blockMinutes?: 5 | 10 }) {
    const invite = this.repository.invites.get(input?.id)
    if (!invite || invite.targetId !== targetId || typeof input.accepted !== 'boolean') throw new RoomError('Lời mời không còn hợp lệ.')
    if (invite.expiresAt <= Date.now()) throw new RoomError('Lời mời đã hết hạn.')
    if (input.blockMinutes !== undefined) {
      if (input.accepted || (input.blockMinutes !== 5 && input.blockMinutes !== 10)) throw new RoomError('Thời gian chặn lời mời không hợp lệ.')
      const blocks = this.repository.blocks.get(targetId) ?? new Map<string, number>()
      blocks.set(this.repository.identities.get(invite.senderId) ?? `socket:${invite.senderId}`, Date.now() + input.blockMinutes * 60000)
      this.repository.blocks.set(targetId, blocks)
    }
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
    this.rooms.markInvitedPair(room.id, invite.senderId, targetId)
    this.repository.invites.delete(invite.id)
    return { invite, room, previousRooms }
  }
  remove(id: string) {
    this.repository.blocks.delete(id)
    const senderKey = this.repository.identities.get(id) ?? `socket:${id}`
    if (senderKey.startsWith('socket:')) for (const blocks of this.repository.blocks.values()) blocks.delete(senderKey)
    this.repository.identities.delete(id)
    this.repository.profiles.delete(id)
    const removed = [...this.repository.invites.values()].filter(invite => invite.senderId === id || invite.targetId === id)
    removed.forEach(invite => this.repository.invites.delete(invite.id))
    return removed
  }
  expire() {
    for (const [sender, until] of this.repository.sendCooldowns) if (until <= Date.now()) this.repository.sendCooldowns.delete(sender)
    for (const [receiver, blocks] of this.repository.blocks) {
      for (const [sender, until] of blocks) if (until <= Date.now()) blocks.delete(sender)
      if (!blocks.size) this.repository.blocks.delete(receiver)
    }
    const expired = [...this.repository.invites.values()].filter(invite => invite.expiresAt <= Date.now())
    expired.forEach(invite => this.repository.invites.delete(invite.id))
    return expired
  }
}
