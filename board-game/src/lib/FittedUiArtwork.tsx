import { useLayoutEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import { CrispUiImage } from './CrispUiImage'

/** Preserve an approved contained crop/stretch using real pixels, not a scaled layer. */
export function FittedUiArtwork({ scaleX = 1, scaleY = 1, style, onLoad, ...props }: ImgHTMLAttributes<HTMLImageElement> & { scaleX?: number; scaleY?: number }) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const [source, setSource] = useState({ width: 0, height: 0 })
  const [box, setBox] = useState({ width: 0, height: 0 })
  useLayoutEffect(() => {
    const host = hostRef.current
    if (!host) return
    const measure = () => setBox({ width: host.clientWidth, height: host.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(host)
    return () => observer.disconnect()
  }, [])
  const fit = source.width && source.height ? Math.min(box.width / source.width, box.height / source.height) : 0
  return <span ref={hostRef} className="pointer-events-none absolute inset-0">
    <CrispUiImage {...props} onLoad={event => {
      setSource({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })
      onLoad?.(event)
    }} style={{ ...style, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: Math.round(source.width * fit * scaleX), height: Math.round(source.height * fit * scaleY), maxWidth: 'none', objectFit: 'fill' }} />
  </span>
}
