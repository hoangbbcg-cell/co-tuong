import { Router } from 'express'
import { AccountError } from '../errors'
import { cookieValue } from './accountController'
import type { AccountService } from '../services/accountService'
import { NativeFcmRepository } from '../repositories/nativeFcmRepository'
import { validateNativeFcmToken } from '../services/nativeFcmPolicy'

export function nativeFcmRouter(account: AccountService, repository = new NativeFcmRepository()) {
  const router = Router()
  router.use((_req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next() })
  router.use(async (req, res, next) => {
    try {
      if (process.env.HOVANG_NATIVE_FCM_API !== 'enabled') throw new AccountError('Native FCM disabled', 503)
      if (req.headers.origin) {
        const origin = new URL(req.headers.origin)
        if (origin.host !== req.headers.host || !['http:', 'https:'].includes(origin.protocol)) {
          throw new AccountError('Invalid origin', 403)
        }
      }
      const id = await account.authenticate(cookieValue(req.headers.cookie, 'ct_guest_session'))
      if (!id || !(await account.repository.profile(id))) throw new AccountError('Login required', 401)
      res.locals.fcmUserId = String(id)
      next()
    } catch (error) { next(error) }
  })
  router.post('/token', async (req, res) => {
    let parsed: ReturnType<typeof validateNativeFcmToken>
    try { parsed = validateNativeFcmToken(req.body?.token) }
    catch { throw new AccountError('Invalid FCM token', 400) }
    await repository.register(res.locals.fcmUserId as string, parsed.hash, parsed.token)
    res.status(204).end()
  })
  router.delete('/token', async (req, res) => {
    let parsed: ReturnType<typeof validateNativeFcmToken>
    try { parsed = validateNativeFcmToken(req.body?.token) }
    catch { throw new AccountError('Invalid FCM token', 400) }
    await repository.disable(res.locals.fcmUserId as string, parsed.hash)
    res.status(204).end()
  })
  return router
}
