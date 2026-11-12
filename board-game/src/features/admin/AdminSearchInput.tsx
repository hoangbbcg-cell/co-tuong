import { useRef } from 'react'

export function AdminSearchInput({ label, value, onChange, onClear, placeholder, className = '' }: { label: string; value: string; onChange: (value: string) => void; onClear: () => void; placeholder: string; className?: string }) {
  const field = useRef<HTMLInputElement>(null)
  return <div className={`admin-search ${className}`}>
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
    <input ref={field} aria-label={label} placeholder={placeholder} value={value} onChange={event => onChange(event.target.value)} maxLength={100} />
    {value && <button type="button" aria-label={`Xóa ${label.toLowerCase()}`} title="Xóa tìm kiếm, về danh sách" onClick={() => { onClear(); field.current?.focus() }}>×</button>}
  </div>
}
