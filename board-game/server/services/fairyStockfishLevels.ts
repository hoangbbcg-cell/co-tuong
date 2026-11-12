export const FAIRY_LEVELS = {
  7: { depth: null, skill: 20, randomMoveChance: 0 },
  8: { depth: null, skill: 20, randomMoveChance: 0 },
  9: { depth: null, skill: 20, randomMoveChance: 0 },
  10: { depth: null, skill: 20, randomMoveChance: 0 },
} as const
export function fairyLevel(level: number) {
  if (!Number.isInteger(level) || level < 7 || level > 10) throw new RangeError('Fairy level must be 7–10')
  return FAIRY_LEVELS[level as keyof typeof FAIRY_LEVELS]
}
