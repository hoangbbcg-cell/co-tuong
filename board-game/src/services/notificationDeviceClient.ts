import { decodeVapidPublicKey, registerHovangPushWorker, supportsHovangWebPush } from './notificationPushClient'

export type HovangSubscriptionPayload = {
  endpoint: string
  keys: { p256dh: string; auth: string }
  platform: 'web'
}

/** JSON from the browser, never a user-selected account ID. */
export function pushSubscriptionPayload(subscription: PushSubscription): HovangSubscriptionPayload {
  const data = subscription.toJSON()
  if (!data.endpoint || !data.keys?.p256dh || !data.keys?.auth) {
    throw new Error('Thiết bị chưa cung cấp đủ thông tin Push.')
  }
  return { endpoint: data.endpoint, keys: { p256dh: data.keys.p256dh, auth: data.keys.auth }, platform: 'web' }
}

/** Must only run from the user's explicit enable action, after notification permission is granted. */
export async function subscribeHovangDevice(): Promise<void> {
  if (!supportsHovangWebPush() || Notification.permission !== 'granted') {
    throw new Error('Thiết bị chưa cấp quyền nhận thông báo.')
  }
  if (import.meta.env.VITE_HOVANG_PUSH_REGISTRATION_ENABLED !== 'true') {
    throw new Error('Đăng ký thông báo chưa được hệ thống kích hoạt.')
  }
  const publicKey = import.meta.env.VITE_HOVANG_VAPID_PUBLIC_KEY
  if (typeof publicKey !== 'string' || !publicKey) {
    throw new Error('Thiếu khóa công khai VAPID.')
  }
  const registration = await registerHovangPushWorker()
  let subscription = await registration.pushManager.getSubscription()
  let isNew = false
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: decodeVapidPublicKey(publicKey),
    })
    isNew = true
  }
  try {
    const response = await fetch('/api/notifications/subscriptions', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pushSubscriptionPayload(subscription)),
    })
    if (!response.ok) throw new Error(`Không thể lưu đăng ký thông báo (HTTP ${response.status}).`)
  } catch (error) {
    // A newly created orphan subscription should not be mistaken for a registered device.
    if (isNew) await subscription.unsubscribe().catch(() => false)
    throw error
  }
}
