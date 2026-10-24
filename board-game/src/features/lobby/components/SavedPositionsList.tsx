import { socialListScrollbarClass } from '../../../lib/uiClasses'
import { MessageAccountAvatar } from './MessageAccountAvatar'
import { getComputerAvatar } from '../../../lib/computerAvatar'
import { useLayoutEffect, useRef, useState } from 'react'
import { Board } from '../../game/components/Board'
import { useSavedPositions } from '../../../store/savedPositionsStore'
import { useSavedMatches } from '../../../store/savedMatchesStore'
import { useSessionStore } from '../../../store/sessionStore'
import { buttonInteraction, historyEmptyTextClass } from '../../../lib/uiClasses'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import replayButtonFrame from '../../../assets/history/history-replay-button-frame.png'
import { savedMatchSide } from '../../../lib/savedMatchPerspective'
import { NumberText } from '../../../lib/NumberText'
import { usePressToRevealDelete } from '../hooks/usePressToRevealDelete'

const noop = () => {}
function NewspaperIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="inline-block size-[var(--ui-p-24,24px)] shrink-0 align-middle" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h16v15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8h2Zm0 4v11a2 2 0 0 0 2 2" /><path d="M9 8h8v4H9Zm0 8h3m3 0h2M9 18h8" /></svg>
}
export function SavedPositionsList({ owner, scale, compact = false, onClose }: { owner: string; scale: number; compact?: boolean; onClose: () => void }) {
  const positions = useSavedPositions(state => state.entries).filter(item => item.owner === owner).slice().reverse()
  const [error, setError] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const deletePress = usePressToRevealDelete(compact && !editing, owner)
  const [editField, setEditField] = useState<'title' | 'note'>('title')
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const listRef = useRef<HTMLOListElement>(null)
  const [width, setWidth] = useState(() => 178 * scale)
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const row = list.firstElementChild as HTMLElement | null
      if (row) setWidth(Math.max(1, (row.clientHeight - 10) * 1134 / 1296))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [positions.length, scale])
  return <div className="flex min-h-0 flex-1 flex-col">
    {error && <p role="alert">{error}</p>}
    {positions.length === 0 ? <p className={`grid min-h-0 flex-1 place-items-center ${historyEmptyTextClass}`}>Chưa có thế cờ đã lưu.</p> : <ol ref={listRef} onScroll={compact ? deletePress.clear : undefined} className={`-mr-[10px] grid min-h-0 flex-1 auto-rows-[calc((100%_-_var(--ui-p-5,5px))/_2)] grid-cols-1 content-start gap-[var(--ui-p-5,5px)] overflow-y-auto pr-[4px] ${compact ? socialListScrollbarClass : '      '}`}> 
      {positions.map(position => <li key={position.id} {...deletePress.handlersFor(position.id)} className="relative grid min-h-0 items-center gap-x-[10px] overflow-hidden bg-[linear-gradient(90deg,#f3dfb8,#f7e8bf_45%,#ecd09d)] px-3 py-[5px]" style={{ gridTemplateColumns: `var(--ui-p-118,118px) ${width}px minmax(0,1fr) var(--ui-p-151,151px)` }}>
        <time className="text-center font-arial text-[length:var(--ui-p-17,17px)]" dateTime={new Date(position.savedAt).toISOString()}>{new Date(position.savedAt).toLocaleDateString('vi-VN')}<br />{new Date(position.savedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</time>
        <div inert className="pointer-events-none" aria-label={`Bàn cờ: ${position.title}`}>
          <Board shadow={false} board={position.boardState.board} hiddenChess={position.boardState.variant === 'jieqi'} flipped={position.blackName === owner && position.redName !== owner} selected={null} legalMoves={[]} animation={null} frameWidth={width} scale={width / 1134} disabled showStart={false} startDisabled startLabel="" onSelect={noop} onStart={noop} />
        </div>
        <div className="flex h-full min-h-0 min-w-0 flex-col gap-2 py-1 text-[#271608]">
          <div className="flex min-w-0 items-center gap-2">
            {editing === position.id && editField === 'title' ? <input aria-label="Tên thế cờ" value={title} maxLength={100} onChange={event => setTitle(event.target.value)} className="min-w-0 flex-1 rounded border-0 bg-[linear-gradient(90deg,#efc45c,#f5d273_70%,#e9e5a7)] px-1 font-position-title-input lining-nums tabular-nums text-[length:var(--ui-p-24,24px)] font-black text-[#271608]" /> : <h3 className="min-w-0 truncate rounded bg-[linear-gradient(90deg,#efc45c,#f5d273_70%,#e9e5a7)] px-1 font-heading text-[length:var(--ui-p-24,24px)] font-black" title={position.title}><NumberText text={position.title} compact weight="normal" soften={false} /></h3>}
            <button type="button" aria-label={editing === position.id && editField === 'title' ? 'Lưu chỉnh sửa' : `Sửa thế ${position.title}`} className={`${buttonInteraction} grid size-[var(--ui-p-28,28px)] shrink-0 place-items-center rounded bg-[#f7e8bf] text-[#43240f]`} onClick={() => {
              if (editing === position.id && editField === 'title') { void useSavedPositions.getState().update(owner, position.id, title, note).then(()=>{setEditing(null);setError('')}).catch(()=>setError('Không thể lưu chỉnh sửa.')) }
              else { setEditing(position.id); setEditField('title'); setTitle(position.title); setNote(position.note) }
            }}><svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{editing === position.id && editField === 'title' ? <path d="m5 12 4 4L19 6" /> : <><path d="m15 4 5 5M4 20l5-1L20 8a2 2 0 0 0-5-5L4 14Z" /><path d="M4 20h16" /></>}</svg></button>
          </div>
          <div className="flex min-w-0 items-center font-arial text-[length:var(--ui-p-17,17px)]">
            {(savedMatchSide(position, owner) === 'black' ? [position.blackName, position.redName] : [position.redName, position.blackName]).map((name, index) => <div key={index} className="contents">
              {index === 1 && <span className="mx-[17px] shrink-0 text-center text-[#79501e]">vs</span>}
              <div className="flex min-w-0 items-center gap-2">
              <MessageAccountAvatar name={name} className="size-[var(--ui-p-34,34px)]" />
              <span className={`min-w-0 truncate rounded px-2 py-1 ${index === 0 ? 'bg-[#ecd09d]' : 'bg-[#e4eef0]'}`} title={name}>{getComputerAvatar(name) ? 'Ông Hoàng' : name}</span>
              </div>
            </div>)}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-arial text-[length:var(--ui-p-17,17px)]">
            <span><NewspaperIcon /> &nbsp;Nước {position.moveNumber}</span>
            <span className="flex items-center gap-2"><span aria-hidden="true" className={`size-[var(--ui-p-18,18px)] rounded-full ${position.boardState.currentTurn === 'red' ? 'bg-[#ef3030]' : 'bg-[#271608]'}`} />{position.boardState.currentTurn === 'red' ? 'Đỏ' : 'Đen'} tới lượt</span>
            <span className="flex items-center gap-2"><span aria-hidden="true" className="text-[length:var(--ui-p-24,24px)] leading-none">⚒</span>{position.boardState.variant === 'jieqi' ? 'Cờ úp' : 'Cờ tướng'}</span>
          </div>
          <div className="relative flex min-h-0 flex-1 rounded bg-[#c7a370]/25 font-arial text-[length:var(--ui-p-17,17px)] text-[#613014]">
            <span className="absolute left-2 top-1"><NewspaperIcon /></span>
            {editing === position.id && editField === 'note' ? <textarea aria-label="Ghi chú" value={note} maxLength={5000} onChange={event => setNote(event.target.value)} className="min-h-0 w-full flex-1 resize-none overflow-y-auto rounded border-0 bg-transparent py-1 pl-10 pr-10 text-inherit" /> : <div tabIndex={0} aria-label="Ghi chú" className="min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap break-words py-1 pl-10 pr-10">{position.note || 'Chưa có ghi chú.'}</div>}
            <button type="button" aria-label={editing === position.id && editField === 'note' ? 'Lưu ghi chú' : 'Sửa ghi chú'} className={`${buttonInteraction} absolute right-1 top-1 grid size-[var(--ui-p-28,28px)] place-items-center rounded bg-[#f7e8bf] text-[#43240f]`} onClick={() => {
              if (editing === position.id && editField === 'note') { void useSavedPositions.getState().update(owner, position.id, position.title, note).then(()=>{setEditing(null);setError('')}).catch(()=>setError('Không thể lưu ghi chú.')) }
              else { setEditing(position.id); setEditField('note'); setTitle(position.title); setNote(position.note) }
            }}><svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{editing === position.id && editField === 'note' ? <path d="m5 12 4 4L19 6" /> : <><path d="m15 4 5 5M4 20l5-1L20 8a2 2 0 0 0-5-5L4 14Z" /><path d="M4 20h16" /></>}</svg></button>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button type="button" className={`${buttonInteraction} relative h-[var(--ui-p-52,52px)] w-[var(--ui-p-151,151px)] shrink-0`} onClick={() => { useSavedMatches.setState({ replay: { replayKind: 'position', initialMoveCount: position.moveNumber, id: position.id, endedAt: position.savedAt, redName: position.redName, blackName: position.blackName, states: [position.boardState] } }); onClose(); useSessionStore.setState({ screen: 'replay' }) }}><CrispUiImage src={replayButtonFrame} alt="" className="absolute inset-0 size-full object-contain" /><span className="relative font-arial text-[length:var(--ui-p-19,19px)] text-[#f4dcc0]">▶ Mở thế</span></button>
          {(!compact || deletePress.revealedId === position.id) && <button data-history-delete type="button" className={`${buttonInteraction} absolute right-3 top-[5px] grid h-[var(--ui-p-36,36px)] w-[var(--ui-p-28,28px)] shrink-0 place-items-center rounded-md border border-[#696761] bg-[linear-gradient(180deg,#777672,#5b5a56)] text-[#e5e7eb]`} aria-label={`Xóa thế ${position.title}`} onClick={async () => { try { await useSavedPositions.getState().remove(owner, position.id); deletePress.clear(); setError('') } catch { setError('Không thể xóa thế cờ. Hãy thử lại.') } }}><svg aria-hidden="true" viewBox="0 0 24 24" className="h-[var(--ui-p-24,24px)] w-[var(--ui-p-19,19px)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M10 10v8m4-8v8M6 6l1 15h10l1-15M9 6V3h6v3" /></svg></button>}
        </div>
      </li>)}
    </ol>}
  </div>
}



