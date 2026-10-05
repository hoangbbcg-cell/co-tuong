/** Elo-derived rank and star progression. Stars stop advancing at 2800 Elo. */
export const DEFAULT_PLAYER_ELO = 1000
export const STAR_ELO_CAP = 2800
export const rankTiers = [
  { level: 1, name: 'Tân Binh', minElo: DEFAULT_PLAYER_ELO, maxStars: 3, eloPerStar: 100 },
  { level: 2, name: 'Kỳ Sĩ', minElo: 1300, maxStars: 3, eloPerStar: 100 },
  { level: 3, name: 'Kỳ Thủ', minElo: 1600, maxStars: 3, eloPerStar: 100 },
  { level: 4, name: 'Kỳ Tướng', minElo: 1900, maxStars: 3, eloPerStar: 100 },
  { level: 5, name: 'Đại Sư', minElo: 2200, maxStars: 3, eloPerStar: 100 },
  { level: 6, name: 'Kỳ Vương', minElo: 2500, maxStars: 3, eloPerStar: 100 },
  { level: 7, name: 'Kỳ Thánh', minElo: 2800, maxStars: 3, eloPerStar: 100 },
] as const

export type RankName = (typeof rankTiers)[number]['name']

export function getRankProgress(elo: number) {
  const normalizedElo = Number.isFinite(elo) ? Math.max(0, Math.floor(elo)) : rankTiers[0].minElo
  const starElo = Math.min(STAR_ELO_CAP, normalizedElo)
  const tier = [...rankTiers].reverse().find(rank => starElo >= rank.minElo) ?? rankTiers[0]
  const stars = Math.max(1, Math.min(tier.maxStars, 1 + Math.floor((starElo - tier.minElo) / tier.eloPerStar)))
  const nextTier = rankTiers.find(rank => rank.level === tier.level + 1)
  return { ...tier, elo: normalizedElo, starElo, stars, promotionElo: nextTier?.minElo ?? null }
}
