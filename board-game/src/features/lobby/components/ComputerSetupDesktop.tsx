import { CrispUiImage } from '../../../lib/CrispUiImage'
import { computerAvatar } from '../../../lib/computerAvatar'
import { PlayerNameplate } from '../../game/components/PlayerNameplate'
import { ComputerActionButton } from './ComputerActionButton'
import puzzles from '../../../assets/computer-setup/training-banner.png'
import { buttonInteraction } from '../../../lib/uiClasses'
import { useComputerLayout } from '../hooks/useComputerLayout'
import { HomeIcon } from './HomeIcon'
import type { useComputerSetup } from '../hooks/useComputerSetup'

function Ornament({ color }: { color: string }) {
  return <svg aria-hidden="true" viewBox="0 0 440 82" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full opacity-50" fill="none" stroke={color} strokeWidth="1.4">
    <path d="M8 32c22-7 35 15 20 23-12 7-23-9-14-15 9-5 19 8 9 14M4 69c18-18 34-14 47-2M432 12c-25 0-31 22-15 29 16 8 26-15 13-20-9-4-18 8-8 16m10 32c-18-18-34-14-47-2" />
    <path d="M2 17V4h15M438 17V4h-15M2 65v13h15m421-13v13h-15" strokeWidth="2.2" />
    <path d="M330 67c16-19 32-34 53-37-8 11-4 20 10 25-16 0-23 7-28 18m-49-9c9-11 20-17 32-18" opacity=".7" />
  </svg>
}

