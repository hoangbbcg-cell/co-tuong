import { useState, type RefObject } from 'react'
import type { useRankingLayout } from '../hooks/useRankingLayout'
import rankingTitle from '../../../assets/rankings/ranking-title-transparent.png'
import xiangqiTab from '../../../assets/rankings/ranking-xiangqi-tab-user.png'
import hiddenTab from '../../../assets/rankings/ranking-hidden-tab-user.png'
import socialHeaderLandscape from '../../../assets/rankings/social-header-landscape.png'
import historyParchmentBackground from '../../../assets/history/history-parchment-background.png'
import { SocialAvatar, socialPanelClass, socialActionButton, socialActionStyle } from './SocialUi'
import rankPlainFrame from '../../../assets/rankings/rank-plain-frame.png'
import rankNumberOne from '../../../assets/rankings/rank-gold-v2.png'
import rankNumberTwo from '../../../assets/rankings/rank-silver-v2.png'
import rankNumberThree from '../../../assets/rankings/rank-bronze-v2.png'
import topOneCrown from '../../../assets/rankings/top-one-crown.png'
import redGeneral from '../../../assets/pieces/red-general.png'
import { buttonInteraction, selectedImageTabGlow } from '../../../lib/uiClasses'
import { AvatarRankBadge } from '../../game/components/AvatarRankBadge'

type Mode = 'xiangqi' | 'hidden'

const players = [
  { name: 'ShopCoTuong', online: true, playing: 'Đang chơi Cờ Tướng', elo: '2719' },
  { name: 'Tu_CoTuong', online: false, playing: 'Offline', elo: '2719' },
  { name: 'Fonsida_', online: false, playing: 'Offline', elo: '2719' },
  { name: 'NgocLinhAnh', online: true, playing: 'Đang online', elo: '2719' },
  { name: 'FonGiaoSu', online: false, playing: 'Offline', elo: '2719' },
]

const rankNumberImages = [rankNumberOne, rankNumberTwo, rankNumberThree]

function PresenceDot({ online }: { online: boolean }) {
  return <span aria-label={online ? 'Đang trực tuyến' : 'Ngoại tuyến'} className="block size-[22px] shrink-0 rounded-full bg-[#8c6d42]/45 p-px shadow-[0_2px_3px_#4b2b1766]">
    <span className={`block size-full rounded-full border border-black/15 ${online ? 'bg-[radial-gradient(circle_at_35%_25%,#baff70_0_7%,#65e928_30%,#2ec10c_67%,#1b8d08_100%)] shadow-[inset_0_1px_1px_#e9ffd0,0_1px_1px_#176b0c88]' : 'bg-[radial-gradient(circle_at_35%_25%,#e1dfd5_0_7%,#b4b3aa_31%,#84857e_68%,#5f615d_100%)] shadow-[inset_0_1px_1px_#fffbe9,0_1px_1px_#403a3488]'}`} />
  </span>
}

