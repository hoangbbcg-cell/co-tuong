// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useDelayedResultReady } from '../src/features/game/hooks/useDelayedResultReady'
import { useResultPresentationAck } from '../src/features/game/hooks/useResultPresentationAck'
import { roomSocket } from '../src/services/socket'
import type { RoomSnapshot } from '../src/types/room'
import { createGame } from '../src/game/state/initial'

vi.mock('../src/services/socket', () => ({ roomSocket: { command: vi.fn().mockResolvedValue({}) } }))
afterEach(() => { cleanup(); vi.useRealTimers(); vi.clearAllMocks() })
it('snapshot cùng ván không làm nút Ready biến mất hoặc khởi động lại bộ đếm', () => {
  vi.useFakeTimers()
  const hook = renderHook(({ key }) => useDelayedResultReady(key), { initialProps: { key: 'room:match' as string | null } })
  act(() => vi.advanceTimersByTime(1500))
  hook.rerender({ key: 'room:match' })
  act(() => vi.advanceTimersByTime(500))
  expect(hook.result.current).toBe(true)
  hook.rerender({ key: 'room:match' })
  expect(hook.result.current).toBe(true)
  hook.rerender({ key: null })
  expect(hook.result.current).toBe(false)
})
it('chỉ gửi xác nhận sau gate hiệu ứng, không gửi từ viewer và không lặp theo snapshot', async () => {
  const room = { id: 'room', game: { ...createGame(0), phase: 'finished' }, lastCompletedMatch: { id: 'match' } } as RoomSnapshot
  const hook = renderHook(({ ready, player }) => useResultPresentationAck(room, player, ready), { initialProps: { ready: false, player: 'a' as string | undefined } })
  expect(roomSocket.command).not.toHaveBeenCalled()
  hook.rerender({ ready: true, player: undefined })
  expect(roomSocket.command).not.toHaveBeenCalled()
  await act(async () => { hook.rerender({ ready: true, player: 'a' }) })
  expect(roomSocket.command).toHaveBeenCalledWith({ type: 'result-presentation-complete', matchId: 'match' })
  hook.rerender({ ready: true, player: 'a' })
  expect(roomSocket.command).toHaveBeenCalledTimes(1)
})
