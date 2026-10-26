import type { AccountProfile } from './account'
import { AVATAR_COUNT, SHOP_AVATAR_DEFINITIONS, SHOP_FRAME_DEFINITIONS } from '../lib/shopCosmetics'

export const DEFAULT_AVATARS = [0, 1, 3, 4, 7]
export const ADMIN_AVATARS = Array.from({ length: AVATAR_COUNT }, (_, index) => ({
  code: `avatar-${index}`, name: SHOP_AVATAR_DEFINITIONS.find(item => item.index === index)?.name ?? ['Nữ kiếm khách', 'Lão quân sư', 'Nam tướng quân'][index - 15] ?? `Avatar ${index + 1}`,
}))
export const ADMIN_FRAMES = ['Vàng', 'Đỏ', 'Xanh lá', 'Xanh dương', 'Viền đỏ 03', 'Viền xanh ngọc 08', 'Viền tím 09', ...SHOP_FRAME_DEFINITIONS.map(item => item.name)].map((name, index) => ({ code: `frame-${index}`, name }))
export interface AdminAudit { id: string; action: string; reason: string; before: unknown; after: unknown; createdAt: string }
export interface AdminUser {
  profile: AccountProfile
  cosmetics: { kind: string; code: string }[]
  honors: { code: string; selected: number }[]
  audit: AdminAudit[]
}
export type AdminChange = { requestId: string; reason: string } & (
  { action: 'resources'; gold: number; energy: number; xiangqi: number; jieqi: number } |
  { action: 'avatar' | 'frame' | 'honor'; code: string; equip: boolean }
)
