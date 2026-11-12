import { choosePracticeMove, PracticeAiAborted } from './practiceAi'
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { existsSync } from 'node:fs'
import { availableParallelism } from 'node:os'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGame } from '../../src/game/state/initial'
import { gameFromPositionFen, positionFen } from '../../src/game/state/customPosition'
import { applyMove, startGame } from '../../src/game/moves/actions'
import { fromUci, toUci } from '../../src/game/moves/uci'
import { candidateRepetition } from '../../src/game/rules/repetition'
import { isMoveLegal } from '../../src/game/rules'
import { fairyLevel } from './fairyStockfishLevels'
import type { Move } from '../../src/types/game'

export class FairyStockfishError extends Error {
  constructor(message: string, readonly status = 503) { super(message) }
}

const engineRoot = fileURLToPath(new URL('../../engines/fairy-stockfish/', import.meta.url))
export function gameMoveToFairy(move: string): string {
  const parsed = fromUci(move)
  if (!parsed) throw new FairyStockfishError('Lịch sử nước đi không hợp lệ.', 400)
  return toFairyUci(move, 1)
}
export function fairyMoveToGame(move: string): string {
  if (!/^[a-i](?:[1-9]|10)[a-i](?:[1-9]|10)$/.test(move)) throw new FairyStockfishError('Fairy-Stockfish trả về tọa độ không hợp lệ.')
  const match = /^([a-i])(10|[1-9])([a-i])(10|[1-9])$/.exec(move)!
  const rank = (value: string) => String(Number(value) - 1)
  return `${match[1]}${rank(match[2])}${match[3]}${rank(match[4])}`
}
function toFairyUci(move: string, offset: number): string {
  const match = /^([a-i])([0-9])([a-i])([0-9])$/.exec(move)!
  return `${match[1]}${Number(match[2]) + offset}${match[3]}${Number(match[4]) + offset}`
}

interface Input { moves: string[]; remainingMs: number; level?: number; initialFen?: string }
function fairyHashMb(level: number): number {
  if (level <= 4) return 16
  if (level <= 6) return 32
  if (level === 7) return 64
  return 128
}
export class FairyStockfishService {
  private readonly children = new Set<ChildProcessWithoutNullStreams>()
  private readonly practiceRequests = new Set<AbortController>()
  private readonly binary: string
  private readonly evalFile?: string
  constructor(binary = process.env.FAIRY_STOCKFISH_PATH || resolve(engineRoot, process.platform === 'win32' ? 'fairy-stockfish_x86-64-modern.exe' : 'fairy-stockfish'), evalFile = process.env.FAIRY_STOCKFISH_EVAL_FILE) {
    this.binary = resolve(binary)
    this.evalFile = evalFile ? resolve(evalFile) : undefined
  }
  close() { for (const child of this.children) child.kill(); for (const request of this.practiceRequests) request.abort() }

  async ready(signal?: AbortSignal) {
    const result = await this.run('startpos', [], 7, 50, signal)
    if (!result) throw new FairyStockfishError('Fairy-Stockfish chưa sẵn sàng.')
  }

