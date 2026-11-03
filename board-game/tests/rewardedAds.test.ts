import { describe, expect, it, vi } from 'vitest'
import { createRewardedAdController, ENERGY_REWARDED_AD_PLACEMENT } from '../src/features/ads/rewardedAds'

describe('rewarded ads foundation', () => {
  it('is disabled without an ad provider', async () => {
    const ads = createRewardedAdController()
    expect(ads.available()).toBe(false)
    expect(await ads.show()).toEqual({ status: 'unavailable' })
  })

  it('handles completed advertisements without granting rewards', async () => {
    const ads = createRewardedAdController({
      show: async () => 'completed',
    })

    expect(await ads.show()).toEqual({ status: 'completed' })
  })

  it('handles cancelled advertisements', async () => {
    const ads = createRewardedAdController({
      show: async () => 'cancelled',
    })

    expect(await ads.show()).toEqual({ status: 'cancelled' })
  })

  it('blocks overlapping ad requests', async () => {
    let finish!: (result: 'completed' | 'cancelled') => void

    const provider = {
      show: vi.fn(() => new Promise<'completed' | 'cancelled'>(
        resolve => { finish = resolve },
      )),
    }

    const ads = createRewardedAdController(provider)
    const first = ads.show()

    expect(ads.busy()).toBe(true)
    expect(await ads.show()).toEqual({ status: 'busy' })
    expect(provider.show).toHaveBeenCalledTimes(1)
    expect(provider.show).toHaveBeenCalledWith(ENERGY_REWARDED_AD_PLACEMENT)
    expect(ENERGY_REWARDED_AD_PLACEMENT).toEqual({ placementId: 'energy_watch_ad', requestedDurationSeconds: 30 })

    finish('completed')
    expect(await first).toEqual({ status: 'completed' })
    expect(ads.busy()).toBe(false)
  })

  it('recovers from provider failures', async () => {
    const ads = createRewardedAdController({
      show: async () => { throw new Error('Provider failed') },
    })

    expect(await ads.show()).toEqual({ status: 'error' })
    expect(ads.busy()).toBe(false)
  })
})