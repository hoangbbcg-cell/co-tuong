// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, renderHook, act } from '@testing-library/react'
import type { GameState, Move } from '../src/types/game'
import { useOnlineMoveAnimation } from '../src/features/game/hooks/useOnlineMoveAnimation'
import { PIECE_MOVE_DURATION_MS } from '../src/features/game/moveAnimation'

const move: Move = {
  from: { row: 6, col: 0 },
  to: { row: 5, col: 0 },
}

const piece = {
  id: 'test-red-soldier',
  side: 'red',
  type: 'soldier',
  name: '兵',
}

function snapshot(moved: boolean): GameState {
  const board = Array.from({ length: 10 }, () => Array(9).fill(null))
  board[moved ? 5 : 6][0] = piece

  return {
    board,
    phase: 'playing',
    lastMove: moved ? move : null,
  } as unknown as GameState
}

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('online move white flicker regression', () => {
  it('shows the authoritative animation on its first updated render', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    const before = snapshot(false)
    const after = snapshot(true)

    const hook = renderHook(
      ({ game, count }) => useOnlineMoveAnimation('room-1', game, count),
      { initialProps: { game: before, count: 0 } },
    )

    expect(hook.result.current).toBeNull()
    hook.rerender({ game: after, count: 1 })
    expect(hook.result.current).toEqual(move)

    hook.rerender({ game: after, count: 1 })
    expect(hook.result.current).toEqual(move)
  })

  it('does not animate a clock-only or duplicate initial snapshot', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    const before = snapshot(false)

    const hook = renderHook(
      ({ game, count }) => useOnlineMoveAnimation('room-2', game, count),
      { initialProps: { game: before, count: 0 } },
    )

    hook.rerender({ game: snapshot(false), count: 0 })
    expect(hook.result.current).toBeNull()
  })

  it('stops an online animation after the expected duration', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    vi.useFakeTimers()
    const before = snapshot(false)
    const after = snapshot(true)

    const hook = renderHook(
      ({ game, count }) => useOnlineMoveAnimation('room-3', game, count),
      { initialProps: { game: before, count: 0 } },
    )

    hook.rerender({ game: after, count: 1 })
    expect(hook.result.current).toEqual(move)

    act(() => {
      vi.advanceTimersByTime(PIECE_MOVE_DURATION_MS + 1)
    })

    expect(hook.result.current).toBeNull()
  })
})