  async move(value: unknown, signal?: AbortSignal): Promise<Move> {
    if (!value || typeof value !== 'object' || !('moves' in value) || !Array.isArray(value.moves) || value.moves.length > 500 || value.moves.some(move => typeof move !== 'string') || !('remainingMs' in value) || typeof value.remainingMs !== 'number' || !Number.isFinite(value.remainingMs) || value.remainingMs <= 0 || value.remainingMs > 1_800_000) throw new FairyStockfishError('Dữ liệu ván đấu không hợp lệ (tối đa 500 nước).', 400)
    const input = value as Input
    const level = input.level ?? 10
    if (!Number.isInteger(level) || level < 1 || level > 10) throw new FairyStockfishError('Cấp độ máy không hợp lệ.', 400)
    let initial = createGame(0)
    let fen: string | undefined
    if (input.initialFen !== undefined) {
      try { initial = gameFromPositionFen(input.initialFen); fen = positionFen(initial.board, initial.currentTurn) }
      catch (error) { throw new FairyStockfishError(error instanceof Error ? error.message : 'Thế cờ không hợp lệ.', 400) }
    }
    let game = startGame(initial, 0)
    const history = input.moves.map(move => {
      const parsed = fromUci(move)
      if (!parsed || game.phase !== 'playing') throw new FairyStockfishError('Lịch sử nước đi không hợp lệ.', 400)
      const next = applyMove(game, parsed, 0)
      if (next.board === game.board) throw new FairyStockfishError('Lịch sử có nước đi sai luật.', 400)
      game = next
      return gameMoveToFairy(move)
    })
    if (game.phase !== 'playing') throw new FairyStockfishError('Ván đấu đã kết thúc.', 400)
    if (signal?.aborted) throw new FairyStockfishError('Đã hủy lượt máy.', 499)
    if (level <= 6) {
      if (this.practiceRequests.size >= 2) throw new FairyStockfishError('Máy đang bận. Vui lòng thử lại.', 429)
      const controller = new AbortController()
      const abort = () => controller.abort()
      signal?.addEventListener('abort', abort, { once: true })
      this.practiceRequests.add(controller)
      try {
        const move = await choosePracticeMove(game, level, controller.signal)
        if (!move) throw new FairyStockfishError('Máy không tìm được nước đi hợp lệ.')
        return move
      } catch (error) {
        if (error instanceof PracticeAiAborted) throw new FairyStockfishError('Đã hủy lượt máy.', 499)
        throw error
      } finally { signal?.removeEventListener('abort', abort); this.practiceRequests.delete(controller) }
    }
    const maxTime = Math.max(50, Math.min(800, Math.floor(input.remainingMs / 30)))
    const result = await this.run(fen ? `fen ${fen}` : 'startpos', history, level, maxTime, signal)
    if (!result) throw new FairyStockfishError('Fairy-Stockfish không tìm được nước đi hợp lệ.')
    const move = fromUci(fairyMoveToGame(result))
    if (!move || game.board[move.from.row][move.from.col]?.side !== game.currentTurn || !isMoveLegal(move.from.row, move.from.col, move.to.row, move.to.col, game.board)) throw new FairyStockfishError('Fairy-Stockfish trả về nước đi không hợp lệ.')
    if (candidateRepetition(game, move).forbidden) throw new FairyStockfishError('Fairy-Stockfish trả về nước lặp bị cấm.')
    return move
  }

