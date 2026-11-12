// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { useGame } from '../src/features/game/hooks/useGame'
import { LeaveRoomDialog } from '../src/features/game/components/LeaveRoomDialog'
import { useSessionStore } from '../src/store/sessionStore'
import { useGameStore } from '../src/store/gameStore'
import { createGame } from '../src/game/state/initial'
import type { RoomSnapshot } from '../src/types/room'
import { roomSocket } from '../src/services/socket'

vi.mock('../src/services/socket', () => ({ socket: { id: 'self' }, roomSocket: { leave: vi.fn().mockResolvedValue(null), command: vi.fn() } }))
vi.mock('../src/features/game/hooks/useComputer', () => ({ useComputer: () => ({ error: '', thinking: false, retry: vi.fn() }) }))
vi.mock('../src/features/game/hooks/useTestBot', () => ({ useTestBot: () => ({ error: '', pending: false, start: vi.fn(), select: vi.fn() }) }))
vi.mock('../src/features/game/hooks/useMoveSound', () => ({ useMoveSound: () => ({ playMatchIntro: vi.fn(), checkmateAudioComplete: true }) }))

const room = (): RoomSnapshot => ({ id: 'room', name: 'Bàn', players: [{ id: 'self', name: 'PlayerSelf', side: 'red', ready: true }, { id: 'other', name: 'PlayerOther', side: 'black', ready: true }], viewers: [], game: { ...createGame(), phase: 'playing' }, messages: [], drawOffer: null })
it.each(['locked', 'custom', 'ordinary'] as const)('sole seated player can stand only in a managed room: %s', async kind => {
  const snapshot = room()
  snapshot.players = snapshot.players.slice(0, 1)
  snapshot.game = { ...snapshot.game, phase: 'ready' }
  snapshot.locked = kind === 'locked'
  if (kind === 'custom') snapshot.customFen = 'custom source'
  useSessionStore.setState({ room: snapshot })
  vi.mocked(roomSocket.command).mockResolvedValue(snapshot)
  const hook = renderHook(() => useGame())
  await act(async () => { hook.result.current.standUp() })
  if (kind === 'ordinary') expect(roomSocket.command).not.toHaveBeenCalled()
  else expect(roomSocket.command).toHaveBeenCalledExactlyOnceWith({ type: 'stand-up' })
})
it('resignation requires an explicit decision and cancelling never sends the command', () => {
  const hook = renderHook(() => useGame())
  act(() => hook.result.current.resign())
  expect(hook.result.current.resignConfirmationOpen).toBe(true)
  expect(roomSocket.command).not.toHaveBeenCalled()
  act(() => hook.result.current.cancelResign())
  act(() => hook.result.current.confirmResign())
  expect(hook.result.current.resignConfirmationOpen).toBe(false)
  expect(roomSocket.command).not.toHaveBeenCalled()
})

it('accepting resignation sends the existing server command', async () => {
  vi.mocked(roomSocket.command).mockResolvedValueOnce(room())
  const hook = renderHook(() => useGame())
  act(() => hook.result.current.resign())
  await act(async () => { hook.result.current.confirmResign() })
  expect(roomSocket.command).toHaveBeenCalledExactlyOnceWith({ type: 'resign' })
  expect(hook.result.current.resignConfirmationOpen).toBe(false)
})

it.each(['finished', 'new-seat'] as const)('dismisses a stale resignation without sending it: %s', change => {
  const hook = renderHook(() => useGame())
  act(() => hook.result.current.resign())
  const next = room()
  if (change === 'finished') next.game = { ...next.game, phase: 'finished', result: { winner: 'red', reason: 'checkmate' } }
  else next.players[1] = { ...next.players[1], id: 'new-opponent' }
  act(() => useSessionStore.setState({ room: next }))
  expect(hook.result.current.resignConfirmationOpen).toBe(false)
  act(() => hook.result.current.confirmResign())
  expect(roomSocket.command).not.toHaveBeenCalled()
})

beforeEach(() => {
  vi.useFakeTimers(); vi.clearAllMocks()
  vi.stubGlobal('matchMedia', () => ({ matches: true }))
  useGameStore.getState().reset(0)
  useSessionStore.setState({ screen: 'game', mode: 'online', room: room(), lobbyOpen: false, account: null, testBotId: undefined })
})
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals() })

