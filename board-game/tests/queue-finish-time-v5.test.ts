import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'

function setup(locked: boolean, earlyQueue: boolean, emptyEnergy = false) {
  let now = 0
  const exhausted = new Set<string>()

  const repo = new RoomRepository(
    undefined,
    room => room.players.every(p => !exhausted.has(p.id)),
    id => !exhausted.has(id),
  )

  const service = new RoomService(repo, () => now, () => 'red')
  const id = service.create(
    'Finish time V5', 10, 60, undefined,
    locked ? '' : undefined,
  ).id

  service.join(id, 'a', 'Owner')
  const room = service.join(id, 'b', 'Opponent')
  service.join(id, 'c', 'Viewer')

  if (locked) {
    service.command('a', {
      type: 'room-settings',
      queueBlocked: false,
      chatBlocked: false,
      keepOwnerSeat: true,
    })
  }

  if (earlyQueue) service.command('c', { type: 'join-queue' })

  service.command('a', { type: 'ready' })
  service.command('b', { type: 'ready' })

  const finish = (time: number) => {
    now = time
    if (emptyEnergy) exhausted.add('a')

    service.command('b', { type: 'resign' })
    return room.lastCompletedMatch!.id
  }

  const ack = (id: string, time: number) => {
    now = time
    for (const p of [...room.players]) {
      service.command(p.id, {
        type: 'result-presentation-complete',
        matchId: id,
      })
    }
  }

  return {
    room, service, exhausted, finish, ack,
    time(value: number) { now = value },
    tick(value: number) { now = value; service.tick() },
  }
}

it.each([false, true])(
  'late queue waits until the next match; locked=%s',
  locked => {
    const x = setup(locked, false)
    const id = x.finish(2000)

    x.service.command('c', { type: 'join-queue' })
    x.ack(id, 3000)
    x.tick(5000)
    x.tick(8000)

    expect(x.room.players.map(p => p.id)).toEqual(['a', 'b'])

    x.time(9000)
    expect(() => x.service.command('a', { type: 'ready' })).not.toThrow()
    expect(() => x.service.command('b', { type: 'ready' })).not.toThrow()
    expect(x.room.game.phase).toBe('playing')

    const nextId = x.finish(10000)
    x.ack(nextId, 11000)

    x.tick(12999)
    expect(x.room.players.map(p => p.id)).toEqual(['a', 'b'])

    x.tick(13000)
    expect(x.room.players.map(p => p.id)).toEqual(['a', 'c'])
  },
)

it.each([false, true])(
  'early queue rotates from finish-time 3s; locked=%s',
  locked => {
    const x = setup(locked, true)
    const id = x.finish(2000)

    x.ack(id, 2000)
    x.tick(4999)
    expect(x.room.players.map(p => p.id)).toEqual(['a', 'b'])

    x.tick(5000)
    expect(x.room.players.map(p => p.id)).toEqual(['a', 'c'])
  },
)

it('locked owner stays seated with zero energy when Keep Seat is on', () => {
  const x = setup(true, true, true)
  const id = x.finish(2000)

  x.ack(id, 2000)
  x.tick(4999)
  expect(x.room.players.map(p => p.id)).toEqual(['a', 'b'])

  x.tick(5000)
  expect(x.room.players.map(p => p.id)).toEqual(['a', 'c'])
  expect(x.room.ownerId).toBe('a')
  expect(x.room.viewers?.some(v => v.id === 'a')).toBe(false)
  expect(x.exhausted.has('a')).toBe(true)
})

it('owner stays seated without a queue, but depleted energy blocks Ready', () => {
  const x = setup(true, false, true)
  const id = x.finish(2000)

  x.ack(id, 2000)
  x.tick(5000)

  expect(x.room.players.map(p => p.id)).toEqual(['a', 'b'])
  expect(x.room.ownerId).toBe('a')

  expect(() => x.service.command('a', { type: 'ready' }))
    .toThrow()
})