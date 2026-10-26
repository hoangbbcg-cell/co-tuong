import type { ShopProduct } from '../lib/shopCatalog'

export interface DailyShop {
  date: string
  refreshAt: number
  products: ShopProduct[]
}
