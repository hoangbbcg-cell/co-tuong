// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useRoomConnection } from '../src/app/useRoomConnection'
import { useSessionStore } from '../src/store/sessionStore'
import { createGame } from '../src/game/state/initial'
import type { RoomSnapshot } from '../src/types/room'

const events = vi.hoisted(() => new Map<string, (...args: unknown[]) => void>())
vi.mock('../src/services/socket', () => ({
  socket: { id: 'a', connected: false, on: (name: string, listener: (...args: unknown[]) => void) => events.set(name, listener), off: (name: string) => events.delete(name) },
  roomSocket: { resume: vi.fn() },
}))
afterEach(() => { cleanup(); useSessionStore.getState().leave(); useSessionStore.getState().dismissEnergyNotice(); events.clear() })

it('returns Home and opens the energy dialog without a kicked notice', () => {
  const room: RoomSnapshot = { id: 'energy-room', name: 'Energy', players: [], viewers: [], game: createGame(), messages: [], drawOffer: null }
  useSessionStore.setState({ mode: 'online', screen: 'game', room, account: null })
  const client = new QueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>
  renderHook(() => useRoomConnection(), { wrapper })
  act(() => events.get('room:removed')?.(room.id, 'energy'))
  expect(useSessionStore.getState()).toMatchObject({ screen: 'home', room: null, notice: '', energyNoticeOpen: true })
  act(() => useSessionStore.getState().receiveRoom(room))
  expect(useSessionStore.getState().room).toBeNull()
  client.clear()
})
