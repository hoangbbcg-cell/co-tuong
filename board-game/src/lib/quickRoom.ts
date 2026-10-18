import type { RoomSummary } from '../types/room'

export function randomAvailableRoom(rooms: RoomSummary[], random = Math.random, variant: 'xiangqi' | 'jieqi' = 'xiangqi') {
  const available = rooms.filter(room => (room.variant ?? 'xiangqi') === variant && !room.locked && room.players === 1 && room.phase !== 'playing')
  return available[Math.floor(random() * available.length)]
}
