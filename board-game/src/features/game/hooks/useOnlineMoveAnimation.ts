import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { GameState, Move } from '../../../types/game'
import { PIECE_MOVE_DURATION_MS } from '../moveAnimation'

/** Animate only a newly observed, single authoritative move, never a clock/ack snapshot. */
export function useOnlineMoveAnimation(roomId: string | null, game: GameState, moveCount: number): Move | null {
  const previous = useRef<{ roomId: string | null; game: GameState; moveCount: number } | null>(null)
  const [flight, setFlight] = useState<{ key: string; move: Move } | null>(null)
  const move = game.lastMove
  const key = `${roomId}:${moveCount}:${move?.from.row},${move?.from.col}:${move?.to.row},${move?.to.col}`
  // Recognize an authoritative online move before last-move markers are rendered.
  const before = previous.current
  const incomingMove = (() => {
    if (!roomId || !before || before.roomId !== roomId || moveCount !== before.moveCount + 1
      || before.game.phase !== 'playing' || !move) return null
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
    const source = before.game.board[move.from.row]?.[move.from.col]
    const destination = game.board[move.to.row]?.[move.to.col]
    if (!source || destination?.id !== source.id || game.board[move.from.row]?.[move.from.col]) return null
    return move
  })()

  useLayoutEffect(() => {
    previous.current = { roomId, game, moveCount }
    if (incomingMove) setFlight({ key, move: incomingMove })
  }, [roomId, game, moveCount, key, incomingMove])
  useEffect(() => {
    if (!flight) return
    const timer = window.setTimeout(() => setFlight(current => current === flight ? null : current), PIECE_MOVE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [flight])
  return incomingMove ?? (roomId && flight?.key === key ? flight.move : null)
}
