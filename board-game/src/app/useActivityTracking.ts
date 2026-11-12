import { useEffect } from 'react'
import { useSessionStore } from '../store/sessionStore'
import { generateUUID } from '../lib/generateUUID'
import type { ActivityInput } from '../types/activity'

/** Only fixed, recognized control labels are emitted, never arbitrary DOM text. */
export const ACTIVITY_CONTROLS: Record<string, string> = {
  'Chơi nhanh': 'quick_play', 'Chơi Nhanh': 'quick_play', 'Cờ Tướng': 'quick_play', 'Cờ Úp': 'hidden_play',
  'Mở hồ sơ người chơi': 'profile', 'Thông tin': 'profile', 'Hồ sơ': 'profile',
  'Bạn bè': 'friends', 'Xếp hạng': 'rankings', 'Thành tích': 'rankings',
  'Lịch sử': 'history', 'Tin nhắn': 'messages', 'Danh hiệu': 'honors',
  'Âm thanh': 'sound', 'Cài đặt âm thanh': 'sound',
  'Bỏ AI': 'ai_controls',
  'Sẵn sàng': 'ready', 'Xếp hàng': 'queue', 'Thoát hàng': 'unqueue', 'Xuống bàn': 'stand_up',
  'Lưu ván đấu': 'save_match', 'Lưu thế cờ': 'save_match', 'Chụp ảnh': 'screenshot',
  'Toàn màn hình': 'fullscreen', 'Phóng to': 'fullscreen', 'Đánh thử': 'trial',
  'Gợi ý': 'hint', 'Phân tích': 'analyze', 'Đấu ngay': 'start', 'Tạo bàn': 'create_room',
  'Thêm năng lượng': 'energy', 'Thêm vàng': 'gold',
}

export function useActivityTracking() {
  const accountId = useSessionStore(state => state.account?.id)
  useEffect(() => {
    if (!accountId) return
    let queue: ActivityInput[] = []
    let timer: ReturnType<typeof setTimeout> | undefined
    let stopped = false
    const recent = new Map<string, number>()
    const flush = () => {
      clearTimeout(timer); timer = undefined
      if (!queue.length || stopped || useSessionStore.getState().account?.id !== accountId) return
      const events = queue.splice(0, 20)
      // Best effort, no persistence or retry across accounts. Never block gameplay.
      void fetch('/api/account/activity', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events }), keepalive: true,
      }).catch(() => undefined)
      if (queue.length) timer = setTimeout(flush, 1000)
    }
    const emit = (kind: ActivityInput['kind'], code: string) => {
      const key = `${kind}:${code}`, now = Date.now()
      if (now - (recent.get(key) ?? 0) < 500) return
      recent.set(key, now)
      if (queue.length < 100) queue.push({ id: generateUUID(), kind, code })
      timer ??= setTimeout(flush, 1000)
    }
    let previousPage = '', previousGame = ''
    const observeSession = () => {
      const state = useSessionStore.getState()
      if (state.account?.id !== accountId) return
      if (state.screen !== previousPage) {
        previousPage = state.screen
        emit('page', state.screen)
      }
      const game = state.screen === 'game' ? `${state.mode}:${state.computerEngine}:${state.room?.id ?? ''}` : ''
      if (game && game !== previousGame) emit('feature', state.mode === 'online' ? 'online_game' : state.mode === 'computer' ? 'computer_game' : 'local_game')
      previousGame = game
    }
    observeSession()
    const unsubscribe = useSessionStore.subscribe(observeSession)
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const control = event.target.closest('button,[role="button"]')
      if (!control || control.matches(':disabled,[aria-disabled="true"]')) return
      // Cờ Tướng/Cờ Úp tabs also exist in dialogs: record quick play only at Home.
      const label = (control.getAttribute('aria-label') || control.getAttribute('title') || control.textContent || '').trim().replace(/\s+/g, ' ')
      const code = ACTIVITY_CONTROLS[label]
      if (code && (!['quick_play', 'hidden_play'].includes(code) || useSessionStore.getState().screen === 'home')) emit('feature', code)
    }
    const dialogs = new MutationObserver(records => {
      for (const record of records) {
        const element = record.target
        if (element instanceof HTMLDialogElement && element.open) {
          const label = element.getAttribute('aria-label') ?? ''
          const code = ACTIVITY_CONTROLS[label]
          if (code) emit('feature', code)
        }
      }
    })
    dialogs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] })
    const hide = () => { if (document.visibilityState === 'hidden') flush() }
    document.addEventListener('click', click, true)
    document.addEventListener('visibilitychange', hide)
    window.addEventListener('pagehide', flush)
    return () => {
      flush(); stopped = true; clearTimeout(timer); queue = []
      unsubscribe(); dialogs.disconnect()
      document.removeEventListener('click', click, true)
      document.removeEventListener('visibilitychange', hide)
      window.removeEventListener('pagehide', flush)
    }
  }, [accountId])
}
