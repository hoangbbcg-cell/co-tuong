import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'
import type { Side } from '../../../types/game'
const pendingLikes = new Map<string, Promise<void>>()
export async function saveMatchLike(matchId: string, actorId: string, targetSide: Side) {
  const state = useSessionStore.getState()
  if (state.matchLikeRecords.some(record => record.matchId === matchId && record.actorId === actorId)) return
  const key = JSON.stringify([matchId, state.account?.id ?? actorId])
  const pending = pendingLikes.get(key)
  if (pending) return pending
  const save = async () => {
    if (state.account && !matchId.startsWith('local:')) await accountApi.request.put(`/match-likes/${matchId}`, { side: targetSide, enabled: true })
    useSessionStore.getState().recordMatchLike({ matchId, actorId, targetSide })
  }
  const request = save()
  pendingLikes.set(key, request)
  try { await request } finally { pendingLikes.delete(key) }
}
