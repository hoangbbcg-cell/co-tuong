import type { GameState } from './game'

export interface RecordedMatch {
  savedTitle?: string
  savedNote?: string
  replayKind?: 'position'
  replayRequiresSave?: boolean
  initialMoveCount?: number
  id: string
  endedAt: number
  redName: string
  blackName: string
  states: GameState[]
}
