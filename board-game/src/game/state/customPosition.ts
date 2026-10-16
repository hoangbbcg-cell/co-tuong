import type { Board, Piece, PieceType, Position, Side } from '../../types/game'
import { createGame, createInitialBoard, opposite } from './initial'
import { countPiecesBetween, findGeneral, hasAnyLegalMove, isInCheck, isInsidePalace } from '../rules'

export const POSITION_PIECES: PieceType[] = ['rook', 'horse', 'elephant', 'advisor', 'general', 'cannon', 'soldier']
export const POSITION_PIECE_LIMITS: Record<PieceType, number> = { general: 1, advisor: 2, elephant: 2, horse: 2, rook: 2, cannon: 2, soldier: 5 }
const symbols: Record<PieceType, string> = { rook: 'r', horse: 'n', elephant: 'b', advisor: 'a', general: 'k', cannon: 'c', soldier: 'p' }
const templates = createInitialBoard().flat().filter((piece): piece is Piece => !!piece)
export function positionPiece(side: Side, type: PieceType, id: string): Piece {
  const template = templates.find(piece => piece.side === side && piece.type === type)!
  return { ...template, id }
}
export const emptyPosition = (): Board => Array.from({ length: 10 }, () => Array<Piece | null>(9).fill(null))

export function positionPieceCount(board: Board, side: Side, type: PieceType): number {
  return board.reduce((total, row) => total + row.filter(piece => piece?.side === side && piece.type === type).length, 0)
}

function piecePositionError(side: Side, type: PieceType, row: number, col: number): string | null {
  const rank = side === 'black' ? row : 9 - row
  if (type === 'general' && !isInsidePalace(side, row, col)) return 'Tướng phải nằm trong cung.'
  if (type === 'advisor' && ![[0, 3], [0, 5], [1, 4], [2, 3], [2, 5]].some(([r, c]) => r === rank && c === col)) return 'Sĩ phải nằm đúng điểm trong cung.'
  if (type === 'elephant' && ![[0, 2], [0, 6], [2, 0], [2, 4], [2, 8], [4, 2], [4, 6]].some(([r, c]) => r === rank && c === col)) return 'Tượng phải nằm đúng điểm bên phần sân của mình.'
  if (type === 'soldier' && (rank < 3 || rank < 5 && col % 2 !== 0)) return 'Tốt đang ở vị trí không thể đi tới.'
  return null
}

export function positionPlacementError(board: Board, side: Side, type: PieceType, target: Position, from?: Position): string | null {
  const next = board.map(row => [...row])
  const movingPiece = from ? next[from.row][from.col] : null
  if (from) next[from.row][from.col] = null
  next[target.row][target.col] = movingPiece?.side === side && movingPiece.type === type
    ? movingPiece
    : positionPiece(side, type, movingPiece?.id ?? `preview-${side}-${type}`)

  if (positionPieceCount(next, side, type) > POSITION_PIECE_LIMITS[type]) return `Đã dùng hết số quân ${side === 'red' ? 'Đỏ' : 'Đen'} loại này.`
  const invalidPosition = piecePositionError(side, type, target.row, target.col)
  if (invalidPosition) return invalidPosition

  return null
}

export function positionError(board: Board, turn: Side): string | null {
  for (const side of ['red', 'black'] as const) {
    for (const type of POSITION_PIECES) {
      const count = positionPieceCount(board, side, type)
      if (count > POSITION_PIECE_LIMITS[type]) return `Quân ${side === 'red' ? 'Đỏ' : 'Đen'} vượt số lượng cho phép.`
      if (type === 'general' && count !== 1) return 'Mỗi bên phải có đúng một Tướng.'
    }
    for (let row = 0; row < 10; row++) for (let col = 0; col < 9; col++) {
      const piece = board[row][col]
      if (piece?.side !== side) continue
      const invalidPosition = piecePositionError(side, piece.type, row, col)
      if (invalidPosition) return invalidPosition
    }
  }
  const red = findGeneral('red', board)!, black = findGeneral('black', board)!
  if (red.col === black.col && countPiecesBetween(red.row, red.col, black.row, black.col, board) === 0) return 'Hai Tướng không được đối mặt.'
  if (isInCheck(opposite(turn), board)) return 'Bên chưa tới lượt không được đang bị chiếu.'
  if (!hasAnyLegalMove(turn, board)) return 'Bên tới lượt không còn nước đi hợp lệ.'
  return null
}

export function positionFen(board: Board, turn: Side): string {
  const ranks = board.map(row => {
    let rank = '', empty = 0
    for (const piece of row) {
      if (!piece) { empty++; continue }
      if (empty) { rank += empty; empty = 0 }
      const symbol = symbols[piece.type]
      rank += piece.side === 'red' ? symbol.toUpperCase() : symbol
    }
    return rank + (empty || '')
  })
  return `${ranks.join('/')} ${turn === 'red' ? 'w' : 'b'} - - 0 1`
}

export function gameFromPositionFen(input: unknown) {
  if (typeof input !== 'string' || input.length > 180 || !/^[rnbakcpRNBAKCP1-9/]+ [wb] - - 0 1$/.test(input)) throw new Error('Mã thế cờ không hợp lệ.')
  const [placement, side] = input.split(' ')
  const ranks = placement.split('/')
  if (ranks.length !== 10) throw new Error('Thế cờ phải có 10 hàng.')
  const board = emptyPosition()
  ranks.forEach((rank, row) => {
    let col = 0
    for (const symbol of rank) {
      if (/^[1-9]$/.test(symbol)) col += Number(symbol)
      else {
        const type = POSITION_PIECES.find(type => symbols[type] === symbol.toLowerCase())
        if (!type || col >= 9) throw new Error('Hàng cờ không hợp lệ.')
        board[row][col] = positionPiece(symbol === symbol.toUpperCase() ? 'red' : 'black', type, `position-${row}-${col}`)
        col++
      }
    }
    if (col !== 9) throw new Error('Mỗi hàng phải có 9 giao điểm.')
  })
  const turn: Side = side === 'w' ? 'red' : 'black'
  const error = positionError(board, turn)
  if (error) throw new Error(error)
  return { ...createGame(), board, currentTurn: turn }
}
