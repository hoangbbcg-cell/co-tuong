import { beforeEach, expect, it } from 'vitest'
import { RoomService, DISCONNECT_GRACE_MS } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'

let now: number, service: RoomService
beforeEach(() => {
  now = 0
  service = new RoomService(new RoomRepository(), () => now, () => 'red')
  const { id } = service.create('Reconnect', 10, 120)
  service.join(id, 'a', 'Đỏ', undefined, false, 'account-a')
  service.join(id, 'b', 'Đen', undefined, false, 'account-b')
  service.command('a', { type: 'ready' })
  service.command('b', { type: 'ready' })
})

it('keeps the same seat and board after a 90 second call, fencing the old socket', () => {
  const before = service.roomFor('a')!
  service.disconnect('a')
  now = 90_000
  service.tick()
  const resumed = service.resume('account-a', 'new-a')!
  expect(resumed.room.game.phase).toBe('playing')
  expect(resumed.room.game.board).toEqual(before.game.board)
  expect(resumed.room.players.find(p => p.id === 'new-a')).toMatchObject({ side: 'red', connected: true })
  expect(resumed.room.ownerId).toBe('new-a')
  expect(() => service.assertController('a')).toThrow()
  expect(() => service.assertController('new-a')).not.toThrow()
  expect(service.disconnect('a')).toBeNull()
  expect(resumed.room.game.remainingTime.red).toBeLessThan(600_000)
})

it('gives each new disconnect a full window after successfully resuming', () => {
  // Isolate the network deadline from the separate move clock.
  service.roomFor('a')!.repetitionNoticePaused = true
  service.disconnect('a')
  now = 170_000
  expect(service.resume('account-a', 'new-a')).not.toBeNull()
  expect(service.roomFor('new-a')!.players[0].disconnectedAtEpochMs).toBeUndefined()
  service.disconnect('new-a')
  now += 170_000
  service.tick()
  expect(service.resume('account-a', 'third-a')?.room.game.phase).toBe('playing')
})

it('expires at three minutes when the move clock is paused', () => {
  expect(DISCONNECT_GRACE_MS).toBe(180_000)
  const room = service.roomFor('a')!
  room.repetitionNoticePaused = true
  service.disconnect('a')
  now = DISCONNECT_GRACE_MS - 1
  service.tick()
  expect(room.game.phase).toBe('playing')
  now++
  service.tick()
  expect(room.game.result).toMatchObject({ winner: 'black', reason: 'disconnect_timeout' })
  expect(service.resume('account-a', 'too-late')).toBeNull()
})

it('still applies the move timeout before the network deadline', () => {
  service.disconnect('a')
  now = 122_000
  service.tick()
  expect(service.roomFor('a')!.game.result).toMatchObject({ winner: 'black', reason: 'timeout' })
})

it('still treats explicit leave as leaving immediately', () => {
  const room = service.roomFor('a')!
  service.leave('a')
  expect(room.game.result).toMatchObject({ winner: 'black', reason: 'leave' })
  expect(service.resume('account-a', 'new-a')).toBeNull()
})
