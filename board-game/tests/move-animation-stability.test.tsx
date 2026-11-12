// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { Board } from '../src/features/game/components/Board'
import { createGame } from '../src/game/state/initial'
import { applyMove } from '../src/game/moves/actions'
import type { Move } from '../src/types/game'

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks() })

it('does not restart the moving piece when a hint is cleared or unrelated UI rerenders', () => {
  const game = { ...createGame(), phase: 'playing' as const }
  const move: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }
  const next = applyMove(game, move, 0)
  const cancel = vi.fn()
  const animate = vi.fn(() => ({ cancel }))
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  const previous = Object.getOwnPropertyDescriptor(Element.prototype, 'animate')
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate })
  try {
    const props = { selected: null, legalMoves: [], frameWidth: 567, scale: 0.5, disabled: false, showStart: false, startDisabled: false, startLabel: '', onSelect: () => {}, onStart: () => {} }
    const view = render(<Board {...props} board={game.board} selected={move.from} hintMove={move} animation={null} />)
    const piece = view.container.querySelector('[data-testid="piece-6-0"]')
    view.rerender(<Board {...props} board={next.board} hintMove={move} animation={move} />)
    expect(animate).toHaveBeenCalledTimes(1)
    expect(view.container.querySelector('[data-testid="piece-6-0"]')).toBe(piece)
    // The hint effect clears after the board update, causing another render.
    view.rerender(<Board {...props} board={next.board} hintMove={null} animation={move} />)
    view.rerender(<Board {...props} board={next.board} hintMove={null} animation={move} />)
    expect(animate).toHaveBeenCalledTimes(1)
    expect(cancel).not.toHaveBeenCalled()
    // A refreshed move object plus a selection update must keep the same flight.
    view.rerender(<Board {...props} board={next.board} selected={move.from} animation={structuredClone(move)} />)
    expect(animate).toHaveBeenCalledTimes(1)
    expect(cancel).not.toHaveBeenCalled()
    const frames = animate.mock.calls[0] as unknown as [Keyframe[], KeyframeAnimationOptions]
    expect(frames[0][0].transform).toBe('translate3d(0px, -6px, 0px)')
    expect(frames[0].at(-1)?.transform).toBe('translate3d(0px, -63px, 0px)')
    expect(frames[1].duration).toBe(400)
    // Movement must continue toward the destination during the landing section.
    const landing = frames[0].filter(frame => Number(frame.offset) >= 0.85 && Number(frame.offset) < 1)
    expect(landing.length).toBeGreaterThan(1)
    expect(landing.every(frame => frame.transform !== frames[0].at(-1)?.transform)).toBe(true)
    view.rerender(<Board {...props} board={next.board} animation={null} />)
    expect(cancel).toHaveBeenCalledTimes(1)
    expect(view.container.querySelector('[data-testid="piece-5-0"]')).toBe(piece)
    expect((piece as HTMLElement).style.top).toBe('326px')
  } finally {
    if (previous) Object.defineProperty(Element.prototype, 'animate', previous)
    else Reflect.deleteProperty(Element.prototype, 'animate')
  }
})

it('preserves elapsed flight time and selection lift when responsive scale changes', () => {
  const game = { ...createGame(), phase: 'playing' as const }
  const move: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }
  const next = applyMove(game, move, 0)
  const motions: Array<{ currentTime: number; cancel: ReturnType<typeof vi.fn> }> = []
  const animate = vi.fn(() => {
    const motion = { currentTime: 0, cancel: vi.fn() }
    motions.push(motion)
    return motion
  })
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  const previous = Object.getOwnPropertyDescriptor(Element.prototype, 'animate')
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate })
  try {
    const props = { legalMoves: [], frameWidth: 567, disabled: false, showStart: false, startDisabled: false, startLabel: '', onSelect: () => {}, onStart: () => {} }
    const view = render(<Board {...props} scale={0.5} board={game.board} selected={move.from} animation={null} />)
    view.rerender(<Board {...props} scale={0.5} board={next.board} selected={null} animation={move} />)
    motions[0].currentTime = 175
    view.rerender(<Board {...props} scale={0.6} board={next.board} selected={null} animation={structuredClone(move)} />)
    expect(motions).toHaveLength(2)
    expect(motions[0].cancel).toHaveBeenCalledOnce()
    expect(motions[1].currentTime).toBe(175)
    const calls = animate.mock.calls as unknown as Array<[Keyframe[], KeyframeAnimationOptions]>
    expect(calls[1][1].duration).toBe(400)
    expect(calls[1][0][0].transform).toBe('translate3d(0px, -7px, 0px)')
  } finally {
    if (previous) Object.defineProperty(Element.prototype, 'animate', previous)
    else Reflect.deleteProperty(Element.prototype, 'animate')
  }
})
