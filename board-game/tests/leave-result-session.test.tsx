// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { useSessionStore } from '../src/store/sessionStore'
import type { RoomSnapshot } from '../src/types/room'
vi.mock('../src/app/useRoomConnection', () => ({ useRoomConnection: () => {} }))
vi.mock('../src/app/useEnergyRecovery', () => ({ useEnergyRecovery: () => {} }))
vi.mock('../src/services/socket', () => ({ socket: { id: 'self' } }))
vi.mock('../src/pages/game/GamePage', () => ({ GamePage: ({ initialResultSide }: { initialResultSide?: string }) => <div data-testid="result">{initialResultSide ?? 'none'}</div> }))
vi.mock('../src/app/ChallengeNotifications', () => ({ ChallengeNotifications: () => null }))
vi.mock('../src/pages/home/HomePage', () => ({ HomePage: () => null }))
vi.mock('../src/pages/shop/ShopPage', () => ({ ShopPage: () => null }))
vi.mock('../src/pages/rooms/RoomSelectionPage', () => ({ RoomSelectionPage: () => null }))
vi.mock('../src/pages/computer/ComputerPage', () => ({ ComputerPage: () => null }))
vi.mock('../src/pages/computer/CustomPositionPage', () => ({ CustomPositionPage: () => null }))
vi.mock('../src/features/game/components/EnergyNotice', () => ({ EnergyNotice: () => null }))
let App: typeof import('../src/app/App')['App']

beforeAll(async () => {
  const appModule = await import('../src/app/App')
  App = appModule.App

  // App preloads route modules during import.
  // Wait for all dynamic imports before Vitest can tear down jsdom.
  await vi.dynamicImportSettled()
}, 30000)
afterEach(async () => { cleanup(); useSessionStore.setState({ screen: 'home', room: null }); await vi.dynamicImportSettled() })
it('keeps the room screen mounted through player and viewer arrivals and departures', async () => {
  const self = { id: 'self', name: 'Self', side: 'red' as const, ready: false }
  const opponent = { id: 'other', name: 'Other', side: 'black' as const, ready: false }
  const room: RoomSnapshot = { id: 'stable-room', name: 'Room', players: [self], game: createGame(), messages: [], drawOffer: null }
  useSessionStore.setState({ screen: 'game', mode: 'online', room })
  render(<App />)
  const original = await screen.findByTestId('result')
  act(() => useSessionStore.setState({ room: { ...room, players: [self, opponent] } }))
  expect(screen.getByTestId('result')).toBe(original)
  act(() => useSessionStore.setState({ room }))
  expect(screen.getByTestId('result')).toBe(original)
  act(() => useSessionStore.setState({ room: { ...room, viewers: [{ id: 'viewer', name: 'Viewer', queued: false }] } }))
  expect(screen.getByTestId('result')).toBe(original)
  act(() => useSessionStore.setState({ room }))
  expect(screen.getByTestId('result')).toBe(original)
  act(() => useSessionStore.setState({ room: { ...room, id: 'different-room' } }))
  expect(screen.getByTestId('result')).not.toBe(original)
})
it('hands off a departure win once, never on a subsequent entry or seat change', async () => {
  const game = { ...createGame(), phase: 'playing' as const }
  const self = { id: 'self', name: 'Self', side: 'red' as const, ready: true }
  const opponent = { id: 'other', name: 'Other', side: 'black' as const, ready: true }
  const room: RoomSnapshot = { id: 'room', name: 'Room', players: [self, opponent], game, messages: [], drawOffer: null }
  useSessionStore.setState({ screen: 'game', mode: 'online', room })
  render(<App />)
  await screen.findByTestId('result')
  const finished = { ...game, phase: 'finished' as const, result: { winner: 'red' as const, reason: 'leave' as const } }
  const ended = { ...room, players: [self], game: finished, lastCompletedMatch: { id: 'match', endedAt: 1, redName: 'Self', blackName: 'Other', states: [game, finished] } }
  act(() => useSessionStore.setState({ room: ended }))
  expect(screen.getByTestId('result').textContent).toBe('red')
  act(() => useSessionStore.setState({ room: { ...ended, players: [self, { ...opponent, id: 'new' }] } }))
  expect(screen.getByTestId('result').textContent).toBe('none')
  act(() => useSessionStore.setState({ room: ended }))
  expect(screen.getByTestId('result').textContent).toBe('none')
})
