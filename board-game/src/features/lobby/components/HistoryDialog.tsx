import { HistoryPlayer } from './HistoryPlayer'
import { refreshMatchHistory } from '../../../services/accountSession'
import mobileHistoryTabs from '../../../assets/b52ef10c-bb5a-4de9-800e-24e6a8d904eb.png'
import { gameUtilityButton, socialListScrollbarClass } from '../../../lib/uiClasses'
import { usePlayedMatches } from '../../../store/playedMatchesStore'
import { savedMatchSide } from '../../../lib/savedMatchPerspective'

import { SavedMatchesList } from './SavedMatchesList'
import { useSavedMatches } from '../../../store/savedMatchesStore'
import { useSessionStore } from '../../../store/sessionStore'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import type { RecordedMatch } from '../../../types/recordedMatch'
import { useInviteSentNotice } from './InviteSentNotice'
import redGeneral from '../../../assets/history/history-red-user.png'
import blackGeneral from '../../../assets/history/history-black-user.png'
import concealedPiece from '../../../assets/history/history-hidden-user.png'
import historyBanner from '../../../assets/history/history-banner.png'
import historyParchmentBackground from '../../../assets/history/history-parchment-background.webp'
import replayButtonFrame from '../../../assets/history/history-replay-button-frame.png'
import socialHeaderLandscape from '../../../assets/rankings/social-header-landscape.png'
import { buttonInteraction, historyEmptyTextClass } from '../../../lib/uiClasses'
import type { useHistoryLayout } from '../hooks/useHistoryLayout'
import { socialPanelClass } from './SocialUi'
import { socialPlayerRowClass, getSocialRowStyle, DesktopSocialLandscape } from './SocialDialogFrame'
import { DialogCloseButton } from './DialogCloseButton'
import { HistoryHoldNotice } from './HistoryHoldNotice'
import { usePressToRevealDelete } from '../hooks/usePressToRevealDelete'
import { PositionIcon } from '../../game/components/PositionIcon'
import { playBoardEntryActionSound } from '../../../lib/uiActionSound'

type HistoryTab = 'played' | 'watched'


function HistoryTabButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  // Fixed artwork bounds from the four-state sprite keep both states the same size.
  const mobileViewBox = `${selected ? 1100 : 20} ${label === 'Đã lưu' ? 374 : 110} 1050 220`
  return <button type="button" data-ui-selection-sound role="tab" aria-selected={selected} onClick={onClick} className={`${buttonInteraction} relative isolate grid min-w-0 place-items-center compact:h-[var(--history-tab-height)] compact:w-[var(--history-tab-width)] compact:shrink-0`}>
    <svg aria-hidden="true" viewBox={mobileViewBox} preserveAspectRatio="none" className="pointer-events-none size-full"><image href={mobileHistoryTabs} x="0" y="0" width="2173" height="724" /></svg>
    <span className="sr-only">{label}</span>
  </button>
}


