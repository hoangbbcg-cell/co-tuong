import { gameUtilityButton } from '../../../lib/uiClasses'
import { HomeIcon } from '../../lobby/components/HomeIcon'
import { GameBackIcon } from './GameBackIcon'
import { PositionIcon } from './PositionIcon'

interface Props {
  mobileMenuOpen?: boolean
  onLeave?: () => void
  showMobileChatSlot?: boolean
  playing: boolean
  showMatchTools?: boolean
  showSavePosition?: boolean
  showSaveMatch?: boolean
  onSavePosition: () => void
  onSave?: () => void
  savePositionDisabled?: boolean
  saveDisabled?: boolean
  saved?: boolean
  onFriends: () => void
  onSound: () => void
  onFullscreen: () => void
}

export function GameTools({ mobileMenuOpen = false, onLeave, showMobileChatSlot = false, playing, showMatchTools = true, showSavePosition = showMatchTools, showSaveMatch = showMatchTools, onSavePosition, onSave, savePositionDisabled = false, saveDisabled, saved, onFriends, onSound, onFullscreen }: Props) {
  const icon = 'size-8 [filter:drop-shadow(1px_2px_1px_#392300)]'
  return <div className="pointer-events-auto ml-auto flex shrink-0 gap-3 compact:ml-0 compact:flex-row-reverse compact:gap-[clamp(4px,calc((100vw-352px)/2),8px)] compact:justify-start" role="group" aria-label="Tiện ích bàn cờ">
    {showSaveMatch && <button type="button" className={gameUtilityButton + ' compact:order-2 compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label={saved ? 'Đã lưu ván đấu' : 'Lưu ván đấu'} title={saved ? 'Đã lưu ván đấu' : saveDisabled ? 'Ván kết thúc mới có thể lưu' : 'Lưu ván vừa kết thúc'} disabled={!onSave || saveDisabled || saved} onClick={onSave}><PositionIcon name="save" /></button>}
    {showSavePosition && <button type="button" className={gameUtilityButton + ' compact:hidden'} aria-label="Lưu thế cờ" title={savePositionDisabled ? 'Đi nước đầu tiên để lưu thế cờ' : 'Lưu thế cờ'} disabled={savePositionDisabled} onClick={onSavePosition}><PositionIcon name="save-position" /></button>}
    {showMobileChatSlot && <span aria-hidden="true" className="hidden desktop:hidden compact:order-1 compact:block compact:size-[42px]" />}
    <div id="mobile-game-tools" className={`desktop:contents compact:absolute compact:right-0 compact:bottom-[calc(42px+12px)] compact:top-auto compact:flex compact:gap-3 compact:rounded compact:border compact:border-[#d3a51a] compact:bg-[#3b2516] compact:p-3 ${mobileMenuOpen ? '' : 'compact:hidden'}`}>
    {onLeave && <button type="button" className={gameUtilityButton + ' desktop:hidden compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label="Rời phòng" onClick={onLeave}><GameBackIcon /></button>}
    {showMatchTools && <button type="button" className={gameUtilityButton + ' compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label="Bạn bè" onClick={onFriends}><HomeIcon name="friends" /></button>}
    <button type="button" className={gameUtilityButton + ' compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label={playing ? 'Tắt âm thanh' : 'Bật âm thanh'} aria-pressed={playing} onClick={onSound}>
      <svg viewBox="0 0 32 32" className={icon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h6l8-7v24l-8-7H3Z" fill="currentColor" strokeWidth="1" />{playing ? <path d="M22 10q5 6 0 12m4-16q8 10 0 20" /> : <path d="m22 12 8 8m0-8-8 8" />}</svg>
    </button>
    <button type="button" className={gameUtilityButton + ' compact:hidden'} aria-label="Toàn màn hình" onClick={onFullscreen}>
      <svg viewBox="0 0 32 32" className={icon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="round"><path d="M5 12V5h7m8 0h7v7m0 8v7h-7m-8 0H5v-7M5 5l8 8m14-8-8 8m8 14-8-8M5 27l8-8" /></svg>
    </button>
    </div>
  </div>
}

