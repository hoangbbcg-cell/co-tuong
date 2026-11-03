import type { Board, GameState, Move, MoveHint, Position, RepetitionCycle, RepetitionShuttle, RepetitionState, Side } from '../../types/game'
import { getLegalMoves, isInCheck } from './index'

export const REPETITION_WARNING_MESSAGE = 'Cả hai bên đã lặp cùng một chu kỳ 3 vòng. Hãy chú ý.'
export const REPETITION_FORBIDDEN_MESSAGE = 'KhÃ´ng thá»ƒ tiáº¿p tá»¥c láº·p tháº¿. HÃ£y chá»n má»™t nÆ°á»›c khÃ¡c.'

export function initialRepetition(): RepetitionState {
  return { cycle: null, warning: false, warningSide: null }
}

/** Clone and apply a previously validated move, preserving Jieqi reveal semantics. */
export function simulateMoveBoard(board: Board, move: Move): Board {
  const next = board.map(rank => [...rank])
  const piece = board[move.from.row][move.from.col]!
  if (piece.concealed) {
    const { concealed, ...revealed } = piece
    next[move.to.row][move.to.col] = { ...revealed, type: concealed.type, name: concealed.name }
  } else next[move.to.row][move.to.col] = piece
  next[move.from.row][move.from.col] = null
  return next
}

function samePosition(a: Position, b: Position) { return a.row === b.row && a.col === b.col }
function copyPosition(position: Position): Position { return { row: position.row, col: position.col } }

/** A complete round is starter out, opponent out, starter back, opponent back. */
export function candidateRepetition(game: GameState, move: Move): { side: Side; cycle: RepetitionCycle | null; forbidden: boolean } {
  const piece = game.board[move.from.row]?.[move.from.col]
  const side = piece?.side ?? game.currentTurn
  const previous = game.repetition?.cycle ?? null
  const start = (): RepetitionCycle => ({ starter: side, shuttles: {
    red: side === 'red' ? { pieceId: piece?.id ?? '', from: copyPosition(move.from), to: copyPosition(move.to) } : null,
    black: side === 'black' ? { pieceId: piece?.id ?? '', from: copyPosition(move.from), to: copyPosition(move.to) } : null,
  }, phase: 1, rounds: 0 })
  if (!piece) return { side, cycle: null, forbidden: false }
  if (isInCheck(side === 'red' ? 'black' : 'red', simulateMoveBoard(game.board, move))) {
    return { side, cycle: null, forbidden: false }
  }
  if (!previous) return { side, cycle: start(), forbidden: false }

  const opponent = previous.starter === 'red' ? 'black' : 'red'
  const shuttle = previous.shuttles[side]
  const sameMove = (reference: RepetitionShuttle | null, backwards = false) => !!reference
    && piece.id === reference.pieceId
    && samePosition(move.from, backwards ? reference.to : reference.from)
    && samePosition(move.to, backwards ? reference.from : reference.to)

  if (previous.phase === 0 && side === previous.starter && sameMove(previous.shuttles[side])) {
    return { side, cycle: { ...previous, phase: 1 as const }, forbidden: previous.rounds >= 4 }
  }
  if (previous.phase === 1 && side === opponent) {
    const shuttles = { ...previous.shuttles, [side]: { pieceId: piece.id, from: copyPosition(move.from), to: copyPosition(move.to) } }
    return { side, cycle: { ...previous, shuttles, phase: 2 }, forbidden: false }
  }
  if (previous.phase === 2 && side === previous.starter && sameMove(previous.shuttles[side], true)) {
    return { side, cycle: { ...previous, phase: 3 }, forbidden: false }
  }
  if (previous.phase === 3 && side === opponent && sameMove(previous.shuttles[side], true)) {
    return { side, cycle: { ...previous, phase: 0, rounds: previous.rounds + 1 }, forbidden: false }
  }
  return { side, cycle: start(), forbidden: false }
}

export function commitRepetition(game: GameState, candidate: ReturnType<typeof candidateRepetition>): RepetitionState {
  const completedThird = !!candidate.cycle && candidate.cycle.phase === 0 && candidate.cycle.rounds === 3
  return {
    cycle: candidate.cycle,
    warning: completedThird,
    warningSide: completedThird && candidate.cycle ? candidate.cycle.starter : null,
  }
}

export function getMoveHints(game: GameState, from: Position): MoveHint[] {
  return getLegalMoves(from.row, from.col, game.board).map(to => ({ ...to,
    type: candidateRepetition(game, { from, to }).forbidden ? 'repetition-forbidden' : 'legal',
  }))
}
