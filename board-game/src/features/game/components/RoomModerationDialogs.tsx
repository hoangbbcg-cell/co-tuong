import type { RoomSnapshot } from '../../../types/room'
import type { useRoomModeration, ModerationAction } from '../hooks/useRoomModeration'
import { NoticeOverlay } from '../../lobby/components/NoticeOverlay'
import { confirmationAcceptButton, confirmationCancelButton } from '../../../lib/confirmationButtonStyles'
import { buttonInteraction } from '../../../lib/uiClasses'

const labels: Record<ModerationAction, string> = { demote: 'Đưa xuống xem', promote: 'Đưa lên bàn', mute: 'Cấm chat', unmute: 'Bỏ cấm chat', kick: 'Đuổi khỏi phòng' }
export function RoomModerationDialogs({ control, room }: { control: ReturnType<typeof useRoomModeration>; room: RoomSnapshot | null }) {
  const frame = 'relative w-[min(440px,calc(100vw-32px))] rounded-2xl border-2 border-[#bd914e] bg-[#302015] p-6 font-body text-[#ffe3a2] shadow-xl'
  return <>{control.notice}
    {control.owner && control.settingsOpen && <NoticeOverlay onDismiss={() => control.setSettingsOpen(false)} className="grid place-items-center bg-black/60">
      <section className={frame} aria-label="Cài đặt bàn khóa">
        <button type="button" aria-label="Đóng cài đặt bàn" onClick={() => control.setSettingsOpen(false)} className={`${buttonInteraction} absolute right-3 top-2 text-3xl`}>×</button>
        <h2 className="mb-6 text-center text-2xl font-bold">Cài đặt bàn</h2>
        <label className="mb-5 flex items-center justify-between gap-5 text-xl">Chặn vào hàng<input type="checkbox" className="size-6 accent-[#efbc49]" checked={control.queueBlocked} disabled={control.pending} onChange={event => void control.settings(event.target.checked, control.chatBlocked)} /></label>
        <label className="flex items-center justify-between gap-5 text-xl">Chặn chat<input type="checkbox" className="size-6 accent-[#efbc49]" checked={control.chatBlocked} disabled={control.pending} onChange={event => void control.settings(control.queueBlocked, event.target.checked)} /></label>
      </section>
    </NoticeOverlay>}
    {control.owner && control.target && <NoticeOverlay onDismiss={control.closeTarget} className="grid place-items-center bg-black/60">
      <section className={frame} aria-label="Quản lý người chơi">
        <h2 className="mb-5 break-words text-center text-xl font-bold">{control.target.name}</h2>
        {control.action ? <>
          <p className="mb-6 text-center text-lg">{labels[control.action]} {control.target.name}?</p>
          <div className="flex gap-4"><button type="button" disabled={control.pending} className={`${confirmationCancelButton} h-12 flex-1`} onClick={() => control.setAction(null)}>Hủy</button><button type="button" disabled={control.pending || room?.game.phase === 'playing' && (control.action === 'demote' || control.action === 'promote')} className={`${confirmationAcceptButton} h-12 flex-1`} onClick={() => void control.confirm()}>Đồng ý</button></div>
        </> : <>
          <div className="flex flex-col gap-3">{([control.target.seated ? 'demote' : 'promote', room?.mutedMemberIds?.includes(control.target.id) ? 'unmute' : 'mute', 'kick'] as ModerationAction[]).map(action => <button key={action} type="button" disabled={room?.game.phase === 'playing' && (action === 'demote' || action === 'promote')} title={room?.game.phase === 'playing' && (action === 'demote' || action === 'promote') ? 'Chờ ván kết thúc' : undefined} className={`${confirmationCancelButton} disabled:cursor-not-allowed disabled:opacity-40 flex min-h-12 items-center justify-center gap-2 px-4 ${action === 'kick' ? 'text-[#ff9b9b]!' : ''}`} onClick={() => control.setAction(action)}>{action === 'demote' && <svg viewBox="0 0 32 32" aria-hidden="true" className="size-7 shrink-0 text-[#ffd65b]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 5h11v22H16M18 16H3m6-6-6 6 6 6" /></svg>}{labels[action]}</button>)}</div>
          <button type="button" className={`${buttonInteraction} mt-5 w-full text-lg`} onClick={control.closeTarget}>Đóng</button>
        </>}
      </section>
    </NoticeOverlay>}
  </>
}
