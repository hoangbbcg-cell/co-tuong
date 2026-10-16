import type { ChallengeInvite, ChallengeProfile } from '../../src/types/challenge'

export interface PendingChallenge extends ChallengeInvite { targetId: string }
export class ChallengeRepository {
  profiles = new Map<string, ChallengeProfile>()
  invites = new Map<string, PendingChallenge>()
}
