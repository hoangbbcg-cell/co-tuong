import { AvatarPortrait } from './AvatarCustomization'
import { AvatarFrameOverlay } from '../../game/components/AvatarFrameOverlay'
import { getAvatarFrame } from '../../../lib/avatarFrames'

export function AccountAvatar({ avatarCode, avatarFrameCode }: { avatarCode?: string; avatarFrameCode?: string }) {
  const frame = getAvatarFrame(Number(avatarFrameCode?.replace('frame-', '')) || 0)
  return <span className="relative block size-full">
    <AvatarPortrait avatarIndex={Number(avatarCode?.replace('avatar-', '')) || 0} className="size-full rounded-full" />
    <AvatarFrameOverlay src={frame.image} alt={frame.label} />
  </span>
}
