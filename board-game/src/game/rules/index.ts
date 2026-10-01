import type { Board, Piece, Position, Side } from '../../types/game'
import { COLS, ROWS, opposite } from '../state/initial'

export function isInsideBoard(row: number, col: number): boolean {
  return Number.isInteger(row) && Number.isInteger(col) && row >= 0 && row < ROWS && col >= 0 && col < COLS
}
export function isInsidePalace(side: Side, row: number, col: number): boolean {
  return col >= 3 && col <= 5 && (side === 'black' ? row >= 0 && row <= 2 : row >= 7 && row <= 9)
}
export function cloneBoard(board: Board): Board {
  // Pieces are immutable values; moves only change which cells reference them.
  // Copying the rows is enough and keeps untouched piece references stable.
  return board.map(row => [...row])
}
export function countPiecesBetween(fr: number, fc: number, tr: number, tc: number, board: Board): number {
  let count = 0
  if (fr === tr) {
    for (let col = Math.min(fc, tc) + 1; col < Math.max(fc, tc); col++) if (board[fr][col]) count++
  } else if (fc === tc) {
    for (let row = Math.min(fr, tr) + 1; row < Math.max(fr, tr); row++) if (board[row][fc]) count++
  }
  return count
}
export function isBasicMoveAllowed(piece: Piece, fr: number, fc: number, tr: number, tc: number, board: Board): boolean {
  if (!isInsideBoard(fr, fc) || !isInsideBoard(tr, tc) || (fr === tr && fc === tc)) return false
  const dr = tr - fr, dc = tc - fc
  const ar = Math.abs(dr), ac = Math.abs(dc)
  switch (piece.type) {
    case 'rook': return (fr === tr || fc === tc) && countPiecesBetween(fr, fc, tr, tc, board) === 0
    case 'cannon':
      return (fr === tr || fc === tc) && countPiecesBetween(fr, fc, tr, tc, board) === (board[tr][tc] ? 1 : 0)
    case 'horse':
      if (!((ar === 2 && ac === 1) || (ar === 1 && ac === 2))) return false
      return !board[fr + (ar === 2 ? Math.sign(dr) : 0)][fc + (ac === 2 ? Math.sign(dc) : 0)]
    case 'elephant':
      return ar === 2 && ac === 2 && (piece.jieqi && !piece.concealed || (piece.side === 'red' ? tr >= 5 : tr <= 4)) && !board[(fr + tr) / 2][(fc + tc) / 2]
    case 'advisor': return ar === 1 && ac === 1 && (!!piece.jieqi && !piece.concealed || isInsidePalace(piece.side, tr, tc))
    case 'general':
      if (fc === tc && board[tr][tc]?.type === 'general' && board[tr][tc]?.side !== piece.side) {
        return countPiecesBetween(fr, fc, tr, tc, board) === 0
      }
      return ar + ac === 1 && isInsidePalace(piece.side, tr, tc)
    case 'soldier':
      return (dc === 0 && dr === (piece.side === 'red' ? -1 : 1)) ||
        (dr === 0 && ac === 1 && (piece.side === 'red' ? fr <= 4 : fr >= 5))
  }
}
export function findGeneral(side: Side, board: Board): Position | null {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col]?.side === side && board[row][col]?.type === 'general') return { row, col }
    }
  }
  return null
}
export function isInCheck(side: Side, board: Board): boolean {
  const general = findGeneral(side, board)
  if (!general) return true
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const piece = board[row][col]
      if (piece?.side === opposite(side) && isBasicMoveAllowed(piece, row, col, general.row, general.col, board)) return true
    }
  }
  return false
}
export function isMoveLegal(fr: number, fc: number, tr: number, tc: number, board: Board): boolean {
  if (!isInsideBoard(fr, fc) || !isInsideBoard(tr, tc)) return false
  const piece = board[fr][fc]
  if (!piece || board[tr][tc]?.side === piece.side || !isBasicMoveAllowed(piece, fr, fc, tr, tc, board)) return false
  const preview = cloneBoard(board)
  preview[tr][tc] = preview[fr][fc]
  preview[fr][fc] = null
  return !isInCheck(piece.side, preview)
}
export function getLegalMoves(fr: number, fc: number, board: Board): Position[] {
  const moves: Position[] = []
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) if (isMoveLegal(fr, fc, row, col, board)) moves.push({ row, col })
  }
  return moves
}
export function hasAnyLegalMove(side: Side, board: Board): boolean {
  for (let fr = 0; fr < ROWS; fr++) {
    for (let fc = 0; fc < COLS; fc++) {
      if (board[fr][fc]?.side !== side) continue
      for (let tr = 0; tr < ROWS; tr++) {
        for (let tc = 0; tc < COLS; tc++) if (isMoveLegal(fr, fc, tr, tc, board)) return true
      }
    }
  }
  return false
}
