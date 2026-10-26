import { create } from 'zustand'
import { CHALLENGE_SEND_COOLDOWN_MS } from '../types/challenge'

export const useChallengeCooldownStore = create<{ until: number; start: () => boolean }>((set, get) => ({
  until: 0,
  start: () => {
    const now = Date.now()
    if (get().until > now) return false
    const until = now + CHALLENGE_SEND_COOLDOWN_MS
    set({ until })
    setTimeout(() => { if (get().until === until) set({ until: 0 }) }, CHALLENGE_SEND_COOLDOWN_MS)
    return true
  },
}))
