import { afterEach, expect, it } from 'vitest'
import { io, type Socket } from 'socket.io-client'
import type { AddressInfo } from 'node:net'
import { createApplication } from '../server/app'
import type { ClientEvents, ServerEvents, RoomReaction } from '../src/types/room'
let app: ReturnType<typeof createApplication> | undefined
const clients: Socket<ServerEvents, ClientEvents>[] = []
afterEach(async () => { clients.forEach(client => client.disconnect()); clients.length = 0; await app?.close() })
it('phát biểu cảm tới đối thủ và khán giả, không gửi lặp về người bấm', async () => {
  app = createApplication()
  await new Promise<void>(resolve => app!.http.listen(0, '127.0.0.1', resolve))
  const url = 'http://127.0.0.1:' + (app.http.address() as AddressInfo).port
  const response = await fetch(url + '/api/rooms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Reaction room' }) })
  const { id } = await response.json()
  for (const name of ['Alice', 'Bob', 'Viewer']) {
    const client: Socket<ServerEvents, ClientEvents> = io(url, { transports: ['websocket'], reconnection: false })
    clients.push(client)
    await new Promise<void>((resolve, reject) => { client.once('connect', resolve); client.once('connect_error', reject) })
    expect((await client.emitWithAck('room:join', { roomId: id, name })).ok).toBe(true)
  }
  const [alice, bob, viewer] = clients
  let echoed = 0
  alice.on('room:reaction', () => { echoed++ })
  const next = (client: Socket<ServerEvents, ClientEvents>) => new Promise<RoomReaction>(resolve => client.once('room:reaction', resolve))
  const deliveries = [next(bob), next(viewer)]
  const reply = await alice.emitWithAck('room:reaction', { targetSide: 'black', targetId: bob.id!, reaction: '👏' })
  expect(reply.ok).toBe(true)
  for (const event of await Promise.all(deliveries)) expect(event).toMatchObject({ roomId: id, actorId: alice.id, targetId: bob.id, targetSide: 'black', reaction: '👏' })
  expect(echoed).toBe(0)
}, 10000)
