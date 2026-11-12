import type { Board, GameState, Move, PieceType, Side } from '../../src/types/game'
import { findGeneral, getLegalMoves } from '../../src/game/rules'
import { candidateRepetition, simulateMoveBoard } from '../../src/game/rules/repetition'
import { opposite } from '../../src/game/state/initial'

// These are search budgets, not claimed Elo ratings. No native engine is used.
export const PRACTICE_LEVELS = [
  { depth: 0, nodes: 0, ms: 0 },
  { depth: 0, nodes: 0, ms: 0 },
  { depth: 1, nodes: 500, ms: 60 },
  { depth: 2, nodes: 1800, ms: 120 },
  { depth: 3, nodes: 6000, ms: 250 },
  { depth: 4, nodes: 16000, ms: 450 },
] as const
const values: Record<PieceType, number> = { general: 100000, rook: 900, cannon: 450, horse: 400, advisor: 200, elephant: 200, soldier: 100 }
function moves(board: Board, side: Side): Move[] {
  const result: Move[] = []
  board.forEach((rank, row) => rank.forEach((piece, col) => {
    if (piece?.side === side) for (const to of getLegalMoves(row, col, board)) result.push({ from: { row, col }, to })
  }))
  return result.sort((a, b) => capture(board, b) - capture(board, a))
}
function capture(board: Board, move: Move) { return values[board[move.to.row][move.to.col]?.type ?? 'soldier'] * Number(!!board[move.to.row][move.to.col]) }
function evaluate(board: Board, side: Side): number {
  let result = 0
  board.forEach((rank, row) => rank.forEach((piece, col) => {
    if (!piece) return
    const advance = piece.side === 'red' ? 9 - row : row
    const positional = piece.type === 'soldier' ? advance * 5 + (advance >= 5 ? 40 : 0) : piece.type === 'horse' || piece.type === 'cannon' ? (4 - Math.abs(4 - col)) * 5 : 0
    result += (piece.side === side ? 1 : -1) * (values[piece.type] + positional)
  }))
  return result
}
export class PracticeAiAborted extends Error {}

export async function choosePracticeMove(game: GameState, level: number, signal?: AbortSignal, random = Math.random): Promise<Move | null> {
  if (!Number.isInteger(level) || level < 1 || level > 6) throw new RangeError('Practice level must be 1–6')
  const checkAbort = () => { if (signal?.aborted) throw new PracticeAiAborted('Đã hủy lượt máy.') }
  checkAbort()
  const candidates = moves(game.board, game.currentTurn).filter(move => !candidateRepetition(game, move).forbidden)
  if (!candidates.length) return null
  const pick = (list: Move[]) => list[Math.min(list.length - 1, Math.max(0, Math.floor(random() * list.length)))]
  if (level === 1) return pick(candidates)
  if (level === 2) {
    if (random() < 0.2) return pick(candidates)
    return pick(candidates.filter(move => capture(game.board, move) === capture(game.board, candidates[0])))
  }
  const profile = PRACTICE_LEVELS[level - 1]
  const deadline = performance.now() + profile.ms
  let nodes = 0, yieldedAt = performance.now()
  const limit = Symbol('search budget')
  async function checkpoint() {
    checkAbort()
    if (++nodes > profile.nodes || performance.now() >= deadline) throw limit
    if (performance.now() - yieldedAt >= 6) {
      await new Promise(resolve => setTimeout(resolve, 0))
      checkAbort()
      yieldedAt = performance.now()
    }
  }
  async function search(board: Board, side: Side, depth: number, alpha: number, beta: number): Promise<number> {
    await checkpoint()
    if (!findGeneral(side, board)) return -1000000 - depth
    if (!findGeneral(opposite(side), board)) return 1000000 + depth
    if (!depth) return evaluate(board, side)
    const options = moves(board, side)
    if (!options.length) return -1000000 - depth
    for (const move of options) {
      const score = -await search(simulateMoveBoard(board, move), opposite(side), depth - 1, -beta, -alpha)
      alpha = Math.max(alpha, score)
      if (alpha >= beta) break
    }
    return alpha
  }
  let best = candidates[0]
  // Keep only a completed depth, so a time cutoff never favors a partial branch.
  for (let depth = 1; depth <= profile.depth; depth++) {
    let nextBest = best, bestScore = -Infinity
    const ordered = [best, ...candidates.filter(move => move !== best)]
    try {
      for (const move of ordered) {
        const score = -await search(simulateMoveBoard(game.board, move), opposite(game.currentTurn), depth - 1, -Infinity, -bestScore)
        if (score > bestScore) { bestScore = score; nextBest = move }
      }
      best = nextBest
    } catch (error) { if (error !== limit) throw error; break }
  }
  checkAbort()
  return best
}
