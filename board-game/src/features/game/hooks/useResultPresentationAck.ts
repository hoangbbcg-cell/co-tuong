import { useEffect, useRef } from 'react'
import type { RoomSnapshot } from '../../../types/room'
import { roomSocket } from '../../../services/socket'

/** Only seated participants acknowledge their own completed presentation. */
export function useResultPresentationAck(room: RoomSnapshot | null, playerId: string | undefined, ready: boolean) {
  const acknowledged = useRef('')
  const matchId = room?.lastCompletedMatch?.id
  const phase = room?.game.phase
  useEffect(() => {
    if (!room || phase !== 'finished' || !playerId || !matchId || !ready) return
    const key = `${room.id}:${matchId}:${playerId}`
    if (acknowledged.current === key) return
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const send = async () => {
      try {
        await roomSocket.command({ type: 'result-presentation-complete', matchId })
        if (!cancelled) acknowledged.current = key
      } catch {
        if (!cancelled) timer = setTimeout(() => void send(), 1000)
      }
    }
    void send()
    return () => { cancelled = true; clearTimeout(timer) }
  }, [room?.id, matchId, phase, playerId, ready])
}
