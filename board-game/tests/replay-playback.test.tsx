// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useReplayPlayback } from '../src/features/game/hooks/useReplayPlayback'
import { createGame } from '../src/game/state/initial'
import type { RecordedMatch } from '../src/types/recordedMatch'
const record = (id = 'replay'): RecordedMatch => ({ id, endedAt: 0, redName: 'Red', blackName: 'Black', states: [createGame(), createGame(), createGame()] })
afterEach(() => vi.useRealTimers())
it('autoplays despite repeated refreshed objects for the same recording, pauses and resumes', () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(({ recording }) => useReplayPlayback(recording), { initialProps: { recording: record() } })
  for (let i = 0; i < 3; i++) {
    act(() => vi.advanceTimersByTime(400))
    rerender({ recording: record() })
  }
  expect(result.current.step).toBe(1)
  act(() => result.current.toggle())
  act(() => vi.advanceTimersByTime(2400))
  expect(result.current.step).toBe(1)
  act(() => result.current.toggle())
  act(() => vi.advanceTimersByTime(1200))
  expect(result.current.step).toBe(2)
  expect(result.current.playing).toBe(false)
  act(() => result.current.toggle())
  expect(result.current.step).toBe(0)
  expect(result.current.playing).toBe(true)
  act(() => vi.advanceTimersByTime(1200))
  expect(result.current.step).toBe(1)
})
it('waits for entrance and resets playback when opening a different game', () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(({ recording, enabled }) => useReplayPlayback(recording, enabled), { initialProps: { recording: record(), enabled: false } })
  act(() => vi.advanceTimersByTime(3000))
  expect(result.current.step).toBe(0)
  rerender({ recording: record(), enabled: true })
  act(() => vi.advanceTimersByTime(1200))
  expect(result.current.step).toBe(1)
  act(() => result.current.seek(2))
  rerender({ recording: record('another'), enabled: true })
  expect(result.current.step).toBe(0)
  expect(result.current.playing).toBe(true)
  act(() => vi.advanceTimersByTime(1200))
  expect(result.current.step).toBe(1)
})
