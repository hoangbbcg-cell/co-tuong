import { HovangLoadingOverlay } from '../components/HovangLoadingOverlay'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSessionStore } from '../store/sessionStore'
import { registerHovangPushWorker, supportsHovangWebPush } from '../services/notificationPushClient'
import { subscribeHovangDevice } from '../services/notificationDeviceClient'
import { notificationInviteKey, shouldOfferNotificationInvite } from '../services/notificationInvitePolicy'

/** Optional permission invitation, NOT a push subscription or delivery confirmation. */
export function NotificationPermissionInvite({
  loadingGate = false,
  onResolved,
}: {
  loadingGate?: boolean
  onResolved?: () => void
}) {
  const accountId = useSessionStore(state => state.account?.id)
  const screen = useSessionStore(state => state.screen)
  const [dismissed, setDismissed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('unsupported')

  useEffect(() => {
    setError('')
    setBusy(false)
    setDismissed(!accountId || (() => {
      try { return localStorage.getItem(notificationInviteKey(accountId)) === 'later' }
      catch { return false }
    })())
    setPermission(supportsHovangWebPush() ? Notification.permission : 'unsupported')
  }, [accountId])

  if (!shouldOfferNotificationInvite({
    authenticated: accountId != null,
    onHome: loadingGate || screen === 'home',
    supported: permission !== 'unsupported',
    permission: loadingGate && import.meta.env.VITE_HOVANG_PUSH_REGISTRATION_ENABLED === 'true' && permission === 'granted' ? 'default' : permission,
    previouslyDismissed: dismissed,
  })) return null

  function later() {
    if (accountId == null) return
    try { localStorage.setItem(notificationInviteKey(accountId), 'later') } catch { /* Optional preference */ }
    setDismissed(true)
    onResolved?.()
  }

  async function enable() {
    if (busy || accountId == null || !supportsHovangWebPush()) return
    setBusy(true)
    setError('')
    try {
      // Must be requested from this explicit click, not from an effect or login.
      const outcome = await Notification.requestPermission()
      setPermission(outcome)
      if (outcome === 'granted') {
        if (import.meta.env.VITE_HOVANG_PUSH_REGISTRATION_ENABLED === 'true') {
          await subscribeHovangDevice()
          try { localStorage.setItem(`hovang-notification-registered-v1:${accountId}`, 'yes') }
          catch { /* Registration is stored server-side even if localStorage is unavailable */ }
        } else {
          // Safe foundation mode until QA is complete and the backend API is enabled.
          await registerHovangPushWorker()
        }
        // This step registers only the worker. A future step will subscribe
        // the browser and connect it to the authenticated backend.
        setDismissed(true)
        onResolved?.()
      } else if (outcome === 'denied') {
        setDismissed(true)
        onResolved?.()
      } else {
        setError('Chưa có quyền thông báo. Hãy thử lại hoặc chọn Để sau.')
      }
    } catch {
      setError('Chưa thể chuẩn bị thông báo trên thiết bị này. Bạn có thể thử lại sau.')
    } finally { setBusy(false) }
  }

  return createPortal(<div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/60 p-4" role="presentation">
    <section role="dialog" aria-modal="true" aria-labelledby="hovang-notify-title" aria-describedby="hovang-notify-desc" className="relative w-full max-w-md rounded-2xl border-2 border-[#d8ac35] bg-[#30271e] p-5 text-[#ffe9a8] shadow-2xl sm:p-7">
      {busy && <HovangLoadingOverlay label="Đang xử lý" />}
      <h2 id="hovang-notify-title" className="text-center text-2xl font-bold">🔔 Bật thông báo HOVANG?</h2>
      <p id="hovang-notify-desc" className="mt-3 text-center text-base leading-relaxed">Nhận lời nhắc đấu cờ, thông báo năng lượng đầy, sự kiện và bảo trì ngay cả khi không mở game.</p>
      <p className="mt-2 text-center text-xs text-[#e2c98f]">Bạn có thể chọn Để sau. Khi bật, HOVANG sẽ đăng ký thiết bị này để nhận thông báo.</p>
      {error && <p role="alert" className="mt-3 text-center text-sm text-red-200">{error}</p>}
      <div className="mt-5 flex gap-3">
        <button type="button" disabled={busy} onClick={later} className="min-h-12 flex-1 rounded-lg border border-[#d8ac35] px-3 font-semibold disabled:opacity-60">Để sau</button>
        <button type="button" disabled={busy} onClick={() => void enable()} className="min-h-12 flex-1 rounded-lg bg-[#d8ac35] px-3 font-bold text-[#30271e] disabled:opacity-60">{busy ? 'Đang xử lý...' : 'Bật thông báo'}</button>
      </div>
    </section>
  </div>, document.body)
}
