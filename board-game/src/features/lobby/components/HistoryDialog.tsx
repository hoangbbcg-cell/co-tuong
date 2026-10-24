import mobileHistoryTabs from '../../../assets/b52ef10c-bb5a-4de9-800e-24e6a8d904eb.png'
import { socialListScrollbarClass } from '../../../lib/uiClasses'
import { MessageAccountAvatar } from './MessageAccountAvatar'
import { usePlayedMatches } from '../../../store/playedMatchesStore'
import { savedMatchSide } from '../../../lib/savedMatchPerspective'
import { SavedPositionsList } from './SavedPositionsList'
import { useSavedMatches } from '../../../store/savedMatchesStore'
import { useSessionStore } from '../../../store/sessionStore'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { useState, type CSSProperties, type RefObject } from 'react'
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
import { buttonInteraction, historyEmptyTextClass, selectionPalette } from '../../../lib/uiClasses'
import type { useHistoryLayout } from '../hooks/useHistoryLayout'
import { socialPanelClass } from './SocialUi'
import { socialPlayerRowClass, getSocialRowStyle } from './SocialDialogFrame'
import { DialogCloseButton } from './DialogCloseButton'

type HistoryTab = 'played' | 'watched'
type MatchResult = 'Thắng' | 'Thua'

// Temporarily hide mobile saved categories; retain positions and controls for restoration.
const SHOW_MOBILE_SAVED_CATEGORIES = false

function HistoryTabButton({ label, selected, image, onClick }: { label: string; selected: boolean; image: string; onClick: () => void }) {
  // Fixed artwork bounds from the four-state sprite keep both states the same size.
  const mobileViewBox = `${selected ? 1100 : 20} ${label === 'Đã lưu' ? 374 : 110} 1050 220`
  return <button type="button" role="tab" aria-selected={selected} onClick={onClick} className={`${buttonInteraction} relative isolate grid min-w-0 place-items-center compact:h-[var(--history-tab-height)] compact:w-[var(--history-tab-width)] compact:shrink-0`}>
    <CrispUiImage src={image} alt="" className="pointer-events-none h-[var(--ui-p-54,54px)] w-auto max-w-full object-contain compact:hidden" />
    <svg aria-hidden="true" viewBox={mobileViewBox} preserveAspectRatio="none" className="pointer-events-none hidden size-full compact:block"><image href={mobileHistoryTabs} x="0" y="0" width="2173" height="724" /></svg>
    <span className="sr-only">{label}</span>
  </button>
}


function ConcealedPiece({ className = 'size-[var(--ui-p-47,47px)]' }: { className?: string }) {
  return <CrispUiImage src={concealedPiece} alt="Quân úp" className={`m-0 block shrink-0 border-0 p-0 object-contain ${className}`} />
}

function Player({ name, result, onOpenProfile, className = '', mirrored = false }: { mirrored?: boolean; className?: string; name: string; result: MatchResult | 'Hòa'; onOpenProfile: (name: string) => void }) {
  const win = result === 'Thắng'
  return <div className={`flex min-w-0 items-center ${mirrored ? 'compact:flex-row-reverse' : ''} ${className}`}>
    <button type="button" onClick={() => onOpenProfile(name)} className={`${buttonInteraction} relative z-10 grid size-[var(--ui-p-51,51px)] shrink-0 place-items-center rounded-full border-0 bg-transparent p-0 compact:size-[var(--ui-p-96,96px)] [&>span]:size-[var(--ui-p-51,51px)] compact:[&>span]:size-[var(--ui-p-96,96px)]`} aria-label={`Mở hồ sơ của ${name}`}><MessageAccountAvatar name={name} /></button>
    <span className={`-ml-2 flex h-[var(--ui-p-43,43px)] min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-r-[var(--ui-p-8,8px)] border-y border-r pl-4 compact:h-auto compact:min-h-[var(--ui-p-96,96px)] compact:py-[var(--ui-p-4,4px)] compact:gap-[var(--ui-p-3,3px)] ${mirrored ? '' : 'compact:-ml-[var(--ui-p-48,48px)] compact:pl-[var(--ui-p-60,60px)]'} ${mirrored ? 'compact:ml-0 compact:-mr-[var(--ui-p-48,48px)] compact:flex-row-reverse compact:rounded-r-none compact:rounded-l-[var(--ui-p-8,8px)] compact:border-r-0 compact:border-l compact:pl-[var(--ui-p-4,4px)] compact:pr-[var(--ui-p-60,60px)] compact:text-right compact:[background-position:right]' : ''} ${win ? 'border-[#c9a46b] bg-[linear-gradient(90deg,#efc45c_0%,#f5d273_34%,#f8df99_56%,#f7e8bf_76%,#f4e5c8_100%)] shadow-[inset_0_1px_0_#fff1c8]' : 'border-[#9fbac5] bg-[linear-gradient(90deg,#b9dce7_0%,#cde6ed_28%,#e4eef0_46%,#f1e9d5_64%,#f4e5c8_100%)] shadow-[inset_0_1px_0_#f4fcff]'}`}>
      <strong className="min-w-0 flex-1 truncate font-heading text-[length:var(--ui-p-21,21px)] font-medium text-[#271608] compact:text-[length:var(--ui-p-48,48px)] compact:font-extrabold compact:lining-nums compact:[-webkit-text-stroke:0.2px_currentColor] compact:whitespace-nowrap compact:overflow-visible compact:text-clip compact:[overflow-wrap:anywhere] compact:leading-[1.4]"><span className="compact:hidden">{name.split(/(\d+)/).map((part, index) => index % 2 === 1 ? <span key={index} className="font-number text-[0.9em] lining-nums">{part}</span> : part)}</span><span className="hidden compact:inline">{name}</span></strong>
      {result === 'Hòa' ? <span className="font-heading">Hòa</span> : <span className="contents compact:inline-flex compact:shrink-0 compact:[&>span]:h-[var(--ui-p-63,63px)] compact:[&>span]:w-[var(--ui-p-132,132px)]"><MatchResultBadge result={result} /></span>}
    </span>
  </div>
}

