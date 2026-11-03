// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { useCelebrationSound } from '../src/lib/useCelebrationSound'
import { useAudioSettingsStore } from '../src/store/audioSettingsStore'

const start = vi.fn(), stop = vi.fn(), gainValue = vi.fn()
beforeEach(() => {
  useAudioSettingsStore.setState({ muted: false })
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, arrayBuffer: async () => new ArrayBuffer(1) }))
  vi.stubGlobal('AudioContext', class {
    state = 'running'
    currentTime = 0
    destination = {}
    createGain() { return { connect: vi.fn(), disconnect: vi.fn(), gain: { setValueAtTime: gainValue } } }
    decodeAudioData() { return Promise.resolve({}) }
    resume() { return Promise.resolve() }
    close() { return Promise.resolve() }
    createBufferSource() { return { start, stop, connect: vi.fn(), disconnect: vi.fn(), onended: null, buffer: null } }
  })
})
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.clearAllMocks() })
const flush = () => act(async () => { await new Promise(resolve => setTimeout(resolve, 0)) })

it('preloads without playing, plays once when shown and stops when dismissed', async () => {
  const view = renderHook(({ active }) => useCelebrationSound('victory', active), { initialProps: { active: false } })
  await flush()
  expect(start).not.toHaveBeenCalled()
  view.rerender({ active: true })
  await flush()
  expect(start).toHaveBeenCalledTimes(1)
  view.rerender({ active: true })
  await flush()
  expect(start).toHaveBeenCalledTimes(1)
  view.rerender({ active: false })
  expect(stop).toHaveBeenCalledTimes(1)
})

it('plays the supplied defeat sound when the result is a loss', async () => {
  const view = renderHook(({ active }) => useCelebrationSound('defeat', active), { initialProps: { active: false } })
  await flush()
  expect(start).not.toHaveBeenCalled()
  view.rerender({ active: true })
  await flush()
  expect(start).toHaveBeenCalledTimes(1)
})

it('lets started audio finish after dismissal, retains mute control and stops on a new session', async () => {
  const view = renderHook(({ active, resetKey }) => useCelebrationSound('reward', active, { finishOnClose: true, resetKey }), { initialProps: { active: true, resetKey: 'home' } })
  await flush()
  expect(start).toHaveBeenCalledTimes(1)
  view.rerender({ active: false, resetKey: 'home' })
  expect(stop).not.toHaveBeenCalled()
  act(() => useAudioSettingsStore.setState({ muted: true }))
  expect(gainValue).toHaveBeenLastCalledWith(0, 0)
  view.rerender({ active: false, resetKey: 'game' })
  expect(stop).toHaveBeenCalledTimes(1)
})

it('cancels an unloaded cue even when finish after dismissal is enabled', async () => {
  let resolve!: (value: Response) => void
  vi.mocked(fetch).mockImplementationOnce(() => new Promise(done => { resolve = done }) as Promise<Response>)
  const view = renderHook(({ active }) => useCelebrationSound('reward', active, { finishOnClose: true }), { initialProps: { active: true } })
  view.rerender({ active: false })
  resolve({ ok: true, arrayBuffer: async () => new ArrayBuffer(1) } as Response)
  await flush()
  expect(start).not.toHaveBeenCalled()
})

it('does not play a stale reward notification after loading finishes', async () => {
  let resolve!: (value: Response) => void
  vi.mocked(fetch).mockImplementationOnce(() => new Promise(done => { resolve = done }) as Promise<Response>)
  const view = renderHook(({ active }) => useCelebrationSound('reward', active), { initialProps: { active: true } })
  view.rerender({ active: false })
  resolve({ ok: true, arrayBuffer: async () => new ArrayBuffer(1) } as Response)
  await flush()
  expect(start).not.toHaveBeenCalled()
})

it('honors mute before a notification and during playback', async () => {
  useAudioSettingsStore.setState({ muted: true })
  const view = renderHook(({ active }) => useCelebrationSound('reward', active), { initialProps: { active: true } })
  await flush()
  expect(start).not.toHaveBeenCalled()
  view.rerender({ active: false })
  act(() => useAudioSettingsStore.setState({ muted: false }))
  view.rerender({ active: true })
  await flush()
  expect(start).toHaveBeenCalledTimes(1)
  act(() => useAudioSettingsStore.setState({ muted: true }))
  expect(gainValue).toHaveBeenLastCalledWith(0, 0)
})
