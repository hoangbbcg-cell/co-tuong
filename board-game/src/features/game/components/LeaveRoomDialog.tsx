import { NoticeOverlay } from '../../lobby/components/NoticeOverlay'
import { confirmationAcceptButton, confirmationCancelButton } from '../../../lib/confirmationButtonStyles'
import { confirmationDialogActions, confirmationDialogDescription, confirmationDialogFrame, confirmationDialogOverlay, confirmationDialogTitle } from '../../../lib/confirmationDialogStyles'

export function LeaveRoomDialog({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return <NoticeOverlay onDismiss={onCancel} style={{ zoom: 1 }} className={confirmationDialogOverlay} onClick={event => { if (event.target === event.currentTarget) onCancel() }}>
    <section role="alertdialog" aria-modal="true" aria-labelledby="leave-room-title" aria-describedby="leave-room-warning" className={confirmationDialogFrame}>
      <h2 id="leave-room-title" className={confirmationDialogTitle}>Xác nhận rời bàn</h2>
      <p id="leave-room-warning" className={confirmationDialogDescription}>Khi rời bàn, bạn sẽ thua ván đấu.</p>
      <div className={confirmationDialogActions}>
        <button data-ui-selection-sound autoFocus type="button" onClick={onCancel} className={confirmationCancelButton}>Hủy</button>
        <button data-ui-selection-sound type="button" onClick={onConfirm} className={confirmationAcceptButton}>Rời bàn</button>
      </div>
    </section>
  </NoticeOverlay>
}
