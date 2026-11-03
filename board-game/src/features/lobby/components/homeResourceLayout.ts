/** Shared Home/Shop resource geometry in final CSS pixels. */
export function homeResourceLayout(scale: number, compact: boolean) {
  const resourceWidth = Math.round((compact ? 320 : 420) * scale)
  return {
    resourceWidth,
    resourceHeight: Math.round((compact ? 300 : 390) * 311 / 2130 * scale),
    resourceFrameHeight: Math.round((compact ? 36 : 44) * scale),
    resourceIconHeight: Math.round((compact ? 25 : 29) * scale),
    resourceFrameWidth: Math.round(resourceWidth * 0.49),
  }
}
