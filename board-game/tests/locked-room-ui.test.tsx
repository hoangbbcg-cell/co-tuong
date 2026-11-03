// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useRoomSelection } from '../src/features/lobby/hooks/useRoomSelection'
import { RoomPasswordDialog } from '../src/features/lobby/components/RoomPasswordDialog'
import { useSessionStore } from '../src/store/sessionStore'
import type { useLobby } from '../src/features/lobby/hooks/useLobby'
vi.mock('../src/features/lobby/hooks/useLobbyPresence', () => ({ useLobbyPresence: () => ({ provinceCounts: {}, players: 0 }) }))
afterEach(cleanup)

it('lọc Bàn khóa chỉ còn phòng khóa trong khu vực hiện tại', () => {
  useSessionStore.setState({countryCode: 'VN'})
  const lobby = { province: 'Hà Nội', rooms: [
    { id: 'locked', province: 'Hà Nội', locked: true, players: 1, phase: 'ready' },
    { id: 'open', province: 'Hà Nội', locked: false, players: 1, phase: 'ready' },
    { id: 'other', province: 'Huế', locked: true, players: 1, phase: 'ready' },
  ] } as ReturnType<typeof useLobby>
  const { result } = renderHook(() => useRoomSelection(lobby))
  act(() => result.current.setAllProvinces(false))
  act(() => result.current.setRoomFilter('locked'))
  expect(result.current.rooms.map(room => room.id)).toEqual(['locked'])
  act(() => result.current.setRoomFilter('all'))
  expect(result.current.rooms.map(room => room.id)).toEqual(['locked', 'open'])
})
it('bảng mật khẩu gửi đúng bàn/mật khẩu và giữ lỗi để nhập lại', () => {
  const join = vi.fn()
  const lobby = { passwordRoom: { id: 'locked' }, pending: false, passwordError: 'Mật khẩu bàn không đúng.', join, dismissPasswordRoom: vi.fn() } as unknown as ReturnType<typeof useLobby>
  render(<RoomPasswordDialog lobby={lobby}/>)
  fireEvent.change(screen.getByLabelText('Mật khẩu bàn'), { target: { value: '123abc' } })
  fireEvent.submit(screen.getByRole('dialog', { name: 'Nhập mật khẩu bàn' }))
  expect(join).toHaveBeenCalledWith('locked', '123abc')
  expect(screen.getByRole('alert').textContent).toContain('Mật khẩu bàn không đúng.')
})

it('foreign profile creates in All until a province is explicitly selected', () => {
  useSessionStore.setState({countryCode:'CN',province:'Hà Nội'})
  const lobby={province:'Hà Nội',rooms:[]} as unknown as ReturnType<typeof useLobby>
  const {result}=renderHook(()=>useRoomSelection(lobby))
  expect(result.current.allProvinces).toBe(true)
  expect(result.current.province).toBe('')
  expect(result.current.creationProvince).toBe('')
  act(()=>{result.current.setProvince('Huế');result.current.setAllProvinces(false)})
  expect(result.current.creationProvince).toBe('Huế')
  act(()=>result.current.setAllProvinces(true))
  expect(result.current.creationProvince).toBe('')
  expect(useSessionStore.getState().province).toBe('Hà Nội')
})
