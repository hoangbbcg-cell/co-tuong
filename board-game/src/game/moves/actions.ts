import type { GameState, Move, Side } from '../../types/game'
import { opposite, TURN_TIME_LIMIT_MS } from '../state/initial'
import { cloneBoard, hasAnyLegalMove, isInCheck, isMoveLegal } from '../rules'

export function finishGame(game: GameState, winner: Side | null, reason: NonNullable<GameState['result']>['reason']): GameState {
  return { ...game, phase: 'finished', result: { winner, reason } }
}
export function advanceClock(game: GameState, now: number): GameState {
  if (game.phase !== 'playing') return game
  const elapsed = Math.max(0, now - game.lastClockUpdate)
  if (!elapsed) return game
  const side = game.currentTurn
  const elapsedToCharge = Math.min(elapsed, game.remainingTime[side], Math.max(0, TURN_TIME_LIMIT_MS - game.turnElapsed))
  const remainingTime = { ...game.remainingTime, [side]: game.remainingTime[side] - elapsedToCharge }
  const turnElapsed = game.turnElapsed + elapsedToCharge
  const next = { ...game, remainingTime, lastClockUpdate: now, turnElapsed }
  return remainingTime[side] === 0 || turnElapsed >= TURN_TIME_LIMIT_MS
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
export function applyMove(
  game: GameState,
  move: Move,
  now: number,
  actor: Side = game.currentTurn,
  options: { skipEndgameMoveScan?: boolean; forceCheckmate?: boolean } = {},
): GameState {
  const current = advanceClock(game, now)
  if (current.phase !== 'playing' || now < current.lastClockUpdate || actor !== current.currentTurn) return current
  const { from, to } = move
  const piece = current.board[from.row]?.[from.col]
  if (!piece || piece.side !== actor || !isMoveLegal(from.row, from.col, to.row, to.col, current.board)) return current
  const captured = current.board[to.row][to.col]
  const board = cloneBoard(current.board)
  board[to.row][to.col] = board[from.row][from.col]
  if (piece.concealed) {
    const { concealed, ...revealed } = piece
    board[to.row][to.col] = { ...revealed, type: concealed.type, name: concealed.name }
  }
  board[from.row][from.col] = null
  const next: GameState = { ...current, board, lastMove: move, currentTurn: opposite(actor), turnElapsed: 0 }
  if (options.forceCheckmate) return finishGame(next, actor, 'checkmate')
  if (captured?.type === 'general') return finishGame(next, actor, 'capture')
  if (!options.skipEndgameMoveScan && !hasAnyLegalMove(next.currentTurn, board)) {
    return finishGame(next, actor, isInCheck(next.currentTurn, board) ? 'checkmate' : 'stalemate')
  }
  return next
}
