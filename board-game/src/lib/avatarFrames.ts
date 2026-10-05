import goldFrame from '../assets/30dfa56b-d9f3-4129-b9fd-aaf0ea884188.png'
import redFrame from '../assets/3830d50d-608d-4c7c-b4b8-90ab56e5d423.png'
import greenFrame from '../assets/bfe1914e-68bf-4a53-bba9-394552e7a83a.png'
import blueFrame from '../assets/c6e6ed73-8a09-4dc7-955b-27b0da3557b0.png'

export const AVATAR_FRAMES = [
  { image: goldFrame, label: 'Khung avatar vàng mặc định' },
  { image: redFrame, label: 'Khung avatar đỏ' },
  { image: greenFrame, label: 'Khung avatar xanh lá' },
  { image: blueFrame, label: 'Khung avatar xanh dương' },
] as const

export function getAvatarFrame(index: number) {
  return AVATAR_FRAMES[index] ?? AVATAR_FRAMES[0]
}
