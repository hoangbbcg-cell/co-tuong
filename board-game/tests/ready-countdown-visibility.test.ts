import { expect, it } from 'vitest'
import { readyCountdownForPlayer } from '../src/lib/roomReadiness'
import { RoomService } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'

it.each([false, true])('31s từ khi đủ 2 ghế, ẩn1s rồi hiện30s cho cả hai ghế, kể cả đã Ready; locked=%s', locked => {
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
  expect(readyCountdownForPlayer(room, 'a')).toBe(30)
  expect(readyCountdownForPlayer(room, 'viewer')).toBeNull()
  expect(readyCountdownForPlayer(room)).toBeNull()
  now = 10_000; service.command('a', { type: 'ready' })
  expect(readyCountdownForPlayer(room, 'b')).toBe(21)
  now = 30_999; service.tick()
  expect(readyCountdownForPlayer(room, 'b')).toBe(1)
  expect(room.game.phase).toBe('ready')
  // Khi countdown ket thuc, ca hai nguoi choi phai Ready de vao van.
  service.command('b', { type: 'ready' })
  now = 31_000; service.tick()
  expect(room.game.phase).toBe('playing')
  expect(room.players.map(p => p.id)).toEqual(['a', 'b'])
  expect(readyCountdownForPlayer(room, 'b')).toBeNull()
})
