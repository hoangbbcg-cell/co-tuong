import { createHash } from 'node:crypto'

export interface NotificationDeviceInput {
  endpoint: string
  keys: { p256dh: string; auth: string }
  platform?: 'web' | 'android' | 'ios'
}

export interface ValidatedNotificationDevice {
  endpoint: string
  endpointHash: string
  p256dh: string
  auth: string
  platform: 'web' | 'android' | 'ios'
}

const base64url = /^[A-Za-z0-9_-]+={0,2}$/

export function validateNotificationDevice(input: unknown): ValidatedNotificationDevice {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid push subscription.')
  const record = input as Record<string, unknown>
  const keys = record.keys
  if (!keys || typeof keys !== 'object' || Array.isArray(keys)) throw new Error('Missing push keys.')
  const keyData = keys as Record<string, unknown>
  const endpoint = record.endpoint
  const p256dh = keyData.p256dh
  const auth = keyData.auth
  const platform = record.platform ?? 'web'
  if (typeof endpoint !== 'string' || endpoint.length > 2048) throw new Error('Invalid push endpoint.')
  let url: URL
  try { url = new URL(endpoint) } catch { throw new Error('Invalid push endpoint.') }
  if (url.protocol !== 'https:' || !url.hostname || url.username || url.password || url.hash) throw new Error('Push endpoint must be HTTPS.')
  if (typeof p256dh !== 'string' || p256dh.length < 40 || p256dh.length > 512 || !base64url.test(p256dh)) throw new Error('Invalid p256dh.')
  if (typeof auth !== 'string' || auth.length < 16 || auth.length > 256 || !base64url.test(auth)) throw new Error('Invalid auth.')
  if (platform !== 'web' && platform !== 'android' && platform !== 'ios') throw new Error('Invalid platform.')
  return {
    endpoint, endpointHash: createHash('sha256').update(endpoint).digest('hex'), p256dh, auth,
    platform,
  }
}

export function validateEndpointHash(value: unknown): string {
  if (typeof value !== 'string' || !/^[0-9a-f]{64}$/.test(value)) throw new Error('Invalid device hash.')
  return value
}
