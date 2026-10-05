/** Approved Home reference, measured relative to its 106px portrait anchor.
 * Includes the former 1.2 badge scale and 4px upward shift in the measurements.
 * Keep all placements proportional when the portrait size changes.
 */
export const AVATA_RATIO = {
  avatarDiameterPx: 106,
  titleBadge: {
    topPx: 87.876613,
    centerOffsetXPx: -3.532003,
    widthPx: 132.746801,
    heightPx: 53.085332,
  },
} as const

export const AVATA_TITLE_BADGE_STYLE = {
  top: `${AVATA_RATIO.titleBadge.topPx / AVATA_RATIO.avatarDiameterPx * 100}%`,
  left: `${(0.5 + AVATA_RATIO.titleBadge.centerOffsetXPx / AVATA_RATIO.avatarDiameterPx) * 100}%`,
  width: `${AVATA_RATIO.titleBadge.widthPx / AVATA_RATIO.avatarDiameterPx * 100}%`,
  height: 'auto',
} as const

export const AVATA_TITLE_BADGE_CLASS_NAME = 'pointer-events-none absolute z-20 max-w-none -translate-x-1/2 drop-shadow-[0_2px_2px_#281307aa]'

/** Locked by the user on 2026-10-05. Keep these coordinates until explicitly unlocked. */
export const RANK_STAR_LAYOUT = {
  offsetXPx: 3,
  bottomInsetPx: 14,
  clusterOffsetYPx: -1,
  starWidthCqw: 25,
  gapCqw: 1.5,
} as const

export const AVATA_RANK_STARS_STYLE = {
  left: `${(0.5 + (AVATA_RATIO.titleBadge.centerOffsetXPx + RANK_STAR_LAYOUT.offsetXPx) / AVATA_RATIO.avatarDiameterPx) * 100}%`,
  width: AVATA_TITLE_BADGE_STYLE.width,
  top: `${(AVATA_RATIO.titleBadge.topPx + AVATA_RATIO.titleBadge.heightPx - RANK_STAR_LAYOUT.bottomInsetPx + RANK_STAR_LAYOUT.clusterOffsetYPx) / AVATA_RATIO.avatarDiameterPx * 100}%`,
} as const

/** Home adjustment approved and relocked on 2026-10-05. */
export const HOME_RANK_BADGE_OFFSETS = {
  titleYPx: -2,
  starsYPx: -7,
} as const

export const HOME_AVATA_RANK_STARS_STYLE = {
  ...AVATA_RANK_STARS_STYLE,
  top: `${(AVATA_RATIO.titleBadge.topPx + AVATA_RATIO.titleBadge.heightPx - RANK_STAR_LAYOUT.bottomInsetPx + RANK_STAR_LAYOUT.clusterOffsetYPx + HOME_RANK_BADGE_OFFSETS.starsYPx) / AVATA_RATIO.avatarDiameterPx * 100}%`,
} as const
