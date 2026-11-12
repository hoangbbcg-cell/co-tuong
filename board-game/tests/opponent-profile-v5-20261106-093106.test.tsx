// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { useDatabaseProfile } from '../src/features/lobby/hooks/useDatabaseProfile'

const fetchProfile = vi.hoisted(() => vi.fn())

vi.mock('../src/services/accountApi', () => ({
  accountApi: {
    search: vi.fn(),
    request: { get: fetchProfile },
  },
}))

vi.mock('../src/store/sessionStore', () => ({
  useSessionStore: (selector: (state: {
    account: { id: string }
  }) => unknown) => selector({ account: { id: 'desktop-test-account' } }),
}))

afterEach(() => {
  cleanup()
  fetchProfile.mockReset()
})

it('reuses the last loaded desktop opponent profile after remount', async () => {
  const profile = {
    id: 'desktop-opponent-v5',
    displayName: 'Opponent',
    avatarCode: 'avatar-3',
    avatarFrameCode: 'frame-2',
    stats: [{ variant: 'xiangqi', elo: 1500 }],
  }

  fetchProfile.mockResolvedValue({ data: profile })

  const first = renderHook(() =>
    useDatabaseProfile('Opponent', false, 'desktop-opponent-v5', true),
  )

  await waitFor(() => {
    expect(first.result.current?.avatarCode).toBe('avatar-3')
  })

  first.unmount()

  const second = renderHook(() =>
    useDatabaseProfile('Opponent', false, 'desktop-opponent-v5', true),
  )

  expect(second.result.current?.avatarCode).toBe('avatar-3')
  expect(second.result.current?.avatarFrameCode).toBe('frame-2')

  second.unmount()
})

it('does not reuse another opponent profile for a new identity', async () => {
  const view = renderHook(({ id }) =>
    useDatabaseProfile('Opponent', false, id, true),
    { initialProps: { id: 'desktop-opponent-v5' } },
  )

  view.rerender({ id: 'a-different-desktop-opponent-v5' })

  expect(view.result.current?.avatarCode).not.toBe('avatar-3')
})