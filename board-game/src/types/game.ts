export type Side = 'red' | 'black'
export type PieceType = 'rook' | 'horse' | 'elephant' | 'advisor' | 'general' | 'cannon' | 'soldier'
export type GameVariant = 'xiangqi' | 'jieqi'
export interface Piece {
  id: string; type: PieceType; side: Side; name: string
  jieqi?: boolean
  concealed?: { type: PieceType; name: string }
}
export type Board = (Piece | null)[][]
export interface Position { row: number; col: number }
export interface Move { from: Position; to: Position }
export interface RepetitionShuttle {
  pieceId: string
  from: Position
  to: Position
}
export interface RepetitionCycle {
  starter: Side
  shuttles: Record<Side, RepetitionShuttle | null>
  phase: 0 | 1 | 2 | 3
  rounds: number
}
export interface RepetitionState {
  cycle: RepetitionCycle | null
  warning: boolean
  warningSide: Side | null
}
export interface MoveHint extends Position { type: 'legal' | 'repetition-forbidden' }
export interface GameState {
  turnTimeLimitMs?: number
  repetition?: RepetitionState
  variant?: GameVariant
  board: Board
  currentTurn: Side
  phase: 'ready' | 'playing' | 'finished'
  remainingTime: Record<Side, number>
  lastClockUpdate: number
  turnElapsed: number
  result: { winner: Side | null; reason: 'capture' | 'checkmate' | 'stalemate' | 'timeout' | 'resign' | 'draw' | 'leave' } | null
  lastMove: Move | null
}
