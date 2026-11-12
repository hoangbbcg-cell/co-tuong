import { expect, it, vi } from 'vitest'
const db = vi.hoisted(() => ({ rows: vi.fn() }))
vi.mock('../server/repositories/accountRepository', () => ({ rows: db.rows }))
import { ActivityRepository } from '../server/repositories/activityRepository'
import { analyticsFilters } from '../server/services/activityService'

it('serves real account totals without querying missing activity tables or inventing zero usage', async () => {
  db.rows.mockImplementation(async (sql: string) => {
    if (sql.includes('information_schema.TABLES')) return []
    if (sql.includes('COUNT(*) total')) return [{ total: '3', google: '1', guest: '2', online: '1' }]
    if (sql.includes('FROM users u')) return [{ id: '5', publicId: '12345678', name: 'Test', accountType: 'guest', lastSeenAt: null }]
    throw Error('Unexpected query to unavailable tables')
  })
  const result = await new ActivityRepository().report(analyticsFilters({}), new Set(['5']))
  expect(result.activityAvailable).toBe(false)
  expect(result.totals).toEqual({ total: 3, google: 1, guest: 2, online: 1, offline: 2, activeInPeriod: null })
  expect(result.users[0]).toMatchObject({ online: true, publicId: '12345678' })
  expect(result.events).toEqual([])
  expect(db.rows).toHaveBeenCalledTimes(3)
})

it('orders online accounts before pagination and returns at most thirty accounts', async () => {
  db.rows.mockReset()
  db.rows.mockImplementation(async (sql: string) => {
    if (sql.includes('information_schema.TABLES')) return []
    if (sql.includes('COUNT(*) total')) return [{ total: 40, google: 0, guest: 40, online: 1 }]
    return Array.from({ length: 31 }, (_, index) => ({ id: String(index + 1) }))
  })
  const result = await new ActivityRepository().report(analyticsFilters({ status: 'offline', usersOffset: 30 }), new Set(['7']))
  expect(result.users).toHaveLength(30)
  expect(result.usersHasMore).toBe(true)
  expect(db.rows).toHaveBeenLastCalledWith(expect.stringMatching(/ORDER BY \(u.id IN \(\?\)\) DESC,u.id DESC LIMIT 31 OFFSET 30/), ['7', '7'])
})
