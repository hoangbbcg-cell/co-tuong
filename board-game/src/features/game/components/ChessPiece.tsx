import { memo, useId } from 'react'
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
  shadow?: boolean
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

export const CHESS_PIECE_ARTWORK = { red: redPieceReferences, black: blackPieceReferences }
export const pieceColorFilter = (side: Side) => side === 'black' ? 'brightness(0.985) saturate(1.015)' : ''
// Displace only the inset face; neutral grey leaves the outer wooden body fixed.
const faceAlignmentMap = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><radialGradient id="face" cx="50%" cy="45%" r="44%"><stop offset="0" stop-color="#008080"/><stop offset="85%" stop-color="#008080"/><stop offset="100%" stop-color="#808080"/></radialGradient></defs><rect width="100" height="100" fill="url(#face)"/></svg>')}`
export const ChessPiece = memo(function ChessPiece({ side, type, scale = 1, moving = false, shadow = true }: Props) {
  const alignmentId = useId().replace(/:/g, '')
  const alignmentFilter = `url(#${alignmentId})`
  const source = CHESS_PIECE_ARTWORK[side][type]
  const filter = [alignmentFilter, moving || !shadow ? '' : `drop-shadow(${9 * scale}px ${13 * scale}px ${4 * scale}px #6a4827c2)`].filter(Boolean).join(' ') || 'none'
  return <span className="relative m-0 block size-full border-0 p-0 leading-none">
    {side === 'red' && <svg width="0" height="0" aria-hidden="true" className="pointer-events-none absolute"><defs><filter id={alignmentId} x="0" y="0" width="1" height="1" primitiveUnits="objectBoundingBox" colorInterpolationFilters="sRGB"><feImage href={faceAlignmentMap} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="face-map" /><feDisplacementMap in="SourceGraphic" in2="face-map" scale="0.04" xChannelSelector="R" yChannelSelector="G" /></filter></defs></svg>}
    {side === 'black' && <svg width="0" height="0" aria-hidden="true" className="pointer-events-none absolute"><defs><filter id={alignmentId} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 5 0 0 0 -3" result="wood-mask" /><feComponentTransfer in="SourceGraphic" result="matched-wood"><feFuncR type="gamma" amplitude="0.97" exponent="0.61" offset="0" /><feFuncG type="gamma" amplitude="0.887" exponent="0.62" offset="0" /><feFuncB type="gamma" amplitude="0.77" exponent="0.607" offset="0" /></feComponentTransfer><feComposite in="matched-wood" in2="wood-mask" operator="in" result="wood" /><feComposite in="SourceGraphic" in2="wood-mask" operator="out" result="letter" /><feComposite in="letter" in2="wood" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" /></filter></defs></svg>}
    <img src={source} alt="" aria-hidden="true" draggable={false} data-piece-side={side} data-face-filter={alignmentFilter} style={{ fontSize: 16 * scale, filter }} className="m-0 block size-full border-0 p-0 object-fill" />
  </span>
})
