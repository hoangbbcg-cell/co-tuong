import type { RecordedMatch } from '../types/recordedMatch'

export function recordedMatchStarted(match: RecordedMatch): boolean {
  const phase = match.states.at(-1)?.phase
  return phase === 'finished' || (phase === 'playing' && Number.isFinite(match.startedAt) && (match.startedAt ?? 0) > 0)
}
