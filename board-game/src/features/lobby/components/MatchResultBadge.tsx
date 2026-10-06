import resultSprite from '../../../assets/history/24f07314-e511-454e-9d58-2a50197a5a34.png'

// Crop each badge from the original transparent sprite; keep its aspect ratio in the existing slot.
const RESULT_ARTWORK_VIEWBOX = {
  Thắng: '126 177 935 361',
  Thua: '1115 191 936 353',
} as const

export function MatchResultBadge({ result }: { result: 'Thắng' | 'Thua' }) {
  const win = result === 'Thắng'
  return <span className={`relative m-0 grid h-[var(--ui-p-39,39px)] w-[var(--ui-p-82-77551,82.77551px)] shrink-0 place-items-center border-0 p-0 ${win ? '' : '-translate-x-[var(--ui-p-2,2px)] -translate-y-[var(--ui-p-2,2px)]'}`}>
    <svg role="img" aria-label={result} focusable="false" viewBox={RESULT_ARTWORK_VIEWBOX[result]} preserveAspectRatio="xMidYMid meet" className="pointer-events-none block size-full overflow-hidden">
      <image href={resultSprite} x="0" y="0" width="2172" height="724" />
    </svg>
  </span>
}
