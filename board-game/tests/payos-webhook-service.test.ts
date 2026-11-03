import { describe, expect, it, vi } from 'vitest'
import { verifyPayosPayment } from '../server/services/payosWebhookService'

const validData = {
  orderCode: 123456789,
  amount: 19000,
  currency: 'VND',
  reference: 'TXN123456',
  code: '00',
}

const validBody = {
  code: '00',
  desc: 'success',
  success: true,
  data: validData,
  signature: 'signed-by-provider',
}

function client(data = validData) {
  return {
    webhooks: {
      verify: vi.fn().mockResolvedValue(data),
    },
  }
}

describe('payOS verified webhook', () => {
  it('accepts valid verified payment', async () => {
    const result = await verifyPayosPayment(validBody, client())
    expect(result).toEqual({
      orderCode: '123456789',
      amountVnd: 19000,
      transactionId: 'TXN123456',
    })
  })

  it('rejects invalid signature', async () => {
    const verifier = {
      webhooks: {
        verify: vi.fn().mockRejectedValue(new Error('Invalid signature')),
      },
    }

    await expect(
      verifyPayosPayment(validBody, verifier),
    ).rejects.toThrow('Invalid signature')
  })

  it('does not settle unsuccessful transactions', async () => {
    const result = await verifyPayosPayment(
      { ...validBody, success: false },
      client(),
    )
    expect(result).toBeNull()
  })

  it('rejects invalid verified amounts', async () => {
    await expect(
      verifyPayosPayment(
        validBody,
        client({ ...validData, amount: -1 }),
      ),
    ).rejects.toThrow('Invalid verified payment data')
  })

  it('rejects non-VND payments', async () => {
    await expect(
      verifyPayosPayment(
        validBody,
        client({ ...validData, currency: 'USD' }),
      ),
    ).rejects.toThrow('Invalid verified payment data')
  })

  it('rejects invalid transaction references', async () => {
    await expect(
      verifyPayosPayment(
        validBody,
        client({ ...validData, reference: '' }),
      ),
    ).rejects.toThrow('Invalid verified payment data')
  })

  it('rejects malformed bodies', async () => {
    await expect(
      verifyPayosPayment(null, client()),
    ).rejects.toThrow('Invalid webhook body')
  })
})