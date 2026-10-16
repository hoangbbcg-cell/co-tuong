import frame from '../../../assets/friends/friend-action-button-frame.png'
import { buttonInteraction } from '../../../lib/uiClasses'

export function RankingViewButton({ name, scale, onView }: { name: string; scale: number; onView: (name: string) => void }) {
  return <button type="button" aria-label={`Vào xem ${name}`} onClick={() => onView(name)} className={`${buttonInteraction} relative m-0 block h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-[0] shadow-none hover:brightness-110`}>
    <img src={frame} alt="" className="m-0 block h-auto max-w-none border-0 p-0" style={{ width: Math.round(173 * scale) }}/>
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-['Times_New_Roman'] font-bold italic leading-none text-[#2b1909]" style={{ fontSize: Math.round(24 * scale), gap: Math.round(9 * scale), textShadow: '0 1px 0 #f7d388' }}>Vào xem <svg aria-hidden="true" viewBox="0 0 12 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: Math.round(12 * scale), height: Math.round(17 * scale) }}><path d="m3 3 5 5-5 5"/></svg></span>
  </button>
}
