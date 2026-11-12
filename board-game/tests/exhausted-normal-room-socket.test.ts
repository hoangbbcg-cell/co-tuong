import { createServer } from 'node:http'
import type { AddressInfo } from 'node:net'
import { Server } from 'socket.io'
import { io as connect, type Socket } from 'socket.io-client'
import { expect, it, vi } from 'vitest'
import { registerRoomSockets } from '../server/controllers/roomController'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import type { ClientEvents, ServerEvents } from '../src/types/room'

it('publishes legacy thirty-minute empty cleanup while preserving a seated player and their socket', async () => {
  const clock = vi.spyOn(Date, 'now').mockReturnValue(1000)
  const repository = new RoomRepository(), service = new RoomService(repository, () => 0)
  const http = createServer(), io = new Server<ClientEvents, ServerEvents>(http)
  const interval = registerRoomSockets(io, service)
  let client: Socket<ServerEvents, ClientEvents> | undefined
  try {
    await new Promise<void>(resolve => http.listen(0, '127.0.0.1', resolve))
    const url = `http://127.0.0.1:${(http.address() as AddressInfo).port}`
    client = connect(url, { transports: ['websocket'], reconnection: false })
    await new Promise<void>((resolve, reject) => { client!.once('connect', resolve); client!.once('connect_error', reject) })
    const occupied = service.create('Co nguoi').id
    expect((await client.timeout(3000).emitWithAck('room:join', { roomId: occupied, name: 'An' })).ok).toBe(true)
    const abandoned = service.create('Bo do').id
    const changed = vi.fn(), removed = vi.fn()
    client.on('rooms:changed', changed); client.on('room:removed', removed)
    clock.mockReturnValue(1801000)
    await vi.waitFor(() => {
      expect(repository.get(abandoned)).toBeUndefined()
      expect(changed).toHaveBeenCalled()
    }, { timeout: 3000 })
    expect(service.list().map(room => room.id)).toEqual([occupied])
    expect(service.roomFor(client.id!)?.id).toBe(occupied)
    expect(io.sockets.sockets.get(client.id!)?.rooms.has(occupied)).toBe(true)
    expect(removed).not.toHaveBeenCalled()
  } finally {
    client?.disconnect(); clearInterval(interval)
    await new Promise<void>(resolve => io.close(() => resolve()))
    clock.mockRestore()
  }
})

it('removes depleted spectators from the socket room when the last ordinary seat leaves', async () => {
  const exhausted = new Set<string>()
  const repo = new RoomRepository(undefined, () => true, id => !exhausted.has(id))
  const service = new RoomService(repo, () => 0)
  const http = createServer(), io = new Server<ClientEvents, ServerEvents>(http)
  const interval = registerRoomSockets(io, service)
  const clients: Socket<ServerEvents, ClientEvents>[] = []
  try {
    await new Promise<void>(resolve => http.listen(0, '127.0.0.1', resolve))
    const url = `http://127.0.0.1:${(http.address() as AddressInfo).port}`
    const roomId = service.create('Ordinary').id
    for (const name of ['An', 'Binh', 'Chi']) {
      const client: Socket<ServerEvents, ClientEvents> = connect(url, { transports: ['websocket'], reconnection: false })
      clients.push(client)
      await new Promise<void>((resolve, reject) => { client.once('connect', resolve); client.once('connect_error', reject) })
      expect((await client.timeout(3000).emitWithAck('room:join', { roomId, name })).ok).toBe(true)
    }
    const viewer = clients[2]
    exhausted.add(viewer.id!)
    const removed = vi.fn(), notice = vi.fn()
    viewer.on('room:removed', removed); viewer.on('room:notice', notice)
    for (const client of clients.slice(0, 2)) expect((await client.timeout(3000).emitWithAck('room:leave')).ok).toBe(true)
    await vi.waitFor(() => {
      expect(removed).toHaveBeenCalledWith(roomId, 'energy')
      expect(notice).toHaveBeenCalledWith('Không đủ năng lượng.')
      expect(io.sockets.sockets.get(viewer.id!)?.rooms.has(roomId)).toBe(false)
    })
    expect(repo.get(roomId)).toBeUndefined()
    expect(service.roomFor(viewer.id!)).toBeUndefined()
  } finally {
    clients.forEach(client => client.disconnect())
    clearInterval(interval)
    await new Promise<void>(resolve => io.close(() => resolve()))
  }
})

it('notifies both real clients of energy removal, detaches their sockets and deletes the room', async () => {
  let now = 0
  const exhausted = new Set<string>()
  const repo = new RoomRepository(undefined, () => true, id => !exhausted.has(id))
  const service = new RoomService(repo, () => now, () => 'red')
  const http = createServer(), io = new Server<ClientEvents, ServerEvents>(http)
  const interval = registerRoomSockets(io, service)
  const clients: Socket<ServerEvents, ClientEvents>[] = []
  const removals: unknown[] = [], notices: string[] = []
  try {
    await new Promise<void>(resolve => http.listen(0, '127.0.0.1', resolve))
    const url = `http://127.0.0.1:${(http.address() as AddressInfo).port}`
    const roomId = service.create('Energy').id
    for (const name of ['An', 'Binh']) {
      const client: Socket<ServerEvents, ClientEvents> = connect(url, { transports: ['websocket'], reconnection: false })
      clients.push(client)
      await new Promise<void>((resolve, reject) => { client.once('connect', resolve); client.once('connect_error', reject) })
      client.on('room:removed', (id, reason) => removals.push([client.id, id, reason]))
      client.on('room:notice', message => notices.push(message))
      expect((await client.timeout(3000).emitWithAck('room:join', { roomId, name })).ok).toBe(true)
    }
    for (const client of clients) expect((await client.timeout(3000).emitWithAck('game:command', { type: 'ready' })).ok).toBe(true)
    for (const client of clients) exhausted.add(client.id!)
    now = 2000
    expect((await clients[1].timeout(3000).emitWithAck('game:command', { type: 'resign' })).ok).toBe(true)
    now = 5000
    await vi.waitFor(() => {
      expect(removals).toHaveLength(2)
      expect(notices).toEqual(['Không đủ năng lượng.', 'Không đủ năng lượng.'])
    }, { timeout: 3000 })
    for (const client of clients) {
      expect(removals).toContainEqual([client.id, roomId, 'energy'])
      expect(io.sockets.sockets.get(client.id!)?.rooms.has(roomId)).toBe(false)
      expect(service.roomFor(client.id!)).toBeUndefined()
    }
    expect(repo.get(roomId)).toBeUndefined()
  } finally {
    clients.forEach(client => client.disconnect())
    clearInterval(interval)
    await new Promise<void>(resolve => io.close(() => resolve()))
  }
})
