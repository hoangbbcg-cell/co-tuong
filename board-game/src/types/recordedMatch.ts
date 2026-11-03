import type { GameState } from './game'

export interface RecordedMatch {
  startedAt?: number
  savedAt?: number
  savedTitle?: string
  savedNote?: string
  replayKind?: 'position'
  replayRequiresSave?: boolean
  initialMoveCount?: number
  id: string
  endedAt: number
  redAvatarCode?: string
  redAvatarFrameCode?: string
  blackAvatarCode?: string
  blackAvatarFrameCode?: string
  redName: string
  blackName: string
  states: GameState[]
}
