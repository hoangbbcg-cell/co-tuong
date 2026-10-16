import type { CSSProperties } from 'react'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import defaultGroupAvatar from '../../../assets/messages/create-group/avatar.png'

export function MessagesGroupAvatar({ src, alt, className, style }: {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}) {
  return <span className={`relative block aspect-square overflow-hidden rounded-full ${className ?? ''}`} style={style}>
    {src === defaultGroupAvatar
      ? <CrispUiImage src={defaultGroupAvatar} alt={alt} className="block size-full object-contain" />
      : <CrispUiImage src={src} alt={alt} className="block size-full rounded-full object-cover" />}
  </span>
}
