import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { GameState, Move, Position, Side } from '../../../types/game'
import { getLegalMoves } from '../../../game/rules'
import { applyMoveWithResult } from '../../../game/moves/actions'
import { fairyStockfishApi } from '../../../services/fairyStockfish'
import { computerErrorMessage } from '../../../lib/computerPresentation'
import { positionFen, positionError } from '../../../game/state/customPosition'
import { toUci } from '../../../game/moves/uci'
import { candidateRepetition } from '../../../game/rules/repetition'
import { PIECE_MOVE_DURATION_MS } from '../moveAnimation'

interface Trial { states: GameState[]; step: number; animation: Move | null }
function createTrial(source: GameState | undefined): Trial | null {
  if (!source) return null
  const initial = structuredClone(source)
  initial.phase = 'playing'; initial.result = null
  initial.lastClockUpdate = 0; initial.turnElapsed = 0
  initial.remainingTime = { red: 600_000, black: 600_000 }
  if (initial.initialTimeMs !== undefined) initial.initialTimeMs = 600_000
  return { states: [initial], step: 0, animation: null }
}

export function useReplayTrial(source: GameState | undefined, humanSide: Side, recordingId?: string, startImmediately = false, machineImmediately = false, customFirstTurn = false) {
  const [trial, setTrial] = useState<Trial | null>(() => startImmediately ? createTrial(source) : null)
  const previousRecordingId = useRef(recordingId)
  const [selected, setSelected] = useState<Position | null>(null)
  // Set only when the first piece is chosen in a custom-position match.
  const [openingSide, setOpeningSide] = useState<Side | null>(null)
  const [machineSides, setMachineSides] = useState<{ red: boolean; black: boolean }>(() => ({ red: machineImmediately && humanSide !== 'red', black: machineImmediately && humanSide !== 'black' }))
  const machine = machineSides[humanSide === 'red' ? 'black' : 'red']
  const [paused, setPaused] = useState(false)
  const [error, setError] = useState('')
  const [thinking, setThinking] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const game = trial?.states[trial.step]
  useEffect(() => {
    if (previousRecordingId.current === recordingId) return
    previousRecordingId.current = recordingId
    setTrial(startImmediately ? createTrial(source) : null); setSelected(null); setOpeningSide(null); setMachineSides({ red: machineImmediately && humanSide !== 'red', black: machineImmediately && humanSide !== 'black' })
  }, [recordingId, source, startImmediately, machineImmediately])
  const toggle = useCallback(() => {
    setSelected(null); setPaused(false); setMachineSides({ red: false, black: false }); setError('')
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
      return { states: [...current.states.slice(0, current.step + 1), result.game], step: current.step + 1, animation: move }
    })
    setSelected(null)
  }, [])
  const moves = useMemo(() => game && selected
    ? getLegalMoves(selected.row, selected.col, game.board).filter(to => !candidateRepetition(game, { from: selected, to }).forbidden)
    : [], [game, selected])
  const select = useCallback((point: Position) => {
    if (!game || trial?.animation || game.phase !== 'playing' || machineSides[game.currentTurn]) return
    if (selected && moves.some(to => to.row === point.row && to.col === point.col)) { setPaused(false); commit({ from: selected, to: point }); return }
    // V7: Custom-position trials use this callback (not useGame.select).
    // At step zero, either colour may be chosen as the human opening side.
    // The editor's board orientation never determines the opening side.
    if (recordingId === 'custom-position-trial' && trial?.step === 0) {
      const firstPiece = game.board[point.row]?.[point.col]
      if (firstPiece) {
        const firstSide = firstPiece.side
        const invalid = positionError(game.board, firstSide)
        if (invalid) { setError(invalid); setSelected(null); return }
        setError('')
        setPaused(false)
        setTrial(current => {
          if (!current || current.step !== 0 || current.animation) return current
          const original = current.states[0]
          if (original.currentTurn === firstSide) return current
          return { ...current, states: [{ ...original, currentTurn: firstSide }, ...current.states.slice(1)] }
        })
        setOpeningSide(firstSide)

        setSelected(point)
        return
      }
    }
    setSelected(game.board[point.row][point.col]?.side === game.currentTurn ? point : null)
  }, [game, trial?.animation, trial?.step, machineSides, selected, moves, commit, recordingId])

  useEffect(() => {
    setThinking(false)
    setError('')
    if (!game || trial?.animation || !machineSides[game.currentTurn] || paused || game.phase !== 'playing') return
    if (game.variant === 'jieqi') { setError('Ông Hoàng chưa hỗ trợ Cờ úp. Tắt máy bên đang đi để đánh thử thủ công.'); return }
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setThinking(true)
      try {
        const initial = trial!.states[0]
        const history = trial!.states.slice(1, trial!.step + 1).map(state => {
          if (!state.lastMove) throw new Error('Thiếu nước đi trong nhánh thử.')
          return toUci(state.lastMove)
        })
        const move = await fairyStockfishApi.move(history, 600_000, 10, controller.signal, positionFen(initial.board, initial.currentTurn))
        if (controller.signal.aborted) return
        if (applyMoveWithResult(game, move, 0).rejection) throw new Error('Ông Hoàng trả về nước đi không hợp lệ.')
        commit(move)
      } catch (failure) { if (!controller.signal.aborted) setError(computerErrorMessage()) }
      finally { if (!controller.signal.aborted) setThinking(false) }
    }, 0)
    return () => { window.clearTimeout(timer); controller.abort() }
  }, [game, trial?.animation, machineSides, paused, commit, attempt])
  useEffect(() => {
    if (!trial?.animation) return
    const timer = window.setTimeout(() => setTrial(current => current && { ...current, animation: null }), PIECE_MOVE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [trial?.animation])
  const seek = (step: number) => { setPaused(true); setSelected(null); setTrial(current => current && { ...current, animation: null, step: Math.max(0, Math.min(current.states.length - 1, step)) }) }
  const reset = () => { setPaused(false); setSelected(null); setTrial(current => current && { states: [current.states[0]], step: 0, animation: null }) }
  const back = () => {
    if (!trial || trial.step === 0) return
    seek(trial.step - 1)
  }
  const toggleMachineSide = (side: Side) => {
    setPaused(false)
    setSelected(null)
    setError('')

    // Only the custom-position trial may choose its opening side.
    // Never rewrite a turn after the first move or in replay trials.
    if (customFirstTurn && trial?.step === 0
      && !machineSides.red && !machineSides.black) {
      setTrial(current => {
        if (!current || current.step !== 0) return current
        const opening = current.states[0]
        if (opening.currentTurn === side && current.states.length === 1) return current
        return {
          ...current,
          states: [{ ...opening, currentTurn: side }],
          step: 0,
          animation: null,
        }
      })
    }

    setMachineSides(value => ({ ...value, [side]: !value[side] }))
  }
  return { revision: trial?.states, openingSide, active: !!trial, game, animation: trial?.animation ?? null, selected, moves, select, toggle, back, step: trial?.step ?? 0, total: (trial?.states.length ?? 0) - 1, seek, reset, machine, machineRed: machineSides.red, machineBlack: machineSides.black, toggleMachineSide, error, thinking, retry: () => setAttempt(value => value + 1), toggleMachine: () => toggleMachineSide(humanSide === 'red' ? 'black' : 'red') }
}
