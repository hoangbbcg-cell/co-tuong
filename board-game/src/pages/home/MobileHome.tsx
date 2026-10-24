import { useSocialStore } from '../../store/socialStore'
import { ResourceAddButton } from '../../features/lobby/components/ResourceAddButton'
import { ResourceArtwork } from '../../features/lobby/components/ResourceArtwork'
import { useState } from 'react'
import background from '../../assets/backgrounds/home.png'
import tournamentArt from '../../assets/home-actions/tournament-title-large.png'
import { homeModeArtwork } from '../../features/lobby/components/homeModeArtwork'
import eloFrame from '../../assets/player/elo-frame.png'
import redGeneral from '../../assets/pieces/red-general.png'
import concealedPiece from '../../assets/history/history-hidden-user.png'
import resourceFrame from '../../assets/player/name-frame.png'
import energyIcon from '../../assets/home-actions/energy-icon-v2.png'
import goldIcon from '../../assets/home-actions/gold-icon-v2.png'
import { AvatarPortrait } from '../../features/lobby/components/AvatarCustomization'
import { AvatarFrameOverlay } from '../../features/game/components/AvatarFrameOverlay'
import { AvatarRankBadge } from '../../features/game/components/AvatarRankBadge'
import { PlayerNameplate } from '../../features/game/components/PlayerNameplate'
import { HomeIcon } from '../../features/lobby/components/HomeIcon'
import { HomeSettings } from '../../features/lobby/components/HomeSettings'
import type { useHome } from '../../features/lobby/hooks/useHome'
import type { useHomeMusic } from '../../features/lobby/hooks/useHomeMusic'
import { useSessionStore } from '../../store/sessionStore'
import { getAvatarFrame } from '../../lib/avatarFrames'
import { CrispUiImage } from '../../lib/CrispUiImage'
import { buttonInteraction, homeUtilityButton } from '../../lib/uiClasses'

type Props = { unreadMessageCount?: number; home: ReturnType<typeof useHome>; music: ReturnType<typeof useHomeMusic>; onEnergy: () => void; onMessages: () => void }
const dockButton = `${homeUtilityButton} mx-auto h-[12.5cqw]! w-[12.5cqw]! max-h-14 max-w-14`

