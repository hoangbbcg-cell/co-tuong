import type { RoomSummary } from '../types/room'
import { normalizeRoomProvince, preferVietnamRooms } from './roomRegions'

export function randomAvailableRoom(rooms: RoomSummary[], random = Math.random, variant: 'xiangqi' | 'jieqi' = 'xiangqi', preferVietnam = false, options: { province?: string; allowPasswordlessLocked?: boolean } = {}) {
  const available = rooms.filter(room => (room.variant ?? 'xiangqi') === variant
    && (options.allowPasswordlessLocked ? !(room.passwordRequired ?? room.locked) : !room.locked)
    && room.players === 1 && room.phase !== 'playing')
  const local = options.province ? available.filter(room => normalizeRoomProvince(room.province) === normalizeRoomProvince(options.province)) : []
  const candidates = local.length ? local : preferVietnam ? preferVietnamRooms(available) : available
  return candidates[Math.floor(random() * candidates.length)]
}
