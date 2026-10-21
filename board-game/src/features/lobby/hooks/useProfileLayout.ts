import { useEffect, useState } from 'react'
import { mobileDialogHeight, mobileDialogMargin } from '../../../lib/mobileDialogHeight'

const width = 740
const height = 850
const avatarWidth = 980
const avatarHeight = 780

function measure() {
  const viewport = window.visualViewport
  const availableWidth = viewport?.width ?? window.innerWidth
  const availableHeight = viewport?.height ?? window.innerHeight
  const getScale = (contentWidth: number, contentHeight: number, margin = 32) => Math.max(0.1, Math.min(0.85, (availableWidth - margin) / contentWidth, (availableHeight - 32) / contentHeight))
  const profile = getScale(width, height, mobileDialogMargin(availableWidth, availableHeight))
  const compactAvatar = availableWidth <= 800
  const customizationWidth = compactAvatar ? width : avatarWidth
  const customizationHeight = compactAvatar ? height : avatarHeight
  const customizationScale = getScale(customizationWidth, customizationHeight, compactAvatar ? mobileDialogMargin(availableWidth, availableHeight) : 32)
  return {
    profile,
    profileHeight: mobileDialogHeight(height, profile, availableWidth, availableHeight),
    avatar: customizationScale,
    customizationWidth,
    customizationHeight: mobileDialogHeight(customizationHeight, customizationScale, availableWidth, availableHeight),
  }
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
  return {
    width,
    height: scales.profileHeight,
    scale: scales.profile,
    avatarWidth: scales.customizationWidth,
    avatarHeight: scales.customizationHeight,
    avatarScale: scales.avatar,
  }
}
