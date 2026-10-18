import { useQuery } from '@tanstack/react-query'
import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'
import { getComputerAvatar } from '../../../lib/computerAvatar'
import { AccountAvatar } from './AccountAvatar'

/** Resolve shared account artwork once per sender, independently of message count. */
export function MessageAccountAvatar({ name, className = 'size-full' }: { name: string; className?: string }) {
  const account = useSessionStore(state => state.account)
  const machine = getComputerAvatar(name)
  const own = account?.displayName === name ? account : undefined
  const { data } = useQuery({
    queryKey: ['message-avatar', name],
    queryFn: async () => (await accountApi.search(name)).find(user => user.name === name) ?? null,
    enabled: !!account && !!name && !own && !machine,
    staleTime: 30_000,
  })
  const profile = own ?? data
  return <span className={`relative block shrink-0 ${className}`}>
    {machine ? <img src={machine} alt="" className="block size-full object-contain" /> : <AccountAvatar avatarCode={profile?.avatarCode} avatarFrameCode={profile?.avatarFrameCode} />}
  </span>
}
