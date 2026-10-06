import type { CSSProperties, ImgHTMLAttributes } from 'react'

/** Native images keep original assets and browser antialiasing; no pixelated filter. */
export function crispImageProps(props: ImgHTMLAttributes<HTMLImageElement>): ImgHTMLAttributes<HTMLImageElement> {
  const width = typeof props.width === 'number' ? Math.round(props.width) : props.width
  const height = typeof props.height === 'number' ? Math.round(props.height) : props.height
  return { ...props, width, height, style: { imageRendering: 'auto', ...props.style } }
}

const PIXEL_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 56, 58, 60, 63, 66, 66.382, 72, 76, 82, 82.77551, 84, 85, 86, 90, 96, 100, 104, 106, 108, 118, 120, 128, 132, 136, 140, 145, 149, 150, 151, 159, 166, 170, 173, 175, 178, 180, 183, 185, 188, 189, 190, 192, 208, 210, 212, 220, 226, 238, 240, 270, 300, 320, 330, 358, 380, 384, 388, 390, 610, 650, 700, 738, 760, 810, 820, 900, 924, 960, 1020, 1148]
const TEXT_SIZES = { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48, '6xl': 60 } as const
const RADII = { xs: 2, sm: 4, md: 6, lg: 8, xl: 12, '2xl': 16, '3xl': 24 } as const

/** Fit the existing design using real layout pixels instead of scaling a bitmap layer. */
export function getCrispUiLayout(scale: number, width?: number, height?: number): CSSProperties {
  const style: Record<string, string | number> = { '--spacing': `${4 * scale}px` }
  if (width != null) style.width = Math.round(width * scale)
  if (height != null) style.height = Math.round(height * scale)
  for (const size of PIXEL_SIZES) style[`--ui-p-${String(size).replace('.', '-')}`] = `${Math.round(size * scale)}px`
  for (const [name, size] of Object.entries(TEXT_SIZES)) style[`--text-${name}`] = `${Math.round(size * scale)}px`
  for (const [name, size] of Object.entries(RADII)) style[`--radius-${name}`] = `${Math.round(size * scale)}px`
  return style as CSSProperties
}