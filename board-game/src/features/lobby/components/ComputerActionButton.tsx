import { useId, type ButtonHTMLAttributes } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { action: 'position' | 'start' }

/** Vector frame and live text follow the button's dimensions without rasterized labels. */
export function ComputerActionButton({ action, children, className = '', ...props }: Props) {
  const id = useId().replace(/:/g, '')
  const red = action === 'start'
  return <button type="button" {...props} className={`${buttonInteraction} relative isolate flex size-full min-w-0 items-center overflow-hidden rounded-md border-0 bg-transparent p-0 [container-type:inline-size] transition-[filter] enabled:hover:brightness-110 disabled:opacity-60 ${className}`}>
    <svg aria-hidden="true" viewBox="0 0 440 82" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 size-full" fill="none">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor={red ? '#d10b22' : '#72502a'} /><stop offset=".52" stopColor={red ? '#a80013' : '#422a12'} /><stop offset="1" stopColor={red ? '#61000c' : '#291b0b'} /></linearGradient></defs>
      <rect x="2" y="2" width="436" height="78" rx="8" fill={`url(#${id})`} stroke={red ? '#f15c60' : '#efc477'} strokeWidth="2" />
      <rect x="6" y="6" width="428" height="70" rx="5" stroke={red ? '#6a0011' : '#9e6c31'} />
      <path d="M9 20V9h14M9 15h6V9M431 20V9h-14m14 6h-6V9M9 62v11h14M9 67h6v6m416-11v11h-14m14-6h-6v6" stroke={red ? '#e42b40' : '#d39a53'} strokeWidth="2" />
      {red && <path d="M330 13c55-15 82 10 65 23l-20-7 8 13-21 7 22 5-17 15c47-5 66-28 45-46l12-8-24 1c-18-18-40-12-70-3Z" fill="#fa3144" opacity=".16" />}
    </svg>
    <span className="flex w-full min-w-0 items-center gap-[5cqw] px-[12cqw] compact:gap-[4cqw] compact:px-[7cqw]">
    <svg aria-hidden="true" viewBox="0 0 48 48" className="pointer-events-none size-[11cqw] compact:size-[15cqw] shrink-0 text-[#fff0cf]" fill="currentColor">
      {red ? <><path d="m6 3 6 2 21 24-5 5L7 10Zm36 0-6 2-21 24 5 5 21-24ZM9 27l12 12-4 4L5 31Zm30 0L27 39l4 4 12-12ZM8 35l5 5-6 6-5-5Zm32 0-5 5 6 6 5-5Z" /></> : <path fillRule="evenodd" d="m20 2 8 0 2 6 5 2 6-2 5 8-4 5v6l4 5-5 8-6-2-5 2-2 6h-8l-2-6-5-2-6 2-5-8 4-5v-6l-4-5 5-8 6 2 5-2Zm4 12a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />}
    </svg>
    <span className="min-w-0 flex-1 whitespace-nowrap text-center font-body text-[5.5cqw] compact:text-[6.7cqw] font-bold leading-tight text-[#fff0d1] [text-shadow:0_1px_2px_#251006]">{children}</span>
    </span>
  </button>
}
