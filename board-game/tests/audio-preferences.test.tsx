// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest'
import { act, cleanup, renderHook } from '@testing-library/react'

afterEach(() => { cleanup(); localStorage.clear(); vi.unstubAllGlobals(); vi.resetModules() })

it('restores muted game effects after a module reload independently of music', async () => {
  const first = await import('../src/store/audioSettingsStore')
  first.useAudioSettingsStore.getState().toggleMuted()
  expect(localStorage.getItem('co-tuong-audio-muted-v1')).toBe('true')
  vi.resetModules()
  const reloaded = await import('../src/store/audioSettingsStore')
  expect(reloaded.useAudioSettingsStore.getState().muted).toBe(true)
  expect(localStorage.getItem('co-tuong-audio-music-v1')).toBeNull()
  reloaded.useAudioSettingsStore.getState().toggleMuted()
  expect(localStorage.getItem('co-tuong-audio-muted-v1')).toBe('false')
})

it('keeps background music off after reload and saves turning it back on', async () => {
  const play = vi.fn(async () => {})
  const audio = { paused: true, ended: false, play, pause: vi.fn(), addEventListener: vi.fn() }
  vi.stubGlobal('Audio', class { constructor() { return audio } })
  const first = await import('../src/features/lobby/hooks/useHomeMusic')
  const initial = renderHook(() => first.useHomeMusic())
  await act(async () => initial.result.current.toggle())
  expect(localStorage.getItem('co-tuong-audio-music-v1')).toBe('false')
  initial.unmount()
  play.mockClear()
  vi.resetModules()
  const second = await import('../src/features/lobby/hooks/useHomeMusic')
  const restored = renderHook(() => second.useHomeMusic())
  expect(restored.result.current.playing).toBe(false)
  document.dispatchEvent(new Event('pointerdown'))
  expect(play).not.toHaveBeenCalled()
  await act(async () => restored.result.current.toggle())
  expect(play).toHaveBeenCalledTimes(1)
  expect(localStorage.getItem('co-tuong-audio-music-v1')).toBe('true')
})
