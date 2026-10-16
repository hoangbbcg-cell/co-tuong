import { expect, it } from 'vitest'
import { getRankProgress } from '../src/lib/rankProgression'

it.each([
  [2799, 'Kỳ Vương', 3],
  [2800, 'Kỳ Thánh', 1],
  [2899, 'Kỳ Thánh', 1],
  [2900, 'Kỳ Thánh', 2],
  [2999, 'Kỳ Thánh', 2],
  [3000, 'Kỳ Thánh', 3],
  [5000, 'Kỳ Thánh', 3],
] as const)('Elo %i displays %s with %i stars without losing Elo', (elo, name, stars) => {
  expect(getRankProgress(elo)).toMatchObject({ elo, name, stars })
})
