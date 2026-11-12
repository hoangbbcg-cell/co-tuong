import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ROOM_INCREMENT_SECONDS } from '../../../types/room'
import { playConfirmationActionSound, playCustomizationTabActionSound } from '../../../lib/uiActionSound'

const label = (value: number) => value === 0 ? 'Không' : `${value} giây`

/** Desktop menu opens below the field, outside the lobby's clipping container. */
export function IncrementSelect({ value, disabled, className, onChange }: { value: number; disabled: boolean; className: string; onChange: (value: number) => void }) {
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ left: number; top: number; width: number; fontSize: number; maxHeight: number } | null>(null)
  const [active, setActive] = useState(value)
  const close = () => setPosition(null)
  const open = () => {
    const element = trigger.current!
    const rect = element.getBoundingClientRect()
    setActive(value)
    const scale = element.offsetWidth ? rect.width / element.offsetWidth : 1
    setPosition({ left: rect.left, top: rect.bottom + 1, width: rect.width, fontSize: parseFloat(getComputedStyle(element).fontSize) * scale, maxHeight: Math.max(40, Math.min(220, window.innerHeight - rect.bottom - 13)) })
    playCustomizationTabActionSound()
  }
  useEffect(() => {
    if (!position) return
    const outside = (event: PointerEvent) => { if (!trigger.current?.contains(event.target as Node) && !menu.current?.contains(event.target as Node)) close() }
    const scroll = (event: Event) => { if (!menu.current?.contains(event.target as Node)) close() }
    document.addEventListener('pointerdown', outside)
    window.addEventListener('resize', close)
    document.addEventListener('scroll', scroll, true)
    return () => { document.removeEventListener('pointerdown', outside); window.removeEventListener('resize', close); document.removeEventListener('scroll', scroll, true) }
  }, [position])
  useEffect(() => { if (position) menu.current?.querySelector(`[data-value="${active}"]`)?.scrollIntoView?.({ block: 'nearest' }) }, [position, active])
  const choose = (next: number) => { onChange(next); playConfirmationActionSound(); close(); trigger.current?.focus() }
  return <>
    <button ref={trigger} type="button" id="create-room-increment-seconds" role="combobox" aria-labelledby="create-room-increment-label" aria-controls="create-room-increment-options" aria-expanded={!!position} aria-haspopup="listbox" aria-activedescendant={position ? `increment-option-${active}` : undefined} disabled={disabled} className={`${className} text-left`} onClick={() => position ? close() : open()} onBlur={event => { if (!menu.current?.contains(event.relatedTarget as Node)) close() }} onKeyDown={event => {
      if (event.key === 'Escape' || event.key === 'Tab') { close(); return }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
        event.preventDefault()
        if (!position) { open(); return }
        setActive(current => event.key === 'Home' ? 0 : event.key === 'End' ? 10 : Math.max(0, Math.min(10, current + (event.key === 'ArrowDown' ? 1 : -1))))
      } else if (position && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); choose(active) }
    }}>{label(value)}</button>
    {position && createPortal(<div ref={menu} id="create-room-increment-options" role="listbox" aria-labelledby="create-room-increment-label" style={{ ...position, position: 'fixed', zIndex: 2147483647, overflowY: 'auto', overscrollBehavior: 'contain', color: '#fff0ce', background: '#301b0c', border: '1px solid #999', borderRadius: 0, padding: 0, colorScheme: 'dark', fontFamily: '"Times New Roman", serif', lineHeight: 1.3 }} onPointerDown={event => event.preventDefault()}>
      {ROOM_INCREMENT_SECONDS.map(option => <div key={option} id={`increment-option-${option}`} role="option" aria-selected={value === option} data-value={option} onPointerMove={() => setActive(option)} onClick={() => choose(option)} style={{ cursor: 'pointer', padding: '2px 15% 2px 20%', textAlign: 'left', background: active === option ? '#1967d2' : undefined }}>{label(option)}</div>)}
    </div>, document.body)}
  </>
}
