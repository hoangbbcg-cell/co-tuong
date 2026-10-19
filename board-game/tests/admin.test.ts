import { afterEach, expect, it, vi } from 'vitest'
import { AdminAuth, hashAdminPassword } from '../server/services/adminAuth'
import { AdminService } from '../server/services/adminService'
import { AdminRepository } from '../server/repositories/adminRepository'
import { adminRouter } from '../server/controllers/adminController'
import express from 'express'
import type { ErrorRequestHandler } from 'express'
import { createServer } from 'node:http'
import { AccountError } from '../server/errors'

afterEach(() => vi.restoreAllMocks())
it('requires configuration, expires sessions and revokes on logout or password change', async () => {
  let config = '', now = 1000
  const auth = new AdminAuth(() => config, () => now)
  await expect(auth.login('a-long-admin-password', 'one')).rejects.toMatchObject({ status: 503 })
  config = await hashAdminPassword('a-long-admin-password')
  await expect(auth.login('wrong-password', 'one')).rejects.toMatchObject({ status: 401 })
  const token = await auth.login('a-long-admin-password', 'one')
  expect(() => auth.authorize(token)).not.toThrow()
  auth.logout(token); expect(() => auth.authorize(token)).toThrow()
  const second = await auth.login('a-long-admin-password', 'one')
  now += 2 * 60 * 60_000; expect(() => auth.authorize(second)).toThrow()
  const third = await auth.login('a-long-admin-password', 'one')
  config = await hashAdminPassword('another-admin-password')
  expect(() => auth.authorize(third)).toThrow()
})
it('limits wrong passwords by IP', async () => {
  const hash = await hashAdminPassword('a-long-admin-password'), auth = new AdminAuth(() => hash)
  for (let i = 0; i < 5; i++) await expect(auth.login('wrong-password', 'one')).rejects.toMatchObject({ status: 401 })
  await expect(auth.login('a-long-admin-password', 'one')).rejects.toMatchObject({ status: 429 })
  expect(await auth.login('a-long-admin-password', 'two')).toHaveLength(64)
})
it('validates ID, integer balances, cosmetics and audit reason before writing', async () => {
  const repository = new AdminRepository(), save = vi.spyOn(repository, 'change').mockResolvedValue({} as never)
  const service = new AdminService(repository)
  const base = { requestId: crypto.randomUUID(), reason: 'Test grant', action: 'resources', gold: 100, energy: 10, xiangqi: 1500, jieqi: 1000 }
  expect(() => service.change('not-an-id', base)).toThrow()
  expect(() => service.change('12345678', { ...base, gold: -1 })).toThrow()
  expect(() => service.change('12345678', { ...base, energy: 1.2 })).toThrow()
  expect(() => service.change('12345678', { ...base, reason: '' })).toThrow()
  expect(() => service.change('12345678', { ...base, action: 'avatar', code: 'avatar-999', equip: true })).toThrow()
  expect(save).not.toHaveBeenCalled()
  await service.change('12345678', base)
  expect(save).toHaveBeenCalledWith('12345678', base)
})
it('rejects player/foreign-origin requests and issues a separate HttpOnly admin session', async () => {
  const hash = await hashAdminPassword('a-long-admin-password'), auth = new AdminAuth(() => hash)
  const service = new AdminService(), search = vi.spyOn(service.repository, 'search').mockResolvedValue([])
  const app = express(); app.use(express.json()); app.use('/api/admin', adminRouter(auth, service))
  const errors: ErrorRequestHandler = (error, _req, res, _next) => { res.status(error instanceof AccountError ? error.status : 500).json({ error: error.message }) }
  app.use(errors)
  const server = createServer(app)
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const address = server.address(); if (!address || typeof address === 'string') throw new Error('No address')
  const origin = `http://127.0.0.1:${address.port}`, base = `${origin}/api/admin`
  try {
    expect((await fetch(`${base}/users`, { headers: { Cookie: 'ct_guest_session=player-token' } })).status).toBe(401)
    expect((await fetch(`${base}/login`, { method: 'POST', headers: { Origin: 'http://foreign.example', 'Content-Type': 'application/json' }, body: JSON.stringify({ password: 'a-long-admin-password' }) })).status).toBe(403)
    const login = await fetch(`${base}/login`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ password: 'a-long-admin-password' }) })
    expect(login.status).toBe(200)
    const cookie = login.headers.get('set-cookie')!
    expect(cookie).toContain('HttpOnly'); expect(cookie).toContain('SameSite=Strict'); expect(cookie).toContain('Path=/api/admin')
    expect((await fetch(`${base}/users?q=12345678`, { headers: { Cookie: cookie.split(';')[0] } })).status).toBe(200)
    expect(search).toHaveBeenCalledWith('12345678')
    await fetch(`${base}/logout`, { method: 'POST', headers: { Cookie: cookie.split(';')[0] } })
    expect((await fetch(`${base}/me`, { headers: { Cookie: cookie.split(';')[0] } })).status).toBe(401)
  } finally { await new Promise<void>(resolve => server.close(() => resolve())) }
})
