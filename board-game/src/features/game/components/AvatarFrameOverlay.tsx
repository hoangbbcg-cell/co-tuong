type AvatarFrameOverlayProps = {
  src: string
  alt?: string
}

// Measured baseline: 128px avatar to 166px frame, centered on the avatar.
const AVATAR_FRAME_SCALE = 166 / 128

export function AvatarFrameOverlay({ src, alt = '' }: AvatarFrameOverlayProps) {
  const frameSize = `${AVATAR_FRAME_SCALE * 100}%`

  return <img
    src={src}
    alt={alt}
    className="pointer-events-none absolute left-1/2 top-1/2 z-10 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
    style={{ width: frameSize, height: frameSize }}
  />
}
