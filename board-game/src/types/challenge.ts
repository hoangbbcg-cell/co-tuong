import type { RoomSnapshot } from './room'
export const CHALLENGE_BLOCKED_MESSAGE = 'Đã bị chặn'
export const CHALLENGE_SEND_COOLDOWN_MS = 5000

export interface ChallengeProfile {
  name: string
  avatarIndex: number
  avatarFrameIndex: number
  elo: number
  localBusy: boolean
}
export interface ChallengeInvite { id: string; senderId: string; sender: ChallengeProfile; expiresAt: number }
export interface ChallengeResult { id: string; message: string }
export interface ChallengeAccepted { room: RoomSnapshot }
