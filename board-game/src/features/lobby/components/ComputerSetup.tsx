import { HovangLoadingOverlay } from '../../../components/HovangLoadingOverlay'
import { oneChoiceNoticeDialog, oneChoiceNoticeButton } from './OneChoiceNoticeStyles'
import trainingBanner from '../../../assets/computer-setup/training-banner.png'
import { computerAvatar } from '../../../lib/computerAvatar'
import { ComputerActionButton } from './ComputerActionButton'
import { ComputerVariantTabs } from './ComputerVariantTabs'
import { PlayerNameplate } from '../../game/components/PlayerNameplate'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { buttonInteraction, gameUtilityButton, homeUtilityButton } from '../../../lib/uiClasses'
import { HomeIcon } from './HomeIcon'
import { ComputerSetupDesktop, ComputerLevelButton } from './ComputerSetupDesktop'
import { GameBackIcon } from '../../game/components/GameBackIcon'
import type { useComputerSetup } from '../hooks/useComputerSetup'
import type { useHomeMusic } from '../hooks/useHomeMusic'
import background from '../../../assets/backgrounds/computer.webp'

type Props = {
  setup: ReturnType<typeof useComputerSetup>
  music: ReturnType<typeof useHomeMusic>
  entering: boolean
  /** Call with a callback: show closing-cover animation, then run the callback */
  onNavigate: (cb: () => void) => void
}


