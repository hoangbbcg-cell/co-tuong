// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useComputer } from '../src/features/game/hooks/useComputer'
import { useComputerSetup } from '../src/features/lobby/hooks/useComputerSetup'
import { useGameStore } from '../src/store/gameStore'
import { useSessionStore } from '../src/store/sessionStore'
import type { Move } from '../src/types/game'

const pikaJieqiMove = vi.hoisted(() => vi.fn())
vi.mock('../src/services/pikaJieqi', () => ({ pikaJieqiMove }))

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers()
  window.matchMedia = vi.fn().mockReturnValue({ matches: true })
  useGameStore.getState().reset(performance.now())
  useSessionStore.setState({ screen: 'home', mode: 'computer', computerEngine: 'basic', computerLevel: 5, humanSide: 'red', computerDemo: false, computerDemoQueued: false, testBotId: undefined, room: null })
})
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks() })

const waitForComputer = async () => {
  const remaining = Math.max(550, useGameStore.getState().game.lastClockUpdate - performance.now())
  await act(async () => vi.advanceTimersByTimeAsync(Math.ceil(remaining) + 2))
}

describe('Cờ Úp đấu với máy', () => {
  it('không có COOP/COEP thì lưu lựa chọn để chuyển sang môi trường AI riêng', async () => {
    const setup = renderHook(() => useComputerSetup())
    act(() => setup.result.current.setVariant('jieqi'))
    await act(async () => setup.result.current.start())
    expect(setup.result.current.message).toBe('')
    const pending = JSON.parse(
      window.sessionStorage.getItem('hovang-jieqi-start-v1') ?? '{}',
    )
    expect(['red', 'black']).toContain(pending.humanSide)
    expect(pending.level).toBeTypeOf('number')
    expect(pending.expires).toBeGreaterThan(Date.now())
    expect(useSessionStore.getState().screen).toBe('home')
    expect(useGameStore.getState().game.variant).toBeFalsy()
  })

  it('Đấu ngay Cờ Úp tạo ván ẩn với engine PikaJieQi', async () => {
    Object.defineProperty(window, 'crossOriginIsolated', { configurable: true, value: true })
    const setup = renderHook(() => useComputerSetup())
    act(() => setup.result.current.setVariant('jieqi'))
    act(() => setup.result.current.setSide('red'))
    await act(async () => setup.result.current.start())
    const session = useSessionStore.getState()
    expect(session.screen).toBe('game')
    expect(session.mode).toBe('computer')
    expect(session.computerEngine).toBe('pikaJieqi')
    expect(session.humanSide).toBe('red')
    expect(setup.result.current.message).toBe('')
    expect(useGameStore.getState().game.variant).toBe('jieqi')
    expect(useGameStore.getState().game.phase).toBe('ready')
  })

  it('máy Cờ Úp đi nước đầu bằng PikaJieQi với depth theo cấp', async () => {
    Object.defineProperty(window, 'crossOriginIsolated', { configurable: true, value: true })
    const move: Move = { from: { row: 6, col: 4 }, to: { row: 5, col: 4 } }
    pikaJieqiMove.mockResolvedValue(move)
    useGameStore.getState().reset(performance.now(), 'jieqi')
    useSessionStore.setState({ screen: 'game', mode: 'computer', computerEngine: 'pikaJieqi', humanSide: 'black' })
    renderHook(() => useComputer())
    act(() => useGameStore.getState().start(performance.now()))
    await waitForComputer()
    expect(pikaJieqiMove).toHaveBeenCalledOnce()
    const [game, signal, depth] = pikaJieqiMove.mock.calls[0]
    expect(game.variant).toBe('jieqi')
    expect(game.currentTurn).toBe('red')
    expect(signal instanceof AbortSignal).toBe(true)
    expect(depth).toBe(5)
    expect(useGameStore.getState().game.currentTurn).toBe('black')
    expect(useGameStore.getState().moves).toEqual(['e3e4'])
  })

  it('lỗi engine Cờ Úp báo lỗi và cho thử lại', async () => {
    Object.defineProperty(window, 'crossOriginIsolated', { configurable: true, value: true })
    const move: Move = { from: { row: 6, col: 4 }, to: { row: 5, col: 4 } }
    pikaJieqiMove.mockRejectedValueOnce(new Error('PikaJieQi timed out')).mockResolvedValue(move)
    useGameStore.getState().reset(performance.now(), 'jieqi')
    useSessionStore.setState({ screen: 'game', mode: 'computer', computerEngine: 'pikaJieqi', humanSide: 'black' })
    const { result } = renderHook(() => useComputer())
    act(() => useGameStore.getState().start(performance.now()))
    await waitForComputer()
    expect(result.current.error).toBe('Cờ Úp Ông Hoàng chưa thể xử lý yêu cầu. Vui lòng thử lại.')
    expect(useGameStore.getState().moves).toEqual([])
    act(() => result.current.retry())
    await waitForComputer()
    expect(pikaJieqiMove).toHaveBeenCalledTimes(2)
    expect(useGameStore.getState().game.currentTurn).toBe('black')
  })

  it('reset giữa ván hủy request Cờ Úp và bỏ phản hồi đến trễ', async () => {
    Object.defineProperty(window, 'crossOriginIsolated', { configurable: true, value: true })
    let resolveMove!: (move: Move) => void
    pikaJieqiMove.mockImplementation(() => new Promise<void>(resolve => { resolveMove = resolve as unknown as (move: Move) => void }))
    useGameStore.getState().reset(performance.now(), 'jieqi')
    useSessionStore.setState({ screen: 'game', mode: 'computer', computerEngine: 'pikaJieqi', humanSide: 'black' })
    renderHook(() => useComputer())
    act(() => useGameStore.getState().start(performance.now()))
    await waitForComputer()
    const signal = pikaJieqiMove.mock.calls[0][1]
    act(() => useGameStore.getState().reset(performance.now(), 'jieqi'))
    expect(signal.aborted).toBe(true)
    await act(async () => resolveMove({ from: { row: 6, col: 4 }, to: { row: 5, col: 4 } }))
    expect(useGameStore.getState().moves).toEqual([])
  })
})
