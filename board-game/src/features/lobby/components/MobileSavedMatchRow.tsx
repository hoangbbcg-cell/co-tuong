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

export function MobileSavedMatchRow({ record, owner, boardWidth, handlers, deleteButton, savedTime, onReplay, onOpenProfile, compact = true, scale = 1 }: {
  compact?: boolean; scale?: number; record: RecordedMatch; owner: string; boardWidth: number; handlers: DOMAttributes<HTMLLIElement>
  deleteButton: ReactNode; savedTime: ReactNode; onReplay: () => void; onOpenProfile: (name: string) => void
}) {
  const [editing, setEditing] = useState<'title' | 'note' | null>(null)
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [noteExpanded, setNoteExpanded] = useState(false)
  const [error, setError] = useState('')
  const noteInput = useRef<HTMLTextAreaElement>(null)
  const rowRef = useRef<HTMLLIElement>(null)
  const initialBoardWidth = useRef<number | null>(null)
  const [rowBoardWidth, setRowBoardWidth] = useState(boardWidth)
  useLayoutEffect(() => {
    if (compact) return
    const row = rowRef.current
    if (!row) return
    initialBoardWidth.current ??= Math.max(1, row.clientHeight - 14) * 1134 / 1296 / scale
    setRowBoardWidth(Math.round(initialBoardWidth.current * scale))
  }, [compact, scale])
  useLayoutEffect(() => {
    if (editing !== 'note' || !noteInput.current) return
    const input = noteInput.current
    input.style.height = 'auto'
    input.style.height = `${input.scrollHeight + 2}px`
  }, [editing, draft, compact])
  const state = record.states.at(-1)!
  const ownerSide = savedMatchSide(record, owner)
  const players = ownerSide === 'black' ? [record.blackName, record.redName] : [record.redName, record.blackName]
  const title = record.savedTitle || 'Ván đấu đã lưu'
  async function edit(field: 'title' | 'note') {
    if (busy) return
    if (editing !== field) {
      if (field === 'note') {
        setNoteExpanded(true)
      }
      setEditing(field); setDraft(field === 'title' ? title : record.savedNote || ''); setError(''); return
    }
    setBusy(true)
    try {
      await useSavedMatches.getState().update(owner, record.id, field === 'title' ? draft : record.savedTitle || '', field === 'note' ? draft : record.savedNote || '')
      setEditing(null)
      if (field === 'note') setNoteExpanded(false)
      setError('')
    } catch { setError('Không thể lưu chỉnh sửa. Hãy thử lại.') }
    finally { setBusy(false) }
  }
  return <li {...handlers} ref={rowRef} className={`${socialPlayerRowClass} min-h-0 select-none`} style={{ padding: '7px', gap: '7px', columnGap: compact ? '7px' : '15px', minHeight: compact ? 0 : Math.round(rowBoardWidth * 1296 / 1134 + 14), gridTemplateColumns: `${(compact ? boardWidth : rowBoardWidth)}px minmax(0,1fr) ${compact ? 48 : Math.round(151 * scale)}px`, '--social-row-radius': '8px', ...(!compact ? { '--ui-p-96': `${Math.round(48 * scale)}px`, '--ui-p-43': `${Math.round(25 * scale)}px`, '--ui-p-90': `${Math.round(47 * scale)}px` } : {}) } as CSSProperties}>
    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 bg-[linear-gradient(90deg,#4a261327_0%,#75451d1a_55%,transparent_100%)] shadow-[inset_9px_0_14px_-11px_#24100635]" style={{ width: Math.round(132 * scale * (compact ? 1.5 : 1)) }} />
    <div className="col-span-3 flex min-w-0 items-center gap-[7px] pr-[24px]" style={compact ? undefined : { gridColumn: '2 / 4', gridRow: 1, paddingRight: 42 }}>
      {editing === 'title' ? <input data-history-input autoFocus onFocus={event => event.currentTarget.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' })} style={compact ? undefined : { fontSize: Math.round(23 * scale) }} aria-label="Tên ván đấu" value={draft} maxLength={100} onChange={event => setDraft(event.target.value)} className="min-w-0 flex-1 select-text rounded border border-[#b68d51] bg-[#f5dfae] px-1 font-body text-[18px] font-bold text-[#271608]" /> : <h3 style={compact ? undefined : { fontSize: Math.round(23 * scale) }} className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap rounded bg-[linear-gradient(90deg,#efc45c,#f5d273_70%,#e9e5a7)] px-1 font-body text-[18px] font-bold text-[#271608]">{title}</h3>}
      <button data-history-edit data-ui-tab-sound type="button" aria-label={editing === 'title' ? 'Lưu tên ván đấu' : 'Sửa tên ván đấu'} disabled={busy} onPointerDown={event => { if (editing === 'title') event.preventDefault() }} onClick={() => void edit('title')} className={`${buttonInteraction} grid size-[26px] shrink-0 place-items-center text-[#754617]`}><EditIcon saving={editing === 'title'} /></button>
    </div>
    <div inert style={compact ? undefined : { position: 'absolute', left: 7, top: 7, width: rowBoardWidth, height: rowBoardWidth * 1296 / 1134 }} className="pointer-events-none" aria-label={`Bàn cờ: ${title}`}><Board shadow={false} board={state.board} hiddenChess={state.variant === 'jieqi'} flipped={ownerSide === 'black'} selected={null} legalMoves={[]} animation={null} frameWidth={compact ? boardWidth : rowBoardWidth} scale={(compact ? boardWidth : rowBoardWidth) / 1134} disabled showStart={false} startDisabled startLabel="" onSelect={noop} onStart={noop} /></div>
    <div className="flex min-w-0 flex-col gap-[3px] text-[#271608]" style={compact ? undefined : { gridColumn: 2, gridRow: 2, width: 'fit-content', maxWidth: '100%', justifySelf: 'start', justifyContent: 'space-between' }}>
      {players.map((name, index) => <span key={index} className="contents">
        {index === 1 && (compact ? <HistoryMatchPieces variant={state.variant} compact /> : <span className="flex w-full justify-center"><HistoryMatchPieces variant={state.variant} /></span>)}
        {compact ? <button type="button" data-ui-selection-sound onClick={() => onOpenProfile(name)} className={`${buttonInteraction} flex min-w-0 items-center gap-[5px] text-left`}>
          <MessageAccountAvatar name={name} className="relative z-10 size-[var(--ui-p-96,96px)]" />
          <span className={`min-w-0 flex-1 break-words rounded-r-[var(--ui-p-8,8px)] border-y border-r -ml-[5px] pl-[5px] pr-1 py-1 font-heading text-[length:var(--ui-p-43,43px)] font-extrabold leading-[1.4] lining-nums [-webkit-text-stroke:0.2px_currentColor] ${historyPlayerFrame(name === owner)}`}>{name}</span>
        </button> : <div className="flex min-w-0 items-center gap-[5px] text-left">
          <button type="button" data-ui-selection-sound onClick={() => onOpenProfile(name)} aria-label={`Mở hồ sơ của ${name}`} className={`${buttonInteraction} relative z-10 shrink-0 rounded-full border-0 bg-transparent p-0`}><MessageAccountAvatar name={name} className="size-[var(--ui-p-96,96px)]" /></button>
          <span style={{ flex: '0 1 auto', width: 'fit-content', maxWidth: '100%', paddingInline: 8 }} className={`min-w-0 break-words rounded-r-[var(--ui-p-8,8px)] border-y border-r pl-[5px] pr-1 py-1 font-heading text-[length:var(--ui-p-43,43px)] font-extrabold leading-[1.4] lining-nums [-webkit-text-stroke:0.2px_currentColor] ${historyPlayerFrame(name === owner)}`}>{name}</span>
        </div>}
      </span>)}

    </div>
    <button type="button" onClick={onReplay} style={compact ? undefined : { gridColumn: 3, gridRow: 2, width: Math.round(151 * scale), height: Math.round(52 * scale) }} className={`${buttonInteraction} relative grid h-[32px] w-[48px] place-items-center self-center`}><CrispUiImage src={replayButtonFrame} alt="" className="absolute inset-0 size-full object-fill" /><span className="relative font-body text-[13px] text-[#f4dcc0]" style={compact ? undefined : { fontSize: Math.round(19 * scale) }}>{compact ? 'Xem' : '▶ Xem lại'}</span></button>
    <div style={compact ? undefined : { gridColumn: '2 / 4', gridRow: 3, fontSize: Math.max(15, Math.round(16 * scale)) }} className="col-span-3 flex min-w-0 flex-nowrap items-center justify-between gap-[5px] whitespace-nowrap font-arial text-[clamp(12px,3.5vw,14px)] leading-snug">
      <span className="inline-flex items-center gap-1"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[16px] shrink-0" style={compact ? undefined : { width: Math.max(17, Math.round(18 * scale)), height: Math.max(17, Math.round(18 * scale)) }} fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 4h16v16H5zM5 8H2v12h3M9 8h8M9 12h8M9 16h5" /></svg>Nước {Math.max(0, record.states.length - 1)}</span>
      <span className="inline-flex items-center gap-1"><span aria-hidden="true" style={compact ? undefined : { width: Math.max(9, Math.round(10 * scale)), height: Math.max(9, Math.round(10 * scale)) }} className={`size-[9px] shrink-0 rounded-full ${state.currentTurn === 'red' ? 'bg-[#ef3030]' : 'bg-[#271608]'}`} />{state.currentTurn === 'red' ? 'Đỏ' : 'Đen'} tới lượt</span>
      <span className="inline-flex items-center gap-1"><HistoryBoardIcon className={compact ? undefined : 'size-[18px] shrink-0'} />{state.variant === 'jieqi' ? 'Cờ Úp' : 'Cờ Tướng'}</span>
    </div>
    <div style={compact ? undefined : { gridColumn: '2 / 4', gridRow: 4, alignSelf: 'start', paddingTop: 4 }} className="col-span-3 flex min-w-0 items-start gap-[7px] rounded bg-[#c7a370]/25 p-[7px] text-[#613014]">
      <div className="min-w-0 flex-1 font-body text-[13px]" style={compact ? undefined : { fontSize: Math.round(20 * scale), lineHeight: 1.4 }}><span className="font-semibold">Ghi chú</span>{editing === 'note' ? <textarea data-history-input ref={noteInput} autoFocus onFocus={event => { const cursor = compact || record.savedNote ? event.currentTarget.value.length : 0; event.currentTarget.setSelectionRange(cursor, cursor); event.currentTarget.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' }) }} style={compact ? undefined : { font: 'inherit', lineHeight: 'inherit' }} rows={compact ? undefined : 1} aria-label="Ghi chú ván đấu" value={draft} maxLength={5000} onChange={event => setDraft(event.target.value)} className={`${compact ? 'mt-1 block min-h-[48px] w-full resize-none overflow-hidden border-0 bg-transparent p-0 font-[inherit] outline-none' : 'block min-h-0 w-full resize-none overflow-y-auto border-0 bg-transparent p-0 font-[inherit] outline-none'} select-text`} /> : <button data-history-edit type="button" aria-label={noteExpanded ? 'Thu gọn ghi chú' : 'Mở đầy đủ ghi chú'} aria-expanded={noteExpanded} onClick={() => setNoteExpanded(value => !value)} className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left text-inherit"><span className={`whitespace-pre-wrap break-words ${noteExpanded ? 'block' : compact ? 'line-clamp-3' : 'line-clamp-2'}`}>{record.savedNote || 'Chưa có ghi chú.'}</span></button>}</div>
      <button data-history-edit data-ui-tab-sound type="button" aria-label={editing === 'note' ? 'Lưu ghi chú' : 'Sửa ghi chú'} disabled={busy} onPointerDown={event => { if (editing === 'note') event.preventDefault() }} onClick={() => void edit('note')} className={`${buttonInteraction} grid size-[26px] shrink-0 place-items-center`}><EditIcon saving={editing === 'note'} /></button>
    </div>
    {error && <p role="alert" className="col-span-3 font-body text-[13px] text-[#a22116]">{error}</p>}
    {deleteButton}
    {savedTime}
  </li>
}
