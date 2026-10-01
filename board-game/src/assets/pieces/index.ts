import type { PieceType } from '../../types/game'
import blackPieces from './black-pieces-v2.png'

export const pieceShellSheet = blackPieces

const pieceOrder: Record<PieceType, number> = {
  rook: 0,
  horse: 1,
  elephant: 2,
  advisor: 3,
  general: 4,
  cannon: 5,
  soldier: 6,
}

export const pieceShellSheetSize = { width: 2297, height: 311 }

const pieceGap = 20

export function pieceShellViewBox(type: PieceType): string {
  const { height } = pieceShellSheetSize
  return `${pieceOrder[type] * (height + pieceGap)} 0 ${height} ${height}`
}
