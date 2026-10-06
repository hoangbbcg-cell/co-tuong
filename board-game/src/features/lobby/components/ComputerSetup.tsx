import { CrispUiImage } from '../../../lib/CrispUiImage'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import background from '../../../assets/backgrounds/computer.png'
import avatar from '../../../assets/computer-setup/avatar.png'
import title from '../../../assets/computer-setup/title-transparent.png'
import robotBlack from '../../../assets/computer-setup/robot-black.png'
import robotRed from '../../../assets/computer-setup/robot-red.png'
import customPosition from '../../../assets/computer-setup/custom-position.png'
import startMatch from '../../../assets/computer-setup/start-match.png'
import puzzles from '../../../assets/computer-setup/puzzles.png'
import back from '../../../assets/computer-setup/back.png'

import { useComputerLayout } from '../hooks/useComputerLayout'
import { buttonInteraction, homeUtilityButton } from '../../../lib/uiClasses'
import { HomeIcon } from './HomeIcon'
import type { useComputerSetup } from '../hooks/useComputerSetup'
import type { useHomeMusic } from '../hooks/useHomeMusic'

type Props = { setup: ReturnType<typeof useComputerSetup>; music: ReturnType<typeof useHomeMusic> }
const utility = `${buttonInteraction} grid size-12 shrink-0 place-items-center rounded-[var(--ui-p-3,3px)] border-2 border-[#d8ac35] bg-[linear-gradient(#ad7e08,#805100)] text-[#ffe535] shadow-[inset_0_1px_0_#ffec8d,0_3px_5px_#0005] hover:brightness-110 compact:size-10`
const headerUtilityShadow = { boxShadow: 'inset 0 -20px 24px -14px rgba(0,0,0,.68), inset 0 1px 0 #ffec8d, inset 0 0 0 1px #6f400b, 0 8px 20px 6px rgba(0,0,0,.55)' }

function ActionButtonOrnament({ color }: { color: string }) {
  return <svg aria-hidden="true" viewBox="0 0 440 82" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full opacity-55" fill="none" stroke={color} strokeWidth="1.4">
    <path d="M8 32c22-7 35 15 20 23-12 7-23-9-14-15 9-5 19 8 9 14M4 69c18-18 34-14 47-2M432 12c-25 0-31 22-15 29 16 8 26-15 13-20-9-4-18 8-8 16m10 32c-18-18-34-14-47-2" />
    <path d="M2 17V4h15M438 17V4h-15M2 65v13h15m421-13v13h-15" strokeWidth="2.2" />
    <path d="M330 67c16-19 32-34 53-37-8 11-4 20 10 25-16 0-23 7-28 18m-49-9c9-11 20-17 32-18" opacity=".7" />
  </svg>
}

