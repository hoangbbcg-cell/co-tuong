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

/**
 * HOME quick play priority:
 * 1. One seated player in selected province, public room.
 * 2. One seated player in another province, public room.
 * 3. One seated player in a locked room WITHOUT a password, any province.
 * 4. Caller creates a new empty room when no candidate exists.
 * A room with an unknown passwordRequired flag is never assumed passwordless.
 * Existing randomAvailableRoom for the room-selection UI is intentionally unchanged.
 */
export function rankHomeQuickPlayRooms(
  rooms: RoomSummary[],
  variant: 'xiangqi' | 'jieqi',
  province?: string,
  random: () => number = Math.random,
): RoomSummary[] {
  const target = province ? normalizeRoomProvince(province) : ''
  const eligible = rooms.filter(room => (room.variant ?? 'xiangqi') === variant
    && room.players === 1 && room.phase !== 'playing')
  const publicRooms = eligible.filter(room => !room.locked && !room.passwordRequired)
  const sameProvince = target ? publicRooms.filter(room => normalizeRoomProvince(room.province) === target) : []
  const otherProvince = target ? publicRooms.filter(room => normalizeRoomProvince(room.province) !== target) : publicRooms
  const passwordlessLocked = eligible.filter(room => room.locked === true && room.passwordRequired === false)
  const shuffled = (items: RoomSummary[]) => {
    const remaining = [...items]
    const result: RoomSummary[] = []
    while (remaining.length) {
      const index = Math.min(remaining.length - 1, Math.max(0, Math.floor(random() * remaining.length)))
      result.push(remaining.splice(index, 1)[0])
    }
    return result
  }
  return [...shuffled(sameProvince), ...shuffled(otherProvince), ...shuffled(passwordlessLocked)]
}