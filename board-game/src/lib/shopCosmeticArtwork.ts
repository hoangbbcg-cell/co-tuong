import { SHOP_AVATAR_DEFINITIONS, SHOP_FRAME_DEFINITIONS } from './shopCosmetics'

const portraits = import.meta.glob<string>('../assets/shop/avatars/daily/*.jpg', { eager: true, query: '?url', import: 'default' })
const frames = import.meta.glob<string>('../assets/shop/frames/daily-v3/*.png', { eager: true, query: '?url', import: 'default' })

export function getShopAvatarArtwork(index: number) {
  const avatar = SHOP_AVATAR_DEFINITIONS.find(item => item.index === index)
  return avatar ? portraits[`../assets/shop/avatars/daily/${avatar.slug}.jpg`] : undefined
}
export const SHOP_FRAME_ARTWORK = SHOP_FRAME_DEFINITIONS.map(frame => ({
  image: frames[`../assets/shop/frames/daily-v3/${frame.slug}.png`], label: frame.name,
}))
