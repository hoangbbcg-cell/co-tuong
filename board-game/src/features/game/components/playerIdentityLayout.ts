/** “Tỷ lệ avata”: measured from the supplied avatar-and-title reference; preserve these ratios when resizing. */
export const AVATA_RATIO = {
  avatarDiameterPx: 166,
  titleBadge: {
    topPx: 156,
    centerOffsetXPx: 3,
    widthPx: 174,
    heightPx: 48,
  },
} as const

export const AVATA_TITLE_BADGE_STYLE = {
  top: `${AVATA_RATIO.titleBadge.topPx / AVATA_RATIO.avatarDiameterPx * 100}%`,
  left: `${(0.5 + AVATA_RATIO.titleBadge.centerOffsetXPx / AVATA_RATIO.avatarDiameterPx) * 100}%`,
  width: `${AVATA_RATIO.titleBadge.widthPx / AVATA_RATIO.avatarDiameterPx * 100}%`,
  height: `${AVATA_RATIO.titleBadge.heightPx / AVATA_RATIO.avatarDiameterPx * 100}%`,
} as const

// Home's badge is anchored to the bare avatar, while ProfileDialog anchors it
// inside a 5px-bordered 128px button. Map Home to the same visible geometry.
const profileAvatarDiameterPx = 128
const profileAvatarBorderPx = 5
const profileBadgeAnchorPx = profileAvatarDiameterPx - profileAvatarBorderPx * 2

export const HOME_AVATA_TITLE_BADGE_STYLE = {
  top: `${(profileAvatarBorderPx + AVATA_RATIO.titleBadge.topPx / AVATA_RATIO.avatarDiameterPx * profileBadgeAnchorPx) / profileAvatarDiameterPx * 100}%`,
  left: `${(profileAvatarBorderPx + (0.5 + AVATA_RATIO.titleBadge.centerOffsetXPx / AVATA_RATIO.avatarDiameterPx) * profileBadgeAnchorPx) / profileAvatarDiameterPx * 100}%`,
  width: `${(AVATA_RATIO.titleBadge.widthPx / AVATA_RATIO.avatarDiameterPx * profileBadgeAnchorPx) / profileAvatarDiameterPx * 100}%`,
  height: `${(AVATA_RATIO.titleBadge.heightPx / AVATA_RATIO.avatarDiameterPx * profileBadgeAnchorPx) / profileAvatarDiameterPx * 100}%`,
} as const
