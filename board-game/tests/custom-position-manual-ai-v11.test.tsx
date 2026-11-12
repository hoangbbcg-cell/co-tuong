// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { useReplayTrial } from '../src/features/game/hooks/useReplayTrial'

describe('Custom position: manual AI only and board orientation independent', () => {
  it.each([
    ['red', { row: 6, col: 0 }],
    ['black', { row: 3, col: 0 }],
  ] as const)('selecting %s first does NOT enable either AI toggle', (side, point) => {
    const { result, unmount } = renderHook(() => useReplayTrial(createGame(), 'red', 'custom-position-trial', true, false, true))
    expect(result.current.machineRed).toBe(false)
    expect(result.current.machineBlack).toBe(false)
    act(() => result.current.select(point))
    expect(result.current.openingSide).toBe(side)
    expect(result.current.game?.currentTurn).toBe(side)
    expect(result.current.machineRed).toBe(false)
    expect(result.current.machineBlack).toBe(false)
    expect(result.current.selected).toEqual(point)
    unmount()
  })

  it('enables a side ONLY after the player presses that AI button', () => {
    const { result, unmount } = renderHook(() => useReplayTrial(createGame(), 'red', 'custom-position-trial', true, false, true))
    act(() => result.current.select({ row: 3, col: 0 }))
    expect(result.current.machineBlack).toBe(false)
    expect(result.current.machineRed).toBe(false)
    act(() => result.current.toggleMachineSide('red'))
    expect(result.current.machineRed).toBe(true)
    expect(result.current.machineBlack).toBe(false)
    act(() => result.current.toggleMachineSide('red'))
    expect(result.current.machineRed).toBe(false)
    unmount()
  })

  it('does not change normal replay machine defaults', () => {
    const { result, unmount } = renderHook(() => useReplayTrial(createGame(), 'red', 'ordinary-replay', true, false, false))
    expect(result.current.machineRed).toBe(false)
    expect(result.current.machineBlack).toBe(false)
    unmount()
  })
})