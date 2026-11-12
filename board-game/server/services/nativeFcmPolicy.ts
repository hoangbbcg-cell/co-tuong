import { createHash } from 'node:crypto'

export function validateNativeFcmToken(value: unknown): { token: string; hash: string } {
  if (typeof value !== 'string' || value.length < 32 || value.length > 4096 || !/^[A-Za-z0-9:_-]+$/.test(value)) {
    throw new Error('Invalid native FCM token')
  }
  return { token: value, hash: createHash('sha256').update(value).digest('hex') }
}
