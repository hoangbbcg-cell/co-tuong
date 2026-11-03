import type { RoomSnapshot } from '../types/room'

export function hasReadyPlayerBetweenMatches(room: RoomSnapshot | null | undefined): boolean {
  return !!room && room.game.phase !== 'playing' && room.players.some(player => player.ready)
}

export function readyCountdownForPlayer(room: RoomSnapshot | null | undefined, playerId?: string) {
  const player = playerId ? room?.players.find(member => member.id === playerId) : undefined
  return (room?.game.phase === 'ready' || room?.game.phase === 'finished') && player && room.players.length === 2 ? room.readyCountdown ?? null : null
}
