// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act, cleanup } from '@testing-library/react'
import { createGame } from '../src/game/state/initial'
import { useReplayTrial } from '../src/features/game/hooks/useReplayTrial'
import { useSessionStore } from '../src/store/sessionStore'
import { readFileSync } from 'node:fs'

const page = readFileSync('src/pages/game/GamePage.tsx', 'utf8')

describe('Custom position free first move uses actual Board handler', () => {
  beforeEach(() => { cleanup(); useSessionStore.setState({ humanSide: 'red' }) })
  it('routes custom position Board clicks through useReplayTrial', () => {
    expect(page).toContain('onSelect={trial.active ? trial.select : match.select}')
    expect(page).toContain('onStart={positionTrial && trial.active ? trial.reset : match.start}')
    expect(page).toContain("'custom-position-trial'")
  })
  for (const side of ['red', 'black'] as const) {
    it(`picks ${side} first without enabling AI regardless of board orientation`, () => {
      const board = createGame()
      const point = side === 'red' ? { row: 6, col: 0 } : { row: 3, col: 0 }
      const { result, unmount } = renderHook(() => useReplayTrial(board, 'red', 'custom-position-trial', true, false, true))
      act(() => { result.current.select(point) })
      expect(result.current.game?.currentTurn).toBe(side)
      expect(result.current.selected).toEqual(point)
      expect(useSessionStore.getState().humanSide).toBe('red')
      expect(result.current.machineRed).toBe(false)
      expect(result.current.machineBlack).toBe(false)
      unmount()
    })
  }
  it('does not give replay mode a free first turn', () => {
    const { result, unmount } = renderHook(() => useReplayTrial(createGame(), 'red', 'replay-other-id', true, false))
    act(() => { result.current.select({ row: 3, col: 0 }) })
    expect(result.current.game?.currentTurn).toBe('red')
    expect(result.current.selected).toBeNull()
    unmount()
  })
})