import { describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { createGoogleH5Interstitial, H5_GAME_ADS_ENABLED } from '../src/features/ads/googleH5Interstitial'
import { getPendingOnlineAdOffer, queueOnlineAdOffer, takeOnlineAdOffer } from '../src/features/ads/onlineAdOffer'

describe('HOVANG A5: Online match -> Home -> one ad attempt', () => {
  it('holds pending request until Home consumes it and never repeats the match', () => {
    const match = `a5-${Math.random()}`
    expect(queueOnlineAdOffer(match)).toBe(true)
    expect(getPendingOnlineAdOffer()).toBe(match)
    expect(takeOnlineAdOffer('another-match')).toBe(false)
    expect(takeOnlineAdOffer(match)).toBe(true)
    expect(getPendingOnlineAdOffer()).toBeNull()
    expect(takeOnlineAdOffer(match)).toBe(false)
    expect(queueOnlineAdOffer(match)).toBe(false)
  })
  it('requests adapter once and does not issue multiple in-flight ad breaks', () => {
    let complete: ((info: { breakStatus?: string }) => void) | undefined
    const adBreak = vi.fn((opts: { adBreakDone: (info: { breakStatus?: string }) => void }) => { complete = opts.adBreakDone })
    const adapter = createGoogleH5Interstitial({ enabled: true, adBreak })
    expect(adapter.request()).toBe('requested')
    expect(adapter.request()).toBe('busy')
    expect(adBreak).toHaveBeenCalledTimes(1)
    complete?.({ breakStatus: 'notReady' })
    expect(adapter.busy()).toBe(false)
  })
  it('fails open while commercial ads remain disabled', () => {
    expect(H5_GAME_ADS_ENABLED).toBe(false)
    const adBreak = vi.fn()
    const adapter = createGoogleH5Interstitial({ enabled: false, adBreak })
    expect(adapter.request()).toBe('disabled')
    expect(adBreak).not.toHaveBeenCalled()
  })
  it('Home wiring checks active Home, consumes offer before requesting H5 adapter', () => {
    const home = readFileSync('src/pages/home/HomePage.tsx', 'utf8')
    expect(home).toContain('createBrowserH5Interstitial')
    expect(home).toContain('if (!activeHome || !pendingOnlineAd) return')
    expect(home).toContain('if (!takeOnlineAdOffer(pendingOnlineAd)) return')
    expect(home).toContain('homeInterstitial.request()')
    expect(home).not.toContain('MockInterstitialAd')
    expect(home).not.toContain('mockAdMatchId')
    expect(home).not.toContain('import.meta.env.DEV')
  })
})

describe('H5 bootstrapping contract', () => {
  it('initializes both H5 entry points with the existing AdSense script', () => {
    const html = readFileSync('index.html', 'utf8')
    expect(html).toContain('ca-pub-9272190698840010')
    expect(html).not.toContain('window.adBreak = window.adConfig = function')
    expect(html).not.toContain('window.adsbygoogle.push(options)')
  })
})
