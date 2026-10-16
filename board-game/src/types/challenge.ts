import type { RoomSnapshot } from './room'

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
