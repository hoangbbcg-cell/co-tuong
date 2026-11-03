import type { CSSProperties } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'

export function MessagesBackButton({ onClick, label, size = 28, autoFocus, style, className = '' }: { onClick: () => void; label: string; size?: number; autoFocus?: boolean; style?: CSSProperties; className?: string }) {
  return <button type="button" onClick={onClick} aria-label={label} autoFocus={autoFocus} className={`${buttonInteraction} grid shrink-0 place-items-center rounded-full border border-[#b8873e] bg-[linear-gradient(#633916,#291307)] p-0 text-[#ffe7ae] shadow-[inset_0_1px_0_#e7bd6b55] ${className}`} style={{ width: size, height: size, ...style }}><svg aria-hidden="true" viewBox="0 0 24 24" style={{ width: size * 18 / 28, height: size * 18 / 28 }} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6"/></svg></button>
}
