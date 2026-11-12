import type { CSSProperties } from 'react'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import defaultGroupAvatar from '../../../assets/messages/create-group/avatar.png'

export function MessagesGroupAvatar({ src, alt, className, style }: {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}) {
  return <span className={`relative block aspect-square overflow-hidden rounded-full desktop:[&_img]:![image-rendering:auto] ${className ?? ''}`} style={style}>
    {src === defaultGroupAvatar
      ? <CrispUiImage src={defaultGroupAvatar} alt={alt} style={{ imageRendering: '-webkit-optimize-contrast' }} className="block size-full object-contain" />
      : <CrispUiImage src={src} alt={alt} style={{ imageRendering: '-webkit-optimize-contrast' }} className="block size-full rounded-full object-cover" />}
  </span>
}
