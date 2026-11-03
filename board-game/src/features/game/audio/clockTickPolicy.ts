import type { GameState } from '../../../types/game'

// Automatic ticking during play is disabled by user preference.
// Ready countdown and low-time warnings have separate audio policies.
export function shouldPlayClockTick(
  _game: Pick<GameState, 'phase' | 'turnElapsed' | 'remainingTime' | 'currentTurn'>,
  _paused = false,
): boolean {
  return false
}
