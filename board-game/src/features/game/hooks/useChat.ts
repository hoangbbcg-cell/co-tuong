import { showRoomNotice } from '../../../lib/roomNotice'
import { useEffect, useRef, useState } from 'react'
import { useSessionStore } from '../../../store/sessionStore'
import { roomSocket } from '../../../services/socket'
import { errorMessage } from '../../../services/api'

export function useChat(enabled = true) {
  const mode = useSessionStore(s => s.mode)
  const room = useSessionStore(s => s.room)
  const localMessages = useSessionStore(s => s.messages)
  const name = useSessionStore(s => s.name)
  const [input, setInput] = useState('')
  const [picker, setPicker] = useState<'emoji' | 'quick' | null>(null)
  const [collapsed, setCollapsed] = useState(() => window.matchMedia('(max-width: 800px)').matches)
  const [sending, setSending] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messages = mode === 'online' ? room?.messages ?? [] : localMessages
  useEffect(() => {
    if (!enabled) return
    const el = messagesRef.current
    if (!el) return
    const frame = window.requestAnimationFrame(() => {
      const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      el.scrollTo({ top: el.scrollHeight, behavior })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [enabled, messages, collapsed])
  useEffect(() => {
    if (!enabled) return
    const outside = (event: MouseEvent) => { if (!containerRef.current?.contains(event.target as Node)) setPicker(null) }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setPicker(null) }
    document.addEventListener('click', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('click', outside); document.removeEventListener('keydown', escape) }
  }, [enabled])
  const send = async (text = input) => {
    if (!enabled) return
    if (!text.trim() || text.length > 300 || sending) return
    setSending(true)
    try {
      if (mode === 'online') useSessionStore.getState().receiveRoom(await roomSocket.chat(text.trim()))
      else useSessionStore.getState().append(text)
      setInput(''); setPicker(null)
    } catch (error) { errorMessage(error) === 'Đã chặn chat' ? showRoomNotice('Đã chặn chat') : useSessionStore.getState().setNotice(errorMessage(error)) }
    finally { setSending(false) }
  }
  const emoji = (value: string) => {
    const start = inputRef.current?.selectionStart ?? input.length
    const end = inputRef.current?.selectionEnd ?? start
    const next = input.slice(0, start) + value + input.slice(end)
    if (next.length <= 300) {
      setInput(next)
      requestAnimationFrame(() => { inputRef.current?.setSelectionRange(start + value.length, start + value.length) })
    }
  }
  return { input, setInput, picker, collapsed, sending, messages, name, mode, containerRef, messagesRef, inputRef, send, emoji,
    closePicker: () => setPicker(null),
    togglePicker: (value: 'emoji' | 'quick') => setPicker(current => current === value ? null : value),
    toggle: () => { setCollapsed(current => !current); setPicker(null) } }
}
