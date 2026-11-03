import { describe, expect, it, vi } from 'vitest'
import { createGoogleH5Interstitial, H5_GAME_ADS_ENABLED } from '../src/features/ads/googleH5Interstitial'

describe('Google H5 interstitial foundation', () => {
  it('keeps monetization disabled pending approval', () => {
    expect(H5_GAME_ADS_ENABLED).toBe(false)
    const api = vi.fn()
    const ads = createGoogleH5Interstitial({ enabled: false, adBreak: api })
    expect(ads.request()).toBe('disabled')
    expect(api).not.toHaveBeenCalled()
  })
  it('does not run without the provider', () => {
    const ads = createGoogleH5Interstitial({ enabled: true })
    expect(ads.request()).toBe('unavailable')
  })
  it('requests only a next-placement and prevents overlap', () => {
    let finish: ((info: { breakStatus?: string }) => void) | undefined
    const adBreak = vi.fn((args: { type: 'next', name: string, beforeAd: () => void, afterAd: () => void, adBreakDone: (info: { breakStatus?: string }) => void }) => {
      expect(args.type).toBe('next')
      expect(args.name).toBe('online_match_finished_return_home')
      finish = args.adBreakDone
    })
    const ads = createGoogleH5Interstitial({ enabled: true, adBreak })
    expect(ads.request()).toBe('requested')
    expect(ads.request()).toBe('busy')
    expect(adBreak).toHaveBeenCalledTimes(1)
    finish?.({ breakStatus: 'viewed' })
    expect(ads.busy()).toBe(false)
  })
  it('does not remain busy if Google throws', () => {
    const ads = createGoogleH5Interstitial({ enabled: true, adBreak: () => { throw Error('blocked') } })
    expect(ads.request()).toBe('error')
    expect(ads.busy()).toBe(false)
  })
})

describe('H5 SDK simulated lifecycle before approval', () => {
  it('pauses audio only when Google actually starts and restores it afterwards', () => {
    let callbacks: any
    const pauseAudio = vi.fn()
    const resumeAudio = vi.fn()
    const ads = createGoogleH5Interstitial({
      enabled: true,
      adBreak: options => { callbacks = options },
      pauseAudio, resumeAudio,
    })
    expect(ads.request()).toBe('requested')
    expect(pauseAudio).not.toHaveBeenCalled()
    callbacks.beforeAd()
    expect(pauseAudio).toHaveBeenCalledOnce()
    callbacks.afterAd()
    expect(resumeAudio).toHaveBeenCalledOnce()
    callbacks.adBreakDone({ breakStatus: 'viewed' })
    expect(ads.busy()).toBe(false)
  })

  it('releases lock if Google declines to fill an ad', () => {
    let complete: ((info: { breakStatus?: string }) => void) | undefined
    const ads = createGoogleH5Interstitial({
      enabled: true, adBreak: options => { complete = options.adBreakDone },
    })
    expect(ads.request()).toBe('requested')
    complete?.({ breakStatus: 'notReady' })
    expect(ads.busy()).toBe(false)
    expect(ads.request()).toBe('requested')
  })
})
