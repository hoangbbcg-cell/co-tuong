import { useCallback, useState, type RefObject } from 'react'
import { toBlob } from 'html-to-image'
import { downloadScreenshotBlob } from '../../../lib/downloadScreenshot'

const EXCLUDED_CAPTURE_SELECTOR = '[data-screenshot-exclude="true"], [role="status"], [role="alert"]'

export function useScreenshotRenderer(captureRoot: RefObject<HTMLElement | null>) {
  const [notice, setNotice] = useState('')

  const camera = useCallback(async () => {
    const clickedAt = performance.now()
    const root = captureRoot.current
    if (!root) {
      setNotice('Không tìm thấy vùng game để chụp ảnh.')
      return
    }

    try {
      const renderStartedAt = performance.now()
      const blob = await toBlob(root, {
        pixelRatio: 1,
        cacheBust: false,
        filter: node => !(node instanceof Element) || node.closest(EXCLUDED_CAPTURE_SELECTOR) === null,
      })
      if (!blob) throw new Error('Không thể tạo file PNG từ màn hình game.')

      const renderDuration = performance.now() - renderStartedAt
      performance.measure('game-screenshot-render', { start: renderStartedAt, duration: renderDuration })
      downloadScreenshotBlob(blob)

      const clickToDownload = performance.now() - clickedAt
      performance.measure('game-screenshot-click-to-download', { start: clickedAt, duration: clickToDownload })
      console.info(`[Chụp hình] Tạo PNG: ${renderDuration.toFixed(1)} ms`)
      console.info(`[Chụp hình] Click đến khi bắt đầu tải: ${clickToDownload.toFixed(1)} ms`)
      setNotice('')
    } catch (error) {
      console.error('[Chụp hình] Không thể chụp vùng game hiện tại:', error)
      setNotice('Không thể chụp màn hình game. Kiểm tra ảnh hoặc font bị lỗi CORS rồi thử lại.')
    }
  }, [captureRoot])

  return { camera, notice }
}
