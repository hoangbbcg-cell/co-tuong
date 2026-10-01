import computerArt from '../../assets/home-actions/computer-full.png'
import tournamentArt from '../../assets/home-actions/tournament-title-large.png'
import quickArt from '../../assets/home-actions/quick-full.png'
import roomsArt from '../../assets/home-actions/rooms-full.png'
import hiddenArt from '../../assets/home-actions/hidden-full.png'
import { useHome } from '../../features/lobby/hooks/useHome'
import { buttonInteraction, homeUtilityButton as utility } from '../../lib/uiClasses'
import background from '../../assets/backgrounds/home.png'
import { useHomeLayout } from '../../features/lobby/hooks/useHomeLayout'
import noviceRank from '../../assets/ranks/rank-01-novice-clean.png'
import avatar from '../../assets/icons/avatar.svg'
import redGeneral from '../../assets/pieces/red-general.png'
import nameFrame from '../../assets/player/name-frame.png'
import eloFrame from '../../assets/player/elo-frame.png'
import { HomeIcon, type HomeIconName } from '../../features/lobby/components/HomeIcon'
import { useHomeMusic } from '../../features/lobby/hooks/useHomeMusic'
import { HOME_AVATA_TITLE_BADGE_STYLE } from '../../features/game/components/playerIdentityLayout'
import { ProfileDialog } from '../../features/lobby/components/ProfileDialog'
import { useProfileLayout } from '../../features/lobby/hooks/useProfileLayout'
import { RankingDialog } from '../../features/lobby/components/RankingDialog'
import { useRankingLayout } from '../../features/lobby/hooks/useRankingLayout'
import { FriendsDialog } from '../../features/lobby/components/FriendsDialog'
import { useFriendsLayout } from '../../features/lobby/hooks/useFriendsLayout'
import { HistoryDialog } from '../../features/lobby/components/HistoryDialog'
import { useHistoryLayout } from '../../features/lobby/hooks/useHistoryLayout'


