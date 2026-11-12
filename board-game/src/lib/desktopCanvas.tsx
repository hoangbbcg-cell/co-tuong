import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useState } from 'react'

export const DESKTOP_CANVAS_WIDTH = 1493
export const DESKTOP_CANVAS_HEIGHT = 731

export function getAppViewportSize() {
  const width = window.visualViewport?.width ?? window.innerWidth
  const height = window.visualViewport?.height ?? window.innerHeight
  return width <= 800 ? { width, height, compact: true } : { width: DESKTOP_CANVAS_WIDTH, height: DESKTOP_CANVAS_HEIGHT, compact: false }
}

function measureCanvas() {
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight
  const compact = viewportWidth <= 800
  return { compact, scale: viewportHeight / DESKTOP_CANVAS_HEIGHT }
}

export function getDesktopCanvasScale() {
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight
  if (viewportWidth <= 800) return 1
  return viewportHeight / DESKTOP_CANVAS_HEIGHT
}

export function DesktopCanvas({ children }: { children: ReactNode }) {
  const [canvas, setCanvas] = useState(measureCanvas)
  useEffect(() => {
    const resize = () => setCanvas(measureCanvas())
    window.addEventListener('resize', resize)
    window.visualViewport?.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      window.visualViewport?.removeEventListener('resize', resize)
    }
  }, [])
  const viewportStyle = {
    position: 'fixed',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
  } as CSSProperties
  const canvasStyle = {
    width: DESKTOP_CANVAS_WIDTH,
    height: DESKTOP_CANVAS_HEIGHT,
    minWidth: DESKTOP_CANVAS_WIDTH,
    minHeight: DESKTOP_CANVAS_HEIGHT,
    transform: `scale(${canvas.scale})`,
    transformOrigin: 'center',
    overflow: 'visible',
    '--desktop-canvas-scale': canvas.scale,
  } as CSSProperties
  // Keep both wrapper nodes across the breakpoint. Adding/removing them remounts
  // Providers and every screen, losing local game/editor state during rotation.
  // Compact wrappers have no layout box or desktop IDs, preserving mobile CSS.
  return <div id={canvas.compact ? undefined : 'app-desktop-viewport'} style={canvas.compact ? { display: 'contents' } : viewportStyle}><div id={canvas.compact ? undefined : 'app-desktop-canvas'} style={canvas.compact ? { display: 'contents' } : canvasStyle}>{children}</div></div>
}
