import { afterEach, expect, it } from 'vitest'
import { io, type Socket } from 'socket.io-client'
import type { AddressInfo } from 'node:net'
import { createApplication } from '../server/app'
import type { ClientEvents, ServerEvents } from '../src/types/room'
import type { ChallengeInvite } from '../src/types/challenge'

let app: ReturnType<typeof createApplication> | undefined
const clients: Socket<ServerEvents, ClientEvents>[] = []
afterEach(async () => {
  clients.forEach(client => client.disconnect())
  clients.length = 0
  await app?.close()
})

it('acceptance moves both clients to the sender room and updates the previous room', async () => {
  app = createApplication()
  await new Promise<void>(resolve => app!.http.listen(0, '127.0.0.1', resolve))
  const url = `http://127.0.0.1:${(app.http.address() as AddressInfo).port}`
  const connect = async () => {
    const client: Socket<ServerEvents, ClientEvents> = io(url, { transports: ['websocket'], reconnection: false })
    clients.push(client)
    await new Promise<void>((resolve, reject) => { client.once('connect', resolve); client.once('connect_error', reject) })
    return client
  }
  const sender = await connect(), target = await connect(), other = await connect()
  for (const [client, name] of [[sender, 'An'], [target, 'Binh']] as const) {
    expect((await client.timeout(2000).emitWithAck('presence:update', {
      name, avatarIndex: 0, avatarFrameIndex: 0, elo: 0, localBusy: false,
    })).ok).toBe(true)
  }
  const destination = app.service.create('Sender', 15)
  const previous = app.service.create('Previous')
  await sender.timeout(2000).emitWithAck('room:join', { roomId: destination.id, name: 'An' })
  await target.timeout(2000).emitWithAck('room:join', { roomId: previous.id, name: 'Binh' })
  await other.timeout(2000).emitWithAck('room:join', { roomId: previous.id, name: 'Chi' })
  const incoming = new Promise<ChallengeInvite>(resolve => target.once('challenge:invite', resolve))
  expect((await sender.timeout(2000).emitWithAck('challenge:send', { id: target.id, name: 'Binh' })).ok).toBe(true)
  const invite = await incoming
  const senderAccepted = new Promise<string>(resolve => sender.once('challenge:accepted', ({ room }) => resolve(room.id)))
  const targetAccepted = new Promise<string>(resolve => target.once('challenge:accepted', ({ room }) => resolve(room.id)))
  const previousUpdated = new Promise<string[]>(resolve => other.once('room:state', room => resolve(room.players.map(player => player.name))))
  expect((await target.timeout(2000).emitWithAck('challenge:reply', { id: invite.id, accepted: true })).ok).toBe(true)
  expect(await senderAccepted).toBe(destination.id)
  expect(await targetAccepted).toBe(destination.id)
  expect(await previousUpdated).toEqual(['Chi'])
  expect(app.io.sockets.sockets.get(target.id!)?.rooms.has(previous.id)).toBe(false)
  expect(app.io.sockets.sockets.get(target.id!)?.rooms.has(destination.id)).toBe(true)
})
