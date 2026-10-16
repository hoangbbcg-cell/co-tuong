import { useEffect, useRef, useState } from 'react'
import { loadPositionImage, recognizePosition, type ImagePoint } from '../positionImage'
import type { Board } from '../../../types/game'
import { buttonInteraction } from '../../../lib/uiClasses'

interface Props { file: File; onClose: () => void; onImport: (board: Board) => void }
export function PositionImageDialog({ file, onClose, onImport }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [source] = useState(() => URL.createObjectURL(file))
  const [points, setPoints] = useState<ImagePoint[]>([])
  const [flipped, setFlipped] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const mounted = useRef(true)
  useEffect(() => {
    mounted.current = true; dialog.current?.showModal()
    return () => { mounted.current = false; URL.revokeObjectURL(source) }
  }, [source])
  const button = `${buttonInteraction} rounded border border-[#c99044] bg-[#513014] px-4 py-2 font-heading text-lg disabled:opacity-50`
  return <dialog ref={dialog} onCancel={onClose} className="m-auto max-h-[92dvh] w-[min(800px,95vw)] overflow-y-auto rounded-lg border-2 border-[#d39a43] bg-[#170d07] p-4 text-[#ffebbd] backdrop:bg-black/80" aria-label="Tạo bàn cờ từ ảnh">
    <header className="flex items-center justify-between"><h2 className="font-heading text-2xl">Tạo bàn cờ từ ảnh</h2><button type="button" aria-label="Đóng" className={button} onClick={onClose}>×</button></header>
    <p className="my-2">Bấm giao điểm trên trái, rồi giao điểm dưới phải (không chọn mép khung). Hỗ trợ ảnh rõ dùng bộ quân hiện tại; hãy kiểm tra lại kết quả.</p>
    <div className="relative mx-auto w-fit max-w-full cursor-crosshair">
      <img src={source} alt="Ảnh thế cờ cần đọc" className="block max-h-[60dvh] max-w-full object-contain" onClick={event => {
        if (busy) return
        const rect = event.currentTarget.getBoundingClientRect()
        const point = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height }
        setPoints(points => points.length === 2 ? [point] : [...points, point]); setError('')
      }} />
      {points.map((point, index) => <span key={index} className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-red-600" style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }} />)}
    </div>
    <label className="my-3 flex items-center gap-2"><input type="checkbox" checked={flipped} onChange={event => setFlipped(event.target.checked)} disabled={busy} />Ảnh có quân Đỏ ở phía trên</label>
    {error && <p role="alert" className="mb-3 text-[#ffb7a5]">{error}</p>}
    <div className="flex justify-end gap-3"><button type="button" className={button} disabled={busy} onClick={() => setPoints([])}>Chọn lại</button><button type="button" className={button} disabled={points.length !== 2 || busy} onClick={async () => {
      setBusy(true); setError('')
      try {
        const image = await loadPositionImage(source)
        if (image.naturalWidth * image.naturalHeight > 32_000_000) throw new Error('Ảnh quá lớn. Hãy thu nhỏ xuống dưới 32 megapixel.')
        const convert = (point: ImagePoint) => ({ x: point.x * image.naturalWidth, y: point.y * image.naturalHeight })
        const board = await recognizePosition(image, convert(points[0]), convert(points[1]), flipped)
        if (mounted.current) { onImport(board); onClose() }
      } catch (error) { if (mounted.current) setError(error instanceof Error ? error.message : 'Không đọc được ảnh.') }
      finally { if (mounted.current) setBusy(false) }
    }}>{busy ? 'Đang đọc ảnh…' : 'Đọc thế cờ'}</button></div>
  </dialog>
}
