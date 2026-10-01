import { useEffect, useRef, useState } from 'react'
import { useSessionStore } from '../../../store/sessionStore'
import { roomSocket } from '../../../services/socket'
import { errorMessage } from '../../../services/api'

export function useChat() {
  const session = useSessionStore()
  const [input, setInput] = useState('')
  const [picker, setPicker] = useState<'emoji' | 'quick' | null>(null)
  const [collapsed, setCollapsed] = useState(() => window.matchMedia('(max-width: 800px)').matches)
  const [sending, setSending] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messages = session.mode === 'online' ? session.room?.messages ?? [] : session.messages
  useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    const frame = window.requestAnimationFrame(() => {
      const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      el.scrollTo({ top: el.scrollHeight, behavior })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [messages, collapsed])
  useEffect(() => {
    const outside = (event: MouseEvent) => { if (!containerRef.current?.contains(event.target as Node)) setPicker(null) }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setPicker(null) }
    document.addEventListener('click', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('click', outside); document.removeEventListener('keydown', escape) }
  }, [])
  const send = async (text = input) => {
    if (!text.trim() || text.length > 300 || sending) return
    setSending(true)
    try {
      if (session.mode === 'online') session.receiveRoom(await roomSocket.chat(text.trim()))
      else session.append(text)
      setInput(''); setPicker(null)
    } catch (error) { session.setNotice(errorMessage(error)) }
    finally { setSending(false); inputRef.current?.focus() }
  }
  const emoji = (value: string) => {
    const start = inputRef.current?.selectionStart ?? input.length
    const end = inputRef.current?.selectionEnd ?? start
    const next = input.slice(0, start) + value + input.slice(end)
    if (next.length <= 300) {
      setInput(next)
      requestAnimationFrame(() => { inputRef.current?.focus(); inputRef.current?.setSelectionRange(start + value.length, start + value.length) })
    }
    setPicker(null)
  }
  return { input, setInput, picker, collapsed, sending, messages, name: session.name, mode: session.mode, containerRef, messagesRef, inputRef, send, emoji,
    togglePicker: (value: 'emoji' | 'quick') => setPicker(current => current === value ? null : value),
    toggle: () => { setCollapsed(current => !current); setPicker(null) } }
}
