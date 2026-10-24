import { useCallback, useEffect, useRef, useState } from 'react'
import type { GameState, Side } from '../../../types/game'
import type { RecordedMatch } from '../../../types/recordedMatch'

/** Keeps the participant's original side even when the queue replaces a seat. */
export function useMatchResult({ game, roomKey, side, enabled, waitForCheckmate, completed, audioComplete = true, initialResultSide }: {
  game: GameState; roomKey: string; side: Side | null; enabled: boolean; waitForCheckmate: boolean; completed?: RecordedMatch; audioComplete?: boolean; initialResultSide?: Side
}) {
  const participant = useRef<{ room: string; side: Side } | null>(initialResultSide ? { room: roomKey, side: initialResultSide } : null)
  const seenCompletion = useRef(initialResultSide ? undefined : completed?.id)
  const [outcome, setOutcome] = useState<{ room: string; value: 'win' | 'loss' } | null>(null)
  const [effectComplete, setEffectComplete] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  useEffect(() => {
    if (!enabled || participant.current && participant.current.room !== roomKey) {
      participant.current = null
      seenCompletion.current = completed?.id
      setOutcome(null); setEffectComplete(false); setDismissed(false)
    }
    if (!enabled) return
    if (game.phase === 'playing') {
      setOutcome(null); setEffectComplete(false); setDismissed(false)
      participant.current = side ? { room: roomKey, side } : null
      seenCompletion.current = completed?.id
      return
    }
    if (game.phase === 'ready') {
      // Queue/rematch snapshots can skip the transient `finished` game entirely.
      // Only someone tracked in the preceding live match can consume its result.
      const result = completed?.states.at(-1)?.result
      if (participant.current && completed && completed.id !== seenCompletion.current && result?.winner) {
        setOutcome({ room: roomKey, value: result.winner === participant.current.side ? 'win' : 'loss' })
        seenCompletion.current = completed.id
      }
      participant.current = null
      return
    }
    if (game.result?.reason !== 'draw' && game.result?.winner && participant.current) {
      setOutcome({ room: roomKey, value: game.result.winner === participant.current.side ? 'win' : 'loss' })
      seenCompletion.current = completed?.id
    }
  }, [enabled, roomKey, side, game.phase, game.result?.winner, completed?.id])
  const complete = useCallback(() => setEffectComplete(true), [])
  return {
    outcome: enabled && game.phase !== 'playing' && outcome?.room === roomKey && !dismissed && audioComplete && (!waitForCheckmate || effectComplete) ? outcome.value : null,
    complete,
    dismiss: () => setDismissed(true),
  }
}
