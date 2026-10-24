import messagesTitle from '../../../assets/messages/messages-title-gold-v2.png'
import { SocialDialogFrame } from './SocialDialogFrame'
import type { ReactNode } from 'react'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import listFrame from '../../../assets/messages/conversation-list-frame.png'
import chatFrame from '../../../assets/messages/conversation-chat-frame.png'

type PanelProps = { width: number; height: number; children: ReactNode; compact?: boolean; hidden?: boolean }

export function MessagesSidebar({ width, height, children, compact, hidden }: PanelProps) {
  if (hidden) return null
  if (compact) return <div style={{ width: '100%', height: '100%' }} className="flex min-h-0 flex-col overflow-hidden bg-transparent font-body text-[#ffebba]"><aside aria-label="Danh sách hội thoại" className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 pt-2">{children}</aside></div>
  return <div className="relative shrink-0 font-['Times_New_Roman']" style={{ width, height }}>
    <CrispUiImage src={listFrame} alt="" className="pointer-events-none absolute inset-0 m-0 block h-full w-full border-0 p-0 object-fill" />
    <aside aria-label="Danh sách hội thoại" className="absolute top-[5%] bottom-[3%] z-10 flex min-h-0 flex-col overflow-hidden p-2" style={{ left: `${20.325 / 465 * 100}%`, right: `${12.25385 / 465 * 100}%` }}>{children}</aside>
  </div>
}

export function MessagesChatPane({ width, height, children, compact, hidden }: PanelProps) {
  const frameStyle = { top: `${9 / 998 * 100}%`, height: `${989 / 998 * 100}%` }
  if (hidden) return null
  if (compact) return <div style={{ width: '100%', height: '100%' }} className="relative min-h-0 overflow-hidden rounded-lg font-body text-[#ffebba]"><svg aria-hidden="true" viewBox="30 45 820 910" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full"><image href={chatFrame} width="890" height="998"/></svg><section aria-label="Hội thoại" className="relative flex h-full min-h-0 flex-col overflow-hidden">{children}</section></div>
  return <div className="relative shrink-0 font-['Times_New_Roman']" style={{ width, height }}>
    <CrispUiImage src={chatFrame} alt="" className="pointer-events-none absolute inset-x-0 m-0 block w-full border-0 p-0 object-fill" style={frameStyle} />
    <section aria-label="Hội thoại" className="absolute top-[5%] bottom-[3%] z-10 flex min-h-0 flex-col overflow-hidden" style={{ left: `${8.77575 / 890 * 100}%`, right: `${20.325 / 890 * 100}%` }}>{children}</section>
    <CrispUiImage src={chatFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 z-20 m-0 block w-full border-0 p-0 object-fill" style={{ ...frameStyle, clipPath: 'polygon(0 97.8%,90% 97.8%,90% 97%,92% 96.5%,92.5% 95.5%,94% 95.2%,95.5% 95.5%,97% 94.8%,97.5% 93%,98.5% 92.8%,98.5% 0,100% 0,100% 100%,0 100%)' }} />
  </div>
}

export function MessagesDialogSurface({ compact, activeChat = false, layout, onClose, children }: { compact: boolean; activeChat?: boolean; layout: { width: number; height: number; scale: number }; onClose: () => void; children: ReactNode }) {
  if (!compact) return <>{children}</>
  return <SocialDialogFrame layout={{ ...layout, compact }} titleImage={messagesTitle} titleCrop={{ width: 2172, height: 724, top: 179, cropHeight: 366 }} overlayTitle={activeChat} hideTitle={activeChat} contentStyle={activeChat ? { paddingInline: 0, paddingBottom: 0 } : undefined} titleId="messages-frame-title" title="Tin nhắn" onClose={onClose}>{children}</SocialDialogFrame>
}
