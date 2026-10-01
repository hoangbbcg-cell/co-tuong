import { useLayoutEffect, useRef, useState } from 'react'

export function useBoardLayout() {
  const arenaRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(588)
  const [backgroundMask, setBackgroundMask] = useState<string>()
  useLayoutEffect(() => {
    const arena = arenaRef.current
    if (!arena) return
    const fit = () => {
      const compact = window.matchMedia('(max-width: 800px)').matches
      const availableHeight = arena.clientHeight - (compact ? 130 : 0) - 4
      const availableWidth = compact ? arena.clientWidth : arena.clientWidth - 340
      setWidth(Math.max(0, Math.min(availableWidth, availableHeight * 1134 / 1296)))
    }
    const observer = new ResizeObserver(fit)
    observer.observe(arena)
    window.addEventListener('resize', fit)
    fit()
    return () => { observer.disconnect(); window.removeEventListener('resize', fit) }
  }, [])
  useLayoutEffect(() => {
    const arena = arenaRef.current
    const scene = arena?.parentElement
    const board = arena?.querySelector('#board')
    if (!arena || !scene || !board) return
    const measure = () => {
      const outer = scene.getBoundingClientRect()
      const inner = board.getBoundingClientRect()
      const left = Math.max(0, inner.left - outer.left)
      const right = Math.max(left, inner.right - outer.left)
      const top = Math.max(0, inner.top - outer.top)
      const bottom = Math.max(top, inner.bottom - outer.top)
      setBackgroundMask(`linear-gradient(to right, black 0px, transparent ${left}px, transparent ${right}px, black 100%), linear-gradient(to bottom, black 0px, transparent ${top}px, transparent ${bottom}px, black 100%)`)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(scene)
    observer.observe(arena)
    observer.observe(board)
    return () => observer.disconnect()
  }, [width])
  return { arenaRef, backgroundMask, frameWidth: width, scale: width / 1134, frameHeight: width * 1296 / 1134 }
}
