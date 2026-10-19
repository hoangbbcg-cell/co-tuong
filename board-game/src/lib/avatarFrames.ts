import goldFrame from '../assets/player/avatar-frames/gold-frame.png'
import redFrame from '../assets/player/avatar-frames/red-frame.png'
import greenFrame from '../assets/player/avatar-frames/green-frame.png'
import blueFrame from '../assets/player/avatar-frames/blue-frame.png'
import shopRedFrame from '../assets/shop/frames/vien_03_do.png'
import shopJadeFrame from '../assets/shop/frames/vien_08_xanh_ngoc.png'
import shopPurpleFrame from '../assets/shop/frames/vien_09_tim.png'

export const AVATAR_FRAMES = [
  { image: goldFrame, label: 'Khung avatar vàng mặc định' },
  { image: redFrame, label: 'Khung avatar đỏ' },
  { image: greenFrame, label: 'Khung avatar xanh lá' },
  { image: blueFrame, label: 'Khung avatar xanh dương' },
  { image: shopRedFrame, label: 'Viền đỏ 03' },
  { image: shopJadeFrame, label: 'Viền xanh ngọc 08' },
  { image: shopPurpleFrame, label: 'Viền tím 09' },
] as const

export function getAvatarFrame(index: number) {
  return AVATAR_FRAMES[index] ?? AVATAR_FRAMES[0]
}
export const isShopAvatarFrame = (src: string) => [shopRedFrame, shopJadeFrame, shopPurpleFrame].includes(src)

