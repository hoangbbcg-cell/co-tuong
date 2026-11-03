import { useEffect, useRef } from 'react'

/** Own the touch gesture so browser image menus/panning cannot cancel the hold. */
export function useAvatarTouchHold<T extends HTMLElement = HTMLButtonElement>(identity: string, onHold?: () => void, preventPan = true) {
  const ref = useRef<T>(null)
  const callback = useRef(onHold)
  callback.current = onHold
  const held = useRef(false)
  useEffect(() => {
    const button = ref.current
    if (!button) return
    let timer: ReturnType<typeof setTimeout> | undefined
    let origin: { x: number; y: number } | null = null
    let moved = false
    const cancel = () => { clearTimeout(timer); timer = undefined }
    const start = (event: TouchEvent) => {
      cancel()
      origin = null
      if (!callback.current || (button instanceof HTMLButtonElement && button.disabled) || event.touches.length !== 1) return
      if (preventPan && event.cancelable) event.preventDefault()
      const touch = event.touches[0]
      origin = { x: touch.clientX, y: touch.clientY }
      moved = false
      held.current = false
      timer = setTimeout(() => { held.current = true; callback.current?.() }, 550)
    }
    const move = (event: TouchEvent) => {
      if (!origin) return
      if (preventPan && event.cancelable) event.preventDefault()
      const touch = event.touches[0]
      if (event.touches.length !== 1 || !touch || Math.hypot(touch.clientX - origin.x, touch.clientY - origin.y) > 10) { moved = true; cancel() }
    }
    const end = (event: TouchEvent) => {
      if (!origin) return
      if (preventPan && event.cancelable) event.preventDefault()
      cancel()
      origin = null
      if (held.current && event.cancelable) event.preventDefault()
      if (preventPan && !moved && !held.current) button.click()
    }
    const abort = () => { cancel(); origin = null }
    const contextMenu = (event: Event) => {
      if (preventPan || !origin || moved || held.current) return
      event.preventDefault()
      cancel()
      held.current = true
      callback.current?.()
    }
    button.addEventListener('touchstart', start, { passive: false })
    button.addEventListener('touchmove', move, { passive: false })
    button.addEventListener('touchend', end, { passive: false })
    button.addEventListener('touchcancel', abort)
    button.addEventListener('contextmenu', contextMenu)
    return () => {
      abort(); held.current = false
      button.removeEventListener('touchstart', start)
      button.removeEventListener('touchmove', move)
      button.removeEventListener('touchend', end)
      button.removeEventListener('touchcancel', abort)
      button.removeEventListener('contextmenu', contextMenu)
    }
  }, [identity, preventPan])
  return { ref, consumeHeldClick: () => { const value = held.current; held.current = false; return value } }
}
