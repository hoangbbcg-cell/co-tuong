import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { GameState, Move } from '../../../types/game'
import { PIECE_MOVE_DURATION_MS } from '../moveAnimation'

/** Animate only a newly observed, single authoritative move, never a clock/ack snapshot. */
export function useOnlineMoveAnimation(roomId: string | null, game: GameState, moveCount: number): Move | null {
  const previous = useRef<{ roomId: string | null; game: GameState; moveCount: number } | null>(null)
  const [flight, setFlight] = useState<{ key: string; move: Move } | null>(null)
  const move = game.lastMove
  const key = `${roomId}:${moveCount}:${move?.from.row},${move?.from.col}:${move?.to.row},${move?.to.col}`
  useLayoutEffect(() => {
    const before = previous.current
    previous.current = { roomId, game, moveCount }
    if (!roomId || !before || before.roomId !== roomId || moveCount !== before.moveCount + 1
      || before.game.phase !== 'playing' || !move) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const source = before.game.board[move.from.row]?.[move.from.col]
    const destination = game.board[move.to.row]?.[move.to.col]
    if (!source || destination?.id !== source.id || game.board[move.from.row]?.[move.from.col]) return
    setFlight({ key, move })
  }, [roomId, game, moveCount, key, move])
  useEffect(() => {
    if (!flight) return
    const timer = window.setTimeout(() => setFlight(current => current === flight ? null : current), PIECE_MOVE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [flight])
  return roomId && flight?.key === key ? flight.move : null
}
