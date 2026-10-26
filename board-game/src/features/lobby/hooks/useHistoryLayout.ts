import { useEffect, useState } from 'react'
import { mobileDialogHeight, mobileDialogMargin } from '../../../lib/mobileDialogHeight'

const width = 1120
const height = 750

function measure() {
  const viewport = window.visualViewport
  const availableWidth = viewport?.width ?? window.innerWidth
  const availableHeight = viewport?.height ?? window.innerHeight
  const scale = Math.max(0.1, Math.min(0.85, (availableWidth - mobileDialogMargin(availableWidth, availableHeight)) / width, (availableHeight - 32) / 780))
  return { scale, height: mobileDialogHeight(height, scale, availableWidth, availableHeight), compact: availableWidth <= 800 }
}

export function useHistoryLayout(): { width: number; scale: number; height: number; compact?: boolean } {
  const [layout, setLayout] = useState(measure)
  useEffect(() => {
    let shiftedDialog: HTMLDialogElement | null = null
    const resize = () => {
      const input = document.activeElement
      if (window.innerWidth <= 800 && input instanceof HTMLElement && input.matches('[data-history-input]')) {
        // Keyboard resize must not scale down the dialog, rows, or their contents.
          input.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' })
          const dialog = input.closest('dialog')
          const viewport = window.visualViewport
          if (dialog && viewport) {
            dialog.style.translate = ''
            const bottom = viewport.offsetTop + viewport.height - 16
            const overlap = Math.max(0, input.getBoundingClientRect().bottom - bottom)
            dialog.style.translate = `0 -${overlap}px`
            shiftedDialog = dialog
          }
        return
      }
      if (shiftedDialog) shiftedDialog.style.translate = ''
      setLayout(measure())
    }
    document.addEventListener('focusin', resize)
    window.addEventListener('resize', resize)
    window.visualViewport?.addEventListener('resize', resize)
    return () => {
      if (shiftedDialog) shiftedDialog.style.translate = ''
      document.removeEventListener('focusin', resize)
      window.removeEventListener('resize', resize)
      window.visualViewport?.removeEventListener('resize', resize)
    }
  }, [])
  return { width, ...layout }
}
