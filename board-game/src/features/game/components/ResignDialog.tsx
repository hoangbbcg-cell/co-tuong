import { NoticeOverlay } from '../../lobby/components/NoticeOverlay'
import { confirmationAcceptButton, confirmationCancelButton } from '../../../lib/confirmationButtonStyles'
import { confirmationDialogActions, confirmationDialogDescription, confirmationDialogFrame, confirmationDialogOverlay, confirmationDialogTitle } from '../../../lib/confirmationDialogStyles'

export function ResignDialog({ onCancel, onConfirm, standUp = false }: { onCancel: () => void; onConfirm: () => void; standUp?: boolean }) {
  return <NoticeOverlay onDismiss={onCancel} style={{ zoom: 1 }} className={confirmationDialogOverlay} onClick={event => { if (event.target === event.currentTarget) onCancel() }}>
    <section role="alertdialog" aria-modal="true" aria-labelledby="resign-title" aria-describedby="resign-warning" className={confirmationDialogFrame}>
      <h2 id="resign-title" className={confirmationDialogTitle}>{standUp ? 'Xác nhận xuống bàn' : 'Xác nhận xin thua'}</h2>
      <p id="resign-warning" className={confirmationDialogDescription}>{standUp ? 'Ván đấu đang diễn ra. Xuống bàn sẽ bị tính thua và chuyển xuống View. Bạn có muốn tiếp tục?' : 'Bạn có chắc muốn xin thua ván đấu này?'}</p>
      <div className={confirmationDialogActions}>
        <button data-ui-selection-sound autoFocus type="button" onClick={onCancel} className={confirmationCancelButton}>Hủy</button>
        <button data-ui-selection-sound type="button" onClick={onConfirm} className={confirmationAcceptButton}>Đồng ý</button>
      </div>
    </section>
  </NoticeOverlay>
}
