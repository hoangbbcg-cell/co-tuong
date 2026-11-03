import { expect, it, vi } from 'vitest'
import type { Socket } from 'socket.io-client'
import { readOnlyTestSmoke } from '../scripts/vps-test-readonly-smoke'

function mocks(message = 'Cần đăng nhập.', connect = false) {
  const handlers = new Map<string, (...args: unknown[]) => void>()
  const socket = { once: vi.fn((event: string, callback: (...args: unknown[]) => void) => handlers.set(event, callback)),
    connect: vi.fn(() => handlers.get(connect ? 'connect' : 'connect_error')?.(new Error(message))), disconnect: vi.fn() }
  const request = vi.fn(async (input: URL | RequestInfo) => {
    const path = new URL(String(input)).pathname
    return new Response(JSON.stringify(path === '/api/health' ? { status: 'ok' } : path === '/api/rooms' ? [] : {}), { status: path === '/api/account/me' ? 401 : 200 })
  })
  return { socket, request, factory: () => socket as unknown as Socket }
}
it('checks API and authenticated socket middleware without creating users or sending game commands', async () => {
  const m = mocks()
  expect(await readOnlyTestSmoke('http://127.0.0.1:13301', m.request, m.factory)).toMatchObject({ api: 'PASS', databaseSchemaVerified: false, authenticatedGameplayVerified: false })
  expect(m.socket.disconnect).toHaveBeenCalledOnce()
  expect(m.request.mock.calls.map(([url]) => new URL(String(url)).pathname)).toEqual(['/api/health', '/api/rooms', '/api/account/me'])
})
it('does not mistake a broken transport or accepted unauthenticated connection for auth success', async () => {
  for (const m of [mocks('websocket error'), mocks('', true)]) {
    await expect(readOnlyTestSmoke('http://127.0.0.1:3001', m.request, m.factory)).rejects.toThrow()
    expect(m.socket.disconnect).toHaveBeenCalledOnce()
  }
})
it('refuses direct production/external URLs before any request', async () => {
  const m = mocks()
  await expect(readOnlyTestSmoke('https://hovanggame.com', m.request, m.factory)).rejects.toThrow('test SSH tunnel')
  expect(m.request).not.toHaveBeenCalled()
})
