import { Router } from 'express'
import type { AccountService } from '../services/accountService'
import { AccountError } from '../errors'
import { cookieValue } from './accountController'
import { NotificationDeviceRepository } from '../repositories/notificationDeviceRepository'
import { validateEndpointHash, validateNotificationDevice } from '../services/notificationDevicePolicy'

export function notificationDeviceRouter(account: AccountService, repository = new NotificationDeviceRepository()) {
  const router = Router()
  router.use((_req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next() })
  router.use((req, _res, next) => {
    if (req.headers.origin) {
      try {
        const origin = new URL(req.headers.origin)
        if (origin.host !== req.headers.host || !['https:', 'http:'].includes(origin.protocol)) throw new Error()
      } catch { return next(new AccountError('Nguồn yêu cầu không hợp lệ.', 403)) }
    }
    next()
  })
  router.use(async (req, res, next) => {
    try {
      if (process.env.HOVANG_NOTIFICATION_DEVICE_API !== 'enabled') throw new AccountError('Thông báo thiết bị chưa được bật.', 503)
      const id = await account.authenticate(cookieValue(req.headers.cookie, 'ct_guest_session'))
      if (!id) throw new AccountError('Cần đăng nhập.', 401)
      const profile = await account.repository.profile(id)
      if (!profile) throw new AccountError('Tài khoản không còn hoạt động.', 401)
      res.locals.notificationAccountId = String(id)
      next()
    } catch(error) { next(error) }
  })
  router.post('/subscriptions', async (req, res) => {
    let device: ReturnType<typeof validateNotificationDevice>
    try { device = validateNotificationDevice(req.body) }
    catch { throw new AccountError('Đăng ký thông báo không hợp lệ.', 400) }
    await repository.upsert(res.locals.notificationAccountId as string, device)
    res.status(204).end()
  })
  router.delete('/subscriptions/:hash', async (req, res) => {
    let hash: string
    try { hash = validateEndpointHash(req.params.hash) }
    catch { throw new AccountError('Mã thiết bị không hợp lệ.', 400) }
    await repository.disable(res.locals.notificationAccountId as string, hash)
    res.status(204).end()
  })
  return router
}
