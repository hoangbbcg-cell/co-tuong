import { useEffect, useState } from 'react'

const width = 740
const height = 850
const avatarWidth = 980
const avatarHeight = 780

function measure() {
  const viewport = window.visualViewport
  const availableWidth = viewport?.width ?? window.innerWidth
  const availableHeight = viewport?.height ?? window.innerHeight
  const getScale = (contentWidth: number, contentHeight: number) => Math.max(0.1, Math.min(0.85, (availableWidth - 32) / contentWidth, (availableHeight - 32) / contentHeight))
  return { profile: getScale(width, height), avatar: getScale(avatarWidth, avatarHeight) }
}

export function useProfileLayout() {
  const [scales, setScales] = useState(measure)
  useEffect(() => {
    const resize = () => setScales(measure())
    window.addEventListener('resize', resize)
    window.visualViewport?.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      window.visualViewport?.removeEventListener('resize', resize)
    }
  }, [])
  return { width, height, scale: scales.profile, avatarWidth, avatarHeight, avatarScale: scales.avatar }
}
