import { useEffect, useRef, useState } from 'react'
import type { GameState, Move, Side } from '../../../types/game'
import { positionFen } from '../../../game/state/customPosition'
import { getLegalMoves } from '../../../game/rules'
import { candidateRepetition } from '../../../game/rules/repetition'
import { pikafishApi } from '../../../services/pikafish'
import { errorMessage } from '../../../services/api'

interface HintContext {
  board: GameState['board']; turn: Side; phase: GameState['phase']
  humanSide: Side; enabled: boolean; revision: unknown
}
const sameContext = (a: HintContext, b: HintContext) => a.board === b.board && a.turn === b.turn
  && a.phase === b.phase && a.humanSide === b.humanSide && a.enabled === b.enabled && a.revision === b.revision

// Read-only engine requests: never select/commit a move or touch the game store.
export function usePikafishHint(game: GameState, humanSide: Side, enabled: boolean, revision: unknown, onNotice: (message: string) => void) {
  const [result, setResult] = useState<{ context: HintContext; hint: Move | null; thinking: boolean } | null>(null)
  const requestRef = useRef<AbortController | null>(null)
  const context = { board: game.board, turn: game.currentTurn, phase: game.phase, humanSide, enabled, revision }
  const latest = useRef(context)
  latest.current = context
  useEffect(() => {
    // Visibility is derived below, so invalidation never rerenders GamePage
    // again while its moving piece is starting its animation.
    requestRef.current?.abort()
    return () => { requestRef.current?.abort() }
  }, [game.board, game.currentTurn, game.phase, humanSide, enabled, revision])

  const request = async () => {
    requestRef.current?.abort()
    setResult(null)
    if (!enabled || game.phase !== 'playing') return
    if (game.variant === 'jieqi') { onNotice('Ông Hoàng chưa hỗ trợ gợi ý Cờ úp.'); return }
    if (game.currentTurn !== humanSide) { onNotice('Chờ tới lượt của bạn để xem gợi ý.'); return }
    const controller = new AbortController()
    requestRef.current = controller
    setResult({ context, hint: null, thinking: true })
    const current = () => {
      const next = latest.current
      return !controller.signal.aborted && requestRef.current === controller
        && next.board === context.board && next.turn === context.turn && next.phase === context.phase
        && next.humanSide === humanSide && next.enabled && next.revision === revision
    }
    try {
      const move = await pikafishApi.move([], 600_000, 10, controller.signal, positionFen(game.board, humanSide), 700)
      if (!current()) return
      const { from, to } = move
      if (game.board[from.row]?.[from.col]?.side !== humanSide
        || !getLegalMoves(from.row, from.col, game.board).some(point => point.row === to.row && point.col === to.col)
        || candidateRepetition(game, move).forbidden) throw new Error('Ông Hoàng trả về gợi ý không hợp lệ.')
      setResult({ context, hint: move, thinking: false })
    } catch (failure) {
      if (current()) { setResult(null); onNotice(errorMessage(failure)) }
    }
  }
  const visible = result && enabled && sameContext(result.context, context) ? result : null
  return { hint: visible?.hint ?? null, request, thinking: visible?.thinking ?? false }
}
