import type { CSSProperties } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'

export function DialogCloseButton({ onClose, scale, compact, positionClass, disabled = false, zIndex = 30 }: {
  disabled?: boolean
  onClose: () => void
  scale: number
  compact: boolean
  positionClass: string
  zIndex?: number
}) {
  const style: CSSProperties = {
    width: compact ? Math.round(90 * scale) : 52,
    height: compact ? Math.round(90 * scale) : 52,
    fontSize: compact ? Math.round(68 * scale) : 38,
    borderRadius: 12,
    transform: compact ? 'translate(16px, -18px)' : 'translate(32px, -34px)',
    ...(!compact ? { top: Math.round(24 * scale), right: Math.round(28 * scale) } : {}),
    zIndex,
  }

  return <button type="button" disabled={disabled} onClick={onClose} style={style} className={`${buttonInteraction} absolute ${positionClass} z-30 grid place-items-center border-2 border-[#efb75d] bg-[linear-gradient(#6e3d17,#291207)] leading-none text-[#ffe3a2] shadow-[inset_0_0_0_3px_#3f1a08,0_3px_4px_#160804]`} aria-label="Đóng">×</button>
}
