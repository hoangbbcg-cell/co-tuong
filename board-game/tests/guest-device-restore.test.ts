import { afterEach, expect, it, vi } from 'vitest'
import { AccountService, hashCredential } from '../server/services/accountService'
import { AccountRepository } from '../server/repositories/accountRepository'

afterEach(() => vi.restoreAllMocks())

it('resumes the device user with a new session and never creates another user', async () => {
  const repository = new AccountRepository()
  const lookup = vi.spyOn(repository, 'byCredential').mockResolvedValue('42')
  const resume = vi.spyOn(repository, 'resumeGuest').mockResolvedValue(true)
  const profile = vi.spyOn(repository, 'profile').mockResolvedValue(null)
  const create = vi.spyOn(repository, 'create')
  const device = 'a'.repeat(64)
  const result = await new AccountService(repository).guest(device, false)
  expect(lookup).toHaveBeenCalledWith(hashCredential(device), true)
  expect(resume).toHaveBeenCalledWith('42', hashCredential(device), hashCredential(result.session))
  expect(profile).toHaveBeenCalledWith('42')
  expect(result.device).toBe(device)
  expect(create).not.toHaveBeenCalled()
})

it('does not create users on automatic restore without a valid device cookie', async () => {
  const repository = new AccountRepository()
  vi.spyOn(repository, 'byCredential').mockResolvedValue(null)
  const create = vi.spyOn(repository, 'create')
  for (const device of [undefined, 'forged', 'b'.repeat(64)]) {
    await expect(new AccountService(repository).guest(device, false)).rejects.toMatchObject({ status: 401 })
  }
  expect(create).not.toHaveBeenCalled()
})

it('refuses restore if a concurrent Google link revokes the device credential', async () => {
  const repository = new AccountRepository()
  vi.spyOn(repository, 'byCredential').mockResolvedValue('42')
  vi.spyOn(repository, 'resumeGuest').mockResolvedValue(false)
  const create = vi.spyOn(repository, 'create')
  await expect(new AccountService(repository).guest('a'.repeat(64), false)).rejects.toMatchObject({ status: 401 })
  expect(create).not.toHaveBeenCalled()
})
