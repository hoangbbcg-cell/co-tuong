import { beforeEach, expect, it, vi } from 'vitest'
const data = vi.hoisted(() => ({ records: [] as { matchId: string; actorId: string; targetSide: string }[], put: vi.fn() }))
vi.mock('../src/services/accountApi', () => ({ accountApi: { request: { put: data.put } } }))
vi.mock('../src/store/sessionStore', () => ({ useSessionStore: { getState: () => ({ account: { id: 'account' }, matchLikeRecords: data.records, recordMatchLike: (record: { matchId: string; actorId: string; targetSide: string }) => data.records.push(record) }) } }))
import { saveMatchLike } from '../src/features/game/hooks/useMatchLike'
beforeEach(() => { data.records = []; data.put.mockReset(); data.put.mockResolvedValue({}) })
it('counts once across repeated clicks and targets, then allows the next match', async () => {
  await saveMatchLike('match-1', 'actor', 'red')
  await saveMatchLike('match-1', 'actor', 'red')
  await saveMatchLike('match-1', 'actor', 'black')
  expect(data.put).toHaveBeenCalledTimes(1)
  expect(data.records).toEqual([{ matchId: 'match-1', actorId: 'actor', targetSide: 'red' }])
  await saveMatchLike('match-2', 'actor', 'black')
  expect(data.put).toHaveBeenCalledTimes(2)
})
it('coalesces rapid clicks while a request is pending', async () => {
  let finish!: () => void
  data.put.mockImplementation(() => new Promise<void>(resolve => { finish = resolve }))
  const first = saveMatchLike('pending', 'actor', 'red')
  const second = saveMatchLike('pending', 'actor', 'black')
  expect(data.put).toHaveBeenCalledTimes(1)
  finish()
  await Promise.all([first, second])
  expect(data.records).toHaveLength(1)
  expect(data.records[0].targetSide).toBe('red')
})
it('allows retry after a failed request without counting it', async () => {
  data.put.mockRejectedValueOnce(new Error('offline'))
  await expect(saveMatchLike('retry', 'actor', 'red')).rejects.toThrow('offline')
  expect(data.records).toHaveLength(0)
  await saveMatchLike('retry', 'actor', 'red')
  expect(data.records).toHaveLength(1)
})
