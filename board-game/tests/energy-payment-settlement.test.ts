import { describe, expect, it, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  rows: vi.fn(),
  change: vi.fn(),
  transaction: vi.fn(),
  resources: vi.fn(),
  ledger: vi.fn(),
}))

vi.mock('../server/repositories/accountRepository', () => ({
  rows: mocks.rows,
  change: mocks.change,
  transaction: mocks.transaction,
  AccountRepository: class {
    resources = mocks.resources
    ledger = mocks.ledger
  },
}))

import { PaymentRepository } from '../server/repositories/paymentRepository'

const payment = {
  orderCode: '123456789',
  amountVnd: 19000,
  transactionId: 'PAYOS_TX_123',
}

function order(overrides: Record<string, unknown> = {}) {
  return {
    id: 'test-order-1',
    userId: '42',
    productCode: 'energy_100',
    amountVnd: 19000,
    provider: 'payos',
    status: 'pending',
    transactionId: null,
    ...overrides,
  }
}

describe('verified payment settlement', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    mocks.transaction.mockImplementation(async callback =>
      callback({}),
    )

    mocks.change.mockResolvedValue({ affectedRows: 1 })
    mocks.resources.mockResolvedValue({ energy: 5 })
    mocks.ledger.mockResolvedValue(undefined)
  })

  it('grants 100 energy once for a valid payment', async () => {
    mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([order()])
      .mockResolvedValueOnce([{ id: '42' }])

    const result = await new PaymentRepository()
      .settleVerifiedPayosPayment(payment)

    expect(result).toBe('paid')
    expect(mocks.ledger).toHaveBeenCalledOnce()
    expect(mocks.ledger).toHaveBeenCalledWith(
      expect.anything(),
      '42',
      'energy',
      100,
      'payment_energy_100',
      'payment:test-order-1',
    )
  })

  it('does not grant again for an already paid order', async () => {
    mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([
      order({ status: 'paid', transactionId: payment.transactionId }),
    ])

    const result = await new PaymentRepository()
      .settleVerifiedPayosPayment(payment)

    expect(result).toBe('already_paid')
    expect(mocks.resources).not.toHaveBeenCalled()
    expect(mocks.ledger).not.toHaveBeenCalled()
    expect(mocks.change).not.toHaveBeenCalled()
  })

  it('rejects an incorrect amount', async () => {
    mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([order()])

    await expect(
      new PaymentRepository().settleVerifiedPayosPayment({
        ...payment,
        amountVnd: 1000,
      }),
    ).rejects.toThrow()

    expect(mocks.ledger).not.toHaveBeenCalled()
    expect(mocks.change).not.toHaveBeenCalled()
  })

  it('rejects a different transaction on an already paid order', async () => {
    mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([
      order({ status: 'paid', transactionId: 'OTHER_TX' }),
    ])

    await expect(
      new PaymentRepository().settleVerifiedPayosPayment(payment),
    ).rejects.toThrow()

    expect(mocks.ledger).not.toHaveBeenCalled()
  })

  it('rejects an order not linked to payOS', async () => {
    mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([
      order({ provider: 'unconfigured' }),
    ])

    await expect(
      new PaymentRepository().settleVerifiedPayosPayment(payment),
    ).rejects.toThrow()

    expect(mocks.ledger).not.toHaveBeenCalled()
  })

  it('propagates a ledger failure', async () => {
    mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([order()])
      .mockResolvedValueOnce([{ id: '42' }])

    mocks.ledger.mockRejectedValueOnce(new Error('Ledger failed'))

    await expect(
      new PaymentRepository().settleVerifiedPayosPayment(payment),
    ).rejects.toThrow('Ledger failed')
  })

  it('extends a 30-day subscription', async () => {
    mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([
        order({
          productCode: 'energy_unlimited_30d',
          amountVnd: 39000,
        }),
      ])
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([])

    const result = await new PaymentRepository()
      .settleVerifiedPayosPayment({
        ...payment,
        amountVnd: 39000,
      })

    expect(result).toBe('paid')
    expect(mocks.change).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO energy_subscriptions'),
      expect.arrayContaining(['42']),
      expect.anything(),
    )
  })

  it('rejects cancelled and expired orders', async () => {
    for (const status of ['cancelled', 'expired']) {
      vi.clearAllMocks()
      mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([order({ status })])

      await expect(
        new PaymentRepository().settleVerifiedPayosPayment(payment),
      ).resolves.toBe('review_required')

      expect(mocks.ledger).not.toHaveBeenCalled()
      expect(mocks.change).toHaveBeenCalledWith(
        expect.stringContaining("fulfillment_status='review_required'"),
        expect.anything(),
        expect.anything(),
      )
    }
  })

  it('rejects invalid transaction identifiers', async () => {
    for (const transactionId of ['', 'x'.repeat(129), 'bad\nvalue']) {
      await expect(
        new PaymentRepository().settleVerifiedPayosPayment({
          ...payment,
          transactionId,
        }),
      ).rejects.toThrow()
    }

    expect(mocks.rows).not.toHaveBeenCalled()
    expect(mocks.change).not.toHaveBeenCalled()
  })

  it('rejects invalid order codes', async () => {
    for (const orderCode of ['', '0', '-123', 'abc', '1'.repeat(20)]) {
      await expect(
        new PaymentRepository().settleVerifiedPayosPayment({
          ...payment,
          orderCode,
        }),
      ).rejects.toThrow()
    }

    expect(mocks.rows).not.toHaveBeenCalled()
  })

  it('marks energy overflow for review without granting', async () => {
    mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([order()])
      .mockResolvedValueOnce([{ id: '42' }])

    mocks.resources.mockResolvedValueOnce({
      energy: 4294967295,
    })

    await expect(
      new PaymentRepository().settleVerifiedPayosPayment(payment),
    ).resolves.toBe('review_required')

    expect(mocks.ledger).not.toHaveBeenCalled()
    expect(mocks.change).toHaveBeenCalledWith(
      expect.stringContaining("fulfillment_status='review_required'"),
      expect.anything(),
      expect.anything(),
    )
  })

  it('rejects payment status update conflicts', async () => {
    mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([order()])
      .mockResolvedValueOnce([{ id: '42' }])

    mocks.change
      .mockResolvedValueOnce({ affectedRows: 1 })
      .mockResolvedValueOnce({ affectedRows: 0 })

    await expect(
      new PaymentRepository().settleVerifiedPayosPayment(payment),
    ).rejects.toThrow('Payment settlement state conflict')
  })

  it('rejects a transaction already assigned to another order', async () => {
    mocks.rows.mockResolvedValueOnce([{ userId: '42' }]).mockResolvedValueOnce([{ id: '42' }]).mockResolvedValueOnce([
      order({ status: 'paid', transactionId: 'DIFFERENT_TX' }),
    ])

    await expect(
      new PaymentRepository().settleVerifiedPayosPayment(payment),
    ).rejects.toThrow()

    expect(mocks.ledger).not.toHaveBeenCalled()
  })


  it('marks an inactive account payment for review', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ userId: '42' }])
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([order()])
      .mockResolvedValueOnce([])

    const result = await new PaymentRepository()
      .settleVerifiedPayosPayment(payment)

    expect(result).toBe('review_required')
    expect(mocks.ledger).not.toHaveBeenCalled()
    expect(mocks.resources).not.toHaveBeenCalled()
    expect(mocks.change).toHaveBeenCalledWith(
      expect.stringContaining("fulfillment_status='review_required'"),
      expect.anything(),
      expect.anything(),
    )
  })

  it('marks an active unlimited subscription payment for review', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ userId: '42' }])
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([
        order({
          productCode: 'energy_unlimited_30d',
          amountVnd: 39000,
        }),
      ])
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([{
        unlimitedUntil: new Date(Date.now() + 86400000),
      }])

    const result = await new PaymentRepository()
      .settleVerifiedPayosPayment({
        ...payment,
        amountVnd: 39000,
      })

    expect(result).toBe('review_required')
    expect(mocks.change).toHaveBeenCalledWith(
      expect.stringContaining("fulfillment_status='review_required'"),
      expect.anything(),
      expect.anything(),
    )
    expect(mocks.change).not.toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO energy_subscriptions'),
      expect.anything(),
      expect.anything(),
    )
  })

  it('marks cancelled and expired payments for review without granting', async () => {
    for (const status of ['cancelled', 'expired']) {
      vi.clearAllMocks()
      mocks.rows
        .mockResolvedValueOnce([{ userId: '42' }])
        .mockResolvedValueOnce([{ id: '42' }])
        .mockResolvedValueOnce([order({ status })])

      const result = await new PaymentRepository()
        .settleVerifiedPayosPayment(payment)

      expect(result).toBe('review_required')
      expect(mocks.ledger).not.toHaveBeenCalled()
      expect(mocks.change).toHaveBeenCalledWith(
        expect.stringContaining("fulfillment_status='review_required'"),
        expect.anything(),
        expect.anything(),
      )
    }
  })
})
