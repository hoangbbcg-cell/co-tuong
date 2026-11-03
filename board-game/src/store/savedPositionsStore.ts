import { create } from 'zustand'
import type { GameState } from '../types/game'
import { accountApi } from '../services/accountApi'
import { useSessionStore } from './sessionStore'

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
  save: (position: SavedPosition) => Promise<void>
  remove: (owner: string, id: string) => Promise<void>
  update: (owner: string, id: string, title: string, note: string) => Promise<void>
}>((set, get) => ({
  entries: read(),
  update: async (owner, id, title, note) => {
    const entries = get().entries.map(item => item.owner === owner && item.id === id ? { ...item, title: title.trim() || item.title, note: note.trim() } : item)
    if(useSessionStore.getState().account){const item=entries.find(p=>p.id===id&&p.owner===owner);if(item)await accountApi.savePosition(item);set({entries});return}
    localStorage.setItem(key, JSON.stringify(entries))
    set({ entries })
  },
  save: async position => {
    const entries = [...get().entries, structuredClone(position)]
    if(useSessionStore.getState().account){await accountApi.savePosition(position);set({entries});return}
    localStorage.setItem(key, JSON.stringify(entries))
    set({ entries })
  },
  remove: async (owner, id) => {
    const entries = get().entries.filter(item => item.owner !== owner || item.id !== id)
    if(useSessionStore.getState().account){await accountApi.removePosition(id);set({entries});return}
    localStorage.setItem(key, JSON.stringify(entries))
    set({ entries })
  },
}))
