import { create } from 'zustand'
import type { RecordedMatch } from '../types/recordedMatch'

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
  save: (owner: string, match: RecordedMatch) => void
  remove: (owner: string, id: string) => void
}>((set, get) => ({
  replay: null,
  entries: read(),
  save: (owner, match) => {
    if (match.states.at(-1)?.phase !== 'finished') throw new Error('Chỉ lưu được ván đã kết thúc.')
    if (get().entries.some(item => item.owner === owner && item.id === match.id)) return
    const entries = [...get().entries, { ...structuredClone(match), owner }]
    try { localStorage.setItem(storageKey, JSON.stringify(entries)) }
    catch { throw new Error('Bộ nhớ đã đầy. Hãy xóa bớt ván đã lưu rồi thử lại.') }
    set({ entries })
  },
  remove: (owner, id) => {
    const entries = get().entries.filter(item => item.owner !== owner || item.id !== id)
    localStorage.setItem(storageKey, JSON.stringify(entries))
    set({ entries })
  },
}))
