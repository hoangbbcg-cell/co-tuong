import { useEffect, useState } from 'react'
import { useSessionStore } from '../../../store/sessionStore'
import { acknowledgeHomeRewards, observeRewardHonors, observeRewardProfile, pendingHomeRewards, useHomeRewards, type HomeReward } from '../../../store/homeRewardsStore'
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
  const [batch, setBatch] = useState<{ accountId: string; rewards: HomeReward[] } | null>(null)
  useEffect(() => {
    if (!account || screen !== 'home') { if (batch) setBatch(null); return }
    if (batch && batch.accountId !== account.id) { setBatch(pending.length ? { accountId: account.id, rewards: pending } : null); return }
    if ((!batch || batch.accountId !== account.id) && pending.length) setBatch({ accountId: account.id, rewards: pending })
  }, [account?.id, screen, batch, pending])
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (account && event.key === `cotuong-home-rewards-v1:${account.id}`) useHomeRewards.setState(current => ({ revision: current.revision + 1 }))
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [account?.id])
  const displayed = account && batch?.accountId === account.id ? batch.rewards : []
  const markPresented = () => { if (account) acknowledgeHomeRewards(account.id, displayed.map(reward => reward.id)) }
  return { account, pending: displayed, atHome: screen === 'home', visible: screen === 'home' && displayed.length > 0, markPresented, dismiss: () => setBatch(null) }
}
