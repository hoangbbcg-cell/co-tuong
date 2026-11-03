import { describe, expect, it } from 'vitest'
import { readyCountdownForPlayer } from '../src/lib/roomReadiness'

describe('online ready countdown audio input', () => {
  const room = {
    id: 'room-1',
    game: { phase: 'ready' },
    players: [
      { id: 'p1', ready: false },
      { id: 'p2', ready: false },
    ],
    readyCountdown: 31,
  }

  it('provides the visible countdown for an unready player', () => {
    expect(readyCountdownForPlayer(room as never, 'p1')).toBe(31)
  })

  it('updates when the room countdown decreases', () => {
    const next = { ...room, readyCountdown: 30 }
    const before = readyCountdownForPlayer(room as never, 'p1')
    const after = readyCountdownForPlayer(next as never, 'p1')
    expect(after).toBe(30)
    expect(after!).toBeLessThan(before!)
  })

  it('keeps exposing countdown after player becomes ready', () => {
    const next = {
      ...room,
      players: [{ id: 'p1', ready: true }, room.players[1]],
    }
    expect(readyCountdownForPlayer(next as never, 'p1')).toBe(31)
  })
})