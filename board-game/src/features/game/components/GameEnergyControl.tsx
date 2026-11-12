import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSessionStore } from '../../../store/sessionStore'
import { EnergyDialog } from '../../lobby/components/EnergyDialog'
import energyIcon from '../../../assets/home-actions/energy-icon-v2.png'

type Props = { variant: 'xiangqi' | 'jieqi' }

export function GameEnergyControl({ variant }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const energy = useSessionStore(state => state.energy)
  const unlimited = useSessionStore(state => state.account?.energyUnlimited ?? false)
  const value = unlimited ? '∞' : `${energy}/5`
  const energyRecoveryAt = useSessionStore(state => state.energyRecoveryAt)
  const [showRecovery, setShowRecovery] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const holdTimer = useRef<number | null>(null)
  const longPressTriggered = useRef(false)

  useEffect(() => {
    if (!showRecovery || unlimited || energy >= 5) return
    setNow(Date.now())
    const tick = window.setInterval(() => {
      if (document.visibilityState === 'visible') setNow(Date.now())
    }, 1000)
    return () => window.clearInterval(tick)
  }, [showRecovery, energy, unlimited])
  useEffect(() => () => { if (holdTimer.current !== null) window.clearTimeout(holdTimer.current) }, [])

  const closeHold = () => {
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current)
    holdTimer.current = null
    setShowRecovery(false)
  }
  const recoverySeconds = energyRecoveryAt === null ? 420 : Math.max(0, Math.ceil((energyRecoveryAt - now) / 1000))
  const recoveryText = unlimited
    ? 'Năng lượng vô hạn'
    : energy >= 5
      ? 'Năng lượng đã đầy'
      : `Hồi năng lượng sau: ${Math.floor(recoverySeconds / 60)}:${String(recoverySeconds % 60).padStart(2, '0')}`

  return (
    <>
      <button
        type="button"
        data-ui-selection-sound
        data-game-energy-button
        aria-label={`Năng lượng ${unlimited ? 'vô hạn' : value}. Mở bảng năng lượng`}

        onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) { setNow(Date.now()); setShowRecovery(true) } }}
        onMouseLeave={() => setShowRecovery(false)}
        onTouchStart={() => {
          if (holdTimer.current !== null) window.clearTimeout(holdTimer.current)
          longPressTriggered.current = false
          holdTimer.current = window.setTimeout(() => {
            longPressTriggered.current = true
            setNow(Date.now())
            setShowRecovery(true)
            holdTimer.current = null
          }, 450)
        }}
        onTouchEnd={closeHold}
        onTouchCancel={closeHold}
        onTouchMove={closeHold}
        onClick={() => {
          if (longPressTriggered.current) { longPressTriggered.current = false; return }
          setShowRecovery(false)
          if (!dialogRef.current?.open) dialogRef.current?.showModal()
        }}
        className={[
          'pointer-events-auto absolute top-0 right-[195px] z-[65]',
          'flex h-[52px] w-[52px] shrink-0 items-center justify-center',
          'rounded-full border-[3px] border-[#e7bd61]',
          'bg-[radial-gradient(circle_at_35%_25%,#80501e,#3a210f_72%,#211207)]',
          'shadow-[inset_0_0_0_2px_#8a5626,0_2px_5px_#0009]',
          'hover:brightness-110',
          'compact:fixed',
          'compact:left-[calc(8px+42px+clamp(4px,calc((100vw-352px)/2),8px))]',
          'compact:right-auto compact:top-auto compact:z-[260]',
          'compact:h-[48px] compact:w-[48px]',
          'compact:bottom-[8px]',
        ].join(' ')}
      >
        <img
          src={energyIcon}
          alt=""
          aria-hidden="true"
          className="pointer-events-none h-[70%] w-auto max-w-[75%] object-contain"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[7px] -bottom-[5px] flex h-[23px] min-w-[28px] items-center justify-center rounded-full border-2 border-[#f0c56a] bg-[#42250f] px-[3px] font-number text-[12px] font-bold leading-none tabular-nums text-[#ffe7a2] shadow-[0_2px_4px_#000a]"
        >
          {value}
        </span>
        {showRecovery && (
          <span
            role="tooltip"
            data-game-energy-recovery-tooltip
            className="pointer-events-none absolute right-0 top-[calc(100%+10px)] z-[300] w-max max-w-[min(90vw,300px)] rounded-md border border-[#b99052] bg-[#2c1b12]/95 px-3 py-2 text-center font-body text-sm font-normal leading-snug text-[#f0d4a1] shadow-[0_4px_12px_#0009] compact:left-0 compact:right-auto compact:bottom-[calc(100%+10px)] compact:top-auto compact:text-xs"
          >{recoveryText}</span>
        )}
      </button>

      {typeof document !== 'undefined' && createPortal(
        <EnergyDialog dialogRef={dialogRef} onUnavailable={() => {}} />,
        document.body,
      )}
    </>
  )
}