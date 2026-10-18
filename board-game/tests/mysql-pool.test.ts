import { afterEach, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({ query: vi.fn(), end: vi.fn(), createPool: vi.fn() }))
vi.mock('mysql2/promise', () => ({ createPool: mocks.createPool }))
import { checkMysqlConnection, closeMysqlPool, getMysqlPool, mysqlOptions } from '../server/repositories/mysqlPool'
const config = { DB_HOST: 'localhost', DB_PORT: '3306', DB_NAME: 'cotuong', DB_USER: 'cotuong_app', DB_PASSWORD: 'test-only-placeholder' }
afterEach(async () => { await closeMysqlPool(); vi.unstubAllEnvs(); vi.clearAllMocks() })
it('validates config and rejects root, missing password and invalid ports', () => {
  expect(mysqlOptions(config)).toMatchObject({ port: 3306, user: 'cotuong_app', timezone: 'Z', bigNumberStrings: true })
  expect(() => mysqlOptions({ ...config, DB_PASSWORD: '' })).toThrow('DB_PASSWORD')
  expect(() => mysqlOptions({ ...config, DB_USER: 'root' })).toThrow('root')
  for (const DB_PORT of ['0', '65536', '3306x', '3.5']) expect(() => mysqlOptions({ ...config, DB_PORT })).toThrow('DB_PORT')
})
it('reuses a lazy pool, checks SELECT 1 and closes it', async () => {
  for (const [key, value] of Object.entries(config)) vi.stubEnv(key, value)
  mocks.createPool.mockReturnValue({ query: mocks.query, end: mocks.end })
  mocks.query.mockResolvedValue([[{ ok: 1 }], []])
  expect(getMysqlPool()).toBe(getMysqlPool())
  await checkMysqlConnection()
  mocks.query.mockResolvedValueOnce([[{ ok: '1' }], []])
  await checkMysqlConnection()
  expect(mocks.createPool).toHaveBeenCalledOnce()
  expect(mocks.query).toHaveBeenCalledWith({ sql: 'SELECT 1 AS ok', timeout: 5000 })
  await closeMysqlPool()
  expect(mocks.end).toHaveBeenCalledOnce()
})
it('propagates failure instead of reporting success', async () => {
  for (const [key, value] of Object.entries(config)) vi.stubEnv(key, value)
  mocks.createPool.mockReturnValue({ query: mocks.query, end: mocks.end })
  mocks.query.mockRejectedValueOnce(new Error('connection failed'))
  await expect(checkMysqlConnection()).rejects.toThrow('connection failed')
})
