import { Router } from 'express'
import { AdminAuth } from '../services/adminAuth'
import { AdminService } from '../services/adminService'
import { AccountError } from '../errors'
import { cookieValue } from './accountController'

export function adminRouter(auth = new AdminAuth(), service = new AdminService()) {
  const router = Router()
  router.use((req, _res, next) => {
    if (!['GET', 'HEAD'].includes(req.method) && req.headers.origin) {
      try { if (new URL(req.headers.origin).host !== req.headers.host) throw new Error() }
      catch { return next(new AccountError('Nguồn yêu cầu không hợp lệ.', 403)) }
    }
    next()
  })
  router.use((_req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next() })
  router.post('/login', async (req, res) => {
    const token = await auth.login(req.body?.password, req.ip ?? 'local')
    res.cookie('ct_admin_session', token, { httpOnly: true, sameSite: 'strict', secure: req.secure || process.env.NODE_ENV === 'production', path: '/api/admin', maxAge: 2 * 60 * 60_000 })
    res.json({ ok: true })
  })
  router.use((req, _res, next) => { auth.authorize(cookieValue(req.headers.cookie, 'ct_admin_session')); next() })
  router.get('/me', (_req, res) => res.json({ ok: true }))
  router.post('/logout', (req, res) => {
    auth.logout(cookieValue(req.headers.cookie, 'ct_admin_session'))
    res.clearCookie('ct_admin_session', { path: '/api/admin' }); res.json({ ok: true })
  })
  router.get('/catalog', async (_req, res) => res.json(await service.repository.catalog()))
  router.get('/users', async (req, res) => {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : ''
    if (q.length > 100) throw new AccountError('Từ khóa quá dài.')
    res.json(await service.repository.search(q))
  })
  router.get('/users/:id', async (req, res) => res.json(await service.repository.get(service.publicId(req.params.id))))
  router.post('/users/:id', async (req, res) => res.json(await service.change(req.params.id, req.body)))
  return router
}
