// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { applyMove } from '../src/game/moves/actions'
import { useOnlineMoveAnimation } from '../src/features/game/hooks/useOnlineMoveAnimation'
import type { GameState } from '../src/types/game'

beforeEach(() => { vi.useFakeTimers(); vi.stubGlobal('matchMedia', () => ({ matches: false })) })
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals() })
const move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }
const initial = (): GameState => ({ ...createGame(), phase: 'playing' })

it('animates server-confirmed moves once; duplicate acks and clock snapshots do not restart the 400ms flight', () => {
  const game = initial(), next = applyMove(game, move, 0)
  const view = renderHook(({ state, count }) => useOnlineMoveAnimation('room', state, count), { initialProps: { state: game, count: 0 } })
  view.rerender({ state: next, count: 1 })
  expect(view.result.current).toEqual(move)
  const flight = view.result.current
  act(() => vi.advanceTimersByTime(200))
  view.rerender({ state: structuredClone(next), count: 1 })
  expect(view.result.current).toBe(flight)
  act(() => vi.advanceTimersByTime(199))
  expect(view.result.current).toBe(flight)
  act(() => vi.advanceTimersByTime(1))
  expect(view.result.current).toBeNull()
})
it('does not animate late joins, room switches, takebacks or a gap in snapshots', () => {
  const game = initial(), next = applyMove(game, move, 0)
  const view = renderHook(({ room, state, count }) => useOnlineMoveAnimation(room, state, count), { initialProps: { room: 'one', state: next, count: 1 } })
  expect(view.result.current).toBeNull()
  view.rerender({ room: 'two', state: next, count: 2 })
  expect(view.result.current).toBeNull()
  view.rerender({ room: 'two', state: game, count: 0 })
  expect(view.result.current).toBeNull()
  view.rerender({ room: 'two', state: next, count: 2 })
  expect(view.result.current).toBeNull()
})
it('keeps the final move animation when the same snapshot ends the game and cancels display on leaving', () => {
  const game = initial(), next = { ...applyMove(game, move, 0), phase: 'finished' as const }
  const view = renderHook(({ room, state, count }: { room: string | null; state: GameState; count: number }) => useOnlineMoveAnimation(room, state, count), { initialProps: { room: 'room' as string | null, state: game, count: 0 } })
  view.rerender({ room: 'room', state: next, count: 1 })
  expect(view.result.current).toEqual(move)
  view.rerender({ room: null, state: next, count: 1 })
  expect(view.result.current).toBeNull()
})
