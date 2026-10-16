import { useLayoutEffect, useRef, useState } from 'react'

// Fit the complete setup artwork within the space left below the header.
export function useComputerLayout() {
  const areaRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  useLayoutEffect(() => {
    const area = areaRef.current
    if (!area) return
    const measure = () => {
      setScale(Math.max(0, Math.min(1, (area.clientWidth - 24) / 1268, (area.clientHeight - 48) / 878)))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(area)
    window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  return { areaRef, scale }
}
