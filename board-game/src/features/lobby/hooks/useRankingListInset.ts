import { useLayoutEffect, useRef, useState } from 'react'

/** Match the header width to the rows, including native scrollbar and list padding. */
export function useRankingListInset(compact: boolean) {
  const listRef = useRef<HTMLOListElement>(null)
  const [inset, setInset] = useState(0)
  useLayoutEffect(() => {
    const list = listRef.current
    if (!compact || !list) return
    const measure = () => {
      const padding = parseFloat(getComputedStyle(list).paddingRight) || 0
      setInset(list.offsetWidth - list.clientWidth + padding)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [compact])
  return { listRef, inset: compact ? inset : 0 }
}
