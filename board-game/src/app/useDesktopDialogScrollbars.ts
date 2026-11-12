import { useEffect } from 'react'

export function useDesktopDialogScrollbars() {
  useEffect(() => {
    const timers = new Map<HTMLElement, ReturnType<typeof setTimeout>>()
    const scroll = (event: Event) => {
      const target = event.target
      if (window.innerWidth <= 800 || !(target instanceof HTMLElement) || !target.closest('dialog')) return
      clearTimeout(timers.get(target))
      target.style.setProperty('--desktop-scroll-thumb', 'rgba(255,255,255,1)')
      const fade = () => {
        const started = performance.now()
        const step = () => {
          const opacity = Math.max(0, 1 - (performance.now() - started) / 500)
          target.style.setProperty('--desktop-scroll-thumb', `rgba(255,255,255,${opacity})`)
          if (opacity > 0) timers.set(target, setTimeout(step, 16))
          else { target.style.removeProperty('--desktop-scroll-thumb'); timers.delete(target) }
        }
        step()
      }
      timers.set(target, setTimeout(fade, 700))
    }
    document.addEventListener('scroll', scroll, true)
    return () => {
      document.removeEventListener('scroll', scroll, true)
      for (const [target, timer] of timers) { clearTimeout(timer); target.style.removeProperty('--desktop-scroll-thumb') }
    }
  }, [])
}
