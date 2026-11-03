import { useEffect, useRef, useState } from 'react'
import { mobileDialogHeight, mobileDialogMargin } from '../../../lib/mobileDialogHeight'
import { getAppViewportSize } from '../../../lib/desktopCanvas'

const width = 740
const height = 850
const avatarWidth = 980
const avatarHeight = 780

function measure() {
  // Keep the profile frame tied to the layout viewport. The visual viewport
  // shrinks when a mobile keyboard opens, which used to resize/jump this dialog.
  const viewport = getAppViewportSize()
  const availableWidth = viewport.width
  const availableHeight = viewport.height
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
  const stableHeight = useRef(getAppViewportSize().height)
  useEffect(() => {
    const resize = () => {
      const nextHeight = getAppViewportSize().height
      const focusedInput = document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement
      if (focusedInput && nextHeight < stableHeight.current - 120) return
      stableHeight.current = nextHeight
      setScales(measure())
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
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
