import { expect, it } from 'vitest'
import { googleOriginError } from '../src/lib/googleOrigin'

it.each(['http://192.168.1.12:5173', 'https://192.168.1.12', 'http://10.0.0.4:3001'])('explains why Google rejects the LAN IP origin %s', origin => {
  expect(googleOriginError(new URL(origin))).toContain('IP LAN')
})
it.each(['http://localhost:5173', 'http://127.0.0.1:3001', 'http://[::1]:5173', 'https://game.example.com'])('allows supported origins to continue Google initialization: %s', origin => {
  expect(googleOriginError(new URL(origin))).toBe('')
})
it('requires HTTPS on a domain', () => {
  expect(googleOriginError(new URL('http://game.example.com'))).toContain('HTTPS')
})
