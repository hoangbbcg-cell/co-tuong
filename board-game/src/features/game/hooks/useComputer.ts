import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../../../store/gameStore'
import { useSessionStore } from '../../../store/sessionStore'
import { chooseComputerMove } from '../../../game/moves/computer'
import { candidateRepetition } from '../../../game/rules/repetition'
import { opposite } from '../../../game/state/initial'
import { pikafishApi } from '../../../services/pikafish'
import { errorMessage } from '../../../services/api'

export function useComputer(allowed = true) {
  const enabled = useSessionStore(state => allowed && state.screen === 'game' && state.mode === 'computer')
  const demo = useSessionStore(state => state.computerDemo)
  const demoQueued = useSessionStore(state => state.computerDemoQueued)
  const engine = useSessionStore(state => state.computerEngine)
  const level = useSessionStore(state => state.computerLevel)
  const humanSide = useSessionStore(state => state.humanSide)
  const board = useGameStore(state => state.game.board)
  const turn = useGameStore(state => state.game.currentTurn)
  const phase = useGameStore(state => state.game.phase)
  const repetitionWarning = useGameStore(state => state.game.repetition?.warning ?? false)
  const animation = useGameStore(state => state.animation)
  const version = useGameStore(state => state.animationVersion)
  const demoRotation = useRef<{ version: number; deadline: number } | null>(null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [thinking, setThinking] = useState(false)
  useEffect(() => {
    if (!enabled || !demo || phase !== 'playing' || animation || useGameStore.getState().moves.length < 3) return
    const timer = window.setTimeout(() => useGameStore.getState().finish(false, performance.now(), 'black'), 250)
    return () => window.clearTimeout(timer)
  }, [enabled, demo, demoQueued, phase, animation, version])
  useEffect(() => {
    if (!enabled || !demo || phase !== 'finished') { demoRotation.current = null; return }
    if (!demoRotation.current || demoRotation.current.version !== version) demoRotation.current = { version, deadline: performance.now() + (demoQueued ? 3000 : 0) }
    if (!demoQueued) return
    const timer = window.setTimeout(() => {
      const session = useSessionStore.getState()
      if (!session.computerDemo || !session.computerDemoQueued || useGameStore.getState().animationVersion !== version) return
      useGameStore.getState().reset(performance.now())
      useSessionStore.setState({ computerDemo: false, computerDemoQueued: false, humanSide: 'black' })
    }, Math.max(0, demoRotation.current.deadline - performance.now()))
    return () => window.clearTimeout(timer)
  }, [enabled, demo, demoQueued, phase, version])
  useEffect(() => {
    setError('')
    setThinking(false)
    const machineSide = demo ? turn : opposite(humanSide)
    if (!enabled || turn !== machineSide || phase !== 'playing' || animation || repetitionWarning) return
    const controller = new AbortController()
    const current = () => {
      const state = useGameStore.getState()
      const session = useSessionStore.getState()
      return !controller.signal.aborted && session.screen === 'game' && session.mode === 'computer' && session.computerEngine === engine && session.computerDemo === demo && session.humanSide === humanSide && state.animationVersion === version && state.game.board === board && state.game.currentTurn === machineSide && state.game.phase === 'playing' && !state.game.repetition?.warning && !state.animation
    }
    // When the human chooses black, wait for the opening animation before moving.
    const delay = Math.max(engine === 'basic' ? 500 : 550, useGameStore.getState().game.lastClockUpdate - performance.now())
    const timer = window.setTimeout(async () => {
      if (!current()) return
      setThinking(true)
      try {
        const state = useGameStore.getState()
        const move = engine === 'pikafish'
          ? await pikafishApi.move(state.moves, state.game.remainingTime[machineSide], level, controller.signal, ...(state.initialFen ? [state.initialFen] : []))
          : chooseComputerMove(board, machineSide, Math.random(), state.game)
        if (!current()) return
        if (!move || board[move.from.row]?.[move.from.col]?.side !== machineSide) throw new Error('Máy không trả về nước đi hợp lệ.')
        if (candidateRepetition(state.game, move).forbidden) {
          useSessionStore.getState().setNotice('Đối thủ đã thử đi một nước lặp bị cấm.')
          return
        }
        const now = performance.now()
        state.select(move.from, now)
        state.select(move.to, now, !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        if (useGameStore.getState().game.board === board) throw new Error('Store đã từ chối nước đi của máy.')
      } catch (failure) {
        if (current()) setError(errorMessage(failure))
      } finally { if (!controller.signal.aborted) setThinking(false) }
    }, delay)
    return () => { window.clearTimeout(timer); controller.abort() }
  }, [enabled, demo, engine, level, humanSide, board, turn, phase, repetitionWarning, animation, version, attempt])
  return { thinking, error, retry: () => setAttempt(value => value + 1) }
}
