import { useEffect, useRef, useState } from 'react'
import { useSessionStore } from '../../../store/sessionStore'
import { buttonInteraction } from '../../../lib/uiClasses'
import energyIcon from '../../../assets/home-actions/energy-icon.png'

export function EnergyNotice() {
  const open = useSessionStore(state => state.energyNoticeOpen)
  const videoUnavailable = useSessionStore(state => state.energyVideoUnavailable)
  const dismiss = useSessionStore(state => state.dismissEnergyNotice)
  const showVideoUnavailable = useSessionStore(state => state.showEnergyVideoUnavailable)
  const energy = useSessionStore(state => state.energy)
  const energyRecoveryAt = useSessionStore(state => state.energyRecoveryAt)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [countdownOpen, setCountdownOpen] = useState(true)
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const dialog = dialogRef.current
    if (open) {
      setCountdownOpen(true)
      setNow(Date.now())
    }
    if (open && !dialog?.open) dialog?.showModal()
    if (!open && dialog?.open) dialog.close()
  }, [open])
  useEffect(() => {
    if (!open || energy >= 5) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [energy, open])
  if (!open) return null
  const seconds = energyRecoveryAt === null ? 420 : Math.max(0, Math.ceil((energyRecoveryAt - now) / 1000))
  const countdown = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
  return <dialog ref={dialogRef} data-screenshot-exclude="true" onClick={event => { if (event.target === event.currentTarget) dismiss() }} onCancel={event => event.preventDefault()} className="m-auto w-[min(490px,94vw)] max-w-none overflow-visible border-0 bg-transparent p-0 text-[#ffe5ac] backdrop:bg-[#080502b8]">
    <section role="alertdialog" aria-modal="true" aria-labelledby="energy-notice-title" onClick={() => setCountdownOpen(false)} className="relative w-[min(490px,94vw)] rounded-xl border-2 border-[#d7a64d] bg-[linear-gradient(145deg,#4c2a13,#1c0e07)] px-6 py-7 text-center text-[#ffe5ac] shadow-[inset_0_0_0_2px_#6e421d,0_10px_40px_#000c]">
    <div className="absolute top-3 left-3 z-10" onClick={event => { event.stopPropagation(); setCountdownOpen(false) }}>
      {countdownOpen && <div className="absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-md border border-[#b99052] bg-[#2c1b12]/95 px-3 py-2 text-sm text-[#f0d4a1] shadow-[0_4px_12px_#0009]" onClick={event => event.stopPropagation()}>
        Hồi năng lượng sau: <span className="font-number lining-nums tabular-nums">{countdown}</span>
      </div>}
      <button type="button" aria-label={`Năng lượng ${energy} trên 5`} onClick={event => { event.stopPropagation(); setCountdownOpen(open => !open) }} className="flex h-9 items-center gap-2 rounded-md border border-[#d7a64d] bg-[#2c1b12]/95 px-2.5 text-[#ffe5ac] shadow-[0_3px_10px_#0009]">
        <img src={energyIcon} alt="" className="block size-6 object-contain" />
        <span className="font-number text-base lining-nums tabular-nums">{energy}/5</span>
      </button>
    </div>
      <h2 id="energy-notice-title" className="-translate-y-1 font-sans text-[28px] font-normal">Bạn đã hết năng lượng</h2>
      <p className="-translate-y-1 mt-3 font-sans text-base font-normal">Xem video để hồi năng lượng</p>
      {videoUnavailable && <p role="status" className="mt-2 text-sm text-[#f3c77c]">Tính năng xem video chưa được tích hợp.</p>}
      <div className="mt-7 flex justify-center gap-3">
        <button type="button" className={`${buttonInteraction} rounded border border-[#b99052] bg-[#422718] px-4 py-2.5 text-base text-[#f0d4a1] shadow-[inset_0_1px_3px_#7a4c2788,0_2px_4px_#100904aa] hover:bg-[#60432c] hover:text-[#ffe5ac]`} onClick={event => { event.stopPropagation(); dismiss() }}>Bỏ qua</button>
        <button type="button" className={`${buttonInteraction} rounded border border-[#ffe28a] bg-[linear-gradient(135deg,#fff0a6,#f6ca52_52%,#d99020)] px-5 py-2.5 font-sans text-lg font-bold text-[#482508] shadow-[inset_0_1px_2px_#fff8ce,0_0_12px_#ffc84499] hover:brightness-110`} onClick={showVideoUnavailable}>Xem video</button>
      </div>
    </section>
  </dialog>
}
