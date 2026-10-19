import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createApplication } from '../server/app'
import { hashAdminPassword } from '../server/services/adminAuth'
import { rows } from '../server/repositories/accountRepository'

describe.skipIf(process.env.DB_INTEGRATION !== '1')('admin with disposable MySQL', () => {
  let application: ReturnType<typeof createApplication>, base: string, adminCookie: string, playerCookie: string, publicId: string
  const previousHash = process.env.ADMIN_PASSWORD_HASH
  const call = async (path: string, method = 'GET', input?: unknown, cookie = adminCookie) => {
    const response = await fetch(base + path, { method, headers: { 'Content-Type': 'application/json', Cookie: cookie ?? '' }, body: input === undefined ? undefined : JSON.stringify(input) })
    return { status: response.status, data: await response.json(), cookie: response.headers.getSetCookie().map(value => value.split(';')[0]).join('; ') }
  }
  beforeAll(async () => {
    process.env.ADMIN_PASSWORD_HASH = await hashAdminPassword('disposable-test-password')
    application = createApplication()
    await new Promise<void>(resolve => application.http.listen(0, '127.0.0.1', resolve))
    const address = application.http.address(); if (!address || typeof address === 'string') throw new Error('No server')
    base = `http://127.0.0.1:${address.port}/api`
    const login = await call('/admin/login', 'POST', { password: 'disposable-test-password' }, '')
    expect(login.status).toBe(200); adminCookie = login.cookie
    const guest = await call('/account/guest', 'POST', {}, '')
    playerCookie = guest.cookie; publicId = guest.data.publicId
  })
  afterAll(async () => {
    if (previousHash === undefined) delete process.env.ADMIN_PASSWORD_HASH; else process.env.ADMIN_PASSWORD_HASH = previousHash
    await application?.close()
  })
  it('sets resources and both Elo values atomically, records ledger/audit and deduplicates retries', async () => {
    const command = { requestId: crypto.randomUUID(), reason: 'Disposable QA grant', action: 'resources', gold: 125000, energy: 50, xiangqi: 1800, jieqi: 1600 }
    const result = await call(`/admin/users/${publicId}`, 'POST', command)
    expect(result.status).toBe(200)
    expect(result.data.profile).toMatchObject({ gold: '125000', energy: 50 })
    expect(result.data.profile.stats).toEqual(expect.arrayContaining([expect.objectContaining({ variant: 'xiangqi', elo: 1800 }), expect.objectContaining({ variant: 'jieqi', elo: 1600 })]))
    expect((await call(`/admin/users/${publicId}`, 'POST', command)).status).toBe(200)
    expect((await call(`/admin/users/${publicId}`, 'POST', { ...command, gold: 1 })).status).toBe(409)
    expect((await rows('SELECT id FROM admin_audit WHERE id=?', [command.requestId]))).toHaveLength(1)
    expect((await rows('SELECT id FROM resource_events WHERE idempotency_key LIKE ?', [`admin:${command.requestId}:%`]))).toHaveLength(2)
    const profile = await call('/account/me', 'GET', undefined, playerCookie)
    expect(profile.data.gold).toBe('125000'); expect(profile.data.energy).toBe(50)
  })
  it('grants/equips new shop avatars and honors, while players cannot self-grant', async () => {
    expect((await call('/account/avatar', 'PATCH', { avatarCode: 'avatar-15', avatarFrameCode: 'frame-0' }, playerCookie)).status).toBe(403)
    const avatar = await call(`/admin/users/${publicId}`, 'POST', { action: 'avatar', requestId: crypto.randomUUID(), reason: 'QA new shop avatar', code: 'avatar-15', equip: true })
    expect(avatar.status).toBe(200); expect(avatar.data.profile.avatarCode).toBe('avatar-15')
    expect((await call('/account/avatar', 'PATCH', { avatarCode: 'avatar-15', avatarFrameCode: 'frame-0' }, playerCookie)).status).toBe(200)
    const catalog = await call('/admin/catalog')
    const code = catalog.data[0].code
    const honor = await call(`/admin/users/${publicId}`, 'POST', { action: 'honor', requestId: crypto.randomUUID(), reason: 'QA honorary grant', code, equip: true })
    expect(honor.status).toBe(200); expect(honor.data.honors).toEqual(expect.arrayContaining([expect.objectContaining({ code, selected: 1 })]))
    const invalid = crypto.randomUUID()
    expect((await call(`/admin/users/${publicId}`, 'POST', { action: 'honor', requestId: invalid, reason: 'QA invalid honor', code: 'does-not-exist', equip: true })).status).toBe(400)
    expect(await rows('SELECT id FROM admin_audit WHERE id=?', [invalid])).toHaveLength(0)
    expect((await call(`/admin/users/${publicId}`, 'POST', { action: 'frame', requestId: crypto.randomUUID(), reason: 'No admin access', code: 'frame-1', equip: true }, playerCookie)).status).toBe(401)
  })
})
