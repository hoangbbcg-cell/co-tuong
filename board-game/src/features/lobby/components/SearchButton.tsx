import type { ButtonHTMLAttributes } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'
import searchFrame from '../../../assets/580e9677-60e1-44a8-9fd5-45ef04444b44.png'

export function SearchButtonIcon() {
  return <svg aria-hidden="true" viewBox="0 0 32 32" className="size-[var(--ui-p-31,31px)] shrink-0 fill-none stroke-current" strokeWidth="3.5" strokeLinecap="round"><circle cx="13" cy="13" r="7" /><path d="m18.5 18.5 7.5 7.5" /></svg>
}

export function SearchButton({ className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="submit" data-ui-selection-sound {...props} className={`${buttonInteraction} relative flex shrink-0 items-center justify-center border-0 bg-transparent px-3 py-0 font-body font-bold not-italic text-[#2b1909] transition-[filter] enabled:hover:brightness-110 ${className}`}>
    {/* Visible artwork bounds: (124,159)-(1650,725) in the 1774×887 source. */}
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-no-repeat" style={{ backgroundImage: `url(${searchFrame})`, backgroundSize: `${1774 / 1526 * 100}% ${887 / 566 * 100}%`, backgroundPosition: '50% 49.53%' }} />
    <span className="pointer-events-none relative flex items-center justify-center gap-1">{children}</span>
  </button>
}
