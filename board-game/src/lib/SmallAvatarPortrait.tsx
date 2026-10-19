import { useLayoutEffect, useRef, useState } from 'react'
import { CrispUiImage } from './CrispUiImage'

const variants = import.meta.glob<string>('../assets/shop/avatars/small/*.png', { eager: true, query: '?url', import: 'default' })
const sizes = [96, 128, 136, 160, 192, 200, 256, 272, 320, 384, 408, 480]
const names = ['nu-kiem-khach', 'lao-quan-su', 'nam-tuong-quan']

/** Use prepared small sources close to the real CSS size and display density. */
export function SmallAvatarPortrait({ avatarIndex, className }: { avatarIndex: number; className: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [width, setWidth] = useState(128)
  useLayoutEffect(() => {
    const host = ref.current
    if (!host) return
    const measure = () => { const next = Math.round(host.getBoundingClientRect().width); if (next > 0) setWidth(next) }
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(host)
    return () => observer.disconnect()
  }, [])
  const name = names[avatarIndex - 15]
  const path = (size: number) => variants[`../assets/shop/avatars/small/${name}-${size}.png`]
  return <span ref={ref} aria-hidden="true" className={`block ${className}`}>
    <CrispUiImage src={path(128)} srcSet={sizes.map(size => `${path(size)} ${size}w`).join(', ')} sizes={`${width}px`} width={128} height={128} alt="" className="block size-full rounded-full object-cover" />
  </span>
}
