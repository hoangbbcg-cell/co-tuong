// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { useMoveSound } from '../src/features/game/hooks/useMoveSound'
import type { Board, GameState, Move, Piece } from '../src/types/game'

const audio = vi.hoisted(() => ({ play: vi.fn(), playIntro: vi.fn(), playCheckmate: vi.fn(),
  stopIntro: vi.fn(), stopAll: vi.fn(), dispose: vi.fn() }))
vi.mock('../src/features/game/audio/GameSounds', () => ({ GameSounds: class {
  play = audio.play
  playIntro = audio.playIntro
  playCheckmate = audio.playCheckmate
  stopIntro = audio.stopIntro
  stopAll = audio.stopAll
  dispose = audio.dispose
  startClockWarning() {}
  stopClockWarning() {}
} }))
afterEach(() => { cleanup(); vi.clearAllMocks() })

it('does not replay the previous seats checkmate on a fresh finished session', () => {
  const hook = renderHook(() => useMoveSound(firstMove, createGame().board, 12, 'finished', { winner: 'red', reason: 'checkmate' }))
  expect(audio.playCheckmate).not.toHaveBeenCalled()
  hook.unmount()
  expect(audio.dispose).toHaveBeenCalledTimes(1)
})

type Props = { move: Move | null; board: Board; moveCount: number; phase: GameState['phase']; result?: GameState['result']; silentTransitionKey?: string }
const firstMove: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }
const captureMove: Move = { from: { row: 5, col: 0 }, to: { row: 4, col: 0 } }
function setup() {
  const initialBoard = createGame().board.map(row => [...row])
  initialBoard[4][0] = { id: 'black-soldier-test', type: 'soldier', side: 'black', name: '卒' }
  const firstBoard = initialBoard.map(row => [...row])
  const piece = firstBoard[6][0] as Piece
  firstBoard[6][0] = null
  firstBoard[5][0] = piece
  const secondBoard = firstBoard.map(row => [...row])
  secondBoard[5][0] = null
  secondBoard[4][0] = piece
  const initialProps: Props = { move: null, board: initialBoard, moveCount: 0, phase: 'ready' }
  return { ...renderHook(({ move, board, moveCount, phase, result, silentTransitionKey }: Props) => useMoveSound(move, board, moveCount, phase, result, null, false, silentTransitionKey), { initialProps }),
    initialBoard, firstBoard, secondBoard }
}

it('plays intro once, stops it at the first move, and preserves move/capture and takeback cues', () => {
  const { result, rerender, firstBoard, secondBoard } = setup()
  act(() => result.current.playMatchIntro(true))
  act(() => rerender({ move: null, board: createGame().board, moveCount: 0, phase: 'playing' }))
  expect(audio.playIntro).toHaveBeenCalledTimes(1)
  act(() => rerender({ move: firstMove, board: firstBoard, moveCount: 1, phase: 'playing' }))
  expect(audio.stopIntro).toHaveBeenCalledTimes(1)
  expect(audio.play).toHaveBeenLastCalledWith('move')
  act(() => rerender({ move: captureMove, board: secondBoard, moveCount: 2, phase: 'playing' }))
  expect(audio.play).toHaveBeenLastCalledWith('capture')
  expect(audio.stopIntro).toHaveBeenCalledTimes(1)
  act(() => rerender({ move: firstMove, board: firstBoard, moveCount: 1, phase: 'playing' }))
  expect(audio.play).toHaveBeenLastCalledWith('move')
  act(() => result.current.playMatchIntro(true))
  expect(audio.playIntro).toHaveBeenCalledTimes(2)
})

it('can suppress both automatic and requested match intros while preserving move sounds', () => {
  const initialBoard = createGame().board
  const firstBoard = initialBoard.map(row => [...row])
  firstBoard[5][0] = firstBoard[6][0]
  firstBoard[6][0] = null
  const initialProps: Props = { move: null, board: initialBoard, moveCount: 0, phase: 'ready' }
  const hook = renderHook(({ move, board, moveCount, phase }: Props) => useMoveSound(move, board, moveCount, phase, null, null, false, undefined, false), { initialProps })
  act(() => hook.result.current.playMatchIntro(true))
  hook.rerender({ ...initialProps, phase: 'playing' })
  expect(audio.playIntro).not.toHaveBeenCalled()
  hook.rerender({ move: firstMove, board: firstBoard, moveCount: 1, phase: 'playing' })
  expect(audio.play).toHaveBeenLastCalledWith('move')
})

