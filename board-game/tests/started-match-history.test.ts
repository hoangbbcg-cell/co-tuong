import { beforeEach, expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { finishGame } from '../src/game/moves/actions'
import { ContentRepository } from '../server/repositories/contentRepository'
import { recordedMatchStarted } from '../src/lib/recordedMatchStarted'

const { rows, change } = vi.hoisted(() => ({ rows: vi.fn(), change: vi.fn() }))
vi.mock('../server/repositories/accountRepository', () => ({ rows, change, transaction: vi.fn() }))
beforeEach(() => vi.resetAllMocks())

it('returns a started match with zero moves and no final state', async () => {
  const initial = { ...createGame(), phase: 'playing' as const }
  vi.mocked(rows).mockResolvedValueOnce([{ id: 'one', startedAt: '2026-10-27T01:00:00Z', endedAt: '2026-10-27T01:00:00Z', redName: 'A', blackName: 'B' }])
    .mockResolvedValueOnce([{ initial_state: initial, final_state: null }]).mockResolvedValueOnce([])
  const history = await new ContentRepository().history('1')
  expect(history[0].states).toEqual([initial])
  expect(recordedMatchStarted(history[0])).toBe(true)
})

it('returns a zero-move final result once, replacing the initial snapshot', async () => {
  const initial = { ...createGame(), phase: 'playing' as const }
  const final = finishGame(initial, 'black', 'resign')
  vi.mocked(rows).mockResolvedValueOnce([{ id: 'one', startedAt: '2026-10-27T01:00:00Z', endedAt: '2026-10-27T01:01:00Z', redName: 'A', blackName: 'B' }])
    .mockResolvedValueOnce([{ initial_state: initial, final_state: final }]).mockResolvedValueOnce([])
  const history = await new ContentRepository().history('1')
  expect(history[0].states).toEqual([final])
})

it('bookmarks a started match only after the authoritative eligibility query succeeds', async () => {
  vi.mocked(rows).mockResolvedValueOnce([])
  const repository = new ContentRepository()
  await expect(repository.bookmark('1', 'one', true)).rejects.toThrow('chưa bắt đầu')
  expect(change).not.toHaveBeenCalled()
  vi.mocked(rows).mockResolvedValueOnce([{ id: 'one' }])
  await repository.bookmark('1', 'one', true)
  expect(rows).toHaveBeenLastCalledWith(expect.stringContaining("status='playing' AND EXISTS"), ['one', '1'])
  expect(change).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO saved_matches'), ['1', 'one'])
})

it('rejects a waiting board and accepts a started zero-move board', () => {
  const base = { id: 'one', endedAt: 1, redName: 'A', blackName: 'B', states: [createGame()] }
  expect(recordedMatchStarted({ ...base, startedAt: 1 })).toBe(false)
  expect(recordedMatchStarted({ ...base, states: [{ ...createGame(), phase: 'playing' }] })).toBe(false)
  expect(recordedMatchStarted({ ...base, startedAt: 1, states: [{ ...createGame(), phase: 'playing' }] })).toBe(true)
})
