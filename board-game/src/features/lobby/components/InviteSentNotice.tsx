import { useCallback, useEffect, useRef, useState } from 'react'

function InviteSentNotice({ onDone, message }: { onDone: () => void; message: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animation = element.animate([
      { transform: 'translate(-50%, -50%)', opacity: 1, offset: 0 },
      { transform: 'translate(-50%, -50%)', opacity: 1, offset: 0.35 },
      { transform: reduced ? 'translate(-50%, -50%)' : 'translate(-50%, calc(-50% - 48px))', opacity: 0, offset: 1 },
    ], { duration: 1300, easing: 'ease-out', fill: 'forwards' })
    animation.onfinish = onDone
    return () => animation.cancel()
  }, [onDone])
  return <p ref={ref} role="status" className="pointer-events-none fixed left-1/2 top-1/2 z-[1000] m-0 rounded-[12px] border border-[#d8ac57] bg-[#351d10] px-[24px] py-[12px] text-center font-body text-[18px] font-semibold text-[#ffe3a2] shadow-lg">{message}</p>
}

export function useInviteSentNotice() {
  const [sequence, setSequence] = useState(0)
  const [message, setMessage] = useState('Đã gửi')
  const dismiss = useCallback(() => setSequence(0), [])
  const show = useCallback((text = 'Đã gửi') => { setMessage(text); setSequence(value => value + 1) }, [])
  return { show, notice: sequence ? <InviteSentNotice key={sequence} message={message} onDone={dismiss} /> : null }
}
