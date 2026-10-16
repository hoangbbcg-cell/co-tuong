import { describe, expect, it } from 'vitest'
import { randomAvailableRoom } from '../src/lib/quickRoom'
import type { RoomSummary } from '../src/types/room'

describe('randomAvailableRoom', () => {
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
