import { useEffect, useState } from 'react'
import type { AccountProfile } from '../../../types/account'
import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'

// Reuse a successfully loaded opponent profile if the desktop card remounts.
// Keys include the signed-in account to isolate profiles between sessions.
const stableOpponentProfiles = new Map<string, AccountProfile>()
const MAX_STABLE_PROFILES = 40

type RemoteProfileState = {
  identity: string
  profile: AccountProfile
}

export function useDatabaseProfile(
  name: string,
  own: boolean,
  playerId?: string,
  stableRemote = false,
) {
  const account = useSessionStore(state => state.account)
  const accountId = account?.id
  // Refresh remote Elo when the room completes a match or
  // the server confirms new account statistics.
  const completedMatchId = useSessionStore(
    state => state.room?.lastCompletedMatch?.id,
  )
  const accountStats = useSessionStore(
    state => state.account?.stats,
  )

  const identity = accountId && !own && name
    ? `${accountId}:${playerId ? `id:${playerId}` : `name:${name}`}`
    : null

  const [loaded, setLoaded] = useState<RemoteProfileState | null>(null)

  const cached = stableRemote && identity
    ? stableOpponentProfiles.get(identity) ?? null
    : null

  useEffect(() => {
    if (!accountId || own || !name || !identity) {
      setLoaded(null)
      return
    }

    let active = true

    const saved = stableRemote
      ? stableOpponentProfiles.get(identity) ?? null
      : null

    setLoaded(saved ? { identity, profile: saved } : null)

    void (async () => {
      const id = playerId ?? (await accountApi.search(name))
        .find(user => user.name === name)?.id

      if (!id) return

      const response = await accountApi.request.get<AccountProfile>(
        `/profiles/${id}`,
      )

      if (!active) return

      const next = response.data

      if (stableRemote) {
        // Refresh the cached identity with confirmed server data.
        stableOpponentProfiles.delete(identity)
        stableOpponentProfiles.set(identity, next)

        if (stableOpponentProfiles.size > MAX_STABLE_PROFILES) {
          const oldest = stableOpponentProfiles.keys().next().value
          if (oldest !== undefined) stableOpponentProfiles.delete(oldest)
        }
      }

      setLoaded({ identity, profile: next })
    })().catch(() => {})

    return () => {
      active = false
    }
  }, [name, own, accountId, playerId, identity, stableRemote, completedMatchId, accountStats])

  if (own) return account

  // Never show a prior player's data when the seat identity changes.
  if (!identity) return null

  return loaded?.identity === identity
    ? loaded.profile
    : cached
}