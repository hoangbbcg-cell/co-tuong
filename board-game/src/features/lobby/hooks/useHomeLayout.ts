import { useEffect, useState } from 'react'

function measure() {
  const compact = window.innerWidth <= 800
  const baseWidth = compact ? 480 : 1100
  const baseHeight = compact ? 850 : 720
  const availableWidth = compact ? window.innerWidth - 12 : window.innerWidth - 240
  const availableHeight = window.innerHeight - 12
  const scale = Math.min(availableWidth / baseWidth, availableHeight / baseHeight)
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
