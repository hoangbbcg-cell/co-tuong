import type { RoomSummary } from '../types/room'

const vietnamProvinces = new Set('Hà Nội|Cao Bằng|Tuyên Quang|Điện Biên|Lai Châu|Sơn La|Lào Cai|Thái Nguyên|Lạng Sơn|Quảng Ninh|Bắc Ninh|Phú Thọ|Hải Phòng|Hưng Yên|Ninh Bình|Thanh Hóa|Nghệ An|Hà Tĩnh|Quảng Trị|Huế|Đà Nẵng|Quảng Ngãi|Gia Lai|Khánh Hòa|Đắk Lắk|Lâm Đồng|Đồng Nai|Hồ Chí Minh|Tây Ninh|Đồng Tháp|Vĩnh Long|An Giang|Cần Thơ|Cà Mau'.split('|'))
export function normalizeRoomProvince(name = '') {
  return name.trim().normalize('NFC').replace(/^(?:Thành phố|Tỉnh|TP\.?)[\s]+/i, '')
}
export function isVietnamRoom(room: RoomSummary) {
  const province = normalizeRoomProvince(room.province)
  // Older rooms without a region belong to the default Vietnam lobby.
  return !province || province === 'Việt Nam' || vietnamProvinces.has(province)
}
export function preferVietnamRooms(rooms: RoomSummary[]) {
  const vietnam = rooms.filter(isVietnamRoom)
  return vietnam.length ? vietnam : rooms
}
export function roomRegionActivity(rooms: RoomSummary[], province?: string) {
  const matching = rooms.filter(room => (room.players > 0 || (room.viewerCount ?? 0) > 0)
    && (province === undefined || normalizeRoomProvince(room.province) === normalizeRoomProvince(province)))
  return { roomCount: matching.length, playerCount: matching.reduce((sum, room) => sum + room.players, 0) }
}
export function sortRoomProvinces<T extends { name: string }>(provinces: T[], rooms: RoomSummary[]) {
  return provinces.map(city => ({ ...city, ...roomRegionActivity(rooms, city.name) }))
    .sort((a, b) => b.roomCount - a.roomCount || b.playerCount - a.playerCount || a.name.localeCompare(b.name, 'vi'))
}
