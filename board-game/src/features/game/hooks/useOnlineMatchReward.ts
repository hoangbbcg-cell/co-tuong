import { useEffect, useState } from 'react'
import { accountApi } from '../../../services/accountApi'
import { applyAccount } from '../../../services/accountSession'
import { useSessionStore } from '../../../store/sessionStore'

/** Read committed rewards; snapshots may arrive before the result transaction commits. */
export function useOnlineMatchReward(matchId: string | undefined, enabled: boolean) {
  const userId = useSessionStore(state => state.account?.id)
  const [reward, setReward] = useState<{ matchId: string; gold: number; eloDelta: number } | null>(null)
  useEffect(() => {
    if (!enabled || !matchId || !userId) return
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const load = async () => {
      try {
        const result = await accountApi.matchReward(matchId)
        if (cancelled) return
        if (!result.settled) { timer = setTimeout(load, 1000); return }
        setReward({ matchId, gold: result.gold, eloDelta: result.eloDelta })
        const profile = await accountApi.me()
        if (!cancelled && useSessionStore.getState().account?.id === userId) applyAccount(profile)
      } catch {
        if (!cancelled) timer = setTimeout(load, 3000)
      }
    }
    void load()
    return () => { cancelled = true; clearTimeout(timer) }
  }, [matchId, enabled, userId])
  return enabled && reward?.matchId === matchId ? reward : null
}
