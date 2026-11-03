import { describe, expect, it, vi } from 'vitest'
import {
  createGoogleH5Interstitial,
  H5_GAME_ADS_ENABLED,
} from '../src/features/ads/googleH5Interstitial'

type FakeBreak = {
  beforeAd: () => void
  afterAd: () => void
  adBreakDone: (info: { breakStatus?: string }) => void
}

describe('A6.2 Google H5 SDK safety', () => {
  it('keeps commercial advertising disabled', () => {
    expect(H5_GAME_ADS_ENABLED).toBe(false)
  })

  it('does not call SDK when disabled', () => {
    const adBreak = vi.fn()
    const adapter = createGoogleH5Interstitial({
      enabled: false,
      adBreak,
    })

    expect(adapter.request()).toBe('disabled')
    expect(adBreak).not.toHaveBeenCalled()
    expect(adapter.busy()).toBe(false)
  })

  it('handles unavailable SDK', () => {
    const adapter = createGoogleH5Interstitial({
      enabled: true,
    })

    expect(adapter.request()).toBe('unavailable')
    expect(adapter.busy()).toBe(false)
  })

  it('only permits one outstanding request', () => {
    let placement: FakeBreak | undefined

    const adapter = createGoogleH5Interstitial({
      enabled: true,
      adBreak: options => {
        placement = options
      },
    })

    expect(adapter.request()).toBe('requested')
    expect(adapter.busy()).toBe(true)
    expect(adapter.request()).toBe('busy')

    placement?.adBreakDone({ breakStatus: 'viewed' })

    expect(adapter.busy()).toBe(false)
  })

  it.each([
    'notReady',
    'timeout',
    'invalid',
    'error',
    'noAdPreloaded',
    'frequencyCapped',
    'other',
    'viewed',
  ])('releases busy state after %s', status => {
    let placement: FakeBreak | undefined

    const adapter = createGoogleH5Interstitial({
      enabled: true,
      adBreak: options => {
        placement = options
      },
    })

    expect(adapter.request()).toBe('requested')
    expect(adapter.busy()).toBe(true)

    placement?.adBreakDone({ breakStatus: status })

    expect(adapter.busy()).toBe(false)
  })

  it('handles synchronous SDK errors', () => {
    const adapter = createGoogleH5Interstitial({
      enabled: true,
      adBreak: () => {
        throw new Error('SDK failure')
      },
    })

    expect(adapter.request()).toBe('error')
    expect(adapter.busy()).toBe(false)
  })

  it('uses audio callbacks at ad boundaries', () => {
    let placement: FakeBreak | undefined

    const pauseAudio = vi.fn()
    const resumeAudio = vi.fn()

    const adapter = createGoogleH5Interstitial({
      enabled: true,
      pauseAudio,
      resumeAudio,
      adBreak: options => {
        placement = options
      },
    })

    expect(adapter.request()).toBe('requested')

    placement?.beforeAd()
    expect(pauseAudio).toHaveBeenCalledTimes(1)

    placement?.afterAd()
    expect(resumeAudio).toHaveBeenCalledTimes(1)

    placement?.adBreakDone({ breakStatus: 'viewed' })
    expect(adapter.busy()).toBe(false)
  })
})