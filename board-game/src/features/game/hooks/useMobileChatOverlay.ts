import { useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, RefObject } from 'react'

/** Preserve the composer height while the keyboard changes the visual viewport. */
export function useMobileChatOverlay(open: boolean, boardHeight: number, _container?: RefObject<HTMLElement | null>, _input?: RefObject<HTMLInputElement | null>, _onClose?: () => void) {
  const boardHeightRef = useRef(boardHeight)
  boardHeightRef.current = boardHeight
  const [style, setStyle] = useState<CSSProperties>({})
  useLayoutEffect(() => {
    if (!open || !window.matchMedia('(max-width: 800px)').matches) return
    const viewport = window.visualViewport
    let baseWidth = window.innerWidth
    let panelHeight = window.innerHeight / 2 - boardHeightRef.current * 0.05
    const measure = () => {
      if (baseWidth !== window.innerWidth) {
        baseWidth = window.innerWidth
        panelHeight = window.innerHeight / 2 - boardHeightRef.current * 0.05
      }
      const visibleHeight = viewport?.height ?? window.innerHeight
      const bottom = Math.max(0, window.innerHeight - visibleHeight - (viewport?.offsetTop ?? 0))
      setStyle({ '--mobile-chat-bottom': bottom + 'px', '--mobile-chat-height': Math.max(0, Math.min(panelHeight, visibleHeight - 16)) + 'px' } as CSSProperties)
    }
    measure()
    viewport?.addEventListener('resize', measure)
    viewport?.addEventListener('scroll', measure)
    window.addEventListener('resize', measure)
    return () => {
      viewport?.removeEventListener('resize', measure)
      viewport?.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [open])
  return style
}
