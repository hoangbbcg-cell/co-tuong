import { useCallback, useEffect, useRef, useState } from 'react'
import moveSound from '../../../assets/audio/đi quân (2).wav'
import captureSound from '../../../assets/audio/capture-piece.wav'
import checkSound from '../../../assets/audio/1790439324411_2137874395677077050_7229889354659670468.mp4'
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

export function useMoveSound(move: Move | null, board: Board, moveCount: number, phase: GameState['phase'], result: GameState['result'] = null, clockWarningKey: string | null = null, moveOnlyCue = false) {
  const previous = useRef({ move: moveSignature(move), board, moveCount, phase })
  const soundsRef = useRef<GameSounds | null>(null)
  const introRequested = useRef(false)
  const introHandledForGame = useRef(false)
  const checkmatePlayedFor = useRef<string | null>(null)
  const [completedMate, setCompletedMate] = useState<string | null>(null)
  const mateKey = !moveOnlyCue && result?.reason === 'checkmate' && move ? `${moveCount}:${moveSignature(move)}` : null
  const activeMate = useRef(mateKey)
  activeMate.current = mateKey

  const stopMatchIntro = useCallback(() => {
    if (introHandledForGame.current) return
    introHandledForGame.current = true
    soundsRef.current?.stopIntro()
  }, [])
  const playMatchIntro = useCallback((restart = false) => {
    if (!soundsRef.current || !restart && (introRequested.current || introHandledForGame.current)) return
    if (restart) soundsRef.current.stopAll()
    introRequested.current = true
    introHandledForGame.current = false
    soundsRef.current.playIntro()
  }, [])

  useEffect(() => {
    const sounds = new GameSounds({ move: moveSound, capture: captureSound, check: checkSound,
      checkmate: checkmateSound, introOne: introSoundOne, introTwo: introSoundTwo })
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
    previous.current = { move: current, board, moveCount, phase }
    if (phase === 'ready' && before.phase !== 'ready') {
      soundsRef.current?.stopAll()
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
    if (before.phase === 'ready' && phase === 'playing') playMatchIntro()
    const isTakeback = phase === 'playing' && before.phase === 'playing' && moveCount < before.moveCount
    if (isTakeback) {
      stopMatchIntro()
      soundsRef.current?.play('move')
      return
    }
    if (mateKey) {
      if (checkmatePlayedFor.current !== mateKey) {
        stopMatchIntro()
        checkmatePlayedFor.current = mateKey
        const sounds = soundsRef.current
        void Promise.resolve(sounds?.playCheckmate()).then(() => {
          if (soundsRef.current === sounds && activeMate.current === mateKey) setCompletedMate(mateKey)
        })
      }
      return
    }
    // Clock/socket updates must not replay a cue; a new ply is not identified by coordinates alone.
    if (!current || board === before.board || moveCount === before.moveCount && current === before.move) return
    stopMatchIntro()
    if (moveOnlyCue) {
      soundsRef.current?.play('move')
      return
    }
    const capturedPiece = move ? before.board[move.to.row]?.[move.to.col] : null
    const movedPiece = move ? board[move.to.row]?.[move.to.col] : null
    const captured = !!capturedPiece
    const gaveCheck = !!movedPiece && capturedPiece?.type !== 'general' && isInCheck(opposite(movedPiece.side), board)
    soundsRef.current?.play(captured && gaveCheck ? 'check' : captured ? 'capture' : 'move')
    if (gaveCheck && !captured) soundsRef.current?.play('check')
  }, [board, move, moveCount, phase, playMatchIntro, moveOnlyCue, result?.reason, mateKey, stopMatchIntro])

  useEffect(() => {
    const sounds = soundsRef.current
    if (clockWarningKey) sounds?.startClockWarning()
    else sounds?.stopClockWarning()
    return () => sounds?.stopClockWarning()
  }, [clockWarningKey])

  return { playMatchIntro, stopMatchIntro, checkmateAudioComplete: !mateKey || completedMate === mateKey }
}
