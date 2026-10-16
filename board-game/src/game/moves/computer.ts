import type { Board, GameState, Move, PieceType, Side } from '../../types/game'
import { getLegalMoves } from '../rules'
import { candidateRepetition } from '../rules/repetition'

const value: Record<PieceType, number> = { general: 10000, rook: 90, cannon: 45, horse: 40, elephant: 20, advisor: 20, soldier: 10 }

// A small practice opponent: legal moves only, preferring captures.
export function chooseComputerMove(board: Board, side: Side, choice: number, game?: GameState): Move | null {
  let best = -1
  const moves: Move[] = []
  board.forEach((rank, row) => rank.forEach((piece, col) => {
    if (piece?.side !== side) return
    for (const to of getLegalMoves(row, col, board)) {
      if (game && candidateRepetition(game, { from: { row, col }, to }).forbidden) continue
      const target = board[to.row][to.col]
      const score = target?.concealed ? 25 : target ? value[target.type] : 0
      if (score > best) { best = score; moves.length = 0 }
      if (score === best) moves.push({ from: { row, col }, to })
    }
  }))
  return moves[Math.min(moves.length - 1, Math.max(0, Math.floor(choice * moves.length)))] ?? null
}
