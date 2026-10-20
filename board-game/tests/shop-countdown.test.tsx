// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { dailyShopCountdown, useShopDailyCountdown } from '../src/features/lobby/hooks/useShopDailyCountdown'

afterEach(() => { cleanup(); vi.useRealTimers() })

it('counts to Vietnam midnight and starts the next day automatically', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-10-20T23:59:58+07:00'))
  const hook = renderHook(() => useShopDailyCountdown(true))
  expect(hook.result.current).toBe('00:00:02')
  act(() => vi.advanceTimersByTime(1000))
  expect(hook.result.current).toBe('00:00:01')
  act(() => vi.advanceTimersByTime(1000))
  expect(hook.result.current).toBe('24:00:00')
  act(() => vi.advanceTimersByTime(1000))
  expect(hook.result.current).toBe('23:59:59')
})

it('uses the current date after a suspended tab resumes and clears the timer', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-10-20T10:00:00+07:00'))
  const hook = renderHook(({ enabled }) => useShopDailyCountdown(enabled), { initialProps: { enabled: true } })
  expect(hook.result.current).toBe('14:00:00')
  act(() => {
    vi.setSystemTime(new Date('2026-10-22T12:30:45+07:00'))
    document.dispatchEvent(new Event('visibilitychange'))
  })
  expect(hook.result.current).toBe('11:29:15')
  hook.rerender({ enabled: false })
  expect(hook.result.current).toBe('--:--:--')
  expect(vi.getTimerCount()).toBe(0)
  expect(dailyShopCountdown(Date.parse('2026-10-22T17:00:00Z'))).toBe('24:00:00')
})
