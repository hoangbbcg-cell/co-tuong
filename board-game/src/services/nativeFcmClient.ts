/** HOVANG_FCM_DIAG_V1: reports stage only, never token or credentials. */
export function reportNativeFcmStage(stage: string): void {
  if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return
  void fetch('/api/notifications/native/diagnostic', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stage }),
  }).catch(() => {})
}
import { Capacitor } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'

let started = false
let currentToken: string | null = null

/** Token remains in memory; never log it or place it in localStorage. */
export function getNativeFcmToken(): string | null {
  return currentToken
}

/**
 * Android only. No custom permission dialog.
 * The Android system controls whether its permission prompt appears.
 */
export async function startNativeFcmRegistration(): Promise<void> {
  if (!Capacitor.isNativePlatform() ||
      Capacitor.getPlatform() !== 'android' ||
      started) {
    return
  }

  started = true

  try {
    reportNativeFcmStage('startup')
    await PushNotifications.addListener('registration', token => {
      if (!token.value) return

      currentToken = token.value
      reportNativeFcmStage('token_received')

      // Do not print or expose the actual FCM token.
      console.info('[HOVANG FCM] Android registration received')
      window.dispatchEvent(new Event('hovang:native-fcm-ready'))
    })

    await PushNotifications.addListener('registrationError', () => {
      reportNativeFcmStage('registration_error')
      console.warn('[HOVANG FCM] Android registration failed')
    })

    await PushNotifications.addListener('pushNotificationReceived', () => {
      console.info('[HOVANG FCM] Notification received while active')
    })

    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      () => {
        console.info('[HOVANG FCM] Notification opened')
      }
    )

    let permission = await PushNotifications.checkPermissions()

    if (permission.receive === 'prompt') {
      permission = await PushNotifications.requestPermissions()
    }

    reportNativeFcmStage(permission.receive === 'granted' ? 'permission_granted' : 'permission_denied')
    if (permission.receive === 'granted') {
      // HOVANG_FCM_CHANNEL_V1
      // Create a high-importance channel before native FCM registration.
      try {
        reportNativeFcmStage('channel_attempt')
        await PushNotifications.createChannel({
          id: 'hovang_notifications',
          name: 'Thông báo HOVANG',
          description: 'Thông báo trận đấu, lời mời và năng lượng',
          importance: 4,
          visibility: 1,
          vibration: true,
          lights: true,
        })
        console.info('[HOVANG FCM] Notification channel ready')
        reportNativeFcmStage('channel_ready')
      } catch {
        reportNativeFcmStage('channel_failed')
        console.warn('[HOVANG FCM] Notification channel creation failed')
      }
      await PushNotifications.register()
    } else {
      console.info('[HOVANG FCM] Notification permission not granted')
    }

    // Retry registration only while Android is active and no token exists.
    // Never log the token itself.
    let retryInProgress = false
    const retryNativeFcmRegistration = async () => {
      if (currentToken || retryInProgress || document.visibilityState === 'hidden') return
      retryInProgress = true
      try {
        const nextPermission = await PushNotifications.checkPermissions()
        if (nextPermission.receive === 'granted') {
          await PushNotifications.register()
        }
      } catch {
        console.warn('[HOVANG FCM] Native registration retry failed')
      } finally {
        retryInProgress = false
      }
    }

    window.addEventListener('focus', () => { void retryNativeFcmRegistration() })
    window.addEventListener('online', () => { void retryNativeFcmRegistration() })
    setInterval(() => { void retryNativeFcmRegistration() }, 30000)
  } catch {
    started = false
    reportNativeFcmStage('initialization_error')
    console.warn('[HOVANG FCM] Native initialization failed')
  }
}