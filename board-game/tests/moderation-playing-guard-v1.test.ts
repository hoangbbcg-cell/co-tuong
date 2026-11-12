import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'

function setup() {
  let now = 0
  const service = new RoomService(
    new RoomRepository(),
    () => now,
    () => 'red',
  )

  const roomId = service.create(
    'Ban khoa',
    10,
    60,
    undefined,
    '',
  ).id

  service.join(roomId, 'a', 'Chu ban')
  const room = service.join(roomId, 'b', 'Doi thu')
  service.join(roomId, 'c', 'Nguoi xem')

  service.command('a', { type: 'ready' })
  service.command('b', { type: 'ready' })

  expect(room.game.phase).toBe('playing')

  return { room, service, setNow: (value: number) => { now = value } }
}

it.each([
  ['demote', 'b'],
  ['promote', 'c'],
  ['kick', 'b'],
  ['kick', 'c'],
] as const)(
  'rejects %s on %s while a match is playing',
  (action, targetId) => {
    const { room, service } = setup()

    const playersBefore = room.players.map(player => player.id)
    const viewersBefore = room.viewers?.map(viewer => viewer.id)
    const phaseBefore = room.game.phase

    expect(() => service.command('a', {
      type: 'moderate',
      targetId,
      action,
    })).toThrow('Hãy kết thúc ván')

    expect(room.players.map(player => player.id)).toEqual(playersBefore)
    expect(room.viewers?.map(viewer => viewer.id)).toEqual(viewersBefore)
    expect(room.game.phase).toBe(phaseBefore)
    expect(room.game.phase).toBe('playing')
  },
)

it('still permits chat moderation during a match', () => {
  const { room, service } = setup()

  service.command('a', {
    type: 'moderate',
    targetId: 'b',
    action: 'mute',
  })

  expect(room.mutedMemberIds).toContain('b')
  expect(room.game.phase).toBe('playing')
  expect(room.players.map(player => player.id)).toEqual(['a', 'b'])

  service.command('a', {
    type: 'moderate',
    targetId: 'b',
    action: 'unmute',
  })

  expect(room.mutedMemberIds).not.toContain('b')
  expect(room.game.phase).toBe('playing')
})

it('allows kicking a spectator after the match has finished', () => {
  const { room, service } = setup()

  service.command('b', { type: 'resign' })
  expect(room.game.phase).toBe('finished')

  service.command('a', {
    type: 'moderate',
    targetId: 'c',
    action: 'kick',
  })

  expect(room.viewers?.some(viewer => viewer.id === 'c')).toBe(false)
})