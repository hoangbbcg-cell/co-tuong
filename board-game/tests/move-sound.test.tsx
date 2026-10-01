// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { useMoveSound } from '../src/features/game/hooks/useMoveSound'
import type { Board, Move, Piece } from '../src/types/game'

class FakeAudio extends EventTarget {
  static instances: FakeAudio[] = []
  paused = true
  ended = false
  duration = 60
  volume = 1
  loop = false
  preload = ''
  pauseCalls = 0
  loadCalls = 0
  playCalls = 0
  seekAssignments: number[] = []
  private time = 0

  constructor(_source?: string) {
    super()
    FakeAudio.instances.push(this)
  }

  get currentTime() { return this.time }
  set currentTime(value: number) { this.time = value; this.seekAssignments.push(value) }
  pause() { this.paused = true; this.pauseCalls++ }
  load() { this.loadCalls++ }
  play() { this.paused = false; this.playCalls++; return Promise.resolve() }
}

afterEach(() => { cleanup(); vi.unstubAllGlobals(); FakeAudio.instances = [] })

it('stops intro only on the first move, keeps move/capture sounds, and resets intro for a new game', () => {
  vi.stubGlobal('Audio', FakeAudio)
  const initialBoard = createGame().board.map(row => [...row])
  initialBoard[4][0] = { id: 'black-soldier-test', type: 'soldier', side: 'black', name: '卒' }
  const firstBoard = initialBoard.map(row => [...row])
  const firstPiece = firstBoard[6][0] as Piece
  firstBoard[6][0] = null
  firstBoard[5][0] = firstPiece
  const secondBoard = firstBoard.map(row => [...row])
  secondBoard[5][0] = null
  secondBoard[4][0] = firstPiece
  const firstMove: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }
  const captureMove: Move = { from: { row: 5, col: 0 }, to: { row: 4, col: 0 } }
  type HookProps = { move: Move | null; board: Board; moveCount: number; phase: 'ready' | 'playing' | 'finished' }
  const initialProps: HookProps = { move: null, board: initialBoard, moveCount: 0, phase: 'ready' }
  const { result, rerender } = renderHook(({ move, board, moveCount, phase }: {
    move: Move | null; board: Board; moveCount: number; phase: 'ready' | 'playing' | 'finished'
  }) => useMoveSound(move, board, moveCount, phase), { initialProps })
  const [moveAudio, captureAudio, introOne, introTwo] = FakeAudio.instances

  introOne.currentTime = 5
  introTwo.currentTime = 6
  act(() => result.current.playMatchIntro(true))
  expect(introOne.currentTime).toBe(0)
  expect(introTwo.currentTime).toBe(0)
  expect(introOne.playCalls).toBe(1)
  expect(introTwo.playCalls).toBe(1)
  const introLoads = [introOne.loadCalls, introTwo.loadCalls]

  act(() => rerender({ move: firstMove, board: firstBoard, moveCount: 1, phase: 'playing' }))
  expect(introOne.pauseCalls).toBe(2)
  expect(introTwo.pauseCalls).toBe(2)
  expect(moveAudio.playCalls).toBe(1)
  introOne.currentTime = 3.25
  introTwo.currentTime = 4.5
  const introAfterFirstMove = [introOne, introTwo].map(audio => ({
    pauseCalls: audio.pauseCalls,
    playCalls: audio.playCalls,
    loadCalls: audio.loadCalls,
    currentTime: audio.currentTime,
    seeks: [...audio.seekAssignments],
  }))

  act(() => rerender({ move: captureMove, board: secondBoard, moveCount: 2, phase: 'playing' }))
  expect(captureAudio.playCalls).toBe(1)
  expect([introOne, introTwo].map(audio => ({
    pauseCalls: audio.pauseCalls,
    playCalls: audio.playCalls,
    loadCalls: audio.loadCalls,
    currentTime: audio.currentTime,
    seeks: [...audio.seekAssignments],
  }))).toEqual(introAfterFirstMove)

  act(() => rerender({ move: firstMove, board: firstBoard, moveCount: 0, phase: 'playing' }))
  expect(moveAudio.playCalls).toBe(2)
  expect([introOne.loadCalls, introTwo.loadCalls]).toEqual(introLoads)
  expect([introOne.currentTime, introTwo.currentTime]).toEqual([3.25, 4.5])

  act(() => result.current.playMatchIntro(true))
  expect(introOne.currentTime).toBe(0)
  expect(introTwo.currentTime).toBe(0)
  expect(introOne.playCalls).toBe(2)
  expect(introTwo.playCalls).toBe(2)
})
