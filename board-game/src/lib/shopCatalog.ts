import type { AccountProfile } from '../types/account'
import { DEFAULT_AVATARS } from '../types/admin'

export const SHOP_PRODUCTS = [
  { id: 'avatar-16', code: 'avatar-16', kind: 'avatar', name: 'Lão quân sư', price: 500 },
  { id: 'avatar-17', code: 'avatar-17', kind: 'avatar', name: 'Nam tướng quân', price: 500 },
  { id: 'frame-4', code: 'frame-4', kind: 'frame', name: 'Viền đỏ 03', price: 500 },
  { id: 'frame-5', code: 'frame-5', kind: 'frame', name: 'Viền xanh ngọc 08', price: 500 },
  { id: 'frame-6', code: 'frame-6', kind: 'frame', name: 'Viền tím 09', price: 500 },
] as const
export type ShopProduct = (typeof SHOP_PRODUCTS)[number]
export function ownsCosmetic(profile: Pick<AccountProfile, 'cosmetics'> | null, product: Pick<ShopProduct, 'kind' | 'code'>) {
  if (product.kind === 'avatar' && DEFAULT_AVATARS.some(index => product.code === `avatar-${index}`)) return true
  if (product.kind === 'frame' && /^frame-[0-3]$/.test(product.code)) return true
  return profile?.cosmetics?.some(item => item.kind === product.kind && item.code === product.code) ?? false
}
export const alreadyOwnedMessage = (product: Pick<ShopProduct, 'kind' | 'name'>) => `Bạn đã có ${product.kind === 'avatar' ? 'avatar' : 'viền'} này: ${product.name}.`
