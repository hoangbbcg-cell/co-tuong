import { GoogleSignInButton } from '../../features/lobby/components/GoogleSignInButton'
import { useState } from 'react'
import background from '../../assets/backgrounds/home.png'
import panel from '../../assets/login/login-panel-google.png'
import { useEntryStore } from '../../store/entryStore'
import { errorMessage } from '../../services/api'

export function LoginPage() {
  const enterGuest = useEntryStore(state => state.enterGuest)
  const [notice,setNotice]=useState('')
  const [error, setError] = useState('')
  const [pending,setPending]=useState(false)
  const playGuest = async () => {
    if(pending)return
    setPending(true)
    try { await enterGuest() }
    catch (error) { setError(`Không kết nối hoặc tải được tài khoản: ${errorMessage(error)}`) }
    finally{setPending(false)}
  }
  return <main aria-label="Đăng nhập Cờ Tướng" className="fixed inset-0 isolate flex items-center justify-center overflow-hidden bg-[#241007]">
    <img src={background} alt="" draggable={false} className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center" />
    <section aria-label="Chọn cách vào game" className="relative shrink-0 [container-type:inline-size]" style={{ width: 'min(710px, calc(88svh * 1202 / 1307), calc(100vw - 12px))', aspectRatio: '1202 / 1307' }}>
      <h1 className="sr-only">Cờ Tướng</h1>
      <img src={panel} alt="" draggable={false} className="pointer-events-none absolute inset-0 block size-full border-0 p-0" />
      <div className="absolute left-[16.2%] top-[47.7%] h-[12%] w-[67.6%]"><GoogleSignInButton onError={message=>{setError('');setNotice(message)}} /></div>
      <p className="absolute left-[13%] top-[61%] m-0 w-[74%] text-center font-arial text-[2.3cqw] leading-[1.5] text-[#ffe5a6]">⛨ Đăng nhập để bảo vệ tài khoản, chơi trên nhiều thiết bị</p>
      <div aria-hidden="true" className="absolute left-[19%] top-[66.5%] flex w-[62%] items-center gap-[1.8cqw] text-[2.5cqw] text-[#ffe08b]"><span className="h-px flex-1 bg-[linear-gradient(to_right,transparent,#ffe08b)]" /><span>◇ hoặc ◇</span><span className="h-px flex-1 bg-[linear-gradient(to_left,transparent,#ffe08b)]" /></div>
      <button type="button" disabled={pending} onClick={playGuest} className="absolute left-[19.2%] top-[70%] flex h-[12%] w-[61.6%] cursor-pointer items-center justify-center gap-[4cqw] border-0 bg-transparent p-0 font-honor-title text-[4.8cqw] leading-none font-bold italic text-[#ffe5a6] [text-shadow:0_2px_2px_#613014] transition-[filter] hover:brightness-125 active:brightness-90">
        <svg aria-hidden="true" viewBox="0 0 48 48" className="size-[6.5cqw] shrink-0 fill-[#ffe08b]"><circle cx="24" cy="13" r="10" /><path d="M5 45v-6c0-10 8-15 19-15s19 5 19 15v6Z" /></svg><span>Chơi như khách</span>
      </button>
      <p className="absolute left-[16%] top-[82.8%] m-0 w-[68%] text-center font-arial text-[2.6cqw] leading-[1.5] text-[#ffe5a6]">❕ Chơi như khách có thể mất dữ liệu<br />nếu xóa game hoặc đổi thiết bị</p>
    </section>
    {(notice || error) && <p role={error ? 'alert' : 'status'} className="absolute inset-x-3 bottom-2 m-0 mx-auto w-fit max-w-[min(580px,calc(100vw-24px))] rounded-lg border border-[#ffe08b] bg-[#241007]/95 px-4 py-3 text-center text-sm text-[#ffe5a6]">{error || notice}</p>}
  </main>
}



