/** The room's per-move increment, shared by desktop and mobile clocks. */
export function IncrementBadge({ seconds = 0, className = '' }: { seconds?: number; className?: string }) {
  const label = `Thời gian tích lũy ${seconds} giây`
  return <span role="img" aria-label={label} title={label} data-increment-badge className={`inline-flex size-[26px] shrink-0 items-center justify-center rounded-full border border-[#f0bd80] bg-[#503a23] font-number text-[14px] leading-none tabular-nums text-[#f0bd80] ${className}`}>{seconds}s</span>
}
