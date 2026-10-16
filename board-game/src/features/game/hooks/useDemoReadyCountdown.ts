import { useEffect, useState } from 'react'
import { useGameStore } from '../../../store/gameStore'

// Temporary UI preview for local sample tables only.
export function useDemoReadyCountdown(enabled: boolean) {
  const [seconds, setSeconds] = useState(20)
  useEffect(() => {
    if (!enabled) return
    setSeconds(20)
    const deadline = performance.now() + 20_000
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - performance.now()) / 1000))
      setSeconds(remaining)
      if (remaining === 0) {
        window.clearInterval(timer)
        useGameStore.getState().start(performance.now())
      }
    }, 1000)
    return () => window.clearInterval(timer)
  }, [enabled])
  return enabled ? seconds : null
}
