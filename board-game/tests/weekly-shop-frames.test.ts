import { describe, expect, it } from 'vitest'
import { ShopService } from '../server/services/shopService'
import { SHOP_PRODUCTS } from '../src/lib/shopCatalog'
import { WEEKLY_SHOP_FRAMES } from '../src/lib/shopCosmetics'

describe('weekly frames separated from avatars', () => {
  it('offers six distinct frame products alongside six avatars', async () => {
    const sale = await new ShopService().weekly()
    expect(sale.products.filter(item => item.kind === 'avatar')).toHaveLength(6)
    expect(sale.products.filter(item => item.kind === 'frame').map(item => item.code)).toEqual(WEEKLY_SHOP_FRAMES.map(index => `frame-${index}`))
    expect(new Set(sale.products.map(item => item.id)).size).toBe(12)
    expect(sale.products.find(item => item.id === 'frame-29')?.price).toBe(12000)
    expect(sale.products.filter(item => item.kind === 'frame' && item.id !== 'frame-29').every(item => item.price === 10000)).toBe(true)
    expect(SHOP_PRODUCTS.find(item => item.id === 'avatar-41')?.kind).toBe('avatar')
  })
})
