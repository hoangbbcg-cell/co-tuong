export const FAIRY_LEVELS = {
  1: { depth: 1, skill: 0, randomMoveChance: 0.85 },
  2: { depth: 2, skill: 3, randomMoveChance: 0.65 },
  3: { depth: 3, skill: 6, randomMoveChance: 0.45 },
  4: { depth: 4, skill: 10, randomMoveChance: 0.25 },
  5: { depth: 5, skill: 14, randomMoveChance: 0.12 },
  6: { depth: 6, skill: 18, randomMoveChance: 0.04 },
  7: { depth: null, skill: 20, randomMoveChance: 0 },
  8: { depth: null, skill: 20, randomMoveChance: 0 },
  9: { depth: null, skill: 20, randomMoveChance: 0 },
  10: { depth: null, skill: 20, randomMoveChance: 0 },
} as const

export function fairyLevel(level: number) {
  return FAIRY_LEVELS[level as keyof typeof FAIRY_LEVELS]
}
