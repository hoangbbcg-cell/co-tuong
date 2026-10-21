// @vitest-environment jsdom
import { cleanup, fireEvent, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useProfileLayout } from '../src/features/lobby/hooks/useProfileLayout'
import { useFriendsLayout } from '../src/features/lobby/hooks/useFriendsLayout'
import { useRankingLayout } from '../src/features/lobby/hooks/useRankingLayout'
import { useHistoryLayout } from '../src/features/lobby/hooks/useHistoryLayout'

afterEach(() => { cleanup(); vi.unstubAllGlobals() })
const useLayouts = () => ({ profile: useProfileLayout(), friends: useFriendsLayout(), ranking: useRankingLayout(), history: useHistoryLayout() })

it('extends portrait phone dialogs without changing their content scale and follows resizing', () => {
  vi.stubGlobal('visualViewport', undefined)
  vi.stubGlobal('innerWidth', 390)
  vi.stubGlobal('innerHeight', 844)
  const hook = renderHook(useLayouts)
  for (const layout of Object.values(hook.result.current)) {
    expect(layout.height * layout.scale).toBeCloseTo(844 * 0.82)
    expect(layout.width * layout.scale).toBeCloseTo(370)
  }
  expect(hook.result.current.profile.scale).toBeCloseTo(370 / 740)
  expect(hook.result.current.profile.avatarScale).toBeCloseTo(hook.result.current.profile.scale)
  expect(hook.result.current.profile.avatarWidth).toBe(hook.result.current.profile.width)
  expect(hook.result.current.profile.avatarHeight).toBeCloseTo(hook.result.current.profile.height)
  expect(hook.result.current.friends.scale).toBeCloseTo(370 / 1120)
  vi.stubGlobal('innerHeight', 550)
  fireEvent(window, new Event('resize'))
  for (const layout of Object.values(hook.result.current)) {
    expect(layout.height * layout.scale).toBeLessThanOrEqual(550 - 48)
  }
})

it('preserves the existing desktop dialog sizes', () => {
  vi.stubGlobal('visualViewport', undefined)
  vi.stubGlobal('innerWidth', 1440)
  vi.stubGlobal('innerHeight', 900)
  const hook = renderHook(useLayouts)
  expect(hook.result.current.profile.height).toBe(850)
  expect(hook.result.current.profile.avatarWidth).toBe(980)
  expect(hook.result.current.profile.avatarHeight).toBe(780)
  expect(hook.result.current.profile.avatarScale).toBe(0.85)
  expect(hook.result.current.friends.height).toBe(750)
  expect(hook.result.current.ranking.height).toBe(750)
  expect(hook.result.current.history.height).toBe(750)
  for (const layout of Object.values(hook.result.current)) expect(layout.scale).toBe(0.85)
})
