import { SHOP_PRODUCTS } from '../../src/lib/shopCatalog'
import { AccountError } from '../errors'
import { ShopRepository } from '../repositories/shopRepository'
import { DailyShopRepository } from '../repositories/dailyShopRepository'
import { selectDailyShop } from './dailyShopSelection'
import type { DailyShop } from '../../src/types/dailyShop'

export class ShopService {
  constructor(readonly repository = new ShopRepository(), readonly dailyRepository = new DailyShopRepository()) {}
  async daily(): Promise<DailyShop> {
    const now = Date.now(), offset = 7 * 60 * 60 * 1000, day = 86400000
    const date = new Date(now + offset).toISOString().slice(0, 10)
    const selected = await this.dailyRepository.getOrCreate(date, seen => selectDailyShop(SHOP_PRODUCTS, seen))
    const products = selected.map(id => SHOP_PRODUCTS.find(item => item.id === id))
    if (products.some(item => !item)) throw new AccountError('Danh mục phiên chợ chưa được cập nhật.', 503)
    return { date, refreshAt: Math.floor((now + offset) / day) * day + day - offset, products: products.filter((item): item is NonNullable<typeof item> => !!item) }
  }
  async purchase(id: string, input: unknown) {
    if (!input || typeof input !== 'object') throw new AccountError('Yêu cầu mua hàng không hợp lệ.')
    const body = input as Record<string, unknown>
    const product = SHOP_PRODUCTS.find(item => item.id === body.productId)
    if (!product) throw new AccountError('Sản phẩm không tồn tại.', 404)
    if (typeof body.requestId !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(body.requestId)) throw new AccountError('Mã mua hàng không hợp lệ.')
    // Price, kind and code come exclusively from the server catalog.
    return this.repository.purchase(id, product, body.requestId, await this.daily())
  }
}
