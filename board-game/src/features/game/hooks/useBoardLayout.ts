import { useLayoutEffect, useRef, useState } from 'react'

export function useBoardLayout(fullMobileWidth = false) {
  const arenaRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(588)
  const [backgroundMask, setBackgroundMask] = useState<string>()
  useLayoutEffect(() => {
    const arena = arenaRef.current
    if (!arena) return
    const fit = () => {
      const compact = window.matchMedia('(max-width: 800px)').matches
      const availableHeight = arena.clientHeight - (compact ? 308 : 0) - 4
      const availableWidth = compact ? arena.clientWidth - 8 : arena.clientWidth - 340
      setWidth(Math.max(0, compact && fullMobileWidth ? arena.clientWidth : Math.min(availableWidth, availableHeight * 1134 / 1296)))
    }
    const observer = new ResizeObserver(fit)
    observer.observe(arena)
    window.addEventListener('resize', fit)
    fit()
    return () => { observer.disconnect(); window.removeEventListener('resize', fit) }
  }, [fullMobileWidth])
  useLayoutEffect(() => {
    const arena = arenaRef.current
    const scene = arena?.parentElement
    const board = arena?.querySelector('#board')
    if (!arena || !scene || !board) return
    const identity = arena.querySelector('[data-mobile-edge="top"] [data-player-identity]') ?? arena.querySelector('[data-player-identity]')
    const bottomIdentity = arena.querySelector('[data-mobile-edge="bottom"] [data-player-identity]')
    const main = scene.parentElement
    const actions = main?.querySelector<HTMLElement>('#matchActions')
    const mobileCode = arena.querySelector<HTMLElement>('[data-mobile-room-code]')
    const mobileCards = arena.querySelectorAll<HTMLElement>('[data-mobile-header="true"]')
    const measure = () => {
      if (mobileCode && window.matchMedia('(max-width: 800px)').matches) {
        const codeRect = mobileCode.getBoundingClientRect()
        mobileCards.forEach(card => {
          const avatar = card.querySelector<HTMLElement>('[data-mobile-avatar]')
          const like = card.querySelector<HTMLElement>('[data-mobile-like]')
          if (!avatar || !like) return
          const avatarRect = avatar.getBoundingClientRect()
          const gapCenter = like.dataset.mobileLike === 'left'
            ? (avatarRect.right + codeRect.left) / 2
            : (codeRect.right + avatarRect.left) / 2
          like.style.left = `${gapCenter - like.offsetWidth / 2}px`
          like.style.top = `${avatarRect.top + (avatarRect.height - like.offsetHeight) / 2}px`
        })
      }
      const mobileElo = arena.querySelector<HTMLElement>('[data-mobile-header="true"] [data-player-elo]')
      if (mobileElo) arena.style.setProperty('--mobile-clock-top', `${mobileElo.getBoundingClientRect().top - arena.getBoundingClientRect().top - 4}px`)
      if (identity) {
        const rect = identity.getBoundingClientRect()
        scene.style.setProperty('--mobile-viewer-center', `${rect.top + rect.height / 2}px`)
      }
      if (bottomIdentity && main && !window.matchMedia('(max-width: 800px)').matches) {
        const rect = bottomIdentity.getBoundingClientRect()
        const mainRect = main.getBoundingClientRect()
        main.style.setProperty('--mobile-actions-top', `${rect.top - mainRect.top + rect.height / 2 - 31}px`)
        const actionWidth = actions?.getBoundingClientRect().width ?? 0
        main.style.setProperty('--mobile-actions-left', `${Math.max(10, rect.left - mainRect.left - actionWidth - 4)}px`)
      }
      const outer = scene.getBoundingClientRect()
      const inner = board.getBoundingClientRect()
      scene.style.setProperty('--mobile-viewers-top', `${inner.bottom - outer.top + 5}px`)
      if (main) main.style.setProperty('--mobile-view-button-top', `${inner.bottom - main.getBoundingClientRect().top + 5}px`)
      if (main) main.style.setProperty('--mobile-match-actions-top', `${inner.bottom - main.getBoundingClientRect().top + 39}px`)
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
    if (mobileCode) observer.observe(mobileCode)
    mobileCards.forEach(card => {
      const avatar = card.querySelector('[data-mobile-avatar]')
      const like = card.querySelector('[data-mobile-like]')
      if (avatar) observer.observe(avatar)
      if (like) observer.observe(like)
    })
    if (identity) observer.observe(identity)
    if (bottomIdentity) observer.observe(bottomIdentity)
    if (actions) observer.observe(actions)
    return () => observer.disconnect()
  }, [width])
  return { arenaRef, backgroundMask, frameWidth: width, scale: width / 1134, frameHeight: width * 1296 / 1134 }
}
