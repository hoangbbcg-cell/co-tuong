import { useEffect, useState } from 'react'
import { getAppViewportSize } from '../../../lib/desktopCanvas'

function measure() {
  const viewport = getAppViewportSize()
  const compact = viewport.compact
  const baseWidth = compact ? 480 : 1100
  const baseHeight = compact ? 850 : 720
  const availableWidth = compact ? viewport.width - 12 : viewport.width - 240
  const availableHeight = compact ? viewport.height - 12 : viewport.height
  const scale = compact ? 1 : Math.min(availableWidth / baseWidth, availableHeight / baseHeight)
  // Expand the logical frame after fitting content so its outside margins stay exact.
  return { width: availableWidth / scale, height: availableHeight / scale, scale, compact }
}

export function useHomeLayout() {
  const [layout, setLayout] = useState(measure)
  useEffect(() => {
    const resize = () => setLayout(measure())
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])
  return layout
}
