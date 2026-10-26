import { useEffect, useRef } from 'react'
import type { HTMLAttributes } from 'react'

/** Native top layer escapes scaled/clipped parent dialogs while retaining theme tokens. */
export function NoticeOverlay({ onDismiss, children, ...props }: HTMLAttributes<HTMLDialogElement> & { onDismiss?: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog?.open) dialog?.showModal()
    return () => { if (dialog?.open) dialog.close() }
  }, [])
  return <dialog {...props} ref={ref} onClose={event => event.stopPropagation()} onCancel={event => { event.preventDefault(); event.stopPropagation(); onDismiss?.() }} style={{ position: 'fixed', inset: 0, margin: 0, width: '100vw', height: '100dvh', maxWidth: 'none', maxHeight: 'none', border: 0, transform: 'none', ...props.style }} className={`${props.className ?? ''} backdrop:bg-transparent`}>
    {children}
  </dialog>
}
