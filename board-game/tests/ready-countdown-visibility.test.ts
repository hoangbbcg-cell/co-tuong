import { expect, it } from 'vitest'
import { readyCountdownForPlayer } from '../src/lib/roomReadiness'
import { RoomService } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'

it.each([false, true])('đủ hai ghế: hiện30→1 cho cả hai, kể cả đã Ready; locked=%s', locked => {
  let now = 0
  const service = new RoomService(new RoomRepository(), () => now)
  const id = service.create('Bàn', 10, 60, undefined, locked ? '' : undefined).id
  service.join(id, 'a', 'PlayerA')
  const room = service.join(id, 'b', 'PlayerB')
  service.join(id, 'viewer', 'Viewer')
  service.command('viewer', { type: 'join-queue' })
  now = 0
  service.command('a', { type: 'ready' })
  expect(readyCountdownForPlayer(room, 'b')).toBeNull()
  now = 999; service.tick()
  expect(readyCountdownForPlayer(room, 'b')).toBeNull()
  now = 1000; service.tick()
  expect(readyCountdownForPlayer(room, 'b')).toBe(30)
  now = 5999; service.tick()
  expect(readyCountdownForPlayer(room, 'b')).toBe(26)
  now = 6000; service.tick()
  expect(readyCountdownForPlayer(room, 'b')).toBe(25)
  expect(readyCountdownForPlayer(room, 'a')).toBe(25)
  expect(readyCountdownForPlayer(room, 'viewer')).toBeNull()
  expect(readyCountdownForPlayer(room)).toBeNull()
  now = 11_000; service.command('a', { type: 'ready' })
  expect(readyCountdownForPlayer(room, 'b')).toBe(20)
  now = 30_999; service.tick()
  expect(readyCountdownForPlayer(room, 'b')).toBe(1)
  expect(room.game.phase).toBe('ready')
  // Người thứ hai Ready trước deadline thì ván bắt đầu ngay.
  service.command('b', { type: 'ready' })
  expect(room.game.phase).toBe('playing')
  expect(room.players.map(p => p.id)).toEqual(['a', 'b'])
  expect(readyCountdownForPlayer(room, 'b')).toBeNull()
})
