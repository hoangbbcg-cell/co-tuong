import { useLayoutEffect, useRef, useState } from 'react'

// Fit the complete setup artwork within the space left below the header.
export function useComputerLayout() {
  const areaRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLButtonElement>(null)
  const [bannerGap, setBannerGap] = useState(20)
  const [footerTop, setFooterTop] = useState(0)
  const [scale, setScale] = useState(0)
  useLayoutEffect(() => {
    const area = areaRef.current
    if (!area) return
    const measure = () => {
      setScale(Math.max(0, Math.min(.85, (area.clientWidth - 24) / 1148, (area.clientHeight - 36) / 810)))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(area)
    window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  useLayoutEffect(() => {
    const area = areaRef.current
    const actions = actionsRef.current
    const banner = bannerRef.current
    if (!area || !actions || !banner || scale <= 0) return
    const measure = () => {
      const actionsBottom = actions.getBoundingClientRect().bottom - area.getBoundingClientRect().top
      const bannerHeight = banner.getBoundingClientRect().height
      const gap = 45 * scale
      setBannerGap(45)
      setFooterTop(actionsBottom + gap + bannerHeight)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(banner)
    observer.observe(actions)
    observer.observe(area)
    return () => observer.disconnect()
  }, [scale])
  return { areaRef, actionsRef, bannerRef, bannerGap, footerTop, scale }
}
