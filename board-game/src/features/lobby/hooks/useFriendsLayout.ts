import { useEffect, useState } from 'react'
import { mobileDialogHeight, mobileDialogMargin } from '../../../lib/mobileDialogHeight'

const width = 1120
const height = 750

function measure() {
  const viewport = window.visualViewport
  const availableWidth = viewport?.width ?? window.innerWidth
  const availableHeight = viewport?.height ?? window.innerHeight
  // Match the Ranking frame scale so reducing the height does not enlarge the dialog.
  const scale = Math.max(0.1, Math.min(0.85, (availableWidth - mobileDialogMargin(availableWidth, availableHeight)) / width, (availableHeight - 32) / 780))
  return { scale, height: mobileDialogHeight(height, scale, availableWidth, availableHeight) }
}

export function useFriendsLayout() {
  const [layout, setLayout] = useState(measure)
  useEffect(() => {
    const resize = () => setLayout(measure())
    window.addEventListener('resize', resize)
    window.visualViewport?.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      window.visualViewport?.removeEventListener('resize', resize)
    }
  }, [])
  return { width, ...layout }
}