  private run(position: string, moves: string[], level: number, maxTime: number, signal?: AbortSignal): Promise<string | null> {
    if (signal?.aborted) return Promise.reject(new FairyStockfishError('Đã hủy lượt máy.', 499))
    if (process.platform !== 'win32' && this.binary.toLowerCase().endsWith('.exe')) return Promise.reject(new FairyStockfishError('Không thể chạy engine Windows trên máy chủ Linux. Hãy cấu hình FAIRY_STOCKFISH_PATH tới binary Linux.'))
    if (!existsSync(this.binary)) return Promise.reject(new FairyStockfishError('Không tìm thấy Fairy-Stockfish. Cấu hình FAIRY_STOCKFISH_PATH.'))
    if (this.evalFile && !existsSync(this.evalFile)) return Promise.reject(new FairyStockfishError('Không tìm thấy file NNUE đã cấu hình.'))
    if (this.children.size >= 2) return Promise.reject(new FairyStockfishError('Fairy-Stockfish đang bận. Vui lòng thử lại.', 429))
    return new Promise((resolveResult, reject) => {
      const child = spawn(this.binary, [], { cwd: dirname(this.binary), windowsHide: true, shell: false })
      this.children.add(child)
      let settled = false, buffer = '', nnueLoaded = false
      let stage: 'uci' | 'ready' | 'search' = 'uci'
      const options = new Map<string, string>()
      const cleanup = () => { clearTimeout(timeout); clearTimeout(searchDeadline); signal?.removeEventListener('abort', cancel); child.kill() }
      const finish = (error?: Error, result: string | null = null) => { if (settled) return; settled = true; cleanup(); error ? reject(error) : resolveResult(result) }
      const cancel = () => finish(new FairyStockfishError('Đã hủy lượt máy.', 499))
      const timeout = setTimeout(() => finish(new FairyStockfishError('Fairy-Stockfish phản hồi quá lâu.')), 15_000)
      let searchDeadline: ReturnType<typeof setTimeout> | undefined
      signal?.addEventListener('abort', cancel, { once: true })
      child.once('close', () => { this.children.delete(child) })
      child.on('close', () => finish(new FairyStockfishError('Fairy-Stockfish dừng đột ngột.')))
      child.on('error', () => finish(new FairyStockfishError('Không khởi động được Fairy-Stockfish.')))
      child.stdin.on('error', () => finish(new FairyStockfishError('Mất kết nối với Fairy-Stockfish.')))
      child.stderr.resume(); child.stdout.setEncoding('utf8')
      child.stdout.on('data', (chunk: string) => {
        buffer += chunk
        if (buffer.length > 65536) { finish(new FairyStockfishError('Phản hồi Fairy-Stockfish không hợp lệ.')); return }
        let end: number
        while ((end = buffer.indexOf('\n')) >= 0 && !settled) {
          const line = buffer.slice(0, end).trim(); buffer = buffer.slice(end + 1)
          if (line.startsWith('option name ')) options.set(line.slice(12).split(' type ')[0], line)
          if (line.includes('NNUE evaluation using') && line.endsWith('enabled')) nnueLoaded = true
          if (line.includes('classical evaluation enabled')) { finish(new FairyStockfishError('Fairy-Stockfish đang dùng đánh giá cổ điển; NNUE chưa nạp.')); break }
          if (stage === 'uci' && line === 'uciok') {
            const variant = options.get('UCI_Variant')
            if (!variant?.includes('xiangqi')) { finish(new FairyStockfishError('Engine không quảng bá UCI_Variant xiangqi.')); break }
            if (!options.has('Use NNUE')) { finish(new FairyStockfishError('Engine không quảng bá tùy chọn Use NNUE.')); break }
            stage = 'ready'
            const threadOption = options.get('Threads'), hashOption = options.get('Hash')
            const max = (line: string | undefined, fallback: number) => Math.max(1, Math.min(fallback, Number(/max (\d+)/.exec(line ?? '')?.[1] ?? fallback)))
            const commands = ['setoption name UCI_Variant value xiangqi', 'setoption name Use NNUE value true']
            const profile = fairyLevel(level)
            const skillOption = options.get('Skill Level')
            if (skillOption?.includes('type spin')) {
              const low = Number(/min (-?\d+)/.exec(skillOption)?.[1] ?? 0)
              const high = Number(/max (-?\d+)/.exec(skillOption)?.[1] ?? 20)
              commands.push(`setoption name Skill Level value ${Math.max(low, Math.min(high, profile.skill))}`)
            }
            if (options.has('UCI_LimitStrength')) commands.push('setoption name UCI_LimitStrength value false')
            if (options.has('MultiPV')) commands.push('setoption name MultiPV value 1')
            if (threadOption?.includes('type spin')) commands.push(`setoption name Threads value ${Math.min(2, availableParallelism(), max(threadOption, 2))}`)
            if (hashOption?.includes('type spin')) commands.push(`setoption name Hash value ${Math.min(fairyHashMb(level), max(hashOption, fairyHashMb(level)))}`)
            if (this.evalFile && options.has('EvalFile')) commands.push(`setoption name EvalFile value ${this.evalFile}`)
            child.stdin.write([...commands, 'ucinewgame', 'isready', ''].join('\n'))
          } else if (stage === 'ready' && line === 'readyok') {
            stage = 'search'
            const depth = fairyLevel(level).depth
            child.stdin.write(`position ${position}${moves.length ? ` moves ${moves.join(' ')}` : ''}\ngo ${depth === null ? `movetime ${maxTime}` : `depth ${depth}`}\n`)
            searchDeadline = setTimeout(() => { if (!settled) child.stdin.write('stop\n') }, maxTime)
          } else if (stage === 'search' && line.startsWith('bestmove ')) {
            if (!nnueLoaded) finish(new FairyStockfishError('Fairy-Stockfish chưa xác nhận nạp NNUE.'))
            else { const token = line.split(/\s+/)[1]; finish(undefined, token === '(none)' || token === '0000' ? null : token) }
          }
        }
      })
      child.stdin.write('uci\n')
    })
  }
}
