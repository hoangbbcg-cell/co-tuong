import { useEffect, useRef, useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'

export function ShopScrollPanel({ label, children }: { label: string; children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const drag = useRef<{ y: number; top: number } | null>(null)
  const [metrics, setMetrics] = useState({ height: 0, total: 0, top: 0 })
  useEffect(() => {
    const element = viewport.current
    if (!element) return
    const update = () => setMetrics({ height: element.clientHeight, total: element.scrollHeight, top: element.scrollTop })
    const observer = new ResizeObserver(update)
    observer.observe(element)
    if (content.current) observer.observe(content.current)
    element.addEventListener('scroll', update, { passive: true })
    update()
    return () => { observer.disconnect(); element.removeEventListener('scroll', update) }
  }, [children])
  const track = Math.max(0, metrics.height - 12)
  const thumb = Math.min(track, Math.max(28, track * metrics.height / Math.max(1, metrics.total)))
  const range = metrics.total - metrics.height
  const travel = track - thumb
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current && viewport.current && travel > 0) viewport.current.scrollTop = drag.current.top + (event.clientY - drag.current.y) * range / travel
  }
  return <div role="tabpanel" aria-label={label} className="relative mt-0 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#825224] bg-[#1a0c06dc] compact:order-4">
    <div ref={viewport} className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto [scrollbar-width:none]! [scrollbar-gutter:auto] [&::-webkit-scrollbar]:!hidden">
      <div ref={content} className="flex min-h-full flex-col p-[10px] compact:p-1" style={{ height: '100%' }}>{children}</div>
    </div>
    {range > 1 && <div aria-hidden="true" className="pointer-events-none absolute top-[6px] right-[2px] bottom-[6px] z-20 w-[6px]">
      <div className="pointer-events-auto absolute inset-x-0 cursor-grab touch-none rounded-full bg-white/65 shadow-[0_1px_3px_#0008] active:cursor-grabbing" style={{ height: thumb, top: range > 0 ? metrics.top / range * travel : 0 }} onPointerDown={event => { event.preventDefault(); drag.current = { y: event.clientY, top: metrics.top }; event.currentTarget.setPointerCapture(event.pointerId) }} onPointerMove={move} onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} onLostPointerCapture={() => { drag.current = null }} />
    </div>}
  </div>
}
