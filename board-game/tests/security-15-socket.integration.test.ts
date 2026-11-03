import { afterEach, expect, it } from 'vitest'
import { io as connect, type Socket } from 'socket.io-client'
import type { AddressInfo } from 'node:net'
import { createApplication } from '../server/app'
import type { ClientEvents, ServerEvents } from '../src/types/room'

let app: ReturnType<typeof createApplication> | undefined
const clients: Socket<ServerEvents, ClientEvents>[] = []

afterEach(async () => {
  for (const client of clients) client.disconnect()
  clients.length = 0
  await app?.close()
  app = undefined
})

it('enforces one shared limit across Room and Challenge events', async () => {
  app = createApplication()
  await new Promise<void>(resolve => app!.http.listen(0, '127.0.0.1', resolve))
  const address = app.http.address() as AddressInfo
  const client = connect(`http://127.0.0.1:${address.port}`, {
    transports: ['websocket'],
    reconnection: false,
  })
  clients.push(client)

  await new Promise<void>((resolve, reject) => {
    client.once('connect', resolve)
    client.once('connect_error', reject)
  })

  const responses: Array<{ ok: boolean; error?: string }> = []

  // Alternate two different controllers within the same one-second window.
  for (let i = 0; i < 22; i++) {
    const response = i % 2 === 0
      ? await client.timeout(2000).emitWithAck('room:leave')
      : await client.timeout(2000).emitWithAck('challenge:reply', {
          id: 'nonexistent',
          accepted: false,
        })
    responses.push(response)
  }

  expect(responses.slice(0, 20).every(result =>
    result.error !== 'Thao tác quá nhanh. Vui lòng thử lại.'
  )).toBe(true)

  expect(responses.slice(20).every(result =>
    result.ok === false &&
    result.error === 'Thao tác quá nhanh. Vui lòng thử lại.'
  )).toBe(true)
})
