import { DEFAULT_PLAYER_ELO } from '../../../lib/rankProgression'
import { AVATA_RATIO, AVATA_TITLE_BADGE_STYLE } from './playerIdentityLayout'
import { RankTitleBadge } from './RankTitleBadge'

/** Shared Elo-derived title and earned stars; new players start at rank one. */
export function AvatarRankBadge({ elo = DEFAULT_PLAYER_ELO, previewStars, computer = false }: { elo?: number; previewStars?: number; computer?: boolean }) {
  const badgeStyle = {
    ...AVATA_TITLE_BADGE_STYLE,
    height: `${AVATA_RATIO.titleBadge.heightPx / AVATA_RATIO.avatarDiameterPx * 100}%`,
  }
  return <span
    className="absolute z-20 block max-w-none -translate-x-1/2"
    style={badgeStyle}
    title=""
    aria-label="Danh hiệu"
    onContextMenu={event => {
      event.preventDefault()
      event.stopPropagation()
    }}
  >
    <RankTitleBadge elo={elo} previewStars={previewStars} computer={computer} />
  </span>
}
