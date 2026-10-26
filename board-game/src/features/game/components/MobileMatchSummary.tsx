import type { Side } from '../../../types/game'
import { formatClock } from '../../../lib/format'
import roomCodeFrame from '../../../assets/room-code/room-code-frame.png'

export function MobileMatchSummary({ code, leftSide, remaining, activeSide, showClock, clockOnly = false }: { code?: string; leftSide: Side; remaining: Record<Side, number>; activeSide?: Side; showClock: boolean; clockOnly?: boolean }) {
  const rightSide: Side = leftSide === 'red' ? 'black' : 'red'
  return <div data-mobile-room-code className="pointer-events-none absolute left-1/2 top-[4px] z-[85] flex w-[144px] -translate-x-1/2 flex-col items-center gap-[5px] desktop:hidden" aria-label="Mã phòng và thời gian">
    {!clockOnly && (code ? <div className="relative top-[6px] h-[70px] w-[144px]"><img src={roomCodeFrame} alt="" className="absolute inset-0 size-full object-fill"/><span className="absolute inset-x-[20%] bottom-[22%] top-[44%] grid place-items-center font-number text-[17px] font-bold text-[#f6d696]">{code}</span></div> : <div className="grid h-[42px] place-items-center font-heading text-[14px] text-[#ffe5a6]">Bàn cờ</div>)}
    {showClock && <div style={{ top: 'var(--mobile-clock-top,calc(99px + clamp(84px,26vw,108px) * 38 / 180))' }} className="absolute left-1/2 grid -translate-x-1/2 grid-cols-[70px_16px_70px] items-center gap-[4px]">
      {[leftSide, rightSide].map((side, index) => <output key={side} aria-label={`Thời gian quân ${side === 'red' ? 'đỏ' : 'đen'}`} style={{ gridColumn: index === 0 ? 1 : 3, gridRow: 1 }} className={`flex h-[24px] w-[70px] items-center justify-center rounded border px-[4px] font-number text-[14px] leading-none tabular-nums ${activeSide === side ? 'border-[#e8c479] bg-[#244b40] text-[#ffe69b]' : 'border-[#b99a61] bg-[#392719] text-[#e8c479]'}`}>{formatClock(remaining[side])}</output>)}
      <svg aria-hidden="true" viewBox="0 0 24 28" className="col-start-2 row-start-1 h-[22px] w-[16px] text-[#f6d696]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2h16M4 26h16M6 2v5c0 3 3 5 6 7-3 2-6 4-6 7v5M18 2v5c0 3-3 5-6 7 3 2 6 4 6 7v5"/><path d="m8 7 4 4 4-4M8 23l4-4 4 4" fill="currentColor" strokeWidth="1"/></svg>
    </div>}
  </div>
}
