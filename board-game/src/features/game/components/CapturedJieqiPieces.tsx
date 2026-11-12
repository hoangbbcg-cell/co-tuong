import type { Board, JieqiCapture, PieceType, Side } from '../../../types/game'
import concealedBack from '../../../assets/pieces/concealed-back.png'
import { ChessPiece } from './ChessPiece'

/** Used for older room snapshots and by V1 tests, not to guess missing capture identities. */
export function countCapturedJieqiPieces(board: Board, ownSide: Side): number {
  const otherSide: Side = ownSide === 'red' ? 'black' : 'red'
  return Math.max(0, Math.min(16, 16 - board.flat().filter(piece => piece?.side === otherSide).length))
}

const types: PieceType[] = ['rook', 'horse', 'cannon', 'elephant', 'advisor', 'soldier', 'general']
const glyph: Record<Side, Record<PieceType, string>> = {
  red: { rook: '車', horse: '馬', cannon: '炮', elephant: '相', advisor: '仕', soldier: '兵', general: '帥' },
  black: { rook: '車', horse: '馬', cannon: '砲', elephant: '象', advisor: '士', soldier: '卒', general: '將' },
}

function CapturedRow({ items, by, viewerSide, sidePosition }: {
  items: JieqiCapture[]
  by: Side
  viewerSide: Side | null
  sidePosition: 'left' | 'right'
}) {
  const rows: { key: string; type: PieceType | null; side: Side; dark: boolean; count: number }[] = []
  for (const item of items.filter(entry => entry.by === by)) {
    // Trust the already-redacted snapshot; even a mistaken UI role must not unmask data.
    const privateIdentity = item.concealed && viewerSide === by && item.type !== null
    const type = !item.concealed || privateIdentity ? item.type : null
    const key = `${item.side}:${type ?? 'covered'}:${privateIdentity ? 'dim' : 'clear'}`
    const match = rows.find(row => row.key === key)
    if (match) match.count++
    else rows.push({ key, type, side: item.side, dark: privateIdentity, count: 1 })
  }
  const priority = (row: typeof rows[number]) =>
    row.type === null ? 0 : row.dark ? 1 : 2

  rows.sort((a, b) => {
    const difference = priority(a) - priority(b)
    if (difference !== 0) {
      return difference
    }

    const aType = a.type === null ? -1 : types.indexOf(a.type)
    const bType = b.type === null ? -1 : types.indexOf(b.type)

    return aType - bType
  })
  return <div className={`flex max-w-full flex-nowrap items-center gap-[4px] compact:gap-[2px] ${sidePosition === 'right' ? 'compact:w-full compact:flex-row-reverse compact:justify-start' : 'compact:justify-start'}`} aria-label={`Quân đã ăn của bên ${by === 'red' ? 'đỏ' : 'đen'}`}>
    {rows.map(row => <span key={row.key} className="relative grid size-[34px] shrink-0 place-items-center compact:size-[27px]" title={row.type ? glyph[row.side][row.type] : 'Quân úp'}>
      {row.type === null
        ? <img src={concealedBack} alt="Quân úp" draggable={false} className="size-full object-contain" />
        : <span className={`relative block size-[34px] compact:size-[27px] ${row.dark ? 'brightness-[0.57]' : ''}`}><ChessPiece side={row.side} type={row.type} character={glyph[row.side][row.type]} scale={0.25} moving={false} /></span>}
      <span className="absolute -bottom-[2px] -right-[2px] min-w-[14px] rounded-full bg-[#39251a] px-[2px] text-[10px] font-bold leading-[14px] text-[#ffe4a1] compact:text-[9px]">{row.count}</span>
    </span>)}
  </div>
}

export function CapturedJieqiPieces({ board: _board, ownSide: _ownSide, captures, viewerSide }: {
  board: Board; ownSide: Side; captures?: JieqiCapture[]; viewerSide: Side | null
}) {
  if (!captures?.length) return null
  const upper: Side = viewerSide ?? 'red'
  const lower: Side = upper === 'red' ? 'black' : 'red'
  return <>
    <aside data-jieqi-captures={upper} className="pointer-events-none absolute left-[12px] top-[475px] z-[70] w-[300px] short-desktop:top-[395px] compact:top-[calc((164px+var(--board-height)+100dvh-58px)/2)] compact:left-[4px] compact:w-[calc(50vw-12px)] compact:-translate-y-1/2" aria-label={`Bên ${upper === 'red' ? 'đỏ' : 'đen'} đã ăn`}>
      <CapturedRow items={captures} by={upper} viewerSide={viewerSide} sidePosition="left" />
    </aside>
    <aside data-jieqi-captures={lower} className="pointer-events-none absolute left-[12px] top-[560px] z-[70] w-[300px] short-desktop:top-[480px] compact:top-[calc((164px+var(--board-height)+100dvh-58px)/2)] compact:left-auto compact:right-[4px] compact:w-[calc(50vw-12px)] compact:-translate-y-1/2" aria-label={`Bên ${lower === 'red' ? 'đỏ' : 'đen'} đã ăn`}>
      <CapturedRow items={captures} by={lower} viewerSide={viewerSide} sidePosition="right" />
    </aside>
  </>
}