// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useResultFaces } from '../src/features/game/hooks/useResultFaces'
import { createGame } from '../src/game/state/initial'
import { finishGame, startGame } from '../src/game/moves/actions'

afterEach(() => { cleanup(); vi.useRealTimers() })

it('does not inherit finished faces when mounted for replacement seats', () => {
  const ended = finishGame(startGame(createGame(0), 0), 'red', 'checkmate')
  const hook = renderHook(() => useResultFaces(ended, 'room', 'new-red,new-black'))
  expect(hook.result.current('red')).toBeUndefined()
  expect(hook.result.current('black')).toBeUndefined()
})
const live = startGame(createGame(0), 0)
const finished = finishGame(live, 'red', 'resign')
const initial = { game: live, seats: 'red-one,black-one' }

it('shows faces for five seconds without restarting for repeated snapshots', () => {
  vi.useFakeTimers()
  const hook = renderHook(({ game, seats }) => useResultFaces(game, 'room', seats), { initialProps: initial })
  hook.rerender({ ...initial, game: finished })
  expect(hook.result.current('red')).toBe('win')
  expect(hook.result.current('black')).toBe('loss')
  act(() => vi.advanceTimersByTime(4999))
  hook.rerender({ ...initial, game: { ...finished, result: { ...finished.result! } } })
  expect(hook.result.current('red')).toBe('win')
  act(() => vi.advanceTimersByTime(1))
  expect(hook.result.current('red')).toBeUndefined()
  expect(hook.result.current('black')).toBeUndefined()
})

it.each(['red-one,', 'red-one,new-black'])('hides both faces when a seat leaves or changes: %s', seats => {
  const hook = renderHook(({ game, seats }) => useResultFaces(game, 'room', seats), { initialProps: initial })
  hook.rerender({ ...initial, game: finished })
  hook.rerender({ game: finished, seats })
  expect(hook.result.current('red')).toBeUndefined()
  expect(hook.result.current('black')).toBeUndefined()
  hook.rerender({ ...initial, game: finished })
  expect(hook.result.current('red')).toBeUndefined()
})

it('does not show faces when the opponent leaves in the ending snapshot', () => {
  const hook = renderHook(({ game, seats }) => useResultFaces(game, 'room', seats), { initialProps: initial })
  hook.rerender({ game: finished, seats: 'red-one,' })
  expect(hook.result.current('red')).toBeUndefined()
})

it('does not show result faces when either player leaves the room', () => {
  const left = finishGame(live, 'red', 'leave')
  const hook = renderHook(({ game }) => useResultFaces(game, 'room', initial.seats), { initialProps: { game: live } })
  hook.rerender({ game: left })
  expect(hook.result.current('red')).toBeUndefined()
  expect(hook.result.current('black')).toBeUndefined()
})
