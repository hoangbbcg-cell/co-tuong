import type { Request, RequestHandler } from 'express'

interface Entry {
  started: number
  count: number
}

interface Options {
  maxRequests: number
  windowMs?: number
  key?: (req: Request) => string
}

export function httpRateLimit(options: Options): RequestHandler {
  const windowMs = options.windowMs ?? 60_000
  const entries = new Map<string, Entry>()
  let lastCleanup = 0

  return (req, res, next) => {
    const now = Date.now()

    if (now - lastCleanup >= windowMs) {
      for (const [key, entry] of entries) {
        if (now - entry.started >= windowMs) {
          entries.delete(key)
        }
      }
      lastCleanup = now
    }

    const key = options.key?.(req) || req.ip || 'unknown'
    const entry = entries.get(key)

    if (!entry || now - entry.started >= windowMs) {
      if (!entry && entries.size >= 10_000) {
        res.setHeader('Retry-After', '60')
        res.status(503).json({
          error: 'Máy chủ đang bận. Vui lòng thử lại.'
        })
        return
      }

      entries.set(key, {
        started: now,
        count: 1
      })

      next()
      return
    }

    if (entry.count >= options.maxRequests) {
      const remaining = Math.max(
        1,
        Math.ceil((windowMs - (now - entry.started)) / 1000)
      )

      res.setHeader('Retry-After', String(remaining))
      res.status(429).json({
        error: 'Thao tác quá nhanh. Vui lòng thử lại sau.'
      })
      return
    }

    entry.count++
    next()
  }
}