export type HomeIconName = 'history' | 'trophy' | 'friends' | 'video' | 'fullscreen' | 'sound' | 'muted'
export function HomeIcon({ name }: { name: HomeIconName }) {
  return <svg viewBox="0 0 24 24" className="size-7 [filter:drop-shadow(0_2px_1px_#674006)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'history' && <><path d="M3 10a9 9 0 1 1 1 7M3 4v6h6" /><path d="M12 7v5l4 2" /></>}
    {name === 'video' && <><rect x="2" y="5" width="12" height="14" rx="2" fill="currentColor"/><path d="m17 9 5-3v12l-5-3Z" fill="currentColor"/></>}
    {name === 'trophy' && <><path d="M7 3h10v6a5 5 0 0 1-10 0Z" fill="currentColor" /><path d="M7 5H3v3a4 4 0 0 0 5 4m9-7h4v3a4 4 0 0 1-5 4M12 14v5m-5 2h10m-8-2h6" /></>}
    {name === 'friends' && <><circle cx="9" cy="7" r="3" fill="currentColor" /><path d="M2 21v-3a7 7 0 0 1 14 0v3Z" fill="currentColor" /><path d="M17 4a3 3 0 0 1 0 6m2 4q4 1 3 7h-3" /></>}
    {name === 'fullscreen' && <><path d="M3 9V3h6M15 3h6v6M21 15v6h-6M9 21H3v-6M3 3l6 6m12-6-6 6m6 12-6-6M3 21l6-6" /></>}
    {(name === 'sound' || name === 'muted') && <><path d="M3 9h4l5-5v16l-5-5H3Z" fill="currentColor" />{name === 'sound' ? <path d="M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /> : <path d="m16 9 6 6m0-6-6 6" />}</>}
  </svg>
}
