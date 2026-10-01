import { useEffect, useState } from 'react'

const width = 1120
const height = 750

function measure() {
  const viewport = window.visualViewport
  const availableWidth = viewport?.width ?? window.innerWidth
  const availableHeight = viewport?.height ?? window.innerHeight
  // Keep the existing scale so shortening the frame does not enlarge its width.
  return Math.max(0.1, Math.min(0.85, (availableWidth - 32) / width, (availableHeight - 32) / 780))
}

export function useRankingLayout() {
  const [scale, setScale] = useState(measure)
  useEffect(() => {
    const resize = () => setScale(measure())
    window.addEventListener('resize', resize)
    window.visualViewport?.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      window.visualViewport?.removeEventListener('resize', resize)
    }
  }, [])
  return { width, height, scale }
}
