import type { ReactNode } from 'react'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import listFrame from '../../../assets/messages/conversation-list-frame.png'
import chatFrame from '../../../assets/messages/conversation-chat-frame.png'

type PanelProps = { width: number; height: number; children: ReactNode }

export function MessagesSidebar({ width, height, children }: PanelProps) {
  return <div className="relative shrink-0 font-['Times_New_Roman']" style={{ width, height }}>
    <CrispUiImage src={listFrame} alt="" className="pointer-events-none absolute inset-0 m-0 block h-full w-full border-0 p-0 object-fill" />
    <aside aria-label="Danh sách hội thoại" className="absolute top-[5%] bottom-[3%] z-10 flex min-h-0 flex-col overflow-hidden p-2" style={{ left: `${20.325 / 465 * 100}%`, right: `${12.25385 / 465 * 100}%` }}>{children}</aside>
  </div>
}

export function MessagesChatPane({ width, height, children }: PanelProps) {
  const frameStyle = { top: `${9 / 998 * 100}%`, height: `${989 / 998 * 100}%` }
  return <div className="relative shrink-0 font-['Times_New_Roman']" style={{ width, height }}>
    <CrispUiImage src={chatFrame} alt="" className="pointer-events-none absolute inset-x-0 m-0 block w-full border-0 p-0 object-fill" style={frameStyle} />
    <section aria-label="Hội thoại" className="absolute top-[5%] bottom-[3%] z-10 flex min-h-0 flex-col overflow-hidden" style={{ left: `${8.77575 / 890 * 100}%`, right: `${20.325 / 890 * 100}%` }}>{children}</section>
    <CrispUiImage src={chatFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 z-20 m-0 block w-full border-0 p-0 object-fill" style={{ ...frameStyle, clipPath: 'polygon(0 97.8%,90% 97.8%,90% 97%,92% 96.5%,92.5% 95.5%,94% 95.2%,95.5% 95.5%,97% 94.8%,97.5% 93%,98.5% 92.8%,98.5% 0,100% 0,100% 100%,0 100%)' }} />
  </div>
}
