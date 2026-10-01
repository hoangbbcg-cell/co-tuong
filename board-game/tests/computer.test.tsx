// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useComputer } from '../src/features/game/hooks/useComputer'
import { useGameStore } from '../src/store/gameStore'
import { useSessionStore } from '../src/store/sessionStore'
import { pikafishApi } from '../src/services/pikafish'
import type { Move } from '../src/types/game'

beforeEach(() => {
  vi.useFakeTimers()
  window.matchMedia = vi.fn().mockReturnValue({ matches: true })
  useGameStore.getState().reset(performance.now())
  useSessionStore.setState({ screen: 'game', mode: 'computer', computerEngine: 'pikafish', humanSide: 'black' })
})
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks() })
const opening: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }

describe('Pikafish turn lifecycle', () => {
  it('máy đỏ chờ khai cuộc rồi đi, lưu lịch sử và reset xóa lịch sử', async () => {
    const move = vi.spyOn(pikafishApi, 'move').mockResolvedValue(opening)
    renderHook(() => useComputer())
    act(() => useGameStore.getState().start(performance.now()))
    await act(async () => vi.advanceTimersByTimeAsync(1299))
    expect(move).not.toHaveBeenCalled()
    await act(async () => vi.advanceTimersByTimeAsync(2))
    expect(move).toHaveBeenCalledOnce()
    expect(useGameStore.getState().game.currentTurn).toBe('black')
    expect(useGameStore.getState().moves).toEqual(['a3a4'])
    act(() => useGameStore.getState().reset(performance.now()))
    expect(useGameStore.getState().moves).toEqual([])
  })
  it.each(['reset', 'leave', 'finish'] as const)('bỏ phản hồi đến trễ sau %s và hủy request', async action => {
    let resolveMove!: (move: Move) => void
    const move = vi.spyOn(pikafishApi, 'move').mockImplementation(() => new Promise(resolve => { resolveMove = resolve }))
    renderHook(() => useComputer())
    act(() => useGameStore.getState().start(performance.now()))
    await act(async () => vi.advanceTimersByTimeAsync(1301))
    const signal = move.mock.calls[0][2]
    act(() => {
      if (action === 'reset') useGameStore.getState().reset(performance.now())
      if (action === 'leave') useSessionStore.getState().leave()
      if (action === 'finish') useGameStore.getState().finish(false, performance.now(), 'black')
    })
    expect(signal.aborted).toBe(true)
    await act(async () => resolveMove(opening))
    expect(useGameStore.getState().game.board[6][0]?.side).toBe('red')
    expect(useGameStore.getState().moves).toEqual([])
  })
  it('cho thử lại khi engine lỗi', async () => {
    const move = vi.spyOn(pikafishApi, 'move').mockRejectedValueOnce(new Error('Engine lỗi')).mockResolvedValue(opening)
    const { result } = renderHook(() => useComputer())
    act(() => useGameStore.getState().start(performance.now()))
    await act(async () => vi.advanceTimersByTimeAsync(1301))
    expect(result.current.error).toBe('Engine lỗi')
    act(() => result.current.retry())
    await act(async () => vi.advanceTimersByTimeAsync(550))
    expect(move).toHaveBeenCalledTimes(2)
    expect(useGameStore.getState().game.currentTurn).toBe('black')
  })
})
