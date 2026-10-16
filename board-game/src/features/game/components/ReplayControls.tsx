import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { useReplayPlayback } from '../hooks/useReplayPlayback'
import type { useReplayTrial } from '../hooks/useReplayTrial'
import { buttonInteraction, selectionPalette } from '../../../lib/uiClasses'
import playButton from '../../../assets/history/controls-play-v2.png'
import controlFrame from '../../../assets/history/controls-frame-v2.png'
import backButton from '../../../assets/history/controls-back-v2.png'
import countFrame from '../../../assets/history/controls-count-v2.png'
import forwardButton from '../../../assets/history/controls-forward-v2.png'
import machineButton from '../../../assets/history/controls-machine-v2.png'
import analysisButton from '../../../assets/history/controls-analysis-v2.png'
import hintButton from '../../../assets/history/controls-hint-v2.png'
import resetButton from '../../../assets/history/controls-reset-v2.png'
import replayFlipIcon from '../../../assets/history/replay-flip.png'

function ArtworkButton({ src, children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { src: string }) {
  return <button type="button" {...props} className={`${buttonInteraction} group relative m-0 overflow-hidden border-0 bg-transparent p-0 leading-none shadow-none disabled:cursor-default disabled:opacity-100 ${className}`}>
    <img src={src} alt="" className={`pointer-events-none m-0 block size-full border-0 p-0 ${props.disabled ? 'brightness-[0.35]' : ''}`} />{children}
  </button>
}
function ControlFrame({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-col gap-[10px] border-[10px] border-transparent" style={{ borderImageSource: `url(${controlFrame})`, borderImageSlice: '70 fill', borderImageWidth: '10px' }}>{children}</div>
}
function NavigationButton({ forward = false, disabled, onClick }: { forward?: boolean; disabled: boolean; onClick: () => void }) {
  return <ArtworkButton src={forward ? forwardButton : backButton} aria-label={forward ? 'Nước sau' : 'Nước trước'} aria-keyshortcuts={forward ? 'ArrowRight' : 'ArrowLeft'} disabled={disabled} onClick={onClick} className="h-[45.6px] w-[52.8px] rounded-[15%]">
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 group-enabled:group-hover:bg-[#ffe08b]/[0.08]" />
  </ArtworkButton>
}
export function ReplayModeButton({ active, onClick, className = '' }: { active: boolean; onClick: () => void; className?: string }) {
  const label = active ? 'Về xem lại' : 'Đánh thử'
  return <button type="button" aria-label={label} title={`${label} (Space)`} aria-keyshortcuts="Space" aria-pressed={active} onClick={onClick} className={`${buttonInteraction} m-0 h-fit w-fit border-0 bg-transparent p-0 leading-none shadow-none ${className}`}><img src={replayFlipIcon} alt="" className="m-0 block h-auto w-[84px] border-0 p-0 compact:w-[52px]" /></button>
}
function ToolArtworkButton({ src, busy = false, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { src: string; busy?: boolean }) {
  const hint = props['aria-label'] === 'Gợi ý'
  return <button type="button" {...props} aria-busy={busy || undefined} className={`group relative m-0 h-fit cursor-pointer border-0 bg-transparent p-0 leading-none shadow-none ${busy ? 'scale-[0.94]' : hint ? 'active:scale-[0.94]' : ''} ${className}`}>
    <img src={src} alt="" className={`pointer-events-none m-0 block h-auto w-full border-0 p-0 ${busy ? 'brightness-[0.35]' : hint ? 'group-active:brightness-[0.35]' : ''}`} />
    {!busy && <span aria-hidden="true" className={`pointer-events-none absolute inset-0 hidden bg-[#ffe08b]/[0.08] group-hover:block ${hint ? 'group-active:opacity-0' : ''}`} style={{ maskImage: `url(${src})`, maskSize: '100% 100%', maskRepeat: 'no-repeat' }} />}
  </button>
}
export function ReplayControls({ playback, trial, onToggleMode, onNotice, onHint, hintThinking = false }: { playback: ReturnType<typeof useReplayPlayback>; trial?: ReturnType<typeof useReplayTrial>; onToggleMode?: () => void; onNotice?: (message: string) => void; onHint?: () => void; hintThinking?: boolean }) {
  const practice = trial?.active ? trial : null
  const history = practice ?? playback
  return <nav aria-label={practice ? 'Điều khiển đánh thử' : 'Điều khiển xem lại'} className="relative z-20 flex w-[220px] shrink-0 flex-col items-center compact:w-full compact:max-w-[220px]">
    <ControlFrame>
      {!practice && <ArtworkButton src={playButton} title="Phát / Tạm dừng (Enter)" aria-keyshortcuts="Enter" onClick={playback.toggle} className="h-[45.6px] w-full hover:brightness-110">
        <span className="absolute inset-0 flex items-center justify-center gap-2 font-heading text-lg text-[#ffe5a6]">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="currentColor">{playback.playing ? <path d="M4 3h4v14H4Zm8 0h4v14h-4Z" /> : <path d="m5 2 13 8-13 8Z" />}</svg>{playback.playing ? 'Tạm dừng' : 'Phát'}
        </span>
      </ArtworkButton>}
      <div className="grid w-full grid-cols-[52.8px_minmax(0,1fr)_52.8px] items-center gap-[6px]">
        <NavigationButton disabled={history.step === 0} onClick={() => practice ? practice.back() : playback.seek(playback.step - 1)} />
        <span aria-label={`Nước ${history.step} trên ${history.total}`} className="relative flex h-[45.6px] min-w-0 items-center justify-center font-number text-lg leading-none lining-nums tabular-nums text-[#ffe5a6]">
          <img src={countFrame} alt="" className="pointer-events-none absolute inset-0 block size-full" /><span className="relative">{history.step}/{history.total}</span>
        </span>
        <NavigationButton forward disabled={history.step === history.total} onClick={() => history.seek(history.step + 1)} />
      </div>
      {practice && <ArtworkButton src={machineButton} aria-label="Máy đi" aria-keyshortcuts="Enter" aria-pressed={practice.machine} onClick={practice.toggleMachine} className={`h-[52px] w-full rounded-[12px] outline-none focus:outline-none focus-visible:outline-none transition-[transform,filter,box-shadow] duration-200 ${practice.machine ? 'scale-[1.03] brightness-125 ring-2 ring-[#ffe08b] shadow-[0_0_5px_2px_#ffe08b,0_0_15px_5px_#f8b73c99,inset_0_0_10px_2px_#f8b73c88]' : ''}`}>
        <span className="absolute inset-y-0 left-[34%] right-[8%] flex items-center justify-center whitespace-nowrap font-heading text-[17px] text-[#ffe5a6]">Máy đi · {practice.machine ? 'Bật' : 'Tắt'}</span>
      </ArtworkButton>}
    </ControlFrame>
    {practice && <div className="mt-[10px] grid w-full grid-cols-3 items-center gap-[10px]">
      {[{ label: 'Phân tích', image: analysisButton }, { label: 'Gợi ý', image: hintButton }].map(item => <ToolArtworkButton key={item.label} src={item.image} busy={item.label === 'Gợi ý' && hintThinking} aria-label={item.label} title={item.label === 'Gợi ý' && onHint ? 'Gợi ý nước đi bằng Ông Hoàng' : 'Đang phát triển'} onClick={() => item.label === 'Gợi ý' && onHint ? onHint() : onNotice?.('Đang phát triển')} className="w-full" />)}
      <ToolArtworkButton src={resetButton} aria-label="Reset thế thử ban đầu" title="Reset thế thử ban đầu (↑ / ↓)" aria-keyshortcuts="ArrowUp ArrowDown" onClick={practice.reset} className="w-full" />
    </div>}
    {onToggleMode && <ReplayModeButton active={!!practice} onClick={onToggleMode} className={practice ? 'mt-[20px]' : 'mt-[50px]'} />}
    {practice?.error && <><span role="alert" className="mt-2 text-center text-xs text-[#ffe5a6]">{practice.error}</span><button type="button" className={`${buttonInteraction} mt-2 h-10 w-full rounded-md border ${selectionPalette.selected.border} ${selectionPalette.selected.surface} ${selectionPalette.selected.text}`} onClick={practice.retry}>Thử lại</button></>}
  </nav>
}
