import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import express from 'express'
import type { Server } from 'node:http'

const mocks = vi.hoisted(() => ({
  createOrder: vi.fn(),
  getOrder: vi.fn(),
  settle: vi.fn(),
}))

vi.mock('../server/repositories/paymentRepository', () => ({
  PaymentRepository: class {
    createOrder = mocks.createOrder
    getOrder = mocks.getOrder
    settleVerifiedPayosPayment = mocks.settle
  },
}))

import { paymentRouter } from '../server/controllers/paymentController'

const order = {
  id: '11111111-1111-4111-8111-111111111111',
  userId: '42',
  productCode: 'energy_100',
  amountVnd: 19000,
  provider: 'unconfigured',
  status: 'pending',
}

describe('payment orders HTTP API', () => {
  let server: Server
  let baseUrl: string

  const authenticate = vi.fn()

  beforeEach(async () => {
    vi.resetAllMocks()

    authenticate.mockResolvedValue('42')
    mocks.createOrder.mockResolvedValue(order)
    mocks.getOrder.mockResolvedValue(order)

    const app = express()
    app.use(express.json({ limit: '4kb' }))
    app.use('/api/payments', paymentRouter({ authenticate } as any))

    app.use((
      error: any,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res.status(error.status || error.statusCode || 500).json({
        error: error.message,
      })
    })

    server = await new Promise<Server>((resolve, reject) => {
      const listener = app.listen(0, '127.0.0.1', () => resolve(listener))
      listener.once('error', reject)
    })

    const address = server.address()
    if (!address || typeof address === 'string') {
      throw new Error('HTTP test server address unavailable')
    }

    baseUrl = `http://127.0.0.1:${address.port}`
  })

  afterEach(async () => {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server.close(error => error ? reject(error) : resolve())
      })
    }
  })

  it('creates a pending order for an authenticated account', async () => {
    const response = await fetch(`${baseUrl}/api/payments/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', Origin: 'http://127.0.0.1:' + new URL(baseUrl).port,
        Cookie: `ct_guest_session=${'a'.repeat(64)}`,
      },
      body: JSON.stringify({ productCode: 'energy_100' }),
    })

    expect(response.status).toBe(201)
    expect(await response.json()).toEqual(order)
    expect(mocks.createOrder).toHaveBeenCalledWith('42', 'energy_100')
    expect(mocks.settle).not.toHaveBeenCalled()
  })

  it('rejects unauthenticated users', async () => {
    authenticate.mockResolvedValue(null)

    const response = await fetch(`${baseUrl}/api/payments/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productCode: 'energy_100' }),
    })

    expect(response.status).toBe(401)
    expect(mocks.createOrder).not.toHaveBeenCalled()
  })

  it('rejects invalid product codes', async () => {
    mocks.createOrder.mockRejectedValueOnce(
      Object.assign(new Error('Gói năng lượng không hợp lệ.'), { status: 404 }),
    )

    const response = await fetch(`${baseUrl}/api/payments/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: baseUrl,
      },
      body: JSON.stringify({ productCode: 'invalid_product' }),
    })

    expect(response.status).toBe(404)
    expect(mocks.createOrder).toHaveBeenCalledWith('42', 'invalid_product')
    expect(mocks.settle).not.toHaveBeenCalled()
  })

  it('uses authenticated user identity when reading orders', async () => {
    const response = await fetch(
      `${baseUrl}/api/payments/orders/${order.id}`,
    )

    expect(response.status).toBe(200)
    expect(mocks.getOrder).toHaveBeenCalledWith('42', order.id)
  })

  it('returns 404 when the order is not owned or not found', async () => {
    mocks.getOrder.mockResolvedValue(null)

    const response = await fetch(
      `${baseUrl}/api/payments/orders/${order.id}`,
    )

    expect(response.status).toBe(404)
  })

  it('does not invoke settlement when listing products', async () => {
    const response = await fetch(`${baseUrl}/api/payments/products`)

    expect(response.status).toBe(200)
    expect(mocks.settle).not.toHaveBeenCalled()
  })
  it('rejects missing Origin on order creation', async () => {
    const response = await fetch(`${baseUrl}/api/payments/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productCode: 'energy_100' }),
    })

    expect(response.status).toBe(403)
    expect(mocks.createOrder).not.toHaveBeenCalled()
  })

  it('rejects cross-origin order creation', async () => {
    const response = await fetch(`${baseUrl}/api/payments/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://attacker.example',
      },
      body: JSON.stringify({ productCode: 'energy_100' }),
    })

    expect(response.status).toBe(403)
    expect(mocks.createOrder).not.toHaveBeenCalled()
  })

  it('limits repeated order creation by authenticated account', async () => {
    const statuses: number[] = []

    for (let i = 0; i < 6; i++) {
      const response = await fetch(`${baseUrl}/api/payments/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: baseUrl,
        },
        body: JSON.stringify({ productCode: 'energy_100' }),
      })
      statuses.push(response.status)
    }

    expect(statuses.slice(0, 5)).toEqual([201, 201, 201, 201, 201])
    expect(statuses[5]).toBe(429)
    expect(mocks.createOrder).toHaveBeenCalledTimes(5)
  })
})