import { randomUUID } from 'node:crypto'
import { extendUnlimitedEnergy } from '../services/energyPaymentPolicy'
import { AccountError } from '../errors'
import { AccountRepository, change, rows, transaction } from './accountRepository'
import {
  energyPaymentProduct,
} from '../../src/lib/energyPaymentCatalog'

export type PaymentOrder = {
  id: string
  userId: string
  productCode: string
  amountVnd: number
  payosOrderCode: string | null
  provider: string
  status: string
  createdAt: Date
  expiresAt: Date
  paidAt: Date | null
  checkoutUrl: string | null
  paymentLinkId: string | null
}

export class PaymentRepository {
  private accounts = new AccountRepository()

  /**
   * Internal only. Caller MUST verify the payOS webhook signature
   * before invoking this method.
   */
  async settleVerifiedPayosPayment(input: {
    orderCode: string
    amountVnd: number
    transactionId: string
  }): Promise<'paid' | 'already_paid' | 'review_required'> {
    if (
      !/^[1-9][0-9]{0,18}$/.test(input.orderCode) ||
      !Number.isSafeInteger(input.amountVnd) ||
      input.amountVnd <= 0 ||
      !input.transactionId ||
      input.transactionId.length > 128 ||
      !/^[\x20-\x7E]+$/.test(input.transactionId)
    ) {
      throw new AccountError('Dữ liệu giao dịch không hợp lệ.', 400)
    }

    return transaction(async c => {
      // Discover the owner without locking, then lock the account first.
      const owners = await rows(
        `SELECT CAST(user_id AS CHAR) userId
         FROM payment_orders WHERE payos_order_code=?`,
        [input.orderCode],
        c,
      )

      if (!owners.length) {
        throw new AccountError('Không tìm thấy đơn hàng.', 404)
      }

      const ownerId = String(owners[0].userId)
      await rows(
        'SELECT id FROM users WHERE id=? FOR UPDATE',
        [ownerId],
        c,
      )
      const orders = await rows(
        `SELECT id, CAST(user_id AS CHAR) userId,
                product_code productCode, amount_vnd amountVnd,
                provider, status, provider_transaction_id transactionId,
                expires_at <= UTC_TIMESTAMP(3) AS isExpired
         FROM payment_orders
         WHERE payos_order_code=? FOR UPDATE`,
        [input.orderCode],
        c,
      )

      if (!orders.length) {
        throw new AccountError('Không tìm thấy đơn hàng.', 404)
      }

      const order = orders[0]
      if (String(order.userId) !== ownerId) {
        throw new AccountError('Chủ sở hữu đơn hàng không khớp.', 409)
      }
      const product = energyPaymentProduct(order.productCode)

      if (
        order.provider !== 'payos' ||
        !product ||
        Number(order.amountVnd) !== input.amountVnd ||
        product.amountVnd !== input.amountVnd
      ) {
        throw new AccountError('Thông tin thanh toán không khớp.', 409)
      }

      if (order.status === 'paid') {
        if (order.transactionId !== input.transactionId) {
          throw new AccountError('Giao dịch không khớp đơn đã thanh toán.', 409)
        }
        return 'already_paid'
      }

      const markReviewRequired = async (expectedStatus: string) => {
        const reviewed = await change(
          `UPDATE payment_orders
           SET status='paid',
               paid_at=UTC_TIMESTAMP(3),
               provider_transaction_id=?,
               fulfillment_status='review_required',
               fulfillment_updated_at=UTC_TIMESTAMP(3)
           WHERE id=? AND status=?`,
          [input.transactionId, String(order.id), expectedStatus],
          c,
        )
        if (reviewed.affectedRows !== 1) {
          throw new Error('Payment settlement state conflict')
        }
        return 'review_required' as const
      }
      if (order.status === 'cancelled' || order.status === 'expired') {
        return markReviewRequired(order.status)
      }

      if (order.status !== 'pending') {
        throw new AccountError('Đơn hàng không thể xác nhận.', 409)
      }

      // MySQL UTC is authoritative for payment expiry.
      // Late verified payment requires manual review, never auto-grant.
      if (Number(order.isExpired) === 1) {
        return markReviewRequired('pending')
      }
      const userId = String(order.userId)
      const activeUsers = await rows(
        "SELECT id FROM users WHERE id=? AND status='active' FOR UPDATE",
        [userId],
        c,
      )

      if (!activeUsers.length) {
        return markReviewRequired('pending')
      }

      if (product.code === 'energy_100') {
        const resource = await this.accounts.resources(userId, c)

        if (resource.energy > 4294967295 - product.energy) {
          return markReviewRequired('pending')
        }

        await change(
          `UPDATE user_resources
           SET energy=energy+?,
               version=version+1
           WHERE user_id=?`,
          [product.energy, userId],
          c,
        )

        await this.accounts.ledger(
          c,
          userId,
          'energy',
          product.energy,
          'payment_energy_100',
          `payment:${String(order.id)}`,
        )
      } else {
        const current = await rows(
          `SELECT unlimited_until unlimitedUntil
           FROM energy_subscriptions
           WHERE user_id=? FOR UPDATE`,
          [userId],
          c,
        )

        const currentUntil = current.length
          ? new Date(current[0].unlimitedUntil)
          : null

        const paidAt = new Date()
        if (currentUntil && currentUntil.getTime() > paidAt.getTime()) {
          return markReviewRequired('pending')
        }
        const nextUntil = extendUnlimitedEnergy(currentUntil, paidAt)

        const sqlDate = nextUntil.toISOString()
          .slice(0, 23)
          .replace('T', ' ')

        await change(
          `INSERT INTO energy_subscriptions
             (user_id, unlimited_until)
           VALUES (?,?)
           ON DUPLICATE KEY UPDATE
             unlimited_until=VALUES(unlimited_until)`,
          [userId, sqlDate],
          c,
        )
      }

      const updated = await change(
        `UPDATE payment_orders
         SET status='paid',
             paid_at=UTC_TIMESTAMP(3),
             provider_transaction_id=?,
             fulfillment_status='granted',
             fulfillment_updated_at=UTC_TIMESTAMP(3)
         WHERE id=? AND status='pending'`,
        [input.transactionId, String(order.id)],
        c,
      )

      if (updated.affectedRows !== 1) {
        throw new Error('Payment settlement state conflict')
      }

      return 'paid'
    })
  }

