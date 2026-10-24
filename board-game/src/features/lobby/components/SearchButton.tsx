import type { ButtonHTMLAttributes } from 'react'
import frame from '../../../assets/buttons/search-frame.png'
import { buttonInteraction } from '../../../lib/uiClasses'

export function SearchButton({ className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="submit" {...props} className={`${buttonInteraction} relative isolate flex shrink-0 items-center justify-center gap-1 border-0 bg-transparent px-3 py-0 font-body font-bold not-italic text-[#ffe5a6] transition-[filter] enabled:hover:brightness-110 ${className}`}><img src={frame} alt="" className="pointer-events-none absolute inset-0 -z-10 size-full object-fill" />{children}</button>
}
