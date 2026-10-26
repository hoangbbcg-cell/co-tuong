import { useEffect, useRef } from 'react'
import { buttonInteraction, shopMobileDialogFrameClass } from '../../lib/uiClasses'
import { AvatarPortrait } from '../../features/lobby/components/AvatarCustomization'
import { useSessionStore } from '../../store/sessionStore'

export function ShopAvatarPreview({ name, image, kind = 'avatar', onClose }: { name: string; image: string; kind?: 'avatar' | 'frame'; onClose: () => void }) {
  const avatarIndex = useSessionStore(state => state.avatarIndex)
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (!ref.current?.open) ref.current?.showModal() }, [])
  return <dialog ref={ref} aria-labelledby="shop-avatar-preview-title" onCancel={event => { event.preventDefault(); onClose() }} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} className={`${shopMobileDialogFrameClass} m-auto w-[min(480px,90vw)] max-h-[90dvh] overflow-y-auto rounded-xl border-2 border-[#bd914e] bg-[#302015] p-5 text-[#ffe6b0] backdrop:bg-black/65`}>
    <h2 id="shop-avatar-preview-title" className="mb-4 text-center font-heading text-2xl font-bold">{name}</h2>
    {kind === 'frame' ? <div className="relative mx-auto aspect-square w-full">
      <div className="absolute inset-[10%] overflow-hidden rounded-full"><AvatarPortrait avatarIndex={avatarIndex} className="size-full rounded-full" /></div>
      <img src={image} alt={name} className="pointer-events-none absolute inset-0 size-full object-contain" />
    </div> : <img src={image} alt={name} className="mx-auto aspect-square w-full rounded-full object-cover" />}
    <div className="mt-4 text-center"><button autoFocus type="button" onClick={onClose} className={`${buttonInteraction} rounded-lg border border-[#c99044] bg-[#4a3020] px-6 py-2 text-lg`}>Đóng</button></div>
  </dialog>
}