export function MobileHome({ unreadMessageCount = 0, home, music, onEnergy, onMessages }: Props) {
  const [page, setPage] = useState(0)
  const [energyHovered, setEnergyHovered] = useState(false)
  const avatarIndex = useSessionStore(state => state.avatarIndex)
  const frameIndex = useSessionStore(state => state.avatarFrameIndex)
  const elo = useSessionStore(state => state.elo)
  const account = useSessionStore(state => state.account)
  const pendingFriendRequests = useSocialStore(state => account ? state.friends.filter(friend => friend.status === 'pending' && friend.requestedBy !== account.id).length : 0)
  const pages = [
    [{ ...homeModeArtwork.quick, mobileScale: 0.94, mobileDrop: 0, name: 'Cờ Tướng', run: home.quickPlay }, { ...homeModeArtwork.rooms, mobileScale: 1, mobileDrop: 0, name: 'Chọn Bàn', run: home.openRooms }],
    [{ ...homeModeArtwork.hidden, mobileScale: 0.94, mobileDrop: 0, name: 'Cờ Úp', run: home.playHidden }, { ...homeModeArtwork.computer, mobileScale: 1, mobileDrop: 0, name: 'Chơi Với Máy', run: home.openComputer }],
  ]
  return <section aria-label="Home điện thoại" className="relative isolate m-0 h-dvh w-full overflow-hidden border-0 bg-[#241007] text-[#fff0cf] [container-type:size] desktop:hidden">
    <CrispUiImage src={background} alt="" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-[48%_center]" />
    <header className="absolute inset-x-[5%] top-[4%] z-20 h-[19%]">
      <div className="relative size-[17cqw] max-h-24 max-w-24">
        <button type="button" aria-label="Mở hồ sơ người chơi" onClick={home.openProfile} className={`${buttonInteraction} relative block size-full rounded-full border-0 bg-transparent p-0`}>
          <AvatarPortrait avatarIndex={avatarIndex} className="block size-full rounded-full" />
          <AvatarFrameOverlay src={getAvatarFrame(frameIndex).image} />
        </button>
        <AvatarRankBadge elo={elo} previewStars={account ? undefined : 3} />
      </div>
      <button type="button" onClick={home.openProfile} aria-label={`Hồ sơ ${home.name}`} className="absolute top-[4cqw] left-[19cqw] border-0 bg-transparent p-0">
        <PlayerNameplate name={home.name} className="[--nameplate-width:37cqw] h-[27px]! bg-[length:100%_100%]! px-[17px]! text-[17px]!" />
      </button>
      <div aria-label="Elo người chơi" className="absolute top-[12cqw] left-[19cqw] grid w-[37cqw] grid-cols-2 gap-[1cqw]">
        {[{ label: 'Cờ Tướng', icon: redGeneral, value: elo }, { label: 'Cờ Úp', icon: concealedPiece, value: account?.stats.find(stat => stat.variant === 'jieqi')?.elo ?? 1000 }].map(item => <div key={item.label} aria-label={`Elo ${item.label}: ${item.value}`} className="relative flex h-[6cqw] min-w-0 items-center justify-center bg-[length:100%_100%] bg-center bg-no-repeat pl-[4.5cqw] pr-[1.2cqw] text-[#ffe7ae] [text-shadow:0_1px_2px_#2a1008]" style={{ backgroundImage: `url(${eloFrame})` }}>
          <CrispUiImage src={item.icon} alt={item.label} className="absolute top-1/2 left-[1.3cqw] block size-[3.8cqw] -translate-y-1/2 object-contain" />
          <span className="font-number text-[3.3cqw] leading-none lining-nums tabular-nums">{item.value}</span>
        </div>)}
      </div>
      <div className="absolute top-[3cqw] right-0 grid w-[30cqw] gap-[1.5cqw]">
        {[{ name: 'Năng lượng', value: home.energyUnlimited ? '∞' : `${home.energy}/5`, icon: energyIcon, energy: true, run: onEnergy }, { name: 'Vàng', value: String(home.gold), icon: goldIcon, energy: false, run: () => home.setMessage('Tính năng bổ sung vàng chưa được hỗ trợ.') }].map(item => <div key={item.name} className="relative h-[7cqw]">
          <ResourceArtwork src={resourceFrame} alt="" className="pointer-events-none absolute inset-0 block size-full" />
          {item.energy ? <div aria-label={`Năng lượng ${item.value}. ${home.energyCountdown}`} onPointerEnter={() => setEnergyHovered(true)} onPointerLeave={() => setEnergyHovered(false)} className="absolute inset-y-0 left-0 w-[80%]">
            <ResourceArtwork smooth src={item.icon} alt="" className="absolute top-1/2 left-[9%] block h-[4.6cqw] w-auto -translate-y-1/2" />
            <span className="absolute top-1/2 left-[56%] -translate-x-1/2 -translate-y-1/2 font-number text-[3.2cqw] leading-none tabular-nums">{item.value}</span>
            {energyHovered && <div role="tooltip" className="pointer-events-none absolute top-[calc(100%+6px)] right-0 z-50 whitespace-nowrap rounded-lg border border-[#d7a34e] bg-[linear-gradient(135deg,#48270f,#241207)] px-2 py-1 font-cormorant text-[3cqw] font-semibold leading-normal text-[#fff0cc] shadow-[inset_0_0_0_1px_#ffe2a326,0_4px_12px_#0009]">{home.energyCountdown}</div>}
          </div> : <button type="button" aria-label={`Vàng ${item.value}`} onClick={item.run} className="absolute inset-y-0 left-0 w-[80%] border-0 bg-transparent p-0">
            <ResourceArtwork smooth src={item.icon} alt="" className="absolute top-1/2 left-[9%] block h-[4.6cqw] w-auto -translate-y-1/2" />
            <span className="absolute top-1/2 left-[56%] -translate-x-1/2 -translate-y-1/2 font-number text-[3.2cqw] leading-none tabular-nums">{item.value}</span>
          </button>}
          <ResourceAddButton type="button" aria-label={`Thêm ${item.name.toLowerCase()}`} onClick={item.run} className="absolute top-1/2 right-[10%] size-[4.5cqw] -translate-y-1/2" />
        </div>)}
      </div>
    </header>
    {home.notice && <p role="status" className="absolute inset-x-[7%] top-[23%] z-20 rounded border border-[#b38c4a] bg-[#30261cee] p-2 text-center text-xs">{home.notice}</p>}
    <button type="button" aria-label="Giải đấu" onClick={() => home.setMessage('Giải đấu đang được chuẩn bị. Hãy luyện cờ và chờ ngày khai hội!')} className={`${buttonInteraction} absolute top-[21%] left-1/2 w-[90%] -translate-x-1/2 border-0 bg-transparent p-0`}>
      <CrispUiImage src={tournamentArt} alt="" className="pointer-events-none block h-auto w-full" />
      <span className="pointer-events-none absolute top-[20%] left-1/2 -translate-x-1/2 text-[15cqw]/none [filter:drop-shadow(0_5px_4px_#3d1d0b99)_drop-shadow(0_0_12px_#ffe5a1)_drop-shadow(0_0_30px_#eeb53bcc)]" aria-hidden="true">🏆</span>
      <span className="mt-1 block text-center font-heading text-[2.7cqw] tracking-[0.18em] text-[#ffe5a6] [text-shadow:0_1px_3px_#241007]">ANH HÙNG HỘI NGỘ</span>
    </button>
    <section aria-label="Chế độ chơi điện thoại" className="absolute inset-x-[8%] top-[53%] bottom-[15%] flex items-center justify-center gap-[6%]">
      {pages[page].map(mode => <button key={mode.name} type="button" aria-label={mode.name} disabled={home.joining} onClick={mode.run} className={`${buttonInteraction} block aspect-[561/701] min-w-0 flex-1 border-0 bg-transparent p-0 disabled:opacity-50`}>
        <CrispUiImage src={mode.image} alt="" className="pointer-events-none block h-auto w-full object-contain" style={{ transform: `translateY(${(mode.artworkOffset + mode.mobileDrop) / 701 * 100}%) scale(${mode.mobileScale})`, transformOrigin: '50% 84%', clipPath: `inset(${mode.alphaInsets[0] / 701 * 100}% ${mode.alphaInsets[1] / 561 * 100}% ${mode.alphaInsets[2] / 701 * 100}% ${mode.alphaInsets[3] / 561 * 100}%)` }} />
      </button>)}
    </section>
    <div className="absolute inset-x-[2%] top-[49%] flex justify-between">
      {[-1, 1].map(direction => <button key={direction} type="button" aria-label={direction < 0 ? 'Chế độ trước' : 'Chế độ tiếp theo'} onClick={() => setPage(value => (value + direction + pages.length) % pages.length)} className={`${buttonInteraction} grid h-[11cqw] w-[7cqw] place-items-center rounded-[30%] border-2 border-[#e7b95e] bg-[linear-gradient(135deg,#a06820,#3d1d08)] p-0 text-[#fff0bf] shadow-[inset_0_0_0_2px_#4c2509,0_2px_3px_#0009]`}>
        <svg viewBox="0 0 16 24" className="h-[6cqw] w-[4cqw]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={direction < 0 ? 'm11 3-7 9 7 9' : 'm5 3 7 9-7 9'} /></svg>
      </button>)}
    </div>
    <nav aria-label="Tiện ích điện thoại" className="absolute inset-x-[2%] bottom-[1%] z-40 grid grid-cols-6 gap-1 rounded-[3cqw] border-t border-[#b0833f] bg-[#1c120cdd] px-[1cqw] pt-[2cqw] pb-[max(2cqw,env(safe-area-inset-bottom))]">
      {([{ label: 'Xếp hạng', icon: 'trophy', run: home.openRanking }, { label: 'Lịch sử', icon: 'history', run: home.openHistory }, { label: 'Bạn bè', icon: 'friends', run: home.openFriends }, { label: 'Chat', icon: 'messages', run: onMessages }, { label: 'Cửa hàng', icon: 'shop', run: home.openShop }] as const).map(item => <div key={item.label} className="min-w-0 text-center">
        <button type="button" aria-label={item.icon === 'friends' && pendingFriendRequests > 0 ? `${item.label}, ${pendingFriendRequests} lời mời kết bạn` : item.icon === 'messages' && unreadMessageCount > 0 ? `${item.label}, ${unreadMessageCount} tin nhắn chưa đọc` : item.label} onClick={item.run} className={`${dockButton} relative`}><HomeIcon name={item.icon} />{((item.icon === 'friends' && pendingFriendRequests > 0) || (item.icon === 'messages' && unreadMessageCount > 0)) && <span aria-hidden="true" className="pointer-events-none absolute -top-[calc(2.2cqw+2px)] -right-[1.5cqw] grid size-[6cqw] min-h-5 min-w-5 place-items-center rounded-full border-2 border-[#ffe2a1] bg-[#d82323] font-number text-[3.5cqw] font-semibold leading-none text-white shadow-[0_1px_4px_#321407]">{(item.icon === 'messages' ? unreadMessageCount : pendingFriendRequests) > 99 ? '99+' : (item.icon === 'messages' ? unreadMessageCount : pendingFriendRequests)}</span>}</button>
        <span className="mt-[1cqw] block whitespace-nowrap font-heading text-[3.6cqw] leading-normal">{item.label}</span>
      </div>)}
      <div className="min-w-0 text-center"><HomeSettings music={music} placement="above" buttonClassName={dockButton} onError={() => home.setMessage('Không thể phát nhạc trên trình duyệt này.')} /><span className="mt-[1cqw] block font-heading text-[3.6cqw] leading-normal">Cài đặt</span></div>
    </nav>
  </section>
}
