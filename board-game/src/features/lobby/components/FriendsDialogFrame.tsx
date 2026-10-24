import type { CSSProperties, ReactNode } from 'react'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import socialHeaderLandscape from '../../../assets/rankings/social-header-landscape.png'
import friendsTitle from '../../../assets/friends/friends-banner.png'
import { DialogCloseButton } from './DialogCloseButton'
import { SocialDialogFrame } from './SocialDialogFrame'

export function FriendsDialogFrame({ layout, onClose, contentStyle, children }: {
  layout: { width: number; height: number; scale: number; compact?: boolean }
  onClose: () => void
  contentStyle: CSSProperties
  children: ReactNode
}) {
  if (layout.compact) return <SocialDialogFrame layout={layout} titleImage={friendsTitle} titleId="friends-title" title="Bạn bè" onClose={onClose} contentStyle={contentStyle}>{children}</SocialDialogFrame>
  return <div className="absolute top-0 left-0 origin-top-left rounded-[var(--ui-p-22,22px)] border-[length:var(--ui-p-5,5px)] border-[#5e3014] bg-[radial-gradient(ellipse_at_50%_8%,#b87a3344,transparent_38%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] px-[var(--ui-p-36,36px)] pt-[var(--ui-p-52,52px)] pb-[var(--ui-p-28,28px)] shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]" style={getCrispUiLayout(layout.scale, layout.width, layout.height)}>
    <header className="absolute -top-[var(--ui-p-50,50px)] left-1/2 z-0 w-[var(--ui-p-650,650px)] -translate-x-1/2 text-center"><img src={friendsTitle} alt="" className="pointer-events-none mx-auto h-auto w-full" /><h2 id="friends-title" className="sr-only">Bạn bè</h2></header>
    <DialogCloseButton onClose={onClose} scale={layout.scale} compact={false} positionClass="top-[var(--ui-p-24,24px)] right-[var(--ui-p-28,28px)]" />
    <div className="relative flex h-full min-h-0 flex-col" style={contentStyle}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[var(--ui-p-8,8px)] h-[var(--ui-p-104,104px)] overflow-hidden rounded-[var(--ui-p-10,10px)] opacity-80 shadow-[inset_0_0_18px_8px_#241107]"><img src={socialHeaderLandscape} alt="" className="size-full object-cover object-center" /></div>
      {children}
    </div>
    {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[var(--ui-p-76,76px)] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}
  </div>
}
