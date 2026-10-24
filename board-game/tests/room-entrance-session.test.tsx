// @vitest-environment jsdom
import { cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useRoomEntrance } from '../src/features/game/hooks/useRoomEntrance'

afterEach(() => { cleanup(); vi.unstubAllGlobals() })

it('skips the opening cover on a replacement seat session but retains it on a fresh entry', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  const complete = vi.fn()
  const replacement = renderHook(() => useRoomEntrance(complete, 'cover-transform', false))
  expect(replacement.result.current.entering).toBe(false)
  expect(complete).toHaveBeenCalledTimes(1)
  replacement.unmount()
  const fresh = renderHook(() => useRoomEntrance(undefined, 'cover-transform'))
  expect(fresh.result.current.entering).toBe(true)
})
