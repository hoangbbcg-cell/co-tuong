import { useCallback, useEffect, useRef, useState } from 'react'
import type { DOMAttributes } from 'react'

/** Reveal an action without turning a scroll or the release click into a row action. */
export function usePressToRevealDelete(enabled: boolean, scope: string) {
  const [revealedId, setRevealedId] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const origin = useRef<{ x: number; y: number; pointerId: number } | null>(null)
  const held = useRef(false)
  const cancelTimer = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current)
    timer.current = null
    origin.current = null
  }, [])
  const clear = useCallback(() => {
    cancelTimer()
    held.current = false
    setRevealedId(null)
  }, [cancelTimer])

  useEffect(() => {
    clear()
    return cancelTimer
  }, [enabled, scope, clear, cancelTimer])

  useEffect(() => {
    document.addEventListener('close', clear, true)
    return () => document.removeEventListener('close', clear, true)
  }, [clear])

  function handlersFor(id: string): DOMAttributes<HTMLLIElement> {
    if (!enabled) return {}
    return {
      onPointerDown(event) {
        if (!event.isPrimary || event.button !== 0) return
        if (event.target instanceof Element && event.target.closest('input,textarea,select,[data-history-delete],[data-history-edit]')) {
          held.current = false
          return
        }
        clear()
        origin.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId }
        timer.current = setTimeout(() => {
          timer.current = null
          held.current = true
          setRevealedId(id)
        }, 500)
      },
      onPointerMove(event) {
        const start = origin.current
        if (start && (start.pointerId !== event.pointerId || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8)) clear()
      },
      onPointerUp: cancelTimer,
      onPointerCancel: cancelTimer,
      onPointerLeave: cancelTimer,
      onClickCapture(event) {
        if (!held.current) return
        held.current = false
        event.preventDefault()
        event.stopPropagation()
      },
      onContextMenu(event) {
        event.preventDefault()
        cancelTimer()
        setRevealedId(id)
      },
    }
  }

  return { revealedId, handlersFor, clear }
}
