import { useEffect, useRef } from 'react'
import { lobbyButton } from '../../../lib/uiClasses'

export function PlayerNameValidationDialog({ message, onClose }: { message: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (message && !ref.current?.open) ref.current?.showModal()
    if (!message && ref.current?.open) ref.current.close()
  }, [message])
  return <dialog ref={ref} aria-label="Thông báo tên người chơi" onCancel={onClose} className="m-auto rounded-xl border-2 border-[#bd914e] bg-[#382717] p-6 text-center text-[#f6cf87] shadow-2xl backdrop:bg-black/60">
    <p>{message}</p><button autoFocus type="button" className={`${lobbyButton} mt-5 px-6 py-2`} onClick={onClose}>OK</button>
  </dialog>
}
