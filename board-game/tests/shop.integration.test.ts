import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { createApplication } from '../server/app'
import { AdminService } from '../server/services/adminService'
import { AccountRepository, rows } from '../server/repositories/accountRepository'

describe.skipIf(process.env.DB_INTEGRATION !== '1')('real shop purchases on disposable MySQL', () => {
  let app: ReturnType<typeof createApplication>, base: string
  let saleProducts: { id: string; kind: 'avatar' | 'frame'; price: number }[]
  const request = async (path: string, method = 'GET', body?: unknown, cookie = '') => {
    const response = await fetch(base + path, { method, headers: { Cookie: cookie, 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) })
    return { status: response.status, data: await response.json(), cookie: response.headers.getSetCookie().map(value => value.split(';')[0]).join('; ') }
  }
  const guest = async (gold = 0) => {
    const user = await request('/guest', 'POST', {})
    if (gold) await new AdminService().change(user.data.publicId, { action: 'resources', requestId: crypto.randomUUID(), reason: 'Disposable shop QA balance', gold, energy: 5, xiangqi: 1000, jieqi: 1000 })
    return user
  }
  const featured = (kind: 'avatar' | 'frame') => {
    const product = saleProducts.find(item => item.kind === kind)
    if (!product) throw new Error(`No featured ${kind} in daily shop`)
    return product
  }
  const buy = (cookie: string, productId: string, requestId: string = crypto.randomUUID(), extra = {}) => request('/shop/purchase', 'POST', { productId, requestId, ...extra }, cookie)
  beforeAll(async () => {
    app = createApplication(); await new Promise<void>(resolve => app.http.listen(0, '127.0.0.1', resolve))
    const address = app.http.address(); if (!address || typeof address === 'string') throw new Error('No address')
    base = `http://127.0.0.1:${address.port}/api/account`
    const shopper = await guest()
    const daily = await request('/shop/daily', 'GET', undefined, shopper.cookie)
    expect(daily.status).toBe(200)
    saleProducts = daily.data.products
    expect(saleProducts).toHaveLength(6)
    expect(saleProducts.filter(item => item.kind === 'avatar')).toHaveLength(3)
    expect(saleProducts.filter(item => item.kind === 'frame')).toHaveLength(3)
  })
  afterAll(async () => { vi.restoreAllMocks(); await app?.close() })
  it('requires authentication, rejects retired avatars and persists active avatar purchases', async () => {
    const product = featured('avatar')
    expect((await buy('', product.id)).status).toBe(401)
    const user = await guest(6000)
    expect((await buy(user.cookie, 'avatar-15')).status).toBe(404)
    expect((await buy(user.cookie, 'avatar-0')).status).toBe(404)
    const result = await buy(user.cookie, product.id, crypto.randomUUID(), { price: 0, code: 'avatar-17', userId: 'other' })
    expect(result.status).toBe(200); expect(result.data.gold).toBe('3000')
    expect(result.data.cosmetics).toContainEqual({ kind: 'avatar', code: product.id })
    expect(result.data.avatarCode).toBe('avatar-0')
    expect((await request('/me', 'GET', undefined, user.cookie)).data.cosmetics).toContainEqual({ kind: 'avatar', code: product.id })
    expect((await request('/avatar', 'PATCH', { avatarCode: product.id, avatarFrameCode: 'frame-0' }, user.cookie)).status).toBe(200)
    const duplicate = await buy(user.cookie, product.id)
    expect(duplicate.status).toBe(409); expect(duplicate.data.error).toContain('Bạn đã có avatar này')
    expect((await request('/me', 'GET', undefined, user.cookie)).data.gold).toBe('3000')
  })
  it('replays the same request once and rejects reuse for another product', async () => {
    const product = featured('frame'), otherProduct = saleProducts.find(item => item.kind === 'frame' && item.id !== product.id)
    if (!otherProduct) throw new Error('Daily shop needs two distinct featured frames for the idempotency check')
    const user = await guest(6000), key = crypto.randomUUID()
    expect((await buy(user.cookie, product.id, key)).status).toBe(200)
    const again = await buy(user.cookie, product.id, key)
    expect(again.status).toBe(200); expect(again.data.gold).toBe('3000')
    expect((await buy(user.cookie, otherProduct.id, key)).status).toBe(409)
    const duplicate = await buy(user.cookie, product.id)
    expect(duplicate.status).toBe(409); expect(duplicate.data.error).toContain('Bạn đã có viền này')
    expect(await rows('SELECT id FROM resource_events WHERE idempotency_key=?', [`shop:${user.data.id}:${key}`])).toHaveLength(1)
    expect((await request('/avatar', 'PATCH', { avatarCode: 'avatar-0', avatarFrameCode: product.id }, user.cookie)).status).toBe(200)
    expect((await request('/avatar', 'PATCH', { avatarCode: 'avatar-0', avatarFrameCode: otherProduct.id }, user.cookie)).status).toBe(403)
    expect((await request('/me', 'GET', undefined, user.cookie)).data.avatarFrameCode).toBe(product.id)
  })
  it('serializes concurrent duplicate purchases and prevents overspending on different items', async () => {
    const product = featured('avatar'), otherProduct = featured('frame')
    const same = await guest(3000)
    const duplicates = await Promise.all([buy(same.cookie, product.id), buy(same.cookie, product.id)])
    expect(duplicates.map(result => result.status).sort()).toEqual([200, 409])
    expect((await request('/me', 'GET', undefined, same.cookie)).data.gold).toBe('0')
    const limited = await guest(3000)
    const different = await Promise.all([buy(limited.cookie, product.id), buy(limited.cookie, otherProduct.id)])
    expect(different.map(result => result.status).sort()).toEqual([200, 400])
    const profile = (await request('/me', 'GET', undefined, limited.cookie)).data
    expect(profile.gold).toBe('0'); expect(profile.cosmetics).toHaveLength(1)
  })
  it('rejects insufficient funds and rolls back debit/inventory when ledger writing fails', async () => {
    const product = featured('frame')
    const poor = await guest()
    expect((await buy(poor.cookie, product.id)).status).toBe(400)
    expect((await request('/me', 'GET', undefined, poor.cookie)).data.cosmetics).toHaveLength(0)
    const user = await guest(6000)
    const ledger = vi.spyOn(AccountRepository.prototype, 'ledger').mockRejectedValueOnce(new Error('Simulated ledger failure'))
    try { expect((await buy(user.cookie, product.id)).status).toBe(500) } finally { ledger.mockRestore() }
    const profile = (await request('/me', 'GET', undefined, user.cookie)).data
    expect(profile.gold).toBe('6000'); expect(profile.cosmetics).toHaveLength(0)
    expect((await buy(user.cookie, 'not-a-product')).status).toBe(404)
    expect((await buy(user.cookie, featured('avatar').id, 'invalid-key')).status).toBe(400)
  })
})
