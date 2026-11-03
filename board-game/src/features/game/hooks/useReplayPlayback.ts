import { useEffect, useRef, useState } from 'react'
import type { RecordedMatch } from '../../../types/recordedMatch'
import type { Move } from '../../../types/game'
import { PIECE_MOVE_DURATION_MS } from '../moveAnimation'

export function useReplayPlayback(recording?: RecordedMatch, enabled = true) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [animation, setAnimation] = useState<Move | null>(null)
  const recordingRef = useRef(recording)
  recordingRef.current = recording
  const recordingId = recording?.id
  useEffect(() => {
    setStep(0)
    setAnimation(null)
    setPlaying(true)
  }, [recordingId])
  const total = (recording?.states.length ?? 1) - 1
  useEffect(() => {
    if (!recordingId || !enabled || !playing) return
    if (step >= total) { setPlaying(false); return }
    const timer = window.setTimeout(() => {
      const next = step + 1
      setAnimation(recordingRef.current?.states[next]?.lastMove ?? null)
      setStep(next)
    }, 1200)
    return () => window.clearTimeout(timer)
  }, [recordingId, enabled, playing, step, total])
  useEffect(() => {
    if (!animation) return
    const timer = window.setTimeout(() => setAnimation(null), PIECE_MOVE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [animation, step])
  const seek = (next: number) => { setPlaying(false); setAnimation(null); setStep(Math.max(0, Math.min(total, next))) }
  const toggle = () => {
    if (total <= 0) return
    if (step >= total) { setAnimation(null); setStep(0); setPlaying(true); return }
    setPlaying(value => !value)
  }
  return { game: recording?.states[step], step, total, playing, animation, seek, toggle }
}
