import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import {
  createGoogleH5Interstitial,
  H5_GAME_ADS_ENABLED,
} from '../src/features/ads/googleH5Interstitial'

type Callbacks = {
  beforeAd: () => void
  afterAd: () => void
  adBreakDone: (info: { breakStatus?: string }) => void
}

afterEach(() => {
  vi.useRealTimers()
})

describe('A6.3.6 Google H5 failsafe', () => {
  it('keeps commercial advertising disabled', () => {
    expect(H5_GAME_ADS_ENABLED).toBe(false)
  })

  it('releases busy when Google never calls back', () => {
    vi.useFakeTimers()

    const adapter = createGoogleH5Interstitial({
      enabled: true,
      adBreak: () => {},
    })

    expect(adapter.request()).toBe('requested')
    expect(adapter.busy()).toBe(true)

    vi.advanceTimersByTime(14999)
    expect(adapter.busy()).toBe(true)

    vi.advanceTimersByTime(1)
    expect(adapter.busy()).toBe(false)
  })

  it('never times out after an ad has started', () => {
    vi.useFakeTimers()

    let callbacks: Callbacks | undefined

    const adapter = createGoogleH5Interstitial({
      enabled: true,
      adBreak: options => {
        callbacks = options
      },
    })

    adapter.request()
    callbacks?.beforeAd()

    vi.advanceTimersByTime(60000)

    expect(adapter.busy()).toBe(true)

    callbacks?.afterAd()
    expect(adapter.busy()).toBe(false)
  })

  it('restores audio after a completed ad', () => {
    vi.useFakeTimers()

    let callbacks: Callbacks | undefined
    const pause = vi.fn()
    const resume = vi.fn()

    const adapter = createGoogleH5Interstitial({
      enabled: true,
      pauseAudio: pause,
      resumeAudio: resume,
      adBreak: options => {
        callbacks = options
      },
    })

    adapter.request()

    expect(pause).not.toHaveBeenCalled()

    callbacks?.beforeAd()
    expect(pause).toHaveBeenCalledTimes(1)

    callbacks?.afterAd()

    expect(resume).toHaveBeenCalledTimes(1)
    expect(adapter.busy()).toBe(false)

    callbacks?.adBreakDone({ breakStatus: 'viewed' })

    expect(resume).toHaveBeenCalledTimes(1)
  })

  it('ignores stale callbacks from timed-out requests', () => {
    vi.useFakeTimers()

    const calls: Callbacks[] = []
    const pause = vi.fn()
    const resume = vi.fn()

    const adapter = createGoogleH5Interstitial({
      enabled: true,
      pauseAudio: pause,
      resumeAudio: resume,
      adBreak: options => {
        calls.push(options)
      },
    })

    expect(adapter.request()).toBe('requested')

    vi.advanceTimersByTime(15000)
    expect(adapter.busy()).toBe(false)

    expect(adapter.request()).toBe('requested')
    expect(adapter.busy()).toBe(true)

    calls[0].beforeAd()
    calls[0].afterAd()
    calls[0].adBreakDone({ breakStatus: 'timeout' })

    expect(pause).not.toHaveBeenCalled()
    expect(resume).not.toHaveBeenCalled()
    expect(adapter.busy()).toBe(true)

    calls[1].adBreakDone({ breakStatus: 'notReady' })

    expect(adapter.busy()).toBe(false)
  })

  it('handles synchronous SDK errors', () => {
    vi.useFakeTimers()

    const adapter = createGoogleH5Interstitial({
      enabled: true,
      adBreak: () => {
        throw new Error('SDK blocked')
      },
    })

    expect(adapter.request()).toBe('error')
    expect(adapter.busy()).toBe(false)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('does not request ads when disabled', () => {
    vi.useFakeTimers()

    const adBreak = vi.fn()
    const adapter = createGoogleH5Interstitial({
      enabled: false,
      adBreak,
    })

    expect(adapter.request()).toBe('disabled')
    expect(adBreak).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })
})