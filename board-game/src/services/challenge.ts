import { connect, socket } from './socket'
import { useSessionStore } from '../store/sessionStore'
import { useGameStore } from '../store/gameStore'
import type { ChallengeProfile } from '../types/challenge'

export function challengeProfile(): ChallengeProfile {
  const state = useSessionStore.getState()
  return { name: state.name, avatarIndex: state.avatarIndex, avatarFrameIndex: state.avatarFrameIndex,
    elo: state.elo, localBusy: state.screen === 'game' && state.mode === 'local' && useGameStore.getState().game.phase === 'playing' }
}
export async function publishChallengePresence() {
  await connect()
  const reply = await socket.timeout(8000).emitWithAck('presence:update', challengeProfile())
  if (!reply.ok) throw new Error(reply.error)
}
export async function sendChallenge(name: string, id?: string) {
  // Machine opponents cannot receive an online request.
  if (name.startsWith('Máy') || name.startsWith('Pikafish') || name.startsWith('Ông Hoàng')) {
    throw new Error('Không thể gửi lời mời So tài đến người máy.')
  }
  await publishChallengePresence()
  const reply = await socket.timeout(8000).emitWithAck('challenge:send', { name, id })
  if (!reply.ok) throw new Error(reply.error)
}
export async function replyChallenge(id: string, accepted: boolean) {
  await publishChallengePresence()
  const reply = await socket.timeout(8000).emitWithAck('challenge:reply', { id, accepted })
  if (!reply.ok) throw new Error(reply.error)
}
