import { CrispUiImage } from '../../../lib/CrispUiImage'
import titleFrame from '../../../assets/profile/honors/honors-title-info-frame.png'

/** Same gold borders, brown surface and corner ornaments as the profile panel. */
export function HonorsDialogShell() {
  return <>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[var(--ui-p-22,22px)] border-[length:var(--ui-p-5,5px)] border-[#5e3014] bg-[linear-gradient(135deg,#7a431c,#2d160a)] p-4 shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]">
      <div className="relative size-full overflow-hidden rounded-xl border-[length:var(--ui-p-3,3px)] border-[#d39a42] bg-[radial-gradient(ellipse_at_50%_20%,#b87a3344,transparent_43%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] shadow-[0_0_0_2px_#48220e,inset_0_0_18px_#160904]"></div>
      {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[var(--ui-p-76,76px)] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}
    </div>
    <header className="pointer-events-none absolute -top-[var(--ui-p-18,18px)] compact:-top-[calc(var(--ui-p-18,18px)+var(--ui-p-12,12px))] left-1/2 z-30 w-[68%] -translate-x-1/2 [container-type:inline-size]">
      <CrispUiImage src={titleFrame} alt="" className="pointer-events-none relative left-1/2 block h-[calc(var(--ui-p-86,86px)*1.02)] w-[calc(var(--ui-p-86,86px)*0.94*2074/358-6px)] max-w-none -translate-x-1/2 -translate-y-[2px] object-fill" />
      <h2 id="honors-frame-title" className="sr-only">Danh hiệu</h2>
    </header>
  </>
}
