import { expect, it, vi } from 'vitest'
import { registerLobbyPresence } from '../server/controllers/lobbyPresenceController'
import { LobbyPresenceService } from '../server/services/lobbyPresenceService'
import { LobbyPresenceRepository } from '../server/repositories/lobbyPresenceRepository'

it('limits presence updates and skips unchanged broadcasts', async () => {
  vi.useFakeTimers()
  try {
    const handlers = new Map<string, (...args: any[]) => void>()
    const socket = {
      id: 'socket-a',
      on: vi.fn((event: string, handler: (...args: any[]) => void) => {
        handlers.set(event, handler)
      }),
    }

    const emitToSocket = vi.fn()
    const emitGlobal = vi.fn()

    const io = {
      on: vi.fn((_event: string, handler: (socket: any) => void) => {
        handler(socket)
      }),
      to: vi.fn(() => ({ emit: emitToSocket })),
      emit: emitGlobal,
    }

    const service = new LobbyPresenceService(new LobbyPresenceRepository())
    registerLobbyPresence(io as any, service)

    const presence = handlers.get('lobby:presence')!
    const flush = async () => {
      for (let i = 0; i < 12; i++) await Promise.resolve()
    }
    presence('Home')
    await flush()
    expect(service.countsByProvince()).toEqual({ Home: 1 })
    expect(emitGlobal).toHaveBeenCalledTimes(1)

    presence('Home')
    await flush()
    expect(emitGlobal).toHaveBeenCalledTimes(1)

    presence('Other')
    await flush()
    expect(service.countsByProvince()).toEqual({ Other: 1 })
    expect(emitGlobal).toHaveBeenCalledTimes(2)

    presence('Third')
    presence('Fourth')
    presence('Fifth')
    presence('Blocked')
    await flush()

    expect(service.countsByProvince()).toEqual({ Fourth: 1 })
    expect(emitGlobal).toHaveBeenCalledTimes(4)

    vi.advanceTimersByTime(1000)
    presence('Allowed')
    await flush()
    expect(service.countsByProvince()).toEqual({ Allowed: 1 })
    expect(emitGlobal).toHaveBeenCalledTimes(5)

    handlers.get('disconnect')!()
    expect(service.countsByProvince()).toEqual({})
  } finally {
    vi.useRealTimers()
  }
})


it('rejects lobby presence updates after session revocation', async () => {
  const handlers = new Map<string, (...args: any[]) => void>()
  const socket = {
    id: 'revoked-socket',
    on: vi.fn((event: string, handler: (...args: any[]) => void) => {
      handlers.set(event, handler)
    }),
  }

  const io = {
    on: vi.fn((_event: string, handler: (socket: any) => void) => {
      handler(socket)
    }),
    to: vi.fn(() => ({ emit: vi.fn() })),
    emit: vi.fn(),
  }

  const service = new LobbyPresenceService(new LobbyPresenceRepository())
  let active = true
  const authorize = vi.fn(async () => {
    if (!active) throw new Error('Session revoked')
  })

  registerLobbyPresence(io as any, service, authorize)

  const flush = async () => {
    for (let i = 0; i < 12; i++) await Promise.resolve()
  }

  handlers.get('lobby:presence')!('Home')
  await flush()
  expect(service.countsByProvince()).toEqual({ Home: 1 })

  active = false
  handlers.get('lobby:presence')!('Other')
  await flush()

  expect(service.countsByProvince()).toEqual({})
  expect(authorize).toHaveBeenCalledTimes(2)
})
