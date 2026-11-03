import { expect, it } from 'vitest'
import { advanceClock, applyMoveWithResult, MATCH_INTRO_MS, startGame } from '../src/game/moves/actions'
import { createGame } from '../src/game/state/initial'
import { RoomService } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'

it('does not charge either clock or accept a move before the longer intro finishes', () => {
  const game = startGame(createGame(0), 0, MATCH_INTRO_MS)
  const before = advanceClock(game, MATCH_INTRO_MS - 1)
  expect(before.remainingTime).toEqual(game.remainingTime)
  expect(before.turnElapsed).toBe(0)
  const move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }
  expect(applyMoveWithResult(game, move, MATCH_INTRO_MS - 1).rejection).toBe('invalid')
  expect(applyMoveWithResult(game, move, MATCH_INTRO_MS).rejection).toBeUndefined()
  expect(advanceClock(game, MATCH_INTRO_MS + 100).remainingTime.red).toBe(game.remainingTime.red - 100)
})
it('online server waits for the same intro duration before advancing the match clock', () => {
  let now = 0
  const service = new RoomService(new RoomRepository(), () => now, () => 'red')
  const { id } = service.create('Intro clock')
  service.join(id, 'red', 'Red')
  service.join(id, 'black', 'Black')
  service.command('red', { type: 'ready' })
  service.command('black', { type: 'ready' })
  const initial = service.roomFor('red')!.game.remainingTime.red
  expect(service.roomFor('red')!.game.lastClockUpdate).toBe(MATCH_INTRO_MS)
  now = MATCH_INTRO_MS - 1
  service.tick()
  expect(service.roomFor('red')!.game.remainingTime.red).toBe(initial)
  now = MATCH_INTRO_MS + 100
  service.tick()
  expect(service.roomFor('red')!.game.remainingTime.red).toBe(initial - 100)
})
