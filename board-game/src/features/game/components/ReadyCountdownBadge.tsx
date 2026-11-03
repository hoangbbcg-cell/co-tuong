/** Shared number-only countdown on the board and result presentation. */
export function ReadyCountdownBadge({ seconds, scale = 1, result = false }: { seconds: number; scale?: number; result?: boolean }) {
  return <output aria-label={result ? 'Đếm ngược ván tiếp theo' : 'Đếm ngược bắt đầu ván'} className="pointer-events-none inline-block bg-transparent p-0 font-number font-bold leading-none tabular-nums text-[#ffe29a] [text-shadow:0_3px_0_#3a1608,0_0_12px_#ff9d35]" style={{ fontSize: Math.max(34, 78 * scale) }}>{seconds}</output>
}