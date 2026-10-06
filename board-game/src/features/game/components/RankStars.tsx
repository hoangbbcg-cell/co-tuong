import { CrispUiImage } from '../../../lib/CrispUiImage'
import rankStar from '../../../assets/player/rank-star.png'
import { RANK_STAR_LAYOUT } from './playerIdentityLayout'

/** Earned stars always fill the fixed row from left to right, including one star. */
export function RankStars({ stars, maxStars }: { stars: number; maxStars: number }) {
  const earnedStars = Math.max(0, Math.min(maxStars, Math.floor(stars)))
  const rowWidth = `min(100%, ${maxStars * RANK_STAR_LAYOUT.starWidthCqw + (maxStars - 1) * RANK_STAR_LAYOUT.gapCqw}cqw)`
  return <span aria-label={`${earnedStars} trên ${maxStars} sao`} style={{ height: `${RANK_STAR_LAYOUT.starWidthCqw}cqw` }} className="flex w-full min-w-0 max-w-full items-start justify-center overflow-hidden p-0 leading-none">
    <span className="grid min-w-0" style={{ width: rowWidth, gridTemplateColumns: `repeat(${maxStars}, minmax(0, 1fr))`, gap: `${RANK_STAR_LAYOUT.gapCqw}cqw` }}>
      {Array.from({ length: earnedStars }, (_, index) => <CrispUiImage key={index} src={rankStar} alt="" aria-hidden="true" className="pointer-events-none m-0 block aspect-square h-auto w-full min-w-0 border-0 p-0 object-contain" />)}
    </span>
  </span>
}
