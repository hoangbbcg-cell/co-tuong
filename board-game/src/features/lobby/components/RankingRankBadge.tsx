import { CrispUiImage } from '../../../lib/CrispUiImage'
import { rankArtwork } from '../../../lib/rankArtwork'
import { getRankProgress } from '../../../lib/rankProgression'
import { AVATA_RATIO, getRankTitleStarsStyle, RANK_TITLE_OFFSET_YPX } from '../../game/components/playerIdentityLayout'
import { RankStars } from '../../game/components/RankStars'

/** Same reference coordinates as Home, rasterized directly at final CSS pixels. */
export function RankingRankBadge({ elo, scale }: { elo: number; scale: number }) {
  const rank = getRankProgress(elo)
  const factor = 84 * scale / AVATA_RATIO.avatarDiameterPx
  const width = Math.round(AVATA_RATIO.titleBadge.widthPx * factor)
  const height = Math.round(AVATA_RATIO.titleBadge.heightPx * factor)
  return <span className="pointer-events-none absolute z-20 block" style={{
    width, height,
    top: Math.round((AVATA_RATIO.titleBadge.topPx + RANK_TITLE_OFFSET_YPX) * factor),
    left: Math.round((AVATA_RATIO.avatarDiameterPx / 2 + AVATA_RATIO.titleBadge.centerOffsetXPx - AVATA_RATIO.titleBadge.widthPx / 2) * factor),
  }}>
    <CrispUiImage src={rankArtwork[rank.name].image} alt={`Danh hiệu ${rank.name}`} width={width} height={height} className="block object-contain" style={{ width, height }} />
    <span className="absolute z-20 block -translate-x-1/2 [container-type:inline-size]" style={getRankTitleStarsStyle(rank.level)}>
      <RankStars stars={rank.stars} maxStars={rank.maxStars} />
    </span>
  </span>
}
