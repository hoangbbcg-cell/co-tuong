import { useCallback, useEffect, useRef } from 'react'
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

export function useMoveSound(move: Move | null, board: Board, moveCount: number, phase: GameState['phase'], result: GameState['result'] = null) {
  const previous = useRef({ move: moveSignature(move), board, moveCount, phase })
  const soundsRef = useRef<GameSounds | null>(null)
  const introRequested = useRef(false)
  const introHandledForGame = useRef(false)
  const checkmatePlayedFor = useRef<string | null>(null)

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
      return
    }
    if (before.phase === 'ready' && phase === 'playing') playMatchIntro()
    const isTakeback = phase === 'playing' && before.phase === 'playing' && moveCount < before.moveCount
    if (isTakeback) {
      stopMatchIntro()
      soundsRef.current?.play('move')
      return
    }
    // Clock/socket updates must not replay a cue; a new ply is not identified by coordinates alone.
    if (!current || board === before.board || moveCount === before.moveCount && current === before.move) return
    stopMatchIntro()
    if (result?.reason === 'checkmate') {
      const checkmateKey = `${moveCount}:${current}`
      if (checkmatePlayedFor.current !== checkmateKey) {
        checkmatePlayedFor.current = checkmateKey
        soundsRef.current?.playCheckmate()
      }
      return
    }
    const capturedPiece = move ? before.board[move.to.row]?.[move.to.col] : null
    const movedPiece = move ? board[move.to.row]?.[move.to.col] : null
    const captured = !!capturedPiece
    const gaveCheck = !!movedPiece && capturedPiece?.type !== 'general' && isInCheck(opposite(movedPiece.side), board)
    soundsRef.current?.play(captured && gaveCheck ? 'check' : captured ? 'capture' : 'move')
    if (gaveCheck && !captured) soundsRef.current?.play('check')
  }, [board, move, moveCount, phase, playMatchIntro, result?.reason, stopMatchIntro])

  return { playMatchIntro, stopMatchIntro }
}
