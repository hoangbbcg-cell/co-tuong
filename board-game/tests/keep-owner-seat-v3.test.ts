import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import { finishGame } from '../src/game/moves/actions'

function setup(keepOwnerSeat: boolean, waiters = 1) {
  let now = 0
  const service = new RoomService(new RoomRepository(), () => now, () => 'red')
  const roomId = service.create('Ban khoa giu ghe', 10, 60, undefined, '').id
  service.join(roomId, 'a', 'Chu ban')
  const room = service.join(roomId, 'b', 'Doi thu')

  for (const player of ['c', 'd'].slice(0, waiters)) {
    service.join(roomId, player, player)
    service.command(player, { type: 'join-queue' })
  }

  service.command('a', {
    type: 'room-settings',
    queueBlocked: false,
    chatBlocked: false,
    keepOwnerSeat,
  })

  service.command('a', { type: 'ready' })
  service.command('b', { type: 'ready' })

  function finish(result: 'a' | 'b' | 'draw') {
    now = 2000

    if (result === 'draw') {
      room.game = finishGame(room.game, null, 'draw')
      service.tick()
    } else {
      service.command(result === 'a' ? 'b' : 'a', { type: 'resign' })
    }

    const matchId = room.lastCompletedMatch!.id
    for (const player of room.players) {
      service.command(player.id, {
        type: 'result-presentation-complete',
        matchId,
      })
    }
  }

  function tick(time: number) {
    now = time
    service.tick()
  }

  return { service, room, finish, tick }
}

it.each(['a', 'b', 'draw'] as const)(
  'keeps owner after %s when enabled',
  result => {
    const { room, finish, tick } = setup(true)
    finish(result)

    tick(4999)
    expect(room.players.map(p => p.id)).toEqual(['a', 'b'])

    tick(5000)
    expect(room.players.map(p => p.id)).toEqual(['a', 'c'])
    expect(room.ownerId).toBe('a')
    expect(room.viewers?.find(v => v.id === 'b')?.queued).toBe(false)
  },
)

it('does not rotate without a queued player', () => {
  const { room, finish, tick } = setup(true, 0)
  finish('b')
  tick(8000)
  expect(room.players.map(p => p.id)).toEqual(['a', 'b'])
})

it('preserves legacy locked-owner behavior when disabled', () => {
  const { room, finish, tick } = setup(false)
  finish('b')
  tick(5000)
  expect(room.players.map(p => p.id)).toEqual(['a', 'b'])
})

it('preserves ordinary rotation when disabled and owner wins', () => {
  const { room, finish, tick } = setup(false)
  finish('a')
  tick(5000)
  expect(room.players.map(p => p.id)).toEqual(['a', 'c'])
})

it('does not let a non-owner change Keep Seat', () => {
  const { service } = setup(false, 0)
  expect(() => service.command('b', {
    type: 'room-settings',
    queueBlocked: false,
    chatBlocked: false,
    keepOwnerSeat: true,
  })).toThrow('Chỉ chủ')
})

it('rejects invalid Keep Seat values', () => {
  const { service } = setup(false, 0)
  expect(() => service.command('a', {
    type: 'room-settings',
    queueBlocked: false,
    chatBlocked: false,
    keepOwnerSeat: 'invalid' as never,
  })).toThrow('Cài đặt không hợp lệ')
})

it('accepts legacy commands and preserves Keep Seat', () => {
  const { service, room } = setup(true, 0)

  service.command('a', {
    type: 'room-settings',
    queueBlocked: false,
    chatBlocked: true,
  })

  expect(room.keepOwnerSeat).toBe(true)
  expect(room.chatBlocked).toBe(true)
})