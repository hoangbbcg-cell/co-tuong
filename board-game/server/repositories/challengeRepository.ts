import type { ChallengeInvite, ChallengeProfile } from '../../src/types/challenge'

export interface PendingChallenge extends ChallengeInvite { targetId: string }
export class ChallengeRepository {
  profiles = new Map<string, ChallengeProfile>()
  invites = new Map<string, PendingChallenge>()
  identities = new Map<string, string>()
  sendCooldowns = new Map<string, number>()
  // Receiver connection owns these blocks; sender uses authenticated account identity.
  blocks = new Map<string, Map<string, number>>()
}
