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

export const RANK_TITLE_OFFSET_YPX = -3

export const AVATA_TITLE_BADGE_STYLE = {
  top: `${(AVATA_RATIO.titleBadge.topPx + RANK_TITLE_OFFSET_YPX) / AVATA_RATIO.avatarDiameterPx * 100}%`,
  left: `${(0.5 + AVATA_RATIO.titleBadge.centerOffsetXPx / AVATA_RATIO.avatarDiameterPx) * 100}%`,
  width: `${AVATA_RATIO.titleBadge.widthPx / AVATA_RATIO.avatarDiameterPx * 100}%`,
  height: 'auto',
} as const

/** Shared reference approved from Home on 2026-10-05; update every consumer together. */
export const RANK_STAR_LAYOUT = {
  offsetXPx: 3,
  bottomInsetPx: 14,
  clusterOffsetYPx: -6,
  starWidthCqw: 25,
  gapCqw: 1.5,
} as const

/** Star position relative to the title frame, independent of the avatar size. */
export const RANK_TITLE_STARS_STYLE = {
  left: `${(0.5 + RANK_STAR_LAYOUT.offsetXPx / AVATA_RATIO.titleBadge.widthPx) * 100}%`,
  width: '100%',
  top: `${(AVATA_RATIO.titleBadge.heightPx - RANK_STAR_LAYOUT.bottomInsetPx + RANK_STAR_LAYOUT.clusterOffsetYPx - RANK_TITLE_OFFSET_YPX) / AVATA_RATIO.titleBadge.heightPx * 100}%`,
} as const

/** Only the earned-star row moves; Tân Binh keeps its approved position. */
export function getRankTitleStarsStyle(rankLevel: number) {
  if (rankLevel === 1) return RANK_TITLE_STARS_STYLE
  return { ...RANK_TITLE_STARS_STYLE, top: `calc(${RANK_TITLE_STARS_STYLE.top} + 1px)` }
}
