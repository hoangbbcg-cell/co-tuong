// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useDemoReadyCountdown } from '../src/features/game/hooks/useDemoReadyCountdown'
import { useGameStore } from '../src/store/gameStore'

afterEach(() => { cleanup(); vi.useRealTimers() })
it('bàn mẫu hiện20 ngay, hết20s bắt đầu; rời bàn hủy timer', () => {
  vi.useFakeTimers()
  useGameStore.getState().reset(performance.now())
  const view = renderHook(() => useDemoReadyCountdown(true))
  expect(view.result.current).toBe(20)
  act(() => vi.advanceTimersByTime(19_000))
  expect(view.result.current).toBe(1)
  expect(useGameStore.getState().game.phase).toBe('ready')
  act(() => vi.advanceTimersByTime(1000))
  expect(useGameStore.getState().game.phase).toBe('playing')
  view.unmount()
  useGameStore.getState().reset(performance.now())
  const next = renderHook(() => useDemoReadyCountdown(true))
  next.unmount()
  act(() => vi.advanceTimersByTime(30_000))
  expect(useGameStore.getState().game.phase).toBe('ready')
})