  async createOrder(userId: string, productCode: unknown) {
    const product = energyPaymentProduct(productCode)

    if (!product) {
      throw new AccountError('Gói năng lượng không hợp lệ.', 404)
    }

    const orderId = randomUUID()
    let existingPendingOrder: string | null = null

    await transaction(async connection => {
      // Lock the account row to serialize order creation for this user.
      const users = await rows(
        "SELECT id FROM users WHERE id=? AND status='active' FOR UPDATE",
        [userId],
        connection,
      )

      if (!users.length) {
        throw new AccountError('Tài khoản không hoạt động.', 401)
      }

      // Mark expired pending orders before looking for an active one.
      await change(
        `UPDATE payment_orders
         SET status='expired'
         WHERE user_id=? AND status='pending'
           AND expires_at<=UTC_TIMESTAMP(3)
`,
        [userId],
        connection,
      )

      if (product.code === 'energy_unlimited_30d') {
        const subscriptions = await rows(
          `SELECT unlimited_until
           FROM energy_subscriptions
           WHERE user_id=? AND unlimited_until>UTC_TIMESTAMP(3)
           FOR UPDATE`,
          [userId],
          connection,
        )

        if (subscriptions.length) {
          throw new AccountError(
            'Gói vô hạn đang còn hiệu lực. Chỉ có thể mua lại khi hết hạn.',
            409,
          )
        }
      }

      const pending = await rows(
        `SELECT id
         FROM payment_orders
         WHERE user_id=? AND product_code=?
           AND status='pending'
           AND expires_at>UTC_TIMESTAMP(3)
         ORDER BY created_at DESC
         LIMIT 1
         FOR UPDATE`,
        [userId, product.code],
        connection,
      )

      if (pending.length) {
        existingPendingOrder = String(pending[0].id)
        return
      }

      await change(
        `INSERT INTO payment_orders
          (id,user_id,product_code,amount_vnd,provider,status,expires_at)
         VALUES (?,?,?,?,'unconfigured','pending',
           DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 15 MINUTE))`,
        [orderId, userId, product.code, product.amountVnd],
        connection,
      )
    })

    return this.getOrder(userId, existingPendingOrder ?? orderId)
  }
  async savePayosCheckout(input: {
    userId: string
    orderId: string
    orderCode: number
    checkoutUrl: string
    paymentLinkId: string
  }): Promise<void> {
    const url = new URL(input.checkoutUrl)

    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      !Number.isSafeInteger(input.orderCode) ||
      input.orderCode <= 0 ||
      !input.paymentLinkId ||
      input.paymentLinkId.length > 128 ||
      input.checkoutUrl.length > 2048
    ) {
      throw new Error('Invalid checkout persistence data')
    }

