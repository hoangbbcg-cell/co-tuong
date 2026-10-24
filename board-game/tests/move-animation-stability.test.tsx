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
