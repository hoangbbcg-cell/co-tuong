import { beforeEach, expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import type { RoomSnapshot } from '../src/types/room'

const db = vi.hoisted(() => ({ friends: false, eligible: 1, finished: false, change: vi.fn(), ledger: vi.fn() }))
vi.mock('../server/repositories/accountRepository', () => ({
  transaction: async (run: (connection: unknown) => Promise<unknown>) => run({}),
  rows: async (sql: string) => {
    if (sql.includes('FROM friendships')) return db.friends ? [{ present: 1 }] : []
    if (sql.startsWith('SELECT status,variant')) return [{ status: db.finished ? 'finished' : 'playing', variant: 'xiangqi', gold_reward_eligible: db.eligible }]
    if (sql.includes('FROM match_players')) return [{ side: 'red', userId: '2', elo_before: 1000 }, { side: 'black', userId: '10', elo_before: 1000 }]
    if (sql.startsWith('SELECT display_name')) return [{ display_name: 'Player' }]
    if (sql.startsWith('SELECT elo')) return [{ elo: 1000 }]
    if (sql.startsWith('SELECT current_win_streak')) return [{ current_win_streak: 0 }]
    if (sql.startsWith('SELECT SUM')) return [{ played: 1, streak: 1 }]
    return []
  },
  change: async (sql: string, params: unknown[]) => {
    db.change(sql, params)
    if (sql.startsWith('INSERT INTO matches')) db.eligible = Number(params.at(-1))
    if (sql.startsWith('UPDATE matches SET')) db.finished = true
  },
  AccountRepository: class {
    resources = async () => ({ gold: '0', energy: 5, energyRecoveryAt: null })
    hasUnlimitedEnergy = async () => false
    ledger = db.ledger
  },
}))
import { MatchRepository } from '../server/repositories/matchRepository'

beforeEach(() => { vi.clearAllMocks(); db.friends = false; db.eligible = 1; db.finished = false })
const room = (): RoomSnapshot => ({ id: 'room', name: 'Room', game: createGame(), players: [
  { id: 'a', name: 'Red', side: 'red', ready: true }, { id: 'b', name: 'Black', side: 'black', ready: true },
], messages: [], drawOffer: null })
const finish = async (repo: MatchRepository, snapshot: RoomSnapshot) => {
  const final = { ...snapshot.game, phase: 'finished' as const, result: { winner: 'red' as const, reason: 'resign' as const } }
  await repo.complete('match', snapshot, [snapshot.game, final])
}
const goldWrites = () => db.change.mock.calls.filter(([sql]) => sql.includes('gold=gold+'))

it('friends at start cannot regain gold by unfriending before the result', async () => {
  const repo = new MatchRepository(), snapshot = room()
  db.friends = true
  await repo.start('match', snapshot, { red: '2', black: '10' })
  db.friends = false
  await finish(repo, snapshot)
  expect(db.eligible).toBe(0)
  expect(goldWrites()).toHaveLength(0)
  expect(db.ledger.mock.calls.some(call => call[2] === 'gold')).toBe(false)
  expect(db.change.mock.calls.some(([sql]) => sql.startsWith('UPDATE user_game_stats'))).toBe(true)
})
it('an invited pair receives no gold, while a different pair in that room remains eligible', async () => {
  const snapshot = room(), repo = new MatchRepository()
  snapshot.goldRewardExcludedPairs = [['a', 'b']]
  await repo.start('match', snapshot, { red: '2', black: '10' })
  await finish(repo, snapshot)
  expect(goldWrites()).toHaveLength(0)
  snapshot.goldRewardExcludedPairs = [['a', 'previous-player']]
  await repo.start('other-match', snapshot, { red: '2', black: '10' })
  expect(db.eligible).toBe(1)
})
it('also excludes a friendship accepted during the game', async () => {
  const snapshot = room(), repo = new MatchRepository()
  await repo.start('match', snapshot, { red: '2', black: '10' })
  db.friends = true
  await finish(repo, snapshot)
  expect(goldWrites()).toHaveLength(0)
})
it('a normal opponent still receives 125–150 gold exactly once', async () => {
  const snapshot = room(), repo = new MatchRepository()
  await repo.start('match', snapshot, { red: '2', black: '10' })
  await finish(repo, snapshot)
  await finish(repo, snapshot)
  expect(goldWrites()).toHaveLength(1)
  const amount = Number(goldWrites()[0][1][0])
  expect(amount).toBeGreaterThanOrEqual(125)
  expect(amount).toBeLessThanOrEqual(150)
})
