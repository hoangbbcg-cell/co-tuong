import type { GameState } from '../../types/game'
import { createGame } from './initial'

// Random samples are supplied by the store; the engine remains deterministic.
export function createHiddenGame(now: number, samples: readonly number[]): GameState {
  const game = createGame(now)
  let cursor = 0
  for (const side of ['red', 'black'] as const) {
    const pieces = game.board.flat().filter(piece => piece?.side === side && piece.type !== 'general')
    const identities = pieces.map(piece => ({ type: piece!.type, name: piece!.name }))
    for (let i = identities.length - 1; i > 0; i--) {
      const sample = samples[cursor++]
      if (!Number.isFinite(sample) || sample < 0 || sample >= 1) throw new Error('Invalid shuffle sample')
      const j = Math.floor(sample * (i + 1))
      ;[identities[i], identities[j]] = [identities[j], identities[i]]
    }
    pieces.forEach((piece, index) => {
      piece!.jieqi = true
      piece!.concealed = identities[index]
      piece!.name = 'Quân úp'
    })
  }
  return { ...game, variant: 'jieqi' }
}
