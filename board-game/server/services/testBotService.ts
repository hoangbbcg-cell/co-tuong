import { randomInt, randomUUID } from 'node:crypto'
import { applyMoveWithResult, finishGame, startGame } from '../../src/game/moves/actions'
import { chooseComputerMove } from '../../src/game/moves/computer'
import { createGame } from '../../src/game/state/initial'
import { createHiddenGame } from '../../src/game/state/hidden'
import type { GameState, Move } from '../../src/types/game'
import type { TestBotSnapshot } from '../../src/types/testBot'
import { AccountError } from '../errors'
import { TestBotRepository } from '../repositories/testBotRepository'

interface TestMatch {
  userId: string; id: string; expires: number; game: GameState; humanMoves: number; gold: number
  finishRequest?: string
  tail: Promise<unknown>
  requests: Map<string, { move: string; promise: Promise<TestBotSnapshot> }>
}
const point = (value: unknown): value is Move['from'] => !!value && typeof value === 'object'
  && Number.isInteger((value as Move['from']).row) && Number.isInteger((value as Move['from']).col)
  && (value as Move['from']).row >= 0 && (value as Move['from']).row < 10
  && (value as Move['from']).col >= 0 && (value as Move['from']).col < 9

/** Explicit two-move testing opponent. All moves and the gold grant are server-owned. */
export class TestBotService {
  private matches = new Map<string, TestMatch>()
  constructor(private repository: Pick<TestBotRepository, 'reward'> = new TestBotRepository(), private now = Date.now) {}
  start(userId: string, variant: unknown): TestBotSnapshot {
    if (variant !== 'xiangqi' && variant !== 'jieqi') throw new AccountError('Loại cờ không hợp lệ.')
    for (const [id, match] of this.matches) if (match.userId === userId || match.expires < this.now()) this.matches.delete(id)
    const base = variant === 'jieqi' ? createHiddenGame(this.now(), Array.from({ length: 28 }, () => Math.random())) : createGame(this.now())
    const match: TestMatch = { id: randomUUID(), userId, game: startGame(base, this.now()), humanMoves: 0, expires: this.now() + 30 * 60_000, gold: 0, tail: Promise.resolve(), requests: new Map() }
    this.matches.set(match.id, match)
    return { id: match.id, game: match.game, humanMoves: 0, goldAwarded: 0 }
  }
  move(userId: string, id: string, input: unknown, requestId: string): Promise<TestBotSnapshot> {
    const match = this.matches.get(id)
    if (!match || match.userId !== userId || match.expires < this.now()) throw new AccountError('Ván máy giả đã hết hạn. Hãy mở ván mới.', 404)
    if (!input || typeof input !== 'object' || !point((input as Move).from) || !point((input as Move).to)) throw new AccountError('Nước đi không hợp lệ.')
    const move = input as Move, signature = `${move.from.row},${move.from.col}-${move.to.row},${move.to.col}`
    const cached = match.requests.get(requestId)
    if (cached) {
      if (cached.move !== signature) throw new AccountError('Mã nước đi đã được dùng.', 409)
      return cached.promise
    }
    const pending = match.tail.catch(() => {}).then(() => this.apply(match, move, requestId))
    match.tail = pending
    match.requests.set(requestId, { move: signature, promise: pending })
    void pending.catch(() => { match.requests.delete(requestId) })
    return pending
  }
  private async apply(match: TestMatch, move: Move, requestId: string): Promise<TestBotSnapshot> {
    if (match.game.phase === 'finished') {
      if (match.finishRequest !== requestId) throw new AccountError('Ván máy giả đã kết thúc.', 409)
    } else {
      const next = applyMoveWithResult(match.game, move, this.now(), 'red').game
      if (next.board === match.game.board) throw new AccountError('Nước đi không hợp lệ.')
      match.humanMoves++
      if (match.humanMoves === 2) {
        match.game = finishGame(next, 'red', 'resign')
        match.gold = randomInt(125, 151)
        match.finishRequest = requestId
      } else {
        const reply = chooseComputerMove(next.board, 'black', 0, next)
        match.game = reply ? applyMoveWithResult(next, reply, this.now(), 'black').game : next
      }
    }
    const profile = match.gold ? await this.repository.reward(match.userId, match.id, match.gold) : undefined
    return { id: match.id, game: match.game, humanMoves: match.humanMoves, goldAwarded: match.gold, ...(profile ? { profile } : {}) }
  }
}
