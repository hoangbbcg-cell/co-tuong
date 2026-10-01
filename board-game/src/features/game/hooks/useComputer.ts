import { useEffect, useState } from 'react'
import { useGameStore } from '../../../store/gameStore'
import { useSessionStore } from '../../../store/sessionStore'
import { chooseComputerMove } from '../../../game/moves/computer'
import { opposite } from '../../../game/state/initial'
import { pikafishApi } from '../../../services/pikafish'
import { errorMessage } from '../../../services/api'

export function useComputer() {
  const enabled = useSessionStore(state => state.screen === 'game' && state.mode === 'computer')
  const engine = useSessionStore(state => state.computerEngine)
  const humanSide = useSessionStore(state => state.humanSide)
  const board = useGameStore(state => state.game.board)
  const turn = useGameStore(state => state.game.currentTurn)
  const phase = useGameStore(state => state.game.phase)
  const animation = useGameStore(state => state.animation)
  const version = useGameStore(state => state.animationVersion)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [thinking, setThinking] = useState(false)
  useEffect(() => {
    setError('')
    setThinking(false)
    const machineSide = opposite(humanSide)
    if (!enabled || turn !== machineSide || phase !== 'playing' || animation) return
    const controller = new AbortController()
    const current = () => {
      const state = useGameStore.getState()
      const session = useSessionStore.getState()
      return !controller.signal.aborted && session.screen === 'game' && session.mode === 'computer' && session.computerEngine === engine && session.humanSide === humanSide && state.animationVersion === version && state.game.board === board && state.game.currentTurn === machineSide && state.game.phase === 'playing' && !state.animation
    }
    // When the human chooses black, wait for the opening animation before moving.
    const delay = Math.max(engine === 'basic' ? 500 : 550, useGameStore.getState().game.lastClockUpdate - performance.now())
    const timer = window.setTimeout(async () => {
      if (!current()) return
      setThinking(true)
      try {
        const state = useGameStore.getState()
        const move = engine === 'pikafish'
          ? await pikafishApi.move(state.moves, state.game.remainingTime[machineSide], controller.signal)
          : chooseComputerMove(board, machineSide, Math.random())
        if (!current()) return
        if (!move || board[move.from.row]?.[move.from.col]?.side !== machineSide) throw new Error('Máy không trả về nước đi hợp lệ.')
        const now = performance.now()
        state.select(move.from, now)
        state.select(move.to, now, !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        if (useGameStore.getState().game.board === board) throw new Error('Store đã từ chối nước đi của máy.')
      } catch (failure) {
        if (current()) setError(errorMessage(failure))
      } finally { if (!controller.signal.aborted) setThinking(false) }
    }, delay)
    return () => { window.clearTimeout(timer); controller.abort() }
  }, [enabled, engine, humanSide, board, turn, phase, animation, version, attempt])
  return { thinking, error, retry: () => setAttempt(value => value + 1) }
}
