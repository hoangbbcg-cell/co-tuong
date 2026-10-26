import { historyPlayerFrame } from './HistoryPlayerFrame'
import { HistoryMatchPieces } from './HistoryMatchPieces'
import { HistoryBoardIcon } from './HistoryBoardIcon'
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type DOMAttributes } from 'react'
import { Board } from '../../game/components/Board'
import type { RecordedMatch } from '../../../types/recordedMatch'
import { useSavedMatches } from '../../../store/savedMatchesStore'
import { savedMatchSide } from '../../../lib/savedMatchPerspective'
import { buttonInteraction } from '../../../lib/uiClasses'
import { socialPlayerRowClass } from './SocialDialogFrame'
import { MessageAccountAvatar } from './MessageAccountAvatar'
import { CrispUiImage } from '../../../lib/CrispUiImage'

import replayButtonFrame from '../../../assets/history/history-replay-button-frame.png'

const noop = () => {}
function EditIcon({ saving = false }: { saving?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{saving ? <path d="m5 12 4 4L19 6" /> : <><path d="m15 4 5 5M4 20l5-1L20 8a2 2 0 0 0-5-5L4 14Z" /><path d="M4 20h16" /></>}</svg>
}

export function MobileSavedMatchRow({ record, owner, boardWidth, handlers, deleteButton, onReplay, onOpenProfile }: {
  record: RecordedMatch; owner: string; boardWidth: number; handlers: DOMAttributes<HTMLLIElement>
  deleteButton: ReactNode; onReplay: () => void; onOpenProfile: (name: string) => void
}) {
  const [editing, setEditing] = useState<'title' | 'note' | null>(null)
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [noteExpanded, setNoteExpanded] = useState(false)
  const [error, setError] = useState('')
  const noteInput = useRef<HTMLTextAreaElement>(null)
  useLayoutEffect(() => {
    if (editing !== 'note' || !noteInput.current) return
    const input = noteInput.current
    input.style.height = 'auto'
    input.style.height = `${input.scrollHeight + 2}px`
  }, [editing, draft])
  const state = record.states.at(-1)!
  const ownerSide = savedMatchSide(record, owner)
  const players = ownerSide === 'black' ? [record.blackName, record.redName] : [record.redName, record.blackName]
  const title = record.savedTitle || 'Ván đấu đã lưu'
  async function edit(field: 'title' | 'note') {
    if (busy) return
    if (editing !== field) { if (field === 'note') setNoteExpanded(true); setEditing(field); setDraft(field === 'title' ? title : record.savedNote || ''); setError(''); return }
    setBusy(true)
    try {
      await useSavedMatches.getState().update(owner, record.id, field === 'title' ? draft : record.savedTitle || '', field === 'note' ? draft : record.savedNote || '')
      setEditing(null)
      setError('')
    } catch { setError('Không thể lưu chỉnh sửa. Hãy thử lại.') }
    finally { setBusy(false) }
  }
  return <li {...handlers} className={`${socialPlayerRowClass} min-h-0`} style={{ padding: '7px', gap: '7px', gridTemplateColumns: `${boardWidth}px minmax(0,1fr) 48px`, '--social-row-radius': '8px' } as CSSProperties}>
    <div className="col-span-3 flex min-w-0 items-center gap-[7px] pr-[24px]">
      {editing === 'title' ? <input data-history-input autoFocus onFocus={event => event.currentTarget.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' })} aria-label="Tên ván đấu" value={draft} maxLength={100} onChange={event => setDraft(event.target.value)} className="min-w-0 flex-1 rounded border border-[#b68d51] bg-[#f5dfae] px-1 font-body text-[18px] font-black text-[#271608]" /> : <h3 className="min-w-0 break-words rounded bg-[linear-gradient(90deg,#efc45c,#f5d273_70%,#e9e5a7)] px-1 font-body text-[18px] font-black text-[#271608] [-webkit-text-stroke:0.2px_currentColor]">{title}</h3>}
      <button data-history-edit type="button" aria-label={editing === 'title' ? 'Lưu tên ván đấu' : 'Sửa tên ván đấu'} disabled={busy} onClick={() => void edit('title')} className={`${buttonInteraction} grid size-[26px] shrink-0 place-items-center text-[#754617]`}><EditIcon saving={editing === 'title'} /></button>
    </div>
    <div inert className="pointer-events-none" aria-label={`Bàn cờ: ${title}`}><Board shadow={false} board={state.board} hiddenChess={state.variant === 'jieqi'} flipped={ownerSide === 'black'} selected={null} legalMoves={[]} animation={null} frameWidth={boardWidth} scale={boardWidth / 1134} disabled showStart={false} startDisabled startLabel="" onSelect={noop} onStart={noop} /></div>
    <div className="flex min-w-0 flex-col gap-[3px] text-[#271608]">
      {players.map((name, index) => <span key={index} className="contents">
        {index === 1 && <HistoryMatchPieces variant={state.variant} compact />}
        <button type="button" onClick={() => onOpenProfile(name)} className={`${buttonInteraction} flex min-w-0 items-center gap-[5px] text-left`}>
          <MessageAccountAvatar name={name} className="relative z-10 size-[var(--ui-p-96,96px)]" />
          <span className={`min-w-0 flex-1 break-words rounded-r-[var(--ui-p-8,8px)] border-y border-r -ml-[5px] pl-[5px] pr-1 py-1 font-heading text-[length:var(--ui-p-43,43px)] font-extrabold leading-[1.4] lining-nums [-webkit-text-stroke:0.2px_currentColor] ${historyPlayerFrame(state.result?.winner === (index === 0 ? ownerSide : ownerSide === 'red' ? 'black' : 'red'))}`}>{name}</span>
        </button>
      </span>)}

    </div>
    <button type="button" onClick={onReplay} className={`${buttonInteraction} relative grid h-[32px] w-[48px] place-items-center self-center`}><CrispUiImage src={replayButtonFrame} alt="" className="absolute inset-0 size-full object-fill" /><span className="relative font-body text-[13px] text-[#f4dcc0]">Xem</span></button>
    <div className="col-span-3 flex min-w-0 flex-nowrap items-center justify-between gap-[5px] whitespace-nowrap font-arial text-[clamp(12px,3.5vw,14px)] leading-snug">
      <span className="inline-flex items-center gap-1"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[16px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 4h16v16H5zM5 8H2v12h3M9 8h8M9 12h8M9 16h5" /></svg>Nước {Math.max(0, record.states.length - 1)}</span>
      <span className="inline-flex items-center gap-1"><span aria-hidden="true" className={`size-[9px] shrink-0 rounded-full ${state.currentTurn === 'red' ? 'bg-[#ef3030]' : 'bg-[#271608]'}`} />{state.currentTurn === 'red' ? 'Đỏ' : 'Đen'} tới lượt</span>
      <span className="inline-flex items-center gap-1"><HistoryBoardIcon />{state.variant === 'jieqi' ? 'Cờ Úp' : 'Cờ Tướng'}</span>
    </div>
    <div className="col-span-3 flex min-w-0 items-start gap-[7px] rounded bg-[#c7a370]/25 p-[7px] text-[#613014]">
      <div className="min-w-0 flex-1 font-body text-[13px]"><span className="font-semibold">Ghi chú</span>{editing === 'note' ? <textarea data-history-input ref={noteInput} autoFocus onFocus={event => { event.currentTarget.setSelectionRange(event.currentTarget.value.length, event.currentTarget.value.length); event.currentTarget.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' }) }} aria-label="Ghi chú ván đấu" value={draft} maxLength={5000} onChange={event => setDraft(event.target.value)} className="mt-1 block min-h-[48px] w-full resize-none overflow-hidden rounded border border-[#b68d51] bg-transparent p-1" /> : <button data-history-edit type="button" aria-label={noteExpanded ? 'Thu gọn ghi chú' : 'Mở đầy đủ ghi chú'} aria-expanded={noteExpanded} onClick={() => setNoteExpanded(value => !value)} className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left text-inherit"><span className={`whitespace-pre-wrap break-words ${noteExpanded ? 'block' : 'line-clamp-3'}`}>{record.savedNote || 'Chưa có ghi chú.'}</span></button>}</div>
      <button data-history-edit type="button" aria-label={editing === 'note' ? 'Lưu ghi chú' : 'Sửa ghi chú'} disabled={busy} onClick={() => void edit('note')} className={`${buttonInteraction} grid size-[26px] shrink-0 place-items-center`}><EditIcon saving={editing === 'note'} /></button>
    </div>
    {error && <p role="alert" className="col-span-3 font-body text-[13px] text-[#a22116]">{error}</p>}
    {deleteButton}
  </li>
}
