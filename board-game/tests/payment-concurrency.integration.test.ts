import { randomUUID, randomInt } from 'node:crypto'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createApplication } from '../server/app'
import { PaymentRepository } from '../server/repositories/paymentRepository'
import { rows, change } from '../server/repositories/accountRepository'

describe.skipIf(
  process.env.DB_INTEGRATION !== '1' ||
  process.env.DB_PORT !== '33319'
)('payment settlement concurrency on disposable MySQL', () => {
  let app: ReturnType<typeof createApplication>
  let base: string

  beforeAll(async () => {
    if (process.env.DB_HOST !== '127.0.0.1' ||
        process.env.DB_NAME !== 'cotuong' ||
        process.env.DB_USER !== 'cotuong_app') {
      throw new Error('Unsafe payment integration database configuration')
    }

    app = createApplication()
    await new Promise<void>(resolve =>
      app.http.listen(0, '127.0.0.1', resolve)
    )

    const address = app.http.address()
    if (!address || typeof address === 'string') {
      throw new Error('No HTTP address')
    }
    base = `http://127.0.0.1:${address.port}/api/account`
  })

  afterAll(async () => {
    await app?.close()
  })

  it('grants exactly once for two concurrent confirmations', async () => {
    const response = await fetch(`${base}/guest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    })
    expect(response.status).toBe(200)

    const user = await response.json() as { id: string }
    const userId = String(user.id)

    const before = await rows(
      'SELECT energy FROM user_resources WHERE user_id=?',
      [userId],
    )
    expect(before).toHaveLength(1)
    const initialEnergy = Number(before[0].energy)

    const orderId = randomUUID()
    const orderCode = `${Date.now()}${randomInt(100, 999)}`
    const transactionId = `QA_CONCURRENT_${randomUUID()}`

    await change(
      `INSERT INTO payment_orders
       (id,user_id,product_code,amount_vnd,provider,
        payos_order_code,status,expires_at)
       VALUES (?,?,'energy_100',19000,'payos',?,'pending',
               DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 15 MINUTE))`,
      [orderId, userId, orderCode],
    )

    const repository = new PaymentRepository()
    const input = {
      orderCode,
      amountVnd: 19000,
      transactionId,
    }

    const results = await Promise.all([
      repository.settleVerifiedPayosPayment(input),
      repository.settleVerifiedPayosPayment(input),
    ])

    expect(results.sort()).toEqual(['already_paid', 'paid'])

    const resources = await rows(
      'SELECT energy FROM user_resources WHERE user_id=?',
      [userId],
    )
    expect(Number(resources[0].energy)).toBe(initialEnergy + 100)

    const ledger = await rows(
      `SELECT delta,reason,idempotency_key
       FROM resource_events WHERE idempotency_key=?`,
      [`payment:${orderId}`],
    )
    expect(ledger).toHaveLength(1)
    expect(Number(ledger[0].delta)).toBe(100)
    expect(ledger[0].reason).toBe('payment_energy_100')

    const orders = await rows(
      `SELECT status,fulfillment_status,
              provider_transaction_id transactionId
       FROM payment_orders WHERE id=?`,
      [orderId],
    )
    expect(orders).toHaveLength(1)
    expect(orders[0].status).toBe('paid')
    expect(orders[0].fulfillment_status).toBe('granted')
    expect(orders[0].transactionId).toBe(transactionId)
  }, 15000)

  // 4B3F_TWO_ORDERS_SAME_USER
  it('settles two different orders for the same user concurrently', async () => {
    const response = await fetch(`${base}/guest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    })

    expect(response.status).toBe(200)

    const user = await response.json() as { id: string }
    const userId = String(user.id)

    const before = await rows(
      'SELECT energy FROM user_resources WHERE user_id=?',
      [userId],
    )
    expect(before).toHaveLength(1)
    const initialEnergy = Number(before[0].energy)

    const orderIds = [randomUUID(), randomUUID()]
    const codeBase = Date.now() * 1000 + randomInt(100, 900)
    const orderCodes = [String(codeBase), String(codeBase + 1)]
    const transactionIds = [
      `QA_ORDER_A_${randomUUID()}`,
      `QA_ORDER_B_${randomUUID()}`,
    ]

    for (let i = 0; i < 2; i++) {
      await change(
        `INSERT INTO payment_orders
         (id,user_id,product_code,amount_vnd,provider,
          payos_order_code,status,expires_at)
         VALUES (?,?,'energy_100',19000,'payos',?,'pending',
                 DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 15 MINUTE))`,
        [orderIds[i], userId, orderCodes[i]],
      )
    }

    const repository = new PaymentRepository()

    const results = await Promise.all([
      repository.settleVerifiedPayosPayment({
        orderCode: orderCodes[0],
        amountVnd: 19000,
        transactionId: transactionIds[0],
      }),
      repository.settleVerifiedPayosPayment({
        orderCode: orderCodes[1],
        amountVnd: 19000,
        transactionId: transactionIds[1],
      }),
    ])

    expect(results).toEqual(['paid', 'paid'])

    const resources = await rows(
      'SELECT energy FROM user_resources WHERE user_id=?',
      [userId],
    )
    expect(Number(resources[0].energy)).toBe(initialEnergy + 200)

    const orders = await rows(
      `SELECT id,status,fulfillment_status
       FROM payment_orders WHERE id IN (?,?)`,
      orderIds,
    )

    expect(orders).toHaveLength(2)
    expect(orders.every(order =>
      order.status === 'paid' &&
      order.fulfillment_status === 'granted'
    )).toBe(true)

    const ledger = await rows(
      `SELECT idempotency_key,delta
       FROM resource_events
       WHERE idempotency_key IN (?,?)`,
      [`payment:${orderIds[0]}`, `payment:${orderIds[1]}`],
    )

    expect(ledger).toHaveLength(2)
    expect(ledger.every(event => Number(event.delta) === 100)).toBe(true)
  }, 15000)
  // 4B3F_UNLIMITED_CONCURRENT
  it('grants only one unlimited subscription for two concurrent orders', async () => {
    const response = await fetch(`${base}/guest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    })

    expect(response.status).toBe(200)

    const user = await response.json() as { id: string }
    const userId = String(user.id)

    const orderIds = [randomUUID(), randomUUID()]
    const codeBase = Date.now() * 1000 + randomInt(100, 900)
    const orderCodes = [String(codeBase), String(codeBase + 1)]
    const transactionIds = [
      `QA_UNLIMITED_A_${randomUUID()}`,
      `QA_UNLIMITED_B_${randomUUID()}`,
    ]

    for (let i = 0; i < 2; i++) {
      await change(
        `INSERT INTO payment_orders
         (id,user_id,product_code,amount_vnd,provider,
          payos_order_code,status,expires_at)
         VALUES (?,?,'energy_unlimited_30d',39000,'payos',?,'pending',
                 DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 15 MINUTE))`,
        [orderIds[i], userId, orderCodes[i]],
      )
    }

    const startedAt = Date.now()
    const repository = new PaymentRepository()

    const results = await Promise.all([
      repository.settleVerifiedPayosPayment({
        orderCode: orderCodes[0],
        amountVnd: 39000,
        transactionId: transactionIds[0],
      }),
      repository.settleVerifiedPayosPayment({
        orderCode: orderCodes[1],
        amountVnd: 39000,
        transactionId: transactionIds[1],
      }),
    ])

    expect(results.sort()).toEqual(['paid', 'review_required'])

    const orders = await rows(
      `SELECT status,fulfillment_status
       FROM payment_orders WHERE id IN (?,?)`,
      orderIds,
    )

    expect(orders).toHaveLength(2)
    expect(orders.every(order => order.status === 'paid')).toBe(true)

    const granted = orders.filter(order =>
      order.fulfillment_status === 'granted'
    )
    const review = orders.filter(order =>
      order.fulfillment_status === 'review_required'
    )

    expect(granted).toHaveLength(1)
    expect(review).toHaveLength(1)

    const subscriptions = await rows(
      `SELECT unlimited_until unlimitedUntil
       FROM energy_subscriptions WHERE user_id=?`,
      [userId],
    )

    expect(subscriptions).toHaveLength(1)

    const until = new Date(subscriptions[0].unlimitedUntil).getTime()
    const duration = 30 * 24 * 60 * 60 * 1000
    const tolerance = 60 * 1000

    expect(until).toBeGreaterThanOrEqual(startedAt + duration - tolerance)
    expect(until).toBeLessThanOrEqual(Date.now() + duration + tolerance)
  }, 15000)
  // 4B3F_EDGE_CASES
  it('marks expired paid order review_required without energy grant', async () => {
    const fixture = await createFixture()

    await change(
      `UPDATE payment_orders
       SET status='expired',
           expires_at=DATE_SUB(UTC_TIMESTAMP(3), INTERVAL 1 MINUTE)
       WHERE id=?`,
      [fixture.orderId],
    )

    const repository = new PaymentRepository()

    expect(await repository.settleVerifiedPayosPayment(fixture.input))
      .toBe('review_required')

    const state = await inspectFixture(fixture)
    expect(state.energy).toBe(fixture.energy)
    expect(state.ledger).toHaveLength(0)
    expect(state.order.status).toBe('paid')
    expect(state.order.fulfillment_status).toBe('review_required')
    expect(state.order.transactionId).toBe(fixture.input.transactionId)
  })

  it('marks payment for disabled user review_required without energy grant', async () => {
    const fixture = await createFixture()

    await change(
      `UPDATE users SET status='disabled' WHERE id=?`,
      [fixture.userId],
    )

    const repository = new PaymentRepository()

    expect(await repository.settleVerifiedPayosPayment(fixture.input))
      .toBe('review_required')

    const state = await inspectFixture(fixture)
    expect(state.energy).toBe(fixture.energy)
    expect(state.ledger).toHaveLength(0)
    expect(state.order.status).toBe('paid')
    expect(state.order.fulfillment_status).toBe('review_required')
  })

  it('marks energy overflow review_required without granting energy', async () => {
    const fixture = await createFixture()

    await change(
      `UPDATE user_resources
       SET energy=4294967295
       WHERE user_id=?`,
      [fixture.userId],
    )

    const repository = new PaymentRepository()

    expect(await repository.settleVerifiedPayosPayment(fixture.input))
      .toBe('review_required')

    const state = await inspectFixture(fixture)
    expect(state.energy).toBe(4294967295)
    expect(state.ledger).toHaveLength(0)
    expect(state.order.status).toBe('paid')
    expect(state.order.fulfillment_status).toBe('review_required')
  })
  // 4B3E_PAYMENT_FAILURE_TESTS
  const createFixture = async (status: 'pending' | 'cancelled' = 'pending') => {
    const response = await fetch(`${base}/guest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    })
    expect(response.status).toBe(200)
    const user = await response.json() as { id: string }
    const userId = String(user.id)
    const orderId = randomUUID()
    const orderCode = `${Date.now()}${randomInt(100, 999)}`
    const transactionId = `QA_${randomUUID()}`

    const before = await rows(
      'SELECT energy FROM user_resources WHERE user_id=?',
      [userId],
    )
    const energy = Number(before[0].energy)

    await change(
      `INSERT INTO payment_orders
       (id,user_id,product_code,amount_vnd,provider,
        payos_order_code,status,expires_at)
       VALUES (?,?,'energy_100',19000,'payos',?,?,
               DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 15 MINUTE))`,
      [orderId, userId, orderCode, status],
    )

    return {
      userId, orderId, energy,
      input: { orderCode, amountVnd: 19000, transactionId },
    }
  }

  const inspectFixture = async (fixture: Awaited<ReturnType<typeof createFixture>>) => {
    const resources = await rows(
      'SELECT energy FROM user_resources WHERE user_id=?',
      [fixture.userId],
    )
    const orders = await rows(
      `SELECT status,fulfillment_status,
              provider_transaction_id transactionId
       FROM payment_orders WHERE id=?`,
      [fixture.orderId],
    )
    const ledger = await rows(
      'SELECT id FROM resource_events WHERE idempotency_key=?',
      [`payment:${fixture.orderId}`],
    )
    return {
      energy: Number(resources[0].energy),
      order: orders[0],
      ledger,
    }
  }

  it('repeated callback does not grant twice and different transaction is rejected', async () => {
    const fixture = await createFixture()
    const repository = new PaymentRepository()

    expect(await repository.settleVerifiedPayosPayment(fixture.input)).toBe('paid')
    expect(await repository.settleVerifiedPayosPayment(fixture.input)).toBe('already_paid')

    await expect(repository.settleVerifiedPayosPayment({
      ...fixture.input,
      transactionId: `DIFFERENT_${randomUUID()}`,
    })).rejects.toThrow()

    const state = await inspectFixture(fixture)
    expect(state.energy).toBe(fixture.energy + 100)
    expect(state.ledger).toHaveLength(1)
    expect(state.order.status).toBe('paid')
    expect(state.order.fulfillment_status).toBe('granted')
    expect(state.order.transactionId).toBe(fixture.input.transactionId)
  })

  it('wrong payment amount leaves order pending and energy unchanged', async () => {
    const fixture = await createFixture()
    const repository = new PaymentRepository()

    await expect(repository.settleVerifiedPayosPayment({
      ...fixture.input,
      amountVnd: 18000,
    })).rejects.toThrow()

    const state = await inspectFixture(fixture)
    expect(state.energy).toBe(fixture.energy)
    expect(state.ledger).toHaveLength(0)
    expect(state.order.status).toBe('pending')
    expect(state.order.fulfillment_status).toBe('not_granted')
  })

  it('marks pending order past expires_at review_required without energy grant', async () => {
    const fixture = await createFixture()

    await change(
      `UPDATE payment_orders
       SET expires_at=DATE_SUB(UTC_TIMESTAMP(3), INTERVAL 1 MINUTE)
       WHERE id=?`,
      [fixture.orderId],
    )

    const repository = new PaymentRepository()

    expect(await repository.settleVerifiedPayosPayment(fixture.input))
      .toBe('review_required')

    const state = await inspectFixture(fixture)

    expect(state.energy).toBe(fixture.energy)
    expect(state.ledger).toHaveLength(0)
    expect(state.order.status).toBe('paid')
    expect(state.order.fulfillment_status).toBe('review_required')
    expect(state.order.transactionId).toBe(fixture.input.transactionId)
  })
  it('ledger failure rolls back energy and payment state', async () => {
    const fixture = await createFixture()
    const repository = new PaymentRepository()
    const { AccountRepository } = await import('../server/repositories/accountRepository')
    const { vi } = await import('vitest')

    const spy = vi.spyOn(AccountRepository.prototype, 'ledger')
      .mockRejectedValueOnce(new Error('QA simulated ledger failure'))

    try {
      await expect(repository.settleVerifiedPayosPayment(fixture.input))
        .rejects.toThrow('QA simulated ledger failure')
    } finally {
      spy.mockRestore()
    }

    const state = await inspectFixture(fixture)
    expect(state.energy).toBe(fixture.energy)
    expect(state.ledger).toHaveLength(0)
    expect(state.order.status).toBe('pending')
    expect(state.order.fulfillment_status).toBe('not_granted')
  })

  it('cancelled order is marked review_required without granting energy', async () => {
    const fixture = await createFixture('cancelled')
    const repository = new PaymentRepository()

    expect(await repository.settleVerifiedPayosPayment(fixture.input))
      .toBe('review_required')

    const state = await inspectFixture(fixture)
    expect(state.energy).toBe(fixture.energy)
    expect(state.ledger).toHaveLength(0)
    expect(state.order.status).toBe('paid')
    expect(state.order.fulfillment_status).toBe('review_required')
    expect(state.order.transactionId).toBe(fixture.input.transactionId)
  })
})
