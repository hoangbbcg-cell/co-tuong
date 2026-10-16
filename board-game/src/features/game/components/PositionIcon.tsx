export function PositionIcon({ name }: { name: 'trash' | 'restore' | 'save' | 'save-position' | 'image' }) {
  const shapes = {
    'save-position': <><path d="m19 2 11 11-3 3-3-1-6 6 1 4-3 3L4 16l3-3 4 1 6-6-1-3Z" /><path d="m11 21-9 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    trash: <><path d="M9 7V4h14v3h5v3H4V7Zm-3 5h20l-2 17H8Z" /><path d="M12 15v10m4-10v10m4-10v10" stroke="#63410e" strokeWidth="2" /></>,
    restore: <path d="m4 5 1 11 11-1-4-4a9 9 0 1 1-4 10l-5 1A14 14 0 1 0 8 7Z" />,
    save: <><path fillRule="evenodd" d="M6 3h18l4 4v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm4 0v10h12V3ZM9 19v6h14v-6Z" /><path d="M17 4h3v6h-3Z" /></>,
    image: <><path fillRule="evenodd" d="M5 3h22a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm0 3v20h22V6Z" /><circle cx="11" cy="11" r="3" /><path d="m5 25 7-9 5 5 5-8 5 12Z" /></>,
  }
  return <svg className="size-8 [filter:drop-shadow(1px_2px_1px_#392300)]" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">{shapes[name]}</svg>
}
