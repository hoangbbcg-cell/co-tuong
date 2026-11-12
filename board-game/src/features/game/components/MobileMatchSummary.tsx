import { IncrementBadge } from './IncrementBadge'
import type { Side } from '../../../types/game'
import { formatClock } from '../../../lib/format'
import roomCodeFrame from '../../../assets/room-code/room-code-frame.png'

export function MobileMatchSummary({ code, leftSide, remaining, activeSide, showClock, showFallbackLabel = true, clockOnly = false, incrementSeconds = 0 }: { code?: string; leftSide: Side; remaining: Record<Side, number>; activeSide?: Side; showClock: boolean; showFallbackLabel?: boolean; clockOnly?: boolean; incrementSeconds?: number }) {
  const rightSide: Side = leftSide === 'red' ? 'black' : 'red'
  return <div data-mobile-room-code className="pointer-events-none absolute left-1/2 top-[4px] z-[85] flex w-[144px] -translate-x-1/2 flex-col items-center gap-[5px] desktop:hidden" aria-label="Mã phòng và thời gian">
    {!clockOnly && (code ? <div data-mobile-room-code-frame className="relative top-[6px] h-[70px] w-[144px]"><img src={roomCodeFrame} alt="" className="absolute inset-0 size-full object-fill"/><span className="absolute inset-x-[20%] bottom-[22%] top-[44%] grid place-items-center font-number text-[17px] font-bold text-[#f6d696]">{code}</span></div> : showFallbackLabel ? <div className="grid h-[42px] place-items-center font-heading text-[14px] text-[#ffe5a6]">Bàn cờ</div> : undefined)}
    {showClock && <div style={{ top: clockOnly ? 'var(--mobile-clock-top,calc(99px + clamp(84px,26vw,108px) * 38 / 180))' : code || showFallbackLabel ? '82px' : '6px' }} className="absolute left-1/2 grid -translate-x-1/2 grid-cols-[64px_28px_64px] items-center gap-[4px]">
      {[leftSide, rightSide].map((side, index) => <output key={side} aria-label={`Thời gian quân ${side === 'red' ? 'đỏ' : 'đen'}`} style={{ gridColumn: index === 0 ? 1 : 3, gridRow: 1 }} className={`flex h-[24px] w-[64px] items-center justify-center rounded border px-[4px] font-number text-[14px] leading-none tabular-nums ${activeSide === side ? 'border-[#e8c479] bg-[#244b40] text-[#ffe69b]' : 'border-[#b99a61] bg-[#392719] text-[#e8c479]'}`}>{formatClock(remaining[side])}</output>)}
      <IncrementBadge seconds={incrementSeconds} className="col-start-2 row-start-1 justify-self-center" />
    </div>}
  </div>
}
