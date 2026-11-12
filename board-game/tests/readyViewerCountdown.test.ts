import { describe, expect, it } from 'vitest'
import type { RoomSnapshot } from '../src/types/room'
import { readyCountdownForViewer } from '../src/lib/roomReadiness'
const snapshot = (phase: 'ready' | 'finished' | 'playing', players: number, seconds: number | null): RoomSnapshot => ({
  id: 'room', name: 'test', game: { phase } as RoomSnapshot['game'],
  players: Array.from({ length: players }, (_, i) => ({ id: `p${i}`, name: `Player ${i}`, side: (i === 0 ? 'red' : 'black') as 'red' | 'black', ready: false })),
  messages: [], drawOffer: null, readyCountdown: seconds,
})
describe('spectator Ready countdown', () => {
  it('shows the server time during ready and after a finished match', () => {
    expect(readyCountdownForViewer(snapshot('ready', 2, 30))).toBe(30)
    expect(readyCountdownForViewer(snapshot('finished', 2, 12))).toBe(12)
    expect(readyCountdownForViewer(snapshot('ready', 2, 0))).toBe(0)
  })
  it('hides countdown for missing seat, playing phase, unset timer and no room', () => {
    expect(readyCountdownForViewer(snapshot('ready', 1, 30))).toBeNull()
    expect(readyCountdownForViewer(snapshot('playing', 2, 25))).toBeNull()
    expect(readyCountdownForViewer(snapshot('ready', 2, null))).toBeNull()
    expect(readyCountdownForViewer(null)).toBeNull()
  })
})