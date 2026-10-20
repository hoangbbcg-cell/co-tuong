import { useEffect, useState } from 'react'

const DAY_MS = 24 * 60 * 60 * 1000
const VIETNAM_OFFSET_MS = 7 * 60 * 60 * 1000

/** Daily shop resets its display at midnight Vietnam time, regardless of device timezone. */
export function dailyShopCountdown(now: number) {
  const seconds = Math.ceil((DAY_MS - (now + VIETNAM_OFFSET_MS) % DAY_MS) / 1000)
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map(value => String(value).padStart(2, '0')).join(':')
}

export function useShopDailyCountdown(enabled: boolean) {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    if (!enabled) return
    const update = () => setNow(Date.now())
    update()
    const timer = window.setInterval(update, 1000)
    document.addEventListener('visibilitychange', update)
    window.addEventListener('focus', update)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', update)
      window.removeEventListener('focus', update)
    }
  }, [enabled])
  return enabled ? dailyShopCountdown(now) : '--:--:--'
}
