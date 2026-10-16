import type { Server } from 'socket.io'
import type { ClientEvents, ServerEvents } from '../../src/types/room'
import type { LobbyPresenceService } from '../services/lobbyPresenceService'

export function registerLobbyPresence(io: Server<ClientEvents, ServerEvents>, service: LobbyPresenceService) {
  const broadcast = () => {
    for (const { id, count } of service.counts()) io.to(id).emit('lobby:count', count)
    io.emit('lobby:province-counts', service.countsByProvince())
  }
  io.on('connection', socket => {
    socket.on('lobby:presence', province => { service.update(socket.id, province); broadcast() })
    socket.on('room:join', () => { service.remove(socket.id); broadcast() })
    socket.on('disconnect', () => { service.remove(socket.id); broadcast() })
  })
}
