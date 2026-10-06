import { rankArtwork } from '../../../lib/rankArtwork'
import { DEFAULT_PLAYER_ELO, getRankProgress } from '../../../lib/rankProgression'
import { getRankTitleStarsStyle } from './playerIdentityLayout'
import { RankStars } from './RankStars'
import { CrispUiImage } from '../../../lib/CrispUiImage'

/** Every title uses the approved Home star spacing, scaled with its frame. */
export function RankTitleBadge({ elo = DEFAULT_PLAYER_ELO, previewStars }: { elo?: number; previewStars?: number }) {
  const rank = getRankProgress(elo)
  // Keep the static artwork on a stable layer while sibling controls change hover styles.
  return <span className="relative isolate block size-full">
    <CrispUiImage src={rankArtwork[rank.name].image} alt={`Danh hiệu ${rank.name}`} className="pointer-events-none block size-full object-contain contrast-[1.12] transition-none" />
    <span className="pointer-events-none absolute z-20 block -translate-x-1/2 [container-type:inline-size]" style={getRankTitleStarsStyle(rank.level)}>
      <RankStars stars={previewStars ?? rank.stars} maxStars={rank.maxStars} />
    </span>
  </span>
}
