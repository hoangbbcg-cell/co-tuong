import { useEffect } from 'react'
import { useSessionStore } from '../../../store/sessionStore'
import { observeRewardHonors, observeRewardProfile, pendingHomeRewards, useHomeRewards } from '../../../store/homeRewardsStore'
import { accountApi } from '../../../services/accountApi'

export function useHomeRewardNotifications() {
  const account = useSessionStore(state => state.account)
  const screen = useSessionStore(state => state.screen)
  useHomeRewards(state => state.revision)
  useEffect(() => {
    if (account) observeRewardProfile(account, screen === 'game' || screen === 'replay')
  }, [account, screen])
  useEffect(() => {
    if (!account) return
    const id = account.id
    let cancelled = false, pending = false
    const load = async () => {
      if (pending) return
      pending = true
      try {
        const { data } = await accountApi.request.get<{ code: string }[]>('/honors')
        if (!cancelled && useSessionStore.getState().account?.id === id) observeRewardHonors(id, data.map(honor => honor.code))
      } catch { /* Failed polling must not mark unseen honors as received. */ }
      finally { pending = false }
    }
    void load()
    const refresh = () => { if (document.visibilityState !== 'hidden') void load() }; const timer = setInterval(refresh, 5000); const onVisible = () => { if (document.visibilityState === 'visible') void load() }; document.addEventListener('visibilitychange', onVisible)
    return () => { cancelled = true; clearInterval(timer); document.removeEventListener('visibilitychange', onVisible) }
  }, [account?.id])
  const pending = account ? pendingHomeRewards(account.id) : []
  return { account, pending, atHome: screen === 'home', visible: screen === 'home' && pending.length > 0 }
}
