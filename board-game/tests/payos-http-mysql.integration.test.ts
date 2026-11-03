import { randomUUID, randomInt } from 'node:crypto'
import { beforeAll, afterAll, describe, expect, it, vi } from 'vitest'
import express from 'express'
import type { Server } from 'node:http'
import { rows, change } from '../server/repositories/accountRepository'
import { getMysqlConnection } from '../server/repositories/mysqlPool'

const mock = vi.hoisted(() => ({
  verify: vi.fn(),
}))

vi.mock('../server/services/payosWebhookService', () => ({
  payosWebhookClient: () => ({ webhooks: { verify: mock.verify } }),
  verifyPayosPayment: async (
    body: unknown,
    client: { webhooks: { verify: (body: unknown) => Promise<unknown> } },
  ) => client.webhooks.verify(body),
}))

import { paymentRouter } from '../server/controllers/paymentController'

describe.skipIf(
  process.env.DB_INTEGRATION !== '1' ||
  process.env.DB_HOST !== '127.0.0.1' ||
  process.env.DB_PORT !== '33319' ||
  process.env.DB_NAME !== 'cotuong' ||
  process.env.DB_USER !== 'cotuong_app'
)('payOS HTTP webhook with disposable MySQL', () => {
  let server: Server
  let base: string

  beforeAll(async () => {
    const app = express()
    app.use(express.json())
    app.use('/api/payments', paymentRouter({
      authenticate: vi.fn().mockResolvedValue(null),
    } as never))

    app.use((
      error: any,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res.status(error.status || 500).json({ error: error.message })
    })

    server = app.listen(0, '127.0.0.1')
    await new Promise<void>(resolve => server.once('listening', resolve))

    const address = server.address()
    if (!address || typeof address === 'string') throw Error('Missing HTTP address')
    base = `http://127.0.0.1:${address.port}`
  })

  afterAll(async () => {
    if (server) await new Promise<void>(resolve => server.close(() => resolve()))
  })

  it('grants energy once after duplicate HTTP webhooks', async () => {
    const account = await import('../server/app')
    const game = account.createApplication()
    await new Promise<void>(resolve => game.http.listen(0, '127.0.0.1', resolve))

    try {
      const address = game.http.address()
      if (!address || typeof address === 'string') throw Error('Missing game address')

      const guestResponse = await fetch(
        `http://127.0.0.1:${address.port}/api/account/guest`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: '{}',
        },
      )
      expect(guestResponse.status).toBe(200)

      const guest = await guestResponse.json() as { id: string }
      const userId = String(guest.id)
      const before = await rows(
        'SELECT energy FROM user_resources WHERE user_id=?',
        [userId],
      )
      const initial = Number(before[0].energy)

      const orderId = randomUUID()
      const orderCode = `${Date.now()}${randomInt(100, 999)}`
      const transactionId = `QA_HTTP_${randomUUID()}`

      await change(
        `INSERT INTO payment_orders
         (id,user_id,product_code,amount_vnd,provider,
          payos_order_code,status,expires_at)
         VALUES (?,?,'energy_100',19000,'payos',?,'pending',
                 DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 15 MINUTE))`,
        [orderId, userId, orderCode],
      )

      mock.verify.mockResolvedValue({
        orderCode,
        amountVnd: 19000,
        transactionId,
      })

      const send = () => fetch(`${base}/api/payments/webhook`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ simulated: true }),
      })

      const responses = await Promise.all([send(), send()])
      expect(responses.map(r => r.status)).toEqual([200, 200])

      const after = await rows(
        'SELECT energy FROM user_resources WHERE user_id=?',
        [userId],
      )
      expect(Number(after[0].energy)).toBe(initial + 100)

      const ledger = await rows(
        'SELECT id FROM resource_events WHERE idempotency_key=?',
        [`payment:${orderId}`],
      )
      expect(ledger).toHaveLength(1)

      const orders = await rows(
        'SELECT status,fulfillment_status FROM payment_orders WHERE id=?',
        [orderId],
      )
      expect(orders[0].status).toBe('paid')
      expect(orders[0].fulfillment_status).toBe('granted')
    } finally {
      await game.close()
    }
  }, 15000)
  it('rejects an invalid webhook without settling an order', async () => {
    mock.verify.mockRejectedValueOnce(new Error('Invalid signature'))

    const response = await fetch(`${base}/api/payments/webhook`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ simulated: 'bad-signature' }),
    })

    expect(response.status).toBe(500)
  })

  it('rejects a payment amount mismatch', async () => {
    const orderCode = `${Date.now()}${randomInt(100, 999)}`
    mock.verify.mockResolvedValueOnce({
      orderCode,
      amountVnd: 1,
      transactionId: `QA_MISMATCH_${randomUUID()}`,
    })

    const response = await fetch(`${base}/api/payments/webhook`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ simulated: 'wrong-amount' }),
    })

    expect(response.status).toBe(404)
  })

  it('does not accept an unknown verified order', async () => {
    mock.verify.mockResolvedValueOnce({
      orderCode: `${Date.now()}${randomInt(100, 999)}`,
      amountVnd: 19000,
      transactionId: `QA_UNKNOWN_${randomUUID()}`,
    })

    const response = await fetch(`${base}/api/payments/webhook`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ simulated: 'unknown-order' }),
    })

    expect(response.status).toBe(404)
  })
  async function createFixture(expired: boolean) {
    const { createApplication } = await import('../server/app')
    const game = createApplication()

    await new Promise<void>(resolve =>
      game.http.listen(0, '127.0.0.1', resolve),
    )

    try {
      const address = game.http.address()
      if (!address || typeof address === 'string') {
        throw new Error('Missing game address')
      }

      const response = await fetch(
        `http://127.0.0.1:${address.port}/api/account/guest`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: '{}',
        },
      )

      expect(response.status).toBe(200)
      const guest = await response.json() as { id: string }
      const userId = String(guest.id)

      const resource = await rows(
        'SELECT energy FROM user_resources WHERE user_id=?',
        [userId],
      )
      const initialEnergy = Number(resource[0].energy)
      const orderId = randomUUID()
      const orderCode = `${Date.now()}${randomInt(100, 999)}`

      await change(
        `INSERT INTO payment_orders
          (id,user_id,product_code,amount_vnd,provider,
           payos_order_code,status,expires_at)
         VALUES (?,?,'energy_100',19000,'payos',?,'pending',
           DATE_ADD(UTC_TIMESTAMP(3),INTERVAL ? MINUTE))`,
        [orderId, userId, orderCode, expired ? -1 : 15],
      )

      return { userId, orderId, orderCode, initialEnergy }
    } finally {
      await game.close()
    }
  }


  async function runTriggerSql(sql: string) {
    const connection = await getMysqlConnection()
    try {
      await connection.query(sql)
    } finally {
      connection.release()
    }
  }
  async function postWebhook() {
    return fetch(`${base}/api/payments/webhook`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ simulated: true }),
    })
  }

  it('rejects a mismatched amount for an existing order', async () => {
    const fixture = await createFixture(false)

    mock.verify.mockResolvedValueOnce({
      orderCode: fixture.orderCode,
      amountVnd: 1,
      transactionId: `QA_WRONG_AMOUNT_${randomUUID()}`,
    })

    const response = await postWebhook()
    expect(response.status).toBe(409)

    const orders = await rows(
      'SELECT status FROM payment_orders WHERE id=?',
      [fixture.orderId],
    )
    expect(orders[0].status).toBe('pending')

    const resources = await rows(
      'SELECT energy FROM user_resources WHERE user_id=?',
      [fixture.userId],
    )
    expect(Number(resources[0].energy)).toBe(fixture.initialEnergy)
  })

  it('marks an expired verified payment for manual review', async () => {
    const fixture = await createFixture(true)

    mock.verify.mockResolvedValueOnce({
      orderCode: fixture.orderCode,
      amountVnd: 19000,
      transactionId: `QA_EXPIRED_${randomUUID()}`,
    })

    const response = await postWebhook()
    expect(response.status).toBe(200)

    const orders = await rows(
      `SELECT status,fulfillment_status
       FROM payment_orders WHERE id=?`,
      [fixture.orderId],
    )

    expect(orders[0].status).toBe('paid')
    expect(orders[0].fulfillment_status).toBe('review_required')

    const resources = await rows(
      'SELECT energy FROM user_resources WHERE user_id=?',
      [fixture.userId],
    )
    expect(Number(resources[0].energy)).toBe(fixture.initialEnergy)
  })

  it('rolls back a failed database settlement and safely retries', async () => {
    const fixture = await createFixture(false)
    const transactionId = `QA_DB_FAILURE_${randomUUID()}`
    const triggerName = 'qa_payos_settlement_failure'

    // This trigger affects only the disposable fixture order.
    // It fails at the final payment_orders UPDATE, after energy
    // and resource ledger writes have already been attempted.
    await runTriggerSql(`
      CREATE TRIGGER ${triggerName}
      BEFORE UPDATE ON payment_orders
      FOR EACH ROW
      BEGIN
        IF OLD.id = '${fixture.orderId}' THEN
          SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'QA simulated settlement failure';
        END IF;
      END
    `)

    try {
      mock.verify.mockResolvedValue({
        orderCode: fixture.orderCode,
        amountVnd: 19000,
        transactionId,
      })

      const failed = await postWebhook()
      expect(failed.status).toBe(500)

      const afterFailure = await rows(
        `SELECT status, provider_transaction_id transactionId
         FROM payment_orders WHERE id=?`,
        [fixture.orderId],
      )
      expect(afterFailure[0].status).toBe('pending')
      expect(afterFailure[0].transactionId).toBeNull()

      const resources = await rows(
        'SELECT energy FROM user_resources WHERE user_id=?',
        [fixture.userId],
      )
      expect(Number(resources[0].energy)).toBe(fixture.initialEnergy)

      const ledger = await rows(
        'SELECT id FROM resource_events WHERE idempotency_key=?',
        [`payment:${fixture.orderId}`],
      )
      expect(ledger).toHaveLength(0)
    } finally {
      await runTriggerSql(`DROP TRIGGER IF EXISTS ${triggerName}`)
    }

    // Database is healthy again: retry the same verified payment.
    const retry = await postWebhook()
    expect(retry.status).toBe(200)

    const duplicate = await postWebhook()
    expect(duplicate.status).toBe(200)

    const finalResources = await rows(
      'SELECT energy FROM user_resources WHERE user_id=?',
      [fixture.userId],
    )
    expect(Number(finalResources[0].energy)).toBe(fixture.initialEnergy + 100)

    const finalLedger = await rows(
      'SELECT id FROM resource_events WHERE idempotency_key=?',
      [`payment:${fixture.orderId}`],
    )
    expect(finalLedger).toHaveLength(1)

    const finalOrders = await rows(
      'SELECT status, fulfillment_status FROM payment_orders WHERE id=?',
      [fixture.orderId],
    )
    expect(finalOrders[0].status).toBe('paid')
    expect(finalOrders[0].fulfillment_status).toBe('granted')
  }, 15000)
})


