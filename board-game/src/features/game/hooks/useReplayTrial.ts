import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { GameState, Move, Position, Side } from '../../../types/game'
import { getLegalMoves } from '../../../game/rules'
import { applyMoveWithResult } from '../../../game/moves/actions'
import { pikafishApi } from '../../../services/pikafish'
import { errorMessage } from '../../../services/api'
import { positionFen } from '../../../game/state/customPosition'
import { toUci } from '../../../game/moves/uci'
import { candidateRepetition } from '../../../game/rules/repetition'
import { PIECE_MOVE_DURATION_MS } from '../moveAnimation'

interface Trial { states: GameState[]; step: number; animation: Move | null; moveOnlySound: boolean }
function createTrial(source: GameState | undefined): Trial | null {
  if (!source) return null
  const initial = structuredClone(source)
  initial.phase = 'playing'; initial.result = null
  initial.lastClockUpdate = 0; initial.turnElapsed = 0
  initial.remainingTime = { red: 600_000, black: 600_000 }
  return { states: [initial], step: 0, animation: null, moveOnlySound: false }
}

export function useReplayTrial(source: GameState | undefined, humanSide: Side, recordingId?: string, startImmediately = false, machineImmediately = false) {
  const [trial, setTrial] = useState<Trial | null>(() => startImmediately ? createTrial(source) : null)
  const previousRecordingId = useRef(recordingId)
  const [selected, setSelected] = useState<Position | null>(null)
  const [machine, setMachine] = useState(machineImmediately)
  const [paused, setPaused] = useState(false)
  const [error, setError] = useState('')
  const [thinking, setThinking] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const game = trial?.states[trial.step]
  useEffect(() => {
    if (previousRecordingId.current === recordingId) return
    previousRecordingId.current = recordingId
    setTrial(startImmediately ? createTrial(source) : null); setSelected(null); setMachine(machineImmediately)
  }, [recordingId, source, startImmediately, machineImmediately])
  const toggle = useCallback(() => {
    setSelected(null); setPaused(false); setMachine(false); setError('')
    setTrial(current => {
      if (current || !source) return null
      return createTrial(source)
    })
  }, [source])
  const commit = useCallback((move: Move) => {
    setTrial(current => {
      if (!current || current.animation) return current
      const result = applyMoveWithResult(current.states[current.step], move, 0)
      if (result.rejection) return current
      return { states: [...current.states.slice(0, current.step + 1), result.game], step: current.step + 1, animation: move, moveOnlySound: false }
    })
    setSelected(null)
  }, [])
  const moves = useMemo(() => game && selected
    ? getLegalMoves(selected.row, selected.col, game.board).filter(to => !candidateRepetition(game, { from: selected, to }).forbidden)
    : [], [game, selected])
  const select = useCallback((point: Position) => {
    if (!game || trial?.animation || game.phase !== 'playing' || machine && game.currentTurn !== humanSide) return
    if (selected && moves.some(to => to.row === point.row && to.col === point.col)) { setPaused(false); commit({ from: selected, to: point }); return }
    setSelected(game.board[point.row][point.col]?.side === game.currentTurn ? point : null)
  }, [game, trial?.animation, machine, humanSide, selected, moves, commit])
  useEffect(() => {
    setThinking(false)
    setError('')
    if (!game || trial?.animation || !machine || paused || game.phase !== 'playing' || game.currentTurn === humanSide) return
    if (game.variant === 'jieqi') { setError('Ông Hoàng chưa hỗ trợ Cờ úp. Tắt Máy đi để đánh thử hai bên.'); return }
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setThinking(true)
      try {
        const initial = trial!.states[0]
        const history = trial!.states.slice(1, trial!.step + 1).map(state => {
          if (!state.lastMove) throw new Error('Thiếu nước đi trong nhánh thử.')
          return toUci(state.lastMove)
        })
        const move = await pikafishApi.move(history, 600_000, 10, controller.signal, positionFen(initial.board, initial.currentTurn), 700)
        if (controller.signal.aborted) return
        if (applyMoveWithResult(game, move, 0).rejection) throw new Error('Ông Hoàng trả về nước đi không hợp lệ.')
        commit(move)
      } catch (failure) { if (!controller.signal.aborted) setError(errorMessage(failure)) }
      finally { if (!controller.signal.aborted) setThinking(false) }
    }, 0)
    return () => { window.clearTimeout(timer); controller.abort() }
  }, [game, trial?.animation, machine, paused, humanSide, commit, attempt])
  useEffect(() => {
    if (!trial?.animation) return
    const timer = window.setTimeout(() => setTrial(current => current && { ...current, animation: null }), PIECE_MOVE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [trial?.animation])
  const seek = (step: number) => { setPaused(true); setSelected(null); setTrial(current => current && { ...current, animation: null, step: Math.max(0, Math.min(current.states.length - 1, step)), moveOnlySound: true }) }
  const reset = () => { setPaused(false); setSelected(null); setTrial(current => current && { states: [current.states[0]], step: 0, animation: null, moveOnlySound: true }) }
  const back = () => {
    if (!trial || trial.step === 0) return
    seek(trial.step - 1)
  }
  return { revision: trial?.states, active: !!trial, game, animation: trial?.animation ?? null, moveOnlySound: trial?.moveOnlySound ?? false, selected, moves, select, toggle, back, step: trial?.step ?? 0, total: (trial?.states.length ?? 1) - 1, seek, reset, machine, error, thinking, retry: () => setAttempt(value => value + 1), toggleMachine: () => { setPaused(false); setSelected(null); setMachine(value => !value) } }
}
