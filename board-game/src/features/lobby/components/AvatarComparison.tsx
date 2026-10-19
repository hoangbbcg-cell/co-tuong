import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { SmallAvatarPortrait } from '../../../lib/SmallAvatarPortrait'

const sources = import.meta.glob<string>('../../../assets/shop/avatars/ab-test/*.png', { eager: true, query: '?url', import: 'default' })

/** Isolated visual experiment: never equips an avatar or writes account data. */
export function AvatarComparison({ size, onClose }: { size: number; onClose: () => void }) {
  const [custom, setCustom] = useState<string>()
  const [details, setDetails] = useState<Record<string, string>>({})
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => () => { if (custom) URL.revokeObjectURL(custom) }, [custom])
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', key)
    return () => document.removeEventListener('keydown', key)
  }, [onClose])
  const inspect = () => {
    const next: Record<string, string> = {}
    root.current?.querySelectorAll<HTMLElement>('[data-sample]').forEach(sample => {
      const img = sample.querySelector('img')
      if (!img) return
      const rect = img.getBoundingClientRect()
      const problems: string[] = []
      for (let node: HTMLElement | null = img; node; node = node.parentElement) {
        const css = getComputedStyle(node)
        if (css.filter !== 'none' && css.filter) problems.push('filter: ' + css.filter)
        if (css.transform !== 'none' && css.transform) problems.push('transform: ' + css.transform)
        if (css.scale && css.scale !== 'none' && css.scale !== '1') problems.push('scale: ' + css.scale)
      }
      const sourcePixels = (img.currentSrc || img.src).match(/-(\d+)(?:-[\w-]+)?\.png/)?.[1]
      next[sample.dataset.sample ?? ''] = `${rect.width}×${rect.height} CSS px · nguồn ${sourcePixels ? `${sourcePixels}px` : `${img.naturalWidth}×${img.naturalHeight}`} · ${getComputedStyle(img).objectFit || 'cover'} · ${problems.join('; ') || 'không filter/transform'}${Number.isInteger(rect.width) && Number.isInteger(rect.height) ? '' : ' · CẢNH BÁO kích thước lẻ'}`
    })
    setDetails(next)
  }
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(inspect)
    if (root.current) observer.observe(root.current)
    return () => observer.disconnect()
  }, [])
  const path = (pixels: number) => sources[`../../../assets/shop/avatars/ab-test/lao-quan-su-${pixels}.png`]
  return createPortal(<div className="fixed inset-0 z-[10000] overflow-auto bg-black/90 p-4 text-[#f8dea6]" role="dialog" aria-modal="true" aria-label="So sánh độ nét avatar A/B/C">
    <div ref={root} className="mx-auto max-w-4xl rounded-xl border border-[#b78035] bg-[#29150b] p-4">
      <button type="button" onClick={onClose} className="float-right rounded border border-[#b78035] px-3 py-1">Đóng</button>
      <h2 className="text-xl font-bold">Lão quân sư — A/B/C</h2>
      <p className="my-3">Cùng ô {size}×{size} px lấy từ xem trước trong game (làm tròn). DPR: {window.devicePixelRatio}. Không phóng khi so sánh.</p>
      <div className="flex flex-wrap items-start gap-6">
        {['A', 'B', 'C'].map(label => <section key={label} className="min-w-0 flex-1 basis-48">
          <h3 className="mb-2 font-bold">{label} — {label === 'A' ? 'Pipeline hiện tại' : label === 'B' ? 'Lanczos3 + sharpen nhẹ' : 'Ảnh small-avatar mới'}</h3>
          <div data-sample={label} onLoadCapture={inspect} style={{ width: size, height: size, filter: 'none', transform: 'none' }} className="overflow-hidden rounded-full">
            {label === 'A' ? <SmallAvatarPortrait avatarIndex={16} className="size-full rounded-full" /> : label === 'B' ? path(size) && path(size * 2) ? <img alt="B: Lão quân sư" src={path(size)} srcSet={`${path(size)} 1x, ${path(size * 2)} 2x`} width={size} height={size} className="block size-full rounded-full object-cover" /> : <p>Chưa có nguồn B cho kích thước này.</p> : custom ? <img src={custom} alt="C: ảnh được cung cấp" width={size} height={size} className="block size-full rounded-full object-cover" /> : <div className="grid size-full place-items-center border border-dashed border-[#b78035] text-center text-sm">Chờ ảnh C</div>}
          </div>
          <p className="mt-3 break-words text-xs">{details[label]}</p>
        </section>)}
      </div>
      <label className="mt-5 block">C: Chọn ảnh thiết kế lại để thử, không lưu vào tài khoản<input type="file" accept="image/png,image/jpeg,image/webp" className="mt-2 block max-w-full" onChange={event => { const file = event.target.files?.[0]; if (file) setCustom(URL.createObjectURL(file)) }} /></label>
      <p className="mt-3 text-sm">B: nguồn 1x/2x, unsharp mask 20% sau resize. C giữ nguyên nguồn bạn chọn, chưa xử lý. Chưa áp dụng kết quả cho avatar khác.</p>
    </div>
  </div>, document.body)
}
