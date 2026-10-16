import type { GameState } from '../../src/types/game'
import { fromUci } from '../../src/game/moves/uci'
import { applyMove } from '../../src/game/moves/actions'
import { getLegalMoves, hasAnyLegalMove } from '../../src/game/rules'
import { candidateRepetition, simulateMoveBoard } from '../../src/game/rules/repetition'

export const PIKAFISH_MOVE_WEIGHTS: Record<number, readonly number[]> = {
  1: [20, 25, 25, 20, 10],
  2: [45, 30, 15, 10],
  3: [65, 25, 10],
  4: [75, 20, 5],
  5: [85, 12, 3],
  6: [93, 7],
  7: [97, 3],
  8: [99, 1],
  9: [99.5, 0.5],
  10: [100],
}

export interface PikafishCandidate {
  rank: number
  depth: number
  move: string
  score: { type: 'cp' | 'mate'; value: number }
}

export function parseCandidate(line: string): PikafishCandidate | null {
  if (!line.startsWith('info ') || /\b(lowerbound|upperbound)\b/.test(line)) return null
  const depth = /\bdepth (\d+)/.exec(line)
  const rank = /\bmultipv (\d+)/.exec(line)
  const score = /\bscore (cp|mate) (-?\d+)/.exec(line)
  const pv = /\bpv ([a-i][0-9][a-i][0-9])(?:\s|$)/.exec(line)
  if (!depth || !score || !pv) return null
  return { depth: Number(depth[1]), rank: rank ? Number(rank[1]) : 1, move: pv[1], score: { type: score[1] as 'cp' | 'mate', value: Number(score[2]) } }
}

// Keep complete iterations: never mix top1 at a new depth with stale top2–5.
export class CandidateCollector {
  private pending = new Map<number, PikafishCandidate>()
  private depth = -1
  private complete: PikafishCandidate[] = []
  constructor(private readonly count: number) {}
  add(line: string) {
    const candidate = parseCandidate(line)
    if (!candidate || candidate.rank > this.count || candidate.rank < 1 || candidate.depth < this.depth) return
    if (candidate.depth !== this.depth) { this.pending.clear(); this.depth = candidate.depth }
    this.pending.set(candidate.rank, candidate)
    if (this.pending.size === this.count) this.complete = [...this.pending.values()].sort((a, b) => a.rank - b.rank)
  }
  result(): PikafishCandidate[] {
    return this.complete.length ? this.complete : [...this.pending.values()].sort((a, b) => a.rank - b.rank)
  }
}

export function legalCandidates(game: GameState, candidates: readonly PikafishCandidate[]): PikafishCandidate[] {
  return candidates.filter(candidate => {
    const move = fromUci(candidate.move)
    if (!move || game.board[move.from.row][move.from.col]?.side !== game.currentTurn) return false
    const next = applyMove(game, move, 0)
    return next.board !== game.board && !candidateRepetition(game, move).forbidden
  })
}

export function avoidsImmediateLoss(game: GameState, candidate: PikafishCandidate): boolean {
  const move = fromUci(candidate.move)
  if (!move) return false
  const next = applyMove(game, move, 0)
  if (next.phase === 'finished') return next.result?.winner === game.currentTurn || next.result?.winner === null
  for (let row = 0; row < next.board.length; row++) {
    for (let col = 0; col < next.board[row].length; col++) {
      if (next.board[row][col]?.side !== next.currentTurn) continue
      for (const to of getLegalMoves(row, col, next.board)) {
        const reply = { from: { row, col }, to }
        if (candidateRepetition(next, reply).forbidden) continue
        if (!hasAnyLegalMove(game.currentTurn, simulateMoveBoard(next.board, reply))) return false
      }
    }
  }
  return true
}

// Preserve original ranks/weights after safety filtering; normalize only survivors.
export function chooseCandidate(candidates: readonly PikafishCandidate[], weights: readonly number[], random = Math.random): string | null {
  const unique = candidates.filter((c, i) => candidates.findIndex(other => other.move === c.move) === i && (weights[c.rank - 1] ?? 0) > 0)
  if (!unique.length) return null
  const nonLosing = unique.filter(c => c.score.type !== 'mate' || c.score.value > 0)
  const pool = nonLosing.length ? nonLosing : unique
  const bestCp = Math.max(...pool.filter(c => c.score.type === 'cp').map(c => c.score.value))
  const winningMate = pool.some(c => c.score.type === 'mate' && c.score.value > 0)
  const safe = pool.filter(c => winningMate ? c.score.type === 'mate' && c.score.value > 0 : c.score.type === 'mate' || bestCp - c.score.value <= 300)
  const total = safe.reduce((sum, c) => sum + weights[c.rank - 1], 0)
  let roll = Math.max(0, Math.min(1 - Number.EPSILON, random())) * total
  for (const candidate of safe) {
    roll -= weights[candidate.rank - 1]
    if (roll < 0) return candidate.move
  }
  return safe.at(-1)?.move ?? null
}
