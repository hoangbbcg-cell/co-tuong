import { useEffect, useState } from 'react'
import { useSessionStore } from '../../../store/sessionStore'
import { isExistingFriend, hasInitialIncomingFriendRequest } from '../components/FriendsDialog'

export function useMessageFriendship(name: string) {
  const override = useSessionStore(state => state.friendshipOverrides[name])
  const pending = useSessionStore(state => state.pendingFriendRequests[name] ?? false)
  const setPending = useSessionStore(state => state.setFriendRequestPending)
  const setFriendship = useSessionStore(state => state.setFriendship)
  const incomingOverride = useSessionStore(state => state.incomingFriendRequestOverrides[name])
  const setIncoming = useSessionStore(state => state.setIncomingFriendRequest)
  const mutedUntil = useSessionStore(state => state.friendRemovalConfirmationMutedUntil)
  const setMutedUntil = useSessionStore(state => state.setFriendRemovalConfirmationMutedUntil)
  const isFriend = override ?? isExistingFriend(name)
  const incoming = !isFriend && (incomingOverride ?? hasInitialIncomingFriendRequest(name))
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
      setFriendship(name, false)
      return
    }
    if (mutedUntil !== null) setMutedUntil(null)
    setSkipConfirmation(false)
    setRemovalName(name)
  }
  const activate = () => {
    if (isFriend) requestRemoval()
    else if (incoming) { setIncoming(name, false); setPending(name, false); setFriendship(name, true) }
    else setPending(name, !pending)
  }
  const confirmRemoval = () => {
    if (!removalName) return
    if (skipConfirmation) setMutedUntil(Date.now() + 10 * 60_000)
    setFriendship(removalName, false)
    cancelRemoval()
  }
  return { isFriend, pending, incoming, activate, requestRemoval, removalName, skipConfirmation, setSkipConfirmation, cancelRemoval, confirmRemoval }
}
