import { beforeEach, expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import type { RoomSnapshot } from '../src/types/room'

const db = vi.hoisted(() => ({ status: 'playing', change: vi.fn(), start: vi.fn() }))
vi.mock('../server/repositories/accountRepository', () => ({
  AccountRepository: class {},
  rows: async (sql: string) => db.status && sql.includes(`'${db.status}'`) ? [{ id: 'match' }] : [],
  change: async (...args: unknown[]) => db.change(...args),
  transaction: vi.fn(),
}))
vi.mock('../server/repositories/matchRepository', () => ({ MatchRepository: class { start = db.start } }))
import { RoomPersistence } from '../server/services/roomPersistence'
import { ContentRepository } from '../server/repositories/contentRepository'

beforeEach(() => { vi.clearAllMocks(); db.status = 'playing' })

it('publishes the persisted match ID throughout a running game and removes it outside play', async () => {
  const persistence = new RoomPersistence()
  persistence.identities.set('a', { id: '1', name: 'Red' })
  persistence.identities.set('b', { id: '2', name: 'Black' })
  const room: RoomSnapshot = { id: 'room', name: 'Room', game: { ...createGame(), phase: 'playing' }, players: [
    { id: 'a', name: 'Red', side: 'red', ready: true }, { id: 'b', name: 'Black', side: 'black', ready: true },
  ], messages: [], drawOffer: null }
  persistence.observe(room)
  const id = room.activeMatchId
  expect(id).toMatch(/^[\da-f-]{36}$/)
  await persistence.flush()
  expect(db.start.mock.calls[0][0]).toBe(id)
  persistence.observe(room)
  expect(room.activeMatchId).toBe(id)
  room.game.phase = 'ready'
  persistence.observe(room)
  expect(room.activeMatchId).toBeUndefined()
})

it.each(['playing', 'finished'])('saves likes for a real %s online match', async status => {
  db.status = status
  await new ContentRepository().like('7', 'match', 'red', true)
  expect(db.change).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO match_likes'), ['match', '7', 'red'])
})

it('rejects nonexistent or unsupported matches before writing a like', async () => {
  db.status = 'imported'
  await expect(new ContentRepository().like('7', 'match', 'red', true)).rejects.toThrow('Ván đấu không hợp lệ.')
  expect(db.change).not.toHaveBeenCalled()
})
