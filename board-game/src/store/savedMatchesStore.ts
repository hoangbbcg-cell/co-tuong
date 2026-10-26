import { create } from 'zustand'
import type { RecordedMatch } from '../types/recordedMatch'
import { accountApi } from '../services/accountApi'
import { useSessionStore } from './sessionStore'

const storageKey = 'xiangqi-saved-matches-v1'
interface SavedEntry extends RecordedMatch { owner: string }
function read(): SavedEntry[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
    return Array.isArray(value) ? value.filter((item): item is SavedEntry => !!item && typeof item === 'object' && typeof item.id === 'string' && typeof item.owner === 'string' && Array.isArray(item.states) && item.states.at(-1)?.phase === 'finished') : []
  } catch { return [] }
}
export const useSavedMatches = create<{
  replay: RecordedMatch | null
  entries: SavedEntry[]
  save: (owner: string, match: RecordedMatch) => Promise<void>
  remove: (owner: string, id: string) => Promise<void>
  update: (owner: string, id: string, title: string, note: string) => Promise<void>
}>((set, get) => ({
  replay: null,
  entries: read(),
  update: async (owner, id, title, note) => {
    if (!get().entries.some(item => item.owner === owner && item.id === id)) throw new Error('Không tìm thấy ván đã lưu.')
    if (useSessionStore.getState().account) await accountApi.updateBookmark(id, title, note)
    const entries = get().entries.map(item => item.owner === owner && item.id === id ? { ...item, savedTitle: title.trim(), savedNote: note.trim() } : item)
    if (!useSessionStore.getState().account) localStorage.setItem(storageKey, JSON.stringify(entries))
    set({ entries })
  },
  save: async (owner, match) => {
    if (match.states.at(-1)?.phase !== 'finished') throw new Error('Chỉ lưu được ván đã kết thúc.')
    if (get().entries.some(item => item.owner === owner && item.id === match.id)) return
    const entries = [...get().entries, { ...structuredClone(match), owner }]
    if(useSessionStore.getState().account){await accountApi.bookmark(match.id,true);set({entries});return}
    try { localStorage.setItem(storageKey, JSON.stringify(entries)) }
    catch { throw new Error('Bộ nhớ đã đầy. Hãy xóa bớt ván đã lưu rồi thử lại.') }
    set({ entries })
  },
  remove: async (owner, id) => {
    const entries = get().entries.filter(item => item.owner !== owner || item.id !== id)
    if(useSessionStore.getState().account){await accountApi.bookmark(id,false);set({entries});return}
    localStorage.setItem(storageKey, JSON.stringify(entries))
    set({ entries })
  },
}))
