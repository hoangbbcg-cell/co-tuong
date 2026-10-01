import { MATCH_INTRO_MS } from '../../../game/moves/actions'
import { useEffect, useRef, useState } from 'react'
import type { GameState } from '../../../types/game'

export function useMatchIntro(phase: GameState['phase'], roomKey: string) {
  const [visible, setVisible] = useState(false)
  const previous = useRef({ phase, roomKey })
  const redRef = useRef<HTMLDivElement>(null)
  const blackRef = useRef<HTMLDivElement>(null)
  const crossRef = useRef<SVGSVGElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const leftBeamRef = useRef<HTMLSpanElement>(null)
  const rightBeamRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const started = previous.current.phase === 'ready' && phase === 'playing' && previous.current.roomKey === roomKey
    previous.current = { phase, roomKey }
    setVisible(started)
    if (!started) return
    const timer = window.setTimeout(() => setVisible(false), MATCH_INTRO_MS)
    return () => window.clearTimeout(timer)
  }, [phase, roomKey])

  useEffect(() => {
    if (!visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animations: Animation[] = []
    const stamp = (element: Element | null) => {
      if (!element?.animate) return
      animations.push(element.animate([
        { transform: 'scale(1.16)', opacity: 0, offset: 0 },
        { transform: 'scale(0.97)', opacity: 1, offset: 0.65 },
        { transform: 'scale(1)', opacity: 1, offset: 1 },
      ], { duration: 150, easing: 'ease-out', fill: 'both' }))
    }
    stamp(redRef.current)
    stamp(blackRef.current)
    stamp(crossRef.current)
    const sweep = (element: HTMLSpanElement | null, from: string, to: string) => {
      if (!element?.animate) return
      animations.push(element.animate([
        { left: from, opacity: 0, offset: 0 },
        { opacity: 1, offset: 0.12 },
        { opacity: 1, offset: 0.85 },
        { left: to, opacity: 0, offset: 1 },
      ], { delay: 150, duration: 550, easing: 'ease-in', fill: 'both' }))
    }
    sweep(leftBeamRef.current, '-18%', '100%')
    sweep(rightBeamRef.current, '100%', '-18%')
    if (panelRef.current?.animate) animations.push(panelRef.current.animate([
      { opacity: 1 }, { opacity: 0 },
    ], { delay: MATCH_INTRO_MS - 200, duration: 200, fill: 'forwards' }))
    return () => animations.forEach(animation => animation.cancel())
  }, [visible])

  return { visible, redRef, blackRef, crossRef, panelRef, leftBeamRef, rightBeamRef }
}
