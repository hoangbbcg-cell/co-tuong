import { WEEKLY_SHOP_FRAMES } from '../../src/lib/shopCosmetics'
import { SHOP_PRODUCTS } from '../../src/lib/shopCatalog'
import { AccountError } from '../errors'
import { ShopRepository } from '../repositories/shopRepository'
import { DailyShopRepository } from '../repositories/dailyShopRepository'
import { selectDailyShop } from './dailyShopSelection'
import type { DailyShop } from '../../src/types/dailyShop'
import type { WeeklyShop } from '../../src/types/dailyShop'
import { selectWeeklyShop } from './weeklyShopSelection'

export class ShopService {
  constructor(readonly repository = new ShopRepository(), readonly dailyRepository = new DailyShopRepository()) {}
  async daily(): Promise<DailyShop> {
    const now = Date.now(), offset = 7 * 60 * 60 * 1000, day = 86400000
    const date = new Date(now + offset).toISOString().slice(0, 10)
    const dailyProducts = SHOP_PRODUCTS.filter(item => !/^avatar-(3[8-9]|4[0-6])$/.test(item.id) && !WEEKLY_SHOP_FRAMES.some(index => item.id === `frame-${index}`))
    const selected = await this.dailyRepository.getOrCreate(date, seen => selectDailyShop(dailyProducts, seen))
    const products = selected.map(id => SHOP_PRODUCTS.find(item => item.id === id))
    if (products.some(item => !item)) throw new AccountError('Danh mục phiên chợ chưa được cập nhật.', 503)
    return { date, refreshAt: Math.floor((now + offset) / day) * day + day - offset, products: products.filter((item): item is NonNullable<typeof item> => !!item) }
  }
  async weekly(): Promise<WeeklyShop> {
    const now = Date.now(), offset = 7 * 60 * 60 * 1000, day = 86400000
    const local = new Date(now + offset)
    const daysSinceMonday = (local.getUTCDay() + 6) % 7
    const weekStartMs = Math.floor((now + offset) / day) * day - daysSinceMonday * day
    const week = new Date(weekStartMs).toISOString().slice(0, 10)
    const refreshAt = weekStartMs + 7 * day - offset
    const firstWeek = new Date(Date.UTC(2026, 9, 26)).toISOString().slice(0, 10)
    const selected = [...selectWeeklyShop(week, firstWeek), ...WEEKLY_SHOP_FRAMES.map(index => `frame-${index}`)]
    const products = selected.map(id => SHOP_PRODUCTS.find(item => item.id === id))
    if (products.some(item => !item)) throw new AccountError('Danh mục cửa hàng tuần chưa được cập nhật.', 503)
    return { week, date: week, refreshAt, products: products.filter((item): item is NonNullable<typeof item> => !!item) }
  }
  async purchase(id: string, input: unknown) {
    if (!input || typeof input !== 'object') throw new AccountError('Yêu cầu mua hàng không hợp lệ.')
    const body = input as Record<string, unknown>
    const product = SHOP_PRODUCTS.find(item => item.id === body.productId)
    if (!product) throw new AccountError('Sản phẩm không tồn tại.', 404)
    if (typeof body.requestId !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(body.requestId)) throw new AccountError('Mã mua hàng không hợp lệ.')
    // Price, kind and code come exclusively from the server catalog.
    if (body.market === 'weekly') return this.repository.purchase(id, product, body.requestId, await this.weekly(), 'weekly')
    return this.repository.purchase(id, product, body.requestId, await this.daily(), 'daily')
  }
}
