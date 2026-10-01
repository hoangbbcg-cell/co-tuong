import { useLayoutEffect, useRef } from 'react'

const destinations = [
  'translate3d(-100%, 0, 0)',
  'translate3d(100%, 0, 0)',
]
const positions = ['left-0', 'right-0']
const duration = 1500

export function OpeningCover({ onComplete }: { onComplete: () => void }) {
  const panels = useRef<Array<HTMLDivElement | null>>([])
  useLayoutEffect(() => {
    const animations = panels.current.flatMap((panel, index) => {
      if (!panel) return []
      const animation = panel.animate?.([
        { transform: 'translate3d(0, 0, 0)' },
        { transform: destinations[index] },
      ], { duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' })
      return animation ? [animation] : []
    })
    const timer = animations.length ? undefined : window.setTimeout(onComplete, duration)
    if (animations.length) animations[animations.length - 1].onfinish = onComplete
    return () => {
      window.clearTimeout(timer)
      animations.forEach(animation => { animation.onfinish = null; animation.cancel() })
    }
  }, [onComplete])

  return <div aria-hidden="true" data-screenshot-exclude="true" className="pointer-events-none fixed inset-0 z-[100] isolate overflow-hidden">
    {positions.map((position, index) => <div key={position} ref={panel => { panels.current[index] = panel }} className={`absolute inset-y-0 w-1/2 bg-[#263a35] will-change-transform ${position}`} />)}
  </div>
}
