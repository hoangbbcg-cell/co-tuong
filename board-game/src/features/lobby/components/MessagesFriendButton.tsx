import { NoticeOverlay } from './NoticeOverlay'
import { confirmationCancelButton, confirmationAcceptButton } from '../../../lib/confirmationButtonStyles'
import { confirmationDialogFrame, confirmationDialogTitle, confirmationDialogDescription, confirmationDialogActions, confirmationDialogOverlay } from '../../../lib/confirmationDialogStyles'
import type { MouseEvent, ReactNode } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'
import { NumberText } from '../../../lib/NumberText'

export function ConfirmationName({ name }: { name: string }) {
  return <NumberText text={name} compact weight="normal" soften={false} />
}

export function MessagesFriendButton({ name, isFriend, pending, incoming = false, onClick }: {
  name: string; isFriend: boolean; pending: boolean; incoming?: boolean; onClick: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  const label = isFriend ? 'Xóa bạn' : incoming ? 'Chấp nhận' : pending ? 'Hủy lời mời kết bạn' : 'Kết bạn'
  return <button data-ui-selection-sound type="button" onClick={onClick} title={label} aria-label={`${label} với ${name}`} aria-pressed={pending} className={`${buttonInteraction} m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none`}>
    <svg aria-hidden="true" viewBox="0 0 42 42" className={`block size-[var(--ui-p-42)] ${pending && !isFriend ? 'opacity-50' : ''}`} fill="none">
      <circle cx="21" cy="21" r="20" fill="#4a2a0d" stroke="#e7b755" strokeWidth="1.25" />
      <g fill="#f1ce72"><circle cx="17" cy="14" r="4" /><path d="M9 29a8 8 0 0 1 16 0Z" /></g>
      <path d={isFriend ? 'M26 22h7' : 'M26 22h7M29.5 18.5v7'} stroke="#f1ce72" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </button>
}

export function MessagesFriendRemovalConfirmation({ name, onCancel, onConfirm, message, pending = false, error }: {
  name: string; skip: boolean; onSkipChange: (value: boolean) => void; onCancel: () => void; onConfirm: () => void
  message?: ReactNode; showSkip?: boolean; pending?: boolean; error?: string
}) {
  const actionClass = 'min-w-0 w-full px-3 py-3 whitespace-nowrap disabled:opacity-50'
  return <NoticeOverlay onDismiss={() => { if (!pending) onCancel() }} className={confirmationDialogOverlay} onKeyDown={event => {
    if (event.key !== 'Tab') return
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button,input')
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }}>
    <section role="alertdialog" aria-modal="true" aria-labelledby="message-friend-removal-title" aria-describedby="message-friend-removal-description" className={confirmationDialogFrame}>
      <h2 id="message-friend-removal-title" className={confirmationDialogTitle}>Xác nhận</h2>
      <p id="message-friend-removal-description" className={confirmationDialogDescription}>{message ?? <>Bạn có chắc muốn xóa bạn với <ConfirmationName name={name} /> không?</>}</p>
      {error && <p role="alert" className="mt-3 text-center text-sm text-[#ffac80]">{error}</p>}
      <div className={confirmationDialogActions}><button data-ui-selection-sound type="button" disabled={pending} className={`${confirmationCancelButton} ${actionClass}`} onClick={onCancel}>Hủy</button><button data-ui-selection-sound type="button" disabled={pending} autoFocus className={`${confirmationAcceptButton} ${actionClass}`} onClick={onConfirm}>Đồng ý</button></div>
    </section>
  </NoticeOverlay>
}
