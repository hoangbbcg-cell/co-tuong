import { useEffect, useRef, useState } from 'react'
import type { GameState, Side } from '../../../types/game'

/** Result faces belong to the players who occupied the seats when the game ended. */
export function useResultFaces(game: GameState, roomKey: string, seats: string) {
  const playingSeats = useRef<{ roomKey: string; seats: string } | null>(null)
  const [visible, setVisible] = useState<{ roomKey: string; seats: string; winner: Side } | null>(null)
  const winner = game.result?.winner
  const reason = game.result?.reason
  const latestSeats = useRef(seats)
  latestSeats.current = seats

  useEffect(() => {
    setVisible(null)
    if (game.phase === 'playing') {
      playingSeats.current = { roomKey, seats: latestSeats.current }
      return
    }
    if (game.phase !== 'finished' || !winner || reason === 'leave') return
    const previous = playingSeats.current
    if (!previous || previous.roomKey !== roomKey || previous.seats !== latestSeats.current) return
    setVisible({ roomKey, seats: latestSeats.current, winner })
    const timer = window.setTimeout(() => setVisible(null), 5000)
    return () => window.clearTimeout(timer)
  }, [roomKey, game.phase, winner, reason])

  useEffect(() => {
    setVisible(current => current && current.seats !== seats ? null : current)
  }, [seats])

  return (side: Side): 'win' | 'loss' | undefined =>
    game.phase === 'finished' && visible?.roomKey === roomKey && visible.seats === seats
      ? visible.winner === side ? 'win' : 'loss'
      : undefined
}
