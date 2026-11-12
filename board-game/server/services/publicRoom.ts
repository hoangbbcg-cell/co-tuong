import type { GameState, Side } from '../../src/types/game'
import type { RoomSnapshot } from '../../src/types/room'

/** The recipient is authenticated by its socket ID, never by a client-provided side. */
function publicGame(game: GameState, recipientSide: Side | null): GameState {
  if (game.variant !== 'jieqi') return game
  return {
    ...game,
    board: game.board.map(row => row.map(piece => piece?.concealed
      ? { ...piece, concealed: { type: piece.type, name: 'Quân úp' } }
      : piece)),
    captures: game.captures?.map(capture => capture.concealed && recipientSide !== capture.by
      ? { ...capture, type: null, name: null }
      : { ...capture }),
  }
}

/** Never put hidden identities, persistence snapshots or command IDs into room data. */
export function publicRoom(room: RoomSnapshot, recipientSocketId?: string): RoomSnapshot {
  const recipientSide: Side | null = room.players.find(player => player.id === recipientSocketId)?.side ?? null
  const {
    goldRewardExcludedPairs: _excluded,
    persistenceHistory: _history,
    processedCommandIds: _commands,
    persistenceTakebackDeadlineEpochMs: _deadline,
    ...visible
  } = room
  if (room.game.variant !== 'jieqi') return visible
  return {
    ...visible,
    game: publicGame(room.game, recipientSide),
    lastCompletedMatch: room.lastCompletedMatch
      ? { ...room.lastCompletedMatch, states: room.lastCompletedMatch.states.map(game => publicGame(game, recipientSide)) }
      : undefined,
  }
}