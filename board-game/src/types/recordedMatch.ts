import type { GameState } from './game'

export interface RecordedMatch {
  replayKind?: 'position'
  replayRequiresSave?: boolean
  initialMoveCount?: number
  id: string
  endedAt: number
  redName: string
  blackName: string
  states: GameState[]
}
