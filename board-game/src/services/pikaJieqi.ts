import type { GameState, Move, PieceType, Side } from '../types/game'
import { fromUci } from '../game/moves/uci'
import { isMoveLegal } from '../game/rules'
import { candidateRepetition } from '../game/rules/repetition'

const letters: Record<PieceType, string> = {
  rook: 'R',
  advisor: 'A',
  cannon: 'C',
  soldier: 'P',
  horse: 'N',
  elephant: 'B',
  general: 'K',
}

const initial: Record<string, number> = {
  R: 2, A: 2, C: 2, P: 5, N: 2, B: 2,
}

function assert(value: unknown, message: string): asserts value {
  if (!value) throw new Error(message)
}

/**
 * Export only public information.
 * Never read piece.concealed.type or piece.concealed.name.
 */
export function jieqiPublicFen(game: GameState): string {
  assert(game.variant === 'jieqi', 'Only Jieqi is supported')
  assert(game.board.length === 10, 'Invalid board height')
  assert(game.currentTurn === 'red' || game.currentTurn === 'black', 'Invalid turn')

  const remaining: Record<Side, Record<string, number>> = {
    red: { ...initial },
    black: { ...initial },
  }
  const hidden: Record<Side, number> = { red: 0, black: 0 }
  const generals: Record<Side, number> = { red: 0, black: 0 }

  const rows = game.board.map(row => {
    assert(row.length === 9, 'Invalid board width')
    let result = ''
    let empty = 0

    for (const piece of row) {
      if (!piece) {
        empty++
        continue
      }

      if (empty) {
        result += String(empty)
        empty = 0
      }

      assert(piece.side === 'red' || piece.side === 'black', 'Invalid side')
      const letter = letters[piece.type]
      assert(letter, 'Invalid piece type')

      if (piece.concealed) {
        assert(piece.type !== 'general', 'General cannot be concealed')
        hidden[piece.side]++
        result += piece.side === 'red' ? 'X' : 'x'
      } else {
        if (piece.type === 'general') {
          generals[piece.side]++
        } else {
          remaining[piece.side][letter]--
        }
        result += piece.side === 'red' ? letter : letter.toLowerCase()
      }
    }

    if (empty) result += String(empty)
    return result
  })

  for (const capture of game.captures ?? []) {
    assert(capture.side === 'red' || capture.side === 'black', 'Invalid capture side')
    // An unknown captured identity cannot safely be reconstructed.
    assert(capture.type !== null, 'Unknown captured identity')
    if (capture.type !== 'general') {
      const letter = letters[capture.type]
      assert(letter, 'Invalid capture type')
      remaining[capture.side][letter]--
    }
  }

  assert(generals.red === 1 && generals.black === 1, 'Missing general')

  for (const side of ['red', 'black'] as const) {
    assert(
      Object.values(remaining[side]).every(count => count >= 0),
      'Negative remaining piece count',
    )
    assert(
      Object.values(remaining[side]).reduce((a, b) => a + b, 0) === hidden[side],
      'Unknown identity pool does not match concealed pieces',
    )
  }

  const pool = (['red', 'black'] as const).map(side =>
    Object.entries(remaining[side])
      .filter(([, count]) => count > 0)
      .map(([letter, count]) =>
        `${side === 'red' ? letter : letter.toLowerCase()}${count}`)
      .join(''),
  ).join('')

  return `${rows.join('/')} ${game.currentTurn === 'red' ? 'w' : 'b'} ${pool} 0 1`
}

export function validateJieqiEngineMove(game: GameState, uci: string): Move {
  assert(game.variant === 'jieqi', 'Only Jieqi is supported')
  const move = fromUci(uci)
  assert(move, 'Invalid engine move')
  assert(
    game.board[move.from.row]?.[move.from.col]?.side === game.currentTurn,
    'Engine selected the wrong side',
  )
  assert(
    isMoveLegal(
      move.from.row, move.from.col,
      move.to.row, move.to.col, game.board,
    ),
    'Engine returned an illegal move',
  )
  assert(
    !candidateRepetition(game, move).forbidden,
    'Engine returned a forbidden repetition',
  )
  return move
}

export async function pikaJieqiMove(
  game: GameState,
  signal?: AbortSignal,
  depth = 3,
): Promise<Move> {
  const fen = jieqiPublicFen(game)
  assert(Number.isInteger(depth) && depth >= 1 && depth <= 12, 'Invalid depth')
  assert(typeof Worker !== 'undefined', 'Web Workers are unavailable')
  assert(typeof crossOriginIsolated !== 'undefined' && crossOriginIsolated,
    'PikaJieQi requires cross-origin isolation')
  assert(!signal?.aborted, 'Engine request cancelled')

  const base = `${import.meta.env.BASE_URL}jieqi/`
  const worker = new Worker(`${base}worker.js`)
  let timer: ReturnType<typeof setTimeout> | undefined

  try {
    return await new Promise<Move>((resolve, reject) => {
      let finished = false
      let initialized = false
      let searchStarted = false

      const cleanup = () => {
        if (timer !== undefined) clearTimeout(timer)
        signal?.removeEventListener('abort', onAbort)
        worker.removeEventListener('message', onMessage)
        worker.removeEventListener('error', onError)
      }

      const fail = (reason: string) => {
        if (finished) return
        finished = true
        cleanup()
        reject(new Error(reason))
      }

      const onAbort = () => fail('Engine request cancelled')
      const onError = () => fail('PikaJieQi worker failed')

      const onMessage = (event: MessageEvent) => {
        if (finished) return
        const message = event.data

        if (message?.type === 'error') {
          fail(String(message.error))
          return
        }

        if (message?.type === 'ready' && !initialized) {
          initialized = true
          worker.postMessage({ type: 'command', command: 'uci' })
          return
        }

        if (message?.type !== 'line' || typeof message.line !== 'string') return

        const line = message.line.trim()
        if (line === 'uciok' && initialized && !searchStarted) {
          searchStarted = true
          worker.postMessage({ type: 'command', command: `position fen ${fen}` })
          worker.postMessage({ type: 'command', command: `go depth ${depth}` })
          return
        }

        const best = /^bestmove\s+([a-i][0-9][a-i][0-9])(?:\s|$)/.exec(line)
        if (best) {
          try {
            const move = validateJieqiEngineMove(game, best[1])
            finished = true
            cleanup()
            resolve(move)
          } catch (error) {
            fail(error instanceof Error ? error.message : String(error))
          }
        } else if (/^bestmove\b/.test(line)) {
          fail('Engine did not return a usable move')
        }
      }

      signal?.addEventListener('abort', onAbort, { once: true })
      worker.addEventListener('message', onMessage)
      worker.addEventListener('error', onError)
      timer = setTimeout(() => fail('PikaJieQi timed out'), 30000)

      if (signal?.aborted) {
        onAbort()
        return
      }

      worker.postMessage({
        type: 'init',
        jsUrl: new URL(`${base}pikajieqi.js`, location.href).href,
        wasmUrl: new URL(`${base}pikajieqi.wasm`, location.href).href,
      })
    })
  } finally {
    worker.terminate()
  }
}