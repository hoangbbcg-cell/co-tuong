import { CrispUiImage } from '../../../lib/CrispUiImage'
import { rankArtwork } from '../../../lib/rankArtwork'
import { getRankProgress } from '../../../lib/rankProgression'
import { AVATA_RATIO, getRankTitleStarsStyle, RANK_STAR_LAYOUT, RANK_TITLE_OFFSET_YPX } from '../../game/components/playerIdentityLayout'
import { RankStars } from '../../game/components/RankStars'
import { useId } from 'react'

/** Same reference coordinates as Home, rasterized directly at final CSS pixels. */
export function RankingRankBadge({ elo, scale, compact = true }: { elo: number; scale: number; compact?: boolean }) {
  const sharpId = useId()
  const rank = getRankProgress(elo)
  const factor = 84 * scale / AVATA_RATIO.avatarDiameterPx
  const width = Math.round(AVATA_RATIO.titleBadge.widthPx * factor)
  const height = Math.round(AVATA_RATIO.titleBadge.heightPx * factor)
  const starsStyle = getRankTitleStarsStyle(rank.level)
  const desktopStarsStyle = {
    width,
    left: Math.round(RANK_STAR_LAYOUT.offsetXPx / AVATA_RATIO.titleBadge.widthPx * width),
    top: Math.round((AVATA_RATIO.titleBadge.heightPx - RANK_STAR_LAYOUT.bottomInsetPx + RANK_STAR_LAYOUT.clusterOffsetYPx - RANK_TITLE_OFFSET_YPX) / AVATA_RATIO.titleBadge.heightPx * height + (rank.level > 1 ? 1 : 0)),
    filter: `url(#${sharpId}) contrast(1.12)`,
  }
  return <span className="pointer-events-none absolute z-20 block" style={{
    width, height,
    top: Math.round((AVATA_RATIO.titleBadge.topPx + RANK_TITLE_OFFSET_YPX) * factor),
    left: Math.round((AVATA_RATIO.avatarDiameterPx / 2 + AVATA_RATIO.titleBadge.centerOffsetXPx - AVATA_RATIO.titleBadge.widthPx / 2) * factor),
  }}>
    {!compact && <svg aria-hidden="true" className="pointer-events-none absolute size-0"><defs><filter id={sharpId} colorInterpolationFilters="sRGB"><feConvolveMatrix order="3" kernelMatrix="0 -0.15 0 -0.15 1.6 -0.15 0 -0.15 0" preserveAlpha="true" edgeMode="duplicate" /></filter></defs></svg>}
    <CrispUiImage src={rankArtwork[rank.name].image} alt={`Danh hiệu ${rank.name}`} width={width} height={height} className="block object-contain" style={{ width, height, ...(!compact ? { filter: `url(#${sharpId}) contrast(1.12)` } : {}) }} />
    <span className={`absolute z-20 block ${compact ? '-translate-x-1/2' : ''} [container-type:inline-size]`} style={compact ? starsStyle : desktopStarsStyle}>
      <RankStars stars={rank.stars} maxStars={rank.maxStars} />
    </span>
  </span>
}
