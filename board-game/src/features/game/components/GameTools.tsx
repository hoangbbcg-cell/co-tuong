import { gameUtilityButton } from '../../../lib/uiClasses'

interface Props {
  playing: boolean
  onCamera: () => void
  onSound: () => void
  onFullscreen: () => void
}

export function GameTools({ playing, onCamera, onSound, onFullscreen }: Props) {
  const icon = 'size-8 [filter:drop-shadow(1px_2px_1px_#392300)]'
  return <div className="pointer-events-auto ml-auto flex shrink-0 gap-3" role="group" aria-label="Tiện ích bàn cờ">
    <button type="button" className={gameUtilityButton} aria-label="Chụp hình" onClick={onCamera}>
      <svg viewBox="0 0 32 32" className={icon} aria-hidden="true"><path fill="currentColor" d="M4 8h6l2-4h8l2 4h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" /><circle cx="16" cy="17" r="7" fill="#68420b" /><circle cx="16" cy="17" r="4.5" fill="currentColor" /><path d="M5 11h4" stroke="#fff49a" strokeWidth="2" /></svg>
    </button>
    <button type="button" className={gameUtilityButton} aria-label={playing ? 'Tắt âm thanh' : 'Bật âm thanh'} aria-pressed={playing} onClick={onSound}>
      <svg viewBox="0 0 32 32" className={icon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h6l8-7v24l-8-7H3Z" fill="currentColor" strokeWidth="1" />{playing ? <path d="M22 10q5 6 0 12m4-16q8 10 0 20" /> : <path d="m22 12 8 8m0-8-8 8" />}</svg>
    </button>
    <button type="button" className={gameUtilityButton} aria-label="Toàn màn hình" onClick={onFullscreen}>
      <svg viewBox="0 0 32 32" className={icon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="round"><path d="M5 12V5h7m8 0h7v7m0 8v7h-7m-8 0H5v-7M5 5l8 8m14-8-8 8m8 14-8-8M5 27l8-8" /></svg>
    </button>
  </div>
}
