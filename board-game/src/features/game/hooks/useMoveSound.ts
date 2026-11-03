import { useCallback, useEffect, useRef, useState } from 'react'
import moveSound from '../../../assets/audio/đi quân (2).wav'
import clockTickSound from '../../../assets/audio/hovang-clock-tick-v6.mp3'
import captureSound from '../../../assets/audio/hovang-capture-v5.mp3'
import checkSound from '../../../assets/audio/hovang-check-v5.mp3'
import checkmateSound from '../../../assets/audio/1790483071512_2137874395677077050_7229889354659670468.mp4'
import introSoundOne from '../../../assets/audio/1790415895331_2137874395677077050_7229889354659670468.mp4'
import introSoundTwo from '../../../assets/audio/1790415939459_2137874395677077050_7229889354659670468.mp4'
import { opposite } from '../../../game/state/initial'
import { isInCheck } from '../../../game/rules'
import type { Board, GameState, Move } from '../../../types/game'
import { GameSounds } from '../audio/GameSounds'

function moveSignature(move: Move | null) {
  return move && `${move.from.row},${move.from.col}-${move.to.row},${move.to.col}`
}

export function useMoveSound(move: Move | null, board: Board, moveCount: number, phase: GameState['phase'], result: GameState['result'] = null, clockWarningKey: string | null = null, allowFinishedTransition = false, silentTransitionKey?: string, matchIntroEnabled = true, clockTickRunning = false, preserveResultOnReady = false) {
  const previous = useRef({ move: moveSignature(move), board, moveCount, phase })
  const observedPlaying = useRef(preserveResultOnReady ? phase === 'playing' : phase !== 'finished')
  const soundsRef = useRef<GameSounds | null>(null)
  const introRequested = useRef(false)
  const introHandledForGame = useRef(false)
  const checkmatePlayedFor = useRef<string | null>(null)
  const [completedMate, setCompletedMate] = useState<string | null>(null)
  const mateKey = result?.reason === 'checkmate' && move ? `${moveCount}:${moveSignature(move)}` : null
  const activeMate = useRef(mateKey)
  const previousMate = useRef(mateKey)
  const previousSilentTransitionKey = useRef(silentTransitionKey)
  activeMate.current = mateKey

  const stopMatchIntro = useCallback(() => {
    if (introHandledForGame.current) return
    introHandledForGame.current = true
    soundsRef.current?.stopIntro()
  }, [])
  const playMatchIntro = useCallback((restart = false) => {
    if (!matchIntroEnabled || !soundsRef.current || !restart && (introRequested.current || introHandledForGame.current)) return
    if (restart) soundsRef.current.stopAll()
    introRequested.current = true
    introHandledForGame.current = false
    soundsRef.current.playIntro()
  }, [matchIntroEnabled])

  useEffect(() => {
    const sounds = new GameSounds({ move: moveSound, capture: captureSound, check: checkSound,
      checkmate: checkmateSound, introOne: introSoundOne, introTwo: introSoundTwo, clockTick: clockTickSound })
    soundsRef.current = sounds
    return () => {
      sounds.dispose()
      soundsRef.current = null
      introRequested.current = false
      introHandledForGame.current = false
      checkmatePlayedFor.current = null
    }
  }, [])

  useEffect(() => {
    const current = moveSignature(move)
    const before = previous.current
    const newMate = !!mateKey && previousMate.current !== mateKey
    previousMate.current = mateKey
    previous.current = { move: current, board, moveCount, phase }
    if (previousSilentTransitionKey.current !== silentTransitionKey) {
      previousSilentTransitionKey.current = silentTransitionKey
      soundsRef.current?.stopAll()
      observedPlaying.current = phase === 'playing'
      introRequested.current = false
      introHandledForGame.current = false
      checkmatePlayedFor.current = null
      setCompletedMate(null)
      if (!(phase === 'playing' && before.phase !== 'playing')) return
    }
    if (phase === 'playing') observedPlaying.current = true
    // A new seat session must not replay the previous occupants' final cue.
    if (phase === 'finished' && !observedPlaying.current) {
      const advanced = current && (board !== before.board || moveCount !== before.moveCount || current !== before.move || newMate)
      if (!allowFinishedTransition || !advanced) return
    }
    if (phase === 'ready' && before.phase !== 'ready') {
      if (preserveResultOnReady) soundsRef.current?.stopIntro()
      else soundsRef.current?.stopAll()
      introRequested.current = false
      introHandledForGame.current = false
      checkmatePlayedFor.current = null
      setCompletedMate(null)
      return
    }
    if (phase === 'playing' && before.phase !== 'playing') {
      checkmatePlayedFor.current = null
      setCompletedMate(null)
    }
    if (before.phase !== 'playing' && phase === 'playing') playMatchIntro()
    const isTakeback = moveCount < before.moveCount
    if (isTakeback) {
      stopMatchIntro()
      soundsRef.current?.stopAll()
      soundsRef.current?.play('move')
      return
    }
    if (mateKey) {
      if (checkmatePlayedFor.current !== mateKey) {
        stopMatchIntro()
        checkmatePlayedFor.current = mateKey
        const sounds = soundsRef.current
        void Promise.resolve(sounds?.playCheckmate()).then(() => {
          if (soundsRef.current === sounds && activeMate.current === mateKey && previousSilentTransitionKey.current === silentTransitionKey) setCompletedMate(mateKey)
        })
      }
      return
    }
    // Clock/socket updates must not replay a cue; a new ply is not identified by coordinates alone.
    if (!current || board === before.board || moveCount === before.moveCount && current === before.move) return
    stopMatchIntro()
    const capturedPiece = move ? before.board[move.to.row]?.[move.to.col] : null
    const movedPiece = move ? board[move.to.row]?.[move.to.col] : null
    const captured = !!capturedPiece
    const gaveCheck = !!movedPiece && capturedPiece?.type !== 'general' && isInCheck(opposite(movedPiece.side), board)
    soundsRef.current?.play(captured && gaveCheck ? 'check' : captured ? 'capture' : 'move')
    if (gaveCheck && !captured) soundsRef.current?.play('check')
  }, [board, move, moveCount, phase, playMatchIntro, result?.reason, mateKey, stopMatchIntro, allowFinishedTransition, silentTransitionKey, preserveResultOnReady])

  useEffect(() => {
    const sounds = soundsRef.current
    if (clockWarningKey) sounds?.startClockWarning()
    else sounds?.stopClockWarning()
    return () => sounds?.stopClockWarning()
  }, [clockWarningKey, silentTransitionKey])

  // Top-level React effect: subscribe to online ready countdown audio.
  useEffect(() => {
    const onReadyCountdownAudio = () => {
      soundsRef.current?.playReadyCountdownTick()
    }

    window.addEventListener('hovang-ready-countdown-tick', onReadyCountdownAudio)

    return () => {
      window.removeEventListener('hovang-ready-countdown-tick', onReadyCountdownAudio)
    }
  }, [])
  // HOVANG V6.6: reconcile tick from the actual clock state.
  // stopAll() may cancel the tick without a phase change.
  // GameSounds.startClockTick() prevents duplicate timers.
  // Optional methods preserve compatibility with older test mocks.
  useEffect(() => {
    const sounds = soundsRef.current
    if (clockTickRunning) sounds?.startClockTick?.()
    else sounds?.stopClockTick?.()
    // GameSounds.dispose() stops the timer on unmount.
  })

  return { playMatchIntro, stopMatchIntro, checkmateAudioComplete: !mateKey || completedMate === mateKey }
}
