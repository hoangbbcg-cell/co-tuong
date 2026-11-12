import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createInitialBoard } from '../src/game/state/initial'
import { gameFromPositionFen, positionFen } from '../src/game/state/customPosition'

describe('Custom position first mover', () => {
  it('keeps chosen first turn in FEN independently of player color', () => {
    const board = createInitialBoard()
    for (const human of ['red', 'black'] as const) {
      for (const mover of ['human', 'computer'] as const) {
        const first = mover === 'human' ? human : human === 'red' ? 'black' : 'red'
        const fen = positionFen(board, first)
        expect(fen.split(' ')[1]).toBe(first === 'red' ? 'w' : 'b')
        expect(gameFromPositionFen(fen).currentTurn).toBe(first)
      }
    }
  })
  it('exposes first mover controls and retains both colors', () => {
    const hook = readFileSync(resolve('src/features/game/hooks/usePositionEditor.ts'), 'utf8')
    const page = readFileSync(resolve('src/pages/computer/CustomPositionPage.tsx'), 'utf8')
    expect(hook).toContain("firstMover === 'human' ? side")
    expect(hook).toContain('setFirstSide: (next: Side) => setFirstMover(')
    expect(hook).toContain('positionFen(board, firstSide)')
    expect(hook).toContain('positionError(board, firstSide)')
    expect(page).not.toContain("editor.setFirstMover('human')")
    expect(page).not.toContain("editor.setFirstMover('computer')")
    expect(page).not.toContain('Nước đầu:')
    expect(page).toContain("editor.changeSide('red')")
    expect(page).toContain("editor.changeSide('black')")
  })
})