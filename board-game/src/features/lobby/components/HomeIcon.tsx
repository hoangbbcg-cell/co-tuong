export type HomeIconName = 'history' | 'trophy' | 'crown' | 'ai-off' | 'friends' | 'messages' | 'video' | 'fullscreen' | 'sound' | 'muted' | 'settings' | 'shop' | 'music'
export function HomeIcon({ name }: { name: HomeIconName }) {
  return <svg viewBox="0 0 24 24" className={`${name === 'settings' ? 'size-[34px]' : name === 'messages' ? 'size-8' : 'size-7'} [filter:drop-shadow(0_2px_1px_#674006)]`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'music' && <path fill="currentColor" stroke="none" d="M9 4v12.2A4 3 0 1 0 11 19V8l8-2v8.2A4 3 0 1 0 21 17V1Z" />}
    {name === 'settings' && <path fill="currentColor" stroke="none" fillRule="evenodd" d="m10 1-.7 3.1-2 .9-3-1-2 3.5 2.3 2.1v2.8l-2.3 2.1 2 3.5 3-1 2 .9.7 3.1h4l.7-3.1 2-.9 3 1 2-3.5-2.3-2.1V9.6l2.3-2.1-2-3.5-3 1-2-.9L14 1Zm2 6.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />}
    {name === 'shop' && <g fill="currentColor" stroke="none"><path d="M4 2h16l2 5H2ZM2 8h4v1a2 2 0 0 1-4 0Zm5 0h4v1a2 2 0 0 1-4 0Zm6 0h4v1a2 2 0 0 1-4 0Zm5 0h4v1a2 2 0 0 1-4 0Z" /><path fillRule="evenodd" d="M3 12h18v10H3Zm6 2v8h6v-8Z" /></g>}
    {name === 'history' && <><path d="M3 10a9 9 0 1 1 1 7M3 4v6h6" /><path d="M12 7v5l4 2" /></>}
    {name === 'video' && <><rect x="2" y="5" width="12" height="14" rx="2" fill="currentColor"/><path d="m17 9 5-3v12l-5-3Z" fill="currentColor"/></>}
    {name === 'trophy' && <><path d="M7 3h10v6a5 5 0 0 1-10 0Z" fill="currentColor" /><path d="M7 5H3v3a4 4 0 0 0 5 4m9-7h4v3a4 4 0 0 1-5 4M12 14v5m-5 2h10m-8-2h6" /></>}
    {name === 'crown' && <path d="m3 7 5 4 4-7 4 7 5-4-2 12H5L3 7Zm3 14h12" fill="currentColor" stroke="none" />}
    {name === 'ai-off' && <><path d="m3 18 4-12 4 12M4.5 14h5M15 6h6m-3 0v12m-3 0h6" /><path d="M3 3 21 21" stroke="#f87171" strokeWidth="2.8" /></>}
    {name === 'friends' && <><circle cx="9" cy="7" r="3" fill="currentColor" /><path d="M2 21v-3a7 7 0 0 1 14 0v3Z" fill="currentColor" /><path d="M17 4a3 3 0 0 1 0 6m2 4q4 1 3 7h-3" /></>}
    {name === 'messages' && <path fill="currentColor" stroke="none" fillRule="evenodd" clipRule="evenodd" d="M12 3.4C6.9 3.4 2.7 7.1 2.7 11.8c0 2.1.9 4 2.4 5.5v4.1l4-2.1c.9.3 1.9.4 2.9.4 5.1 0 9.3-3.7 9.3-8.3S17.1 3.4 12 3.4ZM8 10.5a1.2 1.2 0 1 0 0 2.4a1.2 1.2 0 1 0 0-2.4ZM12 10.5a1.2 1.2 0 1 0 0 2.4a1.2 1.2 0 1 0 0-2.4ZM16 10.5a1.2 1.2 0 1 0 0 2.4a1.2 1.2 0 1 0 0-2.4Z" />}
    {name === 'fullscreen' && <><path d="M3 9V3h6M15 3h6v6M21 15v6h-6M9 21H3v-6M3 3l6 6m12-6-6 6m6 12-6-6M3 21l6-6" /></>}
    {(name === 'sound' || name === 'muted') && <><path d="M3 9h4l5-5v16l-5-5H3Z" fill="currentColor" />{name === 'sound' ? <path d="M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /> : <path d="m16 9 6 6m0-6-6 6" />}</>}
  </svg>
}
