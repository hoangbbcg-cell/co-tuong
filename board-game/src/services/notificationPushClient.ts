/** Browser capability checks only; no automatic notification permission request. */
export function supportsHovangWebPush(): boolean {
  return typeof window !== 'undefined' && window.isSecureContext &&
    'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
}

/** Call only after a deliberate user opt-in in a later UI step. */
export async function registerHovangPushWorker(): Promise<ServiceWorkerRegistration> {
  if (!supportsHovangWebPush()) throw new Error('Thiết bị hoặc kết nối không hỗ trợ Web Push')
  return navigator.serviceWorker.register('/hovang-push-sw.js', { scope: '/' })
}

export function decodeVapidPublicKey(value: string): Uint8Array<ArrayBuffer> {
  if (!/^[A-Za-z0-9_-]{87}$/.test(value)) throw new Error('VAPID public key không hợp lệ')
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/') + '='
  const raw = atob(normalized)
  if (raw.length !== 65 || raw.charCodeAt(0) !== 4) throw new Error('VAPID public key không phải P-256')
  return Uint8Array.from(raw, c => c.charCodeAt(0))
}
