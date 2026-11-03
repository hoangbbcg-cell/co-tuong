import { useQuery } from '@tanstack/react-query'
import { useSessionStore } from '../../../store/sessionStore'
import { useDatabaseMessages } from './useDatabaseMessages'

export function useGroupInvitations() {
  const accountId = useSessionStore(state => state.account?.id)
  const api = useDatabaseMessages()
  return useQuery({ queryKey: ['group-invitations', accountId], queryFn: api.invitations, enabled: !!accountId, refetchInterval: 5000,
    select: invitations => [...new Map(invitations.map(invitation => [invitation.conversationId, invitation])).values()],
  })
}
