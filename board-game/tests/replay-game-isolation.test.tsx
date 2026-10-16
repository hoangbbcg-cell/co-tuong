// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { useGame } from '../src/features/game/hooks/useGame'
import { useGameStore } from '../src/store/gameStore'
import { useSessionStore } from '../src/store/sessionStore'
import { createGame } from '../src/game/state/initial'
import { roomSocket } from '../src/services/socket'
vi.mock('../src/services/socket', () => ({ socket: { id: 'test' }, roomSocket: { command: vi.fn(), leave: vi.fn() } }))
vi.mock('../src/features/game/hooks/useMoveSound', () => ({ useMoveSound: () => ({ playMatchIntro: vi.fn() }) }))
it('GamePage useGame replay locks all play actions and never ticks the local game or sends room commands', async () => {
  vi.useFakeTimers()
  useSessionStore.setState({ screen: 'game', mode: 'computer', computerEngine: 'pikafish', computerDemo: true, computerDemoQueued: true, lobbyOpen: false })
  useGameStore.getState().reset(0)
  useGameStore.getState().start(0)
  const initialLocal = useGameStore.getState().game
  const energy = useSessionStore.getState().energy
  const recorded = { ...createGame(), phase: 'playing' as const }
  const close = vi.fn()
  const { result, unmount } = renderHook(() => useGame({ game: recorded, moveCount: 1, animation: null, leave: close }))
  expect(result.current.game).toBe(recorded)
  expect(result.current.computer).toBe(false)
  act(() => {
    result.current.select({ row: 6, col: 0 })
    result.current.start(); result.current.reset(); result.current.draw(); result.current.resign()
    result.current.requestTakeback(); result.current.replyTakeback(true); result.current.replyDraw(true)
    result.current.toggleQueue(true)
    vi.advanceTimersByTime(5000)
  })
  expect(useGameStore.getState().game).toBe(initialLocal)
  expect(useSessionStore.getState().energy).toBe(energy)
  expect(roomSocket.command).not.toHaveBeenCalled()
  await act(() => result.current.leave())
  expect(close).toHaveBeenCalledOnce()
  expect(roomSocket.leave).not.toHaveBeenCalled()
  expect(useGameStore.getState().game).toBe(initialLocal)
  unmount(); vi.useRealTimers()
})
