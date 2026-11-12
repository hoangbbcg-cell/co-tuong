import { describe, expect, it, vi } from 'vitest'
import { resolvePayosCheckout } from '../server/services/payosCheckoutService'
import type { PayosCheckoutClient } from '../server/services/payosCheckoutService'

const input = {
  orderCode: 123456789,
  amountVnd: 19000,
  description: 'HOVANG 100',
  expiresAt: new Date(Date.now() + 600000),
}

function client() {
  const get = vi.fn()
  const create = vi.fn()
  return {
    get,
    create,
    sdk: { paymentRequests: { get, create } } as unknown as PayosCheckoutClient,
  }
}

describe('payOS checkout resolution', () => {
  it('reuses a matching pending link', async () => {
    const c = client()
    c.get.mockResolvedValue({
      orderCode: input.orderCode,
      amount: input.amountVnd,
      status: 'PENDING',
      checkoutUrl: 'https://pay.payos.vn/example',
      qrCode: 'qr-data',
      id: 'link-123',
    })

    const result = await resolvePayosCheckout(input, c.sdk, 'https://hovanggame.com')

    expect(result.paymentLinkId).toBe('link-123')
    expect(c.create).not.toHaveBeenCalled()
  })

  it('creates only after provider-confirmed 404', async () => {
    const c = client()
    c.get.mockRejectedValue({ status: 404 })
    c.create.mockResolvedValue({
      orderCode: input.orderCode,
      checkoutUrl: 'https://pay.payos.vn/new',
      qrCode: 'qr-data',
      paymentLinkId: 'link-new',
    })

    const result = await resolvePayosCheckout(input, c.sdk, 'https://hovanggame.com')

    expect(result.paymentLinkId).toBe('link-new')
    expect(c.create).toHaveBeenCalledOnce()
  })

  it('does not create on network failure', async () => {
    const c = client()
    c.get.mockRejectedValue(new Error('Network failure'))

    await expect(
      resolvePayosCheckout(input, c.sdk, 'https://hovanggame.com'),
    ).rejects.toThrow('Network failure')

    expect(c.create).not.toHaveBeenCalled()
  })

  it('rejects mismatched payment amount', async () => {
    const c = client()
    c.get.mockResolvedValue({
      orderCode: input.orderCode,
      amount: 39000,
      status: 'PENDING',
    })

    await expect(
      resolvePayosCheckout(input, c.sdk, 'https://hovanggame.com'),
    ).rejects.toThrow('does not match')

    expect(c.create).not.toHaveBeenCalled()
  })

  it('does not reuse an already paid link', async () => {
    const c = client()
    c.get.mockResolvedValue({
      orderCode: input.orderCode,
      amount: input.amountVnd,
      status: 'PAID',
    })

    await expect(
      resolvePayosCheckout(input, c.sdk, 'https://hovanggame.com'),
    ).rejects.toThrow('cannot be reused')

    expect(c.create).not.toHaveBeenCalled()
  })
})