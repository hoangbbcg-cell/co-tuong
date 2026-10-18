import type { ButtonHTMLAttributes } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'

export function ResourceAddButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type="button" className={`${buttonInteraction} grid place-items-center rounded-[4px] border border-[#fff0b8] bg-[linear-gradient(180deg,#fff1b2_0%,#ffd47c_45%,#e7a441_100%)] p-0 text-[#452507] shadow-[inset_0_1px_0_#fff9d9,inset_0_-2px_1px_#b77328,0_1px_2px_#231006] ${className}`}>
    <svg viewBox="0 0 16 16" className="block size-[65%]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M8 3v10M3 8h10" /></svg>
  </button>
}
