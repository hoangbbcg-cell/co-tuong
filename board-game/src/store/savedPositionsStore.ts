import { create } from 'zustand'
import type { GameState } from '../types/game'

export interface SavedPosition {
  id: string
  owner: string
  savedAt: number
  title: string
  redName: string
  blackName: string
  moveNumber: number
  note: string
  boardState: GameState
  sourceMatchId?: string
}
const key = 'xiangqi-saved-positions-v1'
function read(): SavedPosition[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]')
    return Array.isArray(value) ? value.filter((item): item is SavedPosition => !!item && typeof item === 'object' && typeof item.id === 'string' && typeof item.owner === 'string' && Array.isArray(item.boardState?.board)) : []
  } catch { return [] }
}
export const useSavedPositions = create<{
  entries: SavedPosition[]
  save: (position: SavedPosition) => void
  remove: (owner: string, id: string) => void
  update: (owner: string, id: string, title: string, note: string) => void
}>((set, get) => ({
  entries: read(),
  update: (owner, id, title, note) => {
    const entries = get().entries.map(item => item.owner === owner && item.id === id ? { ...item, title: title.trim() || item.title, note: note.trim() } : item)
    localStorage.setItem(key, JSON.stringify(entries))
    set({ entries })
  },
  save: position => {
    const entries = [...get().entries, structuredClone(position)]
    localStorage.setItem(key, JSON.stringify(entries))
    set({ entries })
  },
  remove: (owner, id) => {
    const entries = get().entries.filter(item => item.owner !== owner || item.id !== id)
    localStorage.setItem(key, JSON.stringify(entries))
    set({ entries })
  },
}))
