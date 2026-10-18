import type { GameState } from '../../src/types/game'
import type { RoomSnapshot } from '../../src/types/room'

function publicGame(game: GameState): GameState {
  if (game.variant !== 'jieqi') return game
  return { ...game, board: game.board.map(row => row.map(piece => piece?.concealed
    ? { ...piece, concealed: { type: piece.type, name: 'Quân úp' } }
    : piece)) }
}

/** Keep hidden identities on the server, including archived/takeback states. */
export function publicRoom(room: RoomSnapshot): RoomSnapshot {
  if (room.game.variant !== 'jieqi') return room
  return { ...room, game: publicGame(room.game), lastCompletedMatch: room.lastCompletedMatch
    ? { ...room.lastCompletedMatch, states: room.lastCompletedMatch.states.map(publicGame) }
    : undefined }
}
