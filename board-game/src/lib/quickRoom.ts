import type { RoomSummary } from '../types/room'

export function randomAvailableRoom(rooms: RoomSummary[], random = Math.random) {
  const available = rooms.filter(room => !room.locked && room.players === 1 && room.phase !== 'playing')
  return available[Math.floor(random() * available.length)]
}
