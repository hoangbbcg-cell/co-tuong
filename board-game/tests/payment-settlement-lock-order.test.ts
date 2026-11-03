import { describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  rows: vi.fn(),
  change: vi.fn(),
  transaction: vi.fn(),
}))

vi.mock('../server/repositories/accountRepository', () => ({
  rows: mocks.rows,
  change: mocks.change,
  transaction: mocks.transaction,
  AccountRepository: class {
    resources = vi.fn()
    ledger = vi.fn()
  },
}))

import { PaymentRepository } from '../server/repositories/paymentRepository'

describe('payment settlement lock ordering', () => {
  it('locks the user before locking the payment order', async () => {
    const queries: string[] = []

    mocks.transaction.mockImplementation(async callback => callback({}))

    mocks.rows.mockImplementation(async (sql: string) => {
      queries.push(sql)

      if (sql.includes('FROM payment_orders')) {
        return [{
          id: 'test-order',
          userId: '42',
          productCode: 'energy_100',
          amountVnd: 19000,
          provider: 'payos',
          status: 'paid',
          transactionId: 'TX123',
        }]
      }

      if (sql.includes('FROM users')) {
        return [{ id: '42' }]
      }

      return []
    })

    await new PaymentRepository().settleVerifiedPayosPayment({
      orderCode: '123456789',
      amountVnd: 19000,
      transactionId: 'TX123',
    })

    const userLock = queries.findIndex(
      sql => sql.includes('FROM users') && sql.includes('FOR UPDATE'),
    )

    const orderLock = queries.findIndex(
      sql => sql.includes('FROM payment_orders') && sql.includes('FOR UPDATE'),
    )

    expect(userLock).toBeGreaterThanOrEqual(0)
    expect(orderLock).toBeGreaterThan(userLock)
  })
})