    await transaction(async connection => {
      const users = await rows(
        'SELECT id FROM users WHERE id=? FOR UPDATE',
        [input.userId],
        connection,
      )

      if (!users.length) {
        throw new AccountError('Không tìm thấy tài khoản.', 404)
      }

      const orders = await rows(
        `SELECT status, provider, CAST(payos_order_code AS CHAR) orderCode,
                payos_checkout_url checkoutUrl,
                payos_payment_link_id paymentLinkId,
                expires_at<=UTC_TIMESTAMP(3) AS isExpired
         FROM payment_orders
         WHERE id=? AND user_id=? FOR UPDATE`,
        [input.orderId, input.userId],
        connection,
      )

      if (!orders.length) {
        throw new AccountError('Không tìm thấy đơn hàng.', 404)
      }

      const order = orders[0]

      if (
        order.status !== 'pending' ||
        order.provider !== 'payos' ||
        Number(order.orderCode) !== input.orderCode ||
        Number(order.isExpired) === 1
      ) {
        throw new AccountError('Đơn hàng không còn hợp lệ.', 409)
      }

      if (order.checkoutUrl || order.paymentLinkId) {
        if (
          order.checkoutUrl !== input.checkoutUrl ||
          order.paymentLinkId !== input.paymentLinkId
        ) {
          throw new AccountError('Link thanh toán đã được lưu khác.', 409)
        }
        return
      }

      const result = await change(
        `UPDATE payment_orders
         SET payos_checkout_url=?, payos_payment_link_id=?
         WHERE id=? AND user_id=? AND status='pending'
           AND provider='payos' AND payos_order_code=?
           AND payos_checkout_url IS NULL
           AND payos_payment_link_id IS NULL
           AND expires_at>UTC_TIMESTAMP(3)`,
        [
          input.checkoutUrl,
          input.paymentLinkId,
          input.orderId,
          input.userId,
          input.orderCode,
        ],
        connection,
      )

      if (result.affectedRows !== 1) {
        throw new Error('Checkout persistence conflict')
      }
    })
  }
  async getOrder(userId: string, orderId: string): Promise<PaymentOrder | null> {
    if (
      !/^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(orderId)
    ) {
      throw new AccountError('Mã đơn hàng không hợp lệ.')
    }

    const result = await rows(
      `SELECT id,CAST(user_id AS CHAR) userId,
        product_code productCode,amount_vnd amountVnd,
        CAST(payos_order_code AS CHAR) payosOrderCode,
        provider,status,
         payos_checkout_url checkoutUrl,
         payos_payment_link_id paymentLinkId,
         created_at createdAt,
        expires_at expiresAt,paid_at paidAt
       FROM payment_orders
       WHERE id=? AND user_id=?`,
      [orderId, userId],
    )

    if (!result.length) return null

    const order = result[0]

    return {
      id: String(order.id),
      userId: String(order.userId),
      productCode: String(order.productCode),
      amountVnd: Number(order.amountVnd),
      payosOrderCode: order.payosOrderCode === null
        ? null : String(order.payosOrderCode),
      provider: String(order.provider),
      status: String(order.status),
      createdAt: new Date(order.createdAt),
      expiresAt: new Date(order.expiresAt),
      paidAt: order.paidAt ? new Date(order.paidAt) : null,
      checkoutUrl: order.checkoutUrl == null ? null : String(order.checkoutUrl),
      paymentLinkId: order.paymentLinkId == null ? null : String(order.paymentLinkId),
    }
  }
}
