import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { existsSync } from 'node:fs'
import { availableParallelism } from 'node:os'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGame } from '../../src/game/state/initial'
import { gameFromPositionFen, positionFen } from '../../src/game/state/customPosition'
import { applyMove, startGame } from '../../src/game/moves/actions'
import { fromUci, toUci } from '../../src/game/moves/uci'
import { candidateRepetition, getMoveHints } from '../../src/game/rules/repetition'
import { isMoveLegal } from '../../src/game/rules'
import type { Move } from '../../src/types/game'
import { PIKAFISH_LEVELS, parseUciOption, profileOptions, profileSearch, type PikafishLevelProfile, type UciOption } from './pikafishLevels'
import { CandidateCollector, PIKAFISH_MOVE_WEIGHTS, avoidsImmediateLoss, chooseCandidate, legalCandidates, type PikafishCandidate } from './pikafishCandidates'

export class PikafishError extends Error {
  constructor(message: string, readonly status = 503) { super(message) }
}

const engineRoot = fileURLToPath(new URL('../../engines/pikafish/', import.meta.url))
interface SearchResult { bestmove: string | null; candidates: PikafishCandidate[] }
export class PikafishService {
  private readonly children = new Set<ChildProcessWithoutNullStreams>()
  constructor(private readonly binary = resolve(process.env.PIKAFISH_PATH || resolve(engineRoot, process.platform === 'win32' ? 'Pikafish-Windows-x86-64-universal.exe' : 'pikafish')), private readonly evalFile = resolve(process.env.PIKAFISH_EVAL_FILE || resolve(engineRoot, 'pikafish.nnue'))) {}

  close() { for (const child of this.children) child.kill() }

  async ready(signal?: AbortSignal): Promise<void> {
    const result = await this.run([], { ...PIKAFISH_LEVELS[1], search: { type: 'movetime', value: 50 }, maxMoveTime: 50 }, 15000, signal)
    if (!result.bestmove || !fromUci(result.bestmove)) throw new PikafishError('Ông Hoàng chưa sẵn sàng.')
  }

  async move(input: unknown, signal?: AbortSignal): Promise<Move> {
    if (!input || typeof input !== 'object' || !('moves' in input) || !Array.isArray(input.moves) || input.moves.length > 500 || !('remainingMs' in input) || typeof input.remainingMs !== 'number' || !Number.isFinite(input.remainingMs) || input.remainingMs <= 0 || input.remainingMs > 1800000) {
      throw new PikafishError('Dữ liệu ván đấu không hợp lệ (tối đa 500 nước).', 400)
    }
    const level = 'level' in input ? input.level : 10
    if (typeof level !== 'number' || !Number.isInteger(level) || level < 1 || level > 10) throw new PikafishError('Cấp độ máy không hợp lệ.', 400)
    let initial = createGame(0)
    let initialFen: string | undefined
    if ('initialFen' in input) {
      try {
        initial = gameFromPositionFen(input.initialFen)
        initialFen = positionFen(initial.board, initial.currentTurn)
      } catch (error) { throw new PikafishError(error instanceof Error ? error.message : 'Thế cờ không hợp lệ.', 400) }
    }
    let game = startGame(initial, 0)
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
    const baseProfile = PIKAFISH_LEVELS[level as keyof typeof PIKAFISH_LEVELS]
    let profile: PikafishLevelProfile = baseProfile
    if ('thinkMs' in input) {
      if (level !== 10 || typeof input.thinkMs !== 'number' || !Number.isInteger(input.thinkMs) || input.thinkMs < 100 || input.thinkMs > 2500) throw new PikafishError('Thời gian tính không hợp lệ.', 400)
      profile = { ...baseProfile, search: { type: 'movetime', value: input.thinkMs }, maxMoveTime: input.thinkMs }
    }
    const allowed: string[] = []
    let hasForbidden = false
    game.board.forEach((rank, row) => rank.forEach((piece, col) => {
      if (piece?.side !== game.currentTurn) return
      for (const hint of getMoveHints(game, { row, col })) {
        if (hint.type === 'repetition-forbidden') hasForbidden = true
        else allowed.push(toUci({ from: { row, col }, to: hint }))
      }
    }))
    if (hasForbidden && !allowed.length) throw new PikafishError('Không còn nước đi được phép theo luật chống lặp.')
    const weights = PIKAFISH_MOVE_WEIGHTS[level]
    const result = await this.run(history, profile, input.remainingMs, signal, hasForbidden ? allowed : undefined, Math.min(weights.length, allowed.length), initialFen)
    let selected = result.bestmove
    if (level < 10) {
      const candidates = legalCandidates(game, result.candidates)
      const safe = candidates.filter(candidate => avoidsImmediateLoss(game, candidate))
      selected = chooseCandidate(safe.length ? safe : candidates, weights) ?? result.bestmove
    }
    const move = selected ? fromUci(selected) : null
    if (!move || game.board[move.from.row][move.from.col]?.side !== game.currentTurn || !isMoveLegal(move.from.row, move.from.col, move.to.row, move.to.col, game.board)) {
      throw new PikafishError('Ông Hoàng không trả về nước đi hợp lệ.')
    }
    if (candidateRepetition(game, move).forbidden) throw new PikafishError('Ông Hoàng trả về nước đi lặp bị cấm.')
    return move
  }

