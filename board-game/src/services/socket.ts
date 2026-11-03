import { generateUUID } from '../lib/generateUUID'
import { io, type Socket } from 'socket.io-client'
import type { ClientEvents, Reply, RoomCommand, RoomSnapshot, ServerEvents } from '../types/room'

export const socket: Socket<ServerEvents, ClientEvents> = io({ autoConnect: false })
function unwrap<T>(reply: Reply<T>): T {
  if (!reply.ok) throw new Error(reply.error)
  return reply.data
}
export async function connect() {
  if (socket.connected) return
  await new Promise<void>((resolve, reject) => {
    const cleanup = () => { clearTimeout(timer); socket.off('connect', onConnect); socket.off('connect_error', onError) }
    const onConnect = () => { cleanup(); resolve() }
    const onError = () => { /* keep waiting while Socket.IO retries */ }
    const timer = setTimeout(() => { cleanup(); reject(new Error('Không kết nối được máy chủ phòng.')) }, 8000)
    socket.once('connect', onConnect)
    socket.on('connect_error', onError)
    if (!socket.active) socket.connect()
  })
}
export const roomSocket = {
  async join(roomId: string, name: string, password?: string, asViewer = false): Promise<RoomSnapshot> {
    await connect()
    let reply: Reply<RoomSnapshot>
    try { reply = await socket.timeout(8000).emitWithAck('room:join', { roomId, name, password, asViewer }) }
    catch (error) { throw error }
    return unwrap(reply)
  },
  async command(command: RoomCommand) {
    const request = { ...command, commandId: command.commandId ?? generateUUID() }
    let reply: Reply<RoomSnapshot>
    try { await connect(); reply = await socket.timeout(8000).emitWithAck('game:command', request) }
    catch { await connect(); await roomSocket.resume(); reply = await socket.timeout(8000).emitWithAck('game:command', request) }
    return unwrap(reply)
  },
  async resume(): Promise<RoomSnapshot | null> {
    if (!socket.connected) return null
    return unwrap<RoomSnapshot | null>(await socket.timeout(8000).emitWithAck('room:resume'))
  },
  async chat(text: string) {
    if (!socket.connected) throw new Error('Đã mất kết nối phòng.')
    return unwrap<RoomSnapshot>(await socket.timeout(8000).emitWithAck('chat:send', text))
  },
  async leave() {
    // Keep presence connected outside rooms to receive challenges.
    try { if (socket.connected) unwrap(await socket.timeout(3000).emitWithAck('room:leave')) }
    catch (error) { throw error }
  },
}

