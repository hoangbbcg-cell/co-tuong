import { describe, expect, it } from 'vitest'
import { validateNativeFcmToken } from '../server/services/nativeFcmPolicy'

describe('native FCM input', () => {
  it('accepts reasonable FCM tokens with stable SHA-256 identity', () => {
    const value = 'AAAAbbbbCCCCddddEEEEffffGGGGhhhhIIIIjjjj:some_token-1234'
    expect(validateNativeFcmToken(value).hash).toMatch(/^[0-9a-f]{64}$/)
    expect(validateNativeFcmToken(value).hash).toBe(validateNativeFcmToken(value).hash)
  })
  it('rejects empty, malformed and oversized input', () => {
    for (const value of ['', 'secret', 'bad token!', 'a'.repeat(4097), null, {}]) {
      expect(() => validateNativeFcmToken(value)).toThrow()
    }
  })
})
