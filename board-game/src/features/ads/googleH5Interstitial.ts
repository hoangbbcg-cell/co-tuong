/** HOVANG H5 interstitial adapter, disabled until Google H5 approval. */
export type H5BreakStatus =
  | 'disabled'
  | 'unavailable'
  | 'busy'
  | 'requested'
  | 'error'

type PlacementInfo = { breakStatus?: string }
type AdBreak = (options: {
  type: 'next'
  name: string
  beforeAd: () => void
  afterAd: () => void
  adBreakDone: (info: PlacementInfo) => void
}) => void

export type H5AdapterEnvironment = {
  enabled: boolean
  adBreak?: AdBreak
  pauseAudio?: () => void
  resumeAudio?: () => void
}

/**
 * One request at a time. Does not promise an impression: Google decides
 * whether a placement can actually show an ad.
 * IMPORTANT: Trigger only after confirmed online match -> Home navigation.
 */
export function createGoogleH5Interstitial(env: H5AdapterEnvironment) {
  let inFlight = false
  let generation = 0

  const START_TIMEOUT_MS = 15000

  return {
    available: () =>
      env.enabled && typeof env.adBreak === 'function',

    busy: () => inFlight,

    request: (): H5BreakStatus => {
      if (!env.enabled) return 'disabled'
      if (typeof env.adBreak !== 'function') return 'unavailable'
      if (inFlight) return 'busy'

      inFlight = true
      const token = ++generation

      let started = false
      let completed = false
      let audioPaused = false
      let timer: ReturnType<typeof setTimeout> | undefined

      const current = () =>
        !completed && generation === token

      const restoreAudio = () => {
        if (!audioPaused) return
        audioPaused = false
        try {
          env.resumeAudio?.()
        } catch {
          // Audio errors must not trap the ad adapter.
        }
      }

      const complete = () => {
        if (!current()) return

        completed = true

        if (timer !== undefined) {
          clearTimeout(timer)
          timer = undefined
        }

        restoreAudio()
        inFlight = false
      }

      // Guard only the period before Google starts an ad.
      // Never interrupt a visible advertisement.
      timer = setTimeout(() => {
        if (!current() || started) return
        complete()
      }, START_TIMEOUT_MS)

      try {
        env.adBreak({
          type: 'next',
          name: 'online_match_finished_return_home',

          beforeAd: () => {
            if (!current() || started) return

            started = true

            if (timer !== undefined) {
              clearTimeout(timer)
              timer = undefined
            }

            if (env.pauseAudio) {
              try {
                env.pauseAudio()
                audioPaused = true
              } catch {
                audioPaused = false
              }
            }
          },

          afterAd: () => {
            if (!current()) return
            complete()
          },

          adBreakDone: (_info) => {
            if (!current()) return
            complete()
          },
        })

        return 'requested'
      } catch {
        complete()
        return 'error'
      }
    },
  }
}

/** Production stays disabled until Google explicitly approves H5 Games Ads. */
export const H5_GAME_ADS_ENABLED = false as boolean

/**
 * For later integration only: obtains the global Ad Placement API if present.
 * Does not insert AdSense scripts, issue ad requests, or grant rewards.
 */
export function createBrowserH5Interstitial() {
  const host = typeof window === 'undefined' ? undefined : window as Window & { adBreak?: AdBreak }
  return createGoogleH5Interstitial({ enabled: H5_GAME_ADS_ENABLED, adBreak: host?.adBreak })
}