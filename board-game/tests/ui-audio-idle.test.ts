// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest'

class Source {
  buffer: unknown
  onended: (() => void) | null = null
  offset = { setValueAtTime: vi.fn() }
  connect = vi.fn()
  start = vi.fn()
  stop = vi.fn()
  disconnect = vi.fn()
}
class Context extends EventTarget {
  state = 'running'
  currentTime = 0
  destination = {}
  cues: Source[] = []
  warm: Source[] = []
  resume = vi.fn(async () => { this.state = 'running'; this.dispatchEvent(new Event('statechange')) })
  decodeAudioData = vi.fn(async () => ({ duration: 0.1 }))
  createBufferSource() { const source = new Source(); this.cues.push(source); return source }
  createConstantSource() { const source = new Source(); this.warm.push(source); return source }
}
let context: Context
let ui: typeof import('../src/lib/uiActionSound')
let settings: typeof import('../src/store/audioSettingsStore')
let cleanup: (() => void) | undefined
beforeEach(async () => {
  vi.resetModules()
  vi.stubGlobal('AudioContext', class extends Context { constructor() { super(); context = this } })
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(1) })))
  settings = await import('../src/store/audioSettingsStore')
  settings.useAudioSettingsStore.setState({ muted: false })
  ui = await import('../src/lib/uiActionSound')
  await ui.prepareConfirmationActionSound()
  cleanup = ui.maintainConfirmationAudioReadiness()
})
afterEach(() => { cleanup?.(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

it('keeps a nonzero DC branch and starts the first click after180seconds without waiting for another fetch', () => {
  vi.useFakeTimers()
  expect(context.warm).toHaveLength(1)
  expect(context.warm[0].offset.setValueAtTime).toHaveBeenCalledWith(1 / 32768, 0)
  const fetched = vi.mocked(fetch).mock.calls.length
  vi.advanceTimersByTime(180000)
  context.currentTime = 180
  ui.playConfirmationActionSound()
  expect(context.cues).toHaveLength(1)
  expect(context.cues[0].start).toHaveBeenCalledOnce()
  // Board-entry preload may start on this gesture, but confirmation is not reloaded.
  expect(vi.mocked(fetch).mock.calls.filter(([url]) => url === vi.mocked(fetch).mock.calls[0][0])).toHaveLength(1)
  expect(vi.mocked(fetch).mock.calls.length).toBeGreaterThanOrEqual(fetched)
})
it('resumes interrupted audio immediately on the first gesture, not only suspended audio', () => {
  context.state = 'interrupted'
  window.dispatchEvent(new Event('pointerdown'))
  expect(context.resume).toHaveBeenCalledOnce()
  ui.playConfirmationActionSound()
  expect(context.cues[0].start).toHaveBeenCalledOnce()
})
it('reacts to an idle interruption before the next click', () => {
  context.state = 'interrupted'
  context.dispatchEvent(new Event('statechange'))
  expect(context.resume).toHaveBeenCalledOnce()
})
it('does not make a new gesture wait for an older autoplay resume request', () => {
  context.state = 'interrupted'
  context.resume.mockImplementationOnce(() => new Promise<void>(() => {}))
  context.dispatchEvent(new Event('statechange'))
  expect(context.resume).toHaveBeenCalledOnce()
  window.dispatchEvent(new Event('pointerdown'))
  expect(context.resume).toHaveBeenCalledTimes(2)
  ui.playConfirmationActionSound()
  expect(context.cues[0].start).toHaveBeenCalledOnce()
})
it('stops warming on mute or hidden tab and removes the interruption listener on cleanup', () => {
  const first = context.warm[0]
  settings.useAudioSettingsStore.setState({ muted: true })
  expect(first.stop).toHaveBeenCalledOnce()
  ui.playConfirmationActionSound()
  expect(context.cues).toHaveLength(0)
  settings.useAudioSettingsStore.setState({ muted: false })
  const second = context.warm[1]
  const visibility = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden')
  document.dispatchEvent(new Event('visibilitychange'))
  expect(second.stop).toHaveBeenCalledOnce()
  visibility.mockReturnValue('visible')
  cleanup?.(); cleanup = undefined
  context.resume.mockClear()
  context.state = 'interrupted'
  context.dispatchEvent(new Event('statechange'))
  expect(context.resume).not.toHaveBeenCalled()
})
