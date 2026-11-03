import { create } from 'zustand'
import { createClientId } from '../lib/clientId'
import type { AccountProfile } from '../types/account'

export type HomeReward = { id: string; kind: 'avatar' | 'frame' | 'honor' | 'gold' | 'elo'; code: string; amount?: string }
type Seen = { cosmetics?: string[]; honors?: string[]; honorReceiptsInitialized?: boolean; rewardNoticeVersion?: number; gold?: string; stats?: AccountProfile['stats']; pending: HomeReward[] }
const cache = new Map<string, Seen>()
const storageKey = (id: string) => `cotuong-home-rewards-v1:${id}`
function read(id: string): Seen {
  if (cache.has(id)) return cache.get(id)!
  let state: Seen = { pending: [], rewardNoticeVersion: 2 }
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey(id)) || 'null') as Seen | null
    if (parsed && Array.isArray(parsed.pending)) {
      state = parsed
      if (state.rewardNoticeVersion !== 2) {
        // Migrate old notification receipts once, without changing ownership.
        state.pending = []
        state.rewardNoticeVersion = 2
        localStorage.setItem(storageKey(id), JSON.stringify(state))
      }
    }
  } catch { /* Keep receipt tracking in memory when browser storage is unavailable. */ }
  cache.set(id, state)
  return state
}
function persist(id: string, state: Seen) {
  cache.set(id, state)
  try { localStorage.setItem(storageKey(id), JSON.stringify(state)) } catch { /* Session state still works. */ }
  useHomeRewards.setState(current => ({ revision: current.revision + 1 }))
}
function item(kind: HomeReward['kind'], code: string, amount?: string): HomeReward {
  return { id: createClientId(), kind, code, ...(amount ? { amount } : {}) }
}
export const useHomeRewards = create<{ revision: number }>(() => ({ revision: 0 }))

/** Observe server-owned values; this never grants items, Elo or currency. */
export function observeRewardProfile(profile: AccountProfile, inGame: boolean) {
  const state = read(profile.id)
  const cosmetics = (profile.cosmetics || []).filter(c => c.kind === 'avatar' || c.kind === 'frame').map(c => `${c.kind}:${c.code}`)
  if (state.cosmetics) {
    for (const code of cosmetics.filter(code => !state.cosmetics!.includes(code))) {
      const [kind, value] = code.split(':')
      state.pending.push(item(kind as 'avatar' | 'frame', value))
    }
  }
  // Balance changes alone do not prove a reward grant.
  void inGame
  state.cosmetics = [...new Set([...(state.cosmetics || []), ...cosmetics])]
  state.gold = profile.gold
  state.stats = profile.stats
  persist(profile.id, state)
}

export function observeRewardHonors(id: string, codes: string[]) {
  const state = read(id)
  const owned = new Set(codes)

  // Remove receipts for honors that are no longer owned.
  state.pending = state.pending.filter(reward => reward.kind !== 'honor' || owned.has(reward.code))

  // First server sync establishes the baseline. Legacy device caches may be
  // stale, so never treat previously unseen server-owned honors as new here.
  if (!state.honorReceiptsInitialized) {
    state.honors = [...owned]
    state.honorReceiptsInitialized = true
    persist(id, state)
    return
  }

  const previous = new Set(state.honors ?? owned)
  const queued = new Set(state.pending.filter(reward => reward.kind === 'honor').map(reward => reward.code))

  for (const code of owned) {
    if (!previous.has(code) && !queued.has(code)) {
      state.pending.push(item('honor', code))
    }
  }

  state.honors = [...owned]
  persist(id, state)
}
export const pendingHomeRewards = (id: string) =>
  read(id).pending.filter(reward =>
    reward.kind === 'honor' ||
    reward.kind === 'avatar' ||
    reward.kind === 'frame'
  )
export function acknowledgeHomeRewards(id: string, ids: string[]) {
  const state = read(id)
  state.pending = state.pending.filter(reward => !ids.includes(reward.id))
  persist(id, state)
}
