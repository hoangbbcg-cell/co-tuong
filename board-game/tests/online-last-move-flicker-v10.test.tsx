// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Board } from '../src/features/game/components/Board'
import type { Board as BoardState, Move } from '../src/types/game'

const emptyBoard = Array.from(
  { length: 10 },
  () => Array(9).fill(null),
) as BoardState

const lastMove: Move = {
  from: { row: 6, col: 0 },
  to: { row: 5, col: 0 },
}

const props = {
  board: emptyBoard,
  selected: null,
  legalMoves: [],
  animation: null,
  lastMove,
  frameWidth: 567,
  scale: 0.5,
  disabled: false,
  showStart: false,
  startDisabled: false,
  startLabel: '',
  onSelect: vi.fn(),
  onStart: vi.fn(),
}

afterEach(() => {
  cleanup()
})

describe('online previous-move marker flicker', () => {
  it('keeps previous move markers visible normally', () => {
    render(<Board {...props} suppressLastMoveMarkers={false} />)
    expect(screen.getByTestId('last-move-origin')).toBeTruthy()
    expect(screen.getByTestId('last-move-destination')).toBeTruthy()
  })

  it('hides both markers while online move is pending', () => {
    render(<Board {...props} suppressLastMoveMarkers />)
    expect(screen.queryByTestId('last-move-origin')).toBeNull()
    expect(screen.queryByTestId('last-move-destination')).toBeNull()
  })

  it('restores markers when the pending period ends', () => {
    const view = render(<Board {...props} suppressLastMoveMarkers />)
    expect(screen.queryByTestId('last-move-origin')).toBeNull()

    view.rerender(<Board {...props} suppressLastMoveMarkers={false} />)
    expect(screen.getByTestId('last-move-origin')).toBeTruthy()
    expect(screen.getByTestId('last-move-destination')).toBeTruthy()
  })
})