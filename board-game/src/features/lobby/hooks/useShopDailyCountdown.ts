import { useEffect, useState } from 'react'

const DAY_MS = 24 * 60 * 60 * 1000
const VIETNAM_OFFSET_MS = 7 * 60 * 60 * 1000

/** Daily shop resets its display at midnight Vietnam time, regardless of device timezone. */
export function dailyShopCountdown(now: number) {
  const seconds = Math.ceil((DAY_MS - (now + VIETNAM_OFFSET_MS) % DAY_MS) / 1000)
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map(value => String(value).padStart(2, '0')).join(':')
}

/** Weekly display resets at Monday 00:00 in Vietnam. */
export function weeklyShopCountdown(now: number) {
  const local = new Date(now + VIETNAM_OFFSET_MS)
  const daysSinceMonday = (local.getUTCDay() + 6) % 7
  const elapsed = daysSinceMonday * DAY_MS + (now + VIETNAM_OFFSET_MS) % DAY_MS
  const seconds = Math.ceil((7 * DAY_MS - elapsed) / 1000)
  const days = Math.floor(seconds / 86400)
  const clock = [Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60]
    .map(value => String(value).padStart(2, '0')).join(':')
  return days + 'd ' + clock
}

export function useShopDailyCountdown(enabled: boolean, cadence: 'daily' | 'weekly' = 'daily') {
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
  return enabled ? (cadence === 'weekly' ? weeklyShopCountdown(now) : dailyShopCountdown(now)) : '--:--:--'
}