const modes = [
  { name: 'Chơi Nhanh', image: quickArt, action: 'quick', artworkOffset: 0, alphaInsets: [38, 0, 0, 0] },
  { name: 'Chọn Bàn', image: roomsArt, action: 'rooms', artworkOffset: 50, alphaInsets: [1, 10, 0, 0] },
  { name: 'Chơi Với Máy', image: computerArt, action: 'computer', artworkOffset: 55, alphaInsets: [0, 0, 42, 15] },
  { name: 'Cờ Úp', image: hiddenArt, action: 'hidden', artworkOffset: 0, alphaInsets: [41, 24, 0, 0] },
] as const
export function HomePage() {
  const home = useHome()
  const layout = useHomeLayout()
  const profileLayout = useProfileLayout()
  const rankingLayout = useRankingLayout()
  const friendsLayout = useFriendsLayout()
  const historyLayout = useHistoryLayout()
  const music = useHomeMusic()

  return <main className="relative isolate h-dvh w-full overflow-hidden bg-[#263a35] text-[#f7e6c1]" aria-label="Màn hình chính">
    <div className="absolute top-1/2 left-1/2 isolate flex origin-center flex-col overflow-hidden border-[5px] border-[#80582c] bg-[#d9d4bf] px-8 py-5 shadow-[inset_0_0_0_2px_#efd397,0_0_0_1px_#e1c993,0_8px_30px_#101d18aa] compact:px-4 compact:py-3" style={{ width: layout.width, height: layout.height, transform: `translate(-50%, -50%) scale(${layout.scale})` }}>
      <img src={background} alt="" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f4e8cd11,transparent_50%,#344b4233)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-[2px] z-10 border border-[#e3bf78] shadow-[inset_0_0_0_2px_#63472055]" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-2 left-1 z-10 font-georgia text-[72px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
      <span aria-hidden="true" className="pointer-events-none absolute right-1 -bottom-2 z-10 -scale-x-100 font-georgia text-[72px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
      <header style={{ transform: `translateY(${12 / layout.scale - (layout.compact ? 12 : 20)}px)` }} className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="block w-[108px] shrink-0 pb-7">
            <span className="relative block size-[100px]">
              <button type="button" className={`${buttonInteraction} block size-full rounded-full bg-transparent p-0`} onClick={home.openProfile} aria-label="Mở hồ sơ người chơi"><span role="img" aria-label="Avatar kỳ sĩ" className="block size-full rounded-full bg-[linear-gradient(135deg,#fff9d9,#e9a244_42%,#8d541c_70%,#ffda88)] p-[6px] shadow-[0_2px_3px_#432711] ring-1 ring-[#86511c]"><img src={avatar} alt="" className="block size-full rounded-full object-cover" /></span></button>
              <img src={noviceRank} alt="Danh hiệu Tân Binh" className="pointer-events-none absolute z-1 -translate-x-1/2 drop-shadow-[0_2px_2px_#281307aa]" style={HOME_AVATA_TITLE_BADGE_STYLE} />
            </span>
          </span>
          <span className="w-[180px] pt-3">
            <strong className="grid h-[38px] w-[180px] place-items-center bg-contain bg-center bg-no-repeat px-6 font-georgia text-[20px] leading-none font-normal text-[#ffe7ae] [text-shadow:0_1px_2px_#2a1008]" style={{ backgroundImage: `url(${nameFrame})` }} title={home.name}><span className="max-w-full truncate">{home.name}</span></strong>
            <span className="mt-1 grid w-full grid-cols-2 gap-1 text-[16px] leading-tight text-[#fff0cf]" title="Chỉ số minh họa, chưa có ELO hoặc tiền tệ thật">
              <span className="relative flex h-[28px] min-w-0 items-center justify-center bg-center bg-no-repeat bg-[length:100%_100%] pl-5 font-georgia text-[#ffe7ae] whitespace-nowrap [text-shadow:0_1px_2px_#2a1008]" style={{ backgroundImage: `url(${eloFrame})` }}><img src={redGeneral} alt="Cờ Tướng" className="absolute left-[6px] size-[22px] shrink-0 object-contain" /><span className="font-[Times_New_Roman,serif] text-[18px] leading-none lining-nums tabular-nums">2066</span></span>
              <span className="relative flex h-[28px] min-w-0 items-center justify-center bg-center bg-no-repeat bg-[length:100%_100%] pl-5 font-georgia text-[#ffe7ae] whitespace-nowrap [text-shadow:0_1px_2px_#2a1008]" style={{ backgroundImage: `url(${eloFrame})` }}><span role="img" aria-label="Cờ Úp" className="absolute left-[6px] grid size-[20px] shrink-0 place-items-center rounded-full border border-[#a56830] bg-[linear-gradient(145deg,#fff0c9,#e6b778_72%,#c88e4f)] shadow-[inset_0_2px_1px_#fff8df,inset_0_-2px_1px_#a66632]"><span className="size-[12px] rounded-full bg-[radial-gradient(circle_at_35%_25%,#f5d7a4,#d8a363)] shadow-[inset_0_1px_2px_#fff0c977,inset_0_-1px_1px_#9b602b55]" /></span><span className="font-[Times_New_Roman,serif] text-[18px] leading-none lining-nums tabular-nums">1000</span></span>
            </span>
          </span>
        </div>
        <nav className="flex flex-wrap justify-end gap-2" aria-label="Tiện ích">
          {[
            ['trophy', 'Thành tích', 'Thành tích sẽ có khi hệ thống tài khoản được mở.'],
            ['history', 'Lịch sử', 'Lịch sử ván đấu chưa được lưu.'],
            ['friends', 'Bạn bè', 'Tính năng bạn bè sắp ra mắt.'],
          ].map(([icon, label, message]) => <button key={label} className={utility} aria-label={label} title={label} onClick={() => icon === 'trophy' ? home.openRanking() : icon === 'history' ? home.openHistory() : icon === 'friends' ? home.openFriends() : home.setMessage(message)}><HomeIcon name={icon as HomeIconName} /></button>)}
          <button className={utility} aria-label={music.playing ? 'Tắt nhạc' : 'Bật nhạc'} aria-pressed={music.playing} title={music.playing ? 'Tắt nhạc' : 'Bật nhạc'} onClick={() => void music.toggle().catch(() => home.setMessage('Không thể phát nhạc trên trình duyệt này.'))}><HomeIcon name={music.playing ? 'sound' : 'muted'} /></button>
          <button className={utility} aria-label="Toàn màn hình" title="Toàn màn hình" onClick={() => void home.fullscreen()}><HomeIcon name="fullscreen" /></button>
        </nav>
      </header>
      {home.notice && <p role="status" className="mt-3 rounded-lg border border-[#b38c4a] bg-[#30261c] p-3 text-center text-sm">{home.notice}</p>}
      <div className="hidden desktop:block desktop:flex-1" aria-hidden="true" />
      <section className="relative isolate flex min-h-0 flex-1 flex-col items-center justify-center py-5 desktop:absolute desktop:left-1/2 desktop:w-[48%] desktop:py-0" style={{ top: layout.compact ? undefined : '28%', transform: layout.compact ? 'translateY(-28px)' : 'translate(-50%, -50%)' }} aria-label="Giải đấu">
        <button aria-label="Giải đấu" className={`${buttonInteraction} relative block w-[700px] max-w-full bg-transparent [container-type:inline-size] transition-[filter] duration-150 hover:brightness-105 motion-reduce:transition-none`} onClick={() => home.setMessage('Giải đấu đang được chuẩn bị. Hãy luyện cờ và chờ ngày khai hội!')}>
          <img src={tournamentArt} alt="" draggable={false} className="pointer-events-none block h-auto w-full brightness-95 contrast-95 saturate-90 select-none [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent),linear-gradient(to_bottom,transparent,black_12%,black_78%,transparent)] [mask-composite:intersect]" />
          <span className="pointer-events-none absolute top-[10%] left-1/2 -translate-x-1/2 whitespace-nowrap font-[Arial,sans-serif] text-[1.9cqw] tracking-[0.3em] text-[#dbb66b] [text-shadow:0_2px_3px_#321b0b,0_0_8px_#e9a63d88]">KỲ PHÙNG ĐỊCH THỦ</span>
          <span className="pointer-events-none absolute top-[20%] left-1/2 -translate-x-1/2 text-[17cqw]/none [filter:drop-shadow(0_5px_4px_#3d1d0b99)_drop-shadow(0_0_12px_#ffe5a1)_drop-shadow(0_0_30px_#eeb53bcc)]" aria-hidden="true">🏆</span>
          <span aria-hidden="true" className="pointer-events-none absolute top-[81%] left-1/2 flex w-[30%] -translate-x-1/2 items-center gap-2 text-[1.8cqw] leading-none text-[#efcf83] [filter:drop-shadow(0_2px_2px_#42240c)]"><span className="h-px flex-1 bg-linear-to-r from-transparent to-[#efcf83]"/>◇<span className="h-px flex-1 bg-linear-to-l from-transparent to-[#efcf83]"/></span>
          <span className="pointer-events-none absolute top-[87%] left-1/2 -translate-x-1/2 whitespace-nowrap font-[Arial,sans-serif] text-[1.8cqw] tracking-[0.24em] text-[#f2d394] [text-shadow:0_2px_3px_#321b0b,0_0_8px_#e9a63d88]">✦ ANH HÙNG HỘI NGỘ ✦</span>
          <h1 className="sr-only">Giải đấu</h1>
        </button>
      </section>
      <section style={{ transform: `translateY(${(layout.compact ? -20 : -40) + 25 / layout.scale}px)` }} className="mx-auto grid w-full max-w-[1020px] grid-cols-4 items-start gap-6 pb-6 compact:gap-2" aria-label="Chế độ chơi">
        {modes.map(mode => <div key={mode.name} style={{ rowGap: `${38 / layout.scale}px` }} className="flex min-w-0 flex-col items-center gap-3 text-center compact:gap-2">
          <span style={{ transform: `translateY(${38 / layout.scale}px)` }} className="relative block aspect-square w-[95%] max-w-[175px] shrink-0">
            <button type="button" style={{ width: 205 / layout.scale, aspectRatio: '561 / 701', transform: `translate(-50%, ${mode.artworkOffset / 701 * 100}%)`, clipPath: `inset(${mode.alphaInsets[0] / 701 * 100}% ${mode.alphaInsets[1] / 561 * 100}% ${mode.alphaInsets[2] / 701 * 100}% ${mode.alphaInsets[3] / 561 * 100}%)` }} className={`${buttonInteraction} absolute top-0 left-1/2 block border-0 bg-transparent p-0 transition-[filter] duration-150 hover:brightness-105 motion-reduce:transition-none`} disabled={home.joining} aria-label={mode.name} aria-busy={mode.action === 'quick' && home.joining} onClick={() => mode.action === 'computer' ? home.openComputer() : mode.action === 'hidden' ? home.playHidden() : mode.action === 'quick' ? home.quickPlay() : mode.action === 'rooms' ? home.openRooms() : undefined}>
              <img src={mode.image} alt="" draggable={false} className="pointer-events-none block h-full w-full max-w-none object-contain" />
            </button>
          </span>
          <span aria-hidden="true" className="block h-[82px] w-full shrink-0 compact:h-[48px]" />
        </div>)}
      </section>
      <footer className="flex flex-wrap items-center justify-start gap-3 pb-1 text-xs text-[#453c29] compact:text-[8px]">
        <button className="sr-only" disabled={home.joining} onClick={home.playLocal}>Chơi hai người cùng máy</button>
        <button className={`${buttonInteraction} absolute bottom-2 left-1/2 h-10 w-[150px] -translate-x-1/2 rounded-[50%/95%] border-2 border-[#b97838] bg-[linear-gradient(180deg,#f5c58d_0%,#eab071_24%,#d99451_68%,#bc783b_100%)] font-[Arial,sans-serif] text-[22px] leading-none font-medium text-[#33200e] shadow-[inset_0_2px_2px_#ffe0aa,inset_0_0_0_3px_#edb475,inset_0_-4px_3px_#97532288,0_3px_3px_#30221488] hover:brightness-110 active:brightness-95 compact:w-[120px] compact:text-xl`} onClick={() => void home.exit()}>THOÁT</button>
      </footer>
    </div>
    <dialog ref={home.messageRef} aria-label="Thông báo" className="m-auto w-[min(384px,90vw)] rounded-xl border border-[#c7a264] bg-[#30271e] p-6 text-center text-[#f7e6c1] shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm" onCancel={() => home.setMessage('')}>
        <p className="leading-relaxed">{home.message}</p><button autoFocus className={`${utility} mx-auto mt-5 w-auto px-6 text-base`} onClick={() => home.setMessage('')}>Đã hiểu</button>
    </dialog>
    <ProfileDialog layout={profileLayout} dialogRef={home.profileRef} name={home.name} editable onClose={home.closeProfile} primaryActionLabel="Liên kết tài khoản" onPrimaryAction={() => home.setMessage('Liên kết tài khoản sắp ra mắt. Hiện bạn đang chơi với tư cách khách.')} />
    <RankingDialog layout={rankingLayout} dialogRef={home.rankingRef} onClose={home.closeRanking} onView={name => home.setMessage(`Đang chuẩn bị xem ván của ${name}.`)} />
    <FriendsDialog layout={friendsLayout} dialogRef={home.friendsRef} onClose={home.closeFriends} />
    <HistoryDialog layout={historyLayout} dialogRef={home.historyRef} name={home.name} onClose={home.closeHistory} onReplay={opponent => home.setMessage(`Đang chuẩn bị xem lại ván với ${opponent}.`)} />
  </main>
}
