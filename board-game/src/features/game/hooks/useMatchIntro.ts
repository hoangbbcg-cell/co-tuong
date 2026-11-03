import { MATCH_INTRO_MS } from '../../../game/moves/actions'
import { useEffect, useRef, useState } from 'react'
import type { GameState } from '../../../types/game'

export function useMatchIntro(phase: GameState['phase'], roomKey: string, enabled = true) {
  const [visible, setVisible] = useState(false)
  const previous = useRef({ phase, roomKey })
  const redRef = useRef<HTMLDivElement>(null)
  const blackRef = useRef<HTMLDivElement>(null)
  const crossRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const leftSwordRef = useRef<HTMLDivElement>(null)
  const rightSwordRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const started = enabled && phase === 'playing' && (previous.current.phase !== 'playing' || previous.current.roomKey !== roomKey)
    previous.current = { phase, roomKey }
    setVisible(started)
    if (!started) return
    const timer = window.setTimeout(() => setVisible(false), MATCH_INTRO_MS)
    return () => window.clearTimeout(timer)
  }, [phase, roomKey, enabled])

  useEffect(() => {
    if (!visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animations: Animation[] = []
    const fly = (element: HTMLDivElement | null, direction: number) => {
      if (!element?.animate) return
      element.style.willChange = 'transform, opacity'
      const distance = (window.innerWidth + element.getBoundingClientRect().width) / 2 + 60
      const slowPosition = window.innerWidth * .06
      animations.push(element.animate([
        { transform: `translateX(${-direction * distance}px)`, opacity: 0, offset: 0, easing: 'cubic-bezier(.12,.7,.18,1)' },
        { transform: `translateX(${direction * slowPosition}px)`, opacity: 1, offset: .2, easing: 'linear' },
        { transform: `translateX(${direction * (slowPosition + window.innerWidth * .025)}px)`, opacity: 1, offset: .62, easing: 'cubic-bezier(.65,0,1,1)' },
        { transform: `translateX(${direction * distance}px)`, opacity: 0, offset: .8 },
        { transform: `translateX(${direction * distance}px)`, opacity: 0, offset: 1 },
      ], { duration: MATCH_INTRO_MS, fill: 'both' }))
    }
    fly(redRef.current, 1)
    fly(blackRef.current, -1)
    if (crossRef.current?.animate) animations.push(crossRef.current.animate([
      { transform: 'translateZ(360px) scale(1.25)', opacity: 0, offset: 0, easing: 'cubic-bezier(.15,.8,.2,1)' },
      { transform: 'translateZ(0px) scale(.9)', opacity: 1, offset: .18, easing: 'ease-out' },
      { transform: 'translateZ(0px) scale(1.04)', opacity: 1, offset: .24 },
      { transform: 'translateZ(0px) scale(1)', opacity: 1, offset: .3 },
      { transform: 'translateZ(0px) scale(1)', opacity: 1, offset: .82 },
      { transform: 'translateZ(-30px) scale(.96)', opacity: 0, offset: 1 },
    ], { duration: MATCH_INTRO_MS, fill: 'both' }))
    const sword = (element: HTMLDivElement | null, direction: number) => {
      if (!element?.animate) return
      element.style.willChange = 'transform, opacity'
      animations.push(element.animate([
        { transform: `translate(${direction * 36}px, -36px)`, opacity: 0, offset: 0, easing: 'cubic-bezier(.12,.7,.18,1)' },
        { transform: `translate(${direction * 3}px, -3px)`, opacity: 1, offset: .15, easing: 'linear' },
        { transform: `translate(${-direction * 3}px, 3px)`, opacity: 1, offset: .65, easing: 'ease-in' },
        { transform: `translate(${-direction * 16}px, 16px)`, opacity: 0, offset: .82 },
        { transform: `translate(${-direction * 24}px, 24px)`, opacity: 0, offset: 1 },
      ], { duration: MATCH_INTRO_MS, fill: 'both' }))
    }
    sword(leftSwordRef.current, -1)
    sword(rightSwordRef.current, 1)
    if (panelRef.current?.animate) animations.push(panelRef.current.animate([
      { opacity: 1 }, { opacity: 0 },
    ], { delay: MATCH_INTRO_MS - 200, duration: 200, fill: 'forwards' }))
    return () => {
      animations.forEach(animation => animation.cancel())
      ;[redRef.current, blackRef.current, leftSwordRef.current, rightSwordRef.current].forEach(element => { if (element) element.style.willChange = '' })
    }
  }, [visible])

  return { visible, redRef, blackRef, crossRef, panelRef, leftSwordRef, rightSwordRef }
}
