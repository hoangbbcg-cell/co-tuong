import { useState, type RefObject } from 'react'
import redGeneral from '../../../assets/pieces/red-general.png'
import blackGeneral from '../../../assets/pieces/black-general.png'
import historyBanner from '../../../assets/history/history-banner.png'
import historyParchmentBackground from '../../../assets/history/history-parchment-background.png'
import playedTab from '../../../assets/history/history-tab-played.png'
import watchedTab from '../../../assets/history/history-tab-watched.png'
import replayButtonFrame from '../../../assets/history/history-replay-button-frame.png'
import concealedPiece from '../../../assets/history/history-concealed-piece.png'
import winResult from '../../../assets/history/history-result-win-v2.png'
import lossResult from '../../../assets/history/history-result-loss-v2.png'
import socialHeaderLandscape from '../../../assets/rankings/social-header-landscape.png'
import { buttonInteraction } from '../../../lib/uiClasses'
import type { useHistoryLayout } from '../hooks/useHistoryLayout'
import { SocialAvatar, socialPanelClass } from './SocialUi'

type HistoryTab = 'played' | 'watched'
type MatchResult = 'Thắng' | 'Thua'

const matches: { date: string; time: string; opponent: string; result: MatchResult; variant: 'xiangqi' | 'jieqi' }[] = [
  { date: '18/09/2026', time: '12:02', opponent: 'A80803871', result: 'Thắng', variant: 'jieqi' },
  { date: '18/09/2026', time: '11:59', opponent: 'B05497616', result: 'Thắng', variant: 'xiangqi' },
  { date: '18/09/2026', time: '11:57', opponent: 'B28358963', result: 'Thua', variant: 'jieqi' },
  { date: '18/09/2026', time: '11:55', opponent: 'Duoc2626...', result: 'Thua', variant: 'jieqi' },
  { date: '18/09/2026', time: '11:52', opponent: 'B00156780', result: 'Thắng', variant: 'jieqi' },
  { date: '18/09/2026', time: '11:42', opponent: 'A91706186', result: 'Thua', variant: 'jieqi' },
  { date: '18/09/2026', time: '11:41', opponent: 'Thaiduy9...', result: 'Thắng', variant: 'xiangqi' },
]

function ConcealedPiece({ className = 'size-[43px]' }: { className?: string }) {
  return <img src={concealedPiece} alt="Quân úp" className={`shrink-0 object-contain ${className}`} />
}

function Player({ name, result }: { name: string; result: MatchResult }) {
  const win = result === 'Thắng'
  return <div className="flex min-w-0 items-center">
    <span className="relative z-10 grid size-[51px] shrink-0 place-items-center [&>span]:size-[51px]"><SocialAvatar /></span>
    <span className={`-ml-2 flex h-[43px] min-w-0 flex-1 items-center gap-2 rounded-r-[8px] border-y border-r pl-4 ${win ? 'border-[#c9a46b] bg-[linear-gradient(90deg,#efc45c_0%,#f5d273_34%,#f8df99_56%,#f7e8bf_76%,#f4e5c8_100%)] shadow-[inset_0_1px_0_#fff1c8]' : 'border-[#9fbac5] bg-[linear-gradient(90deg,#b9dce7_0%,#cde6ed_28%,#e4eef0_46%,#f1e9d5_64%,#f4e5c8_100%)] shadow-[inset_0_1px_0_#f4fcff]'}`}>
      <strong className="min-w-0 flex-1 truncate font-arial text-[18px] font-medium text-[#271608]">{name}</strong>
      <img src={win ? winResult : lossResult} alt={result} className={`m-0 block h-[39px] w-auto shrink-0 border-0 p-0 object-contain ${win ? '' : '-translate-x-[2px] -translate-y-[2px]'}`} />
    </span>
  </div>
}

