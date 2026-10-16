import { afterEach, describe, expect, it } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { createHiddenGame } from '../src/game/state/hidden'
import { applyMove, startGame } from '../src/game/moves/actions'
import { candidateRepetition, getMoveHints, initialRepetition, REPETITION_FORBIDDEN_MESSAGE } from '../src/game/rules/repetition'
import { chooseComputerMove } from '../src/game/moves/computer'
import { useGameStore } from '../src/store/gameStore'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import type { GameState, Move } from '../src/types/game'

const redOut: Move = { from: { row: 9, col: 1 }, to: { row: 7, col: 2 } }
const redBack: Move = { from: redOut.to, to: redOut.from }
const blackOut: Move = { from: { row: 0, col: 1 }, to: { row: 2, col: 2 } }
const blackBack: Move = { from: blackOut.to, to: blackOut.from }
const blackBreak: Move = { from: { row: 3, col: 0 }, to: { row: 4, col: 0 } }
const round = [redOut, blackOut, redBack, blackBack]
function play(game: GameState, move: Move) { return applyMove(game, move, 0) }
function beforeStarterFifth() {
  let game = startGame(createGame(), 0)
  for (let i = 0; i < 4; i++) for (const move of round) game = play(game, move)
  return game
}
afterEach(() => useGameStore.getState().reset(0))

describe('Coordinated repetition', () => {
  it('counts only when both sides complete their shuttles and remembers the starter', () => {
    const game = beforeStarterFifth()
    expect(game.repetition?.cycle?.starter).toBe('red')
    expect(game.repetition?.cycle?.rounds).toBe(4)
    expect(candidateRepetition(game, redOut).forbidden).toBe(true)
    expect(candidateRepetition(game, blackBack).forbidden).toBe(false)
  })
  it('does not count one side shuttle when the other side breaks its return', () => {
    let game = startGame(createGame(), 0)
    game = play(game, redOut); game = play(game, blackOut); game = play(game, redBack); game = play(game, blackBreak)
    expect(game.repetition?.cycle?.rounds).toBe(0)
    expect(game.repetition?.cycle?.starter).toBe('black')
  })
  it('allows moves three and four and warns only on the third', () => {
    let game = startGame(createGame(), 0)
    for (let i = 0; i < 3; i++) for (const move of round) game = play(game, move)
    expect(game.repetition?.cycle?.rounds).toBe(3)
    expect(game.repetition?.warningSide).toBe('red')
    for (const move of round) game = play(game, move)
    expect(game.repetition?.cycle?.rounds).toBe(4)
    expect(game.repetition?.warning).toBe(false)
    expect(game.phase).toBe('playing')
    expect(game.result).toBeNull()
  })
  it('blocks #5 before changing board, turn, clock, move or history', () => {
    const game = beforeStarterFifth()
    const before = structuredClone(game)
    expect(candidateRepetition(game, redOut).forbidden).toBe(true)
    const next = applyMove(game, redOut, 123)
    expect(next).toBe(game)
    expect(next).toEqual(before)
    expect(next.repetition?.cycle?.rounds).toBe(4)
  })
  it('marks the forbidden destination and still allows a loop-breaking move', () => {
    const game = beforeStarterFifth()
    expect(getMoveHints(game, redOut.from)).toContainEqual({ ...redOut.to, type: 'repetition-forbidden' })
    const breaking: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }
    expect(getMoveHints(game, breaking.from)).toContainEqual({ ...breaking.to, type: 'legal' })
    const next = applyMove(game, breaking, 0)
    expect(next.repetition?.cycle?.starter).toBe('red')
    expect(next.repetition?.cycle?.rounds).toBe(0)
    expect(next.phase).toBe('playing')
  })
  it('calculates Cờ Úp hints without mutating repetition state', () => {
    const game = startGame(createHiddenGame(0, Array(28).fill(.3)), 0)
    const before = structuredClone(game)
    getMoveHints(game, { row: 6, col: 0 })
    expect(game.repetition).toEqual(initialRepetition())
    expect(game).toEqual(before)
  })
  it('store preserves selection and animation state on a forbidden move', () => {
    const game = beforeStarterFifth()
    useGameStore.setState({ game, selected: redOut.from, animation: null, moves: [], history: [] })
    const before = useGameStore.getState()
    before.select(redOut.to, 123)
    const after = useGameStore.getState()
    expect(after.game).toBe(game)
    expect(after.selected).toEqual(redOut.from)
    expect(after.animation).toBeNull()
    expect(after.animationVersion).toBe(before.animationVersion)
    expect(after.moves).toBe(before.moves)
    expect(after.history).toBe(before.history)
  })
  it('undo restores both side trackers and new game clears them', () => {
    let game = startGame(createGame(), 0)
    game = play(game, redOut); game = play(game, blackOut); game = play(game, redBack)
    const snapshot = game
    game = play(game, blackBack)
    useGameStore.setState({ game, history: [snapshot], moves: [], selected: null, animation: null })
    useGameStore.getState().takeback(1, 0)
    expect(useGameStore.getState().game.repetition?.cycle).toEqual(snapshot.repetition?.cycle)
    useGameStore.getState().reset(0)
    expect(useGameStore.getState().game.repetition).toEqual(initialRepetition())
  })
  it('basic computer avoids repetition-forbidden candidates', () => {
    const game = beforeStarterFifth()
    const move = chooseComputerMove(game.board, game.currentTurn, 0, game)!
    expect(candidateRepetition(game, move).forbidden).toBe(false)
  })
  it('server rejects only the starter before its fifth round move', () => {
    let now = 0
    const service = new RoomService(new RoomRepository(), () => now)
    const id = service.create('Coordinated repetition test').id
    service.join(id, 'r', 'Red'); service.join(id, 'b', 'Black')
    service.command('r', { type: 'ready' }); service.command('b', { type: 'ready' }); now = 1300
    for (let i = 0; i < 4; i++) for (const [side, move] of [['r', redOut], ['b', blackOut], ['r', redBack], ['b', blackBack]] as const) service.command(side, { type: 'move', move })
    const before = service.roomFor('r')!
    expect(before.game.repetition?.cycle?.starter).toBe('red')
    expect(before.game.repetition?.cycle?.rounds).toBe(4)
    now += 100
    expect(() => service.command('r', { type: 'move', move: redOut })).toThrow(REPETITION_FORBIDDEN_MESSAGE)
    expect(service.roomFor('r')!.game).toEqual(before.game)
  })
})
