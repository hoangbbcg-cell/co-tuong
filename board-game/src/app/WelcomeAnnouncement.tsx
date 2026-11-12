import { useState } from 'react'
import { createPortal } from 'react-dom'
import { NoticeOverlay } from '../features/lobby/components/NoticeOverlay'
import { buttonInteraction } from '../lib/uiClasses'
import welcomeBoard from '../assets/welcome-announcement/welcome-board.png'

/** User-supplied artwork with real, keyboard-accessible controls over its buttons. */
export function WelcomeAnnouncement({ active }: { active: boolean }) {
  const [dismissed, setDismissed] = useState(false)
  if (!active || dismissed) return null
  const dismiss = () => setDismissed(true)
  const action = `${buttonInteraction} absolute block rounded-[2.5cqw] bg-transparent hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff0ba]`
  return createPortal(<NoticeOverlay aria-label="Chào mừng đến với HOVANG" onDismiss={dismiss} className="grid place-items-center overflow-hidden bg-black/75 p-0 backdrop-blur-[2px]">
    <section className="relative shrink-0 [container-type:inline-size]" style={{ width: 'min(96vw, calc(96dvh * 1205 / 1305), 820px)', aspectRatio: '1205 / 1305' }}>
      <img src={welcomeBoard} alt="" draggable={false} aria-hidden="true" className="pointer-events-none absolute inset-0 block size-full select-none object-contain" />
      <div className="sr-only">
        <h2>Thông Báo – Chào các Kỳ Thủ!</h2>
        <p>HOVANG – Cờ Tướng Online đã chính thức ra mắt!</p>
        <p>Hiện tại, game mới ra mắt nên số lượng người chơi còn ít. Rất mong các Kỳ Thủ tham gia, trải nghiệm và cùng xây dựng một cộng đồng Cờ Tướng HOVANG ngày càng lớn mạnh!</p>
        <p>Tham gia cộng đồng để cập nhật tin tức, sự kiện và giao lưu cùng các Kỳ Thủ khác:</p>
      </div>
      <button type="button" aria-label="Đóng thông báo chào mừng" onClick={dismiss} className={`${action} min-h-8 min-w-8 rounded-full`} style={{ left: '88.7%', top: '7.2%', width: '9.1%', height: '8.1%' }} />
      <a href="https://www.facebook.com/share/1GheyTB5rm/" target="_blank" rel="noopener noreferrer" aria-label="Cộng đồng Facebook" className={action} style={{ left: '13.1%', top: '66.9%', width: '37.5%', height: '9.1%' }} />
      <a href="https://zalo.me/g/8ux46ujifj5hjjzlfil5" target="_blank" rel="noopener noreferrer" aria-label="Nhóm Zalo" className={action} style={{ left: '53.7%', top: '66.9%', width: '34.3%', height: '9.1%' }} />
    </section>
  </NoticeOverlay>, document.body)
}