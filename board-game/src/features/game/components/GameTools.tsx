import { useUnreadMessageCount } from '../../lobby/hooks/useDatabaseMessages'
import { gameUtilityButton } from '../../../lib/uiClasses'
import { HomeIcon } from '../../lobby/components/HomeIcon'
import { GameBackIcon } from './GameBackIcon'
import { PositionIcon } from './PositionIcon'

interface Props {
  onMessages?: () => void
  onShare?: () => void
  onRoomSettings?: () => void
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

export function GameTools({ onMessages, onShare, onRoomSettings, mobileMenuOpen = false, onLeave, showMobileChatSlot = false, playing, showMatchTools = true, showSaveMatch = showMatchTools, onSave, saveDisabled, saved, onFriends, onSound, onFullscreen }: Props) {
  const unreadMessageCount = useUnreadMessageCount()
  const icon = 'size-8 [filter:drop-shadow(1px_2px_1px_#392300)]'
  return <div className="pointer-events-auto desktop:contents flex shrink-0 gap-3 compact:ml-0 compact:flex-row-reverse compact:gap-[clamp(4px,calc((100vw-352px)/2),8px)] compact:justify-start" role="group" aria-label="Tiện ích bàn cờ">
    {showSaveMatch && <button data-ui-selection-sound type="button" className={gameUtilityButton + ' desktop:order-1 compact:order-2 compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label={saved ? 'Đã lưu ván đấu' : 'Lưu ván đấu'} title={saved ? 'Đã lưu ván đấu' : saveDisabled ? 'Ván kết thúc mới có thể lưu' : 'Lưu ván vừa kết thúc'} disabled={!onSave || saveDisabled || saved} onClick={onSave}><PositionIcon name="save" /></button>}
    {showMobileChatSlot && <span aria-hidden="true" className="hidden desktop:hidden compact:order-1 compact:block compact:size-[42px]" />}
    <div id="mobile-game-tools" className={`absolute right-0 desktop:right-[63px] top-[calc(100%+12px)] z-50 flex gap-3 rounded border border-[#d3a51a] bg-[#3b2516] p-3 compact:absolute compact:right-0 compact:bottom-[calc(42px+12px)] compact:top-auto compact:flex compact:gap-3 compact:rounded compact:border compact:border-[#d3a51a] compact:bg-[#3b2516] compact:p-3 ${mobileMenuOpen ? '' : 'hidden compact:hidden'}`}>
    {onMessages && <button data-ui-selection-sound type="button" className={gameUtilityButton + ' relative'} aria-label={unreadMessageCount > 0 ? `Tin nhắn, ${unreadMessageCount} tin nhắn chưa đọc` : 'Tin nhắn'} onClick={onMessages}><HomeIcon name="messages" />{unreadMessageCount > 0 && <span aria-hidden="true" className="pointer-events-none absolute -top-2 -right-2 grid min-h-5 min-w-5 place-items-center rounded-full border-2 border-[#ffe2a1] bg-[#d82323] px-1 font-number text-sm font-semibold leading-none text-white shadow-[0_1px_4px_#321407]">{unreadMessageCount > 99 ? '99+' : unreadMessageCount}</span>}</button>}
    {onShare && <button data-ui-selection-sound type="button" className={gameUtilityButton} aria-label="Chia sẻ ván đấu" onClick={onShare}><svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 10 6-4M9 14l6 4"/></svg></button>}
    {onLeave && <button data-ui-selection-sound type="button" className={gameUtilityButton + ' desktop:hidden compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label="Rời phòng" onClick={onLeave}><GameBackIcon /></button>}
    {showMatchTools && <button data-ui-selection-sound type="button" className={gameUtilityButton + ' compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label="Bạn bè" onClick={onFriends}><HomeIcon name="friends" /></button>}
    <button data-ui-tab-sound type="button" className={gameUtilityButton + ' compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label={playing ? 'Tắt âm thanh' : 'Bật âm thanh'} aria-pressed={playing} onClick={onSound}>
      <svg viewBox="0 0 32 32" className={icon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h6l8-7v24l-8-7H3Z" fill="currentColor" strokeWidth="1" />{playing ? <path d="M22 10q5 6 0 12m4-16q8 10 0 20" /> : <path d="m22 12 8 8m0-8-8 8" />}</svg>
    </button>
    {onRoomSettings && <button data-ui-selection-sound type="button" className={gameUtilityButton + ' compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label="Cài đặt bàn" onClick={onRoomSettings}><HomeIcon name="settings" /></button>}
    </div>
    <button data-ui-selection-sound type="button" className={gameUtilityButton + ' desktop:order-3 compact:hidden'} aria-label="Toàn màn hình" onClick={onFullscreen}>
      <svg viewBox="0 0 32 32" className={icon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="round"><path d="M5 12V5h7m8 0h7v7m0 8v7h-7m-8 0H5v-7M5 5l8 8m14-8-8 8m8 14-8-8M5 27l8-8" /></svg>
    </button>
  </div>
}

