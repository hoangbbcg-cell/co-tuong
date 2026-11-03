import { describe, expect, it } from 'vitest'
import { validateEndpointHash, validateNotificationDevice } from '../server/services/notificationDevicePolicy'

const fixture = { endpoint: 'https://push.example.com/send/token', keys: { p256dh: 'A'.repeat(88), auth: 'B'.repeat(24) } }
describe('notification device registration validation', () => {
  it('validates and hashes a subscription deterministically', () => {
    const first = validateNotificationDevice(fixture)
    expect(first.platform).toBe('web')
    expect(first.endpointHash).toMatch(/^[a-f0-9]{64}$/)
    expect(validateNotificationDevice(fixture).endpointHash).toBe(first.endpointHash)
  })
  it('rejects non-HTTPS endpoints', () => {
    expect(() => validateNotificationDevice({ ...fixture, endpoint: 'http://push.example.com' })).toThrow()
  })
  it('rejects malformed key material', () => {
    expect(() => validateNotificationDevice({ ...fixture, keys: { p256dh: 'no', auth: 'x' } })).toThrow()
  })
  it('rejects an unsupported platform', () => {
    expect(() => validateNotificationDevice({ ...fixture, platform: 'other' })).toThrow()
  })
  it('validates endpoint hashes for revocation', () => {
    expect(validateEndpointHash('a'.repeat(64))).toBe('a'.repeat(64))
    expect(() => validateEndpointHash('oops')).toThrow()
  })
})
