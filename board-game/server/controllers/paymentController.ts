import { reservePayosOrderCode } from '../services/payosOrderLinkService'
import { resolvePayosCheckout, type PayosCheckoutClient } from '../services/payosCheckoutService'
import { payosClient, createPayosPaymentLink } from '../services/payosService'
import { payosWebhookClient, verifyPayosPayment } from '../services/payosWebhookService'
import { payosEnabled } from '../services/payosService'
import { Router } from 'express'
import { httpRateLimit } from './httpRateLimit'
import type { AccountService } from '../services/accountService'
import { AccountError } from '../errors'
import { cookieValue } from './accountController'
import { PaymentRepository } from '../repositories/paymentRepository'
import { ENERGY_PAYMENT_PRODUCTS } from '../../src/lib/energyPaymentCatalog'

const checkoutInFlight = new Set<string>()

export function paymentRouter(account: AccountService) {
  const router = Router()
  const payments = new PaymentRepository()

  // Provider callback: deliberately placed before cookie authentication.
  router.post('/webhook', async (req, res, next) => {
    try {
      const verified = await verifyPayosPayment(
        req.body,
        payosWebhookClient(),
      )

      if (!verified) {
        res.status(200).json({ success: true })
        return
      }

      await payments.settleVerifiedPayosPayment(verified)
      res.status(200).json({ success: true })
    } catch (error) {
      next(error)
    }
  })
  router.use(async (req, res, next) => {
    try {
      const userId = await account.authenticate(
        cookieValue(req.headers.cookie, 'ct_guest_session'),
      )
      if (!userId) {
        throw new AccountError('Bạn cần đăng nhập.', 401)
      }
      res.locals.userId = userId
      res.setHeader('Cache-Control', 'no-store')
      next()
    } catch (error) {
      next(error)
    }
  })

  router.get('/products', (_req, res) => {
    res.json(Object.values(ENERGY_PAYMENT_PRODUCTS))
  })

  // Cookie-authenticated payment requests must originate from this site.
  const paymentOrderOriginCheck = (req: import('express').Request,
    res: import('express').Response,
    next: import('express').NextFunction) => {
    const origin = req.get('origin')
    const site = req.get('sec-fetch-site')
    const host = req.get('host')

    if (
      !origin ||
      !host ||
      site === 'cross-site' ||
      site === 'same-site'
    ) {
      res.status(403).json({ error: 'Nguồn yêu cầu không hợp lệ.' })
      return
    }

    try {
      const parsed = new URL(origin)
      if (
        !['http:', 'https:'].includes(parsed.protocol) ||
        parsed.host.toLowerCase() !== host.toLowerCase() ||
        parsed.username ||
        parsed.password
      ) {
        res.status(403).json({ error: 'Nguồn yêu cầu không hợp lệ.' })
        return
      }
    } catch {
      res.status(403).json({ error: 'Nguồn yêu cầu không hợp lệ.' })
      return
    }

    next()
  }

  const paymentOrderRateLimit = httpRateLimit({
    maxRequests: 5,
    windowMs: 60_000,
    key: req => String(resolvedUserId(req)),
  })

  function resolvedUserId(req: import('express').Request) {
    return req.res?.locals.userId || req.ip || 'unknown'
  }
  router.post('/orders', paymentOrderOriginCheck, paymentOrderRateLimit, async (req, res, next) => {
    try {
      const productCode = req.body?.productCode

      const order = await payments.createOrder(
        String(res.locals.userId),
        productCode,
      )

      res.status(201).json(order)
    } catch (error) {
      const e = error as {
        name?: string
        code?: string | number
        status?: number
        message?: string
      }
      console.error('[PAYOS_CREATE_ORDER_FAILED]', {
        name: e?.name,
        code: e?.code,
        status: e?.status,
        message: e?.message,
      })
      next(error)
    }
  })
  router.get('/orders/:id', async (req, res, next) => {
    try {
      const order = await payments.getOrder(
        String(res.locals.userId),
        String(req.params.id),
      )
      if (!order) {
        throw new AccountError('Không tìm thấy đơn hàng.', 404)
      }
      res.json(order)
    } catch (error) {
      next(error)
    }
  })

  router.post('/orders/:id/checkout', paymentOrderOriginCheck, paymentOrderRateLimit, async (req, res, next) => {
    try {
      if (!payosEnabled()) {
        res.status(503).json({ error: 'Thanh toán đang được chuẩn bị.' })
        return
      }

      const userId = String(res.locals.userId)
      const orderId = String(req.params.id)
      const lockKey = `${userId}:${orderId}`

      if (checkoutInFlight.has(lockKey)) {
        res.status(409).json({ error: 'Đơn hàng đang được xử lý.' })
        return
      }

      checkoutInFlight.add(lockKey)

      try {
        const order = await payments.getOrder(userId, orderId)

        if (!order) {
          throw new AccountError('Không tìm thấy đơn hàng.', 404)
        }

        if (
          order.status !== 'pending' ||
          order.expiresAt.getTime() <= Date.now()
        ) {
          throw new AccountError('Đơn hàng không còn hiệu lực.', 409)
        }

        const orderCode = await reservePayosOrderCode(userId, orderId)
        const client = payosClient() as PayosCheckoutClient

        const existing = await payments.getOrder(userId, orderId)
        if (!existing) {
          throw new AccountError('Không tìm thấy đơn hàng.', 404)
        }

        const providerLink = await client.paymentRequests.get(orderCode)
          .catch((error: unknown) => {
            if (
              error &&
              typeof error === 'object' &&
              (
                ('status' in error && error.status === 404) ||
                ('code' in error && String(error.code) === '101' &&
                 'desc' in error &&
                 error.desc === 'Mã thanh toán không tồn tại')
              )
            ) return null
            const e = error as { name?: string; code?: string | number; status?: number; desc?: string }
            console.error('[PAYOS_LOCAL_ERROR]', {
              stage: 'get',
              name: e?.name,
              code: e?.code,
              status: e?.status,
              desc: e?.desc,
            })
            throw error
          })

        if (providerLink) {
          if (
            providerLink.orderCode !== orderCode ||
            providerLink.amount !== order.amountVnd ||
            providerLink.status !== 'PENDING'
          ) {
            throw new AccountError('Trạng thái thanh toán cần kiểm tra lại.', 409)
          }

          if (!existing.checkoutUrl || !existing.paymentLinkId) {
            throw new AccountError('Link payOS đã tồn tại nhưng chưa được lưu. Cần đối soát.', 409)
          }

          res.json({
            orderId: order.id,
            orderCode,
            checkoutUrl: existing.checkoutUrl,
            paymentLinkId: existing.paymentLinkId,
          })
          return
        }

        if (existing.checkoutUrl || existing.paymentLinkId) {
          throw new AccountError('Link thanh toán đã lưu nhưng payOS không tìm thấy.', 409)
        }

        const checkout = await createPayosPaymentLink({
          orderCode,
          amountVnd: order.amountVnd,
          description: `HOVANG ${order.productCode === 'energy_100' ? '100' : '30NGAY'}`,
          expiresAt: order.expiresAt,
        }, client, 'https://hovanggame.com').catch((error: unknown) => {
          const e = error as { name?: string; code?: string | number; status?: number; desc?: string }
          console.error('[PAYOS_LOCAL_ERROR]', {
            stage: 'create',
            name: e?.name,
            code: e?.code,
            status: e?.status,
            desc: e?.desc,
          })
          throw error
        })

        await payments.savePayosCheckout({
          userId,
          orderId,
          orderCode,
          checkoutUrl: checkout.checkoutUrl,
          paymentLinkId: checkout.paymentLinkId,
        })
        res.json({
          orderId: order.id,
          orderCode: checkout.orderCode,
          checkoutUrl: checkout.checkoutUrl,
          qrCode: checkout.qrCode,
          paymentLinkId: checkout.paymentLinkId,
        })
      } finally {
        checkoutInFlight.delete(lockKey)
      }
    } catch (error) {
      const e = error as {
        name?: string
        code?: string | number
        status?: number
        statusCode?: number
        desc?: string
        message?: string
      }
      console.error('[PAYOS_CHECKOUT_FAILED]', {
        name: e?.name,
        code: e?.code,
        status: e?.status,
        statusCode: e?.statusCode,
        desc: e?.desc,
        message: e?.message,
      })
      next(error)
    }
  })
  return router
}
