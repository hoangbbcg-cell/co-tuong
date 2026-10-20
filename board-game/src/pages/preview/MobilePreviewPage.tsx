import { useEffect, useRef, useState } from 'react'
import { selectionPalette } from '../../lib/uiClasses'

const devices = [
  { name: 'Nhỏ', width: 360, height: 800 },
  { name: 'Tiêu chuẩn', width: 390, height: 844 },
  { name: 'Lớn', width: 430, height: 932 },
] as const

/** A real narrow viewport lets the existing app use its mobile layouts and media queries. */
export function MobilePreviewPage() {
  const [deviceIndex, setDeviceIndex] = useState(1)
  const [landscape, setLandscape] = useState(false)
  const [available, setAvailable] = useState({ width: 0, height: 0 })
  const stage = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const device = devices[deviceIndex]
  const width = landscape ? device.height : device.width
  const height = landscape ? device.width : device.height
  const shellWidth = width + 16
  const shellHeight = height + 16
  const scale = Math.max(0.1, Math.min(1, (available.width - 32) / shellWidth, (available.height - 32) / shellHeight))

  useEffect(() => {
    const element = stage.current
    if (!element) return
    const measure = () => setAvailable({ width: element.clientWidth, height: element.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const control = 'cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors'
  return <main className="fixed inset-0 flex min-h-0 flex-col bg-[#101b1a] font-body text-[#f6e2b5]" aria-label="Xem trước điện thoại">
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#79501e] bg-[#1d2925] px-5 py-3">
      <div>
        <h1 className="m-0 text-xl font-bold">Xem trước điện thoại</h1>
        <p className="m-0 mt-1 text-sm text-[#d6b982]">Bấm và sử dụng giao diện ngay trong khung điện thoại.</p>
      </div>
      <a href="/" className={`${control} border-[#79501e] text-[#ffe5a6] hover:bg-[#3e200e]`}>Về bản laptop</a>
    </header>
    <nav aria-label="Kích thước điện thoại" className="flex shrink-0 flex-wrap items-center justify-center gap-2 px-4 py-3">
      {devices.map((item, index) => <button key={item.name} type="button" aria-pressed={index === deviceIndex} onClick={() => setDeviceIndex(index)} className={`${control} ${index === deviceIndex ? `${selectionPalette.selected.border} ${selectionPalette.selected.surface} ${selectionPalette.selected.text}` : 'border-[#79501e] bg-[#1c0e07] text-[#d6b982] hover:bg-[#3e200e]'}`}>
        {item.name} <span className="font-number tabular-nums">{item.width} × {item.height}</span>
      </button>)}
      <button type="button" aria-pressed={landscape} onClick={() => setLandscape(value => !value)} className={`${control} border-[#79501e] hover:bg-[#3e200e]`}>Xoay {landscape ? 'dọc' : 'ngang'}</button>
      <button type="button" onClick={() => frame.current?.contentWindow?.location.reload()} className={`${control} border-[#79501e] hover:bg-[#3e200e]`}>Tải lại</button>
    </nav>
    <div ref={stage} className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
      {available.width > 0 && <div className="relative shrink-0" style={{ width: shellWidth * scale, height: shellHeight * scale }}>
        <div className="absolute top-0 left-0 overflow-hidden rounded-[32px] border-[8px] border-[#060c0c] bg-black shadow-[0_16px_60px_#0009]" style={{ width: shellWidth, height: shellHeight, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <iframe ref={frame} title="Giao diện Cờ Tướng trên điện thoại" src="/" className="m-0 block border-0 bg-[#193932] p-0" style={{ width, height }} allowFullScreen />
        </div>
      </div>}
    </div>
    <footer className="shrink-0 px-4 py-2 text-center text-sm text-[#d6b982]">
      <span className="font-number tabular-nums">{width} × {height} px · {Math.round(scale * 100)}%</span> · Tự vừa màn hình laptop
    </footer>
  </main>
}
