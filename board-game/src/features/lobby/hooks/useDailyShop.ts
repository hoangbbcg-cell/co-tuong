import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'

export function useDailyShop() {
  const accountId = useSessionStore(state => state.account?.id)
  const query = useQuery({ queryKey: ['daily-shop', accountId], queryFn: accountApi.dailyShop, enabled: !!accountId, staleTime: 0, refetchInterval: 30000, refetchOnWindowFocus: 'always' })
  const { refetch, data } = query
  useEffect(() => {
    if (!data) return
    const delay = data.refreshAt - Date.now()
    if (delay <= 0) return
    const timer = window.setTimeout(() => { void refetch() }, delay + 50)
    return () => window.clearTimeout(timer)
  }, [data, refetch])
  return query
}
