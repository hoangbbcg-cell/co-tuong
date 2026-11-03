import { useEffect, useSyncExternalStore } from 'react'
import { loadingInstall } from './loadingInstall'
import './LoadingInstallInvitation.css'

export function LoadingInstallInvitation({ controller = loadingInstall }: { controller?: typeof loadingInstall }) {
  const stage = useSyncExternalStore(controller.subscribe, controller.getSnapshot, () => null)
  useEffect(() => {
    controller.setLoading(true)
    return () => controller.setLoading(false)
  }, [controller])
  if (!stage) return null
  const instructions = stage === 'instructions'
  return <aside className="loading-install-invitation" aria-labelledby="loading-install-title">
    <div className="loading-install-brand">
      <img src="/icons/hovang-shortcut-192.png" width="48" height="48" alt="Logo HOVANG" />
      <div><span>Lời mời từ HOVANG</span><strong>HOVANG - Cờ Tướng Online</strong></div>
    </div>
    <h2 id="loading-install-title">{instructions ? 'Cách thêm lối tắt HOVANG' : 'Thêm lối tắt HOVANG?'}</h2>
    {instructions ? <>
      <ol className="loading-shortcut-steps">
        <li>Mở menu <strong>⋮</strong> bên phải thanh địa chỉ Chrome.</li>
        <li>Chọn <strong>Cài đặt và tạo lối tắt</strong> → <strong>Tạo lối tắt</strong>.</li>
        <li>Kiểm tra tên HOVANG rồi nhấn <strong>Thêm</strong> trong hộp thoại Chrome.</li>
      </ol>
      <p>Ở một số phiên bản, mục này có tên Thêm vào màn hình chính. Nếu chỉ thấy Cài đặt ứng dụng mà không có Tạo lối tắt, bạn có thể đóng hướng dẫn và tiếp tục chơi.</p>
      <p className="loading-install-disclosure">Đây là hướng dẫn của HOVANG. Website không thể tự tạo hoặc xác nhận lối tắt đã được thêm.</p>
    </> : <>
      <p>Mở nhanh website HOVANG từ màn hình chính, không cần nhập lại địa chỉ.</p>
      <p className="loading-install-disclosure">Đây là lời mời của HOVANG. Cho phép sẽ mở hướng dẫn tạo lối tắt trong Chrome, không tự cài ứng dụng.</p>
    </>}
    <div className="loading-install-actions">
      {instructions ? <button type="button" className="loading-install-allow" onClick={() => controller.closeInstructions()}>Đóng hướng dẫn</button> : <>
        <button type="button" onClick={() => controller.later()}>Để sau</button>
        <button type="button" className="loading-install-allow" onClick={() => controller.showInstructions()}>Cho phép</button>
      </>}
    </div>
  </aside>
}
