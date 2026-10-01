import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { existsSync } from 'node:fs'
import { availableParallelism } from 'node:os'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGame } from '../../src/game/state/initial'
import { applyMove, startGame } from '../../src/game/moves/actions'
import { fromUci } from '../../src/game/moves/uci'
import { isMoveLegal } from '../../src/game/rules'
import type { Move } from '../../src/types/game'

export class PikafishError extends Error {
  constructor(message: string, readonly status = 503) { super(message) }
}

const engineRoot = fileURLToPath(new URL('../../engines/pikafish/', import.meta.url))
export class PikafishService {
  private readonly children = new Set<ChildProcessWithoutNullStreams>()
  constructor(private readonly binary = resolve(process.env.PIKAFISH_PATH || resolve(engineRoot, process.platform === 'win32' ? 'Pikafish-Windows-x86-64-universal.exe' : 'pikafish')), private readonly evalFile = resolve(process.env.PIKAFISH_EVAL_FILE || resolve(engineRoot, 'pikafish.nnue'))) {}

  close() { for (const child of this.children) child.kill() }

  async ready(signal?: AbortSignal): Promise<void> {
    const move = await this.run([], 50, signal)
    if (!move || !fromUci(move)) throw new PikafishError('Pikafish chưa sẵn sàng.')
  }

  async move(input: unknown, signal?: AbortSignal): Promise<Move> {
    if (!input || typeof input !== 'object' || !('moves' in input) || !Array.isArray(input.moves) || input.moves.length > 500 || !('remainingMs' in input) || typeof input.remainingMs !== 'number' || !Number.isFinite(input.remainingMs) || input.remainingMs <= 0 || input.remainingMs > 1800000) {
      throw new PikafishError('Dữ liệu ván đấu không hợp lệ (tối đa 500 nước).', 400)
    }
    let game = startGame(createGame(0), 0)
    const history: string[] = []
    for (const token of input.moves) {
      const move = typeof token === 'string' ? fromUci(token) : null
      if (!move || game.phase !== 'playing') throw new PikafishError('Lịch sử nước đi không hợp lệ.', 400)
      const next = applyMove(game, move, 0)
      if (next.board === game.board) throw new PikafishError('Lịch sử có nước đi sai luật.', 400)
      history.push(token)
      game = next
    }
    if (game.phase !== 'playing') throw new PikafishError('Ván đấu đã kết thúc.', 400)
    // Leave a clock margin for the request, engine startup and animation.
    const thinkMs = Math.max(50, Math.min(1000, Math.floor(input.remainingMs / 30)))
    const result = await this.run(history, thinkMs, signal)
    const move = result ? fromUci(result) : null
    if (!move || game.board[move.from.row][move.from.col]?.side !== game.currentTurn || !isMoveLegal(move.from.row, move.from.col, move.to.row, move.to.col, game.board)) {
      throw new PikafishError('Pikafish không trả về nước đi hợp lệ.')
    }
    return move
  }

  private run(moves: string[], thinkMs: number, signal?: AbortSignal): Promise<string | null> {
    if (signal?.aborted) return Promise.reject(new PikafishError('Đã hủy lượt máy.', 499))
    if (!existsSync(this.binary) || !existsSync(this.evalFile)) return Promise.reject(new PikafishError('Chưa cài engine Pikafish/NNUE trên máy chủ. Xem engines/pikafish/README.md.'))
    if (this.children.size >= 2) return Promise.reject(new PikafishError('Pikafish đang bận. Vui lòng thử lại.', 429))
    return new Promise((resolveResult, reject) => {
      const child = spawn(this.binary, [], { cwd: dirname(this.binary), windowsHide: true, shell: false })
      this.children.add(child)
      let settled = false
      let buffer = ''
      let stage: 'uci' | 'ready' | 'search' = 'uci'
      const finish = (error?: Error, result: string | null = null) => {
        if (settled) return
        settled = true
        clearTimeout(timeout)
        signal?.removeEventListener('abort', cancel)
        child.kill()
        if (error) reject(error)
        else resolveResult(result)
      }
      const cancel = () => finish(new PikafishError('Đã hủy lượt máy.', 499))
      const timeout = setTimeout(() => finish(new PikafishError('Pikafish phản hồi quá lâu. Vui lòng thử lại.')), 15000)
      signal?.addEventListener('abort', cancel, { once: true })
      child.on('close', () => { this.children.delete(child); finish(new PikafishError('Pikafish dừng đột ngột. Kiểm tra bản engine và mạng NNUE.')) })
      child.on('error', () => finish(new PikafishError('Không khởi động được Pikafish. Kiểm tra đường dẫn và CPU hỗ trợ.')))
      child.stdin.on('error', () => finish(new PikafishError('Mất kết nối với Pikafish.')))
      child.stderr.resume()
      child.stdout.setEncoding('utf8')
      child.stdout.on('data', (chunk: string) => {
        buffer += chunk
        if (buffer.length > 65536) { finish(new PikafishError('Phản hồi Pikafish không hợp lệ.')); return }
        let end: number
        while ((end = buffer.indexOf('\n')) >= 0 && !settled) {
          const line = buffer.slice(0, end).trim()
          buffer = buffer.slice(end + 1)
          if (stage === 'uci' && line === 'uciok') {
            stage = 'ready'
            // Relative NNUE paths also work in Windows workspaces with Unicode names.
            child.stdin.write(`setoption name Threads value ${Math.min(4, availableParallelism())}\nsetoption name Hash value 128\nsetoption name EvalFile value ${relative(dirname(this.binary), this.evalFile)}\nucinewgame\nisready\n`)
          } else if (stage === 'ready' && line === 'readyok') {
            stage = 'search'
            child.stdin.write(`position startpos${moves.length ? ` moves ${moves.join(' ')}` : ''}\ngo movetime ${thinkMs}\n`)
          } else if (stage === 'search' && line.startsWith('bestmove ')) finish(undefined, line.split(/\s+/)[1])
        }
      })
      child.stdin.write('uci\n')
    })
  }
}
