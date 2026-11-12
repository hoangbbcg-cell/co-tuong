// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

function mockPlayback() {
  const sources: { onended: (() => void) | null; start: ReturnType<typeof vi.fn>; connect: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> }[] = []
  const resume = vi.fn(async () => {})
  const suspend = vi.fn(async () => {})
  vi.stubGlobal('Audio', vi.fn(() => { throw new Error('System media must not be created') }))
  vi.stubGlobal('AudioContext', class {
    destination = {}
    resume = resume
    suspend = suspend
    decodeAudioData = vi.fn(async () => ({}))
    createBufferSource() {
      const source = { onended: null as (() => void) | null, start: vi.fn(), connect: vi.fn(), disconnect: vi.fn() }
      sources.push(source)
      return source
    }
  })
  const fetchTrack = vi.fn(async (_url: string) => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(1) }))
  vi.stubGlobal('fetch', fetchTrack)
  return { sources, resume, suspend, fetchTrack }
}

const flushPlayback = async () => { await act(async () => { await Promise.resolve() }) }

it('plays the playlist through Web Audio, preserving the four-second gap across screens', async () => {
  vi.useFakeTimers()
  vi.resetModules()
  const { sources, fetchTrack } = mockPlayback()
  const { useHomeMusic } = await import('../src/features/lobby/hooks/useHomeMusic')
  const view = renderHook(useHomeMusic)
  await flushPlayback()
  expect(fetchTrack.mock.calls[0][0]).toContain('155926')
  expect(Audio).not.toHaveBeenCalled()
  const finish = () => act(() => { sources.at(-1)!.onended!() })
  finish()
  act(() => { document.dispatchEvent(new Event('pointerdown')); vi.advanceTimersByTime(3999) })
  expect(fetchTrack).toHaveBeenCalledTimes(1)
  view.unmount()
  act(() => vi.advanceTimersByTime(1))
  await flushPlayback()
  expect(fetchTrack.mock.calls[1][0]).toContain('247345')
  finish()
  act(() => vi.advanceTimersByTime(4000))
  await flushPlayback()
  expect(fetchTrack.mock.calls[2][0]).toContain('618302')
  finish()
  act(() => vi.advanceTimersByTime(4000))
  await flushPlayback()
  expect(fetchTrack.mock.calls[3][0]).toContain('155926')
})

it('pauses when hidden and resumes the same source on return', async () => {
  vi.resetModules()
  const playback = mockPlayback()
  let visibility = 'visible'
  vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility as DocumentVisibilityState)
  const { useHomeMusic } = await import('../src/features/lobby/hooks/useHomeMusic')
  renderHook(useHomeMusic)
  await flushPlayback()
  act(() => { visibility = 'hidden'; document.dispatchEvent(new Event('visibilitychange')) })
  expect(playback.suspend).toHaveBeenCalledTimes(1)
  act(() => { document.dispatchEvent(new Event('pointerdown')) })
  expect(playback.resume).toHaveBeenCalledTimes(1)
  act(() => { visibility = 'visible'; document.dispatchEvent(new Event('visibilitychange')) })
  await flushPlayback()
  expect(playback.resume).toHaveBeenCalledTimes(2)
  expect(playback.sources).toHaveLength(1)
  vi.restoreAllMocks()
})

it('does not start a track if it is paused while decoding', async () => {
  const playback = mockPlayback()
  let finishDecode!: (value: ArrayBuffer) => void
  playback.fetchTrack.mockImplementation(async () => ({ ok: true, arrayBuffer: () => new Promise<ArrayBuffer>(resolve => { finishDecode = resolve }) }))
  const { BackgroundMusicPlayer } = await import('../src/features/lobby/audio/BackgroundMusicPlayer')
  const player = new BackgroundMusicPlayer(vi.fn())
  const loading = player.play('track.mp3')
  await Promise.resolve()
  await Promise.resolve()
  player.pause()
  finishDecode(new ArrayBuffer(1))
  await loading
  expect(playback.sources).toHaveLength(0)
})
