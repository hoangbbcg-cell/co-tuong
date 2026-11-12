import { describe, expect, it } from 'vitest'
import { rankHomeQuickPlayRooms } from '../src/lib/quickRoom'
import type { RoomSummary } from '../src/types/room'

const room = (id: string, props: Partial<RoomSummary> = {}): RoomSummary => ({
  id, name: id, players: 1, phase: 'ready', variant: 'xiangqi',
  province: 'Hà Nội', locked: false, passwordRequired: false, ...props,
})

describe('Home quick-play room priority', () => {
  it('prioritizes public one-person same province, then other provinces, then passwordless locked', () => {
    const rooms = [
      room('locked', { locked: true, passwordRequired: false }),
      room('other', { province: 'Đà Nẵng' }),
      room('same'),
    ]
    expect(rankHomeQuickPlayRooms(rooms, 'xiangqi', 'Hà Nội', () => 0).map(r => r.id))
      .toEqual(['same', 'other', 'locked'])
  })
  it('excludes password-protected, ambiguous lock, full, playing and wrong-variant rooms', () => {
    const rooms = [
      room('protected', { locked: true, passwordRequired: true }),
      room('ambiguous', { locked: true, passwordRequired: undefined }),
      room('full', { players: 2 }),
      room('playing', { phase: 'playing' }),
      room('jieqi', { variant: 'jieqi' }),
      room('valid', { locked: true, passwordRequired: false }),
    ]
    expect(rankHomeQuickPlayRooms(rooms, 'xiangqi', 'Hà Nội').map(r => r.id)).toEqual(['valid'])
  })
  it('uses public rooms across provinces if no province is selected', () => {
    const rooms = [room('locked', { locked: true, passwordRequired: false }), room('public', { province: 'Cần Thơ' })]
    expect(rankHomeQuickPlayRooms(rooms, 'xiangqi', undefined, () => 0).map(r => r.id)).toEqual(['public', 'locked'])
  })
  it('keeps the variant separate and returns empty when no eligible room exists', () => {
    expect(rankHomeQuickPlayRooms([room('xiangqi')], 'jieqi')).toEqual([])
    expect(rankHomeQuickPlayRooms([room('up', { variant: 'jieqi' })], 'jieqi').map(r => r.id)).toEqual(['up'])
  })
})