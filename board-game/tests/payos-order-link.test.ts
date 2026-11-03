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
}))

import {
  newPayosOrderCode,
  reservePayosOrderCode,
} from '../server/services/payosOrderLinkService'

describe('payOS order reservation', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    mocks.transaction.mockImplementation(async callback => callback({}))
    mocks.change.mockResolvedValue({ affectedRows: 1 })
  })

  it('generates a safe positive integer', () => {
    for (let i = 0; i < 100; i++) {
      const code = newPayosOrderCode()
      expect(Number.isSafeInteger(code)).toBe(true)
      expect(code).toBeGreaterThan(0)
    }
  })

  it('reserves an order code for a pending order', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([{
        provider: 'unconfigured',
        status: 'pending',
        payosOrderCode: null,
        expiresAt: new Date(Date.now() + 600000),
      }])

    const code = await reservePayosOrderCode('42', 'order-1')

    expect(code).toBeGreaterThan(0)
    expect(mocks.change).toHaveBeenCalledTimes(1)
    expect(mocks.change.mock.calls[0][1][0]).toBe(code)
  })

  it('reuses an existing payOS order code', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([{
        provider: 'payos',
        status: 'pending',
        payosOrderCode: '123456789',
        expiresAt: new Date(Date.now() + 600000),
      }])

    expect(await reservePayosOrderCode('42', 'order-1'))
      .toBe(123456789)

    expect(mocks.change).not.toHaveBeenCalled()
  })

  it('rejects expired orders', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([{
        provider: 'unconfigured',
        status: 'pending',
        payosOrderCode: null,
        expiresAt: new Date(Date.now() - 60000),
      }])

    await expect(
      reservePayosOrderCode('42', 'order-1'),
    ).rejects.toThrow('Đơn hàng đã hết hiệu lực.')

    expect(mocks.change).not.toHaveBeenCalled()
  })

  it('rejects another users order', async () => {
    mocks.rows
      .mockResolvedValueOnce([{ id: '42' }])
      .mockResolvedValueOnce([])

    await expect(
      reservePayosOrderCode('42', 'other-order'),
    ).rejects.toThrow('Không tìm thấy đơn hàng.')

    expect(mocks.change).not.toHaveBeenCalled()
  })
})
