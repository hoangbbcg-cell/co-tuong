import type { ImgHTMLAttributes } from 'react'
import { crispImageProps } from './crispUiRendering'

/** Original pixels, one browser sampling pass; never force nearest-neighbour. */
export function CrispUiImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...crispImageProps(props)} />
}
