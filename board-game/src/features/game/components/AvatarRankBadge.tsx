import { rankArtwork } from '../../../lib/rankArtwork'
import { DEFAULT_PLAYER_ELO, getRankProgress } from '../../../lib/rankProgression'
import { AVATA_RATIO, AVATA_TITLE_BADGE_CLASS_NAME, AVATA_TITLE_BADGE_STYLE, AVATA_RANK_STARS_STYLE, HOME_RANK_BADGE_OFFSETS, HOME_AVATA_RANK_STARS_STYLE } from './playerIdentityLayout'
import { RankStars } from './RankStars'

/** Shared Elo-derived title and earned stars; new players start at rank one. */
export function AvatarRankBadge({ elo = DEFAULT_PLAYER_ELO, previewStars, placement = 'default' }: { elo?: number; previewStars?: number; placement?: 'default' | 'home' }) {
  const rank = getRankProgress(elo)
  const artwork = rankArtwork[rank.name]
  const badgeStyle = {
    ...AVATA_TITLE_BADGE_STYLE,
    top: `${(AVATA_RATIO.titleBadge.topPx - 1 + (placement === 'home' ? HOME_RANK_BADGE_OFFSETS.titleYPx : 0)) / AVATA_RATIO.avatarDiameterPx * 100}%`,
    height: `${AVATA_RATIO.titleBadge.heightPx / AVATA_RATIO.avatarDiameterPx * 100}%`,
    objectFit: 'contain' as const,
  }
  return <>
    <img src={artwork.image} alt={`Danh hiệu ${rank.name}`} className={AVATA_TITLE_BADGE_CLASS_NAME} style={badgeStyle} />
    <span className="pointer-events-none absolute z-20 block -translate-x-1/2 [container-type:inline-size]" style={placement === 'home' ? HOME_AVATA_RANK_STARS_STYLE : AVATA_RANK_STARS_STYLE}>
      <RankStars stars={previewStars ?? rank.stars} maxStars={rank.maxStars} />
    </span>
  </>
}
