import type { CSSProperties, ImgHTMLAttributes } from 'react'
import { CrispUiImage } from '../../../lib/CrispUiImage'

/** Keep curved resource icons antialiased; enhanced sampling is for frames only. */
export function ResourceArtwork({ smooth = false, ...props }: ImgHTMLAttributes<HTMLImageElement> & { smooth?: boolean }) {
  return <CrispUiImage {...props} style={{ ...props.style, imageRendering: smooth ? 'auto' : '-webkit-optimize-contrast' as CSSProperties['imageRendering'] }} />
}
