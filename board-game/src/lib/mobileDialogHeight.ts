export function mobileDialogMargin(viewportWidth: number, viewportHeight: number) {
  return viewportWidth <= 800 && viewportHeight > viewportWidth ? 20 : 32
}

/** Give portrait phone dialogs more content space without scaling their avatars or text. */
export function mobileDialogHeight(height: number, scale: number, viewportWidth: number, viewportHeight: number) {
  if (viewportWidth > 800 || viewportHeight <= viewportWidth) return height
  const pixels = Math.min(viewportHeight - 48, Math.max(height * scale, viewportHeight * 0.82))
  return Math.max(1, pixels / scale)
}
