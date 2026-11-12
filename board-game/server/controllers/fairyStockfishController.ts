import { Router } from 'express'
import { httpRateLimit } from './httpRateLimit'
import { FairyStockfishError, type FairyStockfishService } from '../services/fairyStockfishService'
import { computerErrorMessage } from '../../src/lib/computerPresentation'

export function fairyStockfishRouter(service: FairyStockfishService) {
  const router = Router()
  router.use('/ready', httpRateLimit({ maxRequests: 10 }))
  router.use('/move', httpRateLimit({ maxRequests: 30 }))
  router.use((req, res, next) => {
    if (req.get('sec-fetch-site') === 'cross-site') { res.status(403).json({ error: 'Yêu cầu khác nguồn bị từ chối.' }); return }
    next()
  })
  router.all(['/ready', '/move'], async (req, res) => {
    if (!(req.path === '/ready' && req.method === 'GET' || req.path === '/move' && req.method === 'POST')) { res.sendStatus(405); return }
    const controller = new AbortController()
    const cancel = () => { if (!res.writableEnded) controller.abort() }
    res.on('close', cancel)
    try {
      if (req.path === '/ready') { await service.ready(controller.signal); if (!controller.signal.aborted) res.json({ ready: true }) }
      else { const move = await service.move(req.body, controller.signal); if (!controller.signal.aborted) res.json({ move }) }
    } catch (error) {
      if (!controller.signal.aborted) {
        res.status(error instanceof FairyStockfishError ? error.status : 503).json({ error: computerErrorMessage() })
      }
    } finally { res.off('close', cancel) }
  })
  return router
}
