import { describe, expect, it } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { publicRoom } from '../server/services/publicRoom'
import type { RoomSnapshot } from '../src/types/room'

function fixture(): RoomSnapshot {
  const game = createGame(100)
  game.variant = 'jieqi'
  game.captures = [
    { id: 'hidden-1', by: 'red', side: 'black', concealed: true, type: 'horse', name: '馬' },
    { id: 'revealed-2', by: 'black', side: 'red', concealed: false, type: 'rook', name: '車' },
  ]
  return {
    id: 'room', name: 'privacy-test', game, players: [
      { id: 'r', name: 'Red', side: 'red', ready: true },
      { id: 'b', name: 'Black', side: 'black', ready: true },
    ], viewers: [{ id: 'v', name: 'View', queued: false }],
    messages: [], drawOffer: null,
    persistenceHistory: [game], processedCommandIds: { secret: ['test-id'] },
  }
}

describe('private Jieqi capture identity', () => {
  it('only the capturer receives the real identity of an unflipped captured piece', () => {
    const room = fixture()
    const red = publicRoom(room, 'r')
    const black = publicRoom(room, 'b')
    const viewer = publicRoom(room, 'v')
    const unknown = publicRoom(room)
    expect(red.game.captures?.[0].type).toBe('horse')
    for (const result of [black, viewer, unknown]) {
      expect(result.game.captures?.[0].type).toBeNull()
      expect(result.game.captures?.[0].name).toBeNull()
      expect(JSON.stringify(result.game.captures)).not.toContain('\"horse\"')
      expect(result.persistenceHistory).toBeUndefined()
      expect(result.processedCommandIds).toBeUndefined()
    }
    expect(viewer.game.captures?.[1].type).toBe('rook')
    expect(black.game.captures?.[1].type).toBe('rook')
  })
  it('redacts captures in archived states too', () => {
    const room = fixture()
    room.lastCompletedMatch = { id: 'done', redName: 'Red', blackName: 'Black', endedAt: 1, states: [room.game] }
    expect(publicRoom(room, 'v').lastCompletedMatch?.states[0].captures?.[0].type).toBeNull()
  })
})