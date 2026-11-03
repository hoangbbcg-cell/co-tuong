import { useCallback, useEffect, useRef, useState } from 'react'
import type { GameState } from '../../../types/game'

/** Reset the display between games, retaining archived clock balances for replay. */
export function useBetweenMatchClocks({ enabled, roomKey, seats, completionKey, game, minutes, ready, complete, popupVisible }: {
  enabled: boolean; roomKey: string; seats: string; completionKey: string | null; game: GameState;
  minutes: number; ready: boolean; complete: boolean; popupVisible: boolean;
}) {
  const key = `${roomKey}:${completionKey ?? ''}`
  const [resetKey, setResetKey] = useState<string | null>(() => game.phase === 'finished' ? key : null)
  const previous = useRef({ roomKey, seats, popupVisible })
  const seatChanged = previous.current.roomKey === roomKey && previous.current.seats !== seats
  const popupClosed = previous.current.roomKey === roomKey && previous.current.popupVisible && !popupVisible
  const reset = useCallback(() => setResetKey(key), [key])
  useEffect(() => {
    if (game.phase === 'playing') setResetKey(null)
    else if (ready || complete || seatChanged || popupClosed) setResetKey(key)
    previous.current = { roomKey, seats, popupVisible }
  }, [game.phase, key, roomKey, seats, popupVisible, ready, complete, seatChanged, popupClosed])
  const initial = minutes * 60_000
  const shouldReset = enabled && game.phase !== 'playing' && (game.phase === 'ready' || ready || complete || seatChanged || popupClosed || resetKey === key)
  return { remaining: shouldReset ? { red: initial, black: initial } : game.remainingTime, reset }
}
