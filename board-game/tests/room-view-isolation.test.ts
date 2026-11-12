import { expect, it } from 'vitest'
import { RoomService } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'

function setup() {
  let now = 0
  let offset = 0
  const service = new RoomService(new RoomRepository(), () => now, () => 'red')
  const id = service.create('Phòng').id
  service.join(id, 'a', 'PlayerA')
  const room = service.join(id, 'b', 'PlayerB')
  const tick = (time: number) => { now = offset + time; service.tick() }
  const start = () => { service.command('a', { type: 'ready' }); service.command('b', { type: 'ready' }); now += 31_000; service.tick(); offset = now }
  return { service, id, room, tick, start }
}

it('vào/ra View và vào/thoát hàng không đổi game hoặc Ready của hai ghế', () => {
  const { service, id, room, start } = setup()
  service.command('a', { type: 'ready' })
  const readySeats = JSON.stringify(room.players)
  const readyGame = room.game
  service.join(id, 'c', 'PlayerC')
  service.command('c', { type: 'join-queue' })
  service.command('c', { type: 'leave-queue' })
  service.leave('c')
  expect(JSON.stringify(room.players)).toBe(readySeats)
  expect(room.game).toBe(readyGame)
  start()
  const playingGame = room.game
  const playingSeats = JSON.stringify(room.players)
  service.join(id, 'c', 'PlayerC')
  service.command('c', { type: 'join-queue' })
  service.command('c', { type: 'leave-queue' })
  service.leave('c')
  expect(room.game).toBe(playingGame)
  expect(JSON.stringify(room.players)).toBe(playingSeats)
})

it('người vào hàng sau kết quả phải chờ ván tiếp theo, duplicate không đổi ghế', () => {
  const { service, id, room, tick, start } = setup()
  start()
  service.command('b', { type: 'resign' })
  const ended = room.game
  const matchId = room.lastCompletedMatch!.id
  tick(1000)
  service.join(id, 'c', 'PlayerC')
  service.command('c', { type: 'join-queue' })
  expect(room.game).toBe(ended)
  tick(20_000)
  expect(room.game).toBe(ended)
  expect(() => service.command('c', { type: 'result-presentation-complete', matchId })).toThrow('Chỉ người')
  expect(() => service.command('a', { type: 'result-presentation-complete', matchId: 'old-match' })).toThrow('thay đổi')
  service.command('a', { type: 'result-presentation-complete', matchId })
  tick(25_000)
  expect(room.game).toBe(ended)
  service.command('b', { type: 'result-presentation-complete', matchId })
  tick(26_000)
  service.command('a', { type: 'result-presentation-complete', matchId })
  service.join(id, 'd', 'PlayerD')
  service.command('d', { type: 'join-queue' })
  service.command('d', { type: 'leave-queue' })
  service.leave('d')
  tick(26_999)
  expect(room.game).toBe(ended)
  tick(27_000)
  expect(room.players.map(p => p.id)).toEqual(['a', 'b'])
  expect(room.viewers?.find(p => p.id === 'c')?.queued).toBe(true)
  expect(room.players.some(p => p.id === 'b')).toBe(true)
  service.command('a', { type: 'ready' })
  tick(65_000)
  expect(room.game.phase).toBe('playing')
  expect(room.players.map(p => p.id)).toEqual(['a', 'b'])
})
