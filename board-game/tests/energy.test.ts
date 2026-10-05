import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { useGameStore } from '../src/store/gameStore'
import { useSessionStore } from '../src/store/sessionStore'
import { createGame } from '../src/game/state/initial'
import type { RoomSnapshot } from '../src/types/room'

beforeEach(() => {
  useSessionStore.getState().leave()
  vi.useFakeTimers()
  vi.setSystemTime(0)
  useSessionStore.setState({ energy: 5, energyRecoveryAt: null })
  useGameStore.getState().reset(0)
})
afterEach(() => vi.useRealTimers())

it('computer games do not charge energy', () => {
  useSessionStore.setState({ mode: 'computer' })
  useGameStore.getState().start(0)
  expect(useSessionStore.getState().energy).toBe(5)
  expect(useSessionStore.getState().energyRecoveryAt).toBeNull()
})

it('recovers every five minutes without restarting countdown on another charge', () => {
  useSessionStore.getState().consumeEnergy()
  vi.setSystemTime(60000)
  useSessionStore.getState().consumeEnergy()
  expect(useSessionStore.getState().energyRecoveryAt).toBe(300000)
  useSessionStore.getState().recoverEnergy(299999)
  expect(useSessionStore.getState().energy).toBe(3)
  useSessionStore.getState().recoverEnergy(300000)
  expect(useSessionStore.getState().energy).toBe(4)
  expect(useSessionStore.getState().energyRecoveryAt).toBe(600000)
  useSessionStore.getState().recoverEnergy(1200000)
  expect(useSessionStore.getState().energy).toBe(5)
  expect(useSessionStore.getState().energyRecoveryAt).toBeNull()
})

it('charges once per local start, not reset, and never below zero', () => {
  expect(useSessionStore.getState().energy).toBe(5)
  useGameStore.getState().start(0)
  useGameStore.getState().start(1)
  expect(useSessionStore.getState().energy).toBe(4)
  useGameStore.getState().reset(2)
  expect(useSessionStore.getState().energy).toBe(4)
  for (let i = 0; i < 6; i++) {
    useGameStore.getState().reset(i)
    useGameStore.getState().start(i)
  }
  expect(useSessionStore.getState().energy).toBe(0)
})

it('charges online starts only for seated players, not repeated snapshots or viewers', () => {
  const room: RoomSnapshot = { id: 'energy', name: 'Energy', players: [{ id: 'player', name: 'Player', side: 'red', ready: true }], game: createGame(), messages: [], drawOffer: null }
  const playing: RoomSnapshot = { ...room, game: { ...room.game, phase: 'playing' } }
  useSessionStore.getState().enterOnline(room)
  useSessionStore.getState().receiveRoom(playing, 'player')
  useSessionStore.getState().receiveRoom(playing, 'player')
  expect(useSessionStore.getState().energy).toBe(4)
  useSessionStore.getState().receiveRoom(room, 'viewer')
  useSessionStore.getState().receiveRoom(playing, 'viewer')
  expect(useSessionStore.getState().energy).toBe(4)
})
