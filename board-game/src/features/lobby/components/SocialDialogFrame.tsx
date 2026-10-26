import type { CSSProperties, ReactNode } from 'react'
import socialHeaderLandscape from '../../../assets/rankings/social-header-landscape.png'
import { DialogCloseButton } from './DialogCloseButton'

export const socialModeTabsClass = 'relative z-10 mx-auto mb-1 flex w-[68%] compact:w-[84%] items-end justify-center gap-10'
export const socialPlayerRowClass = 'relative isolate grid shrink-0 items-center gap-3 overflow-hidden rounded-[var(--social-row-radius)] border border-[#c5a16a]/55 bg-[linear-gradient(90deg,#ead0a0,#f0dcb3_48%,#e8cca0)] px-3 py-0 shadow-[inset_0_1px_0_#f8e6bd]'
export const socialPlayerListClass = 'relative z-10 flex min-h-0 flex-1 flex-col gap-[var(--social-row-gap)] overflow-x-hidden overflow-y-auto pr-2'

export function getSocialRowStyle(scale: number, compact: boolean): CSSProperties {
  return {
    height: Math.round(138 * scale),
    minHeight: compact ? 0 : Math.round(138 * scale),
    flex: compact ? '0 0 calc(100% / var(--social-visible-rows, 6) - var(--social-row-gap))' : undefined,
    '--social-row-radius': `${Math.round(10 * scale * (compact ? 1.5 : 1))}px`,
  } as CSSProperties
}

export function SocialDialogFrame({ layout, titleImage, titleCrop, titleId, title, onClose, contentStyle, hideTitle = false, showTitleText = false, overlayTitle = false, hideClose = false, children }: {
  layout: { width: number; height: number; scale: number; compact?: boolean }
  hideTitle?: boolean
  showTitleText?: boolean
  overlayTitle?: boolean
  hideClose?: boolean
  titleImage: string
  titleCrop?: { width: number; height: number; top: number; cropHeight: number }
  titleId: string
  title: string
  onClose: () => void
  contentStyle?: CSSProperties
  children: ReactNode
}) {
  const scale = layout.scale
  const frameStyle = {
    ...Object.fromEntries([3, 5, 9, 14, 22, 24, 28, 62, 76, 170].map(size => [`--ranking-${size}`, `${Math.round(size * scale)}px`])),
    '--spacing': `${4 * scale}px`,
    '--ranking-title-width': `${Math.round(650 * scale * (layout.compact ? 1.12 : 1))}px`,
    '--ranking-tab-height': `${Math.round(70 * scale * (layout.compact ? 1.6 : 1))}px`,
    '--social-row-gap': `${Math.round(8 * scale)}px`,
    width: Math.round(layout.width * scale),
    height: Math.round(layout.height * scale),
  } as CSSProperties
  return <div className="absolute top-0 left-0 origin-top-left rounded-[var(--ranking-22)] border-[length:var(--ranking-5)] border-[#5e3014] bg-[linear-gradient(135deg,#7a431c,#2d160a)] p-4 shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]" style={frameStyle}>
    {!hideClose && <DialogCloseButton onClose={onClose} scale={scale} compact={layout.compact ?? false} positionClass="top-[var(--ranking-24)] right-[var(--ranking-28)]" />}
    <div className="relative flex h-full min-h-0 flex-col rounded-xl border-[length:var(--ranking-3)] border-[#d39a42] bg-[radial-gradient(ellipse_at_50%_8%,#b87a3344,transparent_38%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] px-2 pb-2 shadow-[0_0_0_2px_#48220e,inset_0_0_18px_#160904]" style={contentStyle}>
      {!overlayTitle && <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-2 h-[var(--ranking-170)] overflow-hidden rounded-[var(--ranking-9)] opacity-80 shadow-[inset_0_0_18px_8px_#241107]">
        <img src={socialHeaderLandscape} alt="" className="size-full object-cover object-center" />
      </div>}
      <div aria-hidden="true" className="pointer-events-none absolute inset-2 overflow-hidden rounded-lg opacity-20"><svg viewBox="0 0 660 800" preserveAspectRatio="none" className="h-full w-full" fill="none" stroke="#b8873e" strokeWidth="5"><path d="M-30 130c85-90 120 30 40 18-60-12-15-84 30-42m450-100c-60 35-30 95 15 60s-40-70-65-20M-40 680c80-65 165 10 95 55-55 35-100-50-45-65 65-18 80 93 160 57m340 75c-65-70 15-125 58-75 30 40-45 80-60 30-10-40 80-80 140-20"/><path d="M-15 780q80-100 160 0m-145 0q65-80 130 0m-110 0q45-55 90 0M500 0q75 90 150 0m-130 0q55 65 110 0"/></svg></div>
      {!hideTitle && <header className="relative z-10 mx-auto -mt-[var(--ranking-62)] mb-[calc(-1*var(--ranking-14))] w-[var(--ranking-title-width)] text-center" style={{ height: Math.round(650 * scale * (layout.compact ? 1.12 : 1)) * 360 / 2166, flexShrink: 0, ...(overlayTitle ? { position: 'absolute', top: -Math.round(62 * scale), left: '50%', transform: 'translateX(-50%)', margin: 0, zIndex: 30, pointerEvents: 'none' } : {}) }}>
        {titleCrop ? <svg aria-hidden="true" viewBox={`0 ${titleCrop.top} ${titleCrop.width} ${titleCrop.cropHeight}`} preserveAspectRatio="none" className="pointer-events-none mx-auto h-full w-full"><image href={titleImage} width={titleCrop.width} height={titleCrop.height}/></svg> : <img src={titleImage} alt="" className="pointer-events-none mx-auto h-auto w-full" />}
        <h2 id={titleId} className={showTitleText ? 'absolute inset-x-0 top-[36%] -translate-y-1/2 font-heading font-extrabold italic leading-none text-[#ffe3a1] [text-shadow:0_1px_2px_#241007]' : 'sr-only'} style={showTitleText ? { fontSize: Math.round(58 * scale) } : undefined}>{title}</h2>
      </header>}
      {children}
    </div>
    {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[var(--ranking-76)] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}
  </div>
}
