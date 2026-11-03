import { NoticeOverlay } from './NoticeOverlay'

export function MessageImagePreview({ src, onClose }: { src: string; onClose: () => void }) {
  return <NoticeOverlay onDismiss={onClose} aria-label="Xem ảnh trong tin nhắn" style={{ zoom: 1 }} className="grid place-items-center overflow-hidden bg-black/75 p-4 backdrop:backdrop-blur-md" onPointerDown={event => event.stopPropagation()} onClick={event => { event.stopPropagation(); if (event.target === event.currentTarget) onClose() }}>
    <button autoFocus type="button" aria-label="Đóng ảnh" onClick={onClose} className="absolute right-4 top-4 z-10 grid size-12 cursor-pointer place-items-center rounded-full border border-white/40 bg-black/60 text-4xl leading-none text-white hover:bg-black/80">×</button>
    <img src={src} alt="Ảnh phóng to trong hội thoại" className="block h-auto max-h-[calc(100dvh-96px)] w-auto max-w-[calc(100vw-32px)] object-contain" />
  </NoticeOverlay>
}
