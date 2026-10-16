import type { MouseEvent } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'

export function MessagesFriendButton({ name, isFriend, pending, incoming = false, onClick }: {
  name: string; isFriend: boolean; pending: boolean; incoming?: boolean; onClick: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  const label = isFriend ? 'Xóa bạn' : incoming ? 'Chấp nhận' : pending ? 'Hủy lời mời kết bạn' : 'Kết bạn'
  return <button type="button" onClick={onClick} title={label} aria-label={`${label} với ${name}`} aria-pressed={pending} className={`${buttonInteraction} m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none`}>
    <svg aria-hidden="true" viewBox="0 0 42 42" className={`block size-[var(--ui-p-42)] ${pending && !isFriend ? 'opacity-50' : ''}`} fill="none">
      <circle cx="21" cy="21" r="20" fill="#4a2a0d" stroke="#e7b755" strokeWidth="1.25" />
      <g fill="#f1ce72"><circle cx="17" cy="14" r="4" /><path d="M9 29a8 8 0 0 1 16 0Z" /></g>
      <path d={isFriend ? 'M26 22h7' : 'M26 22h7M29.5 18.5v7'} stroke="#f1ce72" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </button>
}

export function MessagesFriendRemovalConfirmation({ name, skip, onSkipChange, onCancel, onConfirm }: {
  name: string; skip: boolean; onSkipChange: (value: boolean) => void; onCancel: () => void; onConfirm: () => void
}) {
  const actionClass = `${buttonInteraction} min-w-[var(--ui-p-210,210px)] rounded-[var(--ui-p-12,12px)] border-2 border-[#e3a74c] bg-[linear-gradient(135deg,#734016,#261207_62%,#59260f)] px-6 py-3 text-lg font-bold text-[#ffebba] shadow-[inset_0_0_0_2px_#4b200b,inset_0_0_0_4px_#bd772c,0_3px_4px_#14080488] [text-shadow:0_2px_2px_#291207] hover:brightness-110`
  return <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-5" onKeyDown={event => {
    if (event.key !== 'Tab') return
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button,input')
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }}>
    <section role="alertdialog" aria-modal="true" aria-labelledby="message-friend-removal-title" className="relative w-full max-w-[var(--ui-p-420,420px)] rounded-[var(--ui-p-14,14px)] border-2 border-[#c58a35] bg-[linear-gradient(135deg,#3b1d0b,#1b100b)] p-5 text-center text-[#ffe3a2] shadow-[inset_0_0_0_2px_#7d451b,inset_0_0_22px_#120904,0_2px_4px_#14080499]">
      <p id="message-friend-removal-title" className="mb-5 text-lg">Bạn có chắc muốn xóa bạn với {name} không?</p>
      <div className="flex justify-center gap-3"><button type="button" className={actionClass} onClick={onCancel}>Hủy</button><button type="button" autoFocus className={actionClass} onClick={onConfirm}>Đồng ý</button></div>
    </section>
    <label className="absolute bottom-5 right-5 flex cursor-pointer items-center gap-2 text-sm text-[#ffe3a2]"><input type="checkbox" checked={skip} onChange={event => onSkipChange(event.target.checked)} className="size-4 accent-[#d9a44c]" />Không hiển thị lại</label>
  </div>
}
