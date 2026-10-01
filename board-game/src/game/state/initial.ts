import type { Board, GameState, Piece, PieceType, Side } from '../../types/game'

export const ROWS = 10
export const COLS = 9
export const INITIAL_TIME = 10 * 60 * 1000
export const TURN_TIME_LIMIT_MS = 60_000
const backRank: PieceType[] = ['rook', 'horse', 'elephant', 'advisor', 'general', 'advisor', 'elephant', 'horse', 'rook']
const names: Record<Side, Record<PieceType, string>> = {
  red: { rook: '車', horse: '馬', elephant: '相', advisor: '仕', general: '帥', cannon: '炮', soldier: '兵' },
  black: { rook: '車', horse: '馬', elephant: '象', advisor: '士', general: '將', cannon: '砲', soldier: '卒' },
}
export function createInitialBoard(): Board {
  const board: Board = Array.from({ length: ROWS }, () => Array<Piece | null>(COLS).fill(null))
  for (const side of ['red', 'black'] as const) {
    const place = (type: PieceType, row: number, col: number) => {
      board[row][col] = { id: `${side}-${row}-${col}`, type, side, name: names[side][type] }
    }
    backRank.forEach((type, col) => place(type, side === 'red' ? 9 : 0, col))
    for (const col of [1, 7]) place('cannon', side === 'red' ? 7 : 2, col)
    for (const col of [0, 2, 4, 6, 8]) place('soldier', side === 'red' ? 6 : 3, col)
  }
  return board
}
export function createGame(now = 0, initialTime = INITIAL_TIME): GameState {
  return { board: createInitialBoard(), currentTurn: 'red', phase: 'ready',
    remainingTime: { red: initialTime, black: initialTime }, lastClockUpdate: now,
    turnElapsed: 0, result: null, lastMove: null }
}
export const opposite = (side: Side): Side => side === 'red' ? 'black' : 'red'
