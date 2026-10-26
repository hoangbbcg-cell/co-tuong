import { rows, change, transaction } from './accountRepository'

function ids(value: unknown): string[] {
  const parsed: unknown = typeof value === 'string' ? JSON.parse(value) : value
  if (!Array.isArray(parsed) || !parsed.every(item => typeof item === 'string')) throw new Error('Invalid daily shop inventory history.')
  return parsed
}

export class DailyShopRepository {
  async getOrCreate(date: string, select: (seen: ReadonlySet<string>) => string[]): Promise<string[]> {
    const existing = await rows('SELECT product_ids FROM daily_shop_days WHERE sale_date=?', [date])
    if (existing.length) return ids(existing[0].product_ids)
    return transaction(async c => {
      await change("INSERT IGNORE INTO daily_shop_state(id,seen_product_ids) VALUES(1,JSON_ARRAY())", [], c)
      const state = await rows('SELECT seen_product_ids FROM daily_shop_state WHERE id=1 FOR UPDATE', [], c)
      const current = await rows('SELECT product_ids FROM daily_shop_days WHERE sale_date=?', [date], c)
      if (current.length) return ids(current[0].product_ids)
      const seen = new Set(ids(state[0].seen_product_ids))
      const selected = select(seen)
      const repeated = selected.filter(id => seen.has(id)).length
      await change('INSERT INTO daily_shop_days(sale_date,product_ids,repeated_count) VALUES(?,?,?)', [date, JSON.stringify(selected), repeated], c)
      await change('UPDATE daily_shop_state SET seen_product_ids=? WHERE id=1', [JSON.stringify([...new Set([...seen, ...selected])])], c)
      return selected
    })
  }
}