export function ComputerSetupDesktop({ setup }: { setup: ReturnType<typeof useComputerSetup> }) {
  const layout = useComputerLayout()

  return <div ref={layout.areaRef} className="relative min-h-0 flex-1 overflow-hidden overscroll-none compact:hidden">
    <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 42 * layout.scale, width: 1148 * layout.scale, height: 878 * layout.scale }}>
      <div className="relative flex h-[878px] w-[1148px] origin-top-left flex-col items-center" style={{ transform: `scale(${layout.scale})` }}>
        <section aria-label="Thiết lập ván đấu với máy" className="relative h-[625px] w-[1058px] shrink-0 rounded-[6px] border-[3px] border-[#d39a43] bg-[#170d07c9] shadow-[inset_0_0_0_2px_#ffe2a0,inset_0_0_0_5px_#57300f,0_8px_25px_#080401b3]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-[6px] rounded-[3px] border border-[#92612d66]" />
          <div aria-hidden="true" className="pointer-events-none absolute top-[4px] left-[4px] size-[99px] rounded-tl-[95px] border-t border-l border-[#a67a3a66]" />
          <div aria-hidden="true" className="pointer-events-none absolute top-[4px] right-[4px] size-[99px] rounded-tr-[95px] border-t border-r border-[#a67a3a66]" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-[4px] left-[4px] size-[99px] rounded-bl-[95px] border-b border-l border-[#a67a3a66]" />
          <div aria-hidden="true" className="pointer-events-none absolute right-[4px] bottom-[4px] size-[99px] rounded-br-[95px] border-r border-b border-[#a67a3a66]" />



          <CrispUiImage src={computerAvatar} alt="Ông Hoàng" className="pointer-events-none absolute top-[13px] left-1/2 block h-[148px] w-[183px] max-w-none -translate-x-1/2 object-contain" />
          <div className="absolute top-[171px] left-1/2 grid h-[53px] w-[330px] -translate-x-1/2 place-items-center">
            <PlayerNameplate name="Ông Hoàng" className="[--nameplate-width:250px]" />
          </div>

          <div className="absolute top-[261px] right-[28px] left-[28px] grid grid-cols-5 gap-x-[16px] gap-y-[33px]">
            {Array.from({ length: 10 }, (_, index) => index + 1).map(level => <ComputerLevelButton key={level} level={level} selected={setup.level === level} disabled={setup.starting} onClick={() => setup.setLevel(level)} />)}
          </div>

          <fieldset className="absolute top-[454px] right-0 left-0 flex h-[47px] items-center justify-center gap-[31px]">
            <legend className="sr-only">Chọn bên</legend>
            <span aria-hidden="true" className="flex items-center gap-[12px] font-[Arial,sans-serif] text-[21px] text-[#eab44f]"><span className="w-[30px]"><HomeIcon name="friends" /></span>Chọn bên</span>
            {([{ value: 'red', label: 'Đỏ' }, { value: 'black', label: 'Đen' }, { value: 'random', label: 'Ngẫu nhiên' }] as const).map(option => <label key={option.value} className="flex cursor-pointer items-center gap-[10px] whitespace-nowrap font-[Arial,sans-serif] text-[20px] text-[#f4eee4]">
              <input type="radio" name="computer-side" value={option.value} checked={setup.side === option.value} onChange={() => setup.setSide(option.value)} disabled={setup.starting} className={`size-[28px] appearance-none rounded-full border-2 border-[#e3be70] bg-[#21190e]/80 outline-offset-4 checked:shadow-[inset_0_0_0_4px_#291b0d] focus-visible:outline-2 focus-visible:outline-[#fff1ba] ${option.value === 'red' ? 'checked:border-red-500 checked:bg-red-600' : 'checked:bg-[#edbd61]'}`} />{option.label}
            </label>)}
          </fieldset>

          <div className="absolute top-[521px] right-[48px] left-[58px] grid h-[82px] grid-cols-2 gap-[28px]">
            <ComputerActionButton action="position" disabled={setup.starting} onClick={setup.customPosition}>Vị trí tùy chỉnh</ComputerActionButton>
            <ComputerActionButton action="start" disabled={setup.starting} aria-busy={setup.starting} onClick={() => void setup.start()}>{setup.starting ? 'Đang kết nối…' : 'Đấu ngay'}</ComputerActionButton>
          </div>
        </section>
        <button type="button" className={`${buttonInteraction} mt-[13px] aspect-[2132/348] w-[1268px] max-w-none shrink-0 rounded-xl hover:brightness-110`} onClick={() => setup.setMessage('Luyện cờ chưa được hỗ trợ.')}><CrispUiImage src={puzzles} alt="Luyện cờ — Luyện tập cùng máy, rèn kỹ năng mỗi ngày" className="block size-full object-contain" /></button>
    <footer className="pointer-events-none flex h-[30px] w-full shrink-0 items-center justify-center px-4"><span className="text-center font-[Arial,sans-serif] text-[14px] tracking-[0.3em] text-[#c69a42] uppercase [text-shadow:0_1px_2px_#261a0c]">Cờ tướng · Trí tuệ vô tận</span></footer>
      </div>
    </div>

  </div>
}

export function ComputerLevelButton({ level, selected, disabled, onClick }: { level: number; selected: boolean; disabled: boolean; onClick: () => void }) {
  return <button type="button" aria-pressed={selected} disabled={disabled} onClick={onClick} className={`${buttonInteraction} relative h-[64px] compact:h-11 compact:text-[18px] rounded-full border-2 font-heading text-[25px] text-[#ffebbd] shadow-[inset_0_1px_1px_#ffe5a255,0_3px_3px_#0008] disabled:cursor-not-allowed disabled:opacity-60 ${selected ? 'border-[#ffe3a1] bg-[linear-gradient(180deg,#a00910_0%,#570006_80%)] shadow-[0_0_9px_2px_#ff4518,inset_0_0_0_2px_#a83214]' : 'border-[#c99044] bg-[linear-gradient(180deg,#513014_0%,#1c0f08_85%)] hover:brightness-125'}`}>
              <Ornament color={selected ? '#f1ad56' : '#ab762d'} />
              <span className="relative inline-flex items-baseline justify-center gap-[6px] leading-none"><span className="font-heading">Cấp</span><span className="font-number lining-nums tabular-nums">{level}</span></span>
            </button>
}
