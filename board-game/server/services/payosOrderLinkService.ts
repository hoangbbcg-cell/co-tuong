import { randomInt } from 'node:crypto'
import { AccountError } from '../errors'
import { change, rows, transaction } from '../repositories/accountRepository'

export function newPayosOrderCode(): number {
  return randomInt(100000000, 2147483647)
}

export async function reservePayosOrderCode(
  userId: string,
  orderId: string,
): Promise<number> {
  return transaction(async connection => {
    const users = await rows(
      "SELECT id FROM users WHERE id=? AND status='active' FOR UPDATE",
      [userId],
      connection,
    )

    if (!users.length) {
      throw new AccountError('Tài khoản không hoạt động.', 401)
    }

    const orders = await rows(
      `SELECT CAST(payos_order_code AS CHAR) payosOrderCode,
              provider, status, expires_at expiresAt
       FROM payment_orders
       WHERE id=? AND user_id=?
       FOR UPDATE`,
      [orderId, userId],
      connection,
    )

    if (!orders.length) {
      throw new AccountError('Không tìm thấy đơn hàng.', 404)
    }

    const order = orders[0]

    if (
      order.status !== 'pending' ||
      new Date(order.expiresAt).getTime() <= Date.now()
    ) {
      throw new AccountError('Đơn hàng đã hết hiệu lực.', 409)
    }

    if (order.provider === 'payos' && order.payosOrderCode) {
      const existing = Number(order.payosOrderCode)

      if (!Number.isSafeInteger(existing) || existing <= 0) {
        throw new Error('Invalid stored payOS order code')
      }

      return existing
    }

    if (order.provider !== 'unconfigured' || order.payosOrderCode !== null) {
      throw new AccountError('Trạng thái đơn hàng không hợp lệ.', 409)
    }

    const code = newPayosOrderCode()

    const result = await change(
      `UPDATE payment_orders
       SET provider='payos', payos_order_code=?
       WHERE id=? AND user_id=?
         AND provider='unconfigured'
         AND payos_order_code IS NULL
         AND status='pending'
         AND expires_at>UTC_TIMESTAMP(3)`,
      [code, orderId, userId],
      connection,
    )

    if (result.affectedRows !== 1) {
      throw new Error('Payment order reservation conflict')
    }

    return code
  })
}
