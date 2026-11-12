import { useEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from 'react'
import { buttonInteraction, shopMobileDialogFrameClass } from '../../../lib/uiClasses'

function useMobileHonorPress(onStart?: () => void, onEnd?: () => void) {
  const pointer = useRef<number | null>(null)
  const callbacks = useRef({ onStart, onEnd })
  callbacks.current = { onStart, onEnd }
  const finish = (id?: number) => {
    if (pointer.current === null || id !== undefined && id !== pointer.current) return
    pointer.current = null
    callbacks.current.onEnd?.()
  }
  useEffect(() => {
    if (!onStart) return
    const release = (event: PointerEvent) => finish(event.pointerId)
    const blur = () => finish()
    const hidden = () => { if (document.visibilityState !== 'visible') finish() }
    window.addEventListener('pointerup', release, true)
    window.addEventListener('pointercancel', release, true)
    window.addEventListener('blur', blur)
    document.addEventListener('visibilitychange', hidden)
    return () => {
      window.removeEventListener('pointerup', release, true)
      window.removeEventListener('pointercancel', release, true)
      window.removeEventListener('blur', blur)
      document.removeEventListener('visibilitychange', hidden)
      finish()
    }
  }, [!!onStart])
  return {
    onPointerDown: (event: ReactPointerEvent<HTMLElement>) => {
      if (!callbacks.current.onStart || event.button !== 0 || event.isPrimary === false || !window.matchMedia('(max-width: 800px)').matches) return
      event.preventDefault()
      pointer.current = event.pointerId
      try { event.currentTarget.setPointerCapture?.(event.pointerId) } catch { /* Window release handlers also cover a lost capture. */ }
      callbacks.current.onStart()
    },
    onPointerUp: (event: ReactPointerEvent<HTMLElement>) => finish(event.pointerId),
    onPointerCancel: (event: ReactPointerEvent<HTMLElement>) => finish(event.pointerId),
    onLostPointerCapture: (event: ReactPointerEvent<HTMLElement>) => finish(event.pointerId),
    onContextMenu: (event: ReactMouseEvent<HTMLElement>) => { if (callbacks.current.onStart && window.matchMedia('(max-width: 800px)').matches) event.preventDefault() },
  }
}

export function RewardItemTile({ label, amount, onClick, onPressStart, onPressEnd, children }: { label: string; amount?: string; onClick: () => void; onPressStart?: () => void; onPressEnd?: () => void; children: ReactNode }) {
  const press = useMobileHonorPress(onPressStart, onPressEnd)
  return <div className="flex w-[min(25cqw,calc(100cqh_-_26px))] shrink-0 flex-col items-center gap-[4px] text-[#663014]" aria-label={label}>
    <button {...press} type="button" aria-label={`Xem ${label}`} onClick={event => { event.stopPropagation(); onClick() }} className={`${buttonInteraction} grid aspect-square w-full place-items-center overflow-hidden rounded-[6px] border-2 border-[#bc7f2d] bg-[linear-gradient(135deg,#f8dda0,#d8a45e)] p-[3px] shadow-[inset_0_0_0_1px_#fff0bd] ${onPressStart ? 'compact:touch-none compact:select-none' : ''}`}>{children}</button>
    {amount && <span className="font-number text-[clamp(13px,2.8vw,24px)] font-semibold leading-none lining-nums tabular-nums">{amount}</span>}
  </div>
}

export function RewardPreviewDialog({ name, amount, onClose, children, details, detailsVisible = true, detailsPressed = false, onCloseDetails }: { name: string; amount?: string; onClose: () => void; children: ReactNode; details?: (onClose: () => void) => ReactNode; detailsVisible?: boolean; detailsPressed?: boolean; onCloseDetails?: () => void }) {
  const backdropPressed = useRef(false)
  const [held, setHeld] = useState(false)
  const press = useMobileHonorPress(details ? () => setHeld(true) : undefined, () => setHeld(false))
  const showMobileDetails = held || detailsPressed
  return <div role="dialog" aria-modal="true" aria-label={`Xem ${name}`} onPointerDown={event => { backdropPressed.current = event.target === event.currentTarget }} onClick={event => { if (event.target === event.currentTarget && backdropPressed.current) onClose(); backdropPressed.current = false }} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onClose() } }} className={`fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/65 p-4 compact:w-screen compact:overflow-x-hidden compact:overscroll-x-none compact:touch-pan-y ${details ? 'compact:items-center compact:overflow-x-hidden' : 'compact:items-start'}`}>
    <div className={details ? 'relative compact:min-w-0 compact:max-w-full' : 'compact:min-w-0 compact:max-w-full'}>
    <div onClick={event => event.stopPropagation()} className={`${shopMobileDialogFrameClass} rounded-xl border-2 border-[#bd914e] bg-[#302015] p-5 max-h-[90dvh] w-[min(480px,90vw)] overflow-y-auto compact:overflow-x-hidden compact:overscroll-x-none text-[#ffe6b0] ${details ? 'compact:w-[min(66vw,320px,62dvh)] compact:max-h-[78dvh] compact:p-3' : ''}`}>
    <h2 className={`mb-4 text-center font-heading text-2xl font-bold lining-nums tabular-nums ${details ? 'compact:mb-2 compact:text-[18px]' : ''}`}>{name}</h2>
    <div {...press} data-honor-press-target={details ? true : undefined} className={`mx-auto grid aspect-square w-full place-items-center [container-type:inline-size] ${details ? 'compact:touch-none compact:select-none' : ''}`}>{children}</div>
    {amount && <p className="mt-3 text-center font-number text-2xl lining-nums tabular-nums">{amount}</p>}
    <div className={`mt-4 text-center ${details ? 'compact:mt-2' : ''}`}><button autoFocus type="button" onClick={onClose} className={`${buttonInteraction} rounded-lg border border-[#c99044] bg-[#4a3020] px-6 py-2 text-lg ${details ? 'compact:px-4 compact:py-1.5 compact:text-base' : ''}`}>Đóng</button></div>
    </div>
    {details && (detailsVisible || showMobileDetails) && <div data-mobile-honor-details={showMobileDetails} className={`absolute left-[calc(100%+16px)] top-1/2 w-[min(54dvh,calc((100vw_-_min(480px,90vw))_/2_-_24px))] -translate-y-1/2 compact:fixed compact:left-1/2 compact:top-1/2 compact:z-[120] compact:w-[min(86vw,56dvh)] compact:-translate-x-1/2 compact:pointer-events-none ${showMobileDetails ? 'compact:block' : 'compact:hidden'} ${detailsVisible ? '' : 'desktop:hidden'}`}>{details(onCloseDetails ?? (() => {}))}</div>}
    </div>
  </div>
}
