import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'

function setup(locked = false) {
  let now = 0
  const exhausted = new Set<string>()
  const repo = new RoomRepository(undefined, room => room.players.every(p => !exhausted.has(p.id)), id => !exhausted.has(id))
  const service = new RoomService(repo, () => now, () => 'red')
  const id = service.create('Energy', 10, 60, undefined, locked ? '' : undefined).id
  service.join(id, 'a', 'An')
  const room = service.join(id, 'b', 'Binh')
  service.command('a', { type: 'ready' }); service.command('b', { type: 'ready' })
  const finish = () => {
    exhausted.add('a'); exhausted.add('b')
    now = 2000
    service.command('b', { type: 'resign' })
  }
  const tick = (time = 5000) => { now = time; service.tick() }
  return { repo, service, room, id, exhausted, finish, tick }
}

it('removes both depleted players and deletes an ordinary room after the result delay', () => {
  const { repo, service, room, id, finish, tick } = setup()
  finish(); tick(4999)
  expect(room.players).toHaveLength(2)
  tick()
  expect(repo.get(id)).toBeUndefined()
  expect(service.roomFor('a')).toBeUndefined()
  expect(service.roomFor('b')).toBeUndefined()
  expect(service.takeEnergyRemovals(id)).toEqual(['a', 'b'])
  expect(service.takeEnergyRemovals(id)).toEqual([])
  expect(service.takeEnergyNotices(id)).toEqual(['a', 'b'])
  tick(9000)
  expect(repo.get(id)).toBeUndefined()
})

it.each([1, 2])('promotes %s eligible spectators and keeps the ordinary room open', count => {
  const { repo, service, room, id, finish, tick } = setup()
  service.join(id, 'c', 'Chi', undefined, true, 'account-c')
  if (count === 2) service.join(id, 'd', 'Dung', undefined, true)
  finish(); tick()
  expect(repo.get(id)).toBe(room)
  expect(room.players.map(p => p.id)).toEqual(count === 1 ? ['c'] : ['c', 'd'])
  expect(room.players[0].userId).toBe('account-c')
  expect(room.ownerId).toBe('c')
  expect(room.game.phase).toBe('ready')
  expect(room.moveCount).toBe(0)
  expect(service.roomFor('a')).toBeUndefined()
  expect(service.roomFor('b')).toBeUndefined()
})

it('prefers queued players and skips exhausted viewers', () => {
  const { service, room, id, exhausted, finish, tick } = setup()
  service.join(id, 'c', 'Chi', undefined, true)
  service.join(id, 'd', 'Dung', undefined, true)
  service.join(id, 'e', 'Em', undefined, true)
  service.command('e', { type: 'join-queue' })
  exhausted.add('d')
  finish(); tick()
  expect(room.players.map(p => p.id)).toEqual(['e', 'c'])
  expect(room.viewers?.map(p => p.id)).toEqual(['d'])
})

it('closes when only depleted spectators remain and notifies all removed members', () => {
  const { repo, service, id, exhausted, finish, tick } = setup()
  service.join(id, 'c', 'Chi', undefined, true)
  exhausted.add('c')
  finish(); tick()
  expect(repo.get(id)).toBeUndefined()
  expect(service.takeEnergyRemovals(id)).toEqual(['a', 'b', 'c'])
})

it('preserves the locked owner exemption', () => {
  const { repo, service, room, id, finish, tick } = setup(true)
  finish(); tick()
  expect(repo.get(id)).toBe(room)
  expect(room.players.map(p => p.id)).toEqual(['a'])
  expect(service.takeEnergyRemovals(id)).toEqual([])
})

it('does not remove a depleted pair during a live match', () => {
  const { room, exhausted, tick } = setup()
  exhausted.add('a'); exhausted.add('b'); tick(2500)
  expect(room.game.phase).toBe('playing')
  expect(room.players).toHaveLength(2)
})
