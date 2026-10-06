import { CrispUiImage } from '../../../lib/CrispUiImage'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { useState, type RefObject } from 'react'
import redGeneral from '../../../assets/history/history-red-user.png'
import blackGeneral from '../../../assets/history/history-black-user.png'
import concealedPiece from '../../../assets/history/history-hidden-user.png'
import historyBanner from '../../../assets/history/history-banner.png'
import historyParchmentBackground from '../../../assets/history/history-parchment-background.png'
import playedTab from '../../../assets/history/history-tab-played.png'
import playedTabUnselected from '../../../assets/history/history-tab-played-unselected.png'
import savedTab from '../../../assets/history/history-tab-saved.png'
import savedTabSelected from '../../../assets/history/history-tab-saved-selected.png'
import replayButtonFrame from '../../../assets/history/history-replay-button-frame.png'
import { MatchResultBadge } from './MatchResultBadge'
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

function ConcealedPiece({ className = 'size-[var(--ui-p-47,47px)]' }: { className?: string }) {
  return <CrispUiImage src={concealedPiece} alt="Quân úp" className={`m-0 block shrink-0 border-0 p-0 object-contain ${className}`} />
}

function Player({ name, result, onOpenProfile }: { name: string; result: MatchResult; onOpenProfile: (name: string) => void }) {
  const win = result === 'Thắng'
  return <div className="flex min-w-0 items-center">
    <button type="button" onClick={() => onOpenProfile(name)} className={`${buttonInteraction} relative z-10 grid size-[var(--ui-p-51,51px)] shrink-0 place-items-center rounded-full border-0 bg-transparent p-0 [&>span]:size-[var(--ui-p-51,51px)]`} aria-label={`Mở hồ sơ của ${name}`}><SocialAvatar /></button>
    <span className={`-ml-2 flex h-[var(--ui-p-43,43px)] min-w-0 flex-1 items-center gap-2 rounded-r-[var(--ui-p-8,8px)] border-y border-r pl-4 ${win ? 'border-[#c9a46b] bg-[linear-gradient(90deg,#efc45c_0%,#f5d273_34%,#f8df99_56%,#f7e8bf_76%,#f4e5c8_100%)] shadow-[inset_0_1px_0_#fff1c8]' : 'border-[#9fbac5] bg-[linear-gradient(90deg,#b9dce7_0%,#cde6ed_28%,#e4eef0_46%,#f1e9d5_64%,#f4e5c8_100%)] shadow-[inset_0_1px_0_#f4fcff]'}`}>
      <strong className="min-w-0 flex-1 truncate font-arial text-[length:var(--ui-p-18,18px)] font-medium text-[#271608]">{name}</strong>
      <MatchResultBadge result={result} />
    </span>
  </div>
}

