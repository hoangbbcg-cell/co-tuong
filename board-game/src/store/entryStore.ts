import { create } from 'zustand'
import { createGuestName, ENTRY_STORAGE_KEY, readGuestEntry } from '../lib/guestIdentity'
import type { GuestEntry } from '../lib/guestIdentity'
import { useSessionStore } from './sessionStore'
export { ENTRY_STORAGE_KEY, readGuestEntry } from '../lib/guestIdentity'

/** Browser entry preference only; never use this as server authentication. */
export const useEntryStore = create<{
  entry: GuestEntry | null
  enterGuest: () => void
  signOut: () => void
}>((set, get) => ({
  entry: (() => { const entry = readGuestEntry(); return entry?.signedOut ? null : entry })(),
  enterGuest: () => {
    const previous = get().entry ?? readGuestEntry()
    const entry: GuestEntry = { version: 1, provider: 'guest', name: previous?.name ?? createGuestName() }
    localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify(entry))
    useSessionStore.getState().setName(entry.name)
    set({ entry })
  },
  signOut: () => {
    const entry = get().entry
    if (entry) localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify({ ...entry, signedOut: true }))
    set({ entry: null })
  },
}))
