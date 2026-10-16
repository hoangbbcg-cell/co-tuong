import { useState } from 'react'
import background from '../../assets/backgrounds/home.png'
import panel from '../../assets/login/login-panel.png'
import { useEntryStore } from '../../store/entryStore'

function GoogleIcon() {
  return <svg aria-hidden="true" viewBox="0 0 48 48" className="size-[7cqw] shrink-0 rounded-full bg-white p-[1cqw]">
    <path fill="#4285F4" d="M43.6 24.5c0-1.5-.1-2.9-.4-4.3H24v8.1h11a9.4 9.4 0 0 1-4.1 6.2v5.2h6.7c3.9-3.6 6-8.8 6-15.2Z" />
    <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.2c-1.8 1.2-4.1 1.9-6.8 1.9-5.3 0-9.8-3.6-11.4-8.4H5.7v5.4A20.4 20.4 0 0 0 24 44Z" />
    <path fill="#FBBC05" d="M12.6 27.4a12.2 12.2 0 0 1 0-7.8v-5.4H5.7a20.4 20.4 0 0 0 0 18.6l6.9-5.4Z" />
    <path fill="#EA4335" d="M24 11.2c3 0 5.6 1 7.7 3l5.8-5.8A19.4 19.4 0 0 0 24 3 20.4 20.4 0 0 0 5.7 14.2l6.9 5.4c1.6-4.8 6.1-8.4 11.4-8.4Z" />
  </svg>
}

export function LoginPage() {
  const enterGuest = useEntryStore(state => state.enterGuest)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const playGuest = () => {
    try { enterGuest() }
    catch { setError('Không thể ghi nhớ tài khoản khách. Hãy cho phép lưu dữ liệu trình duyệt rồi thử lại.') }
  }
  return <main aria-label="Đăng nhập Cờ Tướng" className="fixed inset-0 isolate flex items-center justify-center overflow-hidden bg-[#241007]">
    <img src={background} alt="" draggable={false} className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center" />
    <section aria-label="Chọn cách vào game" className="relative shrink-0 [container-type:inline-size]" style={{ width: 'min(710px, calc(88svh * 1202 / 1307), calc(100vw - 12px))', aspectRatio: '1202 / 1307' }}>
      <h1 className="sr-only">Cờ Tướng</h1>
      <img src={panel} alt="" draggable={false} className="pointer-events-none absolute inset-0 block size-full border-0 p-0" />
      <button type="button" aria-label="Đăng nhập với Google" onClick={() => { setError(''); setNotice('Đăng nhập Google chưa được cấu hình. Bạn có thể chọn Chơi như khách để vào game.') }} className="absolute left-[16.2%] top-[47.7%] flex h-[12%] w-[67.6%] cursor-pointer items-center justify-center gap-[4cqw] border-0 bg-transparent p-0 font-honor-title text-[4.3cqw] leading-none font-bold text-[#613014] transition-[filter] hover:brightness-110 active:brightness-90">
        <GoogleIcon /><span>Đăng nhập với Google</span>
      </button>
      <p className="absolute left-[13%] top-[61%] m-0 w-[74%] text-center font-arial text-[2.3cqw] leading-[1.5] text-[#ffe5a6]">⛨ Đăng nhập để bảo vệ tài khoản, chơi trên nhiều thiết bị</p>
      <div aria-hidden="true" className="absolute left-[19%] top-[66.5%] flex w-[62%] items-center gap-[1.8cqw] text-[2.5cqw] text-[#ffe08b]"><span className="h-px flex-1 bg-[linear-gradient(to_right,transparent,#ffe08b)]" /><span>◇ hoặc ◇</span><span className="h-px flex-1 bg-[linear-gradient(to_left,transparent,#ffe08b)]" /></div>
      <button type="button" onClick={playGuest} className="absolute left-[19.2%] top-[70%] flex h-[12%] w-[61.6%] cursor-pointer items-center justify-center gap-[4cqw] border-0 bg-transparent p-0 font-honor-title text-[4.8cqw] leading-none font-bold italic text-[#ffe5a6] [text-shadow:0_2px_2px_#613014] transition-[filter] hover:brightness-125 active:brightness-90">
        <svg aria-hidden="true" viewBox="0 0 48 48" className="size-[6.5cqw] shrink-0 fill-[#ffe08b]"><circle cx="24" cy="13" r="10" /><path d="M5 45v-6c0-10 8-15 19-15s19 5 19 15v6Z" /></svg><span>Chơi như khách</span>
      </button>
      <p className="absolute left-[16%] top-[82.8%] m-0 w-[68%] text-center font-arial text-[2.6cqw] leading-[1.5] text-[#ffe5a6]">❕ Chơi như khách có thể mất dữ liệu<br />nếu xóa game hoặc đổi thiết bị</p>
    </section>
    {(notice || error) && <p role={error ? 'alert' : 'status'} className="absolute inset-x-3 bottom-2 m-0 mx-auto w-fit max-w-[min(580px,calc(100vw-24px))] rounded-lg border border-[#ffe08b] bg-[#241007]/95 px-4 py-3 text-center text-sm text-[#ffe5a6]">{error || notice}</p>}
  </main>
}
