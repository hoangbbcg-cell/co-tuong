import { describe, expect, it } from 'vitest'
import { decodeVapidPublicKey, supportsHovangWebPush } from '../src/services/notificationPushClient'
import { generateKeyPairSync } from 'node:crypto'

describe('HOVANG push client safety', () => {
  it('does not claim push support in Node', () => { expect(supportsHovangWebPush()).toBe(false) })
  it('rejects empty key', () => { expect(() => decodeVapidPublicKey('')).toThrow() })
  it('rejects invalid point marker', () => { expect(() => decodeVapidPublicKey(Buffer.alloc(65).toString('base64url'))).toThrow() })
  it('decodes a generated P256 VAPID public point', () => {
    const { publicKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' })
    const jwk = publicKey.export({ format: 'jwk' })
    const key = Buffer.concat([Buffer.from([4]), Buffer.from(jwk.x!, 'base64url'), Buffer.from(jwk.y!, 'base64url')]).toString('base64url')
    expect(decodeVapidPublicKey(key)).toHaveLength(65)
  })
})
