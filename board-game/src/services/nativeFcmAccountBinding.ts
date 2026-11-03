import { Capacitor } from '@capacitor/core'
import { useSessionStore } from '../store/sessionStore'
import { getNativeFcmToken, reportNativeFcmStage } from './nativeFcmClient'

let enabled = false
let lastBinding: string | null = null
let pending = false

async function reconcile(): Promise<void> {
  if (pending) return
  const token = getNativeFcmToken()
  const id = useSessionStore.getState().account?.id
  if (!token || !id) { lastBinding = null; return }
  const identity = `${String(id)}:${token}`
  if (identity === lastBinding) return
  pending = true
  try {
    reportNativeFcmStage('binding_attempt')
    const response = await fetch('/api/notifications/native/token', {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    reportNativeFcmStage(
      response.ok ? 'binding_ok' :
      response.status === 401 ? 'binding_401' :
      response.status === 403 ? 'binding_403' :
      response.status === 503 ? 'binding_503' : 'binding_other'
    )
    if (response.ok && String(useSessionStore.getState().account?.id) === String(id)) {
      lastBinding = identity
    }
  } catch { reportNativeFcmStage('binding_network_error') }
  finally { pending = false }
}

export function startNativeFcmAccountBinding(): void {
  if (enabled || !Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return
  enabled = true
  window.addEventListener('hovang:native-fcm-ready', () => { void reconcile() })
  useSessionStore.subscribe((_state, previous) => {
    if (_state.account?.id !== previous.account?.id) {
      lastBinding = null
      void reconcile()
    }
  })
  // A token can arrive before the account, or while the API is unavailable.
  // Retry only while the application is active; successful bindings are deduplicated.
  const hovangFcmRetryTimer = setInterval(() => {
    if (document.visibilityState !== 'hidden') void reconcile()
  }, 30000)
  window.addEventListener('focus', () => { void reconcile() })
  window.addEventListener('online', () => { void reconcile() })
  window.addEventListener('pagehide', () => {
    clearInterval(hovangFcmRetryTimer)
  }, { once: true })
  void reconcile()
}

export async function unregisterNativeFcmBeforeLogout(): Promise<void> {
  if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return
  const token = getNativeFcmToken()
  if (!token) return
  const response = await fetch('/api/notifications/native/token', {
    method: 'DELETE', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
  if (!response.ok && response.status !== 404) throw new Error('Could not unlink Android push device')
  lastBinding = null
}
