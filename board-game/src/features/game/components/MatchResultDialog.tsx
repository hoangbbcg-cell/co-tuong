import { useEffect, useRef } from 'react'
import win from '../../../assets/game-result/victory.png'
import loss from '../../../assets/game-result/defeat.png'
import goldIcon from '../../../assets/home-actions/gold-icon-v2.png'
import redGeneral from '../../../assets/pieces/red-general.png'
import concealedPiece from '../../../assets/history/history-hidden-user.png'
import type { GameVariant } from '../../../types/game'
import { CrispUiImage } from '../../../lib/CrispUiImage'

export function MatchResultDialog({ outcome, onClose, rewardGold, eloDelta, variant = 'xiangqi' }: { outcome: 'win' | 'loss'; onClose: () => void; rewardGold?: number; eloDelta?: number; variant?: GameVariant }) {
  const ref = useRef<HTMLDialogElement>(null)
  const dismissAfter = useRef(Infinity)
  useEffect(() => {
    ref.current?.showModal()
    dismissAfter.current = performance.now() + 1000
  }, [])
  const dismiss = () => {
    if (performance.now() >= dismissAfter.current) onClose()
  }
  return <dialog ref={ref} aria-label={outcome === 'win' ? 'Chiến thắng' : 'Thất bại'} onClick={dismiss} onCancel={event => { event.preventDefault(); dismiss() }}
    className="m-auto overflow-visible border-0 bg-transparent p-0 leading-none shadow-none backdrop:bg-black/60"
    style={{ width: 'min(92vw, 68dvh)', maxWidth: 'none', maxHeight: 'none' }}>
    <div className="relative m-0 h-fit w-fit border-0 bg-transparent p-0 leading-none">
      <img src={outcome === 'win' ? win : loss} alt={outcome === 'win' ? 'Chiến thắng' : 'Thất bại'} className="m-0 block h-auto w-full border-0 p-0" />
      <div className="absolute flex flex-col justify-center gap-2" style={{ left: '18%', top: '56%', width: '64%', height: '16%' }}>
      {rewardGold !== undefined && <p aria-label={`${rewardGold < 0 ? 'Trừ' : 'Nhận'} ${Math.abs(rewardGold)} vàng`} className="m-0 flex items-center justify-start gap-2 font-number text-[clamp(18px,3vw,30px)] font-normal leading-none text-[#663014] lining-nums tabular-nums">
        <CrispUiImage src={goldIcon} alt="" aria-hidden="true" className="m-0 block h-[1.25em] w-auto shrink-0 border-0 p-0 object-contain" />
        <span>{rewardGold < 0 ? '−' : '+'}{Math.abs(rewardGold)}</span>
      </p>}
      {eloDelta !== undefined && <p aria-label={`Elo ${variant === 'jieqi' ? 'Cờ Úp' : 'Cờ Tướng'} ${eloDelta < 0 ? '−' : '+'}${Math.abs(eloDelta)}`} className="m-0 flex items-center justify-start gap-2 font-number text-[clamp(18px,3vw,30px)] font-normal leading-none text-[#663014] lining-nums tabular-nums">
        <CrispUiImage src={variant === 'jieqi' ? concealedPiece : redGeneral} alt="" aria-hidden="true" className="m-0 block size-[1.25em] shrink-0 border-0 p-0 object-contain" />
        <span>{eloDelta < 0 ? '−' : '+'}{Math.abs(eloDelta)}</span>
      </p>}
      </div>
      <button autoFocus type="button" aria-label="Xác nhận"
        className="absolute cursor-pointer rounded-xl border-0 bg-transparent p-0 shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe19a]"
        style={{ left: '25%', top: '77.5%', width: '50%', height: '10%' }} />
    </div>
  </dialog>
}
