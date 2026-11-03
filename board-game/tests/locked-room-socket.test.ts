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

it('bàn khóa trống mật khẩu: chỉ chủ điều khiển, báo thoát hàng và tách socket bị đuổi khỏi phòng', async () => {
  const app = createApplication()
  const clients: Socket<ServerEvents, ClientEvents>[] = []
  try {
    await new Promise<void>(resolve => app.http.listen(0, '127.0.0.1', resolve))
    const url = `http://127.0.0.1:${(app.http.address() as AddressInfo).port}`
    const response = await fetch(`${url}/api/rooms`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Bàn riêng', password: '' }) })
    const created = await response.json() as { id: string; passwordRequired: boolean }
    expect(created.passwordRequired).toBe(false)
    for (const name of ['Chủ bàn', 'Người chơi', 'Người xem']) {
      const client: Socket<ServerEvents, ClientEvents> = io(url, { transports: ['websocket'], reconnection: false })
      clients.push(client)
      await new Promise<void>((resolve, reject) => { client.once('connect', resolve); client.once('connect_error', reject) })
      expect((await client.timeout(3000).emitWithAck('room:join', { roomId: created.id, name })).ok).toBe(true)
    }
    const [owner, player, viewer] = clients
    expect((await player.timeout(3000).emitWithAck('game:command', { type: 'room-settings', queueBlocked: true, chatBlocked: true })).ok).toBe(false)
    await viewer.timeout(3000).emitWithAck('game:command', { type: 'join-queue' })
    const notice = new Promise<string>(resolve => viewer.once('room:notice', resolve))
    expect((await owner.timeout(3000).emitWithAck('game:command', { type: 'room-settings', queueBlocked: true, chatBlocked: true })).ok).toBe(true)
    expect(await notice).toBe('Đã thoát hàng')
    const chat = await player.timeout(3000).emitWithAck('chat:send', 'Xin chào')
    expect(chat).toEqual({ ok: false, error: 'Đã chặn chat' })
    expect((await owner.timeout(3000).emitWithAck('chat:send', 'Chủ bàn nhắn')).ok).toBe(true)
    const removed = new Promise<string>(resolve => viewer.once('room:removed', resolve))
    expect((await owner.timeout(3000).emitWithAck('game:command', { type: 'moderate', targetId: viewer.id!, action: 'kick' })).ok).toBe(true)
    expect(await removed).toBe(created.id)
    expect(app.io.sockets.sockets.get(viewer.id!)?.rooms.has(created.id)).toBe(false)
    expect((await viewer.timeout(3000).emitWithAck('chat:send', 'Không được gửi')).ok).toBe(false)
  } finally { clients.forEach(client => client.disconnect()); await app.close() }
})
