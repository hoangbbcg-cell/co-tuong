import { describe, expect, it } from 'vitest'
import { CandidateCollector, PIKAFISH_MOVE_WEIGHTS, avoidsImmediateLoss, chooseCandidate, legalCandidates, parseCandidate, type PikafishCandidate } from '../server/services/pikafishCandidates'
import { createGame } from '../src/game/state/initial'
import { startGame } from '../src/game/moves/actions'

const candidate = (rank: number, value = 0): PikafishCandidate => ({ rank, depth: 1, move: `${String.fromCharCode(96 + rank)}3${String.fromCharCode(96 + rank)}4`, score: { type: 'cp', value } })

describe('Pikafish controlled errors', () => {
  it('matches all ten probability profiles exactly with evenly spaced rolls', () => {
    for (const weights of Object.values(PIKAFISH_MOVE_WEIGHTS)) {
      expect(weights.reduce((sum, weight) => sum + weight, 0)).toBe(100)
      const moves = weights.map((_, i) => candidate(i + 1))
      const counts = moves.map(() => 0)
      for (let i = 0; i < 1000; i++) {
        const selected = chooseCandidate(moves, weights, () => (i + 0.5) / 1000)
        counts[moves.findIndex(move => move.move === selected)]++
      }
      expect(counts).toEqual(weights.map(weight => weight * 10))
    }
  })
  it('filters catastrophic losses and losing mates, then renormalizes surviving ranks', () => {
    const moves = [candidate(1, 100), candidate(2, 50), candidate(3, -500)]
    expect(chooseCandidate(moves, [20, 25, 55], () => 0.99)).toBe(moves[1].move)
    moves[1].score = { type: 'mate', value: -1 }
    expect(chooseCandidate(moves.slice(0, 2), [20, 80], () => 0.99)).toBe(moves[0].move)
    expect(chooseCandidate([], [100])).toBeNull()
  })
  it('does not mix depths and rejects bounds/malformed PVs', () => {
    const collector = new CandidateCollector(2)
    collector.add('info depth 1 multipv 1 score cp 20 pv a3a4')
    collector.add('info depth 1 multipv 2 score cp 10 pv c3c4')
    collector.add('info depth 2 multipv 1 score cp 30 pv g3g4')
    expect(collector.result().map(c => c.move)).toEqual(['a3a4', 'c3c4'])
    collector.add('info depth 2 multipv 2 score cp 15 pv i3i4')
    expect(collector.result().map(c => c.move)).toEqual(['g3g4', 'i3i4'])
    expect(parseCandidate('info depth 3 score cp 10 lowerbound pv a3a4')).toBeNull()
    expect(parseCandidate('info depth 3 multipv 1 score cp 10 pv quit')).toBeNull()
  })
  it('never admits illegal moves or moves by the wrong side', () => {
    const game = startGame(createGame(0), 0)
    const candidates = [{ ...candidate(1), move: 'a3a4' }, { ...candidate(2), move: 'a3a9' }, { ...candidate(3), move: 'a6a5' }]
    expect(legalCandidates(game, candidates).map(c => c.move)).toEqual(['a3a4'])
  })
  it('rejects exposing the general and detects an opponent mate in one', () => {
    const game = startGame(createGame(0), 0)
    const redGeneral = game.board[9][4]!
    const blackGeneral = game.board[0][4]!
    const redRook = game.board[9][0]!
    const blackRookA = game.board[0][0]!
    const blackRookB = game.board[0][8]!
    const redSoldier = game.board[6][0]!
    const blackSoldier = game.board[3][0]!
    game.board = game.board.map(row => row.map(() => null))
    game.board[9][4] = redGeneral; game.board[0][4] = blackGeneral
    game.board[5][4] = redRook
    expect(legalCandidates(game, [{ ...candidate(1), move: 'e4f4' }])).toEqual([])
    game.board[5][4] = { ...redSoldier, id: 'blocker' }
    game.board[8][3] = blackRookA; game.board[8][5] = blackRookB
    game.board[9][2] = blackSoldier; game.board[6][0] = redSoldier
    expect(avoidsImmediateLoss(game, { ...candidate(1), move: 'a3a4' })).toBe(false)
  })
})
