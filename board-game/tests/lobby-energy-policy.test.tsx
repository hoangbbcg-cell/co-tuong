// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { useLobby } from '../src/features/lobby/hooks/useLobby'
import { useRoomSelection } from '../src/features/lobby/hooks/useRoomSelection'
import { useHome } from '../src/features/lobby/hooks/useHome'
import { useRoomConnection } from '../src/app/useRoomConnection'
import { useSessionStore } from '../src/store/sessionStore'
import { roomApi } from '../src/services/api'
import { roomSocket, socket } from '../src/services/socket'
import { createGame } from '../src/game/state/initial'
import type { RoomSnapshot } from '../src/types/room'

vi.mock('../src/features/lobby/hooks/useLobbyPresence', () => ({ useLobbyPresence: () => ({ players: 0, provinceCounts: {}, province: '' }) }))
let client: QueryClient
beforeEach(() => {
  client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })
  useSessionStore.setState({ account: null, name: 'PlayerZero', energy: 0, energyRecoveryAt: Date.now() + 420000, energyNoticeOpen: false, screen: 'home', mode: 'local', lobbyOpen: false, room: null, countryCode: 'VN', notice: '' })
})
afterEach(() => { cleanup(); client.clear(); vi.restoreAllMocks() })
const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>
const snapshot: RoomSnapshot = { id: 'room', code: '123456', name: 'Bàn', players: [], viewers: [{ id: 'zero', name: 'PlayerZero', queued: false }], game: createGame(), messages: [], drawOffer: null }

it('allows entering a ready room by number with zero energy', async () => {
  vi.spyOn(roomApi, 'list').mockResolvedValue([{ id: 'room', code: '123456', name: 'Bàn', players: 0, phase: 'ready' }])
  const join = vi.spyOn(roomSocket, 'join').mockResolvedValue(snapshot)
  const hook = renderHook(useLobby, { wrapper })
  act(() => hook.result.current.joinByCode('123456'))
  await waitFor(() => expect(useSessionStore.getState().mode).toBe('online'))
  expect(join).toHaveBeenCalledWith('room', 'PlayerZero', undefined)
  expect(useSessionStore.getState().energyNoticeOpen).toBe(false)
})

it('blocks both opening and submitting Create room with zero energy', () => {
  const create = vi.spyOn(roomApi, 'create')
  const hook = renderHook(() => { const lobby = useLobby(); return { lobby, selection: useRoomSelection(lobby) } }, { wrapper })
  act(() => hook.result.current.selection.setCreating(true))
  expect(hook.result.current.selection.creating).toBe(false)
  expect(useSessionStore.getState().energyNoticeOpen).toBe(true)
  act(() => hook.result.current.lobby.create(10, 60))
  expect(create).not.toHaveBeenCalled()
})

it('blocks the two Home matchmaking entries while allowing rooms and computer setup', () => {
  const create = vi.spyOn(roomApi, 'create')
  const join = vi.spyOn(roomSocket, 'join')
  const hook = renderHook(useHome, { wrapper })
  act(() => hook.result.current.quickPlay())
  expect(useSessionStore.getState().energyNoticeOpen).toBe(true)
  act(() => useSessionStore.getState().dismissEnergyNotice())
  act(() => hook.result.current.playHidden())
  expect(useSessionStore.getState().energyNoticeOpen).toBe(true)
  act(() => hook.result.current.openComputer())
  expect(useSessionStore.getState().screen).toBe('computer')
  act(() => hook.result.current.openRooms())
  expect(useSessionStore.getState().screen).toBe('rooms')
  expect(create).not.toHaveBeenCalled()
  expect(join).not.toHaveBeenCalled()
})

it('shows the energy dialog for a server energy-demotion notice', () => {
  renderHook(useRoomConnection, { wrapper })
  act(() => { for (const listener of socket.listeners('room:notice')) listener('Không đủ năng lượng.') })
  expect(useSessionStore.getState().energyNoticeOpen).toBe(true)
})
