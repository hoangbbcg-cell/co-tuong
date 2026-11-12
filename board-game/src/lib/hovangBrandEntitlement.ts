/** Public IDs allowed to control the HOVANG watermark on the board. */
export const HOVANG_WATERMARK_CONTROL_PUBLIC_IDS = new Set<string>([
  // Add an approved public ID here, for example: '29622295',
])

export function canControlHovangWatermark(publicId: string | null | undefined, serverGranted = false): boolean {
  return serverGranted || (!!publicId && HOVANG_WATERMARK_CONTROL_PUBLIC_IDS.has(String(publicId)))
}

export function readHovangWatermark(publicId: string): boolean {
  try { return localStorage.getItem(`hovang-watermark:${publicId}`) !== 'off' } catch { return true }
}

export function writeHovangWatermark(publicId: string, visible: boolean): void {
  try { localStorage.setItem(`hovang-watermark:${publicId}`, visible ? 'on' : 'off') } catch { /* storage unavailable */ }
}