it('Back during a live participant match opens confirmation without leaving or changing the game', async () => {
  const hook = renderHook(() => useGame())
  const game = hook.result.current.game
  await act(() => hook.result.current.leave())
  expect(hook.result.current.leaveConfirmationOpen).toBe(true)
  expect(roomSocket.leave).not.toHaveBeenCalled()
  expect(hook.result.current.game).toBe(game)
  expect(useSessionStore.getState().screen).toBe('game')
  act(() => hook.result.current.cancelLeave())
  expect(hook.result.current.leaveConfirmationOpen).toBe(false)
  expect(roomSocket.leave).not.toHaveBeenCalled()
})

it('confirmation sends the existing authoritative leave action and returns home', async () => {
  const hook = renderHook(() => useGame())
  await act(() => hook.result.current.leave())
  await act(() => hook.result.current.confirmLeave())
  expect(roomSocket.leave).toHaveBeenCalledTimes(1)
  expect(useSessionStore.getState().screen).toBe('home')
})

it.each(['ready', 'finished'] as const)('leaves immediately outside an active match: %s', phase => {
  const snapshot = room(); snapshot.game = { ...snapshot.game, phase }
  useSessionStore.setState({ room: snapshot })
  const hook = renderHook(() => useGame())
  return act(async () => {
    await hook.result.current.leave()
    expect(roomSocket.leave).toHaveBeenCalledTimes(1)
    expect(useSessionStore.getState().screen).toBe('home')
  })
})

it('spectators leave an active room without the forfeit warning', async () => {
  const snapshot = room(); snapshot.players = snapshot.players.filter(player => player.id !== 'self'); snapshot.viewers = [{ id: 'self', name: 'PlayerSelf', queued: false }]
  useSessionStore.setState({ room: snapshot })
  const hook = renderHook(() => useGame())
  await act(() => hook.result.current.leave())
  expect(roomSocket.leave).toHaveBeenCalledTimes(1)
  expect(hook.result.current.leaveConfirmationOpen).toBe(false)
})

it('a replay exits through its own callback without the forfeit warning', async () => {
  const leave = vi.fn()
  const hook = renderHook(() => useGame({ game: room().game, moveCount: 0, animation: null, leave }))
  await act(() => hook.result.current.leave())
  expect(leave).toHaveBeenCalledTimes(1)
  expect(roomSocket.leave).not.toHaveBeenCalled()
  expect(hook.result.current.leaveConfirmationOpen).toBe(false)
})

it('dismisses a stale confirmation when the match finishes or another seat session starts', async () => {
  const hook = renderHook(() => useGame())
  await act(() => hook.result.current.leave())
  act(() => useSessionStore.setState({ room: { ...room(), game: { ...room().game, phase: 'finished', result: { winner: 'red', reason: 'resign' } } } }))
  expect(hook.result.current.leaveConfirmationOpen).toBe(false)
  act(() => useSessionStore.setState({ room: room() }))
  await act(() => hook.result.current.leave())
  const next = room(); next.players[1] = { ...next.players[1], id: 'new-opponent' }
  act(() => useSessionStore.setState({ room: next }))
  expect(hook.result.current.leaveConfirmationOpen).toBe(false)
  expect(roomSocket.leave).not.toHaveBeenCalled()
})

it('also confirms before abandoning an active local board', async () => {
  useSessionStore.setState({ mode: 'local', room: null })
  useGameStore.getState().start(0)
  const hook = renderHook(() => useGame())
  await act(() => hook.result.current.leave())
  expect(hook.result.current.leaveConfirmationOpen).toBe(true)
  expect(useGameStore.getState().game.phase).toBe('playing')
})

it('shows the forfeit note between the title and the two decisions, with Escape cancelling', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.open = true } })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function (this: HTMLDialogElement) { this.open = false } })
  const cancel = vi.fn(), confirm = vi.fn()
  render(<LeaveRoomDialog onCancel={cancel} onConfirm={confirm} />)
  const dialog = screen.getByRole('alertdialog')
  expect(dialog.getAttribute('aria-describedby')).toBe('leave-room-warning')
  expect(screen.getByText('Khi rời bàn, bạn sẽ thua ván đấu.')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))
  expect(cancel).toHaveBeenCalledTimes(1)
  expect(confirm).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: 'Rời bàn' }))
  expect(confirm).toHaveBeenCalledTimes(1)
  fireEvent(dialog.closest('dialog')!, new Event('cancel', { cancelable: true }))
  expect(cancel).toHaveBeenCalledTimes(2)
})
