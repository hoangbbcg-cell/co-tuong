import { rankArtwork } from '../../../lib/rankArtwork'
import { DEFAULT_PLAYER_ELO, getRankProgress } from '../../../lib/rankProgression'
import { getRankTitleStarsStyle, RANK_STAR_SIZE_SCALE } from './playerIdentityLayout'
import { RankStars } from './RankStars'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import computerTitle from '../../../assets/computer-setup/ong-hoang-title.png'
import computerStars from '../../../assets/computer-setup/ong-hoang-stars.png'

/** Every title uses the approved Home star spacing, scaled with its frame. */
export function RankTitleBadge({ elo = DEFAULT_PLAYER_ELO, previewStars, computer = false }: { elo?: number; previewStars?: number; computer?: boolean }) {
  const rank = getRankProgress(elo)
  // Keep the static artwork on a stable layer while sibling controls change hover styles.
  return <span className="relative isolate block size-full">
    <CrispUiImage src={computer ? computerTitle : rankArtwork[rank.name].image} alt={computer ? 'Danh hiệu Kỳ Thủ AI' : `Danh hiệu ${rank.name}`} className={`pointer-events-none block size-full object-contain transition-none ${computer ? '' : 'contrast-[1.12]'}`} />
    <span className="pointer-events-none absolute z-20 block -translate-x-1/2 [container-type:inline-size]" style={getRankTitleStarsStyle(rank.level)}>
      {computer ? <CrispUiImage src={computerStars} alt="Sao Kỳ Thủ AI" className="pointer-events-none m-0 block h-auto max-w-none border-0 p-0 object-contain" style={{ width: `${RANK_STAR_SIZE_SCALE * 100}%`, marginInline: `${(1 - RANK_STAR_SIZE_SCALE) * 50}%` }} /> : <RankStars stars={previewStars ?? rank.stars} maxStars={rank.maxStars} />}
    </span>
  </span>
}
