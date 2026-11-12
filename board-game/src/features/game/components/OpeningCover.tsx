import { useLayoutEffect, useRef, useState } from 'react'
import { HovangLoadingOverlay } from '../../../components/HovangLoadingOverlay'

const destinations = [
  'translate3d(-100%, 0, 0)',
  'translate3d(100%, 0, 0)',
]
const positions = ['left-0', 'right-0']
const duration = 600

export function OpeningCover({ onComplete, waitForPieceImages = false }: { onComplete: () => void; waitForPieceImages?: boolean }) {
  const panels = useRef<Array<HTMLDivElement | null>>([])
  const complete = useRef(onComplete)
  complete.current = onComplete
  const [loading, setLoading] = useState(false)
  useLayoutEffect(() => {
    let cancelled = false
    let animations: Animation[] = []
    let timer: number | undefined
    let frame: number | undefined
    const start = () => {
      if (cancelled) return
      setLoading(false)
      animations = panels.current.flatMap((panel, index) => {
        if (!panel) return []
        const animation = panel.animate?.([
          { transform: 'translate3d(0, 0, 0)' },
          { transform: destinations[index] },
        ], { duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' })
        return animation ? [animation] : []
      })
      timer = animations.length ? undefined : window.setTimeout(() => complete.current(), duration)
      if (animations.length) animations[animations.length - 1].onfinish = () => complete.current()
    }
    const scene = panels.current[0]?.parentElement?.parentElement
    const images = waitForPieceImages && scene ? [...scene.querySelectorAll<HTMLImageElement>('img[data-cached-piece-face]')] : []
    const unique = [...new Map(images.map(image => [image.currentSrc || image.src, image])).values()]
    const disposers: Array<() => void> = []
    if (unique.length) {
      setLoading(true)
      const ready = unique.map(image => image.decode ? image.decode() : image.complete ? Promise.resolve() : new Promise<void>(resolve => {
        const finish = () => { image.removeEventListener('load', finish); image.removeEventListener('error', finish); resolve() }
        image.addEventListener('load', finish, { once: true }); image.addEventListener('error', finish, { once: true })
        disposers.push(finish)
      }))
      void Promise.allSettled(ready).then(() => {
        if (cancelled) return
        frame = requestAnimationFrame(() => { frame = requestAnimationFrame(start) })
      })
    } else start()
    return () => {
      cancelled = true
      disposers.forEach(dispose => dispose())
      if (frame !== undefined) cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      animations.forEach(animation => { animation.onfinish = null; animation.cancel() })
    }
  }, [waitForPieceImages])

  return <div aria-hidden={!loading} data-screenshot-exclude="true" className={`${loading ? 'pointer-events-auto' : 'pointer-events-none'} fixed inset-0 z-[100] isolate overflow-hidden`}>
    {positions.map((position, index) => <div key={position} ref={panel => { panels.current[index] = panel }} className={`absolute inset-y-0 w-1/2 bg-[#263a35] will-change-transform ${position}`} />)}
    {loading && <HovangLoadingOverlay label="Đang tải quân cờ" />}
  </div>
}
