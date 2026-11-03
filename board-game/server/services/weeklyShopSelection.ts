import { createHash } from 'node:crypto'
import { WEEKLY_SHOP_JOURNEY_AVATARS, WEEKLY_SHOP_STANDARD_AVATARS } from '../../src/lib/shopCosmetics'

function weeklyRandom(week: string) {
  let counter = 0
  let pool: number[] = []
  return (max: number) => {
    if (!pool.length) pool = [...createHash('sha256').update(`weekly-shop:${week}:${counter++}`).digest()]
    return pool.pop()! % max
  }
}

export function selectWeeklyShop(week: string, firstWeek: string): string[] {
  // Approved HOVANG lineup for the local week beginning 2026-11-02 only.
  if (week === '2026-11-02') return ['avatar-41', 'avatar-44', 'avatar-46', 'avatar-39', 'avatar-43', 'avatar-40']
  const random = weeklyRandom(week)
  const standards = [...WEEKLY_SHOP_STANDARD_AVATARS]
  if (week !== firstWeek) {
    for (let i = standards.length - 1; i > 0; i--) {
      const j = random(i + 1)
      ;[standards[i], standards[j]] = [standards[j], standards[i]]
    }
  }
  const journey = WEEKLY_SHOP_JOURNEY_AVATARS[random(WEEKLY_SHOP_JOURNEY_AVATARS.length)]
  return [...standards.map(index => `avatar-${index}`), `avatar-${journey}`]
}
