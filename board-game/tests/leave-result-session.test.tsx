// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
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
import { App } from '../src/app/App'
afterEach(() => { cleanup(); useSessionStore.setState({ screen: 'home', room: null }) })
it('hands off a departure win once, never on a subsequent entry or seat change', () => {
  const game = { ...createGame(), phase: 'playing' as const }
  const self = { id: 'self', name: 'Self', side: 'red' as const, ready: true }
  const opponent = { id: 'other', name: 'Other', side: 'black' as const, ready: true }
  const room: RoomSnapshot = { id: 'room', name: 'Room', players: [self, opponent], game, messages: [], drawOffer: null }
  useSessionStore.setState({ screen: 'game', mode: 'online', room })
  render(<App />)
  const finished = { ...game, phase: 'finished' as const, result: { winner: 'red' as const, reason: 'leave' as const } }
  const ended = { ...room, players: [self], game: finished, lastCompletedMatch: { id: 'match', endedAt: 1, redName: 'Self', blackName: 'Other', states: [game, finished] } }
  act(() => useSessionStore.setState({ room: ended }))
  expect(screen.getByTestId('result').textContent).toBe('red')
  act(() => useSessionStore.setState({ room: { ...ended, players: [self, { ...opponent, id: 'new' }] } }))
  expect(screen.getByTestId('result').textContent).toBe('none')
  act(() => useSessionStore.setState({ room: ended }))
  expect(screen.getByTestId('result').textContent).toBe('none')
})
