import { create } from 'zustand'
import type { RecordedMatch } from '../types/recordedMatch'
import { accountApi } from '../services/accountApi'
import { invalidateAccountHistory } from '../services/accountSession'
import { useSessionStore } from './sessionStore'
import { recordedMatchStarted } from '../lib/recordedMatchStarted'

const storageKey = 'xiangqi-saved-matches-v1'
interface SavedEntry extends RecordedMatch { owner: string; serverAccountId?: string }
function read(): SavedEntry[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
    return Array.isArray(value) ? value.filter((item): item is SavedEntry => !!item && typeof item === 'object' && typeof item.id === 'string' && typeof item.owner === 'string' && Array.isArray(item.states) && recordedMatchStarted(item)) : []
  } catch { return [] }
}
export const useSavedMatches = create<{
  replay: RecordedMatch | null
  entries: SavedEntry[]
  save: (owner: string, match: RecordedMatch, serverOnline?: boolean) => Promise<void>
  remove: (owner: string, id: string) => Promise<void>
  update: (owner: string, id: string, title: string, note: string) => Promise<void>
}>((set, get) => ({
  replay: null,
  entries: read(),
  update: async (owner, id, title, note) => {
    const item = get().entries.find(entry => entry.owner === owner && entry.id === id)
    if (!item) throw new Error('Không tìm thấy ván đã lưu.')
    if (item.serverAccountId) {
      if (String(useSessionStore.getState().account?.id ?? '') !== item.serverAccountId) {
        throw new Error('Tài khoản đã thay đổi.')
      }
      await accountApi.updateBookmark(id, title, note)
      invalidateAccountHistory('saved')
    } else {
      const local = get().entries.map(entry => entry.owner === owner && entry.id === id
        ? { ...entry, savedTitle: title.trim(), savedNote: note.trim() } : entry)
        .filter(entry => !entry.serverAccountId)
      localStorage.setItem(storageKey, JSON.stringify(local))
    }
    set({ entries: get().entries.map(entry => entry.owner === owner && entry.id === id
      ? { ...entry, savedTitle: title.trim(), savedNote: note.trim() } : entry) })
  },
  save: async (owner, match, serverOnline = false) => {
    if (!recordedMatchStarted(match)) throw new Error('Chỉ lưu được ván đã bắt đầu.')
    if (get().entries.some(item => item.owner === owner && item.id === match.id)) return
    const accountId = useSessionStore.getState().account?.id
    const isServerMatch = serverOnline && accountId != null &&
      Boolean(match.id)
    if (isServerMatch) {
      await accountApi.bookmark(match.id, true)
      invalidateAccountHistory('saved')
      if (String(useSessionStore.getState().account?.id ?? '') !== String(accountId)) return
      set({ entries: [...get().entries, {
        ...structuredClone(match), savedAt: Date.now(), owner,
        serverAccountId: String(accountId)
      }] })
      return
    }
    const entries = [...get().entries, { ...structuredClone(match), savedAt: Date.now(), owner }]
    try {
      localStorage.setItem(storageKey, JSON.stringify(entries.filter(entry => !entry.serverAccountId)))
    } catch {
      throw new Error('Bộ nhớ đã đầy. Hãy xóa bớt ván đã lưu rồi thử lại.')
    }
    set({ entries })
  },
  remove: async (owner, id) => {
    const item = get().entries.find(entry => entry.owner === owner && entry.id === id)
    if (!item) return

    if (item.serverAccountId) {
      const accountId = String(useSessionStore.getState().account?.id ?? '')
      if (accountId !== item.serverAccountId) {
        throw new Error('Tài khoản đã thay đổi.')
      }

      await accountApi.bookmark(id, false)
      invalidateAccountHistory('saved')

      if (String(useSessionStore.getState().account?.id ?? '') !== accountId) return

      // Server deletion succeeded. Update the UI even when local storage
      // contains an old duplicate.
      set({ entries: get().entries.filter(entry =>
        entry.owner !== owner || entry.id !== id) })

      try {
        const raw = localStorage.getItem(storageKey)
        if (raw) {
          const stored: unknown = JSON.parse(raw)
          if (Array.isArray(stored)) {
            const remaining = stored.filter(entry =>
              !entry || typeof entry !== 'object' ||
              entry.owner !== owner || entry.id !== id)
            if (remaining.length !== stored.length) {
              localStorage.setItem(storageKey, JSON.stringify(remaining))
            }
          }
        }
      } catch (error) {
        console.warn('Saved match server deletion succeeded; local cleanup failed:', error)
      }
      return
    }

    // Local/AI/offline/legacy-local matches must not depend on server API.
    // Preserve the original test contract: write [] when the list is empty.
    const local = get().entries.filter(entry =>
      !entry.serverAccountId && (entry.owner !== owner || entry.id !== id))

    localStorage.setItem(storageKey, JSON.stringify(local))

    set({ entries: get().entries.filter(entry =>
      entry.owner !== owner || entry.id !== id) })
  },
}))
