import { expect, it } from 'vitest'
import type { Request, Response } from 'express'
import { EventEmitter } from 'node:events'
import { fairyStockfishRouter } from '../server/controllers/fairyStockfishController'
import { FairyStockfishError, type FairyStockfishService } from '../server/services/fairyStockfishService'
import { computerErrorMessage, isJieqiComputerPath, JIEQI_COMPUTER_PATH } from '../src/lib/computerPresentation'

function invokeRouter(path: string, service: FairyStockfishService) {
  return new Promise<{ status: number; body: unknown }>((resolve, reject) => {
    const req = { url: path, path, method: path === '/ready' ? 'GET' : 'POST', ip: '127.0.0.1', get: () => undefined }
    const res = Object.assign(new EventEmitter(), {
      statusCode: 200, writableEnded: false,
      status(code: number) { this.statusCode = code; return this },
      json(body: unknown) { this.writableEnded = true; resolve({ status: this.statusCode, body }); return this },
    })
    fairyStockfishRouter(service)(req as unknown as Request, res as unknown as Response, error => reject(error ?? new Error('Unhandled request')))
  })
}

it('recognizes the public Cờ Úp URL and keeps old bookmarks compatible', () => {
  expect(JIEQI_COMPUTER_PATH).toBe('/co-up-ong-hoang')
  expect(isJieqiComputerPath('/co-up-ong-hoang')).toBe(true)
  expect(isJieqiComputerPath('/co-up-ong-hoang/')).toBe(true)
  expect(isJieqiComputerPath('/jieqi-ai')).toBe(true)
  expect(isJieqiComputerPath('/')).toBe(false)
})

it.each(['/ready', '/move'])('HTTP %s does not expose native diagnostics or filesystem paths', async path => {
  const diagnostic = 'Fairy-Stockfish failed: FAIRY_STOCKFISH_PATH C:/engines/pikafish.exe NNUE'
  const fail = async () => { throw new FairyStockfishError(diagnostic, 429) }
  const service = { ready: fail, move: fail } as unknown as FairyStockfishService
  const response = await invokeRouter(path, service)
  expect(response).toEqual({ status: 429, body: { error: computerErrorMessage() } })
})

it('unexpected engine failures are also returned as a public message', async () => {
  const response = await invokeRouter('/ready', { ready: async () => { throw new Error('spawn /private/engine ENOENT') } } as unknown as FairyStockfishService)
  expect(response).toEqual({ status: 503, body: { error: computerErrorMessage() } })
})