  private run(moves: string[], profile: PikafishLevelProfile, remainingMs: number, signal?: AbortSignal, searchMoves?: string[], candidateCount = 1, initialFen?: string): Promise<SearchResult> {
    if (signal?.aborted) return Promise.reject(new PikafishError('Đã hủy lượt máy.', 499))
    if (!existsSync(this.binary) || !existsSync(this.evalFile)) return Promise.reject(new PikafishError('Chưa cài engine Ông Hoàng/NNUE trên máy chủ. Xem engines/pikafish/README.md.'))
    if (this.children.size >= 2) return Promise.reject(new PikafishError('Ông Hoàng đang bận. Vui lòng thử lại.', 429))
    return new Promise((resolveResult, reject) => {
      const child = spawn(this.binary, [], { cwd: dirname(this.binary), windowsHide: true, shell: false })
      this.children.add(child)
      let settled = false
      let buffer = ''
      let stage: 'uci' | 'ready' | 'search' = 'uci'
      const options = new Map<string, UciOption>()
      let collector = new CandidateCollector(1)
      let searchDeadline: ReturnType<typeof setTimeout> | undefined
      const finish = (error?: Error, bestmove: string | null = null) => {
        if (settled) return
        settled = true
        clearTimeout(timeout)
        clearTimeout(searchDeadline)
        signal?.removeEventListener('abort', cancel)
        child.kill()
        if (error) reject(error)
        else resolveResult({ bestmove, candidates: collector.result() })
      }
      const cancel = () => finish(new PikafishError('Đã hủy lượt máy.', 499))
      const timeout = setTimeout(() => finish(new PikafishError('Ông Hoàng phản hồi quá lâu. Vui lòng thử lại.')), 15000)
      signal?.addEventListener('abort', cancel, { once: true })
      child.on('close', () => { this.children.delete(child); finish(new PikafishError('Ông Hoàng dừng đột ngột. Kiểm tra bản engine và mạng NNUE.')) })
      child.on('error', () => finish(new PikafishError('Không khởi động được Ông Hoàng. Kiểm tra đường dẫn và CPU hỗ trợ.')))
      child.stdin.on('error', () => finish(new PikafishError('Mất kết nối với Ông Hoàng.')))
      child.stderr.resume()
      child.stdout.setEncoding('utf8')
      child.stdout.on('data', (chunk: string) => {
        buffer += chunk
        if (buffer.length > 65536) { finish(new PikafishError('Phản hồi Ông Hoàng không hợp lệ.')); return }
        let end: number
        while ((end = buffer.indexOf('\n')) >= 0 && !settled) {
          const line = buffer.slice(0, end).trim()
          buffer = buffer.slice(end + 1)
          if (stage === 'uci') {
            const parsed = parseUciOption(line)
            if (parsed) options.set(parsed.name, parsed.option)
          }
          if (stage === 'uci' && line === 'uciok') {
            stage = 'ready'
            // Relative NNUE paths also work in Windows workspaces with Unicode names.
            const multiPV = options.get('MultiPV')
            const count = multiPV?.type === 'spin' && multiPV.min !== undefined && multiPV.max !== undefined ? Math.max(multiPV.min, Math.min(multiPV.max, candidateCount)) : 1
            collector = new CandidateCollector(count)
            const commands = profileOptions(options, profile, availableParallelism(), relative(dirname(this.binary), this.evalFile), count)
            child.stdin.write([...commands, 'ucinewgame', 'isready', ''].join('\n'))
          } else if (stage === 'ready' && line === 'readyok') {
            stage = 'search'
            const search = profileSearch(profile, remainingMs)
            child.stdin.write(`position ${initialFen ? `fen ${initialFen}` : 'startpos'}${moves.length ? ` moves ${moves.join(' ')}` : ''}\n${search.command}${searchMoves ? ` searchmoves ${searchMoves.join(' ')}` : ''}\n`)
            searchDeadline = setTimeout(() => { if (!settled) child.stdin.write('stop\n') }, search.stopAfterMs)
          } else if (stage === 'search') {
            if (line.startsWith('bestmove ')) finish(undefined, line.split(/\s+/)[1])
            else collector.add(line)
          }
        }
      })
      child.stdin.write('uci\n')
    })
  }
}
