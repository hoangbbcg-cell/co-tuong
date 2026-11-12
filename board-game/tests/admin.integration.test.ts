import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createApplication } from '../server/app'
import { hashAdminPassword } from '../server/services/adminAuth'
import { rows, change as sqlChange } from '../server/repositories/accountRepository'
import { io as clientSocket } from 'socket.io-client'

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
  it('records authenticated activity idempotently, filters reports, and counts two sockets as one online user', async () => {
    expect((await call('/admin/analytics', 'GET', undefined, playerCookie)).status).toBe(401)
    const id = crypto.randomUUID()
    const post = (events: unknown, cookie = playerCookie) => fetch(base + '/account/activity', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookie }, body: JSON.stringify({ events }),
    })
    expect((await post([{ id, kind: 'page', code: 'shop', userId: '999', createdAt: '1999' }])).status).toBe(204)
    expect((await post([{ id, kind: 'page', code: 'shop' }])).status).toBe(204)
    const stored = await rows('SELECT CAST(user_id AS CHAR) userId FROM user_activity_events WHERE id=?', [id])
    expect(stored).toHaveLength(1)
    const [player] = await rows('SELECT CAST(id AS CHAR) id FROM users WHERE public_id=?', [publicId])
    expect(stored[0].userId).toBe(player.id)
    expect((await post([{ id: crypto.randomUUID(), kind: 'login', code: 'google' }])).status).toBe(400)
    expect((await post([{ id: crypto.randomUUID(), kind: 'feature', code: 'purchase_item' }])).status).toBe(400)
    expect((await post([{ id: crypto.randomUUID(), kind: 'page', code: 'home' }], '')).status).toBe(401)
    const sockets = [0, 1].map(() => clientSocket(base.replace(/\/api$/, ''), {
      autoConnect: false, reconnection: false, transports: ['websocket'], extraHeaders: { Cookie: playerCookie },
    }))
    try {
      await Promise.all(sockets.map(socket => new Promise<void>((resolve, reject) => {
        socket.once('connect', resolve); socket.once('connect_error', reject); socket.connect()
      })))
      const result = await call(`/admin/analytics?q=${publicId}&kind=page&code=shop&status=online`)
      expect(result.status).toBe(200)
      expect(result.data.totals.online).toBe(1)
      expect(result.data.totals.offline + result.data.totals.online).toBe(result.data.totals.total)
      expect(result.data.totals.google + result.data.totals.guest).toBe(result.data.totals.total)
      expect(result.data.users).toEqual([expect.objectContaining({ publicId, online: true, accountType: 'guest' })])
      expect(result.data.events).toEqual([expect.objectContaining({ id, code: 'shop' })])
      expect(result.data.usage).toEqual([{ kind: 'page', code: 'shop', count: 1, users: 1 }])
      expect(JSON.stringify(result.data)).not.toMatch(/guest_session_hash|google_sub|password/)
      sockets[0].disconnect()
      await new Promise(resolve => setTimeout(resolve, 50))
      expect((await call('/admin/analytics')).data.totals.online).toBe(1)
      sockets[1].disconnect()
      await new Promise(resolve => setTimeout(resolve, 50))
      expect((await call(`/admin/analytics?q=${publicId}&status=offline`)).data.users).toEqual([expect.objectContaining({ publicId, online: false })])
    } finally { sockets.forEach(socket => socket.disconnect()) }
  })
  it('grants and revokes AI-controls permission independently with audit and request idempotence', async () => {
    const before = await call(`/admin/users/${publicId}`)
    expect(before.data.profile.aiControlsControl).toBe(false)
    const command = { action: 'ai-controls', enabled: true, reason: 'Grant hidden AI tools', requestId: crypto.randomUUID() }
    const granted = await call(`/admin/users/${publicId}`, 'POST', command)
    expect(granted.status).toBe(200)
    expect(granted.data.profile.aiControlsControl).toBe(true)
    expect(granted.data.profile.hovangWatermarkControl).toBe(before.data.profile.hovangWatermarkControl)
    expect((await call('/account/me', 'GET', undefined, playerCookie)).data.aiControlsControl).toBe(true)
    expect((await call(`/admin/users/${publicId}`, 'POST', command)).status).toBe(200)
    expect(await rows('SELECT id FROM admin_audit WHERE id=?', [command.requestId])).toHaveLength(1)
    expect((await call(`/admin/users/${publicId}`, 'POST', { ...command, enabled: false })).status).toBe(409)
    expect((await call(`/admin/users/${publicId}`, 'POST', { ...command, requestId: crypto.randomUUID() }, playerCookie)).status).toBe(401)
    const revoked = await call(`/admin/users/${publicId}`, 'POST', { ...command, enabled: false, requestId: crypto.randomUUID() })
    expect(revoked.data.profile.aiControlsControl).toBe(false)
  })
  it('classifies Google accounts and applies date filters and 50-row pagination on real MySQL', async () => {
    const guest = await call('/account/guest', 'POST', {}, '')
    const googleId = String(guest.data.id), googlePublicId = guest.data.publicId
    await sqlChange('UPDATE users SET google_sub=?,linked_at=UTC_TIMESTAMP(3) WHERE id=?', [`qa-${crypto.randomUUID()}`, googleId])
    const events = Array.from({ length: 51 }, () => ({ id: crypto.randomUUID(), kind: 'feature', code: 'friends' }))
    for (let i = 0; i < events.length; i += 20) {
      const response = await fetch(base + '/account/activity', { method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: guest.cookie }, body: JSON.stringify({ events: events.slice(i, i + 20) }) })
      expect(response.status).toBe(204)
    }
    const prefix = `/admin/analytics?q=${googlePublicId}&type=google&kind=feature&code=friends`
    const first = await call(prefix)
    expect(first.data.users).toEqual([expect.objectContaining({ accountType: 'google', publicId: googlePublicId })])
    expect(first.data.events).toHaveLength(50)
    expect(first.data.eventsHasMore).toBe(true)
    const second = await call(prefix + '&eventsOffset=50')
    expect(second.data.events).toHaveLength(1)
    expect(second.data.eventsHasMore).toBe(false)
    expect(new Set([...first.data.events, ...second.data.events].map(event => event.id)).size).toBe(51)
    await sqlChange('UPDATE user_activity_events SET created_at=DATE_SUB(UTC_TIMESTAMP(3),INTERVAL 40 DAY) WHERE id=?', [events[0].id])
    expect((await call(prefix + '&days=1')).data.usage).toEqual([{ kind: 'feature', code: 'friends', count: 50, users: 1 }])
    expect((await call(prefix + '&days=0')).data.usage).toEqual([{ kind: 'feature', code: 'friends', count: 51, users: 1 }])
    expect((await call(`/admin/analytics?q=${googlePublicId}&type=guest`)).data.users).toHaveLength(0)
    expect((await call('/admin/analytics?eventsOffset=-1')).status).toBe(400)
  })
})
