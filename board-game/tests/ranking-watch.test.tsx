// @vitest-environment jsdom
import { createRef, type ReactNode } from 'react'
import { act, cleanup, renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, expect, it, vi } from 'vitest'
import { useRankingWatch } from '../src/features/lobby/hooks/useRankingWatch'
import { roomApi } from '../src/services/api'
import { roomSocket } from '../src/services/socket'
import { useSessionStore } from '../src/store/sessionStore'
import { createGame } from '../src/game/state/initial'
import type { RoomSnapshot, RoomSummary } from '../src/types/room'

afterEach(() => { cleanup(); vi.restoreAllMocks(); useSessionStore.setState({ mode: 'local', room: null }) })
const playing: RoomSummary = { id: 'real', name: 'Bàn thật', phase: 'playing', players: 2, playerNames: ['ShopCoTuong', 'Đối thủ'] }
function mount(rooms: RoomSummary[]) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })
  client.setQueryData(['rooms'], rooms)
  const ref = createRef<HTMLDialogElement>()
  const closed = vi.fn()
  return { ...renderHook(() => useRankingWatch(ref, closed, 'xiangqi'), { wrapper: ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider> }), closed }
}
const snapshot: RoomSnapshot = { id: 'real', name: 'Bàn thật', players: [], viewers: [{ id: 'me', name: 'Tôi', queued: false }], game: { ...createGame(0), phase: 'playing' }, messages: [], drawOffer: null }

it('chỉ tìm người đang đấu và vào phòng thật với vai trò khán giả', async () => {
  vi.spyOn(roomApi, 'list').mockResolvedValue([playing])
  const join = vi.spyOn(roomSocket, 'join').mockResolvedValue(snapshot)
  useSessionStore.setState({ name: 'Tôi' })
  const { result, closed } = mount([playing, { ...playing, id: 'idle', phase: 'ready', playerNames: ['NgocLinhAnh'] }])
  expect(result.current.matchFor('NgocLinhAnh')).toBeUndefined()
  await act(async () => { result.current.watch('ShopCoTuong'); await new Promise(resolve => setTimeout(resolve, 15)) })
  expect(join).toHaveBeenCalledWith('real', 'Tôi', undefined, true)
  expect(closed).toHaveBeenCalled()
  expect(useSessionStore.getState().room).toBe(snapshot)
})
it('kiểm tra lại phòng lúc bấm, không vào khi ván vừa kết thúc', async () => {
  vi.spyOn(roomApi, 'list').mockResolvedValue([{ ...playing, phase: 'finished' }])
  const join = vi.spyOn(roomSocket, 'join')
  const { result } = mount([playing])
  await act(async () => { result.current.watch('ShopCoTuong'); await new Promise(resolve => setTimeout(resolve, 15)) })
  expect(join).not.toHaveBeenCalled()
  expect(result.current.error).toContain('không còn đang đấu')
})
it('vào xem bàn khóa vẫn phải nhập mật khẩu và giữ vai trò khán giả', async () => {
  vi.spyOn(roomApi, 'list').mockResolvedValue([{ ...playing, locked: true }])
  const join = vi.spyOn(roomSocket, 'join').mockResolvedValue(snapshot)
  useSessionStore.setState({ name: 'Tôi' })
  const { result } = mount([{ ...playing, locked: true }])
  act(() => result.current.watch('ShopCoTuong'))
  expect(result.current.passwordControls.passwordRoom?.id).toBe('real')
  expect(join).not.toHaveBeenCalled()
  await act(async () => { result.current.passwordControls.join('real', 'abc123'); await new Promise(resolve => setTimeout(resolve, 15)) })
  expect(join).toHaveBeenCalledWith('real', 'Tôi', 'abc123', true)
})
