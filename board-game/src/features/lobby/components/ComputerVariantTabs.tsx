import xiangqiTab from '../../../assets/rankings/ranking-xiangqi-tab-user.png'
import jieqiTab from '../../../assets/rankings/ranking-hidden-tab-user.png'
import { buttonInteraction, selectedImageTabGlow } from '../../../lib/uiClasses'

type Variant = 'xiangqi' | 'jieqi'

export function ComputerVariantTabs({
  variant,
  onChange,
  disabled,
  gapClass = 'gap-2',
}: {
  variant: Variant
  onChange: (value: Variant) => void
  disabled: boolean
  gapClass?: string
}) {
  return (
    <div
      role="group"
      aria-label="Chọn loại cờ đấu với máy"
      className={`mx-auto flex w-full max-w-[400px] items-center justify-center ${gapClass} compact:max-w-[290px]`}
    >
      {(['xiangqi', 'jieqi'] as const).map(value => (
        <button
          key={value}
          type="button"
          data-ui-selection-sound
          aria-label={value === 'xiangqi' ? 'Cờ Tướng' : 'Cờ Úp'}
          aria-pressed={variant === value}
          disabled={disabled}
          onClick={() => onChange(value)}
          className={`${buttonInteraction} relative block h-[46px] w-[172px] max-w-[48%] shrink-0 border-0 bg-transparent p-0 transition-[filter] duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[#ffe4a6] disabled:opacity-50 compact:h-[34px] compact:w-[128px]`}
        >
          <img
            src={value === 'xiangqi' ? xiangqiTab : jieqiTab}
            alt=""
            aria-hidden="true"
            className={`pointer-events-none block size-full object-contain ${variant === value ? selectedImageTabGlow : ''}`}
          />
        </button>
      ))}
    </div>
  )
}