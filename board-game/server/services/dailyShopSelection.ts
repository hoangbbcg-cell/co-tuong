import { randomInt } from 'node:crypto'
import type { ShopProduct } from '../../src/lib/shopCatalog'

/** One roll for the entire day: 60% zero repeats, 30% one, 10% two.
 * When fresh stock cannot fill 3+3, use the minimum necessary repeats. */
export function selectDailyShop(catalog: readonly ShopProduct[], seen: ReadonlySet<string>, random: (max: number) => number = randomInt): string[] {
  const fresh = (kind: ShopProduct['kind']) => catalog.filter(item => item.kind === kind && !seen.has(item.id))
  const old = (kind: ShopProduct['kind']) => catalog.filter(item => item.kind === kind && seen.has(item.id))
  const avatars = fresh('avatar'), frames = fresh('frame'), oldAvatars = old('avatar'), oldFrames = old('frame')
  const roll = random(100)
  const requested = roll < 60 ? 0 : roll < 90 ? 1 : 2
  const feasible: { avatars: number; frames: number; total: number }[] = []
  for (let a = 0; a <= 3; a++) for (let f = 0; f <= 3; f++) {
    if (a <= oldAvatars.length && f <= oldFrames.length && 3 - a <= avatars.length && 3 - f <= frames.length) feasible.push({ avatars: a, frames: f, total: a + f })
  }
  if (!feasible.length) throw new Error('Daily shop needs at least three distinct products of each kind.')
  const minimum = Math.min(...feasible.map(item => item.total))
  const maximum = Math.min(Math.max(2, minimum), Math.max(...feasible.map(item => item.total)))
  const target = Math.max(minimum, Math.min(requested, maximum))
  const allocations = feasible.filter(item => item.total === target)
  const allocation = allocations[random(allocations.length)]
  const sample = (items: ShopProduct[], count: number) => {
    const remaining = [...items], result: string[] = []
    while (result.length < count) result.push(remaining.splice(random(remaining.length), 1)[0].id)
    return result
  }
  return [...sample(avatars, 3 - allocation.avatars), ...sample(oldAvatars, allocation.avatars), ...sample(frames, 3 - allocation.frames), ...sample(oldFrames, allocation.frames)]
}
