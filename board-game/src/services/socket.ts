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
    const onError = () => { cleanup(); reject(new Error('Không kết nối được máy chủ phòng.')) }
    const timer = setTimeout(onError, 8000)
    socket.once('connect', onConnect)
    socket.once('connect_error', onError)
    socket.connect()
  })
}
export const roomSocket = {
  async join(roomId: string, name: string, password?: string, asViewer = false): Promise<RoomSnapshot> {
    await connect()
    let reply: Reply<RoomSnapshot>
    try { reply = await socket.timeout(8000).emitWithAck('room:join', { roomId, name, password, asViewer }) }
    catch (error) { socket.disconnect(); socket.connect(); throw error }
    return unwrap(reply)
  },
  async command(command: RoomCommand) {
    if (!socket.connected) throw new Error('Đã mất kết nối phòng.')
    return unwrap<RoomSnapshot>(await socket.timeout(8000).emitWithAck('game:command', command))
  },
  async chat(text: string) {
    if (!socket.connected) throw new Error('Đã mất kết nối phòng.')
    return unwrap<RoomSnapshot>(await socket.timeout(8000).emitWithAck('chat:send', text))
  },
  async leave() {
    // Keep presence connected outside rooms to receive challenges.
    try { if (socket.connected) unwrap(await socket.timeout(3000).emitWithAck('room:leave')) }
    catch (error) { socket.disconnect(); socket.connect(); throw error }
  },
}
