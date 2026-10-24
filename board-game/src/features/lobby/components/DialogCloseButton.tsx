import type { CSSProperties } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'

export function DialogCloseButton({ onClose, scale, compact, positionClass }: {
  onClose: () => void
  scale: number
  compact: boolean
  positionClass: string
}) {
  const style: CSSProperties = {
    width: Math.round((compact ? 90 : 56) * scale),
    height: Math.round((compact ? 90 : 56) * scale),
    fontSize: Math.round((compact ? 68 : 42) * scale),
    borderRadius: compact ? 12 : Math.round(12 * scale),
    transform: compact ? 'translate(16px, -18px)' : undefined,
  }

  return <button type="button" onClick={onClose} style={style} className={`${buttonInteraction} absolute ${positionClass} z-30 grid place-items-center border-2 border-[#efb75d] bg-[linear-gradient(#6e3d17,#291207)] leading-none text-[#ffe3a2] shadow-[inset_0_0_0_3px_#3f1a08,0_3px_4px_#160804]`} aria-label="Đóng">×</button>
}
