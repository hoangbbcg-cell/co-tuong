import { Router } from 'express'
import { PikafishError, type PikafishService } from '../services/pikafishService'

export function pikafishRouter(service: PikafishService) {
  const router = Router()
  router.use((req, res, next) => {
    if (req.get('sec-fetch-site') === 'cross-site') { res.status(403).json({ error: 'Yêu cầu khác nguồn bị từ chối.' }); return }
    next()
  })
  router.all(['/ready', '/move'], async (req, res, next) => {
    if (!(req.path === '/ready' && req.method === 'GET' || req.path === '/move' && req.method === 'POST')) { res.sendStatus(405); return }
    const controller = new AbortController()
    const cancel = () => controller.abort()
    res.on('close', cancel)
    try {
      if (req.path === '/ready') { await service.ready(controller.signal); res.json({ ready: true }) }
      else res.json({ move: await service.move(req.body, controller.signal) })
    } catch (error) {
      if (!controller.signal.aborted) {
        if (error instanceof PikafishError) res.status(error.status).json({ error: error.message })
        else next(error)
      }
    } finally { res.off('close', cancel) }
  })
  return router
}
