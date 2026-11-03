/** A voluntary ad opportunity after leaving a finished online match. */
let pendingMatch: string | null = null
const seenMatches = new Set<string>()
const listeners = new Set<() => void>()
const emit = () => { for (const notify of listeners) notify() }

export function subscribeOnlineAdOffer(listener: () => void): () => void {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}
export function getPendingOnlineAdOffer(): string | null { return pendingMatch }
export function queueOnlineAdOffer(matchId: string): boolean {
  if (!matchId || seenMatches.has(matchId)) return false
  seenMatches.add(matchId)
  pendingMatch = matchId
  emit()
  return true
}
/** Atomically consume an online match ad attempt before requesting a provider. */
export function takeOnlineAdOffer(matchId: string): boolean {
  if (!matchId || pendingMatch !== matchId) return false
  pendingMatch = null
  emit()
  return true
}
export function dismissOnlineAdOffer(matchId: string): void {
  takeOnlineAdOffer(matchId)
}

/**
 * An online player may receive one ad opportunity when exiting an
 * active or completed match. Ready rooms and spectators are excluded.
 */
export function eligibleOnlineExitAdId(
  online: boolean,
  isPlayer: boolean,
  phase: string,
  activeMatchId?: string | null,
  completedMatchId?: string | null,
): string | undefined {
  if (!online || !isPlayer) return undefined
  if (phase === 'playing') return activeMatchId || undefined
  if (phase === 'finished') return completedMatchId || undefined
  return undefined
}

/**
 * Count distinct online matches across rooms.
 * Two matches unlock one ad on the next eligible exit.
 * Extra matches never create a queue of advertisements.
 */
const accumulationStorageKey = 'hovang.onlineAds.matches.v3'

type OnlineAdAccumulation = {
  count: number
  seen: string[]
}

let accumulationCache: OnlineAdAccumulation | null = null

function readOnlineAdAccumulation(): OnlineAdAccumulation {
  if (accumulationCache) return accumulationCache

  const empty: OnlineAdAccumulation = {
    count: 0,
    seen: [],
  }

  try {
    const raw = globalThis.localStorage?.getItem(accumulationStorageKey)

    if (!raw) {
      accumulationCache = empty
      return empty
    }

    const parsed: unknown = JSON.parse(raw)

    if (!parsed || typeof parsed !== 'object') {
      accumulationCache = empty
      return empty
    }

    const data = parsed as Record<string, unknown>

    const count =
      typeof data.count === 'number' && Number.isFinite(data.count)
        ? Math.max(0, Math.min(2, Math.floor(data.count)))
        : 0

    const seen = Array.isArray(data.seen)
      ? data.seen.filter(
          (value): value is string =>
            typeof value === 'string' && value.length > 0,
        ).slice(-2000)
      : []

    accumulationCache = { count, seen }
    return accumulationCache
  } catch {
    accumulationCache = empty
    return empty
  }
}

function saveOnlineAdAccumulation(
  state: OnlineAdAccumulation,
): void {
  accumulationCache = state

  try {
    globalThis.localStorage?.setItem(
      accumulationStorageKey,
      JSON.stringify(state),
    )
  } catch {
    // Keep counting in memory if browser storage is unavailable.
  }
}

export function getAccumulatedOnlineMatchCount(): number {
  return readOnlineAdAccumulation().count
}

export function recordOnlineAdMatch(matchId: string): boolean {
  if (!matchId) return false

  const state = readOnlineAdAccumulation()

  if (state.seen.includes(matchId)) {
    return false
  }

  saveOnlineAdAccumulation({
    count: Math.min(2, state.count + 1),
    seen: [...state.seen, matchId].slice(-2000),
  })

  return true
}

export function queueAccumulatedOnlineAdOffer(
  matchId: string,
): boolean {
  if (!matchId) return false

  recordOnlineAdMatch(matchId)

  const state = readOnlineAdAccumulation()

  if (state.count < 2) {
    return false
  }

  const queued = queueOnlineAdOffer(matchId)

  if (!queued) {
    return false
  }

  // One advertisement per eligible exit; discard excess matches.
  saveOnlineAdAccumulation({
    count: 0,
    seen: state.seen,
  })

  return true
}
export type OnlineAdMatchIdentity = {
  roomId: string
  phase: string
  matchId: string
}

/**
 * Maintain one stable ID throughout a match.
 * Create a fallback when the server does not provide an ID.
 * Ready and a new room reset the current identity.
 */
export function updateOnlineAdMatchIdentity(
  previous: OnlineAdMatchIdentity | null,
  roomId: string | null,
  phase: string,
  serverMatchId: string | null | undefined,
  createId: () => string,
): OnlineAdMatchIdentity | null {
  if (!roomId || phase === 'ready') return null

  if (phase !== 'playing' && phase !== 'finished') {
    return null
  }

  const sameRoom = previous?.roomId === roomId

  const continuing =
    sameRoom &&
    previous !== null &&
    (
      previous.phase === phase ||
      (previous.phase === 'playing' && phase === 'finished')
    )

  if (continuing && previous) {
    return {
      ...previous,
      phase,
    }
  }

  return {
    roomId,
    phase,
    matchId: serverMatchId || createId(),
  }
}
