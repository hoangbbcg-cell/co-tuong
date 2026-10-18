import { expect, it } from 'vitest'
import { RoomService } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'
import { publicRoom } from '../server/services/publicRoom'
import { randomAvailableRoom } from '../src/lib/quickRoom'

it('creates a solo hidden room and starts only when both players are ready', () => {
  const service = new RoomService(new RoomRepository(), () => 0)
  const summary = service.create('Hidden', 5, 90, undefined, undefined, 'jieqi')
  const solo = service.join(summary.id, 'one', 'PlayerOne')
  expect(solo.players).toHaveLength(1)
  expect(solo.game.variant).toBe('jieqi')
  expect(solo.game.phase).toBe('ready')
  expect(solo.game.board.flat().filter(piece => piece?.concealed)).toHaveLength(30)
  expect(solo.game.remainingTime.red).toBe(300000)
  service.join(summary.id, 'two', 'PlayerTwo')
  service.command('one', { type: 'ready' })
  const playing = service.command('two', { type: 'ready' })
  expect(playing.game.phase).toBe('playing')
  expect(playing.game.turnTimeLimitMs).toBe(90000)
  const visible = publicRoom(playing)
  for (const piece of visible.game.board.flat()) {
    if (piece?.concealed) expect(piece.concealed).toEqual({ type: piece.type, name: 'Quân úp' })
  }
  expect(visible.game).not.toBe(playing.game)
})

it('matches only the requested variant and rejects invalid variants', () => {
  const service = new RoomService(new RoomRepository())
  const summary = service.create('Hidden', 10, 60, undefined, undefined, 'jieqi')
  service.join(summary.id, 'one', 'PlayerOne')
  expect(randomAvailableRoom(service.list())).toBeUndefined()
  expect(randomAvailableRoom(service.list(), () => 0, 'jieqi')?.id).toBe(summary.id)
  expect(() => service.create('Bad', 10, 60, undefined, undefined, 'bad')).toThrow()
})
