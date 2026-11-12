import { useEffect, useRef, useState } from 'react'
import { useAudioSettingsStore } from '../../../store/audioSettingsStore'
import { homeUtilityButton } from '../../../lib/uiClasses'
import type { useHomeMusic } from '../hooks/useHomeMusic'
import { HomeIcon } from './HomeIcon'
import { canControlHovangWatermark, readHovangWatermark, writeHovangWatermark } from '../../../lib/hovangBrandEntitlement'
import { useSessionStore } from '../../../store/sessionStore'
import { useAiControlsHidden, writeAiControlsHidden } from '../../../lib/aiControlsPreference'

export function HomeSettings({ music, onError, placement = 'below', buttonClassName = homeUtilityButton }: { music: ReturnType<typeof useHomeMusic>; onError: () => void; placement?: 'above' | 'below'; buttonClassName?: string }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const muted = useAudioSettingsStore(state => state.muted)
  const toggleMuted = useAudioSettingsStore(state => state.toggleMuted)
  const account = useSessionStore(state => state.account)
  const publicId = account?.publicId
  const aiHidden = useAiControlsHidden()
  const watermarkAllowed = canControlHovangWatermark(publicId, account?.hovangWatermarkControl)
  const [watermarkVisible, setWatermarkVisible] = useState(() => publicId ? readHovangWatermark(publicId) : true)
  useEffect(() => { if (publicId) setWatermarkVisible(readHovangWatermark(publicId)) }, [publicId])
  useEffect(() => {
    if (!open) return
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false) }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); root.current?.querySelector('button')?.focus() } }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
  }, [open])
  const row = 'grid min-h-[52px] w-full grid-cols-[32px_minmax(0,1fr)_16px] items-center gap-3 whitespace-nowrap rounded px-3 py-3 text-left font-body text-[17px] font-normal leading-[1.15] text-[#ffe535] hover:bg-[#805100]'
  return <div ref={root} className="relative" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
    <button type="button" data-ui-selection-sound className={buttonClassName} aria-label="Cài đặt" title="Cài đặt" aria-expanded={open} onClick={() => setOpen(value => !value)}><HomeIcon name="settings" /></button>
    {open && <div role="group" aria-label="Cài đặt âm thanh" className={`absolute right-0 z-50 min-w-[235px] rounded border-2 border-[#d8ac35] bg-[#30271e] p-1 shadow-xl ${placement === 'above' ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
      <button type="button" data-ui-tab-sound className={row} aria-pressed={!music.playing} onClick={() => void music.toggle().catch(onError)}><HomeIcon name={music.playing ? 'sound' : 'muted'} /><span className="flex-1">Tắt nhạc nền</span><span aria-hidden="true">{!music.playing ? '✓' : ''}</span></button>
      <button type="button" data-ui-tab-sound className={row} aria-pressed={muted} onClick={toggleMuted}><HomeIcon name="music" /><span className="flex-1">Tắt tiếng</span><span aria-hidden="true">{muted ? '✓' : ''}</span></button>
      {watermarkAllowed && <button type="button" data-ui-tab-sound className={row} aria-pressed={!watermarkVisible} onClick={() => { const next = !watermarkVisible; setWatermarkVisible(next); if (publicId) writeHovangWatermark(publicId, next); window.dispatchEvent(new Event('hovang-watermark-changed')) }}><HomeIcon name="crown" /><span>Bỏ logo</span><span aria-hidden="true" className="text-center">{!watermarkVisible ? '✓' : ''}</span></button>}
      {account?.aiControlsControl === true && publicId && <button type="button" data-ui-tab-sound className={row} aria-pressed={aiHidden} onClick={() => writeAiControlsHidden(publicId, !aiHidden)}><HomeIcon name="ai-off" /><span>Bỏ AI</span><span aria-hidden="true" className="text-center">{aiHidden ? '✓' : ''}</span></button>}
    </div>}
  </div>
}
