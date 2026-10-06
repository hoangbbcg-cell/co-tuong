import { CrispUiImage } from '../../../lib/CrispUiImage'
type AvatarFrameOverlayProps = {
  src: string
  alt?: string
  dimmed?: boolean
}

// The PNG opening is about 73% of its canvas. This scale places the portrait's
// baked-in border inside the opaque gold band, between its inner and outer edges.
const AVATAR_FRAME_SCALE = 156 / 128

export function AvatarFrameOverlay({ src, alt = '', dimmed = false }: AvatarFrameOverlayProps) {
  const frameSize = `${AVATAR_FRAME_SCALE * 100}%`

  return <span
    className="pointer-events-none absolute z-10 max-w-none -translate-x-1/2 -translate-y-1/2 overflow-hidden"
    style={{ left: '50.5%', top: '50.6%', width: frameSize, height: frameSize, clipPath: 'circle(44.8% at 50% 50%)', filter: dimmed ? 'brightness(0.72)' : undefined }}
  >
    <CrispUiImage src={src} alt={alt} className="block size-full object-contain" />
  </span>
}
