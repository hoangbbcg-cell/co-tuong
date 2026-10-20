import { useEffect, useRef } from 'react'
import win from '../../../assets/game-result/victory.png'
import loss from '../../../assets/game-result/defeat.png'
import goldIcon from '../../../assets/home-actions/gold-icon-v2.png'
import { CrispUiImage } from '../../../lib/CrispUiImage'

export function MatchResultDialog({ outcome, onClose, rewardGold }: { outcome: 'win' | 'loss'; onClose: () => void; rewardGold?: number }) {
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
      {outcome === 'win' && !!rewardGold && <p aria-label={`Nhận ${rewardGold} vàng`} className="absolute m-0 flex items-center justify-center gap-2 font-number text-[clamp(18px,3vw,30px)] font-normal leading-none text-[#663014] lining-nums tabular-nums" style={{ left: '14%', top: '56%', width: '72%', height: '16%' }}>
        <CrispUiImage src={goldIcon} alt="" aria-hidden="true" className="m-0 block h-[1.25em] w-auto shrink-0 border-0 p-0 object-contain" />
        <span>+{rewardGold}</span>
      </p>}
      <button autoFocus type="button" aria-label="Xác nhận"
        className="absolute cursor-pointer rounded-xl border-0 bg-transparent p-0 shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe19a]"
        style={{ left: '25%', top: '77.5%', width: '50%', height: '10%' }} />
    </div>
  </dialog>
}
