import type { SVGProps } from 'react'

/** Shared magnifier from the conversation search field. */
export function SearchIcon({ className = 'size-[var(--ui-p-31,31px)]', ...props }: SVGProps<SVGSVGElement>) {
  return <svg {...props} aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/></svg>
}
