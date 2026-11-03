/**
 * HOVANG rewarded advertising foundation.
 *
 * Completing an advertisement is NOT proof of a reward.
 * Only a future server-side verified fulfillment flow may
 * grant energy or any other account resource.
 */

export type RewardedAdResult =
  | { status: 'unavailable' }
  | { status: 'busy' }
  | { status: 'cancelled' }
  | { status: 'completed' }
  | { status: 'error' }

/** Requested creative length; the real network must support this placement. */
export const ENERGY_REWARDED_AD_PLACEMENT = {
  placementId: 'energy_watch_ad',
  requestedDurationSeconds: 30,
} as const

export type RewardedAdPlacement = typeof ENERGY_REWARDED_AD_PLACEMENT

export interface RewardedAdProvider {
  show(placement: RewardedAdPlacement): Promise<'completed' | 'cancelled'>
}

export interface RewardedAdController {
  available(): boolean
  busy(): boolean
  show(): Promise<RewardedAdResult>
}

/**
 * Provider is intentionally null until an approved
 * advertising integration is installed.
 */
export function createRewardedAdController(
  provider: RewardedAdProvider | null = null,
): RewardedAdController {
  let showing = false

  return {
    available: () => provider !== null,
    busy: () => showing,

    async show(): Promise<RewardedAdResult> {
      if (!provider) {
        return { status: 'unavailable' }
      }

      if (showing) {
        return { status: 'busy' }
      }

      showing = true

      try {
        const result = await provider.show(ENERGY_REWARDED_AD_PLACEMENT)

        if (result === 'completed') {
          return { status: 'completed' }
        }

        return { status: 'cancelled' }
      } catch {
        return { status: 'error' }
      } finally {
        showing = false
      }
    },
  }
}

export const rewardedAds = createRewardedAdController()