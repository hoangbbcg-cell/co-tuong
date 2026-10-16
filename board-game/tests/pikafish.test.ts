import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { PikafishService } from '../server/services/pikafishService'
import { fromUci, toUci } from '../src/game/moves/uci'
import { createGame } from '../src/game/state/initial'
import { applyMove, startGame } from '../src/game/moves/actions'
import { isMoveLegal } from '../src/game/rules'
import { createApplication } from '../server/app'
import type { AddressInfo } from 'node:net'
import { spawn } from 'node:child_process'
import { dirname } from 'node:path'
import { CandidateCollector } from '../server/services/pikafishCandidates'

describe('Pikafish UCI', () => {
  it('đổi tọa độ đúng cho hai đầu bàn', () => {
    expect(fromUci('a3a4')).toEqual({ from: { row: 6, col: 0 }, to: { row: 5, col: 0 } })
    expect(toUci({ from: { row: 0, col: 8 }, to: { row: 1, col: 8 } })).toBe('i9i8')
    expect(fromUci('a3a4\nquit')).toBeNull()
  })
  it('chỉ nhận cấp máy từ 1 đến 10', async () => {
    const service = new PikafishService('missing', 'missing')
    for (const level of [0, 11, 1.5, '2']) {
      await expect(service.move({ moves: [], remainingMs: 15000, level })).rejects.toMatchObject({ status: 400 })
    }
  })
  it('từ chối lịch sử sai luật và lệnh UCI chèn thêm', async () => {
    const service = new PikafishService('missing', 'missing')
    for (const moves of [['a3a9'], ['a6a5'], ['a3a4\nquit'], Array(501).fill('a3a4')]) {
      await expect(service.move({ moves, remainingMs: 10000 })).rejects.toMatchObject({ status: 400 })
    }
    await expect(service.move({ moves: [], remainingMs: NaN })).rejects.toMatchObject({ status: 400 })
    await expect(service.ready()).rejects.toThrow('Chưa cài engine')
  })
  const installed = process.platform === 'win32' && existsSync(fileURLToPath(new URL('../engines/pikafish/Pikafish-Windows-x86-64-universal.exe', import.meta.url)))
  it.skipIf(!installed)('MultiPV thật trả đủ top5 ở depth1 cho cấp yếu nhất', async () => {
    const binary = fileURLToPath(new URL('../engines/pikafish/Pikafish-Windows-x86-64-universal.exe', import.meta.url))
    const child = spawn(binary, [], { cwd: dirname(binary), windowsHide: true })
    const collector = new CandidateCollector(5)
    try {
      await new Promise<void>((resolve, reject) => {
        let buffer = ''
        const timeout = setTimeout(() => reject(new Error('UCI timeout')), 10000)
        child.on('error', reject)
        child.stdout.on('data', chunk => {
          buffer += String(chunk)
          let end: number
          while ((end = buffer.indexOf('\n')) >= 0) {
            const line = buffer.slice(0, end).trim(); buffer = buffer.slice(end + 1)
            if (line === 'uciok') child.stdin.write('setoption name Threads value 1\nsetoption name Hash value 16\nsetoption name MultiPV value 5\nisready\n')
            else if (line === 'readyok') child.stdin.write('position startpos\ngo depth 1\n')
            else if (line.startsWith('bestmove ')) { clearTimeout(timeout); resolve() }
            else collector.add(line)
          }
        })
        child.stdin.write('uci\n')
      })
      expect(collector.result()).toHaveLength(5)
      expect(new Set(collector.result().map(c => c.move)).size).toBe(5)
    } finally { child.kill() }
  }, 15000)
  it.skipIf(!installed)('cấp 1, 5, 10 đều trả nước hợp lệ từ engine thật', async () => {
    const service = new PikafishService()
    try {
      const game = startGame(createGame(0), 0)
      for (const level of [1, 5, 10]) {
        const move = await service.move({ moves: [], remainingMs: 600000, level })
        expect(isMoveLegal(move.from.row, move.from.col, move.to.row, move.to.col, game.board)).toBe(true)
      }
    } finally { service.close() }
  }, 30000)
  it.skipIf(!installed)('engine avoids the fifth repetition and rejects a history containing it', async () => {
    const service = new PikafishService()
    const round = ['b0c2', 'b9c7', 'c2b0', 'c7b9']
    const moves = [...round, ...round, ...round, ...round]
    try {
      const move = await service.move({ moves, remainingMs: 15000 })
      expect(toUci(move)).not.toBe('b0c2')
      await expect(service.move({ moves: [...moves, 'b0c2'], remainingMs: 15000 })).rejects.toMatchObject({ status: 400 })
    } finally { service.close() }
  }, 20000)
  it.skipIf(!installed)('HTTP khởi động engine, đáp nước và trả lỗi input đúng', async () => {
    const app = createApplication()
    try {
      await new Promise<void>(resolve => app.http.listen(0, '127.0.0.1', resolve))
      const url = `http://127.0.0.1:${(app.http.address() as AddressInfo).port}/api/pikafish`
      expect((await fetch(`${url}/ready`)).status).toBe(200)
      const post = (moves: string[]) => fetch(`${url}/move`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ moves, remainingMs: 15000 }) })
      const response = await post(['a3a4'])
      expect(response.status).toBe(200)
      const { move } = await response.json()
      expect(move.from.row).toBeLessThan(5)
      expect((await post(['a3a9'])).status).toBe(400)
      expect((await fetch(`${url}/ready`, { headers: { 'sec-fetch-site': 'cross-site' } })).status).toBe(403)
    } finally { await app.close() }
  }, 20000)
  it.skipIf(!installed)('engine thật trả nước hợp lệ cho đỏ và đen, và hủy tìm kiếm', async () => {
    const service = new PikafishService()
    try {
      await service.ready()
      let game = startGame(createGame(0), 0)
      const moves: string[] = []
      for (let ply = 0; ply < 4; ply++) {
        const move = await service.move({ moves, remainingMs: 15000 })
        expect(game.board[move.from.row][move.from.col]?.side).toBe(game.currentTurn)
        expect(isMoveLegal(move.from.row, move.from.col, move.to.row, move.to.col, game.board)).toBe(true)
        game = applyMove(game, move, 0)
        moves.push(toUci(move))
      }
      const controller = new AbortController()
      const pending = service.move({ moves: [], remainingMs: 600000 }, controller.signal)
      controller.abort()
      await expect(pending).rejects.toMatchObject({ status: 499 })
    } finally { service.close() }
  }, 30000)
})
