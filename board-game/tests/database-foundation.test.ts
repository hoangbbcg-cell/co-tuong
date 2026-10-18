import { expect, it, vi } from 'vitest'
import { FOUNDATION_TABLES, loadMigrations, pendingMigrations } from '../server/repositories/migrationRepository'
import { UserService } from '../server/services/userService'
import type { UserPersistence } from '../server/repositories/userRepository'

it('contains 19 tables in dependency order and two chat cursor alterations', async () => {
  const steps = (await loadMigrations()).filter(step=>step.version.startsWith('001_'))
  expect(steps).toHaveLength(21)
  expect(steps.filter(step => /^CREATE TABLE/.test(step.sql)).map(step => /^CREATE TABLE\s+(\w+)/.exec(step.sql)?.[1])).toEqual([...FOUNDATION_TABLES])
  const created = new Set<string>()
  for (const step of steps) {
    const table = /^CREATE TABLE\s+(\w+)/.exec(step.sql)?.[1]
    if (table) created.add(table)
    for (const reference of step.sql.matchAll(/REFERENCES (\w+)\(/g)) expect(created.has(reference[1])).toBe(true)
    expect(step.sql).not.toMatch(/\b(DROP|TRUNCATE|JSONB|TIMESTAMPTZ)\b/)
    if (table) expect(step.sql).toContain('ENGINE=InnoDB DEFAULT CHARSET=utf8mb4')
  }
  expect(steps[0].sql).toContain('id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT')
  expect(steps[0].sql).toContain('UNIQUE KEY uq_users_guest (guest_code)')
})
it('skips applied migrations and rejects dirty, reordered or edited history', async () => {
  const steps = await loadMigrations()
  const done = steps.map(step => ({ version: step.version, checksum: step.checksum, status: 'applied' }))
  expect(pendingMigrations(steps,done)).toEqual([])
  expect(pendingMigrations(steps,done.slice(0,2))).toEqual(steps.slice(2))
  expect(() => pendingMigrations(steps,[{...done[0],status:'running'}])).toThrow('incomplete')
  expect(() => pendingMigrations(steps,[{...done[0],checksum:'wrong'}])).toThrow('mismatch')
  expect(() => pendingMigrations(steps,[done[1]])).toThrow('prefix')
})
it('retries duplicate guest allocations and preserves BIGINT strings', async () => {
  const createGuest = vi.fn().mockRejectedValueOnce({ code:'ER_DUP_ENTRY' }).mockResolvedValue({id:'9007199254740993',displayName:'Kỳ Thủ 000042'})
  const users: UserPersistence = { createGuest, renameLinkedUser:vi.fn() }
  const service = new UserService(users, (() => 42) as typeof import('node:crypto').randomInt)
  expect(await service.createGuest()).toMatchObject({ id:'9007199254740993' })
  expect(createGuest).toHaveBeenCalledTimes(2)
  expect(createGuest).toHaveBeenLastCalledWith('000042','42')
})
it('does not retry connection errors and bounds duplicate retries', async () => {
  const createGuest = vi.fn().mockRejectedValue({code:'ECONNREFUSED'})
  const service = new UserService({createGuest,renameLinkedUser:vi.fn()})
  await expect(service.createGuest()).rejects.toMatchObject({code:'ECONNREFUSED'})
  expect(createGuest).toHaveBeenCalledOnce()
  createGuest.mockReset().mockRejectedValue({code:'ER_DUP_ENTRY'})
  await expect(service.createGuest()).rejects.toThrow('mã khách')
  expect(createGuest).toHaveBeenCalledTimes(30)
})
it('enforces linked-only one-time rename with a conditional backend write', async () => {
  const renameLinkedUser = vi.fn().mockResolvedValue(false)
  const service = new UserService({createGuest:vi.fn(),renameLinkedUser})
  await expect(service.rename('1','Tên mới')).rejects.toThrow('đã liên kết')
  await expect(service.rename('1','Kỳ Thủ 000042')).rejects.toThrow('dành riêng')
  await expect(service.rename('not-an-id','Tên')).rejects.toThrow('ID')
  renameLinkedUser.mockResolvedValueOnce(true)
  await expect(service.rename('9007199254740993','  An  ')).resolves.toBeUndefined()
  expect(renameLinkedUser).toHaveBeenLastCalledWith('9007199254740993','An')
})
