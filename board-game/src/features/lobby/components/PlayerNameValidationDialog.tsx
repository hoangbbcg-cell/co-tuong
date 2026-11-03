import { useEffect, useRef } from 'react'
import { oneChoiceNoticeDialog, oneChoiceNoticeButton } from './OneChoiceNoticeStyles'

export function PlayerNameValidationDialog({ message, onClose }: { message: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (message && !ref.current?.open) ref.current?.showModal()
    if (!message && ref.current?.open) ref.current.close()
  }, [message])
  return <dialog ref={ref} aria-label="Thông báo tên người chơi" onCancel={onClose} className={`${oneChoiceNoticeDialog} backdrop:bg-black/60`}>
    <p>{message}</p><button autoFocus type="button" className={oneChoiceNoticeButton} onClick={onClose}>OK</button>
  </dialog>
}
