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

function moveSignature(move: Move | null) {
  return move && `${move.from.row},${move.from.col}-${move.to.row},${move.to.col}`
}

export function useMoveSound(move: Move | null, board: Board, moveCount: number, phase: GameState['phase'], result: GameState['result'] = null) {
  const previous = useRef<string | null | undefined>(undefined)
  const previousBoard = useRef<Board>(board)
  const previousMoveCount = useRef(moveCount)
  const previousPhase = useRef(phase)
  const audioRef = useRef<{ move: HTMLAudioElement; capture: HTMLAudioElement; check: HTMLAudioElement; checkmate: HTMLAudioElement; checkmateOverlay: HTMLAudioElement; introOne: HTMLAudioElement; introTwo: HTMLAudioElement } | null>(null)
  const matchIntroPlaying = useRef(false)
  const introSecondStarted = useRef(false)
  const introHandledForGame = useRef(false)

  const playCheckmateSound = useCallback(() => {
    const sounds = audioRef.current
    const audio = sounds?.checkmate
    if (!audio || !sounds) return
    audio.pause()
    audio.currentTime = 0
    void audio.play()?.catch(() => undefined)
    const introLayer = sounds.checkmateOverlay
    introLayer.pause()
    introLayer.currentTime = 0
    void introLayer.play()?.catch(() => undefined)
  }, [])

  const stopMatchIntro = useCallback(() => {
    if (introHandledForGame.current) return
    introHandledForGame.current = true
    if (!matchIntroPlaying.current && !introSecondStarted.current) return
    matchIntroPlaying.current = false
    introSecondStarted.current = false
    const sounds = audioRef.current
    if (!sounds) return
    for (const audio of [sounds.introOne, sounds.introTwo]) {
      audio.pause()
      audio.loop = false
    }
    sounds.introOne.volume = 0.65
    sounds.introTwo.volume = 0.65
  }, [])

  const playMatchIntro = useCallback((restart = false) => {
    const sounds = audioRef.current
    if (!sounds) return
    if (restart) {
      introHandledForGame.current = false
      matchIntroPlaying.current = false
      introSecondStarted.current = false
      for (const audio of [sounds.introOne, sounds.introTwo]) {
        audio.pause()
        audio.currentTime = 0
        audio.loop = false
      }
    } else if (introHandledForGame.current || matchIntroPlaying.current) return
    matchIntroPlaying.current = true
    sounds.introOne.volume = 0
    sounds.introOne.loop = true
    sounds.introTwo.volume = 0.9
    void sounds.introOne.play()?.catch(() => undefined)
    void sounds.introTwo.play()?.catch(() => stopMatchIntro())
  }, [stopMatchIntro])

  useEffect(() => {
    const moveAudio = new Audio(moveSound)
    const captureAudio = new Audio(captureSound)
    const checkAudio = new Audio(checkSound)
    const checkmateAudio = new Audio(checkmateSound)
    const checkmateIntroTwoAudio = new Audio(introSoundTwo)
    const introAudioOne = new Audio(introSoundOne)
    const introAudioTwo = new Audio(introSoundTwo)
    const clearIntroIfFinished = () => {
      if (introAudioTwo.ended && !introSecondStarted.current) {
        introAudioOne.pause()
        introAudioOne.loop = false
      }
      if ((introAudioOne.ended || introAudioOne.paused) && (introAudioTwo.ended || introAudioTwo.paused)) {
        matchIntroPlaying.current = false
        introSecondStarted.current = false
      }
    }
    const startIntroOneAtFifth = () => {
      if (!matchIntroPlaying.current || introSecondStarted.current || !Number.isFinite(introAudioTwo.duration) || introAudioTwo.duration <= 0 || introAudioTwo.currentTime < introAudioTwo.duration / 5) return
      introSecondStarted.current = true
      introAudioOne.loop = false
      if (introAudioOne.paused) {
        if (introAudioOne.ended) return
        introAudioOne.volume = 0.65
        void introAudioOne.play()?.catch(() => {
          if (introAudioOne.paused && introAudioTwo.paused) matchIntroPlaying.current = false
        })
        return
      }
      introAudioOne.volume = 0.65
    }
    introAudioOne.addEventListener('ended', clearIntroIfFinished)
    introAudioTwo.addEventListener('ended', clearIntroIfFinished)
    introAudioTwo.addEventListener('timeupdate', startIntroOneAtFifth)
    for (const audio of [moveAudio, captureAudio, checkAudio, checkmateAudio, checkmateIntroTwoAudio, introAudioOne, introAudioTwo]) {
      audio.preload = 'auto'
      audio.volume = 0.65
      audio.load()
    }
    checkAudio.volume = 1
    checkmateAudio.volume = 0.95
    audioRef.current = { move: moveAudio, capture: captureAudio, check: checkAudio, checkmate: checkmateAudio, checkmateOverlay: checkmateIntroTwoAudio, introOne: introAudioOne, introTwo: introAudioTwo }
    return () => {
      for (const audio of [moveAudio, captureAudio, checkAudio, checkmateAudio, checkmateIntroTwoAudio, introAudioOne, introAudioTwo]) audio.pause()
      introAudioOne.removeEventListener('ended', clearIntroIfFinished)
      introAudioTwo.removeEventListener('ended', clearIntroIfFinished)
      introAudioTwo.removeEventListener('timeupdate', startIntroOneAtFifth)
      matchIntroPlaying.current = false
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const current = moveSignature(move)
    if (previous.current === undefined) {
      previous.current = current
      previousBoard.current = board
      previousMoveCount.current = moveCount
      previousPhase.current = phase
      return
    }
    const matchStarted = previousPhase.current === 'ready' && phase === 'playing'
    const isTakeback = phase === 'playing' && previousPhase.current === 'playing' && moveCount < previousMoveCount.current
    previousMoveCount.current = moveCount
    previousPhase.current = phase
    if (matchStarted) playMatchIntro()
    if (isTakeback) {
      if (!introHandledForGame.current) stopMatchIntro()
      previous.current = current
      previousBoard.current = board
      const audio = audioRef.current?.move
      if (!audio) return
      audio.pause()
      audio.currentTime = 0
      void audio.play()?.catch(() => undefined)
      return
    }
    if (!current || current === previous.current) {
      previous.current = current
      previousBoard.current = board
      return
    }
    if (!introHandledForGame.current) stopMatchIntro()
    const capturedPiece = move ? previousBoard.current[move.to.row]?.[move.to.col] : null
    const movedPiece = move ? board[move.to.row]?.[move.to.col] : null
    const captured = !!capturedPiece
    const gaveCheck = !!move && !!movedPiece && capturedPiece?.type !== 'general' && isInCheck(opposite(movedPiece.side), board)
    previous.current = current
    previousBoard.current = board
    const sounds = audioRef.current
    if (!sounds) return
    if (result?.reason === 'checkmate') {
      sounds.move.pause()
      sounds.capture.pause()
      sounds.check.pause()
      return
    }
    const checkReplacesCapture = captured && gaveCheck
    const audio = checkReplacesCapture ? sounds.check : captured ? sounds.capture : sounds.move
    audio.pause()
    audio.currentTime = 0
    const playback = audio.play()
    void playback?.catch(() => undefined)
    if (gaveCheck && !checkReplacesCapture) {
      sounds.check.pause()
      sounds.check.currentTime = 0
      void sounds.check.play()?.catch(() => undefined)
    }
  }, [board, move, moveCount, phase, playMatchIntro, result?.reason, stopMatchIntro])

  return { playMatchIntro, playCheckmateSound, stopMatchIntro }
}
