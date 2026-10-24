import { computerAvatar } from '../../../lib/computerAvatar'
import customPositionArtwork from '../../../assets/computer-setup/custom-position.png'
import startMatchArtwork from '../../../assets/computer-setup/start-match.png'
import { PlayerNameplate } from '../../game/components/PlayerNameplate'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import background from '../../../assets/backgrounds/computer.png'




import { buttonInteraction, gameUtilityButton, homeUtilityButton } from '../../../lib/uiClasses'
import { HomeIcon } from './HomeIcon'
import { ComputerSetupDesktop, ComputerLevelButton } from './ComputerSetupDesktop'
import { GameBackIcon } from '../../game/components/GameBackIcon'
import type { useComputerSetup } from '../hooks/useComputerSetup'
import type { useHomeMusic } from '../hooks/useHomeMusic'

type Props = { setup: ReturnType<typeof useComputerSetup>; music: ReturnType<typeof useHomeMusic>; entering: boolean }
const utility = `${buttonInteraction} grid size-12 shrink-0 place-items-center rounded-[var(--ui-p-3,3px)] border-2 border-[#d8ac35] bg-[linear-gradient(#ad7e08,#805100)] text-[#ffe535] shadow-[inset_0_1px_0_#ffec8d,0_3px_5px_#0005] hover:brightness-110 compact:size-10`
const headerUtilityShadow = { boxShadow: 'inset 0 -20px 24px -14px rgba(0,0,0,.68), inset 0 1px 0 #ffec8d, inset 0 0 0 1px #6f400b, 0 8px 20px 6px rgba(0,0,0,.55)' }

export function ComputerSetup({ setup, music, entering }: Props) {
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch { setup.setMessage('Trình duyệt chưa cho phép chế độ toàn màn hình.') }
  }
  return <div className="relative isolate flex h-full overflow-hidden flex-col bg-[#21180d] text-[#fff0d1]">
    <CrispUiImage src={background} alt="" className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-center" />

    <div inert={entering} className="contents">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,transparent_0%,#24180b40_22%,#24180b80_38%,#24180b80_62%,#24180b40_78%,transparent_100%)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#100a067d_0%,#100a0647_20%,#100a061a_45%,transparent_70%)]" />
    <header className="flex h-[var(--ui-p-56,56px)] shrink-0 items-center gap-6 border-b-2 border-[#b78136] bg-[#130e08]/10 px-10 backdrop-blur-[1px] compact:h-12 compact:gap-3 compact:px-4">
      <button type="button" className={`${gameUtilityButton} shrink-0 compact:size-9 compact:[&_svg]:size-5`} aria-label="Về trang chủ" onClick={setup.back}><GameBackIcon /></button>
      <nav className="ml-auto flex shrink-0 items-center gap-2" aria-label="Tiện ích">
      <button style={headerUtilityShadow} className={`${homeUtilityButton} shrink-0 compact:size-9 compact:[&_svg]:size-5`} aria-label={music.playing ? 'Tắt nhạc' : 'Bật nhạc'} aria-pressed={music.playing} onClick={() => void music.toggle().catch(() => setup.setMessage('Không thể phát nhạc trên trình duyệt này.'))}><HomeIcon name={music.playing ? 'sound' : 'muted'} /></button>
      <button style={headerUtilityShadow} className={`${homeUtilityButton} shrink-0 compact:size-9 compact:[&_svg]:size-5`} aria-label="Toàn màn hình" title="Phóng to/thu nhỏ màn hình" onClick={() => void toggleFullscreen()}><HomeIcon name="fullscreen" /></button>
      </nav>
    </header>
    <section aria-label="Thiết lập ván đấu trên điện thoại" className="relative m-3 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-md border-[3px] border-[#d39a43] bg-[#170d07c9] p-3 shadow-[inset_0_0_0_2px_#ffe2a0,inset_0_0_0_5px_#57300f,0_8px_25px_#080401b3] desktop:hidden">
      <div role="group" aria-label="Chọn engine" className="grid shrink-0 grid-cols-2 gap-2">{([{value:'pikafish',label:'Pikafish'},{value:'hovang',label:'HOVANG v0.4 · thử nghiệm'}] as const).map(option => <button key={option.value} type="button" disabled={setup.starting} aria-pressed={setup.engine === option.value} onClick={() => setup.setEngine(option.value)} className={`${buttonInteraction} rounded-md border px-2 py-2 font-body text-sm ${setup.engine === option.value ? 'border-[#ffe3a1] bg-[#790b0e] text-[#fff0cf]' : 'border-[#a67a3a] bg-[#211309] text-[#d9bd86]'}`}>{option.label}</button>)}</div>
      <div className="flex shrink-0 flex-col items-center gap-1"><CrispUiImage src={computerAvatar} alt="Ông Hoàng" className="h-[100px] w-[124px] object-contain" /><PlayerNameplate name={setup.engine === 'hovang' ? 'HOVANG v0.4' : 'Ông Hoàng'} className="[--nameplate-width:210px]" /></div>
      <div className="grid shrink-0 grid-cols-5 gap-2">{Array.from({length:10},(_,index)=>index+1).map(level => <ComputerLevelButton key={level} level={level} selected={setup.level === level} disabled={setup.starting} onClick={() => setup.setLevel(level)} />)}</div>
      <fieldset className="flex shrink-0 flex-wrap items-center justify-center gap-3 py-1"><legend className="mb-2 w-full text-center font-body text-base text-[#eab44f]">Chọn bên</legend>{([{value:'red',label:'Đỏ'},{value:'black',label:'Đen'},{value:'random',label:'Ngẫu nhiên'}] as const).map(option => <label key={option.value} className="flex items-center gap-2 font-body text-sm text-[#f4eee4]"><input type="radio" name="mobile-side" checked={setup.side === option.value} onChange={() => setup.setSide(option.value)} disabled={setup.starting} className="size-5 accent-[#edbd61]" />{option.label}</label>)}</fieldset>
      <div className="grid h-12 shrink-0 grid-cols-2 gap-3"><button type="button" disabled={setup.starting} onClick={setup.customPosition} className={`${buttonInteraction} overflow-hidden rounded`}><CrispUiImage src={customPositionArtwork} alt="Vị trí tùy chỉnh" className="size-full object-fill" /></button><button type="button" disabled={setup.starting} aria-busy={setup.starting} onClick={() => void setup.start()} className={`${buttonInteraction} overflow-hidden rounded`}><CrispUiImage src={startMatchArtwork} alt={setup.starting ? 'Đang chuẩn bị…' : 'Đấu ngay'} className="size-full object-fill" /></button></div>
    </section>
    <ComputerSetupDesktop setup={setup} />

    <dialog ref={setup.messageRef} aria-label="Thông báo" onCancel={() => setup.setMessage('')} className="m-auto w-[min(var(--ui-p-384,384px),90vw)] rounded-xl border border-[#c7a264] bg-[#30271e] p-6 text-center text-[#fff0d1] shadow-2xl backdrop:bg-black/60"><p>{setup.message}</p><button autoFocus className={`${utility} mx-auto mt-5 w-auto px-6 text-base`} onClick={() => setup.setMessage('')}>Đã hiểu</button></dialog>
    </div>
  </div>
}
