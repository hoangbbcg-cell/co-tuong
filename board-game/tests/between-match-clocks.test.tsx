// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { useBetweenMatchClocks } from '../src/features/game/hooks/useBetweenMatchClocks'
import { hasReadyPlayerBetweenMatches } from '../src/lib/roomReadiness'
import { useMatchResult } from '../src/features/game/hooks/useMatchResult'
import { createGame } from '../src/game/state/initial'
import type { GameState } from '../src/types/game'
import type { RoomSnapshot } from '../src/types/room'
afterEach(cleanup)
const live: GameState = { ...createGame(), phase: 'playing', remainingTime: { red: 123456, black: 234567 } }
const ended: GameState = { ...live, phase: 'finished', result: { winner: 'red', reason: 'resign' } }
const initial = { enabled: true, roomKey: 'room', seats: 'a:b', completionKey: 'match', game: live, minutes: 5, ready: false, complete: false, popupVisible: false }
it('resets both clocks on presentation completion and keeps them still until a new playing game', () => {
  const h = renderHook(useBetweenMatchClocks, { initialProps: initial })
  h.rerender({ ...initial, game: ended, popupVisible: true })
  expect(h.result.current.remaining).toEqual(live.remainingTime)
  h.rerender({ ...initial, game: ended, popupVisible: true, complete: true })
  expect(h.result.current.remaining).toEqual({ red: 300000, black: 300000 })
  h.rerender({ ...initial, game: ended })
  expect(h.result.current.remaining.red).toBe(300000)
  h.rerender(initial)
  expect(h.result.current.remaining).toEqual(live.remainingTime)
})
it('resets for a new seated player or entering an already finished room', () => {
  const h = renderHook(useBetweenMatchClocks, { initialProps: initial })
  h.rerender({ ...initial, game: ended, seats: 'a:c' })
  expect(h.result.current.remaining).toEqual({ red: 300000, black: 300000 })
  h.rerender({ ...initial, game: ended, seats: 'a:c' })
  expect(h.result.current.remaining.red).toBe(300000)
  const joined = renderHook(useBetweenMatchClocks, { initialProps: { ...initial, game: ended } })
  expect(joined.result.current.remaining.black).toBe(300000)
})
it('either player Ready clears the result on both sides and resets clocks, without treating playing Ready flags as a reset', () => {
  const room = { game: ended, players: [{ id: 'a', ready: false }, { id: 'b', ready: true }] } as RoomSnapshot
  expect(hasReadyPlayerBetweenMatches(room)).toBe(true)
  expect(hasReadyPlayerBetweenMatches({ ...room, game: live })).toBe(false)
  for (const side of ['red', 'black'] as const) {
    const props = { game: live, roomKey: 'room', side, enabled: true, waitForCheckmate: false, ready: false }
    const h = renderHook(useMatchResult, { initialProps: props })
    h.rerender({ ...props, game: ended })
    expect(h.result.current.outcome).toBe(side === 'red' ? 'win' : 'loss')
    h.rerender({ ...props, game: ended, ready: hasReadyPlayerBetweenMatches(room) })
    expect(h.result.current.outcome).toBeNull()
    h.rerender({ ...props, game: live })
    h.rerender({ ...props, game: ended })
    expect(h.result.current.outcome).not.toBeNull()
  }
  const clocks = renderHook(useBetweenMatchClocks, { initialProps: initial })
  clocks.rerender({ ...initial, game: ended, ready: true })
  expect(clocks.result.current.remaining.red).toBe(300000)
})
it('resets when the result popup is confirmed and preserves stored final clock balances', () => {
  const h = renderHook(useBetweenMatchClocks, { initialProps: { ...initial, game: ended } })
  act(() => h.result.current.reset())
  expect(h.result.current.remaining.red).toBe(300000)
  expect(ended.remainingTime).toEqual({ red: 123456, black: 234567 })
})
