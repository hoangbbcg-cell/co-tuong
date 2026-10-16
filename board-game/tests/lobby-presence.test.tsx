// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useLobbyPresence } from '../src/features/lobby/hooks/useLobbyPresence'
import { useSessionStore } from '../src/store/sessionStore'

const transport = vi.hoisted(() => ({
  connected: true, emit: vi.fn(), on: vi.fn(), off: vi.fn(),
}))
vi.mock('../src/services/socket', () => ({ socket: transport, connect: vi.fn().mockResolvedValue(undefined) }))
afterEach(() => { vi.clearAllMocks(); useSessionStore.setState({ screen: 'home' }) })

it('moves presence with the selected area without changing the profile address or leaving between selections', () => {
  useSessionStore.setState({ screen: 'rooms', province: 'Home province' })
  const hook = renderHook(({ province }) => useLobbyPresence(province), { initialProps: { province: 'Home province' } })
  expect(transport.emit).toHaveBeenLastCalledWith('lobby:presence', 'Home province')
  transport.emit.mockClear()
  hook.rerender({ province: 'Selected province' })
  expect(transport.emit.mock.calls).toEqual([['lobby:presence', 'Selected province']])
  expect(useSessionStore.getState().province).toBe('Home province')
  const reconnect = transport.on.mock.calls.find(([event]) => event === 'connect')?.[1]
  act(() => reconnect?.())
  expect(transport.emit).toHaveBeenLastCalledWith('lobby:presence', 'Selected province')
  hook.unmount()
  expect(transport.emit).toHaveBeenLastCalledWith('lobby:presence', null)
})
