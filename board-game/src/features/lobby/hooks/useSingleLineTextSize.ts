import { useLayoutEffect, useRef, useState } from 'react'

export function useSingleLineTextSize(text: string, maximumSize: number) {
  const ref = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState(maximumSize)
  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    let disposed = false
    const measure = () => {
      if (disposed || node.clientWidth <= 0) return
      const range = document.createRange()
      range.selectNodeContents(node)
      const textWidth = range.getBoundingClientRect().width
      const currentSize = parseFloat(getComputedStyle(node).fontSize)
      if (textWidth <= 0 || currentSize <= 0) return
      const fitted = Math.min(maximumSize, currentSize * Math.max(1, node.clientWidth - 1) / textWidth)
      setFontSize(previous => Math.abs(previous - fitted) < 0.1 ? previous : fitted)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    void document.fonts.ready.then(measure)
    document.fonts.addEventListener('loadingdone', measure)
    return () => {
      disposed = true
      observer.disconnect()
      document.fonts.removeEventListener('loadingdone', measure)
    }
  }, [text, maximumSize])
  return { ref, fontSize }
}
