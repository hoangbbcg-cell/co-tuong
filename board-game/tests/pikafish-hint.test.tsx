// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import type { GameState, Move } from '../src/types/game'
import { usePikafishHint } from '../src/features/game/hooks/usePikafishHint'
import { pikafishApi } from '../src/services/pikafish'
import { Board } from '../src/features/game/components/Board'
import { positionFen } from '../src/game/state/customPosition'

vi.mock('../src/services/pikafish', () => ({ pikafishApi: { move: vi.fn() } }))
afterEach(() => { cleanup(); vi.resetAllMocks() })
const redMove: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }
const playing = () => ({ ...createGame(), phase: 'playing' as const })

it('clears a displayed hint on a move without an extra render during the move animation', async () => {
  const game = playing()
  vi.mocked(pikafishApi.move).mockResolvedValue(redMove)
  let renders = 0
  const { result, rerender } = renderHook(({ snapshot }) => {
    renders++
    return usePikafishHint(snapshot, 'red', true, 0, vi.fn())
  }, { initialProps: { snapshot: game } })
  await act(async () => { await result.current.request() })
  expect(result.current.hint).toEqual(redMove)
  const previous = renders
  rerender({ snapshot: { ...game, board: game.board.map(row => [...row]), currentTurn: 'black' } })
  expect(result.current.hint).toBeNull()
  expect(renders - previous).toBe(1)
})

it('requests the strongest 700ms hint for the human without changing any game state, including clocks', async () => {
  const game = playing(), before = JSON.stringify(game)
  vi.mocked(pikafishApi.move).mockResolvedValue(redMove)
  const { result, rerender } = renderHook(({ snapshot }) => usePikafishHint(snapshot, 'red', true, 0, vi.fn()), { initialProps: { snapshot: game } })
  await act(async () => { await result.current.request() })
  expect(result.current.hint).toEqual(redMove)
  expect(pikafishApi.move).toHaveBeenCalledWith([], 600_000, 10, expect.any(AbortSignal), positionFen(game.board, 'red'), 700)
  expect(JSON.stringify(game)).toBe(before)
  // A clock tick should not erase the hint or restart the request.
  rerender({ snapshot: { ...game, remainingTime: { red: 500_000, black: 600_000 } } })
  expect(result.current.hint).toEqual(redMove)
  expect(pikafishApi.move).toHaveBeenCalledTimes(1)
})

it('replaces hints, cancels superseded requests, and ignores responses after reset/undo/turn changes or leaving', async () => {
  const game = playing()
  const pending: Array<(move: Move) => void> = []
  vi.mocked(pikafishApi.move).mockImplementation(() => new Promise(resolve => pending.push(resolve)))
  const notice = vi.fn()
  const { result, rerender, unmount } = renderHook(({ snapshot, revision }) => usePikafishHint(snapshot, 'red', true, revision, notice), { initialProps: { snapshot: game, revision: 0 } })
  let first!: Promise<void>, second!: Promise<void>
  act(() => { first = result.current.request() })
  expect(result.current.thinking).toBe(true)
  const signal = vi.mocked(pikafishApi.move).mock.calls[0][3]
  act(() => { second = result.current.request() })
  expect(signal.aborted).toBe(true)
  await act(async () => { pending[1](redMove); await second; pending[0]({ from: { row: 6, col: 2 }, to: { row: 5, col: 2 } }); await first })
  expect(result.current.hint).toEqual(redMove)
  expect(result.current.thinking).toBe(false)
  rerender({ snapshot: game, revision: 1 })
  expect(result.current.hint).toBeNull()
  let stale!: Promise<void>
  act(() => { stale = result.current.request() })
  rerender({ snapshot: { ...game, currentTurn: 'black' }, revision: 1 })
  expect(result.current.thinking).toBe(false)
  await act(async () => { pending[2](redMove); await stale })
  expect(result.current.hint).toBeNull()
  rerender({ snapshot: game, revision: 2 })
  act(() => { stale = result.current.request() })
  const leavingSignal = vi.mocked(pikafishApi.move).mock.calls[3][3]
  unmount()
  expect(leavingSignal.aborted).toBe(true)
  await act(async () => { pending[3](redMove); await stale })
  expect(notice).not.toHaveBeenCalled()
})

it('uses black human coordinates and blocks wrong-side, illegal, online/disabled and hidden-chess requests', async () => {
  const game: GameState = { ...playing(), currentTurn: 'black' }
  const blackMove = { from: { row: 3, col: 0 }, to: { row: 4, col: 0 } }
  const notice = vi.fn()
  vi.mocked(pikafishApi.move).mockResolvedValue(blackMove)
  const { result, rerender } = renderHook(({ snapshot, enabled }) => usePikafishHint(snapshot, 'black', enabled, 0, notice), { initialProps: { snapshot: game, enabled: true } })
  await act(async () => { await result.current.request() })
  expect(result.current.hint).toEqual(blackMove)
  vi.mocked(pikafishApi.move).mockResolvedValue(redMove)
  await act(async () => { await result.current.request() })
  expect(result.current.hint).toBeNull()
  expect(notice).toHaveBeenCalled()
  rerender({ snapshot: { ...game, currentTurn: 'red' }, enabled: true })
  await act(async () => { await result.current.request() })
  rerender({ snapshot: { ...game, variant: 'jieqi' }, enabled: true })
  await act(async () => { await result.current.request() })
  rerender({ snapshot: game, enabled: false })
  await act(async () => { await result.current.request() })
  expect(pikafishApi.move).toHaveBeenCalledTimes(2)
})

it('draws one non-interactive arrow on the existing Board and flips it using the same coordinates', () => {
  const game = playing(), onSelect = vi.fn()
  const props = { board: game.board, selected: null, legalMoves: [], animation: null, frameWidth: 567, scale: 0.5, disabled: false, showStart: false, startDisabled: false, startLabel: '', onSelect, onStart: vi.fn() }
  const view = render(<Board {...props} hintMove={redMove} />)
  const arrow = view.getByTestId('pikafish-hint-arrow')
  expect(arrow.style.pointerEvents).toBe('none')
  expect(arrow.querySelector('g')?.getAttribute('transform')).toContain('translate(73 833)')
  expect(view.getAllByTestId('board-frame')).toHaveLength(1)
  fireEvent.click(view.getAllByTestId('board-hit')[54])
  expect(onSelect).toHaveBeenCalledWith({ row: 6, col: 0 })
  view.rerender(<Board {...props} hintMove={redMove} flipped />)
  expect(view.getByTestId('pikafish-hint-arrow').querySelector('g')?.getAttribute('transform')).toContain('translate(1061 450)')
  view.rerender(<Board {...props} hintMove={null} />)
  expect(view.queryByTestId('pikafish-hint-arrow')).toBeNull()
})
