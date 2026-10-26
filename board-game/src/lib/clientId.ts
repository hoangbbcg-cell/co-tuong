let fallbackCounter = 0

/** Creates a client-side ID in secure and non-secure browser contexts. */
export function createClientId(): string {
  const cryptoApi = globalThis.crypto

  if (typeof cryptoApi?.randomUUID === 'function') {
    return cryptoApi.randomUUID()
  }

  if (typeof cryptoApi?.getRandomValues === 'function') {
    try {
      const bytes = cryptoApi.getRandomValues(new Uint8Array(16))
      bytes[6] = (bytes[6] & 0x0f) | 0x40
      bytes[8] = (bytes[8] & 0x3f) | 0x80
      const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
      return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')
    } catch {
      // Some restricted contexts may expose getRandomValues but reject the call.
    }
  }

  // These IDs are client-side correlation keys, not credentials or security tokens.
  fallbackCounter = (fallbackCounter + 1) % Number.MAX_SAFE_INTEGER
  const bytes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256))
  let timestamp = Date.now()
  let counter = fallbackCounter
  for (let index = 5; index >= 0; index--) { bytes[index] = timestamp % 256; timestamp = Math.floor(timestamp / 256) }
  for (let index = 15; index >= 10; index--) { bytes[index] = counter % 256; counter = Math.floor(counter / 256) }
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = bytes.map(byte => byte.toString(16).padStart(2, '0')).join('')
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')
}
