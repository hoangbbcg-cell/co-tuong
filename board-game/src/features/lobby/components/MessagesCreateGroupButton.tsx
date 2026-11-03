import { forwardRef, useId, type ButtonHTMLAttributes, type CSSProperties } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import groupButton from '../../../assets/messages/group-button.png'
import groupFrame from '../../../assets/messages/create-group-frame.png'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  compact: boolean
  width?: number
  height?: number
  iconSize?: number
  labelSize?: number
}

export const MessagesCreateGroupButton = forwardRef<HTMLButtonElement, Props>(function MessagesCreateGroupButton({ compact, width = 148, height = 46, iconSize = 24, labelSize = 17, className = '', style, ...props }, ref) {
  const iconGradient = useId()
  const dimensions: CSSProperties | undefined = compact ? { width, height, ...style } : style
  return <button {...props} ref={ref} type="button" aria-label="Tạo nhóm" style={dimensions} className={`${buttonInteraction} relative isolate m-0 flex h-[var(--ui-p-56)] w-full max-w-full shrink-0 items-center justify-center border-0 bg-transparent p-0 leading-none ${className}`}>
    {compact ? <>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <CrispUiImage src={groupFrame} alt="" className="absolute max-w-none" style={{ width: `${2172 / 2076 * 100}%`, height: `${724 / 428 * 100}%`, left: `${-48 / 2076 * 100}%`, top: `${-132 / 428 * 100}%` }} />
      </span>
      <span className="absolute inset-x-[10px] flex min-w-0 items-center justify-center gap-[4px]">
        <svg aria-hidden="true" viewBox="0 0 40 32" style={{ width: iconSize, height: iconSize * 0.8 }} className="block shrink-0 overflow-visible" shapeRendering="geometricPrecision">
          <defs><linearGradient id={iconGradient} x1="0" y1="0" x2="0.7" y2="1"><stop offset="0" stopColor="#fff6bd"/><stop offset="0.42" stopColor="#ffe37b"/><stop offset="1" stopColor="#d99a28"/></linearGradient></defs>
          <g fill={`url(#${iconGradient})`} stroke="#a96916" strokeWidth="0.65" strokeLinejoin="round">
            <circle cx="8" cy="12" r="4.5"/><circle cx="32" cy="12" r="4.5"/>
            <path d="M1 28v-5a7 7 0 0 1 14 0v5q-7 2-14 0Zm24 0v-5a7 7 0 0 1 14 0v5q-7 2-14 0Z"/>
            <circle cx="20" cy="8" r="6"/>
            <path d="M10 29V23a10 10 0 0 1 20 0v6q-10 3-20 0Z"/>
          </g>
        </svg>
        <span style={{ fontSize: labelSize }} className="whitespace-nowrap font-[Georgia] font-bold leading-none text-[#ffe3a1] [text-shadow:0_1px_2px_#190904]">Tạo nhóm</span>
      </span>
    </> : <CrispUiImage src={groupButton} alt="" className="block h-full w-full object-fill" />}
  </button>
})
