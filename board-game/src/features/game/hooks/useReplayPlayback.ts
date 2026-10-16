import { useEffect, useState } from 'react'
import type { RecordedMatch } from '../../../types/recordedMatch'
import type { Move } from '../../../types/game'
import { PIECE_MOVE_DURATION_MS } from '../moveAnimation'

export function useReplayPlayback(recording?: RecordedMatch, enabled = true) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [animation, setAnimation] = useState<Move | null>(null)
  const total = (recording?.states.length ?? 1) - 1
  useEffect(() => {
    if (!recording || !enabled || !playing) return
    if (step >= total) { setPlaying(false); return }
    const timer = window.setTimeout(() => {
      const next = step + 1
      setAnimation(recording.states[next].lastMove)
      setStep(next)
    }, 1200)
    return () => window.clearTimeout(timer)
  }, [recording, enabled, playing, step, total])
  useEffect(() => {
    if (!animation) return
    const timer = window.setTimeout(() => setAnimation(null), PIECE_MOVE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [animation, step])
  const seek = (next: number) => { setPlaying(false); setAnimation(null); setStep(Math.max(0, Math.min(total, next))) }
  const toggle = () => { if (step >= total) setStep(0); setPlaying(value => !value) }
  return { game: recording?.states[step], step, total, playing, animation, seek, toggle }
}
