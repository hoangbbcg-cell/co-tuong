import { useLayoutEffect, useRef, useState } from 'react'
import { useInviteSentNotice } from './InviteSentNotice'
import { HistoryHoldNotice } from './HistoryHoldNotice'
import { useSavedMatches } from '../../../store/savedMatchesStore'
import { useSessionStore } from '../../../store/sessionStore'
import { buttonInteraction, historyEmptyTextClass, socialListScrollbarClass } from '../../../lib/uiClasses'
import { MobileSavedMatchRow } from './MobileSavedMatchRow'
import { ConfirmationName, MessagesFriendRemovalConfirmation } from './MessagesFriendButton'
import { usePressToRevealDelete } from '../hooks/usePressToRevealDelete'
import { playBoardEntryActionSound } from '../../../lib/uiActionSound'

const noop = () => {}

function SavedMatchTimeNotice({ savedAt, point, portalRoot, compact }: { savedAt?: number; point: { x: number; y: number }; portalRoot?: Element | null; compact: boolean }) {
  return <HistoryHoldNotice point={{ x: point.x, y: point.y - (compact ? 40 : 20) }} portalRoot={portalRoot} className="select-none">{savedAt ? <>Đã lưu lúc <time dateTime={new Date(savedAt).toISOString()}>{new Date(savedAt).toLocaleString('vi-VN')}</time></> : 'Chưa có thông tin thời gian lưu'}</HistoryHoldNotice>
}

/** Saved games use the same board-and-details presentation as saved positions. */
export function SavedMatchesList({ owner, scale, compact, onClose, onOpenProfile }: {
  owner: string; scale: number; compact: boolean; onClose: () => void; onOpenProfile: (name: string) => void
}) {
  const records = useSavedMatches(state => state.entries).filter(record => record.owner === owner)
  records.sort((a, b) => (b.savedAt ?? b.endedAt) - (a.savedAt ?? a.endedAt))
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string; owner: string } | null>(null)
  const [deleting, setDeleting] = useState(false)
  const deleteNotice = useInviteSentNotice()
  const deletePending = useRef(false)
  const deletePress = usePressToRevealDelete(true, owner, 200, true)
  const listRef = useRef<HTMLOListElement>(null)
  const [boardWidth, setBoardWidth] = useState(() => Math.round((compact ? 178 : 224) * scale))
  async function confirmDelete() {
    if (!deleteTarget || deleteTarget.owner !== owner || deletePending.current) return
    deletePending.current = true
    setDeleting(true)
    setError('')
    try {
      await useSavedMatches.getState().remove(deleteTarget.owner, deleteTarget.id)
      deleteNotice.show('Đã xóa')
      setDeleteTarget(null)
      deletePress.clear()
    } catch (error) {
      console.error('Saved match deletion failed:', error)
      const responseMessage = typeof error === 'object' && error !== null &&
        'response' in error && typeof error.response === 'object' &&
        error.response !== null && 'data' in error.response &&
        typeof error.response.data === 'object' && error.response.data !== null &&
        'message' in error.response.data && typeof error.response.data.message === 'string'
          ? error.response.data.message : ''
      setError(responseMessage || (error instanceof Error ? error.message : 'Không thể xóa ván đã lưu. Hãy thử lại.'))
    } finally {
      deletePending.current = false
      setDeleting(false)
    }
  }
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const row = list.firstElementChild as HTMLElement | null
      if (row && compact) setBoardWidth(Math.max(1, Math.round(list.clientWidth * 0.36)))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [records.length, scale, compact])
  return <div className="flex min-h-0 flex-1 flex-col">
    {deleteNotice.notice}
    {deleteTarget?.owner === owner && <MessagesFriendRemovalConfirmation name={deleteTarget.title} message={<>Bạn có chắc muốn xóa ván “<ConfirmationName name={deleteTarget.title}/>” khỏi Đã lưu không?</>} skip={false} onSkipChange={noop} pending={deleting} error={error} onCancel={() => { if (!deletePending.current) { setDeleteTarget(null); setError('') } }} onConfirm={() => { void confirmDelete() }} />}
    {!records.length ? <p className={`grid min-h-0 flex-1 place-items-center ${historyEmptyTextClass}`}>Chưa có ván đấu đã lưu.</p> :
      <ol ref={listRef} onScroll={deletePress.clear} style={{ rowGap: compact ? 7 : Math.round(8 * scale) }} className={`grid min-h-0 flex-1 auto-rows-max content-start overflow-y-auto ${socialListScrollbarClass} hovang-scroll-rail`}>
        {records.map(record => {
          const state = record.states.at(-1)
          if (!state) return null
          const savedTime = deletePress.revealedId === record.id && deletePress.revealPoint ? <SavedMatchTimeNotice savedAt={record.savedAt} point={deletePress.revealPoint} portalRoot={listRef.current?.closest('dialog')} compact={compact} /> : null
          const deleteButton = <button data-history-delete data-ui-selection-sound style={compact ? undefined : { width: 36, height: 40, zIndex: 10 }} type="button" aria-label={`Xóa ván ${record.redName} với ${record.blackName}`} className={`${buttonInteraction} absolute right-[7px] top-[7px] grid h-[var(--ui-p-36,36px)] w-[var(--ui-p-28,28px)] place-items-center rounded-md border border-[#696761] bg-[linear-gradient(180deg,#777672,#5b5a56)] text-[#e5e7eb] compact:absolute compact:right-[7px] compact:top-[7px] compact:size-[24px] compact:z-10`} onClick={() => { deletePress.clear(); setError(''); setDeleteTarget({ id: record.id, title: record.savedTitle || 'Ván đấu đã lưu', owner }) }}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 compact:size-[16px]" style={compact ? undefined : { width: 24, height: 24 }} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M10 10v8m4-8v8M6 6l1 15h10l1-15M9 6V3h6v3" /></svg></button>
          return <MobileSavedMatchRow key={record.id} compact={compact} scale={scale} record={record} owner={owner} boardWidth={boardWidth} handlers={deletePress.handlersFor(record.id)} deleteButton={deleteButton} savedTime={savedTime} onOpenProfile={onOpenProfile} onReplay={() => { useSavedMatches.setState({ replay: { ...record, replayRequiresSave: true } }); onClose(); playBoardEntryActionSound(); useSessionStore.setState({ screen: 'replay' }) }} />
        })}
      </ol>}
  </div>
}
