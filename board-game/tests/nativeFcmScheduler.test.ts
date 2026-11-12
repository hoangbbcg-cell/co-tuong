import { describe, expect, it } from 'vitest'
import { chooseOfflineReminder } from '../server/services/nativeFcmScheduler'

describe('native FCM offline reminder selection', () => {
  const now = Date.UTC(2026, 10, 1, 7)
  const candidate = (hours: number) => ({ userId: '11', cycleId: '9', now, offlineSince: new Date(now - hours * 3600_000) })
  it('does not remind before six hours', () => expect(chooseOfflineReminder(candidate(5.99))).toBeNull())
  it('selects six hours', () => expect(chooseOfflineReminder(candidate(6))?.kind).toBe('offline_6h'))
  it('selects 24 hours', () => expect(chooseOfflineReminder(candidate(24))?.kind).toBe('offline_24h'))
  it('selects three days', () => expect(chooseOfflineReminder(candidate(72))?.kind).toBe('offline_3d'))
  it('sends only latest overdue after seven days', () => expect(chooseOfflineReminder(candidate(168))?.kind).toBe('offline_7d'))
  it('deduplicates across same cycle', () => expect(chooseOfflineReminder(candidate(24))?.dedupeKey).toBe('native:offline_24h:9'))
})
