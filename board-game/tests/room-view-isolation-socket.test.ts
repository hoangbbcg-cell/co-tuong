import { createServer } from 'node:http'
import type { AddressInfo } from 'node:net'
import { Server } from 'socket.io'
import { io as connect, type Socket } from 'socket.io-client'
import { expect, it } from 'vitest'
import { registerRoomSockets } from '../server/controllers/roomController'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import { publicRoom } from '../server/services/publicRoom'
import type { ClientEvents, RoomSnapshot, ServerEvents } from '../src/types/room'

it('ba socket: View không đổi bàn; đổi ghế chỉ sau hai ACK+2s và không thay tiếp người vừa lên', async () => {
  let now = 0
  const service = new RoomService(new RoomRepository(), () => now, () => 'red')
  const http = createServer()
  const io = new Server<ClientEvents, ServerEvents>(http)
  const interval = registerRoomSockets(io, service)
  const clients: Socket<ServerEvents, ClientEvents>[] = []
  const snapshot = service.create('Phòng kiểm tra')
  try {
    await new Promise<void>(resolve => http.listen(0, '127.0.0.1', resolve))
    const url = `http://127.0.0.1:${(http.address() as AddressInfo).port}`
    for (const name of ['PlayerA', 'PlayerB', 'PlayerC']) {
      const client: Socket<ServerEvents, ClientEvents> = connect(url, { transports: ['websocket'], reconnection: false })
      clients.push(client)
      await new Promise<void>((resolve, reject) => { client.once('connect', resolve); client.once('connect_error', reject) })
      expect((await client.timeout(3000).emitWithAck('room:join', { roomId: snapshot.id, name })).ok).toBe(true)
    }
    const [a, b, c] = clients
    await a.timeout(3000).emitWithAck('game:command', { type: 'ready' })
    await b.timeout(3000).emitWithAck('game:command', { type: 'ready' })
    const room = service.roomFor(a.id!)!
    const playing = JSON.stringify(room.game)
    const seats = JSON.stringify(room.players)
    await c.timeout(3000).emitWithAck('game:command', { type: 'join-queue' })
    await c.timeout(3000).emitWithAck('game:command', { type: 'leave-queue' })
    expect(JSON.stringify(room.game)).toBe(playing)
    expect(JSON.stringify(room.players)).toBe(seats)
    await b.timeout(3000).emitWithAck('game:command', { type: 'resign' })
    const matchId = room.lastCompletedMatch!.id
    await c.timeout(3000).emitWithAck('game:command', { type: 'join-queue' })
    now = 20_000; service.tick()
    expect(room.game.phase).toBe('finished')
    expect((await c.timeout(3000).emitWithAck('game:command', { type: 'result-presentation-complete', matchId })).ok).toBe(false)
    await a.timeout(3000).emitWithAck('game:command', { type: 'result-presentation-complete', matchId })
    await b.timeout(3000).emitWithAck('game:command', { type: 'result-presentation-complete', matchId })
    await c.timeout(3000).emitWithAck('game:command', { type: 'leave-queue' })
    await c.timeout(3000).emitWithAck('game:command', { type: 'join-queue' })
    now = 21_999; service.tick()
    expect(room.game.phase).toBe('finished')
    const received = new Promise<RoomSnapshot>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Không nhận được snapshot ghế mới')), 3000)
      c.once('room:state', state => { clearTimeout(timeout); resolve(state) })
    })
    now = 22_000
    for (const changed of service.tick()) io.to(changed.id).emit('room:state', publicRoom(changed))
    const next = await received
    expect(next.players.map(p => p.id)).toEqual([a.id, c.id])
    expect(next.viewers?.find(p => p.id === b.id)?.queued).toBe(false)
    await b.timeout(3000).emitWithAck('game:command', { type: 'join-queue' })
    await a.timeout(3000).emitWithAck('game:command', { type: 'ready' })
    now = 52_000; service.tick()
    expect(room.game.phase).toBe('playing')
    expect(room.players.map(p => p.id)).toEqual([a.id, c.id])
  } finally {
    clients.forEach(client => client.disconnect())
    clearInterval(interval)
    await new Promise<void>(resolve => io.close(() => resolve()))
  }
})
