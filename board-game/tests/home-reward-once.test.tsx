// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useHomeRewardNotifications } from '../src/features/lobby/hooks/useHomeRewardNotifications'
import { acknowledgeHomeRewards, observeRewardProfile, pendingHomeRewards } from '../src/store/homeRewardsStore'
import { useSessionStore } from '../src/store/sessionStore'
import { accountApi } from '../src/services/accountApi'
import type { AccountProfile } from '../src/types/account'

afterEach(() => { cleanup(); vi.restoreAllMocks(); useSessionStore.setState({ account: null, screen: 'home' }) })
const profile = (id: string, codes: string[] = []) => ({ id, gold: '0', stats: [], cosmetics: codes.map(code => ({ kind: 'avatar', code })) }) as unknown as AccountProfile

it('marks a displayed batch once, keeps its preview available and never reopens it on returning home or remounting', async () => {
  vi.spyOn(accountApi.request, 'get').mockResolvedValue({ data: [] })
  const account = profile('once')
  useSessionStore.setState({ account, screen: 'home' })
  const first = renderHook(useHomeRewardNotifications)
  act(() => observeRewardProfile(profile('once', ['avatar-16']), false))
  await waitFor(() => expect(first.result.current.visible).toBe(true))
  act(() => first.result.current.markPresented())
  expect(pendingHomeRewards('once')).toEqual([])
  expect(first.result.current.pending.map(item => item.code)).toEqual(['avatar-16'])
  act(() => useSessionStore.setState({ screen: 'rooms' }))
  act(() => useSessionStore.setState({ screen: 'home' }))
  expect(first.result.current.visible).toBe(false)
  first.unmount()
  const next = renderHook(useHomeRewardNotifications)
  expect(next.result.current.visible).toBe(false)
})

it('does not consume unshown rewards away from home and preserves items arriving while a batch is open', async () => {
  vi.spyOn(accountApi.request, 'get').mockResolvedValue({ data: [] })
  useSessionStore.setState({ account: profile('later'), screen: 'rooms' })
  const hook = renderHook(useHomeRewardNotifications)
  act(() => observeRewardProfile(profile('later', ['avatar-16']), false))
  expect(hook.result.current.visible).toBe(false)
  expect(pendingHomeRewards('later')).toHaveLength(1)
  act(() => useSessionStore.setState({ screen: 'home' }))
  await waitFor(() => expect(hook.result.current.visible).toBe(true))
  act(() => hook.result.current.markPresented())
  act(() => observeRewardProfile(profile('later', ['avatar-16', 'avatar-17']), false))
  expect(hook.result.current.pending.map(item => item.code)).toEqual(['avatar-16'])
  act(() => hook.result.current.dismiss())
  await waitFor(() => expect(hook.result.current.pending.map(item => item.code)).toEqual(['avatar-17']))
  act(() => hook.result.current.markPresented())
  act(() => hook.result.current.dismiss())
  expect(hook.result.current.visible).toBe(false)
  acknowledgeHomeRewards('later', [])
})

it('discards the displayed batch when switching to another account with no rewards', async () => {
  vi.spyOn(accountApi.request, 'get').mockResolvedValue({ data: [] })
  useSessionStore.setState({ account: profile('switch-a'), screen: 'home' })
  const hook = renderHook(useHomeRewardNotifications)
  act(() => observeRewardProfile(profile('switch-a', ['avatar-16']), false))
  await waitFor(() => expect(hook.result.current.visible).toBe(true))
  act(() => hook.result.current.markPresented())
  act(() => useSessionStore.setState({ account: profile('switch-b') }))
  expect(hook.result.current.visible).toBe(false)
  act(() => useSessionStore.setState({ account: profile('switch-a') }))
  expect(hook.result.current.visible).toBe(false)
})
