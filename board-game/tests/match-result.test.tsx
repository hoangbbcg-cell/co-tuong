// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useMatchResult } from '../src/features/game/hooks/useMatchResult'
import { Board } from '../src/features/game/components/Board'
import { createGame } from '../src/game/state/initial'
import type { GameState, Side } from '../src/types/game'

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks() })
const playing: GameState = { board: [], currentTurn: 'red', phase: 'playing', remainingTime: { red: 600000, black: 600000 }, lastClockUpdate: 0, turnElapsed: 0, result: null, lastMove: null }
const ended = (winner: Side | null, reason: 'checkmate' | 'timeout' | 'draw' = 'checkmate'): GameState => ({ ...playing, phase: 'finished', result: { winner, reason } })
const props = (game: GameState, side: Side | null = 'red', enabled = true) => ({ game, side, enabled, roomKey: 'one', waitForCheckmate: game.result?.reason === 'checkmate' })

it('recovers recorded results when online snapshots skip finished, excluding spectators', () => {
  const completed = { id: 'completed-1', endedAt: 1, redName: 'Red', blackName: 'Black', states: [ended('red')] }
  const initial = { ...props(playing, 'black'), completed: undefined as typeof completed | undefined }
  const loser = renderHook(useMatchResult, { initialProps: initial })
  loser.rerender({ ...props({ ...playing, phase: 'ready' }, null), completed })
  expect(loser.result.current.outcome).toBe('loss')
  const viewer = renderHook(useMatchResult, { initialProps: { ...props(playing, null), completed: initial.completed } })
  viewer.rerender({ ...props({ ...playing, phase: 'ready' }, 'black'), completed })
  expect(viewer.result.current.outcome).toBeNull()
})

it('waits for the complete checkmate effect, dismisses once, and clears on a new game', () => {
  const hook = renderHook(useMatchResult, { initialProps: props(playing) })
  hook.rerender(props(ended('red')))
  expect(hook.result.current.outcome).toBeNull()
  act(() => hook.result.current.complete())
  expect(hook.result.current.outcome).toBe('win')
  act(() => hook.result.current.dismiss())
  hook.rerender(props({ ...ended('red') }))
  expect(hook.result.current.outcome).toBeNull()
  hook.rerender(props(playing))
  hook.rerender(props(ended('black', 'timeout')))
  expect(hook.result.current.outcome).toBe('loss')
})
it('keeps a losing participant result after queue rotation, excluding the promoted spectator', () => {
  const loser = renderHook(useMatchResult, { initialProps: props(playing, 'black') })
  loser.rerender(props(ended('red', 'timeout'), null))
  expect(loser.result.current.outcome).toBe('loss')
  loser.rerender(props({ ...playing, phase: 'ready' }, null))
  expect(loser.result.current.outcome).toBe('loss')
  const viewer = renderHook(useMatchResult, { initialProps: props(playing, null) })
  viewer.rerender(props(ended('red', 'timeout'), 'black'))
  expect(viewer.result.current.outcome).toBeNull()
})
it('does not show results to late viewers, replay/trial, or drawn matches', () => {
  const late = renderHook(useMatchResult, { initialProps: props(ended('red', 'timeout')) })
  expect(late.result.current.outcome).toBeNull()
  const replay = renderHook(useMatchResult, { initialProps: props(playing, 'red', false) })
  replay.rerender(props(ended('red', 'timeout'), 'red', false))
  expect(replay.result.current.outcome).toBeNull()
  const draw = renderHook(useMatchResult, { initialProps: props(playing) })
  draw.rerender(props(ended(null, 'draw')))
  expect(draw.result.current.outcome).toBeNull()
})

it('reports completion only after the checkmate image finishes and cancels on unmount', () => {
  vi.useFakeTimers()
  vi.stubGlobal('matchMedia', () => ({ matches: true }))
  const complete = vi.fn()
  const game = createGame()
  const props = { board: game.board, selected: null, legalMoves: [], frameWidth: 567, scale: 0.5, disabled: true, showStart: false, startDisabled: false, startLabel: '', onSelect: () => {}, onStart: () => {}, checkmateEffect: true, lastMove: { from: { row: 7, col: 0 }, to: { row: 6, col: 0 } }, onCheckmateEffectComplete: complete }
  const view = render(<Board {...props} animation={null} />)
  const hit = document.body.querySelector<HTMLImageElement>('img[src*="checkmate-hit"]')!
  expect(hit).toBeTruthy()
  act(() => { fireEvent.load(hit); vi.advanceTimersByTime(199) })
  expect(complete).not.toHaveBeenCalled()
  act(() => vi.advanceTimersByTime(1))
  expect(complete).toHaveBeenCalledTimes(1)
  view.unmount()
  const second = render(<Board {...props} animation={null} />)
  const canceledHit = document.body.querySelector<HTMLImageElement>('img[src*="checkmate-hit"]')!
  fireEvent.load(canceledHit)
  second.unmount()
  act(() => vi.runAllTimers())
  expect(complete).toHaveBeenCalledTimes(1)
})

it('still completes after one browser animation is canceled, waiting for all others', async () => {
  vi.useFakeTimers()
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  const pending: { resolve: () => void; reject: () => void }[] = []
  const previous = Object.getOwnPropertyDescriptor(Element.prototype, 'animate')
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: () => {
    let resolve!: () => void, reject!: () => void
    const finished = new Promise<void>((yes, no) => { resolve = yes; reject = () => no(new Error('Canceled by browser')) })
    pending.push({ resolve, reject })
    return { finished, cancel: reject }
  } })
  try {
    const complete = vi.fn()
    const game = createGame()
    render(<Board board={game.board} selected={null} legalMoves={[]} animation={null} frameWidth={567} scale={0.5} disabled={true} showStart={false} startDisabled={false} startLabel="" onSelect={() => {}} onStart={() => {}} checkmateEffect={true} lastMove={{ from: { row: 7, col: 0 }, to: { row: 6, col: 0 } }} onCheckmateEffectComplete={complete} />)
    fireEvent.load(document.body.querySelector<HTMLImageElement>('img[src*="checkmate-hit"]')!)
    act(() => vi.advanceTimersByTime(200))
    await act(async () => pending[0].reject())
    expect(complete).not.toHaveBeenCalled()
    await act(async () => pending.slice(1).forEach(animation => animation.resolve()))
    expect(complete).toHaveBeenCalledTimes(1)
  } finally {
    cleanup()
    if (previous) Object.defineProperty(Element.prototype, 'animate', previous)
    else Reflect.deleteProperty(Element.prototype, 'animate')
  }
})
