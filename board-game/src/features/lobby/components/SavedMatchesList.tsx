import { historyPlayerFrame } from './HistoryPlayerFrame'
import { HistoryMatchPieces } from './HistoryMatchPieces'
import { HistoryBoardIcon } from './HistoryBoardIcon'
import { useLayoutEffect, useRef, useState } from 'react'
import { Board } from '../../game/components/Board'
import { useSavedMatches } from '../../../store/savedMatchesStore'
import { useSessionStore } from '../../../store/sessionStore'
import { savedMatchSide } from '../../../lib/savedMatchPerspective'
import { buttonInteraction, historyEmptyTextClass, socialListScrollbarClass } from '../../../lib/uiClasses'
import { MessageAccountAvatar } from './MessageAccountAvatar'
import { MobileSavedMatchRow } from './MobileSavedMatchRow'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { usePressToRevealDelete } from '../hooks/usePressToRevealDelete'
import replayButtonFrame from '../../../assets/history/history-replay-button-frame.png'

const noop = () => {}

/** Saved games use the same board-and-details presentation as saved positions. */
export function SavedMatchesList({ owner, scale, compact, onClose, onOpenProfile }: {
  owner: string; scale: number; compact: boolean; onClose: () => void; onOpenProfile: (name: string) => void
}) {
  const records = useSavedMatches(state => state.entries).filter(record => record.owner === owner).slice().reverse()
  const [error, setError] = useState('')
  const deletePress = usePressToRevealDelete(compact, owner)
  const listRef = useRef<HTMLOListElement>(null)
  const [boardWidth, setBoardWidth] = useState(() => Math.round(178 * scale))
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const row = list.firstElementChild as HTMLElement | null
      if (row) setBoardWidth(Math.max(1, compact ? Math.round(list.clientWidth * 0.36) : Math.min((row.clientHeight - 10) * 1134 / 1296, list.clientWidth * 0.35)))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [records.length, scale, compact])
  return <div className="flex min-h-0 flex-1 flex-col">
    {error && <p role="alert">{error}</p>}
    {!records.length ? <p className={`grid min-h-0 flex-1 place-items-center ${historyEmptyTextClass}`}>Chưa có ván đấu đã lưu.</p> :
      <ol ref={listRef} onScroll={deletePress.clear} className={`grid min-h-0 flex-1 auto-rows-[calc((100%_-_var(--ui-p-5,5px))/_2)] content-start gap-[var(--ui-p-5,5px)] overflow-y-auto compact:auto-rows-max compact:gap-[7px] ${socialListScrollbarClass}`}>
        {records.map(record => {
          const state = record.states.at(-1)
          if (!state) return null
          const side = savedMatchSide(record, owner)
          const players = side === 'black' ? [record.blackName, record.redName] : [record.redName, record.blackName]
          const result = state.result?.winner ? state.result.winner === side ? 'Thắng' : 'Thua' : 'Hòa'
          const deleteButton = <button data-history-delete type="button" aria-label={`Xóa ván ${record.redName} với ${record.blackName}`} className={`${buttonInteraction} absolute right-3 top-[5px] grid h-[var(--ui-p-36,36px)] w-[var(--ui-p-28,28px)] place-items-center rounded-md border border-[#696761] bg-[linear-gradient(180deg,#777672,#5b5a56)] text-[#e5e7eb] compact:right-[7px] compact:top-[7px] compact:size-[24px] compact:z-10`} onClick={async () => { try { await useSavedMatches.getState().remove(owner, record.id); deletePress.clear(); setError('') } catch { setError('Không thể xóa ván đã lưu. Hãy thử lại.') } }}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 compact:size-[16px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M10 10v8m4-8v8M6 6l1 15h10l1-15M9 6V3h6v3" /></svg></button>
          if (compact) return <MobileSavedMatchRow key={record.id} record={record} owner={owner} boardWidth={boardWidth} handlers={deletePress.handlersFor(record.id)} deleteButton={deleteButton} onOpenProfile={onOpenProfile} onReplay={() => { useSavedMatches.setState({ replay: { ...record, replayRequiresSave: true } }); onClose(); useSessionStore.setState({ screen: 'replay' }) }} />
          return <li key={record.id} {...deletePress.handlersFor(record.id)} className="relative grid min-h-0 items-center gap-[var(--ui-p-10,10px)] overflow-hidden bg-[linear-gradient(90deg,#f3dfb8,#f7e8bf_45%,#ecd09d)] px-3 py-[5px]" style={{ gridTemplateColumns: `${boardWidth}px minmax(0,1fr)` }}>
            <div inert className="pointer-events-none" aria-label={`Bàn cờ: ${record.redName} với ${record.blackName}`}>
              <Board shadow={false} board={state.board} hiddenChess={state.variant === 'jieqi'} flipped={side === 'black'} selected={null} legalMoves={[]} animation={null} frameWidth={boardWidth} scale={boardWidth / 1134} disabled showStart={false} startDisabled startLabel="" onSelect={noop} onStart={noop} />
            </div>
            <div className="flex min-h-0 min-w-0 flex-col gap-3 text-[#271608]">
              <h3 className="mr-8 truncate rounded bg-[linear-gradient(90deg,#efc45c,#f5d273_70%,#e9e5a7)] px-1 font-body text-[length:var(--ui-p-24,24px)] font-black compact:text-[length:var(--ui-p-38,38px)]">Ván đấu · {result}</h3>
              <div className="flex min-w-0 flex-wrap items-center gap-2 font-arial text-[length:var(--ui-p-17,17px)] compact:text-[length:var(--ui-p-30,30px)]">
                {players.map((name, index) => <span key={index} className="contents">
                  {index === 1 && <HistoryMatchPieces variant={state.variant} />}
                  <button type="button" onClick={() => onOpenProfile(name)} className={`${buttonInteraction} flex min-w-0 items-center gap-2`}><MessageAccountAvatar name={name} className="relative z-10 size-[var(--ui-p-34,34px)]" /><span className={`min-w-0 truncate rounded-r-[var(--ui-p-8,8px)] border-y border-r -ml-2 pl-3 pr-2 py-1 font-heading font-extrabold leading-[1.4] lining-nums [-webkit-text-stroke:0.2px_currentColor] ${historyPlayerFrame(state.result?.winner === (index === 0 ? side : side === 'red' ? 'black' : 'red'))}`}>{name}</span></button>
                </span>)}
              </div>
              <p className="flex items-center gap-2 font-arial text-[length:var(--ui-p-17,17px)] compact:text-[length:var(--ui-p-30,30px)]"><HistoryBoardIcon className="size-[var(--ui-p-24,24px)] shrink-0" />{state.variant === 'jieqi' ? 'Cờ Úp' : 'Cờ Tướng'} · {Math.max(0, record.states.length - 1)} nước</p>
              <button type="button" className={`${buttonInteraction} relative h-[var(--ui-p-52,52px)] w-[var(--ui-p-151,151px)] compact:h-[var(--ui-p-90,90px)] compact:w-[var(--ui-p-260,260px)]`} onClick={() => { useSavedMatches.setState({ replay: { ...record, replayRequiresSave: true } }); onClose(); useSessionStore.setState({ screen: 'replay' }) }}><CrispUiImage src={replayButtonFrame} alt="" className="absolute inset-0 size-full object-contain" /><span className="relative font-arial text-[length:var(--ui-p-19,19px)] text-[#f4dcc0] compact:text-[length:var(--ui-p-32,32px)]">▶ Xem lại</span></button>
            </div>
            {deleteButton}
          </li>
        })}
      </ol>}
  </div>
}
