import { useEffect, useRef, useState } from 'react'

/** YouTube-style tap layer over the replay move counter: tap pauses/resumes and briefly shows a small white icon in the middle. */
export function ReplayTapOverlay({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const timers = useRef<number[]>([])
  const clearTimers = () => { for (const timer of timers.current) window.clearTimeout(timer); timers.current = [] }
  useEffect(() => () => clearTimers(), [])
  const tap = () => {
    onToggle()
    clearTimers()
    setVisible(true)
    setFading(false)
    // Hold a beat, then fade the icon out within roughly one second, like the video player.
    timers.current = [window.setTimeout(() => setFading(true), 300), window.setTimeout(() => { setVisible(false); setFading(false) }, 1000)]
  }
  return <button type="button" data-screenshot-exclude="true" aria-label={playing ? 'Tạm dừng phát lại' : 'Phát lại'} title={playing ? 'Tạm dừng' : 'Phát tiếp'} className="absolute inset-0 z-[60] m-0 grid touch-manipulation place-items-center border-0 bg-transparent p-0" onClick={tap}>
    {visible && <span aria-hidden="true" className={`pointer-events-none grid place-items-center transition-opacity duration-[700ms] ease-out ${fading ? 'opacity-0' : 'opacity-100'}`}>
      <svg viewBox="0 0 24 24" className={`block size-10 text-white [filter:drop-shadow(0_1px_4px_#0009)] ${playing ? '' : 'ml-1'}`} fill="currentColor">{playing ? <path d="M7 4h3.5v16H7Zm6.5 0H17v16h-3.5Z" /> : <path d="M7 4.5 19 12 7 19.5Z" />}</svg>
    </span>}
  </button>
}
