import { describe, expect, it, vi } from 'vitest'
import {
  createPayosPaymentLink,
  payosEnabled,
} from '../server/services/payosService'

describe('payOS payment service', () => {
  it('is disabled by default', () => {
    const previous = process.env.PAYOS_PAYMENT_ENABLED
    delete process.env.PAYOS_PAYMENT_ENABLED
    try {
      expect(payosEnabled()).toBe(false)
    } finally {
      if (previous === undefined) {
        delete process.env.PAYOS_PAYMENT_ENABLED
      } else {
        process.env.PAYOS_PAYMENT_ENABLED = previous
      }
    }
  })

  it('creates a payment request with correct values', async () => {
    const expiresAt = new Date(Date.now() + 600000)
    const create = vi.fn().mockResolvedValue({
      orderCode: 123456,
      checkoutUrl: 'https://pay.payos.vn/test',
      qrCode: '000201TEST',
      paymentLinkId: 'payment-test',
    })

    const result = await createPayosPaymentLink(
      {
        orderCode: 123456,
        amountVnd: 19000,
        description: 'HOVANG 123456',
        expiresAt,
      },
      { paymentRequests: { create } },
      'https://hovanggame.com',
    )

    expect(create).toHaveBeenCalledWith({
      orderCode: 123456,
      amount: 19000,
      description: 'HOVANG 123456',
      returnUrl: 'https://hovanggame.com/payment/return',
      cancelUrl: 'https://hovanggame.com/payment/cancel',
      expiredAt: Math.floor(expiresAt.getTime() / 1000),
    })

    expect(result.paymentLinkId).toBe('payment-test')
  })

  it('rejects invalid amounts', async () => {
    const create = vi.fn()

    await expect(createPayosPaymentLink(
      {
        orderCode: 123,
        amountVnd: -1,
        description: 'HOVANG 123',
        expiresAt: new Date(Date.now() + 600000),
      },
      { paymentRequests: { create } },
      'https://hovanggame.com',
    )).rejects.toThrow('Invalid payOS payment data')

    expect(create).not.toHaveBeenCalled()
  })

  it('rejects HTTP origins', async () => {
    const create = vi.fn()

    await expect(createPayosPaymentLink(
      {
        orderCode: 123,
        amountVnd: 19000,
        description: 'HOVANG 123',
        expiresAt: new Date(Date.now() + 600000),
      },
      { paymentRequests: { create } },
      'http://hovanggame.com',
    )).rejects.toThrow('Invalid public payment origin')

    expect(create).not.toHaveBeenCalled()
  })
})
