import { useEffect, useState } from 'react'
import { POSITION_PIECES, POSITION_PIECE_LIMITS, positionPieceCount } from '../../../game/state/customPosition'
import type { Board, PieceType, Side } from '../../../types/game'
import { ChessPiece } from './ChessPiece'
import { PositionIcon } from './PositionIcon'
import { selectionPalette, buttonInteraction, gameUtilityButton } from '../../../lib/uiClasses'

const labels: Record<PieceType, string> = { rook: 'Xe', horse: 'Mã', elephant: 'Tượng', advisor: 'Sĩ', general: 'Tướng', cannon: 'Pháo', soldier: 'Tốt' }
const shortcuts = ['1', '2', '3', '4', '5', 'Q', 'W']
export function MobilePositionPalette({ piece, board, onChoose }: Pick<Props, 'piece' | 'board' | 'onChoose'>) {
  return <section aria-label="Khay quân điện thoại" className="mx-auto grid w-[86%] gap-0.5 rounded-lg border-2 border-[#d39a43] bg-[#170d07e6] p-1 shadow-[inset_0_0_0_1px_#ffe2a0] desktop:hidden">
    {(['red', 'black'] as const).map(side => <div key={side} aria-label={`Quân ${side === 'red' ? 'Đỏ' : 'Đen'}`} className="mx-auto grid w-full grid-cols-7 gap-0.5">{POSITION_PIECES.map(type => {
      const exhausted = positionPieceCount(board, side, type) >= POSITION_PIECE_LIMITS[type]
      return <button key={type} type="button" data-position-side={side} data-position-type={type} aria-label={`Đặt ${labels[type]} ${side === 'red' ? 'đỏ' : 'đen'}`} aria-pressed={piece?.side === side && piece.type === type} disabled={exhausted} onClick={() => onChoose(side, type)} className={`${buttonInteraction} mx-auto aspect-[108/112] w-[74%] min-w-0 rounded border p-0 disabled:opacity-35 ${piece?.side === side && piece.type === type ? 'border-[#ffe08b] bg-[#ffe08b]/15' : 'border-transparent'}`}><ChessPiece side={side} type={type} character="" scale={0.4} shadow={false} /></button>
    })}</div>)}
  </section>
}
export const positionPanelClass = 'border-2 border-[#d39a43] bg-[#170d07e6] shadow-[inset_0_0_0_1px_#ffe2a0,inset_0_0_0_4px_#57300f,0_4px_12px_#080401b3]'
interface Props {
  piece: { side: Side; type: PieceType } | null
  board: Board
  onChoose: (side: Side, type: PieceType) => void
  onReset: () => void; onDelete: () => void
}
export function PositionPalette({ piece, board, onChoose, onReset, onDelete }: Props) {
  const [activeSide, setActiveSide] = useState<Side>('black')
  useEffect(() => {
    if (piece) setActiveSide(piece.side)
  }, [piece])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable="true"], dialog')) return
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveSide(event.key === 'ArrowUp' ? 'black' : 'red')
        return
      }
      const index = shortcuts.indexOf(event.key.toUpperCase())
      if (index < 0) return
      event.preventDefault()
      const type = POSITION_PIECES[index]
      if (positionPieceCount(board, activeSide, type) < POSITION_PIECE_LIMITS[type]) onChoose(activeSide, type)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeSide, board, onChoose])
  return <section className={`${positionPanelClass} relative flex flex-col rounded-[6px] p-3 text-[#ffebbd]`} aria-label="Chọn quân để đặt">
    <div className="mb-3 flex justify-center gap-6">
      <div className="flex flex-col items-center gap-1"><button type="button" className={gameUtilityButton} aria-label="Xóa quân" title="Xóa tất cả quân, chỉ giữ Tướng" onClick={onDelete}><PositionIcon name="trash" /></button><span className="font-heading text-lg">Xóa quân</span></div>
      <div className="flex flex-col items-center gap-1"><button type="button" className={gameUtilityButton} aria-label="Cài lại" onClick={onReset}><PositionIcon name="restore" /></button><span className="font-heading text-lg">Cài lại</span></div>
    </div>
    <h2 className="m-0 text-center font-heading text-xl leading-tight">Chọn quân để đặt</h2>
    {(['black', 'red'] as const).map(side => <fieldset key={side} aria-label={`Quân ${side === 'red' ? 'Đỏ' : 'Đen'}`} onClick={() => setActiveSide(side)} className={`mt-3 cursor-pointer border px-1 py-2 hover:border-[#ffe08b] ${activeSide === side ? `${selectionPalette.selected.border} ${selectionPalette.selected.surface} ${selectionPalette.selected.glow} outline-2 outline-[#ffe08b]` : 'border-[#92612d]'}`}>
      <div className="grid grid-cols-5 gap-1">
        {POSITION_PIECES.map((type, index) => {
          const selected = piece?.side === side && piece.type === type
          const exhausted = positionPieceCount(board, side, type) >= POSITION_PIECE_LIMITS[type]
          return <button type="button" key={type} data-position-side={side} data-position-type={type} disabled={exhausted} aria-label={`Đặt ${labels[type]} ${side === 'red' ? 'đỏ' : 'đen'}${exhausted ? ', đã hết quân' : ''}`} aria-pressed={selected} onClick={() => { setActiveSide(side); onChoose(side, type) }} title={exhausted ? `Đã dùng hết ${labels[type]} ${side === 'red' ? 'Đỏ' : 'Đen'}` : `${shortcuts[index]}: ${labels[type]} ${side === 'red' ? 'Đỏ' : 'Đen'}`} className={`${buttonInteraction} flex w-full flex-col items-center rounded border p-0 leading-none disabled:cursor-not-allowed disabled:opacity-35 disabled:grayscale ${selected ? `${selectionPalette.selected.border} ${selectionPalette.selected.glow}` : 'border-transparent hover:border-[#d39a43]'}`}><span aria-hidden="true" className="mb-1 font-number text-lg leading-none">{shortcuts[index]}</span><span className="block aspect-[108/112] w-full"><ChessPiece side={side} type={type} character="" scale={0.4} shadow={false} /></span></button>
        })}
      </div>
    </fieldset>)}
  </section>
}
