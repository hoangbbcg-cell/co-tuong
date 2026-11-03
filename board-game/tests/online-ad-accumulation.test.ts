import { beforeEach, describe, expect, it, vi } from 'vitest'

const storage = new Map<string, string>()

beforeEach(() => {
  storage.clear()
  vi.resetModules()

  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => {
      storage.set(key, value)
    },
  })
})

describe('HOVANG two matches per ad', () => {
  it('accumulates across rooms', async () => {
    const ads = await import('../src/features/ads/onlineAdOffer')

    ads.recordOnlineAdMatch('room-1-match-1')
    expect(ads.queueAccumulatedOnlineAdOffer('room-1-match-1')).toBe(false)
    expect(ads.getAccumulatedOnlineMatchCount()).toBe(1)

    ads.recordOnlineAdMatch('room-2-match-1')
    expect(ads.queueAccumulatedOnlineAdOffer('room-2-match-1')).toBe(true)
    expect(ads.getAccumulatedOnlineMatchCount()).toBe(0)
  })

  it('does not count one match twice', async () => {
    const ads = await import('../src/features/ads/onlineAdOffer')

    expect(ads.recordOnlineAdMatch('same-match')).toBe(true)
    expect(ads.recordOnlineAdMatch('same-match')).toBe(false)
    expect(ads.getAccumulatedOnlineMatchCount()).toBe(1)
  })

  it('ten matches produce only one ad on exit', async () => {
    const ads = await import('../src/features/ads/onlineAdOffer')

    for (let i = 1; i <= 10; i++) {
      ads.recordOnlineAdMatch(`match-${i}`)
    }

    expect(ads.getAccumulatedOnlineMatchCount()).toBe(2)
    expect(ads.queueAccumulatedOnlineAdOffer('match-10')).toBe(true)
    expect(ads.getAccumulatedOnlineMatchCount()).toBe(0)
    expect(ads.queueAccumulatedOnlineAdOffer('match-10')).toBe(false)
  })

  it('requires two matches again after showing ad', async () => {
    const ads = await import('../src/features/ads/onlineAdOffer')

    ads.recordOnlineAdMatch('match-1')
    ads.recordOnlineAdMatch('match-2')

    expect(ads.queueAccumulatedOnlineAdOffer('match-2')).toBe(true)
    expect(ads.getAccumulatedOnlineMatchCount()).toBe(0)

    ads.recordOnlineAdMatch('match-3')
    expect(ads.queueAccumulatedOnlineAdOffer('match-3')).toBe(false)

    ads.recordOnlineAdMatch('match-4')
    expect(ads.queueAccumulatedOnlineAdOffer('match-4')).toBe(true)
  })

  it('preserves progress after reload', async () => {
    let ads = await import('../src/features/ads/onlineAdOffer')

    ads.recordOnlineAdMatch('first-match')

    vi.resetModules()
    ads = await import('../src/features/ads/onlineAdOffer')

    expect(ads.getAccumulatedOnlineMatchCount()).toBe(1)

    ads.recordOnlineAdMatch('second-match')
    expect(ads.queueAccumulatedOnlineAdOffer('second-match')).toBe(true)
  })

  it('does not count invalid match IDs', async () => {
    const ads = await import('../src/features/ads/onlineAdOffer')

    expect(ads.recordOnlineAdMatch('')).toBe(false)
    expect(ads.queueAccumulatedOnlineAdOffer('')).toBe(false)
    expect(ads.getAccumulatedOnlineMatchCount()).toBe(0)
  })
})