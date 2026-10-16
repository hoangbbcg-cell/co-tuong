import { PlayerNameplate } from '../../game/components/PlayerNameplate'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import background from '../../../assets/backgrounds/computer.png'
import { useSessionStore } from '../../../store/sessionStore'
import { AvatarPortrait } from './AvatarCustomization'
import { AvatarFrameOverlay } from '../../game/components/AvatarFrameOverlay'
import { getAvatarFrame } from '../../../lib/avatarFrames'
import { buttonInteraction, gameUtilityButton, homeUtilityButton } from '../../../lib/uiClasses'
import { HomeIcon } from './HomeIcon'
import { ComputerSetupDesktop } from './ComputerSetupDesktop'
import { GameBackIcon } from '../../game/components/GameBackIcon'
import type { useComputerSetup } from '../hooks/useComputerSetup'
import type { useHomeMusic } from '../hooks/useHomeMusic'

type Props = { setup: ReturnType<typeof useComputerSetup>; music: ReturnType<typeof useHomeMusic>; entering: boolean }
const utility = `${buttonInteraction} grid size-12 shrink-0 place-items-center rounded-[var(--ui-p-3,3px)] border-2 border-[#d8ac35] bg-[linear-gradient(#ad7e08,#805100)] text-[#ffe535] shadow-[inset_0_1px_0_#ffec8d,0_3px_5px_#0005] hover:brightness-110 compact:size-10`
const headerUtilityShadow = { boxShadow: 'inset 0 -20px 24px -14px rgba(0,0,0,.68), inset 0 1px 0 #ffec8d, inset 0 0 0 1px #6f400b, 0 8px 20px 6px rgba(0,0,0,.55)' }

export function ComputerSetup({ setup, music, entering }: Props) {
  const avatarIndex = useSessionStore(state => state.avatarIndex)
  const frameIndex = useSessionStore(state => state.avatarFrameIndex)
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch { setup.setMessage('Trình duyệt chưa cho phép chế độ toàn màn hình.') }
  }
  return <div className="relative isolate flex h-full overflow-hidden flex-col bg-[#21180d] text-[#fff0d1]">
    <CrispUiImage src={background} alt="" className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-center" />
    <button type="button" className={`${gameUtilityButton} absolute left-3 top-1 z-30 compact:top-0`} aria-label="Về trang chủ" onClick={setup.back}><GameBackIcon /></button>

    <div inert={entering} className="contents">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,transparent_0%,#24180b40_22%,#24180b80_38%,#24180b80_62%,#24180b40_78%,transparent_100%)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#100a067d_0%,#100a0647_20%,#100a061a_45%,transparent_70%)]" />
    <header className="flex h-[var(--ui-p-56,56px)] shrink-0 items-center gap-6 border-b-2 border-[#b78136] bg-[#130e08]/10 px-10 backdrop-blur-[1px] compact:h-12 compact:gap-3 compact:px-4">
      <span aria-hidden="true" className="w-[34px] shrink-0" />
      <div className="flex min-w-0 flex-1 items-center gap-3">
      <span className="relative top-px block size-[45px] shrink-0 self-center rounded-full border-0 bg-transparent p-0 leading-none compact:size-[33px]">
        <AvatarPortrait avatarIndex={avatarIndex} className="size-full rounded-full" />
        <AvatarFrameOverlay src={getAvatarFrame(frameIndex).image} />
      </span>
      <span className="w-full max-w-48 self-center truncate border-0 bg-transparent py-0 font-heading text-2xl leading-none text-[#eee4ce] lining-nums tabular-nums compact:text-lg">{setup.name}</span>
      </div>
      <nav className="flex shrink-0 items-center gap-2" aria-label="Tiện ích">
      <button style={headerUtilityShadow} className={`${homeUtilityButton} shrink-0`} aria-label={music.playing ? 'Tắt nhạc' : 'Bật nhạc'} aria-pressed={music.playing} onClick={() => void music.toggle().catch(() => setup.setMessage('Không thể phát nhạc trên trình duyệt này.'))}><HomeIcon name={music.playing ? 'sound' : 'muted'} /></button>
      <button style={headerUtilityShadow} className={`${homeUtilityButton} shrink-0`} aria-label="Toàn màn hình" title="Phóng to/thu nhỏ màn hình" onClick={() => void toggleFullscreen()}><HomeIcon name="fullscreen" /></button>
      </nav>
    </header>
    <section className="relative flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 desktop:hidden" aria-label="Thi?t l?p v?n ??u tr?n ?i?n tho?i"><div className="flex justify-center"><PlayerNameplate name="Ông Hoàng" className="[--nameplate-width:250px]" /></div><div className="grid grid-cols-5 gap-2">{Array.from({ length: 10 }, (_, index) => index + 1).map(level => <button key={level} type="button" disabled={setup.starting} aria-pressed={setup.level === level} onClick={() => setup.setLevel(level)} className={`${buttonInteraction} flex min-h-12 items-baseline justify-center gap-1 rounded-full border border-[#79501e] py-3 text-lg ${setup.level === level ? 'bg-[#8b0910]' : 'bg-[#241007]'}`}><span className="font-heading">Cấp</span><span className="font-number lining-nums tabular-nums">{level}</span></button>)}</div><fieldset><legend className="mb-3 text-lg">B?n c?m qu?n</legend><div className="grid grid-cols-3 gap-2">{(['red','black','random'] as const).map(side=><label key={side} className="flex min-h-12 items-center justify-center gap-1 rounded-lg border border-[#79501e] bg-[#241007]"><input type="radio" name="mobile-side" checked={setup.side===side} onChange={()=>setup.setSide(side)} disabled={setup.starting}/>{side==='red'?'??':side==='black'?'?en':'B?t k?'}</label>)}</div></fieldset><button disabled={setup.starting} onClick={()=>void setup.start()} className={buttonInteraction + ' min-h-14 rounded-xl border border-[#ffe08b] bg-[linear-gradient(#613014,#241007)] font-heading text-3xl disabled:opacity-50'}>{setup.starting?'?ang chu?n b??':'??u ngay'}</button></section>
    <button type="button" disabled={setup.starting} onClick={setup.customPosition} className={`${buttonInteraction} mx-5 mb-4 min-h-12 rounded-lg border border-[#c99044] bg-[#241007] px-4 font-heading text-xl desktop:hidden`}>Vị trí tùy chỉnh</button>
    <ComputerSetupDesktop setup={setup} />

    <dialog ref={setup.messageRef} aria-label="Thông báo" onCancel={() => setup.setMessage('')} className="m-auto w-[min(var(--ui-p-384,384px),90vw)] rounded-xl border border-[#c7a264] bg-[#30271e] p-6 text-center text-[#fff0d1] shadow-2xl backdrop:bg-black/60"><p>{setup.message}</p><button autoFocus className={`${utility} mx-auto mt-5 w-auto px-6 text-base`} onClick={() => setup.setMessage('')}>Đã hiểu</button></dialog>
    </div>
  </div>
}
