import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  rows: vi.fn(),
  change: vi.fn(),
  transaction: vi.fn(),
}))

vi.mock('../server/repositories/accountRepository', () => ({
  rows: mocks.rows,
  change: mocks.change,
  transaction: mocks.transaction,
  AccountRepository: class {},
}))

import { PaymentRepository } from '../server/repositories/paymentRepository'

const pendingId = '11111111-1111-4111-8111-111111111111'

function mockOrderResult() {
  return [{
    id: pendingId,
    userId: '42',
    productCode: 'energy_100',
    amountVnd: 19000,
    payosOrderCode: null,
    provider: 'unconfigured',
    status: 'pending',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 900000),
    paidAt: null,
  }]
}

describe('payment order creation policy', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    mocks.transaction.mockImplementation(async callback => callback({}))
    mocks.change.mockResolvedValue({ affectedRows: 1 })
  })

  it('rejects an unknown product before querying MySQL', async () => {
    await expect(
      new PaymentRepository().createOrder('42', 'invalid_product'),
    ).rejects.toThrow('Gói năng lượng không hợp lệ.')

    expect(mocks.transaction).not.toHaveBeenCalled()
  })

  it('reuses a pending order for 100 energy', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([{ id: pendingId }])
      .mockResolvedValueOnce(mockOrderResult())

    const result = await new PaymentRepository()
      .createOrder('42', 'energy_100')

    expect(result?.id).toBe(pendingId)

    const inserts = mocks.change.mock.calls.filter(
      ([sql]) => String(sql).includes('INSERT INTO payment_orders'),
    )
    expect(inserts).toHaveLength(0)
  })

  it('creates a new 100-energy order without checking unlimited subscription', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(mockOrderResult())

    await new PaymentRepository().createOrder('42', 'energy_100')

    expect(mocks.rows.mock.calls.some(
      ([sql]) => String(sql).includes('FROM energy_subscriptions'),
    )).toBe(false)

    expect(mocks.change.mock.calls.some(
      ([sql]) => String(sql).includes('INSERT INTO payment_orders'),
    )).toBe(true)
  })

  it('rejects buying unlimited while subscription is active', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([{ unlimited_until: new Date(Date.now() + 86400000) }])

    await expect(
      new PaymentRepository().createOrder('42', 'energy_unlimited_30d'),
    ).rejects.toThrow('Gói vô hạn đang còn hiệu lực')

    expect(mocks.change.mock.calls.some(
      ([sql]) => String(sql).includes('INSERT INTO payment_orders'),
    )).toBe(false)
  })

  it('allows unlimited purchase after subscription expiry', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(mockOrderResult())

    await new PaymentRepository()
      .createOrder('42', 'energy_unlimited_30d')

    expect(mocks.change.mock.calls.some(
      ([sql]) => String(sql).includes('INSERT INTO payment_orders'),
    )).toBe(true)
  })

  it('rejects inactive accounts', async () => {
    mocks.rows.mockResolvedValueOnce([])

    await expect(
      new PaymentRepository().createOrder('42', 'energy_100'),
    ).rejects.toThrow('Tài khoản không hoạt động.')

    expect(mocks.change).not.toHaveBeenCalled()
  })

  it('expires stale unconfigured pending orders before selecting reusable orders', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(mockOrderResult())

    await new PaymentRepository().createOrder('42', 'energy_100')

    const expireIndex = mocks.change.mock.calls.findIndex(
      ([sql]) => String(sql).includes("SET status='expired'"),
    )
    const insertIndex = mocks.change.mock.calls.findIndex(
      ([sql]) => String(sql).includes('INSERT INTO payment_orders'),
    )

    expect(expireIndex).toBeGreaterThanOrEqual(0)
    expect(insertIndex).toBeGreaterThan(expireIndex)
  })
})