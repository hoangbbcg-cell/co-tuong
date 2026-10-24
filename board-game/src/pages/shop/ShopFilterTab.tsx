import { useId } from 'react'
import { buttonInteraction } from '../../lib/uiClasses'

export function ShopFilterTab({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  const id = useId().replace(/:/g, '')
  return <button type="button" role="tab" aria-selected={selected} onClick={onClick} className={`${buttonInteraction} relative isolate flex min-w-0 items-center justify-center border-0 bg-transparent p-0 transition-[filter,translate] duration-150 hover:brightness-110 active:translate-y-px active:brightness-90 motion-reduce:transition-none compact:group compact:overflow-hidden compact:rounded-lg compact:border compact:px-1 compact:transition-[filter] compact:duration-150 compact:active:translate-y-0 compact:active:scale-100 compact:active:brightness-100 compact:enabled:hover:brightness-110 compact:focus-visible:outline-2 compact:focus-visible:outline-offset-2 compact:focus-visible:outline-[#ffe3a0] ${selected ? 'text-[#321700] compact:text-[#fff0c4] compact:border-[#c69a54] compact:bg-[linear-gradient(180deg,#8a652e,#604019)] compact:shadow-[inset_0_1px_0_#b7895266,0_2px_3px_#10070388] compact:[filter:brightness(1.1)_saturate(1.3)_drop-shadow(0_0_1px_#ffcf38)_drop-shadow(0_0_4px_#ffad16)] compact:z-10' : 'text-[#edca8b] compact:border-[#ae783e] compact:bg-[linear-gradient(180deg,#654023,#35200f)] compact:shadow-[inset_0_1px_0_#b7895266,0_2px_3px_#10070388]'}`}>
    <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 block size-full overflow-visible compact:hidden" aria-hidden="true">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={selected ? '#ffeda4' : '#3b1d09'} /><stop offset="0.5" stopColor={selected ? '#ffd56b' : '#251105'} /><stop offset="1" stopColor={selected ? '#ffb93e' : '#170b03'} />
      </linearGradient></defs>
      <path d="M12 2H288L298 13L295 30L298 47L288 58H12L2 47L5 30L2 13Z" fill={`url(#${id})`} stroke={selected ? '#ffe6a3' : '#a56b29'} strokeWidth={selected ? 2 : 1.4} />
      <path d="M15 6H285L293 15L290 30L293 45L285 54H15L7 45L10 30L7 15Z" fill="none" stroke={selected ? '#fff2b8' : '#623913'} strokeWidth="1" />
      {selected && <path d="M17 8H283M17 52H283" fill="none" stroke="#fff6c9" strokeWidth="1.5" />}
    </svg>
    <span aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-0 hidden h-px bg-[linear-gradient(90deg,transparent,#fff1c4,transparent)] compact:block" />
    <span lang="vi" className="block whitespace-nowrap px-3 font-heading text-[clamp(14px,1.3vw,20px)] font-bold leading-tight tracking-normal [font-kerning:normal] [word-spacing:normal] compact:px-1 compact:text-[14px] compact:font-extrabold">{label.normalize('NFC')}</span>
  </button>
}
