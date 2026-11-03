import { expect, it } from 'vitest'
import { allowSocketEvent } from '../server/services/socketRateLimiter'

it('shares one 20-per-second limit across event groups', () => {
  const socket = {}

  // Simulate interleaved Room, Challenge and Lobby events.
  for (let i = 0; i < 20; i++) {
    expect(allowSocketEvent(socket, 1000)).toBe(true)
  }

  expect(allowSocketEvent(socket, 1000)).toBe(false)
  expect(allowSocketEvent(socket, 1999)).toBe(false)
  expect(allowSocketEvent(socket, 2000)).toBe(true)
})

it('isolates counters between sockets', () => {
  const a = {}
  const b = {}

  for (let i = 0; i < 20; i++) {
    expect(allowSocketEvent(a, 1000)).toBe(true)
  }

  expect(allowSocketEvent(a, 1000)).toBe(false)
  expect(allowSocketEvent(b, 1000)).toBe(true)
})