export function ComputerSetup({ setup, music }: Props) {
  const layout = useComputerLayout()
  return <div className="relative isolate flex h-full overflow-hidden flex-col bg-[#21180d] text-[#fff0d1]">
    <CrispUiImage src={background} alt="" className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-center" />

    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,transparent_0%,#24180b40_22%,#24180b80_38%,#24180b80_62%,#24180b40_78%,transparent_100%)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#100a067d_0%,#100a0647_20%,#100a061a_45%,transparent_70%)]" />
    <header className="flex h-[var(--ui-p-56,56px)] shrink-0 items-center gap-6 border-b-2 border-[#b78136] bg-[#130e08]/10 px-10 backdrop-blur-[1px] compact:h-12 compact:gap-3 compact:px-4">
      <button className={`${buttonInteraction} text-4xl text-[#f0b34b]`} aria-label="Về trang chủ" onClick={setup.back}><CrispUiImage src={back} alt="" className="w-[var(--ui-p-34,34px)]" /></button>
      <span className="relative block size-[var(--ui-p-40,40px)] shrink-0 cursor-pointer rounded-full shadow-[0_7px_22px_8px_#0009] compact:size-9">
        <CrispUiImage src={avatar} alt="" className="block size-full object-contain" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_35%,transparent_38%,#00000099_100%)]" />
      </span>
      <span className="min-w-0 flex-1 truncate text-lg compact:text-sm">{setup.name}</span>
      <button style={headerUtilityShadow} className={`${homeUtilityButton} shrink-0`} aria-label="Thành tích" onClick={() => setup.setMessage('Thành tích chưa được hỗ trợ.')}><HomeIcon name="trophy" /></button>
      <button style={headerUtilityShadow} className={`${homeUtilityButton} shrink-0`} aria-label={music.playing ? 'Tắt nhạc' : 'Bật nhạc'} aria-pressed={music.playing} onClick={() => void music.toggle().catch(() => setup.setMessage('Không thể phát nhạc trên trình duyệt này.'))}><HomeIcon name={music.playing ? 'sound' : 'muted'} /></button>
    </header>
    <div ref={layout.areaRef} className="relative min-h-0 flex-1 overflow-hidden overscroll-none">
      <div className="absolute top-[var(--ui-p-10,10px)] left-1/2 flex h-[var(--ui-p-810,810px)] w-[var(--ui-p-1148,1148px)] origin-top flex-col justify-start [&>*]:shrink-0" style={{ ...getCrispUiLayout(layout.scale, 1148, 810), top: 10, transform: 'translateX(-50%)' }}>
        <h1 className="relative mx-auto h-[var(--ui-p-90,90px)] w-full max-w-[var(--ui-p-738,738px)]">
          <CrispUiImage src={title} alt="Chơi với máy" className="pointer-events-none absolute -top-[var(--ui-p-96,96px)] -left-[var(--ui-p-41,41px)] w-[var(--ui-p-820,820px)] max-w-none [filter:drop-shadow(0_2px_2px_#160a0280)] [clip-path:inset(0_18%_0_19%)]" />
          <CrispUiImage src={title} alt="" aria-hidden="true" className="pointer-events-none absolute top-[calc(50%-var(--ui-p-5,5px))] w-full -translate-x-6 -translate-y-1/2 [clip-path:inset(0_81%_0_0)]" />
          <CrispUiImage src={title} alt="" aria-hidden="true" className="pointer-events-none absolute top-[calc(50%-var(--ui-p-5,5px))] w-full translate-x-6 -translate-y-1/2 [clip-path:inset(0_0_0_82%)]" />
        </h1>
        <div aria-hidden="true" className="mb-2 h-px w-full bg-[linear-gradient(90deg,transparent,#a57a37_18%,#e3bd72_50%,#a57a37_82%,transparent)]" />
        <section aria-label="Thiết lập ván đấu với máy" className="relative isolate mx-auto w-full max-w-[var(--ui-p-960,960px)]">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-[var(--ui-p-28,28px)] -top-[var(--ui-p-16,16px)] -bottom-[var(--ui-p-26,26px)] -z-20 rounded-[var(--ui-p-8,8px)] border-[length:var(--ui-p-3,3px)] border-[#c78b32] bg-[#120b06a8] shadow-[inset_0_0_0_2px_#f0bd5f,inset_0_0_0_5px_#4e2b11,0_7px_24px_#050301b3]" />
          <svg aria-hidden="true" viewBox="0 0 960 460" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-[var(--ui-p-22,22px)] -top-[var(--ui-p-10,10px)] -bottom-[var(--ui-p-20,20px)] -z-10 h-[calc(100%+var(--ui-p-30,30px))] w-[calc(100%+var(--ui-p-44,44px))] opacity-35" fill="none" stroke="#b97c2c" strokeWidth="2">
            <path d="M18 150c55-10 77 47 43 66-29 17-54-24-30-39 23-15 49 17 28 37-22 21-51 7-55-17m8 82c48-19 75 8 91 45M942 150c-55-10-77 47-43 66 29 17 54-24 30-39-23-15-49 17-28 37 22 21 51 7 55-17m-8 82c-48-19-75 8-91 45" />
            <path d="M10 42c34 8 49-6 62-29M950 42c-34 8-49-6-62-29M10 418c34-8 49 6 62 29m878-29c-34-8-49 6-62 29" opacity=".65" />
          </svg>
          <span aria-hidden="true" className="pointer-events-none absolute -top-[var(--ui-p-10,10px)] -left-[var(--ui-p-22,22px)] size-7 border-t-[var(--ui-p-4,4px)] border-l-[var(--ui-p-4,4px)] border-[#e0a644]" />
          <span aria-hidden="true" className="pointer-events-none absolute -top-[var(--ui-p-10,10px)] -right-[var(--ui-p-22,22px)] size-7 border-t-[var(--ui-p-4,4px)] border-r-[var(--ui-p-4,4px)] border-[#e0a644]" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-[var(--ui-p-20,20px)] -left-[var(--ui-p-22,22px)] size-7 border-b-[var(--ui-p-4,4px)] border-l-[var(--ui-p-4,4px)] border-[#e0a644]" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-[var(--ui-p-22,22px)] -bottom-[var(--ui-p-20,20px)] size-7 border-r-[var(--ui-p-4,4px)] border-b-[var(--ui-p-4,4px)] border-[#e0a644]" />
          <div className="relative isolate mx-auto grid h-[var(--ui-p-388,388px)] w-full max-w-[var(--ui-p-900,900px)] grid-cols-[var(--ui-p-212,212px)_minmax(0,1fr)] items-stretch gap-x-5 compact:grid-cols-[var(--ui-p-190,190px)_minmax(0,1fr)] compact:gap-x-3">
            <div className="flex h-full items-center justify-center">
              <div className="relative flex h-[var(--ui-p-358,358px)] w-full translate-x-[var(--ui-p-45,45px)] flex-col items-center justify-center gap-[var(--ui-p-15,15px)]">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 rounded-[var(--ui-p-10,10px)] border-2 border-[#9f6a27] bg-[#1b110aa6] shadow-[inset_0_0_0_2px_#dfad56,inset_0_0_0_5px_#3f260f]" />
                <svg aria-hidden="true" viewBox="0 0 212 358" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 size-full opacity-45" fill="none" stroke="#bd8130" strokeWidth="2">
                  <path d="M19 318c42-18 28-59 2-48-24 10 5 39 20 20 17-22-24-40-19-74 4-29 38-35 45-13 6 20-24 31-33 13-10-20 28-36 19-67-7-25-34-27-39-5" />
                  <path d="M18 38c27 12 43-1 54-25M18 322c28-11 45 4 58 27M44 86c15-16 32-17 47-4-20 5-25 19-15 39-20-11-38-4-48 18" opacity=".75" />
                </svg>
                <CrispUiImage src={robotBlack} alt="Máy bên đen" className="w-[var(--ui-p-192,192px)] shrink-0 object-contain" />
                <CrispUiImage src={robotRed} alt="Máy bên đỏ" className="w-[var(--ui-p-192,192px)] shrink-0 object-contain" />
              </div>
            </div>
            <div className="grid h-full grid-rows-[var(--ui-p-189,189px)_var(--ui-p-159,159px)_var(--ui-p-40,40px)] items-center">
              {(['black', 'red'] as const).map(side => <label key={side} className="relative mx-auto w-[calc(100%_-_var(--ui-p-100,100px))] min-w-0">
                <span className="sr-only">Máy bên {side === 'red' ? 'đỏ' : 'đen'}</span>
                <select value={setup.engines[side]} disabled={setup.starting} onChange={event => setup.setEngines(current => ({ ...current, [side]: event.target.value === 'pikafish' ? 'pikafish' : 'basic' }))} className={`${buttonInteraction} h-[var(--ui-p-66,66px)] w-full appearance-none rounded-[var(--ui-p-4,4px)] border border-[#b18a4d] bg-[linear-gradient(110deg,#60441fd9,#3c2a13d9)] pr-16 pl-5 font-[Arial,sans-serif] text-[length:var(--ui-p-22,22px)] font-normal text-[#f4eee4] shadow-[inset_0_0_0_2px_#382713,inset_0_0_0_3px_#bd955a55,0_2px_4px_#0005] compact:pl-3`}>
                  <option value="pikafish" className="bg-[#382717]">Pikafish</option>
                  <option value="basic" className="bg-[#382717]">Máy · Cơ bản</option>
                </select>
                <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[length:var(--ui-p-40,40px)] leading-none text-[#f9e6bc]">▾</span>
              </label>)}
              <fieldset className="mx-auto flex w-[calc(100%_-_var(--ui-p-100,100px))] min-w-0 -translate-y-4 items-center justify-start gap-x-7 compact:gap-x-4">
                <legend className="sr-only">Chọn bên</legend>
                <span aria-hidden="true" className="flex items-center gap-2 whitespace-nowrap font-[Arial,sans-serif] text-[length:var(--ui-p-21,21px)] text-[#efbd5e]"><span className="w-8"><HomeIcon name="friends" /></span>Chọn bên</span>
                {([{ value: 'red', label: 'Đỏ' }, { value: 'black', label: 'Đen' }, { value: 'random', label: 'Ngẫu nhiên' }] as const).map(option => <label key={option.value} className="flex cursor-pointer items-center gap-3 whitespace-nowrap font-[Arial,sans-serif] text-[length:var(--ui-p-20,20px)] text-[#f4eee4]">
                  <input type="radio" name="computer-side" value={option.value} checked={setup.side === option.value} onChange={() => setup.setSide(option.value)} className={`size-7 appearance-none rounded-full border-2 border-[#e3be70] bg-[#21190e]/80 outline-offset-4 checked:shadow-[inset_0_0_0_4px_#291b0d] focus-visible:outline-2 focus-visible:outline-[#fff1ba] ${option.value === 'red' ? 'checked:border-red-500 checked:bg-red-600' : 'checked:bg-[#edbd61]'}`} />{option.label}
                </label>)}
              </fieldset>
            </div>
          </div>
          <div ref={layout.actionsRef} className="mx-auto mt-[var(--ui-p-8,8px)] grid w-full max-w-[var(--ui-p-924,924px)] grid-cols-[444fr_422fr] items-center gap-5 compact:gap-3">
            <button className={`${buttonInteraction} relative overflow-hidden rounded-lg hover:brightness-110`} onClick={() => setup.setMessage('Vị trí tùy chỉnh chưa được hỗ trợ.')}><CrispUiImage src={customPosition} alt="Vị trí tùy chỉnh" className="block w-full" /><ActionButtonOrnament color="#e1a544" /></button>
            <button className={`${buttonInteraction} relative overflow-hidden rounded-lg hover:brightness-110`} disabled={setup.starting} aria-busy={setup.starting} onClick={() => void setup.start()}><CrispUiImage src={startMatch} alt={setup.starting ? 'Đang kết nối Pikafish…' : 'Đấu ngay'} className="block w-full" /><ActionButtonOrnament color="#ff3346" /></button>
          </div>
        </section>
        <button ref={layout.bannerRef} style={{ marginTop: layout.bannerGap }} className={`${buttonInteraction} mx-auto w-[var(--ui-p-1148,1148px)] rounded-xl hover:brightness-110`} onClick={() => setup.setMessage('Cờ thế chưa được hỗ trợ.')}><CrispUiImage src={puzzles} alt="Cờ thế — Thử thách các thế cờ được chuẩn bị sẵn" className="block w-full" /></button>


      </div>
      <footer style={{ top: layout.footerTop }} className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center px-4"><span className="text-center font-[Arial,sans-serif] text-[length:var(--ui-p-14,14px)] tracking-[0.3em] text-[#c69a42] uppercase [text-shadow:0_1px_2px_#261a0c] compact:text-[length:var(--ui-p-10,10px)] compact:tracking-[0.15em]">Cờ tướng · Trí tuệ vô tận</span></footer>
    </div>

    <dialog ref={setup.messageRef} aria-label="Thông báo" onCancel={() => setup.setMessage('')} className="m-auto w-[min(var(--ui-p-384,384px),90vw)] rounded-xl border border-[#c7a264] bg-[#30271e] p-6 text-center text-[#fff0d1] shadow-2xl backdrop:bg-black/60"><p>{setup.message}</p><button autoFocus className={`${utility} mx-auto mt-5 w-auto px-6 text-base`} onClick={() => setup.setMessage('')}>Đã hiểu</button></dialog>
  </div>
}
