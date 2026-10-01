import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export type OpeningMode = 'clip' | 'cover-transform'

export function useRoomEntrance(onComplete?: () => void, mode: OpeningMode = 'clip') {
  const [entering, setEntering] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const sceneRef = useRef<HTMLDivElement>(null)
  const finishEntrance = useCallback(() => setEntering(false), [])
  useLayoutEffect(() => {
    if (!entering) { onComplete?.(); return }
    if (mode === 'cover-transform') return
    const scene = sceneRef.current
    if (!scene) return
    const { width, height } = scene.getBoundingClientRect()
    const halfSize = Math.max(width, height) / 2
    const animation = scene.animate?.([
      { clipPath: 'inset(50% 50% 50% 50%)' },
      { clipPath: `inset(${height / 2 - halfSize}px ${width / 2 - halfSize}px)` },
    ], { duration: 600, easing: 'cubic-bezier(0.45, 0, 0.55, 1)', fill: 'both' })
    if (animation) animation.onfinish = finishEntrance
    const timer = animation ? undefined : window.setTimeout(finishEntrance, 600)
    return () => {
      window.clearTimeout(timer)
      if (animation) { animation.onfinish = null; animation.cancel() }
    }
  }, [entering, finishEntrance, mode, onComplete])
  return { entering, sceneRef, finishEntrance }
}
