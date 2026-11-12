import { useEffect } from 'react'

/** Stop browser panning on the game surface, while retaining nested panel scrolling. */
export function useGameViewportLock() {
  useEffect(() => {
    let previous: { x: number; y: number } | null = null
    const start = (event: TouchEvent) => {
      const touch = event.touches.length === 1 ? event.touches[0] : null
      previous = touch ? { x: touch.clientX, y: touch.clientY } : null
    }
    const move = (event: TouchEvent) => {
      if (event.touches.length !== 1 || !previous) return
      const touch = event.touches[0]
      const dx = touch.clientX - previous.x
      const dy = touch.clientY - previous.y
      previous = { x: touch.clientX, y: touch.clientY }
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest('select,input[type="range"]')) return
      const vertical = Math.abs(dy) >= Math.abs(dx)
      const delta = vertical ? dy : dx
      if (!delta) return
      for (let element = target; element && element !== document.body && element !== document.documentElement; element = element.parentElement) {
        if (!(element instanceof HTMLElement)) continue
        const style = getComputedStyle(element)
        const overflow = vertical ? style.overflowY : style.overflowX
        if (!/^(auto|scroll)$/.test(overflow)) continue
        const offset = vertical ? element.scrollTop : element.scrollLeft
        const maximum = vertical ? element.scrollHeight - element.clientHeight : element.scrollWidth - element.clientWidth
        if (maximum > 0 && (delta > 0 ? offset > 0 : offset < maximum - 1)) return
      }
      if (event.cancelable) event.preventDefault()
    }
    const end = () => { previous = null }
    document.addEventListener('touchstart', start, { passive: true, capture: true })
    document.addEventListener('touchmove', move, { passive: false, capture: true })
    document.addEventListener('touchend', end, true)
    document.addEventListener('touchcancel', end, true)
    return () => {
      document.removeEventListener('touchstart', start, true)
      document.removeEventListener('touchmove', move, true)
      document.removeEventListener('touchend', end, true)
      document.removeEventListener('touchcancel', end, true)
    }
  }, [])
}
