import { expect, it, vi } from 'vitest'
const db = vi.hoisted(() => ({ execute:vi.fn(), query:vi.fn(), release:vi.fn() }))
vi.mock('../server/repositories/mysqlPool', () => ({getMysqlConnection:async () => db,getMysqlPool:() => db}))
import { UserRepository } from '../server/repositories/userRepository'

it('creates users through parameters and returns BIGINT IDs as strings', async () => {
  db.execute.mockResolvedValue([{insertId:0}])
  db.query.mockResolvedValue([[{id:'9007199254740993',publicId:'123456789',guestCode:'000042',displayName:'Guest00042',linked:0,renamed:0,active:1}]])
  const user = await new UserRepository().createGuest('000042','123456789')
  expect(user).toMatchObject({id:'9007199254740993',publicId:'123456789',linked:false})
  expect(JSON.stringify(user)).toContain('9007199254740993')
  expect(db.execute).toHaveBeenCalledWith(expect.stringContaining('VALUES (?,?,?,?)'),['123456789','000042','Guest00042','guest00042'])
  expect(db.query).toHaveBeenCalledWith(expect.stringContaining('CAST(id AS CHAR)'))
  expect(db.release).toHaveBeenCalledOnce()
})
it('uses an atomic linked/active/not-renamed condition when changing names', async () => {
  db.execute.mockResolvedValueOnce([{affectedRows:0}]).mockResolvedValueOnce([{affectedRows:1}])
  const repository = new UserRepository()
  expect(await repository.renameLinkedUser('1','An')).toBe(false)
  expect(await repository.renameLinkedUser('1','An')).toBe(true)
  expect(db.execute).toHaveBeenLastCalledWith(expect.stringContaining('linked_at IS NOT NULL AND name_changed_at IS NULL'),['An','an','1'])
})