function ConcealedPiece({ className = 'size-[var(--ui-p-47,47px)]' }: { className?: string }) {
  return <CrispUiImage src={concealedPiece} alt="Quân úp" className={`m-0 block shrink-0 border-0 p-0 object-contain ${className}`} />
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
  const savePress = usePressToRevealDelete(tab === 'played', `${name}:${tab}`, 200, false, !layout.compact)
  const saveFeedback = useInviteSentNotice()
  const savePending = useRef(false)
  const [saving, setSaving] = useState(false)
  const historySession = useRef(0)
  function resetHistory() {
    historySession.current += 1
    setTab('played')
    savePress.clear()
    saveFeedback.clear()
    setSaving(false)
  }
  const resetRef = useRef(resetHistory)
  resetRef.current = resetHistory
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const observer = new MutationObserver(() => resetRef.current())
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] })
    return () => observer.disconnect()
  }, [dialogRef])
  function closeHistory() {
    resetHistory()
    onClose()
  }
  async function savePlayedMatch(record: RecordedMatch) {
    if (savePending.current) return
    savePending.current = true
    setSaving(true)
    const session = historySession.current
    try {
      await useSavedMatches.getState().save(name, record, !!useSessionStore.getState().account && 'serverAccountId' in record && !!record.serverAccountId)
      if (session !== historySession.current) return
      savePress.clear()
      saveFeedback.show('Đã lưu')
    } catch {
      if (session === historySession.current) saveFeedback.show('Không thể lưu ván cờ. Hãy thử lại.')
    } finally {
      savePending.current = false
      setSaving(false)
    }
  }
  const playedEntries = usePlayedMatches(state => state.entries)
  const displayedRecords = playedEntries.filter(item => item.owner === name && item.states.at(-1)?.phase === 'finished' && !!item.states.at(-1)?.result?.winner).sort((a, b) => b.endedAt - a.endedAt)
  const frameStyle: CSSProperties = {
    ...getCrispUiLayout(layout.scale, layout.width, layout.height),
    ...({ '--social-row-gap': `${Math.round(8 * layout.scale)}px` } as CSSProperties),
    ...(layout.compact ? {
      backgroundImage: `url(${socialHeaderLandscape})`,
      backgroundSize: '100% auto',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#2b160b',
    } : { paddingInline: Math.round(24 * layout.scale), paddingBottom: Math.round(24 * layout.scale) }),
  }

  return <dialog ref={dialogRef} aria-labelledby="history-title" onClose={resetHistory} onCancel={event => { event.preventDefault(); closeHistory() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#43240f] backdrop:bg-black/50" style={getCrispUiLayout(layout.scale, layout.width, layout.height)}>
    <div className="absolute top-0 left-0 origin-top-left rounded-[var(--ui-p-22,22px)] border-[length:var(--ui-p-5,5px)] border-[#5e3014] bg-[radial-gradient(ellipse_at_50%_8%,#b87a3344,transparent_38%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] px-[var(--ui-p-36,36px)] pt-[var(--ui-p-52,52px)] pb-[var(--ui-p-28,28px)] shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]" style={frameStyle}>
      {!layout.compact && <DesktopSocialLandscape scale={layout.scale} />}
      <header style={layout.compact ? { width: Math.round(650 * layout.scale * 1.12) } : undefined} className="absolute -top-[var(--ui-p-50,50px)] left-1/2 z-20 w-[var(--ui-p-650,650px)] -translate-x-1/2 text-center">
        <CrispUiImage src={historyBanner} alt="" className="pointer-events-none m-0 block h-auto w-full border-0 p-0" />
        <h2 id="history-title" className="sr-only">Lịch sử</h2>
      </header>
      <DialogCloseButton onClose={closeHistory} scale={layout.scale} compact={layout.compact ?? false} positionClass="top-[var(--ui-p-24,24px)] right-[var(--ui-p-28,28px)]" />
      <div className="relative flex h-full min-h-0 flex-col">
        <nav className="relative z-10 compact:z-[25] mx-auto mb-1 grid h-[var(--ui-p-58,58px)] w-[var(--ui-p-610,610px)] shrink-0 grid-cols-2 gap-4 compact:h-auto compact:w-[84%] compact:gap-10" style={{ '--history-tab-width': `${Math.round(264 * layout.scale * 1.6)}px`, '--history-tab-height': `${Math.round(70 * layout.scale * 1.6)}px` } as CSSProperties} role="tablist" aria-label="Loại lịch sử">
          <HistoryTabButton label="Đã chơi" selected={tab === 'played'} onClick={() => setTab('played')} />
          <HistoryTabButton label="Đã lưu" selected={tab === 'watched'} onClick={() => { setTab('watched'); void refreshMatchHistory('saved').catch(console.error) }} />
        </nav>


        <section className={`${socialPanelClass} z-10 flex flex-col p-[var(--ui-p-10,10px)]`} style={{ backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' }} aria-label={tab === 'played' ? 'Các ván đã chơi' : 'Các ván đã lưu'}>
          {tab === 'watched' && <SavedMatchesList owner={name} scale={layout.scale} compact={layout.compact ?? false} onClose={closeHistory} onOpenProfile={onOpenProfile} />}
          <ol style={layout.compact ? { rowGap: Math.round(8 * layout.scale) } : undefined} hidden={tab === 'watched'} className={`${layout.compact ? socialListScrollbarClass : ''} hovang-scroll-rail ${tab === 'watched' ? 'hidden' : 'grid'} min-h-0 flex-1 gap-[var(--social-row-gap)] ${displayedRecords.length === 0 ? 'grid-rows-1 place-items-center' : tab === 'watched' ? 'auto-rows-[var(--ui-p-72,72px)] content-start overflow-y-auto' : 'auto-rows-[calc((100%_-_var(--ui-p-56,56px))/_8)] content-start overflow-y-auto'} compact:overflow-y-auto compact:auto-rows-[minmax(var(--ui-p-380,380px),auto)]`}>
            {tab === 'played' && displayedRecords.length === 0 && <li className={historyEmptyTextClass}>Chưa có ván đấu đã chơi.</li>}
            {tab === 'played' && displayedRecords.map(record => {
 const leftSide = savedMatchSide(record, record.owner)
 const rightSide = leftSide === 'red' ? 'black' : 'red'
 const result = (side: 'red' | 'black') => record.states.at(-1)?.phase === 'playing' ? 'Đang đấu' as const : record.states.at(-1)?.result?.winner === side ? 'Thắng' as const : record.states.at(-1)?.result?.winner ? 'Thua' as const : 'Hòa' as const
 return <li key={record.id} {...savePress.handlersFor(record.id)} style={layout.compact ? { '--social-row-radius': getSocialRowStyle(layout.scale, true)['--social-row-radius' as keyof CSSProperties] } as CSSProperties : undefined} className={`relative grid min-h-0 ${tab === 'played' ? 'grid-cols-[var(--ui-p-118,118px)_minmax(0,1fr)_var(--ui-p-96,96px)_minmax(0,1fr)_var(--ui-p-149,149px)] gap-3 compact:[grid-template-columns:30fr_40fr_30fr] compact:gap-x-[var(--ui-p-2,2px)]' : 'grid-cols-[var(--ui-p-118,118px)_minmax(0,1fr)_var(--ui-p-96,96px)_minmax(0,1fr)_var(--ui-p-149,149px)_var(--ui-p-28,28px)] gap-2 compact:[grid-template-columns:30fr_40fr_30fr] compact:gap-x-[var(--ui-p-2,2px)]'} items-center compact:grid-rows-[auto_auto_auto] compact:gap-y-[var(--ui-p-3,3px)] compact:py-[var(--ui-p-5,5px)] ${layout.compact ? socialPlayerRowClass : 'rounded-[var(--ui-p-8,8px)] border border-[#c7a370]/70 bg-[linear-gradient(90deg,#f3dfb8,#ecd09d_48%,#f2ddb4)] px-3'} compact:px-[var(--ui-p-3,3px)]`}>
              {layout.compact ? <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 -z-10 bg-[linear-gradient(90deg,#4a261327_0%,#75451d1a_55%,transparent_100%)] shadow-[inset_9px_0_14px_-11px_#24100635]" style={{ width: Math.round(132 * layout.scale * 1.5) }} /> : <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 bg-[linear-gradient(90deg,#4a261327_0%,#75451d1a_55%,transparent_100%)] shadow-[inset_9px_0_14px_-11px_#24100635]" style={{ width: Math.round(132 * layout.scale) }} />}
              <time className="compact:col-start-1 compact:row-start-2 text-center font-arial text-[length:var(--ui-p-17,17px)] compact:text-[length:var(--ui-p-34,34px)]">{new Date(record.endedAt).toLocaleDateString('vi-VN')}<br />{new Date(record.endedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</time>
              <HistoryPlayer className="compact:col-start-1 compact:col-span-3 compact:row-start-1 compact:w-[75%] compact:justify-self-start compact:ml-[var(--ui-p-12,12px)]" name={leftSide === 'red' ? record.redName : record.blackName} avatarCode={leftSide === 'red' ? record.redAvatarCode : record.blackAvatarCode} avatarFrameCode={leftSide === 'red' ? record.redAvatarFrameCode : record.blackAvatarFrameCode} result={result(leftSide)} onOpenProfile={onOpenProfile} />
              <div className="flex min-w-0 items-center justify-center gap-1.5 compact:col-start-2 compact:row-start-2 compact:gap-0"><CrispUiImage src={redGeneral} alt="Quân đỏ" className="size-[var(--ui-p-47,47px)] object-contain compact:size-[var(--ui-p-90,90px)]" />{record.states[0].variant === 'jieqi' ? <ConcealedPiece className="size-[var(--ui-p-47,47px)] compact:size-[var(--ui-p-90,90px)]" /> : <CrispUiImage src={blackGeneral} alt="Quân đen" className="size-[var(--ui-p-47,47px)] object-contain compact:size-[var(--ui-p-90,90px)]" />}</div>
              <HistoryPlayer mirrored className="compact:col-start-1 compact:col-span-3 compact:row-start-3 compact:w-[75%] compact:justify-self-end compact:mr-[var(--ui-p-12,12px)]" name={rightSide === 'red' ? record.redName : record.blackName} avatarCode={rightSide === 'red' ? record.redAvatarCode : record.blackAvatarCode} avatarFrameCode={rightSide === 'red' ? record.redAvatarFrameCode : record.blackAvatarFrameCode} result={result(rightSide)} onOpenProfile={onOpenProfile} />
              <button type="button" className={`${buttonInteraction} relative h-[var(--ui-p-52,52px)] w-[var(--ui-p-151,151px)] compact:col-start-3 compact:row-start-2 compact:grid compact:h-[var(--ui-p-100,100px)] compact:w-full compact:place-items-center`} onClick={() => { useSavedMatches.setState({ replay: { ...record, replayRequiresSave: true } }); closeHistory(); playBoardEntryActionSound(); useSessionStore.setState({ screen: 'replay' }) }}><CrispUiImage src={replayButtonFrame} alt="" className="absolute inset-0 size-full object-contain" /><span className="relative font-arial text-[length:var(--ui-p-19,19px)] text-[#f4dcc0] compact:text-[length:var(--ui-p-38,38px)]">▶ Xem lại</span></button>
              {savePress.revealedId === record.id && savePress.revealPoint && <HistoryHoldNotice padding={10} point={savePress.revealPoint} onDismiss={savePress.clear} portalRoot={dialogRef.current}><button data-history-edit type="button" disabled={saving} onClick={() => { void savePlayedMatch(record) }} className={`${buttonInteraction} inline-flex items-center gap-2 border-0 bg-transparent p-0 text-inherit disabled:opacity-60`}><span aria-hidden="true" className={gameUtilityButton} style={{ pointerEvents: 'none' }}><PositionIcon name="save" /></span><span>Lưu ván cờ</span></button></HistoryHoldNotice>}
            </li>})}

          </ol>
        </section>
      </div>
      {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[var(--ui-p-76,76px)] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}
    </div>
    {saveFeedback.notice}
  </dialog>
}


