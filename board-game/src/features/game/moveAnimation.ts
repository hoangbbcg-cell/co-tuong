import type { Move, Position } from '../../types/game'

export const PIECE_MOVE_DURATION_MS = 400

export function getPieceMovePath(move: Move): Position[] {
  return [move.from, move.to]
}
