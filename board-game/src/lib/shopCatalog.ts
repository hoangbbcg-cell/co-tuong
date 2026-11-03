import type { AccountProfile } from '../types/account'
import { DEFAULT_AVATARS } from '../types/admin'
import { SHOP_AVATAR_DEFINITIONS, SHOP_FRAME_DEFINITIONS, WEEKLY_SHOP_FRAMES, WEEKLY_SHOP_JOURNEY_AVATARS, WEEKLY_SHOP_STANDARD_AVATARS } from './shopCosmetics'

export interface ShopProduct { id: string; code: string; kind: 'avatar' | 'frame'; name: string; price: number }
export const DAILY_SHOP_PRICE = 3000
export const WEEKLY_SHOP_PRICE = 10000
export const WEEKLY_SHOP_JOURNEY_PRICE = 12000

export const SHOP_PRODUCTS: readonly ShopProduct[] = [
  { id: 'avatar-16', code: 'avatar-16', kind: 'avatar', name: 'Lão quân sư', price: DAILY_SHOP_PRICE },
  { id: 'avatar-17', code: 'avatar-17', kind: 'avatar', name: 'Nam tướng quân', price: DAILY_SHOP_PRICE },
  { id: 'frame-4', code: 'frame-4', kind: 'frame', name: 'Viền đỏ 03', price: DAILY_SHOP_PRICE },
  { id: 'frame-5', code: 'frame-5', kind: 'frame', name: 'Viền xanh ngọc 08', price: DAILY_SHOP_PRICE },
  { id: 'frame-6', code: 'frame-6', kind: 'frame', name: 'Viền tím 09', price: DAILY_SHOP_PRICE },
  ...SHOP_AVATAR_DEFINITIONS.map(item => ({ id: `avatar-${item.index}`, code: `avatar-${item.index}`, kind: 'avatar' as const, name: item.name, price: WEEKLY_SHOP_JOURNEY_AVATARS.some(index => index === item.index) ? WEEKLY_SHOP_JOURNEY_PRICE : WEEKLY_SHOP_STANDARD_AVATARS.some(index => index === item.index) ? WEEKLY_SHOP_PRICE : DAILY_SHOP_PRICE })),
  ...SHOP_FRAME_DEFINITIONS.map(item => ({ id: `frame-${item.index}`, code: `frame-${item.index}`, kind: 'frame' as const, name: item.name, price: item.index === 29 ? WEEKLY_SHOP_JOURNEY_PRICE : WEEKLY_SHOP_FRAMES.some(index => index === item.index) ? WEEKLY_SHOP_PRICE : DAILY_SHOP_PRICE })),
]
export function ownsCosmetic(profile: Pick<AccountProfile, 'cosmetics'> | null, product: Pick<ShopProduct, 'kind' | 'code'>) {
  if (product.kind === 'avatar' && DEFAULT_AVATARS.some(index => product.code === `avatar-${index}`)) return true
  if (product.kind === 'frame' && /^frame-[0-3]$/.test(product.code)) return true
  return profile?.cosmetics?.some(item => item.kind === product.kind && item.code === product.code) ?? false
}
export const alreadyOwnedMessage = (product: Pick<ShopProduct, 'kind' | 'name'>) => `Bạn đã có ${product.kind === 'avatar' ? 'avatar' : 'viền'} này: ${product.name}.`
