import type { GameState } from './game'
import type { AccountProfile } from './account'

export interface TestBotSnapshot {
  id: string
  game: GameState
  humanMoves: number
  goldAwarded: number
  profile?: AccountProfile
}