export function HistoryDialog({ dialogRef, layout, name, onClose, onOpenProfile }: {
  dialogRef: RefObject<HTMLDialogElement | null>
  layout: ReturnType<typeof useHistoryLayout>
  name: string
  onClose: () => void
  onReplay: (opponent: string) => void
  onOpenProfile: (name: string) => void
}) {
  const [tab, setTab] = useState<HistoryTab>('played')
  const [selectedSavedType, setSavedType] = useState<'matches' | 'positions'>('matches')
  const showSavedCategories = !layout.compact || SHOW_MOBILE_SAVED_CATEGORIES
  const savedType = showSavedCategories ? selectedSavedType : 'matches'
  const playedEntries = usePlayedMatches(state => state.entries)
  const entries = useSavedMatches(state => state.entries)
  const savedMatches = entries.filter(item => item.owner === name)
  const [saveNotice, setSaveNotice] = useState('')
  const displayedRecords = tab === 'played' ? playedEntries.filter(item => item.owner === name) : savedMatches
  const frameStyle: CSSProperties = {
    ...getCrispUiLayout(layout.scale, layout.width, layout.height),
    ...(layout.compact ? {
      backgroundImage: `url(${socialHeaderLandscape})`,
      backgroundSize: '100% auto',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#2b160b',
    } : {}),
  }

  return <dialog ref={dialogRef} aria-labelledby="history-title" onCancel={event => { event.preventDefault(); onClose() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#43240f] backdrop:bg-black/50" style={getCrispUiLayout(layout.scale, layout.width, layout.height)}>
    <div className="absolute top-0 left-0 origin-top-left rounded-[var(--ui-p-22,22px)] border-[length:var(--ui-p-5,5px)] border-[#5e3014] bg-[radial-gradient(ellipse_at_50%_8%,#b87a3344,transparent_38%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] px-[var(--ui-p-36,36px)] pt-[var(--ui-p-52,52px)] pb-[var(--ui-p-28,28px)] shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]" style={frameStyle}>
      <header style={layout.compact ? { width: Math.round(650 * layout.scale * 1.12) } : undefined} className="absolute -top-[var(--ui-p-50,50px)] left-1/2 z-20 w-[var(--ui-p-650,650px)] -translate-x-1/2 text-center">
        <CrispUiImage src={historyBanner} alt="" className="pointer-events-none m-0 block h-auto w-full border-0 p-0" />
        <h2 id="history-title" className="sr-only">Lịch sử</h2>
      </header>
      <DialogCloseButton onClose={onClose} scale={layout.scale} compact={layout.compact ?? false} positionClass="top-[var(--ui-p-24,24px)] right-[var(--ui-p-28,28px)]" />
      <div className="relative flex h-full min-h-0 flex-col">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[var(--ui-p-8,8px)] h-[var(--ui-p-104,104px)] overflow-hidden rounded-[var(--ui-p-10,10px)] opacity-80 shadow-[inset_0_0_18px_8px_#241107] compact:hidden">
          <CrispUiImage src={socialHeaderLandscape} alt="" className="size-full object-cover object-center" />
        </div>
        <nav className="relative z-10 mx-auto mb-1 grid h-[var(--ui-p-58,58px)] w-[var(--ui-p-610,610px)] shrink-0 grid-cols-2 gap-4 compact:h-auto compact:w-[84%] compact:gap-10" style={{ '--history-tab-width': `${Math.round(264 * layout.scale * 1.6)}px`, '--history-tab-height': `${Math.round(70 * layout.scale * 1.6)}px` } as CSSProperties} role="tablist" aria-label="Loại lịch sử">
          <HistoryTabButton label="Đã chơi" selected={tab === 'played'} image={tab === 'played' ? playedTab : playedTabUnselected} onClick={() => setTab('played')} />
          <HistoryTabButton label="Đã lưu" selected={tab === 'watched'} image={tab === 'watched' ? savedTabSelected : savedTab} onClick={() => setTab('watched')} />
        </nav>

        <nav aria-label="Loại đã lưu" aria-hidden={tab !== 'watched' || !showSavedCategories} className={`relative z-10 mb-2 shrink-0 justify-center gap-3 ${tab === 'watched' && showSavedCategories ? 'flex' : 'hidden'}`}>
          {([{ value: 'matches', label: 'Ván đấu' }, { value: 'positions', label: 'Thế cờ' }] as const).map(item => <button key={item.value} type="button" disabled={tab !== 'watched' || !showSavedCategories} aria-pressed={savedType === item.value} onClick={() => setSavedType(item.value)} className={`${buttonInteraction} rounded border px-6 py-1 font-heading text-[length:var(--ui-p-21,21px)] compact:min-h-[var(--ui-p-90,90px)] compact:min-w-[var(--ui-p-270,270px)] compact:px-[var(--ui-p-36,36px)] compact:py-[var(--ui-p-12,12px)] compact:text-[length:var(--ui-p-43,43px)] ${savedType === item.value ? `${selectionPalette.selected.border} ${selectionPalette.selected.surface} ${selectionPalette.selected.text}` : `${selectionPalette.unselected.border} ${selectionPalette.unselected.surface} ${selectionPalette.unselected.text}`}`}>{item.label}</button>)}
        </nav>
        <section className={`${socialPanelClass} z-10 flex flex-col p-[var(--ui-p-10,10px)]`} style={{ backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' }} aria-label={tab === 'played' ? 'Các ván đã chơi' : savedType === 'matches' ? 'Các ván đã lưu' : 'Các thế cờ đã lưu'}>
          {tab === 'watched' && savedType === 'positions' && <SavedPositionsList owner={name} scale={layout.scale} compact={layout.compact ?? false} onClose={onClose} />}
          {saveNotice && <p role="status" className="text-center">{saveNotice}</p>}
          <ol style={layout.compact ? { rowGap: Math.round(8 * layout.scale) } : undefined} hidden={tab === 'watched' && savedType === 'positions'} className={`${layout.compact ? socialListScrollbarClass : ''} ${tab === 'watched' && savedType === 'positions' ? 'hidden' : 'grid'} min-h-0 flex-1 gap-[var(--ui-p-5,5px)] ${displayedRecords.length === 0 ? 'grid-rows-1 place-items-center' : tab === 'watched' ? 'auto-rows-[var(--ui-p-72,72px)] content-start overflow-y-auto' : 'auto-rows-[calc((100%_-_var(--ui-p-35,35px))/_8)] content-start overflow-y-auto'} compact:overflow-y-auto compact:auto-rows-[minmax(var(--ui-p-380,380px),auto)]`}>
            {tab === 'played' && displayedRecords.length === 0 && <li className={historyEmptyTextClass}>Chưa có ván đấu đã chơi.</li>}
            {tab === 'watched' && savedType === 'matches' && savedMatches.length === 0 && <li className={historyEmptyTextClass}>Chưa có ván đấu đã lưu.</li>}
            {(tab === 'played' || savedType === 'matches') && [...displayedRecords].reverse().map(record => {
 const leftSide = savedMatchSide(record, record.owner)
 const rightSide = leftSide === 'red' ? 'black' : 'red'
 const result = (side: 'red' | 'black') => record.states.at(-1)?.result?.winner === side ? 'Thắng' as const : record.states.at(-1)?.result?.winner ? 'Thua' as const : 'Hòa' as const
 return <li key={record.id} style={layout.compact ? { '--social-row-radius': getSocialRowStyle(layout.scale, true)['--social-row-radius' as keyof CSSProperties] } as CSSProperties : undefined} className={`relative grid min-h-0 ${tab === 'played' ? 'grid-cols-[var(--ui-p-118,118px)_minmax(0,1fr)_var(--ui-p-96,96px)_minmax(0,1fr)_var(--ui-p-149,149px)] gap-3 compact:[grid-template-columns:30fr_40fr_30fr] compact:gap-x-[var(--ui-p-2,2px)]' : 'grid-cols-[var(--ui-p-118,118px)_minmax(0,1fr)_var(--ui-p-96,96px)_minmax(0,1fr)_var(--ui-p-149,149px)_var(--ui-p-28,28px)] gap-2 compact:[grid-template-columns:30fr_40fr_30fr] compact:gap-x-[var(--ui-p-2,2px)]'} items-center compact:grid-rows-[auto_auto_auto] compact:gap-y-[var(--ui-p-3,3px)] compact:py-[var(--ui-p-5,5px)] ${layout.compact ? socialPlayerRowClass : 'rounded-[var(--ui-p-8,8px)] border border-[#c7a370]/70 bg-[linear-gradient(90deg,#f3dfb8,#ecd09d_48%,#f2ddb4)] px-3'} compact:px-[var(--ui-p-3,3px)]`}>
              {layout.compact && <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 -z-10 bg-[linear-gradient(90deg,#4a261327_0%,#75451d1a_55%,transparent_100%)] shadow-[inset_9px_0_14px_-11px_#24100635]" style={{ width: Math.round(132 * layout.scale * 1.5) }} />}
              <time className="compact:col-start-1 compact:row-start-2 text-center font-arial text-[length:var(--ui-p-17,17px)] compact:text-[length:var(--ui-p-34,34px)]">{new Date(record.endedAt).toLocaleDateString('vi-VN')}<br />{new Date(record.endedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</time>
              <Player className="compact:col-start-1 compact:col-span-3 compact:row-start-1 compact:w-[75%] compact:justify-self-start compact:ml-[var(--ui-p-12,12px)]" name={leftSide === 'red' ? record.redName : record.blackName} result={result(leftSide)} onOpenProfile={onOpenProfile} />
              <div className="flex min-w-0 items-center justify-center gap-1.5 compact:col-start-2 compact:row-start-2 compact:gap-0"><CrispUiImage src={redGeneral} alt="Quân đỏ" className="size-[var(--ui-p-47,47px)] object-contain compact:size-[var(--ui-p-90,90px)]" />{record.states[0].variant === 'jieqi' ? <ConcealedPiece className="size-[var(--ui-p-47,47px)] compact:size-[var(--ui-p-90,90px)]" /> : <CrispUiImage src={blackGeneral} alt="Quân đen" className="size-[var(--ui-p-47,47px)] object-contain compact:size-[var(--ui-p-90,90px)]" />}</div>
              <Player mirrored className="compact:col-start-1 compact:col-span-3 compact:row-start-3 compact:w-[75%] compact:justify-self-end compact:mr-[var(--ui-p-12,12px)]" name={rightSide === 'red' ? record.redName : record.blackName} result={result(rightSide)} onOpenProfile={onOpenProfile} />
              <button type="button" className={`${buttonInteraction} relative h-[var(--ui-p-52,52px)] w-[var(--ui-p-151,151px)] compact:col-start-3 compact:row-start-2 compact:grid compact:h-[var(--ui-p-100,100px)] compact:w-full compact:place-items-center`} onClick={() => { useSavedMatches.setState({ replay: { ...record, replayRequiresSave: true } }); onClose(); useSessionStore.setState({ screen: 'replay' }) }}><CrispUiImage src={replayButtonFrame} alt="" className="absolute inset-0 size-full object-contain" /><span className="relative font-arial text-[length:var(--ui-p-19,19px)] text-[#f4dcc0] compact:text-[length:var(--ui-p-38,38px)]">▶ Xem lại</span></button>
              {tab === 'watched' && <button data-history-delete type="button" aria-label={`Xóa ván ${record.redName} với ${record.blackName}`} className={`${buttonInteraction} grid h-[var(--ui-p-36,36px)] w-[var(--ui-p-28,28px)] place-items-center compact:col-start-3 compact:row-start-1 compact:justify-self-end compact:size-[var(--ui-p-72,72px)] compact:mr-[var(--ui-p-12,12px)] rounded-md border border-[#696761] bg-[linear-gradient(180deg,#777672,#5b5a56)] text-[#e5e7eb]`} onClick={async () => { try { await useSavedMatches.getState().remove(name, record.id); setSaveNotice('') } catch { setSaveNotice('Không thể xóa ván đã lưu. Hãy thử lại.') } }}><svg aria-hidden="true" viewBox="0 0 24 24" className="h-[var(--ui-p-24,24px)] w-[var(--ui-p-19,19px)] compact:size-[var(--ui-p-43,43px)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M10 10v8m4-8v8M6 6l1 15h10l1-15M9 6V3h6v3" /></svg></button>}
            </li>})}

          </ol>
        </section>
      </div>
      {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[var(--ui-p-76,76px)] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}
    </div>
  </dialog>
}



