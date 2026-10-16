import type { GameState, Move, Side } from '../../types/game'
import { opposite, TURN_TIME_LIMIT_MS } from '../state/initial'
import { hasAnyLegalMove, isInCheck, isMoveLegal } from '../rules'
import { candidateRepetition, commitRepetition, simulateMoveBoard } from '../rules/repetition'

export function finishGame(game: GameState, winner: Side | null, reason: NonNullable<GameState['result']>['reason']): GameState {
  return { ...game, phase: 'finished', result: { winner, reason } }
}
export function advanceClock(game: GameState, now: number): GameState {
  if (game.phase !== 'playing') return game
  const elapsed = Math.max(0, now - game.lastClockUpdate)
  if (!elapsed) return game
  const side = game.currentTurn
  const turnTimeLimit = game.turnTimeLimitMs ?? TURN_TIME_LIMIT_MS
  const elapsedToCharge = Math.min(elapsed, game.remainingTime[side], Math.max(0, turnTimeLimit - game.turnElapsed))
  const remainingTime = { ...game.remainingTime, [side]: game.remainingTime[side] - elapsedToCharge }
  const turnElapsed = game.turnElapsed + elapsedToCharge
  const next = { ...game, remainingTime, lastClockUpdate: now, turnElapsed }
  return remainingTime[side] === 0 || turnElapsed >= turnTimeLimit
    ? finishGame(next, opposite(side), 'timeout')
    : next
}
export function takebackSnapshot(game: GameState): GameState {
  return {
    ...game,
    remainingTime: { ...game.remainingTime, [game.currentTurn]: game.remainingTime[game.currentTurn] + game.turnElapsed },
    turnElapsed: 0,
  }
}
export const MATCH_INTRO_MS = 1300
export function startGame(game: GameState, now: number, delay = 0): GameState {
  return game.phase === 'ready' ? { ...game, phase: 'playing', lastClockUpdate: now + delay } : game
}
export function applyMoveWithResult(
  game: GameState,
  move: Move,
  now: number,
  actor: Side = game.currentTurn,
  options: { skipEndgameMoveScan?: boolean } = {},
): { game: GameState; rejection?: 'invalid' | 'repetition' } {
  const current = advanceClock(game, now)
  if (current.phase !== 'playing' || now < current.lastClockUpdate || actor !== current.currentTurn) return { game: current, rejection: 'invalid' }
  const { from, to } = move
  const piece = current.board[from.row]?.[from.col]
  if (!piece || piece.side !== actor || !isMoveLegal(from.row, from.col, to.row, to.col, current.board)) return { game: current, rejection: 'invalid' }
  const captured = current.board[to.row][to.col]
  const board = simulateMoveBoard(current.board, move)
  const repetition = candidateRepetition(current, move)
  if (repetition.forbidden) return { game, rejection: 'repetition' }
  const next: GameState = { ...current, board, repetition: commitRepetition(current, repetition), lastMove: move, currentTurn: opposite(actor), turnElapsed: 0 }

  if (captured?.type === 'general') return { game: finishGame(next, actor, 'capture') }
  if (!options.skipEndgameMoveScan && !hasAnyLegalMove(next.currentTurn, board)) {
    return { game: finishGame(next, actor, isInCheck(next.currentTurn, board) ? 'checkmate' : 'stalemate') }
  }
  return { game: next }
}
export function applyMove(game: GameState, move: Move, now: number, actor: Side = game.currentTurn, options: { skipEndgameMoveScan?: boolean } = {}): GameState {
  return applyMoveWithResult(game, move, now, actor, options).game
}
