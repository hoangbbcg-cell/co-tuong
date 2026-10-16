import goldFrame from '../assets/player/avatar-frames/gold-frame.png'
import redFrame from '../assets/player/avatar-frames/red-frame.png'
import greenFrame from '../assets/player/avatar-frames/green-frame.png'
import blueFrame from '../assets/player/avatar-frames/blue-frame.png'

export const AVATAR_FRAMES = [
  { image: goldFrame, label: 'Khung avatar vàng mặc định' },
  { image: redFrame, label: 'Khung avatar đỏ' },
  { image: greenFrame, label: 'Khung avatar xanh lá' },
  { image: blueFrame, label: 'Khung avatar xanh dương' },
] as const

export function getAvatarFrame(index: number) {
  return AVATAR_FRAMES[index] ?? AVATAR_FRAMES[0]
}