export function HistoryDialog({ dialogRef, layout, name, onClose, onReplay }: {
  dialogRef: RefObject<HTMLDialogElement | null>
  layout: ReturnType<typeof useHistoryLayout>
  name: string
  onClose: () => void
  onReplay: (opponent: string) => void
}) {
  const [tab, setTab] = useState<HistoryTab>('played')
  const visibleMatches = tab === 'played' ? matches : matches.slice(1, 4)

  return <dialog ref={dialogRef} aria-labelledby="history-title" onCancel={event => { event.preventDefault(); onClose() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#43240f] backdrop:bg-black/50" style={{ width: layout.width * layout.scale, height: layout.height * layout.scale }}>
    <div className="absolute top-0 left-0 origin-top-left rounded-[22px] border-[5px] border-[#5e3014] bg-[radial-gradient(ellipse_at_50%_8%,#b87a3344,transparent_38%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] px-[36px] pt-[52px] pb-[28px] shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]" style={{ width: layout.width, height: layout.height, transform: `scale(${layout.scale})` }}>
      <header className="absolute -top-[50px] left-1/2 z-20 w-[650px] -translate-x-1/2 text-center">
        <img src={historyBanner} alt="" className="pointer-events-none m-0 block h-auto w-full border-0 p-0" />
        <h2 id="history-title" className="sr-only">Lịch sử</h2>
      </header>
      <button type="button" onClick={onClose} className={`${buttonInteraction} absolute top-[24px] right-[28px] z-30 grid size-[56px] place-items-center rounded-xl border-2 border-[#efb75d] bg-[linear-gradient(#6e3d17,#291207)] text-[42px] leading-none text-[#ffe3a2] shadow-[inset_0_0_0_3px_#3f1a08,0_3px_4px_#160804]`} aria-label="Đóng">×</button>
      <div className="relative flex h-full min-h-0 flex-col">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[8px] h-[104px] overflow-hidden rounded-[10px] opacity-80 shadow-[inset_0_0_18px_8px_#241107]">
          <img src={socialHeaderLandscape} alt="" className="size-full object-cover object-center" />
        </div>
        <nav className="relative z-10 mx-auto mb-1 grid h-[58px] w-[610px] shrink-0 grid-cols-2 gap-4" role="tablist" aria-label="Loại lịch sử">
          <button type="button" role="tab" aria-selected={tab === 'played'} onClick={() => setTab('played')} className={`${buttonInteraction} relative isolate grid min-w-0 place-items-center`}><img src={playedTab} alt="" className="pointer-events-none h-[54px] w-auto max-w-full object-contain" />{tab !== 'played' && <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#24130a]/85 mix-blend-color" style={{ maskImage: `url(${playedTab})`, maskPosition: 'center', maskRepeat: 'no-repeat', maskSize: 'auto 54px', WebkitMaskImage: `url(${playedTab})`, WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat', WebkitMaskSize: 'auto 54px' }} />}<span className="sr-only">Đã chơi</span></button>
          <button type="button" role="tab" aria-selected={tab === 'watched'} onClick={() => setTab('watched')} className={`${buttonInteraction} relative isolate grid min-w-0 place-items-center`}><img src={watchedTab} alt="" className="pointer-events-none h-[54px] w-auto max-w-full object-contain" />{tab === 'watched' && <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#c82616]/80 mix-blend-color" style={{ maskImage: `url(${watchedTab})`, maskPosition: 'center', maskRepeat: 'no-repeat', maskSize: 'auto 54px', WebkitMaskImage: `url(${watchedTab})`, WebkitMaskPosition: 'center', WebkitMaskRepeat: 'no-repeat', WebkitMaskSize: 'auto 54px' }} />}<span className="sr-only">Đã xem</span></button>
        </nav>

        <section className={`${socialPanelClass} z-10 flex flex-col p-[10px]`} style={{ backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' }} aria-label={tab === 'played' ? 'Các ván đã chơi' : 'Các ván đã xem'}>
          <ol className="grid min-h-0 flex-1 grid-rows-7 gap-[5px]">
            {visibleMatches.map(match => <li key={`${match.time}-${match.opponent}`} className="grid min-h-0 grid-cols-[118px_minmax(0,1fr)_96px_minmax(0,1fr)_149px] items-center gap-3 rounded-[8px] border border-[#c7a370]/70 bg-[linear-gradient(90deg,#f3dfb8,#ecd09d_48%,#f2ddb4)] px-3 shadow-[inset_0_1px_0_#fff0d0]">
              <time className="text-center font-arial text-[17px] leading-[20px] text-[#372416]"><span className="block">{match.date}</span><span>{match.time}</span></time>
              <Player name={name} result={match.result} />
              <div className="flex items-center justify-center gap-1.5"><img src={redGeneral} alt="Quân đỏ" className="size-[47px] object-contain" />{match.variant === 'xiangqi' ? <img src={blackGeneral} alt="Quân đen" className="size-[47px] object-contain" /> : <ConcealedPiece />}</div>
              <Player name={match.opponent} result={match.result === 'Thắng' ? 'Thua' : 'Thắng'} />
              <button type="button" onClick={() => onReplay(match.opponent)} className={`${buttonInteraction} relative h-[52px] w-[151px] shrink-0 overflow-hidden`}><img src={replayButtonFrame} alt="" className="pointer-events-none absolute inset-0 size-full object-fill" /><span className="pointer-events-none relative flex size-full items-center justify-center gap-2 pb-px font-arial text-[19px] leading-none font-normal text-[#f4dcc0] [text-shadow:0_1px_1px_#351407]"><span aria-hidden="true" className="text-[23px] text-[#ffe0a0]">▶</span>Xem lại</span></button>
            </li>)}
          </ol>
          <footer className="mt-[7px] flex h-[52px] shrink-0 items-center justify-center gap-12 rounded-[10px] bg-[linear-gradient(180deg,#4e2611_0%,#311408_55%,#4a210e_100%)] px-5 text-[#eed3a0] shadow-[inset_0_0_0_2px_#6f3a18]">
            <span className="flex items-center gap-2"><img src={redGeneral} alt="" className="size-[38px] object-contain" /><ConcealedPiece className="size-[38px]" /><span className="font-arial text-[15px] leading-4">Cờ úp<br /><small>(Một bên ẩn quân)</small></span></span>
            <span className="h-[34px] w-px bg-[#c08b4e88]" />
            <span className="flex items-center gap-2"><img src={redGeneral} alt="" className="size-[38px] object-contain" /><img src={blackGeneral} alt="" className="size-[38px] object-contain" /><span className="font-arial text-[15px] leading-4">Cờ tướng<br /><small>(Đầy đủ quân cờ)</small></span></span>
          </footer>
        </section>
      </div>
      {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[76px] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}
    </div>
  </dialog>
}
