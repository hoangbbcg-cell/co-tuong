import { beforeEach, expect, it, vi } from 'vitest'
const db = vi.hoisted(() => ({query:vi.fn(), execute:vi.fn(),release:vi.fn()}))
vi.mock('../server/repositories/mysqlPool', () => ({getMysqlConnection:async () => db}))
import { loadMigrations, migrateDatabase } from '../server/repositories/migrationRepository'
beforeEach(() => {
  vi.clearAllMocks()
  db.query.mockImplementation(async (sql: string) => {
    if (sql.startsWith('SELECT GET_LOCK')) return [[{acquired:1}]]
    return [[]]
  })
  db.execute.mockResolvedValue([{}])
})
it('journals each versioned step and releases advisory lock/connection', async () => {
  const steps=await loadMigrations()
  expect(await migrateDatabase()).toBe(steps.length)
  expect(db.execute.mock.calls.filter(([sql]) => sql.startsWith('INSERT INTO schema_migrations'))).toHaveLength(steps.length)
  expect(db.query.mock.calls.filter(([sql]) => sql.startsWith('ALTER TABLE'))).toHaveLength(steps.filter(s=>s.sql.startsWith('ALTER TABLE')).length)
  expect(db.query).toHaveBeenLastCalledWith(expect.stringContaining('RELEASE_LOCK'))
  expect(db.release).toHaveBeenCalledOnce()
})
it('is a no-op for fully applied history', async () => {
  const steps = await loadMigrations()
  db.query.mockImplementation(async (sql: string) => sql.startsWith('SELECT GET_LOCK') ? [[{acquired:1}]]
    : sql.startsWith('SELECT version') ? [steps.map(step => ({...step,status:'applied'}))] : [[]])
  expect(await migrateDatabase()).toBe(0)
  expect(db.execute).not.toHaveBeenCalled()
})
it('refuses untracked existing tables instead of adopting or deleting them', async () => {
  db.query.mockImplementation(async (sql: string) => sql.startsWith('SELECT GET_LOCK') ? [[{acquired:1}]]
    : sql.includes('information_schema.TABLES') ? [[{TABLE_NAME:'users'}]] : [[]])
  await expect(migrateDatabase()).rejects.toThrow('already exist')
  expect(db.execute).not.toHaveBeenCalled()
  expect(db.release).toHaveBeenCalledOnce()
})
it('leaves an interrupted step marked running and never drops/rolls back DDL', async () => {
  db.query.mockImplementation(async (sql: string) => {
    if (sql.startsWith('SELECT GET_LOCK')) return [[{acquired:1}]]
    if (sql.startsWith('CREATE TABLE users')) throw new Error('DDL failed')
    return [[]]
  })
  await expect(migrateDatabase()).rejects.toThrow('DDL failed')
  expect(db.execute).toHaveBeenCalledTimes(1)
  expect(db.execute).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO schema_migrations'),expect.arrayContaining(['running']))
  expect(db.release).toHaveBeenCalledOnce()
  expect(db.query.mock.calls.some(([sql]) => /\bDROP\b/.test(sql))).toBe(false)
})
