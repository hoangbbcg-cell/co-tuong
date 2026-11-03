import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function InviteSentNotice({ onDone, message }: { onDone: () => void; message: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [portalRoot, setPortalRoot] = useState<Element | null>(null)
  const locateRoot = useCallback((element: HTMLSpanElement | null) => {
    if (element) setPortalRoot(element.closest('dialog') ?? document.body)
  }, [])
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    element.showPopover?.()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animation = element.animate([
      { transform: 'translate(-50%, -50%)', opacity: 1, offset: 0 },
      { transform: 'translate(-50%, -50%)', opacity: 1, offset: 0.35 },
      { transform: reduced ? 'translate(-50%, -50%)' : 'translate(-50%, calc(-50% - 48px))', opacity: 0, offset: 1 },
    ], { duration: 1300, easing: 'ease-out', fill: 'forwards' })
    animation.onfinish = onDone
    return () => animation.cancel()
  }, [onDone, portalRoot])
  return <><span ref={locateRoot} hidden />{portalRoot && createPortal(<p ref={ref} popover="manual" role="status" className="pointer-events-none fixed z-[1000] m-0 w-max max-w-[calc(100vw_-_32px)] rounded-[12px] border border-[#d8ac57] bg-[#351d10] px-[24px] py-[12px] text-center font-body text-[18px] font-semibold text-[#ffe3a2] shadow-lg" style={{ inset: 'auto', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>{message}</p>, portalRoot)}</>
}

export function useInviteSentNotice() {
  const [sequence, setSequence] = useState(0)
  const [message, setMessage] = useState('Đã gửi')
  const dismiss = useCallback(() => setSequence(0), [])
  const show = useCallback((text = 'Đã gửi') => { setMessage(text); setSequence(value => value + 1) }, [])
  return { show, clear: dismiss, notice: sequence ? <InviteSentNotice key={sequence} message={message} onDone={dismiss} /> : null }
}
