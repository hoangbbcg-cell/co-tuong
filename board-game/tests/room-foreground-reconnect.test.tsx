// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { beforeEach, expect, it, vi } from 'vitest'
import { useRoomConnection } from '../src/app/useRoomConnection'

const mocks = vi.hoisted(() => ({
  connect: vi.fn(async () => {}), resume: vi.fn(async () => null),
  state: { account: {}, mode: 'online', room: null },
  invalidateQueries: vi.fn(),
}))
vi.mock('../src/services/socket', () => ({
  connect: mocks.connect, roomSocket: { resume: mocks.resume },
  socket: { connected: true, on: vi.fn(), off: vi.fn() },
}))
vi.mock('@tanstack/react-query', () => ({ useQueryClient: () => ({ invalidateQueries: mocks.invalidateQueries }) }))
vi.mock('../src/store/sessionStore', () => ({
  useSessionStore: Object.assign((select: (state: typeof mocks.state) => unknown) => select(mocks.state), { getState: () => mocks.state }),
}))

beforeEach(() => { vi.clearAllMocks(); mocks.state.mode = 'online' })

it.each(['focus', 'online', 'visibilitychange'])('reconnects and resyncs on %s and removes listeners on unmount', async event => {
  const hook = renderHook(() => useRoomConnection())
  await act(async () => {})
  vi.clearAllMocks()
  const target = event === 'visibilitychange' ? document : window
  await act(async () => { target.dispatchEvent(new Event(event)) })
  expect(mocks.connect).toHaveBeenCalledTimes(1)
  expect(mocks.resume).toHaveBeenCalledTimes(1)
  hook.unmount()
  vi.clearAllMocks()
  target.dispatchEvent(new Event(event))
  expect(mocks.connect).not.toHaveBeenCalled()
})

it('does not reconnect for a foreground event outside an online room', async () => {
  const hook = renderHook(() => useRoomConnection())
  await act(async () => {})
  vi.clearAllMocks()
  mocks.state.mode = 'local'
  await act(async () => { window.dispatchEvent(new Event('focus')) })
  expect(mocks.connect).not.toHaveBeenCalled()
  hook.unmount()
})
