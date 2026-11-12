import { MATCH_INTRO_MS } from '../src/game/moves/actions'
// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useComputer } from '../src/features/game/hooks/useComputer'
import { useGameStore } from '../src/store/gameStore'
import { useSessionStore } from '../src/store/sessionStore'
import { fairyStockfishApi } from '../src/services/fairyStockfish'
import type { Move } from '../src/types/game'
import { useComputerSetup } from '../src/features/lobby/hooks/useComputerSetup'
import { useGame } from '../src/features/game/hooks/useGame'

const gameSound = vi.hoisted(() => ({ playMatchIntro: vi.fn() }))
vi.mock('../src/features/game/hooks/useMoveSound', () => ({ useMoveSound: () => gameSound }))

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers()
  window.matchMedia = vi.fn().mockReturnValue({ matches: true })
  useGameStore.getState().reset(performance.now())
  useSessionStore.setState({ screen: 'game', mode: 'computer', computerEngine: 'fairy', computerLevel: 5, humanSide: 'black', computerDemo: false, computerDemoQueued: false, testBotId: undefined })
})
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks() })
it('setup hides native connection details behind the Ông Hoàng message', async () => {
  useSessionStore.setState({ screen: 'computer', computerLevel: 7 })
  vi.spyOn(fairyStockfishApi, 'ready').mockRejectedValue(new Error('Fairy-Stockfish missing NNUE C:/private/engine'))
  const { result } = renderHook(() => useComputerSetup())
  await act(async () => result.current.start())
  expect(result.current.message).toBe('Ông Hoàng chưa thể xử lý yêu cầu. Vui lòng thử lại.')
  expect(useSessionStore.getState().screen).toBe('computer')
})
const waitForComputer = async () => {
  const remaining = Math.max(550, useGameStore.getState().game.lastClockUpdate - performance.now())
  await act(async () => vi.advanceTimersByTimeAsync(Math.ceil(remaining) + 2))
}
const opening: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }

describe('Fairy-Stockfish turn lifecycle', () => {
  it('tự bắt đầu ván Fairy khi vào bàn, giữ delay khai cuộc và chưa tìm nước sớm', () => {
    const move = vi.spyOn(fairyStockfishApi, 'move').mockResolvedValue(opening)
    const now = performance.now()
    const { result } = renderHook(() => useGame())
    expect(result.current.game.phase).toBe('playing')
    expect(result.current.game.lastClockUpdate).toBeGreaterThanOrEqual(now + MATCH_INTRO_MS)
    expect(gameSound.playMatchIntro).toHaveBeenCalledWith(true)
    expect(move).not.toHaveBeenCalled()
  })
  it('routes persisted Pikafish engine data through Fairy-Stockfish', async () => {
    useSessionStore.setState({ computerEngine: 'pikafish' })
    const move = vi.spyOn(fairyStockfishApi, 'move').mockResolvedValue(opening)
    renderHook(() => useComputer())
    act(() => useGameStore.getState().start(performance.now()))
    await waitForComputer()
    expect(move).toHaveBeenCalledOnce()
    expect(useGameStore.getState().game.currentTurn).toBe('black')
  })
  it('giữ cấp đã chọn khi mở lại thiết lập trong cùng phiên', () => {
    const first = renderHook(() => useComputerSetup())
    act(() => first.result.current.setLevel(8))
    expect(useSessionStore.getState().computerLevel).toBe(8)
    first.unmount()
    const second = renderHook(() => useComputerSetup())
    expect(second.result.current.level).toBe(8)
    act(() => second.result.current.setLevel(11))
    expect(second.result.current.level).toBe(8)
  })
  it('máy đỏ chờ khai cuộc rồi đi, lưu lịch sử và reset xóa lịch sử', async () => {
    const move = vi.spyOn(fairyStockfishApi, 'move').mockResolvedValue(opening)
    renderHook(() => useComputer())
    act(() => useGameStore.getState().start(performance.now()))
    await act(async () => vi.advanceTimersByTimeAsync(Math.max(0, Math.ceil(Math.max(550, useGameStore.getState().game.lastClockUpdate - performance.now())) - 1)))
    expect(move).not.toHaveBeenCalled()
    await act(async () => vi.advanceTimersByTimeAsync(2))
    expect(move).toHaveBeenCalledOnce()
    expect(move.mock.calls[0][2]).toBe(5)
    expect(useGameStore.getState().game.currentTurn).toBe('black')
    expect(useGameStore.getState().moves).toEqual(['a3a4'])
    act(() => useGameStore.getState().reset(performance.now()))
    expect(useGameStore.getState().moves).toEqual([])
  })
  it.each(['reset', 'leave', 'finish'] as const)('bỏ phản hồi đến trễ sau %s và hủy request', async action => {
    let resolveMove!: (move: Move) => void
    const move = vi.spyOn(fairyStockfishApi, 'move').mockImplementation(() => new Promise(resolve => { resolveMove = resolve }))
    renderHook(() => useComputer())
    act(() => useGameStore.getState().start(performance.now()))
    await waitForComputer()
    const signal = move.mock.calls[0][3]
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
    const move = vi.spyOn(fairyStockfishApi, 'move').mockRejectedValueOnce(new Error('Fairy-Stockfish failed at C:/engines/fairy-stockfish')).mockResolvedValue(opening)
    const { result } = renderHook(() => useComputer())
    act(() => useGameStore.getState().start(performance.now()))
    await waitForComputer()
    expect(result.current.error).toBe('Ông Hoàng chưa thể xử lý yêu cầu. Vui lòng thử lại.')
    act(() => result.current.retry())
    await act(async () => vi.advanceTimersByTimeAsync(550))
    expect(move).toHaveBeenCalledTimes(2)
    expect(useGameStore.getState().game.currentTurn).toBe('black')
  })
})

it.each(['fairy', 'pikafish', 'pikaJieqi'] as const)('starts consecutive finished %s matches from Ready', engine => {
  useSessionStore.setState({ computerEngine: engine, humanSide: 'red' })
  const { result } = renderHook(() => useGame())
  for (let round = 0; round < 3; round++) {
    act(() => useGameStore.getState().finish(false, performance.now(), 'red'))
    expect(result.current.game.phase).toBe('finished')
    act(() => result.current.start())
    expect(result.current.game.phase).toBe('playing')
    expect(result.current.game.result).toBeNull()
    expect(useGameStore.getState().history).toEqual([])
    expect(useGameStore.getState().animation).toBeNull()
  }
})