it('suppresses only cues caused by switching into or out of trial mode', () => {
  const { rerender, firstBoard } = setup()
  const playing = { move: firstMove, board: firstBoard, moveCount: 1, phase: 'playing' as const }
  act(() => rerender(playing))
  expect(audio.play).toHaveBeenCalledTimes(1)
  act(() => rerender({ ...playing, board: firstBoard.map(row => [...row]), silentTransitionKey: '1' }))
  expect(audio.play).toHaveBeenCalledTimes(1)
  expect(audio.stopAll).toHaveBeenCalledTimes(1)
  act(() => rerender({ ...playing, board: firstBoard.map(row => [...row]), silentTransitionKey: '2' }))
  expect(audio.play).toHaveBeenCalledTimes(1)
  expect(audio.stopAll).toHaveBeenCalledTimes(2)
  act(() => rerender({ ...playing, moveCount: 2, silentTransitionKey: '2' }))
  expect(audio.play).toHaveBeenCalledTimes(2)
})

it('does not replay sounds on clock/snapshot updates but detects a new ply with the same coordinates', () => {
  const { rerender, firstBoard } = setup()
  act(() => rerender({ move: firstMove, board: firstBoard, moveCount: 1, phase: 'playing' }))
  expect(audio.play).toHaveBeenCalledTimes(1)
  act(() => rerender({ move: firstMove, board: firstBoard.map(row => [...row]), moveCount: 1, phase: 'playing' }))
  expect(audio.play).toHaveBeenCalledTimes(1)
  act(() => rerender({ move: firstMove, board: firstBoard.map(row => [...row]), moveCount: 2, phase: 'playing' }))
  expect(audio.play).toHaveBeenCalledTimes(2)
})

it('plays checkmate once for the finishing move without depending on Board animation', () => {
  const { rerender, firstBoard } = setup()
  const finished = { winner: 'red', reason: 'checkmate' } as const
  act(() => rerender({ move: firstMove, board: firstBoard, moveCount: 1, phase: 'finished', result: finished }))
  expect(audio.playCheckmate).toHaveBeenCalledTimes(1)
  expect(audio.play).not.toHaveBeenCalled()
  act(() => rerender({ move: firstMove, board: firstBoard.map(row => [...row]), moveCount: 1, phase: 'finished', result: finished }))
  expect(audio.playCheckmate).toHaveBeenCalledTimes(1)
})

it('keeps full move and checkmate cues when browsing a replay or trial board', () => {
  const { initialBoard, firstBoard, secondBoard } = setup()
  cleanup()
  vi.clearAllMocks()
  const initialProps: Props = { move: firstMove, board: firstBoard, moveCount: 1, phase: 'finished' }
  const hook = renderHook(({ move, board, moveCount, phase, result }: Props) => useMoveSound(move, board, moveCount, phase, result, null, true), { initialProps })
  const { rerender } = hook
  expect(audio.play).not.toHaveBeenCalled()
  expect(audio.playCheckmate).not.toHaveBeenCalled()
  act(() => rerender({ move: captureMove, board: secondBoard, moveCount: 2, phase: 'finished' }))
  expect(audio.play).toHaveBeenLastCalledWith('capture')
  act(() => rerender({ move: captureMove, board: secondBoard, moveCount: 2, phase: 'finished', result: { winner: 'red', reason: 'checkmate' } }))
  expect(audio.playCheckmate).toHaveBeenCalledOnce()
})

it('cancels sounds on reset and cleans up audio when leaving', () => {
  const { rerender, unmount, initialBoard, firstBoard } = setup()
  act(() => rerender({ move: firstMove, board: firstBoard, moveCount: 1, phase: 'playing' }))
  act(() => rerender({ move: null, board: initialBoard, moveCount: 0, phase: 'ready' }))
  expect(audio.stopAll).toHaveBeenCalledTimes(1)
  unmount()
  expect(audio.dispose).toHaveBeenCalledTimes(1)
})

it('keeps mate completion pending until playback ends, including a result-only snapshot', async () => {
  let end!: () => void
  audio.playCheckmate.mockReturnValueOnce(new Promise<void>(resolve => { end = resolve }))
  const { result, rerender, firstBoard } = setup()
  act(() => rerender({ move: firstMove, board: firstBoard, moveCount: 1, phase: 'playing' }))
  act(() => rerender({ move: firstMove, board: firstBoard, moveCount: 1, phase: 'finished', result: { winner: 'red', reason: 'checkmate' } }))
  expect(result.current.checkmateAudioComplete).toBe(false)
  await act(async () => end())
  expect(result.current.checkmateAudioComplete).toBe(true)
})

it('does not play the previous mate when a newcomer sees waiting then a finished snapshot', () => {
  const board = createGame().board
  const initial: Props = {move:null,board,moveCount:0,phase:'ready'}
  const hook = renderHook((p:Props) => useMoveSound(p.move,p.board,p.moveCount,p.phase,p.result,null,false,undefined,true,false,true), {initialProps:initial})
  hook.rerender({move:firstMove,board:board.map(row=>[...row]),moveCount:12,phase:'finished',result:{winner:'red',reason:'checkmate'}})
  expect(audio.playCheckmate).not.toHaveBeenCalled()
  expect(audio.play).not.toHaveBeenCalled()
})