export function HistoryDialog({ dialogRef, layout, name, onClose, onReplay, onOpenProfile }: {
  dialogRef: RefObject<HTMLDialogElement | null>
  layout: ReturnType<typeof useHistoryLayout>
  name: string
  onClose: () => void
  onReplay: (opponent: string) => void
  onOpenProfile: (name: string) => void
}) {
  const [tab, setTab] = useState<HistoryTab>('played')
  const [historyMatches, setHistoryMatches] = useState(matches)
  const [savedMatches, setSavedMatches] = useState(() => matches.filter(match => match.time !== '12:02').slice(0, 3))
  const visibleMatches = tab === 'played' ? historyMatches : savedMatches

  return <dialog ref={dialogRef} aria-labelledby="history-title" onCancel={event => { event.preventDefault(); onClose() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#43240f] backdrop:bg-black/50" style={getCrispUiLayout(layout.scale, layout.width, layout.height)}>
    <div className="absolute top-0 left-0 origin-top-left rounded-[var(--ui-p-22,22px)] border-[length:var(--ui-p-5,5px)] border-[#5e3014] bg-[radial-gradient(ellipse_at_50%_8%,#b87a3344,transparent_38%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] px-[var(--ui-p-36,36px)] pt-[var(--ui-p-52,52px)] pb-[var(--ui-p-28,28px)] shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]" style={getCrispUiLayout(layout.scale, layout.width, layout.height)}>
      <header className="absolute -top-[var(--ui-p-50,50px)] left-1/2 z-20 w-[var(--ui-p-650,650px)] -translate-x-1/2 text-center">
        <CrispUiImage src={historyBanner} alt="" className="pointer-events-none m-0 block h-auto w-full border-0 p-0" />
        <h2 id="history-title" className="sr-only">Lịch sử</h2>
      </header>
      <button type="button" onClick={onClose} className={`${buttonInteraction} absolute top-[var(--ui-p-24,24px)] right-[var(--ui-p-28,28px)] z-30 grid size-[var(--ui-p-56,56px)] place-items-center rounded-xl border-2 border-[#efb75d] bg-[linear-gradient(#6e3d17,#291207)] text-[length:var(--ui-p-42,42px)] leading-none text-[#ffe3a2] shadow-[inset_0_0_0_3px_#3f1a08,0_3px_4px_#160804]`} aria-label="Đóng">×</button>
      <div className="relative flex h-full min-h-0 flex-col">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[var(--ui-p-8,8px)] h-[var(--ui-p-104,104px)] overflow-hidden rounded-[var(--ui-p-10,10px)] opacity-80 shadow-[inset_0_0_18px_8px_#241107]">
          <CrispUiImage src={socialHeaderLandscape} alt="" className="size-full object-cover object-center" />
        </div>
        <nav className="relative z-10 mx-auto mb-1 grid h-[var(--ui-p-58,58px)] w-[var(--ui-p-610,610px)] shrink-0 grid-cols-2 gap-4" role="tablist" aria-label="Loại lịch sử">
          <button type="button" role="tab" aria-selected={tab === 'played'} onClick={() => setTab('played')} className={`${buttonInteraction} relative isolate grid min-w-0 place-items-center`}><CrispUiImage src={tab === 'played' ? playedTab : playedTabUnselected} alt="" className="pointer-events-none h-[var(--ui-p-54,54px)] w-auto max-w-full object-contain" /><span className="sr-only">Đã chơi</span></button>
          <button type="button" role="tab" aria-selected={tab === 'watched'} onClick={() => setTab('watched')} className={`${buttonInteraction} relative isolate grid min-w-0 place-items-center`}><CrispUiImage src={tab === 'watched' ? savedTabSelected : savedTab} alt="" className="pointer-events-none h-[var(--ui-p-54,54px)] w-auto max-w-full object-contain" /><span className="sr-only">Đã lưu</span></button>
        </nav>

        <section className={`${socialPanelClass} z-10 flex flex-col p-[var(--ui-p-10,10px)]`} style={{ backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' }} aria-label={tab === 'played' ? 'Các ván đã chơi' : 'Các ván đã lưu'}>
          <ol className="grid min-h-0 flex-1 grid-rows-7 gap-[var(--ui-p-5,5px)]">
            {visibleMatches.map(match => <li key={`${match.time}-${match.opponent}`} className={`grid min-h-0 items-center rounded-[var(--ui-p-8,8px)] border border-[#c7a370]/70 bg-[linear-gradient(90deg,#f3dfb8,#ecd09d_48%,#f2ddb4)] px-3 shadow-[inset_0_1px_0_#fff0d0] ${tab === 'watched' ? 'grid-cols-[var(--ui-p-118,118px)_minmax(0,1fr)_var(--ui-p-96,96px)_minmax(0,1fr)_var(--ui-p-149,149px)_var(--ui-p-28,28px)] gap-2' : 'grid-cols-[var(--ui-p-118,118px)_minmax(0,1fr)_var(--ui-p-96,96px)_minmax(0,1fr)_var(--ui-p-149,149px)] gap-3'}`}>
              <time className="text-center font-arial text-[length:var(--ui-p-17,17px)] leading-[var(--ui-p-20,20px)] text-[#372416]"><span className="block">{match.date}</span><span>{match.time}</span></time>
              <Player name={name} result={match.result} onOpenProfile={onOpenProfile} />
              <div className="flex items-center justify-center gap-1.5"><CrispUiImage src={redGeneral} alt="Quân đỏ" className="size-[var(--ui-p-47,47px)] object-contain" />{match.variant === 'xiangqi' ? <CrispUiImage src={blackGeneral} alt="Quân đen" className="size-[var(--ui-p-47,47px)] object-contain" /> : <ConcealedPiece />}</div>
              <Player name={match.opponent} result={match.result === 'Thắng' ? 'Thua' : 'Thắng'} onOpenProfile={onOpenProfile} />
              <button type="button" onClick={() => onReplay(match.opponent)} className={`${buttonInteraction} relative h-[var(--ui-p-52,52px)] w-[var(--ui-p-151,151px)] shrink-0 overflow-hidden`}><CrispUiImage src={replayButtonFrame} alt="" className="pointer-events-none absolute inset-0 size-full object-contain" /><span className="pointer-events-none relative flex size-full items-center justify-center gap-2 pb-px font-arial text-[length:var(--ui-p-19,19px)] leading-none font-normal text-[#f4dcc0] [text-shadow:0_1px_1px_#351407]"><span aria-hidden="true" className="text-[length:var(--ui-p-23,23px)] text-[#ffe0a0]">▶</span>Xem lại</span></button>
              {tab === 'watched' && <button type="button" onClick={() => setSavedMatches(current => current.filter(item => item !== match))} className={`${buttonInteraction} ml-1 grid h-[var(--ui-p-36,36px)] w-[var(--ui-p-28,28px)] place-items-center rounded-md border border-[#696761] bg-[linear-gradient(180deg,#777672,#5b5a56)] text-[#e5e7eb] shadow-[inset_0_1px_2px_#ffffff1a,0_1px_2px_#241f1a88] hover:brightness-110`} aria-label={`Xóa ván với ${match.opponent}`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[var(--ui-p-24,24px)] w-[var(--ui-p-19,19px)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M10 10v8m4-8v8M6 6l1 15h10l1-15M9 6V3h6v3" /></svg>
              </button>}
            </li>)}
          </ol>
          <footer className="mt-[var(--ui-p-7,7px)] flex h-[var(--ui-p-52,52px)] shrink-0 items-center justify-center gap-12 rounded-[var(--ui-p-10,10px)] bg-[linear-gradient(180deg,#4e2611_0%,#311408_55%,#4a210e_100%)] px-5 text-[#eed3a0] shadow-[inset_0_0_0_2px_#6f3a18]">
            <span className="flex items-center gap-2"><CrispUiImage src={redGeneral} alt="" className="size-[var(--ui-p-38,38px)] object-contain" /><CrispUiImage src={blackGeneral} alt="" className="size-[var(--ui-p-38,38px)] object-contain" /><span className="flex h-[var(--ui-p-38,38px)] items-center font-arial text-[length:var(--ui-p-18,18px)] leading-[var(--ui-p-22,22px)]">Cờ tướng</span></span>
            <span className="h-[var(--ui-p-34,34px)] w-px bg-[#c08b4e88]" />
            <span className="flex items-center gap-2"><CrispUiImage src={redGeneral} alt="" className="size-[var(--ui-p-38,38px)] object-contain" /><ConcealedPiece className="size-[var(--ui-p-38,38px)]" /><span className="flex h-[var(--ui-p-38,38px)] items-center font-arial text-[length:var(--ui-p-18,18px)] leading-[var(--ui-p-22,22px)]">Cờ úp</span></span>
          </footer>
        </section>
      </div>
      {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[var(--ui-p-76,76px)] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}
    </div>
  </dialog>
}
