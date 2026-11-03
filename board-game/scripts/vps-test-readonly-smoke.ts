import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export async function readOnlyTestSmoke(base: string, request: typeof fetch = fetch,
  socketFactory: (url: string) => Socket = url => io(url, { transports: ['websocket'], autoConnect: false, reconnection: false, timeout: 5000 })) {
  const url = new URL(base)
  if (url.protocol !== 'http:' || url.hostname !== '127.0.0.1' || !['13301', '3001'].includes(url.port) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) throw new Error('Use the approved test SSH tunnel on 127.0.0.1:13301 or VPS loopback port 3001.')
  const get = async (path: string) => request(new URL(path, url), { signal: AbortSignal.timeout(5000), redirect: 'error' })
  const health = await get('/api/health')
  if (!health.ok || (await health.json()).status !== 'ok') throw new Error('API liveness failed.')
  const rooms = await get('/api/rooms')
  if (!rooms.ok || !Array.isArray(await rooms.json())) throw new Error('Room listing API failed.')
  const account = await get('/api/account/me')
  if (account.status !== 401) throw new Error('Unauthenticated account access was not rejected; verify database-enabled runtime.')
  const socket = socketFactory(url.origin)
  try {
    await new Promise<void>((accept, reject) => {
      const timer = setTimeout(() => reject(new Error('Socket authentication probe timed out.')), 7000)
      socket.once('connect', () => { clearTimeout(timer); reject(new Error('Unauthenticated Socket.IO connection was accepted.')) })
      socket.once('connect_error', (error: Error) => {
        clearTimeout(timer)
        // A transport error is not proof that the server auth middleware ran.
        if (error.message !== 'Cần đăng nhập.') reject(new Error('Socket.IO transport/authentication did not reach the expected rejection.'))
        else accept()
      })
      socket.connect()
    })
  } finally { socket.disconnect() }
  return { api: 'PASS', roomList: 'PASS', unauthorizedAccount: 'PASS', socketTransportAndAuthRejection: 'PASS', databaseSchemaVerified: false, authenticatedGameplayVerified: false }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 3) throw new Error('Usage: vps-test-readonly-smoke.ts http://127.0.0.1:13301')
    console.log(JSON.stringify(await readOnlyTestSmoke(process.argv[2]), null, 2))
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Read-only VPS smoke failed.')
    process.exitCode = 1
  }
}
