import { memo } from 'react'
import type { PieceType, Side } from '../../../types/game'
import blackAdvisorReference from '../../../assets/pieces/codo-coden-v2/black-advisor-codo-coden-v2.png'
import blackCannonReference from '../../../assets/pieces/codo-coden-v2/black-cannon-codo-coden-v2.png'
import blackElephantReference from '../../../assets/pieces/codo-coden-v2/black-elephant-codo-coden-v2.png'
import blackGeneralReference from '../../../assets/pieces/codo-coden-v2/black-general-codo-coden-v2.png'
import blackHorseReference from '../../../assets/pieces/codo-coden-v2/black-horse-codo-coden-v2.png'
import blackRookReference from '../../../assets/pieces/codo-coden-v2/black-rook-codo-coden-v2.png'
import blackSoldierReference from '../../../assets/pieces/codo-coden-v2/black-soldier-codo-coden-v2.png'
import redAdvisorReference from '../../../assets/pieces/codo-coden-v2/red-advisor-codo-coden-v2.png'
import redCannonReference from '../../../assets/pieces/codo-coden-v2/red-cannon-codo-coden-v2.png'
import redElephantReference from '../../../assets/pieces/codo-coden-v2/red-elephant-codo-coden-v2.png'
import redGeneralReference from '../../../assets/pieces/codo-coden-v2/red-general-codo-coden-v2.png'
import redHorseReference from '../../../assets/pieces/codo-coden-v2/red-horse-codo-coden-v2.png'
import redRookReference from '../../../assets/pieces/codo-coden-v2/red-rook-codo-coden-v2.png'
import redSoldierReference from '../../../assets/pieces/codo-coden-v2/red-soldier-codo-coden-v2.png'

interface Props {
  side: Side
  type: PieceType
  character: string
  scale?: number
  moving?: boolean
}

const redPieceReferences: Record<PieceType, string> = {
  rook: redRookReference,
  horse: redHorseReference,
  elephant: redElephantReference,
  advisor: redAdvisorReference,
  general: redGeneralReference,
  cannon: redCannonReference,
  soldier: redSoldierReference,
}

const blackPieceReferences: Record<PieceType, string> = {
  rook: blackRookReference,
  horse: blackHorseReference,
  elephant: blackElephantReference,
  advisor: blackAdvisorReference,
  general: blackGeneralReference,
  cannon: blackCannonReference,
  soldier: blackSoldierReference,
}

export const ChessPiece = memo(function ChessPiece({ side, type, scale = 1, moving = false }: Props) {
  const source = side === 'red' ? redPieceReferences[type] : blackPieceReferences[type]
  return <img src={source} alt="" aria-hidden="true" draggable={false} style={{ fontSize: 16 * scale }} className={`m-0 block size-full border-0 p-0 object-contain ${moving ? 'drop-shadow-none' : 'drop-shadow-[0.5625em_0.8125em_0.25em_#6a4827c2]'}`} />
})
