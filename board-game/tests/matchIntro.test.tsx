// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useMatchIntro } from '../src/features/game/hooks/useMatchIntro'
import type { GameState } from '../src/types/game'

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals() })

function setup(reduced = false) {
  vi.useFakeTimers()
  vi.stubGlobal('matchMedia', () => ({ matches: reduced }))
  return renderHook(({ phase, room }: { phase: GameState['phase']; room: string }) => useMatchIntro(phase, room), {
    initialProps: { phase: 'ready', room: 'room-1' },
  })
}

it('shows only on start, does not replay on snapshots, and expires', () => {
  const { result, rerender } = setup()
  expect(result.current.visible).toBe(false)
  rerender({ phase: 'playing', room: 'room-1' })
  expect(result.current.visible).toBe(true)
  act(() => vi.advanceTimersByTime(800))
  rerender({ phase: 'playing', room: 'room-1' })
  act(() => vi.advanceTimersByTime(500))
  expect(result.current.visible).toBe(false)
})

it('cancels old timer on reset and hides when leaving the room', () => {
  const { result, rerender } = setup()
  rerender({ phase: 'playing', room: 'room-1' })
  act(() => vi.advanceTimersByTime(400))
  rerender({ phase: 'ready', room: 'room-1' })
  expect(result.current.visible).toBe(false)
  rerender({ phase: 'playing', room: 'room-1' })
  act(() => vi.advanceTimersByTime(900))
  expect(result.current.visible).toBe(true)
  rerender({ phase: 'ready', room: 'local' })
  expect(result.current.visible).toBe(false)
})

it('briefly shows the names with reduced motion', () => {
  const { result, rerender } = setup(true)
  rerender({ phase: 'playing', room: 'room-1' })
  expect(result.current.visible).toBe(true)
  act(() => vi.advanceTimersByTime(1300))
  expect(result.current.visible).toBe(false)
})
