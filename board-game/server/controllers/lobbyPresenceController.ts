import type { Server } from 'socket.io'
import type { ClientEvents, ServerEvents } from '../../src/types/room'
import type { LobbyPresenceService } from '../services/lobbyPresenceService'
import { allowSocketEvent } from '../services/socketRateLimiter'

export function registerLobbyPresence(
  io: Server<ClientEvents, ServerEvents>,
  service: LobbyPresenceService,
  authorize?: (socketId: string) => Promise<void>,
) {
  const broadcast = () => {
    for (const { id, count } of service.counts()) {
      io.to(id).emit('lobby:count', count)
    }
    io.emit('lobby:province-counts', service.countsByProvince())
  }

  io.on('connection', socket => {
    let windowStart = Date.now()
    let requests = 0
    let currentProvince: string | null = null

    let pending = Promise.resolve()
    let disconnected = false

    socket.on('lobby:presence', province => {
      if (disconnected) return
      if (!allowSocketEvent(socket)) return
      const now = Date.now()
      if (now - windowStart >= 1000) {
        windowStart = now
        requests = 0
      }
      if (++requests > 5) return
      pending = pending.then(async () => {
        if (disconnected) return
        if (authorize) {
          try {
            await authorize(socket.id)
          } catch {
            if (currentProvince !== null) {
              currentProvince = null
              service.remove(socket.id)
              broadcast()
            }
            return
          }
        }

      const nextProvince =
        typeof province === 'string' &&
        province.trim().length > 0 &&
        province.length <= 100
          ? province.trim().normalize('NFC')
          : province === null
            ? null
            : undefined

      if (nextProvince === undefined) return
      if (nextProvince === currentProvince) return

      if (disconnected) return
      currentProvince = nextProvince
      service.update(socket.id, nextProvince)
      broadcast()
      }).catch(() => {
        console.error('Lobby presence update failed.')
      })
    })

    socket.on('room:join', () => {
      if (currentProvince === null) return
      currentProvince = null
      service.remove(socket.id)
      broadcast()
    })

    socket.on('disconnect', () => {
      disconnected = true
      if (currentProvince === null) return
      currentProvince = null
      service.remove(socket.id)
      broadcast()
    })
  })
}


