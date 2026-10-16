import { afterEach, describe, expect, it, vi } from 'vitest'
import { createClientId } from '../src/lib/clientId'

afterEach(() => vi.unstubAllGlobals())

describe('createClientId', () => {
  it('uses crypto.randomUUID when available', () => {
    const randomUUID = vi.fn(() => 'native-uuid')
    vi.stubGlobal('crypto', { randomUUID, getRandomValues: vi.fn() })

    expect(createClientId()).toBe('native-uuid')
    expect(randomUUID).toHaveBeenCalledOnce()
  })

  it('uses cryptographically random UUID-shaped IDs without randomUUID', () => {
    let sequence = 0
    const getRandomValues = vi.fn((bytes: Uint8Array) => {
      bytes.fill(++sequence)
      return bytes
    })
    vi.stubGlobal('crypto', { getRandomValues })

    const first = createClientId()
    const second = createClientId()

    expect(first).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    expect(second).not.toBe(first)
    expect(getRandomValues).toHaveBeenCalledTimes(2)
  })

  it('keeps IDs distinct if Web Crypto random methods are unavailable', () => {
    vi.stubGlobal('crypto', {})
    vi.spyOn(Date, 'now').mockReturnValue(1234)
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    const first = createClientId()
    const second = createClientId()

    expect(first).not.toBe(second)
    expect(first).toMatch(/^client-/)
  })
})
