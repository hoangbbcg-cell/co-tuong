import { useEffect, useRef, useState } from 'react'
import type { Board, PieceType, Position, Side } from '../../../types/game'
import { createInitialBoard } from '../../../game/state/initial'
import { positionError, positionFen, positionPiece, positionPieceCount, POSITION_PIECE_LIMITS, positionPlacementError, gameFromPositionFen } from '../../../game/state/customPosition'
import { useSessionStore } from '../../../store/sessionStore'
import { useGameStore } from '../../../store/gameStore'
import { fairyStockfishApi } from '../../../services/fairyStockfish'
import { computerErrorMessage } from '../../../lib/computerPresentation'
import { playBoardEntryActionSound, playPositionRemoveActionSound, preparePositionRemoveActionSound, playPositionMoveActionSound, preparePositionMoveActionSound } from '../../../lib/uiActionSound'

export function usePositionEditor() {
  useEffect(() => { void preparePositionRemoveActionSound(); void preparePositionMoveActionSound() }, [])
  const [board, setBoard] = useState<Board>(() => {
    // Back from the position trial restores the composition at "Đấu ngay", not the trial board.
    const source = useSessionStore.getState().customPositionSource
    if (!source) return createInitialBoard()
    useSessionStore.setState({ customPositionSource: null })
    try { return gameFromPositionFen(source).board } catch { return createInitialBoard() }
  })
  const [side, setSide] = useState<Side>(() => useSessionStore.getState().humanSide)
  const [firstMover, setFirstMover] = useState<'human' | 'computer'>('human')
  const firstSide: Side = firstMover === 'human' ? side : side === 'red' ? 'black' : 'red'
  const [selected, setSelected] = useState<Position | null>(null)
  const [piece, setPiece] = useState<{ side: Side; type: PieceType } | null>(null)
  const [notice, setNotice] = useState('')
  const noticeTimer = useRef<number | null>(null)
  const [starting, setStarting] = useState(false)
  const request = useRef<AbortController | null>(null)
  const nextId = useRef(0)
  useEffect(() => () => {
    request.current?.abort()
    if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current)
  }, [])
  const showNotice = (message: string) => {
    if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current)
    setNotice(message)
    if (message) noticeTimer.current = window.setTimeout(() => { setNotice(''); noticeTimer.current = null }, 3000)
    else noticeTimer.current = null
  }
  const remove = (point: Position) => {
    if (board[point.row][point.col]) playPositionRemoveActionSound()
    setBoard(board => board.map((row, r) => row.map((value, c) => r === point.row && c === point.col ? null : value)))
    setSelected(null)
  }
  const removeAndChoose = (point: Position) => {
    const removed = board[point.row][point.col]
    remove(point)
    if (removed) setPiece({ side: removed.side, type: removed.type })
  }
  return {
    board, side, firstSide, setFirstSide: (next: Side) => setFirstMover(next === side ? 'human' : 'computer'), firstMover, setFirstMover, selected, piece, notice, starting, setNotice: showNotice,
    changeSide: (next: Side) => { setSide(next); setSelected(null) },
    choose: (side: Side, type: PieceType) => { setPiece(piece => piece?.side === side && piece.type === type ? null : { side, type }); setSelected(null); showNotice('') },
    chooseForDrag: (side: Side, type: PieceType) => { setPiece({ side, type }); setSelected(null); showNotice('') },
    select: (point: Position) => {
      showNotice('')
      if (piece) {
        const error = positionPlacementError(board, piece.side, piece.type, point)
        if (error) { showNotice(error); setSelected(null); return }
        const id = `placed-${++nextId.current}`
        setBoard(board => board.map((row, r) => row.map((value, c) => r === point.row && c === point.col ? positionPiece(piece.side, piece.type, id) : value)))
        playPositionMoveActionSound()
        const replaced = board[point.row][point.col]
        if (positionPieceCount(board, piece.side, piece.type) - Number(replaced?.side === piece.side && replaced.type === piece.type) + 1 >= POSITION_PIECE_LIMITS[piece.type]) setPiece(null)
      } else if (selected) {
        if (selected.row !== point.row || selected.col !== point.col) {
          const moving = board[selected.row][selected.col]
          if (!moving) { setSelected(null); return }
          const error = positionPlacementError(board, moving.side, moving.type, point, selected)
          if (error) { showNotice(error); setPiece(null); setSelected(null); return }
          setBoard(board => {
            const next = board.map(row => [...row])
            next[point.row][point.col] = next[selected.row][selected.col]
            next[selected.row][selected.col] = null
            return next
          })
          playPositionMoveActionSound()
        }
        setSelected(null)
      } else if (board[point.row][point.col]) setSelected(point)
    },
    drop: (source: { side: Side; type: PieceType; from?: Position }, target: Position | null) => {
      setPiece(null); setSelected(null); showNotice('')
      if (!target) {
        if (source.from) { remove(source.from); setPiece({ side: source.side, type: source.type }) }
        return
      }
      const error = positionPlacementError(board, source.side, source.type, target, source.from)
      if (error) { showNotice(error); return }
      if (!source.from) {
        const replaced = board[target.row][target.col]
        const count = positionPieceCount(board, source.side, source.type) - Number(replaced?.side === source.side && replaced.type === source.type) + 1
        if (count < POSITION_PIECE_LIMITS[source.type]) setPiece({ side: source.side, type: source.type })
      }
      setBoard(current => {
        const next = current.map(row => [...row])
        const moving = source.from ? next[source.from.row][source.from.col] : positionPiece(source.side, source.type, `placed-${++nextId.current}`)
        if (source.from) next[source.from.row][source.from.col] = null
        next[target.row][target.col] = moving
        return next
      })
      if (!source.from || source.from.row !== target.row || source.from.col !== target.col) playPositionMoveActionSound()
    },
    remove, removeAndChoose,
    clearPieces: () => { if (board.some(row => row.some(value => value && value.type !== 'general'))) playPositionRemoveActionSound(); setBoard(current => current.map(row => row.map(value => value?.type === 'general' ? value : null))); setSelected(null); setPiece(null); showNotice('') },
    reset: () => { playPositionMoveActionSound(); setBoard(createInitialBoard()); setSelected(null); setPiece(null); showNotice('') },
    importBoard: (board: Board) => { setBoard(board); setSelected(null); setPiece(null); setSide('red'); showNotice('Đã đọc ảnh. Hãy kiểm tra và chỉnh lại quân trước khi đấu.') },
    save: () => {
      const fen = positionFen(board, firstSide)
      const url = URL.createObjectURL(new Blob([fen + '\n'], { type: 'text/plain;charset=utf-8' }))
      const link = document.createElement('a')
      link.href = url; link.download = 'vi-tri-tuy-chinh.fen'; link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      showNotice('Đã lưu thế cờ thành tệp FEN.')
    },
    back: () => { const fromReplay = sessionStorage.getItem('hovang-custom-room-entry') === 'replay'; if (fromReplay) sessionStorage.removeItem('hovang-custom-room-entry'); useSessionStore.setState({ screen: fromReplay ? 'game' : 'computer' }) },
    start: async () => {
      if (request.current) return
      const preferredError = positionError(board, firstSide)
      const alternateSide: Side = firstSide === 'red' ? 'black' : 'red'
      const alternateError = positionError(board, alternateSide)
      if (preferredError && alternateError) { showNotice(preferredError); setPiece(null); setSelected(null); return }
      const initialTurn: Side = preferredError ? alternateSide : firstSide
      const controller = new AbortController()
      request.current = controller
      setStarting(true); showNotice('')
      try {
        await fairyStockfishApi.ready(controller.signal)
        if (controller.signal.aborted || useSessionStore.getState().screen !== 'position') return
        const fen = positionFen(board, initialTurn)
        useSessionStore.setState({ customPositionSource: fen })
        useGameStore.getState().loadPosition(fen)
        playBoardEntryActionSound()
        useSessionStore.getState().joinLocal()
        useSessionStore.setState({ mode: 'computer', humanSide: initialTurn, computerEngine: 'fairy', computerLevel: 10, customPositionTrial: true })
      } catch (error) { if (!controller.signal.aborted) showNotice(computerErrorMessage()) }
      finally { request.current = null; if (!controller.signal.aborted) setStarting(false) }
    },
  }
}


