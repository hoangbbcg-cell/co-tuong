import { expect, it } from 'vitest'
import { io, type Socket } from 'socket.io-client'
import type { AddressInfo } from 'node:net'
import { createApplication } from '../server/app'
import type { ClientEvents, ServerEvents } from '../src/types/room'

it('HTTP tạo khóa và Socket xác thực mật khẩu trước khi cho vào', async () => {
  const app = createApplication()
  let client: Socket<ServerEvents, ClientEvents> | undefined
  try {
    await new Promise<void>(resolve => app.http.listen(0, '127.0.0.1', resolve))
    const url = `http://127.0.0.1:${(app.http.address() as AddressInfo).port}`
    const response = await fetch(`${url}/api/rooms`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Khóa', password: 'password-123' }) })
    expect(response.status).toBe(201)
    const created = await response.json() as { id: string; locked: boolean }
    expect(created.locked).toBe(true)
    client = io(url, { transports: ['websocket'], reconnection: false })
    await new Promise<void>((resolve, reject) => { client!.once('connect', resolve); client!.once('connect_error', reject) })
    const wrong = await client.timeout(3000).emitWithAck('room:join', { roomId: created.id, name: 'Người chơi', password: 'sai' })
    expect(wrong.ok).toBe(false)
    const list = await (await fetch(`${url}/api/rooms`)).text()
    expect(list).not.toContain('password-123')
    expect(JSON.parse(list)[0].players).toBe(0)
    const correct = await client.timeout(3000).emitWithAck('room:join', { roomId: created.id, name: 'Người chơi', password: 'password-123' })
    expect(correct.ok).toBe(true)
    expect(JSON.stringify(correct)).not.toContain('password-123')
  } finally { client?.disconnect(); await app.close() }
})
