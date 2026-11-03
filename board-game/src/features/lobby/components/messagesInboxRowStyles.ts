import type { CSSProperties } from 'react'
import { getSocialRowStyle } from './SocialDialogFrame'

export function messagesInboxListStyle(scale: number, compact: boolean): CSSProperties {
  return compact ? { containerType: 'size', gap: 6 } as CSSProperties : { gap: Math.round(4 * scale) }
}

export function messagesInboxRowStyle(scale: number, compact: boolean): CSSProperties | undefined {
  return compact
    ? { ...getSocialRowStyle(scale, true), height: 'calc((100% - 36px) / 7)', minHeight: 0, flex: '0 0 calc((100% - 36px) / 7)', paddingInline: Math.round(12 * scale * 1.5) + 5 }
    : { ...getSocialRowStyle(scale, false), height: Math.round(90 * scale), minHeight: Math.round(90 * scale), flex: '0 0 auto' }
}
