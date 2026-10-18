import { useEffect, useState } from 'react'
import { useSessionStore } from '../../../store/sessionStore'
import { isExistingFriend, hasInitialIncomingFriendRequest } from '../components/FriendsDialog'
import { socialActionByName,useSocialStore } from '../../../store/socialStore'

export function useMessageFriendship(name: string) {
  const account=useSessionStore(s=>s.account)
  const relation=useSocialStore(s=>s.friends.find(f=>f.name===name))
  const legacyOverride = useSessionStore(state => state.friendshipOverrides[name])
  const override=account?relation?.status==='accepted':legacyOverride
  const legacyPending = useSessionStore(state => state.pendingFriendRequests[name] ?? false)
  const pending=account?relation?.status==='pending'&&relation.requestedBy===account.id:legacyPending
  const setPending = useSessionStore(state => state.setFriendRequestPending)
  const setFriendship = useSessionStore(state => state.setFriendship)
  const incomingOverride = useSessionStore(state => state.incomingFriendRequestOverrides[name])
  const setIncoming = useSessionStore(state => state.setIncomingFriendRequest)
  const mutedUntil = useSessionStore(state => state.friendRemovalConfirmationMutedUntil)
  const setMutedUntil = useSessionStore(state => state.setFriendRemovalConfirmationMutedUntil)
  const isFriend = override ?? isExistingFriend(name)
  const incoming = account?relation?.status==='pending'&&relation.requestedBy!==account.id:!isFriend && (incomingOverride ?? hasInitialIncomingFriendRequest(name))
  const [removalName, setRemovalName] = useState<string | null>(null)
  const [skipConfirmation, setSkipConfirmation] = useState(false)

  useEffect(() => {
    if (isFriend && pending) setPending(name, false)
  }, [isFriend, pending, name, setPending])

  const cancelRemoval = () => {
    setRemovalName(null)
    setSkipConfirmation(false)
  }
  const requestRemoval = () => {
    if (isFriend && (mutedUntil ?? 0) > Date.now()) {
      if(useSessionStore.getState().account){void socialActionByName(name,'remove').catch(error=>useSessionStore.getState().setNotice(String(error)));return}
      setFriendship(name, false)
      return
    }
    if (mutedUntil !== null) setMutedUntil(null)
    setSkipConfirmation(false)
    setRemovalName(name)
  }
  const activate = () => {
    if(useSessionStore.getState().account){if(isFriend)requestRemoval();else void socialActionByName(name,incoming?'accept':pending?'remove':'request').catch(error=>useSessionStore.getState().setNotice(String(error)));return}
    if (isFriend) requestRemoval()
    else if (incoming) { setIncoming(name, false); setPending(name, false); setFriendship(name, true) }
    else setPending(name, !pending)
  }
  const confirmRemoval = () => {
    if (!removalName) return
    if(useSessionStore.getState().account){void socialActionByName(removalName,'remove').then(cancelRemoval).catch(error=>useSessionStore.getState().setNotice(String(error)));return}
    if (skipConfirmation) setMutedUntil(Date.now() + 10 * 60_000)
    setFriendship(removalName, false)
    cancelRemoval()
  }
  return { isFriend, pending, incoming, activate, requestRemoval, removalName, skipConfirmation, setSkipConfirmation, cancelRemoval, confirmRemoval }
}
