import { beforeEach, describe, expect, it, vi } from 'vitest'
import express from 'express'
import { createServer } from 'node:http'
import { paymentRouter } from '../server/controllers/paymentController'

const mocks = vi.hoisted(() => ({
  verify: vi.fn(),
  settle: vi.fn(),
}))

vi.mock('../server/services/payosWebhookService', () => ({
  payosWebhookClient: () => ({ webhooks: { verify: mocks.verify } }),
  verifyPayosPayment: async (
    body: unknown,
    client: { webhooks: { verify: (body: unknown) => Promise<unknown> } },
  ) => client.webhooks.verify(body),
}))

vi.mock('../server/repositories/paymentRepository', () => ({
  PaymentRepository: class {
    settleVerifiedPayosPayment = mocks.settle
  },
}))

describe('payOS webhook HTTP', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  async function requestWebhook() {
    const app = express()
    app.use(express.json({ limit: '4kb' }))
    app.use('/api/payments', paymentRouter({
      authenticate: vi.fn().mockResolvedValue(null),
    } as never))

    const server = createServer(app)
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))

    try {
      const address = server.address()
      if (!address || typeof address === 'string') {
        throw new Error('Missing server address')
      }

      return await fetch(
        `http://127.0.0.1:${address.port}/api/payments/webhook`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            code: '00',
            success: true,
            data: { orderCode: 123 },
            signature: 'test',
          }),
        },
      )
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close(error => error ? reject(error) : resolve()),
      )
    }
  }

  it('accepts a verified transaction without cookie auth', async () => {
    mocks.verify.mockResolvedValue({
      orderCode: '123',
      amountVnd: 19000,
      transactionId: 'TX123',
    })
    mocks.settle.mockResolvedValue('paid')

    const response = await requestWebhook()

    expect(response.status).toBe(200)
    expect(mocks.settle).toHaveBeenCalledOnce()
  })

  it('does not settle when signature verification fails', async () => {
    mocks.verify.mockRejectedValue(new Error('Invalid signature'))

    const response = await requestWebhook()

    expect(response.status).not.toBe(200)
    expect(mocks.settle).not.toHaveBeenCalled()
  })

  it('does not acknowledge a failed database settlement', async () => {
    mocks.verify.mockResolvedValue({
      orderCode: '123',
      amountVnd: 19000,
      transactionId: 'TX123',
    })
    mocks.settle.mockRejectedValue(new Error('Database unavailable'))

    const response = await requestWebhook()

    expect(response.status).not.toBe(200)
    expect(mocks.settle).toHaveBeenCalledOnce()
  })

  it('acknowledges an already settled transaction', async () => {
    mocks.verify.mockResolvedValue({
      orderCode: '123',
      amountVnd: 19000,
      transactionId: 'TX123',
    })
    mocks.settle.mockResolvedValue('already_paid')

    const response = await requestWebhook()

    expect(response.status).toBe(200)
    expect(mocks.settle).toHaveBeenCalledOnce()
  })
})