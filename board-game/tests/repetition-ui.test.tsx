// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { Board } from '../src/features/game/components/Board'
import { useGame } from '../src/features/game/hooks/useGame'
import { useGameStore } from '../src/store/gameStore'
import { useSessionStore } from '../src/store/sessionStore'
import { createGame } from '../src/game/state/initial'
import { applyMove, startGame } from '../src/game/moves/actions'
import { candidateRepetition, REPETITION_FORBIDDEN_MESSAGE, REPETITION_WARNING_MESSAGE } from '../src/game/rules/repetition'
import { roomSocket, socket } from '../src/services/socket'
import { pikafishApi } from '../src/services/pikafish'
import { PIECE_MOVE_DURATION_MS } from '../src/features/game/moveAnimation'

const audio = vi.hoisted(() => ({ play: vi.fn() }))
vi.mock('../src/features/game/audio/GameSounds', () => ({ GameSounds: class {
  play = audio.play
  playIntro() {} playCheckmate() {} stopIntro() {} stopAll() {} dispose() {}
  startClockWarning() {} stopClockWarning() {}
} }))

const move = { from: { row: 9, col: 1 }, to: { row: 7, col: 2 } }
function fixture(rounds: number) {
  const game = startGame(createGame(performance.now()), performance.now())
  const blackMove = { from: { row: 0, col: 1 }, to: { row: 2, col: 2 } }
  game.repetition!.cycle = {
    starter: 'red', rounds, phase: 0,
    shuttles: {
      red: { pieceId: game.board[move.from.row][move.from.col]!.id, from: move.from, to: move.to },
      black: { pieceId: game.board[blackMove.from.row][blackMove.from.col]!.id, from: blackMove.from, to: blackMove.to },
    },
  }
  return game
}
function thirdRoundClosingGame() {
  const redBack = { from: move.to, to: move.from }
  const blackMove = { from: { row: 0, col: 1 }, to: { row: 2, col: 2 } }
  const blackBack = { from: blackMove.to, to: blackMove.from }
  let game = startGame(createGame(performance.now()), performance.now())
  for (let lap = 0; lap < 2; lap++) for (const step of [move, blackMove, redBack, blackBack]) game = applyMove(game, step, performance.now())
  for (const step of [move, blackMove, redBack]) game = applyMove(game, step, performance.now())
  return { game, blackBack }
}
function Harness() {
  const match = useGame()
  return <><Board board={match.game.board} selected={match.selected} legalMoves={match.legalMoves} forbiddenMoves={match.forbiddenMoves} animation={match.animation} lastMove={match.game.lastMove} frameWidth={400} scale={.35} disabled={false} showStart={false} startDisabled={false} startLabel="Start" onSelect={match.select} onStart={match.start} /><p role="status">{match.repetitionNotice}</p></>
}
beforeEach(() => {
  vi.useFakeTimers()
  window.matchMedia = vi.fn().mockReturnValue({ matches: true })
  useGameStore.getState().reset(performance.now())
  useSessionStore.setState({ screen: 'game', mode: 'local', lobbyOpen: false, room: null, notice: '', humanSide: 'red' })
})
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); vi.clearAllMocks(); socket.id = undefined })

it.each(['local', 'online'] as const)('red-dot click in %s preserves selection/clock without sound, AI or socket move', mode => {
  const game = fixture(4)
  const command = vi.spyOn(roomSocket, 'command')
  const ai = vi.spyOn(pikafishApi, 'move')
  useGameStore.setState({ game, selected: null })
  if (mode === 'online') {
    socket.id = 'r'
    useSessionStore.setState({ mode, room: { id: 'test', name: 'Test', game, moveCount: 0, players: [{ id: 'r', name: 'Red', side: 'red', ready: true }], messages: [], drawOffer: null } })
  }
  render(<Harness />)
  fireEvent.click(screen.getAllByTestId('board-hit')[82])
  expect(screen.getByTestId('repetition-forbidden-marker')).toBeInTheDocument()
  const before = useGameStore.getState()
  fireEvent.click(screen.getAllByTestId('board-hit')[65])
  expect(screen.getByRole('status')).toHaveTextContent(REPETITION_FORBIDDEN_MESSAGE.replace('\n', ' '))
  expect(screen.getByTestId('selected-marker')).toBeInTheDocument()
  expect(screen.getByTestId('repetition-forbidden-marker')).toBeInTheDocument()
  expect(useGameStore.getState().game).toBe(game)
  expect(useGameStore.getState().animationVersion).toBe(before.animationVersion)
  expect(useGameStore.getState().animation).toBeNull()
  expect(audio.play).not.toHaveBeenCalled()
  expect(command).not.toHaveBeenCalled()
  expect(ai).not.toHaveBeenCalled()
  // The selected piece stays available; choosing another own piece clears its red hints.
  fireEvent.click(screen.getAllByTestId('board-hit')[81])
  expect(screen.queryByTestId('repetition-forbidden-marker')).not.toBeInTheDocument()
})

it('third occurrence warns after local animation completes; fourth does not warn', () => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: false })
  const closing = thirdRoundClosingGame()
  useGameStore.setState({ game: closing.game, selected: null })
  const view = render(<Harness />)
  fireEvent.click(screen.getAllByTestId('board-hit')[20])
  fireEvent.click(screen.getAllByTestId('board-hit')[1])
  expect(useGameStore.getState().game.repetition?.warning).toBe(true)
  expect(screen.getByRole('status')).toBeEmptyDOMElement()
  act(() => vi.advanceTimersByTime(PIECE_MOVE_DURATION_MS))
  expect(screen.getByRole('status')).toHaveTextContent(REPETITION_WARNING_MESSAGE.replace('\n', ' '))
  view.unmount()
  window.matchMedia = vi.fn().mockReturnValue({ matches: true })
  useGameStore.setState({ game: fixture(3), selected: null, animation: null })
  render(<Harness />)
  fireEvent.click(screen.getAllByTestId('board-hit')[82])
  fireEvent.click(screen.getAllByTestId('board-hit')[65])
  expect(useGameStore.getState().game.repetition?.warning).toBe(false)
  expect(screen.getByRole('status')).toBeEmptyDOMElement()
})

it('online clock snapshots do not repeat the third-occurrence notification', () => {
  socket.id = 'b'
  const closing = thirdRoundClosingGame()
  const game = closing.game
  const room = { id: 'test', name: 'Test', game, moveCount: 11, players: [{ id: 'b', name: 'Black', side: 'black' as const, ready: true }], messages: [], drawOffer: null }
  useSessionStore.setState({ mode: 'online', room })
  render(<Harness />)
  const next = { ...room, game: applyMove(game, closing.blackBack, performance.now()), moveCount: 12 }
  act(() => useSessionStore.setState({ room: next }))
  expect(screen.getByRole('status')).toHaveTextContent(REPETITION_WARNING_MESSAGE.replace('\n', ' '))
  act(() => vi.advanceTimersByTime(5000))
  expect(screen.getByRole('status')).toBeEmptyDOMElement()
  act(() => useSessionStore.setState({ room: structuredClone(next) }))
  expect(screen.getByRole('status')).toBeEmptyDOMElement()
})
