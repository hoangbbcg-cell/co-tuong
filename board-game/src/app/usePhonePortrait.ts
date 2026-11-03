import { useEffect } from 'react'

/** Request portrait on phones; browsers may only allow it in fullscreen/installed mode. */
export function usePhonePortrait() {
  useEffect(() => {
    const phone = /Android.*Mobile|iPhone|iPod/i.test(navigator.userAgent)
    if (!phone) return
    const orientation = screen.orientation as ScreenOrientation & { lock?: (mode: string) => Promise<void> }
    const lock = () => { void orientation?.lock?.('portrait').catch(() => {}) }
    lock()
    document.addEventListener('fullscreenchange', lock)
    window.addEventListener('orientationchange', lock)
    window.addEventListener('pageshow', lock)
    return () => {
      document.removeEventListener('fullscreenchange', lock)
      window.removeEventListener('orientationchange', lock)
      window.removeEventListener('pageshow', lock)
    }
  }, [])
}
