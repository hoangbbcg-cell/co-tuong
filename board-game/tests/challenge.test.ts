import { beforeEach, describe, expect, it } from 'vitest'
import { ChallengeRepository } from '../server/repositories/challengeRepository'
import { RoomRepository } from '../server/repositories/roomRepository'
import { ChallengeService } from '../server/services/challengeService'
import { RoomService } from '../server/services/roomService'

describe('accepted play invitations', () => {
  let rooms: RoomService, challenges: ChallengeService
  beforeEach(() => {
    rooms = new RoomService(new RoomRepository(), () => 0)
    challenges = new ChallengeService(new ChallengeRepository(), rooms)
    for (const [id, name] of [['a', 'An'], ['b', 'Binh']]) {
      challenges.update(id, { name, avatarIndex: 0, avatarFrameIndex: 0, elo: 0, localBusy: false })
    }
  })
  const invite = () => challenges.send('a', { id: 'b', name: 'Binh' }).invite
  const accept = () => challenges.reply('b', { id: invite().id, accepted: true })

  it('creates a new room for both when neither is in a room', () => {
    const { room, previousRooms } = accept()
    expect(room?.players.map(player => player.id)).toEqual(['a', 'b'])
    expect(rooms.roomFor('a')?.id).toBe(room?.id)
    expect(rooms.roomFor('b')?.id).toBe(room?.id)
    expect(previousRooms).toEqual([])
  })

  it('moves the recipient from another room to a new room when sender has no room', () => {
    const old = rooms.create('Old')
    rooms.join(old.id, 'b', 'Binh')
    rooms.join(old.id, 'c', 'Chi')
    const { room, previousRooms } = accept()
    expect(room?.id).not.toBe(old.id)
    expect(room?.players.map(player => player.id)).toEqual(['a', 'b'])
    expect(previousRooms.map(room => room.id)).toEqual([old.id])
    expect(rooms.roomFor('c')?.players.map(player => player.id)).toEqual(['c'])
  })

  it('keeps the sender in their current room and transfers only the recipient', () => {
    const destination = rooms.create('Sender', 15)
    rooms.join(destination.id, 'a', 'An')
    const old = rooms.create('Recipient')
    rooms.join(old.id, 'b', 'Binh')
    const { room, previousRooms } = accept()
    expect(room?.id).toBe(destination.id)
    expect(room?.minutes).toBe(15)
    expect(room?.players.map(player => player.id)).toEqual(['a', 'b'])
    expect(previousRooms.map(room => room.id)).toEqual([old.id])
  })

  it('does not remove members already in the same room', () => {
    const existing = rooms.create('Together')
    rooms.join(existing.id, 'a', 'An')
    rooms.join(existing.id, 'b', 'Binh')
    const { room, previousRooms } = accept()
    expect(room?.id).toBe(existing.id)
    expect(room?.players.map(player => player.id)).toEqual(['a', 'b'])
    expect(previousRooms).toEqual([])
  })

  it('uses the sender room at acceptance, even if they entered after sending', () => {
    const pending = invite()
    const destination = rooms.create('New current room')
    rooms.join(destination.id, 'a', 'An')
    const { room } = challenges.reply('b', { id: pending.id, accepted: true })
    expect(room?.id).toBe(destination.id)
  })

  it('does not transfer anyone on rejection', () => {
    const pending = invite()
    expect(challenges.reply('b', { id: pending.id, accepted: false }).room).toBeNull()
    expect(rooms.list()).toEqual([])
  })

  it('rechecks readiness before acceptance without moving either player', () => {
    const destination = rooms.create('Waiting')
    rooms.join(destination.id, 'a', 'An')
    const pending = invite()
    rooms.command('a', { type: 'ready' })
    expect(() => challenges.reply('b', { id: pending.id, accepted: true })).toThrow()
    expect(rooms.roomFor('a')?.id).toBe(destination.id)
    expect(rooms.roomFor('b')).toBeUndefined()
  })
})
