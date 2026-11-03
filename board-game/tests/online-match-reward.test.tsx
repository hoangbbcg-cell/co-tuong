// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({ reward: vi.fn(), me: vi.fn(), apply: vi.fn() }))
vi.mock('../src/services/accountApi', () => ({ accountApi: { matchReward: mocks.reward, me: mocks.me } }))
vi.mock('../src/services/accountSession', () => ({ applyAccount: mocks.apply }))
vi.mock('../src/store/sessionStore', () => ({ useSessionStore: Object.assign((select: (state: { account: { id: string } }) => unknown) => select({ account: { id: 'user' } }), { getState: () => ({ account: { id: 'user' } }) }) }))
import { useOnlineMatchReward } from '../src/features/game/hooks/useOnlineMatchReward'
afterEach(() => { cleanup(); vi.useRealTimers(); vi.resetAllMocks() })
it('waits for the committed reward, then refreshes the account', async () => {
  vi.useFakeTimers()
  mocks.reward.mockResolvedValueOnce({ settled: false, gold: 0, eloDelta: 0 }).mockResolvedValue({ settled: true, gold: 139, eloDelta: 13 })
  mocks.me.mockResolvedValue({ id: 'user', gold: '139' })
  const view = renderHook(() => useOnlineMatchReward('match', true))
  await act(async () => {})
  expect(view.result.current).toBeNull()
  await act(async () => { await vi.advanceTimersByTimeAsync(1000) })
  expect(view.result.current).toEqual({ matchId: 'match', gold: 139, eloDelta: 13 })
  expect(mocks.apply).toHaveBeenCalledWith({ id: 'user', gold: '139' })
})
it('does not show the previous reward after changing matches', async () => {
  mocks.reward.mockResolvedValue({ settled: true, gold: 0, eloDelta: 13 })
  mocks.me.mockResolvedValue({ id: 'user' })
  const view = renderHook(({ id }) => useOnlineMatchReward(id, true), { initialProps: { id: 'first' } })
  await act(async () => {})
  expect(view.result.current?.gold).toBe(0)
  mocks.reward.mockReturnValue(new Promise(() => {}))
  view.rerender({ id: 'next' })
  expect(view.result.current).toBeNull()
})
