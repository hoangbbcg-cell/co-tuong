import { HovangLoadingOverlay } from '../components/HovangLoadingOverlay'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { notificationInviteKey } from '../services/notificationInvitePolicy'
import { subscribeHovangDevice } from '../services/notificationDeviceClient'

type Props = {
  accountId: string | number
  onResolved: () => void
}

export function NativeNotificationGate({ accountId, onResolved }: Props) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function skip() {
    try {
      localStorage.setItem(notificationInviteKey(accountId), 'later')
    } catch {
      // Storage can be unavailable; still allow entering the game.
    }
    onResolved()
  }

  async function enable() {
    if (busy) return
    setBusy(true)
    setError('')

    try {
      // Browser permission prompt must be requested from this click.
      const permission = await Notification.requestPermission()

      if (permission === 'granted') {
        if (import.meta.env.VITE_HOVANG_PUSH_REGISTRATION_ENABLED === 'true') {
          await subscribeHovangDevice()
        }
        onResolved()
        return
      }

      if (permission === 'denied') {
        onResolved()
        return
      }

      setError('Trình duyệt chưa xử lý yêu cầu. Bạn có thể thử lại hoặc bỏ qua.')
    } catch {
      setError('Không thể đăng ký thiết bị. Bạn có thể thử lại hoặc bỏ qua.')
    } finally {
      setBusy(false)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] flex items-end justify-center p-5 pb-10 pointer-events-none"
    >
      <div className="relative pointer-events-auto w-full max-w-sm rounded-xl border border-[#cfa65d] bg-[#24180f]/95 p-4 text-center text-[#ffe8ad] shadow-2xl">
        {busy && <HovangLoadingOverlay label="Đang xử lý" />}
        <p className="mb-3 text-sm">
          Cho phép HOVANG gửi thông báo khi bạn không mở game?
        </p>
        {error && (
          <p role="alert" className="mb-3 text-sm text-red-200">{error}</p>
        )}
        <button
          type="button"
          disabled={busy}
          onClick={() => void enable()}
          className="w-full rounded-lg bg-[#e4b95d] px-4 py-3 font-bold text-[#302015] disabled:opacity-60"
        >
          {busy ? 'Đang xử lý...' : 'Tiếp tục và bật thông báo'}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={skip}
          className="mt-3 w-full rounded-lg border border-[#cfa65d] px-4 py-3"
        >
          Bỏ qua
        </button>
      </div>
    </div>,
    document.body
  )
}