export function RankingDialog({ dialogRef, layout, onClose, onView, onOpenProfile }: {
  dialogRef: RefObject<HTMLDialogElement | null>
  layout: ReturnType<typeof useRankingLayout>
  onClose: () => void
  onView: (name: string) => void
  onOpenProfile: (name: string) => void
}) {
  const [mode, setMode] = useState<Mode>('xiangqi')
  const modes: { key: Mode; label: string; image: string }[] = [{ key: 'xiangqi', label: 'Cờ Tướng', image: xiangqiTab }, { key: 'hidden', label: 'Cờ Úp', image: hiddenTab }]

  return <dialog ref={dialogRef} aria-labelledby="ranking-title" onCancel={event => { event.preventDefault(); onClose() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#43240f] backdrop:bg-black/45" style={{ width: layout.width * layout.scale, height: layout.height * layout.scale }}>
    <div className="absolute top-0 left-0 origin-top-left rounded-[22px] border-[5px] border-[#5e3014] bg-[linear-gradient(135deg,#7a431c,#2d160a)] p-4 shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]" style={{ width: layout.width, height: layout.height, transform: `scale(${layout.scale})` }}>
      <button type="button" onClick={onClose} className={`${buttonInteraction} absolute top-[24px] right-[28px] z-30 grid size-[56px] place-items-center rounded-xl border-2 border-[#efb75d] bg-[linear-gradient(#6e3d17,#291207)] text-[42px] leading-none text-[#ffe3a2] shadow-[inset_0_0_0_3px_#3f1a08,0_3px_4px_#160804]`} aria-label="Đóng">×</button>
      <div className="relative flex h-full flex-col rounded-xl border-[3px] border-[#d39a42] bg-[radial-gradient(ellipse_at_50%_8%,#b87a3344,transparent_38%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] px-2 pb-2 shadow-[0_0_0_2px_#48220e,inset_0_0_18px_#160904]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-2 h-[170px] overflow-hidden rounded-[9px] opacity-80 shadow-[inset_0_0_18px_8px_#241107]">
          <img src={socialHeaderLandscape} alt="" className="size-full object-cover object-center" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-2 overflow-hidden rounded-lg opacity-20"><svg viewBox="0 0 660 800" preserveAspectRatio="none" className="h-full w-full" fill="none" stroke="#b8873e" strokeWidth="5"><path d="M-30 130c85-90 120 30 40 18-60-12-15-84 30-42m450-100c-60 35-30 95 15 60s-40-70-65-20M-40 680c80-65 165 10 95 55-55 35-100-50-45-65 65-18 80 93 160 57m340 75c-65-70 15-125 58-75 30 40-45 80-60 30-10-40 80-80 140-20"/><path d="M-15 780q80-100 160 0m-145 0q65-80 130 0m-110 0q45-55 90 0M500 0q75 90 150 0m-130 0q55 65 110 0"/></svg></div>
        <header className="relative z-10 mx-auto -mt-[62px] mb-[-14px] w-[650px] text-center">
          <img src={rankingTitle} alt="" className="pointer-events-none mx-auto h-auto w-full" />
          <h2 id="ranking-title" className="sr-only">Xếp hạng</h2>
        </header>
        <div className="relative z-10 mx-auto mb-1 flex w-[68%] items-end justify-center gap-10" role="tablist" aria-label="Chế độ xếp hạng">
          {modes.map(item => <button key={item.key} type="button" role="tab" aria-selected={mode === item.key} onClick={() => setMode(item.key)} className={`${buttonInteraction} relative block h-[70px] w-[264px] shrink-0 isolate overflow-visible border-0 bg-transparent p-0 leading-none`}><img src={item.image} alt="" className={`pointer-events-none block h-full w-full object-fill transition-[filter] duration-200 motion-reduce:transition-none ${mode === item.key ? selectedImageTabGlow : ''}`} /><span className="sr-only">{item.label}</span></button>)}
        </div>
        <section aria-label={`Bảng xếp hạng ${mode === 'xiangqi' ? 'Cờ Tướng' : 'Cờ Úp'}`} className={`${socialPanelClass} flex flex-col gap-[6px]`} style={{ backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
          <div className="relative z-10 isolate grid h-[38px] shrink-0 grid-cols-[90px_minmax(0,1fr)_156px_173px] items-center gap-3 overflow-hidden rounded-[9px] border border-[#c3a371] bg-[#b68c53]/30 px-3 font-['Times_New_Roman'] text-[21px] font-bold italic text-[#43240f]">
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[125px] bg-[linear-gradient(90deg,#4b271326_0%,#75451d1b_54%,transparent_100%)] shadow-[inset_8px_0_12px_-10px_#24100635]" />
            <span className="relative z-10 text-center">Hạng</span><span className="pl-[100px]">Người chơi</span><span className="text-center">Điểm</span><span className="text-center">Thao tác</span>
          </div>
          <ol className="relative z-10 flex min-h-0 flex-1 flex-col gap-[8px] overflow-x-hidden overflow-y-auto pr-2 [scrollbar-gutter:stable]">
            {players.map((player, index) => <li key={player.name} className="relative isolate grid h-[138px] min-h-[138px] shrink-0 grid-cols-[90px_minmax(0,1fr)_156px_173px] items-center gap-3 overflow-hidden rounded-[10px] border border-[#c5a16a]/55 bg-[linear-gradient(90deg,#ead0a0,#f0dcb3_48%,#e8cca0)] px-3 py-0 shadow-[inset_0_1px_0_#f8e6bd]">
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[132px] bg-[linear-gradient(90deg,#4a261327_0%,#75451d1a_55%,transparent_100%)] shadow-[inset_9px_0_14px_-11px_#24100635]" />
              <span className="relative z-10 grid size-[90px] place-items-center self-center justify-self-center" aria-label={`Hạng ${index + 1}`}>
                {index < 3
                  ? <><img src={rankNumberImages[index]} alt="" className="pointer-events-none size-full scale-110 object-contain brightness-110 drop-shadow-[0_0_5px_#ffe3a080]" /><span aria-hidden="true" className="pointer-events-none absolute top-[12%] left-[10%] text-[20px] leading-none text-[#fff8df] drop-shadow-[0_0_4px_#fff0ad] motion-safe:animate-pulse">✦</span><span aria-hidden="true" className="pointer-events-none absolute right-[5%] bottom-[20%] text-[15px] leading-none text-[#fff8df] drop-shadow-[0_0_4px_#fff0ad] motion-safe:animate-pulse [animation-delay:900ms]">✦</span></>
                  : <><img src={rankPlainFrame} alt="" className="pointer-events-none size-[76px] object-contain" /><span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Times_New_Roman'] text-[46px] leading-none font-bold italic text-[#ffe0a0] [text-shadow:0_2px_2px_#391b0b]">{index + 1}</span></>}
              </span>
              <div className="flex min-w-0 items-center gap-[20px]">
                <span className="ml-2 block h-[132px] w-[84px] shrink-0">
                  <span className="relative top-[5px] block size-[84px] overflow-visible">
                  {index === 0 && <svg aria-hidden="true" viewBox="0 0 157 119" className="pointer-events-none absolute -top-[5px] left-1/2 z-20 h-[19px] w-[25px] -translate-x-1/2 overflow-visible drop-shadow-[0_1px_1px_#4a250f]"><defs><clipPath id="top-one-crown-curve"><path d="M0 0H157V87Q78.5 126 0 87Z" /></clipPath></defs><image href={topOneCrown} width="157" height="119" clipPath="url(#top-one-crown-curve)" /></svg>}
                  <button type="button" onClick={() => onOpenProfile(player.name)} aria-label={`Mở hồ sơ của ${player.name}`} className={`${buttonInteraction} grid size-[84px] place-items-center rounded-full border-0 bg-transparent p-0 [&>span]:size-[84px]`}><SocialAvatar /></button>
                  <AvatarRankBadge elo={Number(player.elo)} />
                  </span>
                </span>
                <div className="min-w-0"><h3 className="truncate font-arial text-[22px] leading-6 font-bold text-[#251506]">{player.name}</h3><p className={`mt-2 flex items-center gap-3 font-arial text-[19px] leading-5 font-medium ${player.online ? 'text-[#268523]' : 'text-[#5a5147]'}`}><PresenceDot online={player.online} /><span className="truncate">{index === 0 ? `Đang chơi ${mode === 'xiangqi' ? 'Cờ Tướng' : 'Cờ Úp'}` : player.playing}</span></p></div>
              </div>
              <div className="flex h-full items-center justify-center rounded-[9px] bg-[#b68c53]/20">
                <span className="relative flex h-[44px] w-[122px] items-center justify-center font-arial text-[22px] text-[#fff0d7]"><span aria-hidden="true" className="absolute inset-y-0 left-[18px] right-0 rounded-r-lg border border-[#b4792d] bg-[linear-gradient(#673117,#2f1208)] shadow-[inset_0_0_0_1px_#9c5d23]" /><img src={redGeneral} alt={`Điểm ${mode === 'xiangqi' ? 'Cờ Tướng' : 'Cờ Úp'}`} className="absolute -left-[8px] z-10 size-[50px] object-contain" /><span className="relative z-10 translate-x-[15px]">{player.elo}</span></span>
              </div>
              <button type="button" onClick={() => onView(player.name)} className={`${socialActionButton} group shadow-[0_2px_3px_#4a240d99] transition-[filter] duration-150 hover:brightness-110 motion-reduce:transition-none`} style={{ ...socialActionStyle, height: 52, fontSize: 24, textShadow: '0 1px 0 #f7d388' }} aria-label={`Vào xem ${player.name}`}>Vào xem <svg aria-hidden="true" viewBox="0 0 12 16" className="h-[17px] w-[12px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 5 5-5 5" /></svg></button>
            </li>)}
          </ol>
        </section>
      </div>
      {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[76px] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}
    </div>
  </dialog>
}
