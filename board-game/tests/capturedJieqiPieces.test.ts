import { describe, expect, it } from 'vitest'
import { createInitialBoard } from '../src/game/state/initial'
import { countCapturedJieqiPieces } from '../src/features/game/components/CapturedJieqiPieces'

describe('Jieqi captured piece counts', () => {
  it('starts at zero for both sides', () => {
    const board = createInitialBoard()
    expect(countCapturedJieqiPieces(board, 'red')).toBe(0)
    expect(countCapturedJieqiPieces(board, 'black')).toBe(0)
  })

  it('counts missing opponent pieces separately', () => {
    const board = createInitialBoard()
    board[0][0] = null

    expect(countCapturedJieqiPieces(board, 'red')).toBe(1)
    expect(countCapturedJieqiPieces(board, 'black')).toBe(0)

    board[9][0] = null

    expect(countCapturedJieqiPieces(board, 'red')).toBe(1)
    expect(countCapturedJieqiPieces(board, 'black')).toBe(1)
  })

  it('returns to zero when a captured piece is restored', () => {
    const board = createInitialBoard()
    const captured = board[0][0]
    board[0][0] = null

    expect(countCapturedJieqiPieces(board, 'red')).toBe(1)

    board[0][0] = captured

    expect(countCapturedJieqiPieces(board, 'red')).toBe(0)
  })
})