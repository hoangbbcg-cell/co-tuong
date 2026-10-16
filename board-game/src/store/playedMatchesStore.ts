import { create } from 'zustand'
import type { RecordedMatch } from '../types/recordedMatch'

interface PlayedEntry extends RecordedMatch { owner: string; isOnline: true }
const storageKey = 'xiangqi-played-matches-v1'
function expiresAt(endedAt: number) {
  const date = new Date(endedAt)
  const day = date.getDate()
  date.setDate(1)
  date.setMonth(date.getMonth() + 1)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  date.setDate(Math.min(day, lastDay))
  return date.getTime()
}
const stillFresh = (item: PlayedEntry, now = Date.now()) => Number.isFinite(item.endedAt) && expiresAt(item.endedAt) > now
function read(): PlayedEntry[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
    const items = Array.isArray(data) ? data.filter((item): item is PlayedEntry => !!item && typeof item === 'object' && item.isOnline === true && typeof item.id === 'string' && typeof item.owner === 'string' && Array.isArray(item.states) && item.states.at(-1)?.phase === 'finished' && stillFresh(item)) : []
    if (Array.isArray(data) && items.length !== data.length) localStorage.setItem(storageKey, JSON.stringify(items))
    return items
  } catch { return [] }
}
let expiryTimer: ReturnType<typeof setTimeout> | undefined
function scheduleExpiry(entries: PlayedEntry[]) {
  if (expiryTimer) clearTimeout(expiryTimer)
  const nextExpiry = Math.min(...entries.map(item => expiresAt(item.endedAt)))
  if (!Number.isFinite(nextExpiry)) return
  expiryTimer = setTimeout(() => {
    const fresh = usePlayedMatches.getState().entries.filter(item => stillFresh(item))
    try { localStorage.setItem(storageKey, JSON.stringify(fresh)) } catch { /* Keep the in-memory history usable. */ }
    usePlayedMatches.setState({ entries: fresh })
    scheduleExpiry(fresh)
  }, Math.min(Math.max(1, nextExpiry - Date.now()), 2_147_000_000))
}
export const usePlayedMatches = create<{ entries: PlayedEntry[]; record: (owner: string, match: RecordedMatch) => void }>((set, get) => ({
  entries: read(),
  record: (owner, match) => {
    if (match.states.at(-1)?.phase !== 'finished' || (owner !== match.redName && owner !== match.blackName) || !stillFresh({ ...match, owner, isOnline: true })) return
    if (get().entries.some(item => item.owner === owner && item.id === match.id)) return
    const entries = [...get().entries, { ...structuredClone(match), owner, isOnline: true as const }]
    localStorage.setItem(storageKey, JSON.stringify(entries))
    set({ entries })
    scheduleExpiry(entries)
  },
}))
scheduleExpiry(usePlayedMatches.getState().entries)
