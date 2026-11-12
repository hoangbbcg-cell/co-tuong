import type { RoomSnapshot } from '../types/room'

export function hasReadyPlayerBetweenMatches(room: RoomSnapshot | null | undefined): boolean {
  return !!room && room.game.phase !== 'playing' && room.players.some(player => player.ready)
}

/**
 * A finished match retains its own rematch timer only for its original pair.
 * After a seat changes, create a fresh ready game for the current pair.
 * Do not override a pending queue rotation.
 */
export function shouldRestartReadyForChangedPair(
  phase: 'ready' | 'playing' | 'finished',
  playerIds: readonly string[],
  rematchPair: string | null,
  queueRotationPending: boolean,
): boolean {
  return phase === 'finished'
    && playerIds.length === 2
    && playerIds[0] !== playerIds[1]
    && !queueRotationPending
    && (rematchPair === null || rematchPair !== [...playerIds].sort().join(':'))
}
/** A spectator observes the server's existing Ready countdown without gaining player permissions. */
export function readyCountdownForViewer(room: RoomSnapshot | null | undefined): number | null {
  if (!room || room.players.length !== 2) return null
  if (room.game.phase !== 'ready' && room.game.phase !== 'finished') return null
  return room.readyCountdown ?? null
}
export function readyCountdownForPlayer(room: RoomSnapshot | null | undefined, playerId?: string) {
  const player = playerId ? room?.players.find(member => member.id === playerId) : undefined
  return (room?.game.phase === 'ready' || room?.game.phase === 'finished') && player && room.players.length === 2 ? room.readyCountdown ?? null : null
}
