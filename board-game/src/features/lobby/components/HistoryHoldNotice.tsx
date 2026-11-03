import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/** Keep held-row feedback above clipped lists and scaled dialogs. */
export function HistoryHoldNotice({ point, children, onDismiss, portalRoot, padding, className = '' }: { point: { x: number; y: number }; children: ReactNode; onDismiss?: () => void; portalRoot?: Element | null; padding?: number; className?: string }) {
  const notice = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    notice.current?.showPopover?.()
  }, [])
  useEffect(() => {
    if (!onDismiss) return
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !notice.current?.contains(event.target)) onDismiss()
    }
    document.addEventListener('pointerdown', dismissOutside, true)
    return () => document.removeEventListener('pointerdown', dismissOutside, true)
  }, [onDismiss])
  return createPortal(<span ref={notice} popover="manual" role="status" onPointerDown={onDismiss ? event => event.stopPropagation() : undefined} onClick={onDismiss ? event => event.stopPropagation() : undefined} className={`${onDismiss ? 'pointer-events-auto' : 'pointer-events-none'} fixed m-0 w-max max-w-[calc(100vw_-_20px)] -translate-x-1/2 -translate-y-full rounded-md border-0 bg-[#281205]/95 px-3 py-2 text-center font-arial text-[14px] font-normal text-[#ffe5b5] shadow-lg ${className}`} style={{ padding, inset: 'auto', left: point.x, top: point.y - 10 }}>{children}</span>, portalRoot ?? document.body)
}
