import type { ShopProduct } from '../lib/shopCatalog'

export interface DailyShop {
  date: string
  refreshAt: number
  products: ShopProduct[]
}

export interface WeeklyShop extends DailyShop {
  week: string
}

export type ShopMarket = 'daily' | 'weekly'
