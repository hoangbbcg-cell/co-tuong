import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { createInitialBoard } from '../src/game/state/initial'
import { positionError, gameFromPositionFen, positionFen } from '../src/game/state/customPosition'

const hook = readFileSync('src/features/game/hooks/usePositionEditor.ts', 'utf8')
const page = readFileSync('src/pages/computer/CustomPositionPage.tsx', 'utf8')
const game = readFileSync('src/features/game/hooks/useGame.ts', 'utf8')

describe('Custom position: first legal piece chooses the human side', () => {
  it('accepts both initial-turn colors on a legal standard board', () => {
    const board = createInitialBoard()
    for (const side of ['red', 'black'] as const) {
      expect(positionError(board, side)).toBeNull()
      const fen = positionFen(board, side)
      expect(gameFromPositionFen(fen).currentTurn).toBe(side)
    }
  })
  it('keeps the board editor orientation controls, without a separate first-turn row', () => {
    expect(page).not.toContain('Nước đầu:')
    expect(page).not.toContain('Tôi đi trước')
    expect(page).not.toContain('Máy đi trước')
    expect(page).toContain("editor.changeSide('red')")
    expect(page).toContain("editor.changeSide('black')")
    expect(hook).toContain('const initialTurn: Side = preferredError ? alternateSide : firstSide')
    expect(hook).toContain('humanSide: initialTurn')
  })
  it('allows initial selection of either color, checks legality and passes subsequent turns to the existing engine', () => {
    expect(game).toContain('session.customPositionTrial && local.history.length === 0')
    expect(game).toContain('positionError(game.board, firstPiece.side)')
    expect(game).toContain('useSessionStore.setState({ humanSide: firstPiece.side })')
    expect(game).toContain('local.select(point, performance.now()')
    expect(game).toContain('computer && !freeOpening && game.currentTurn !== session.humanSide')
  })
})