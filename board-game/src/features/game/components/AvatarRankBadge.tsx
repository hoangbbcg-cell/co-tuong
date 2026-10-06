import { DEFAULT_PLAYER_ELO } from '../../../lib/rankProgression'
import { AVATA_RATIO, AVATA_TITLE_BADGE_STYLE } from './playerIdentityLayout'
import { RankTitleBadge } from './RankTitleBadge'

/** Shared Elo-derived title and earned stars; new players start at rank one. */
export function AvatarRankBadge({ elo = DEFAULT_PLAYER_ELO, previewStars }: { elo?: number; previewStars?: number }) {
  const badgeStyle = {
    ...AVATA_TITLE_BADGE_STYLE,
    height: `${AVATA_RATIO.titleBadge.heightPx / AVATA_RATIO.avatarDiameterPx * 100}%`,
  }
  return <span className="pointer-events-none absolute z-20 block max-w-none -translate-x-1/2" style={badgeStyle}>
    <RankTitleBadge elo={elo} previewStars={previewStars} />
  </span>
}