export function ComputerSetup({ setup, music, entering, onNavigate }: Props) {
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch { setup.setMessage('Trình duyệt chưa cho phép chế độ toàn màn hình.') }
  }

  const handleStart = () => {
    void setup.start()
  }

  const handleCustomPosition = () => {
    onNavigate(setup.customPosition)
  }

  return <div className="relative isolate flex h-full overflow-hidden flex-col bg-[#21180d] text-[#fff0d1]">
    {setup.starting && <HovangLoadingOverlay label="Đang chuẩn bị ván cờ" />}
    <CrispUiImage src={background} alt="" className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-center" />

    {/* ── All interactive content (inert during entrance animation) ── */}
    <div inert={entering} className="contents">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,transparent_0%,#24180b40_22%,#24180b80_38%,#24180b80_62%,#24180b40_78%,transparent_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#100a067d_0%,#100a0647_20%,#100a061a_45%,transparent_70%)]" />
      <header className="relative flex h-[var(--ui-p-56,56px)] shrink-0 items-center gap-6 border-b-2 border-[#b78136] bg-[#130e08]/85 px-10 compact:h-[calc(42px+12px)] compact:gap-3 compact:px-4">
        <button type="button" className={`${gameUtilityButton} shrink-0 compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)`} aria-label="Về trang chủ" onClick={setup.back}><GameBackIcon /></button>
        <nav className="ml-auto flex flex-wrap shrink-0 items-center justify-end gap-[10px]" aria-label="Tiện ích">
          <button data-ui-tab-sound className={`${homeUtilityButton} compact:[box-shadow:inset_0_-20px_24px_-14px_rgba(0,0,0,.68),inset_0_1px_0_#ffec8d,inset_0_0_0_1px_#6f400b,0_8px_20px_6px_rgba(0,0,0,.55)] shrink-0 compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)`} aria-label={music.playing ? 'Tắt nhạc' : 'Bật nhạc'} aria-pressed={music.playing} onClick={() => void music.toggle().catch(() => setup.setMessage('Không thể phát nhạc trên trình duyệt này.'))}><HomeIcon name={music.playing ? 'sound' : 'muted'} /></button>
          <button className={`${homeUtilityButton} compact:[box-shadow:inset_0_-20px_24px_-14px_rgba(0,0,0,.68),inset_0_1px_0_#ffec8d,inset_0_0_0_1px_#6f400b,0_8px_20px_6px_rgba(0,0,0,.55)] shrink-0 compact:hidden`} aria-label="Toàn màn hình" title="Phóng to/thu nhỏ màn hình" onClick={() => void toggleFullscreen()}><HomeIcon name="fullscreen" /></button>
        </nav>
      </header>
      <section aria-label="Thiết lập ván đấu trên điện thoại" className="relative flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto border-[3px] border-[#d39a43] bg-[#170d07c9] p-3 shadow-[inset_0_0_0_2px_#ffe2a0,inset_0_0_0_5px_#57300f] desktop:hidden">
        <div className="flex shrink-0 flex-col items-center gap-1"><CrispUiImage src={computerAvatar} alt="Ông Hoàng" className="h-[100px] w-[124px] object-contain" /><PlayerNameplate name="Ông Hoàng" className="[--nameplate-width:170px]" /></div>
        <div className="flex shrink-0 translate-y-[4px] flex-col gap-3"><ComputerVariantTabs variant={setup.variant} onChange={setup.setVariant} disabled={setup.starting} />
          <div className="mt-[12px] grid shrink-0 grid-cols-5 gap-2">{Array.from({length:10},(_,index)=>index+1).map(level => <ComputerLevelButton key={level} level={level} selected={setup.level === level} disabled={setup.starting} onClick={() => setup.setLevel(level)} />)}</div>
          <fieldset className="flex shrink-0 flex-wrap items-center justify-center gap-x-6 gap-y-3 py-1"><legend className="mb-2 w-full text-center font-body text-base text-[#eab44f]">Chọn bên</legend>{([{value:'red',label:'Đỏ'},{value:'black',label:'Đen'},{value:'random',label:'Ngẫu nhiên'}] as const).map(option => <label key={option.value} className="flex items-center gap-2 font-body text-sm text-[#f4eee4]"><input data-ui-selection-sound type="radio" name="mobile-side" checked={setup.side === option.value} onChange={() => setup.setSide(option.value)} disabled={setup.starting} className={`size-5 appearance-none rounded-full border-2 border-[#e3be70] bg-[#21190e]/80 outline-offset-4 checked:shadow-[inset_0_0_0_3px_#291b0d] focus-visible:outline-2 focus-visible:outline-[#fff1ba] ${option.value === 'red' ? 'checked:border-red-500 checked:bg-red-600' : 'checked:bg-[#edbd61]'}`} />{option.label}</label>)}</fieldset>
          <div className="grid h-12 shrink-0 grid-cols-2 gap-3">
            <ComputerActionButton data-ui-selection-sound action="position" disabled={setup.starting} onClick={handleCustomPosition}>Vị trí tùy chỉnh</ComputerActionButton>
            <ComputerActionButton data-ui-selection-sound action="start" disabled={setup.starting} aria-busy={setup.starting} onClick={handleStart}>{setup.starting ? 'Đang chuẩn bị…' : 'Đấu ngay'}</ComputerActionButton>
          </div>
        </div>
        <button data-ui-selection-sound type="button" className={`${buttonInteraction} relative -top-[10px] mt-auto -mx-2 w-[calc(100%+16px)] aspect-[2132/418] shrink-0`} onClick={() => setup.setMessage('Luyện cờ chưa được hỗ trợ.')}><CrispUiImage src={trainingBanner} alt="Luyện cờ — Luyện tập cùng máy, rèn kỹ năng mỗi ngày" className="block size-full object-fill" /></button>
      </section>
      <ComputerSetupDesktop setup={setup} onStart={handleStart} onCustomPosition={handleCustomPosition} />
      <dialog ref={setup.messageRef} aria-label="Thông báo" onCancel={() => setup.setMessage('')} className={`${oneChoiceNoticeDialog} backdrop:bg-black/60`}><p>{setup.message}</p><button autoFocus className={oneChoiceNoticeButton} onClick={() => setup.setMessage('')}>Đã hiểu</button></dialog>
    </div>
  </div>
}
