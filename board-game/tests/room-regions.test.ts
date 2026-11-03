import { expect, it } from 'vitest'
import type { RoomSummary } from '../src/types/room'
import { preferVietnamRooms, roomRegionActivity, sortRoomProvinces } from '../src/lib/roomRegions'
import { randomAvailableRoom } from '../src/lib/quickRoom'

const room = (id: string, province: string, players = 1): RoomSummary => ({ id, name: id, province, players, phase: 'ready' })

it('chưa có địa chỉ ưu tiên bàn Việt Nam, chỉ ghép nước khác khi hết bàn Việt Nam đủ điều kiện', () => {
  const abroad = room('foreign', 'Trung Quốc')
  const vietnam = room('vn', 'Thành phố Hồ Chí Minh')
  expect(randomAvailableRoom([abroad, vietnam], () => 0, 'xiangqi', true)?.id).toBe('vn')
  expect(randomAvailableRoom([abroad, { ...vietnam, players: 2 }], () => 0, 'xiangqi', true)?.id).toBe('foreign')
  expect(randomAvailableRoom([abroad, { ...vietnam, locked: true }], () => 0, 'xiangqi', true)?.id).toBe('foreign')
  expect(randomAvailableRoom([abroad, vietnam], () => 0, 'xiangqi', false)?.id).toBe('foreign')
  expect(preferVietnamRooms([abroad, vietnam]).map(r => r.id)).toEqual(['vn'])
  expect(preferVietnamRooms([abroad]).map(r => r.id)).toEqual(['foreign'])
})

it('xếp tỉnh theo số bàn rồi số người ngồi bàn; tên tỉnh viết tắt được tính chung, không đếm viewer', () => {
  const rooms = [room('hn1', 'Thành phố Hà Nội'), room('hn2', 'Hà Nội'), room('hcm1', 'TP. Hồ Chí Minh', 2), room('hcm2', 'Thành phố Hồ Chí Minh'), { ...room('hue', 'Thành phố Huế', 2), viewerCount: 99 }, room('empty', 'Tỉnh Cao Bằng', 0)]
  const provinces = [{ name: 'Thành phố Huế' }, { name: 'Tỉnh Cao Bằng' }, { name: 'Thành phố Hà Nội' }, { name: 'Thành phố Hồ Chí Minh' }]
  expect(sortRoomProvinces(provinces, rooms).map(p => p.name)).toEqual(['Thành phố Hồ Chí Minh', 'Thành phố Hà Nội', 'Thành phố Huế', 'Tỉnh Cao Bằng'])
  expect(roomRegionActivity(rooms, 'Hồ Chí Minh')).toEqual({ roomCount: 2, playerCount: 3 })
  expect(roomRegionActivity(rooms, 'Huế')).toEqual({ roomCount: 1, playerCount: 2 })
})
