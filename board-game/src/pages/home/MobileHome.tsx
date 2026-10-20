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

type Props = { home: ReturnType<typeof useHome>; music: ReturnType<typeof useHomeMusic>; onEnergy: () => void; onMessages: () => void }
const dockButton = `${homeUtilityButton} mx-auto`

export function MobileHome({ home, music, onEnergy, onMessages }: Props) {
  const [page, setPage] = useState(0)
  const avatarIndex = useSessionStore(state => state.avatarIndex)
  const frameIndex = useSessionStore(state => state.avatarFrameIndex)
  const elo = useSessionStore(state => state.elo)
  const account = useSessionStore(state => state.account)
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
        <PlayerNameplate name={home.name} className="[--nameplate-width:37cqw] h-[6cqw]! bg-[length:100%_100%]! px-[3cqw]! text-[3.3cqw]!" />
      </button>
      <div aria-label="Elo người chơi" className="absolute top-[11cqw] left-[19cqw] grid w-[37cqw] grid-cols-2 gap-[1cqw]">
        {[{ label: 'Cờ Tướng', icon: redGeneral, value: elo }, { label: 'Cờ Úp', icon: concealedPiece, value: account?.stats.find(stat => stat.variant === 'jieqi')?.elo ?? 1000 }].map(item => <div key={item.label} aria-label={`Elo ${item.label}: ${item.value}`} className="relative flex h-[5.5cqw] min-w-0 items-center justify-center bg-[length:100%_100%] bg-center bg-no-repeat pl-[4.5cqw] pr-[1.2cqw] text-[#ffe7ae] [text-shadow:0_1px_2px_#2a1008]" style={{ backgroundImage: `url(${eloFrame})` }}>
          <CrispUiImage src={item.icon} alt={item.label} className="absolute top-1/2 left-[1.3cqw] block size-[3.5cqw] -translate-y-1/2 object-contain" />
          <span className="font-number text-[3cqw] leading-none lining-nums tabular-nums">{item.value}</span>
        </div>)}
      </div>
      <div className="absolute top-[3cqw] right-0 grid w-[30cqw] gap-[1.5cqw]">
        {[{ name: 'Năng lượng', value: `${home.energy}/5`, icon: energyIcon, run: onEnergy }, { name: 'Vàng', value: String(home.gold), icon: goldIcon, run: () => home.setMessage('Tính năng bổ sung vàng chưa được hỗ trợ.') }].map(item => <div key={item.name} className="relative h-[7cqw]">
          <ResourceArtwork src={resourceFrame} alt="" className="pointer-events-none absolute inset-0 block size-full" />
          <button type="button" aria-label={item.name === 'Năng lượng' ? `Năng lượng ${item.value}. ${home.energyCountdown}` : `Vàng ${item.value}`} title={item.name === 'Năng lượng' ? home.energyCountdown : undefined} onClick={item.run} className="absolute inset-0 border-0 bg-transparent p-0">
            <ResourceArtwork smooth src={item.icon} alt="" className="absolute top-1/2 left-[9%] block h-[4.6cqw] w-auto -translate-y-1/2" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-number text-[3.2cqw] leading-none tabular-nums">{item.value}</span>
          </button>
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
      {([{ label: 'Xếp hạng', icon: 'trophy', run: home.openRanking }, { label: 'Bạn bè', icon: 'friends', run: home.openFriends }, { label: 'Lịch sử', icon: 'history', run: home.openHistory }, { label: 'Cửa hàng', icon: 'shop', run: home.openShop }, { label: 'Chat', icon: 'messages', run: onMessages }] as const).map(item => <div key={item.label} className="min-w-0 text-center">
        <button type="button" aria-label={item.label} onClick={item.run} className={dockButton}><HomeIcon name={item.icon} /></button>
        <span className="mt-[1cqw] block whitespace-nowrap font-heading text-[3.2cqw] leading-normal">{item.label}</span>
      </div>)}
      <div className="min-w-0 text-center"><HomeSettings music={music} placement="above" buttonClassName={dockButton} onError={() => home.setMessage('Không thể phát nhạc trên trình duyệt này.')} /><span className="mt-[1cqw] block font-heading text-[3.2cqw] leading-normal">Cài đặt</span></div>
    </nav>
  </section>
}
