// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { useReplayTrial } from '../src/features/game/hooks/useReplayTrial'
import { PIECE_MOVE_DURATION_MS } from '../src/features/game/moveAnimation'
import { pikafishApi } from '../src/services/pikafish'
import * as rules from '../src/game/rules'
vi.mock('../src/services/pikafish', () => ({ pikafishApi: { move: vi.fn(async () => ({ from: { row: 3, col: 0 }, to: { row: 4, col: 0 } })) } }))

it('does not recalculate legal moves when unrelated UI rerenders the same trial position', () => {
  const spy = vi.spyOn(rules, 'getLegalMoves')
  try {
    const source = createGame()
    const { result, rerender, unmount } = renderHook(() => useReplayTrial(source, 'red', 'stable-moves', true))
    act(() => result.current.select({ row: 6, col: 0 }))
    const previousCalls = spy.mock.calls.length
    const moves = result.current.moves
    const select = result.current.select
    expect(previousCalls).toBeGreaterThan(0)
    rerender()
    rerender()
    expect(spy.mock.calls.length).toBe(previousCalls)
    expect(result.current.moves).toBe(moves)
    expect(result.current.select).toBe(select)
    act(() => result.current.select({ row: 6, col: 2 }))
    expect(spy.mock.calls.length).toBeGreaterThan(previousCalls)
    unmount()
  } finally { spy.mockRestore() }
})

it('branches without modifying the recording and resets to the exact starting board', () => {
  const source = createGame()
  const before = JSON.stringify(source)
  const { result } = renderHook(() => useReplayTrial(source, 'red', 'one'))
  act(() => result.current.toggle())
  act(() => result.current.select({ row: 6, col: 0 }))
  act(() => result.current.select({ row: 5, col: 0 }))
  expect(result.current.animation?.to).toEqual({ row: 5, col: 0 })
  act(() => result.current.back())
  expect(result.current.step).toBe(0)
  act(() => result.current.seek(1))
  expect(result.current.step).toBe(1)
  expect(result.current.game?.currentTurn).toBe('black')
  act(() => result.current.seek(0))
  expect(result.current.game?.board).toEqual(source.board)
  act(() => result.current.seek(1))
  expect(result.current.game?.board[5][0]?.side).toBe('red')
  act(() => result.current.reset())
  expect(result.current.total).toBe(0)
  expect(result.current.game?.board).toEqual(source.board)
  expect(JSON.stringify(source)).toBe(before)
  act(() => result.current.toggle())
  expect(result.current.active).toBe(false)
})
it('uses Pikafish level 10 with the trial root and history, and cancels pending work', async () => {
  vi.useFakeTimers()
  const source = createGame()
  const { result, unmount } = renderHook(() => useReplayTrial(source, 'red', 'two'))
  act(() => result.current.toggle())
  act(() => result.current.toggleMachine())
  act(() => result.current.select({ row: 6, col: 0 }))
  act(() => result.current.select({ row: 5, col: 0 }))
  expect(result.current.animation?.from).toEqual({ row: 6, col: 0 })
  act(() => vi.advanceTimersByTime(PIECE_MOVE_DURATION_MS))
  await act(async () => { await vi.advanceTimersByTimeAsync(550) })
  expect(pikafishApi.move).toHaveBeenCalledWith(['a3a4'], 600_000, 10, expect.any(AbortSignal), expect.stringContaining(' w - - 0 1'), 700)
  expect(result.current.step).toBe(2)
  expect(result.current.animation).not.toBeNull()
  expect(result.current.game?.currentTurn).toBe('red')
  act(() => result.current.back())
  expect(result.current.step).toBe(1)
  act(() => result.current.back())
  expect(result.current.step).toBe(0)
  act(() => result.current.seek(2))
  act(() => vi.advanceTimersByTime(PIECE_MOVE_DURATION_MS))
  act(() => result.current.select({ row: 6, col: 2 }))
  act(() => result.current.select({ row: 5, col: 2 }))
  act(() => result.current.toggleMachine())
  act(() => vi.advanceTimersByTime(1000))
  expect(result.current.step).toBe(3)
  act(() => result.current.toggleMachine())
  act(() => result.current.toggle())
  expect(result.current.machine).toBe(false)
  act(() => result.current.toggle())
  expect(result.current.machine).toBe(false)
  expect(result.current.animation).toBeNull()
  act(() => vi.advanceTimersByTime(2000))
  expect(result.current.step).toBe(0)
  unmount()
  vi.useRealTimers()
})
