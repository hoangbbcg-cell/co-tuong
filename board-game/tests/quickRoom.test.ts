import { describe, expect, it } from 'vitest'
import { randomAvailableRoom } from '../src/lib/quickRoom'
import type { RoomSummary } from '../src/types/room'

describe('randomAvailableRoom', () => {
  it('Chọn Bàn ưu tiên tỉnh đang chọn, cho bàn khóa không mật khẩu và luôn bỏ bàn có mật khẩu', () => {
    const rooms: RoomSummary[] = [
      { id: 'other', name: '', players: 1, phase: 'ready', province: 'Hà Nội' },
      { id: 'protected', name: '', players: 1, phase: 'ready', province: 'Thành phố Hồ Chí Minh', locked: true, passwordRequired: true },
      { id: 'legacy-locked', name: '', players: 1, phase: 'ready', province: 'Thành phố Hồ Chí Minh', locked: true },
      { id: 'local-open', name: '', players: 1, phase: 'ready', province: 'Thành phố Hồ Chí Minh' },
      { id: 'local-locked-free', name: '', players: 1, phase: 'ready', province: 'TP. Hồ Chí Minh', locked: true, passwordRequired: false },
    ]
    const options = { province: 'Thành phố Hồ Chí Minh', allowPasswordlessLocked: true }
    expect(randomAvailableRoom(rooms, () => 0, 'xiangqi', false, options)?.id).toBe('local-open')
    expect(randomAvailableRoom(rooms, () => 0.99, 'xiangqi', false, options)?.id).toBe('local-locked-free')
    expect(randomAvailableRoom(rooms.slice(0, 3), () => 0, 'xiangqi', false, options)?.id).toBe('other')
    expect(randomAvailableRoom(rooms.slice(1, 3), () => 0, 'xiangqi', false, options)).toBeUndefined()
    expect(randomAvailableRoom(rooms.slice(4))).toBeUndefined()
  })

  it('only selects available rooms matching the chosen duration, or returns no room', () => {
    const rooms: RoomSummary[] = [
      { id: 'other-time', name: '', players: 1, phase: 'ready', minutes: 5 },
      { id: 'full', name: '', players: 2, phase: 'ready', minutes: 10 },
      { id: 'playing', name: '', players: 1, phase: 'playing', minutes: 10 },
      { id: 'empty-with-viewers', name: '', players: 0, viewerCount: 3, phase: 'ready', minutes: 10 },
      { id: 'matching', name: '', players: 1, viewerCount: 5, phase: 'ready', minutes: 10 },
    ]
    const matching = rooms.filter(room => (room.minutes ?? 10) === 10)
    expect(randomAvailableRoom(matching)?.id).toBe('matching')
    expect(randomAvailableRoom(matching.filter(room => room.id !== 'matching'))).toBeUndefined()
  })

  it('selects across provinces and times, excluding full and playing rooms', () => {
    const rooms: RoomSummary[] = [
      { id: 'full', name: '', players: 2, phase: 'ready' },
      { id: 'playing', name: '', players: 1, phase: 'playing' },
      { id: 'hcm', name: '', players: 1, phase: 'ready', province: 'Thành phố Hồ Chí Minh', minutes: 3 },
      { id: 'hanoi', name: '', players: 1, phase: 'ready', province: 'Thành phố Hà Nội', minutes: 30 },
    ]
    expect(randomAvailableRoom(rooms, () => 0)?.id).toBe('hcm')
    expect(randomAvailableRoom(rooms, () => 0.99)?.id).toBe('hanoi')
    expect(randomAvailableRoom(rooms.slice(0, 2))).toBeUndefined()
  })
})
