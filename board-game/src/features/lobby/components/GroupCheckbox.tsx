import type { ChangeEventHandler } from 'react'

/** Keep the visible box stable while the hidden native input is disabled during saving. */
export function GroupCheckbox({checked,disabled,onChange,className='',role,'aria-label':ariaLabel}:{
  checked:boolean;disabled?:boolean;onChange:ChangeEventHandler<HTMLInputElement>;className?:string;role?:'switch';'aria-label'?:string
}){
  return <span className={'relative inline-grid size-[24px] shrink-0 place-items-center '+className}>
    <input type="checkbox" data-ui-tab-sound role={role} aria-label={ariaLabel} checked={checked} disabled={disabled} onChange={onChange} className="peer sr-only"/>
    <span aria-hidden="true" className={'pointer-events-none grid size-full place-items-center rounded-[3px] border peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#ffe2a1] '+(checked?'border-[#d8ac35] bg-[#d8ac35]':'border-[#b8b8b8] bg-white')}>
      <svg viewBox="0 0 24 24" className={'size-[20px] text-white '+(checked?'visible':'invisible')} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6"/></svg>
    </span>
  </span>
}
