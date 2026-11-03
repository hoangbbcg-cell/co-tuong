import messagesTitle from '../../../assets/messages/messages-title-gold-v2.png'
import { SocialDialogFrame } from './SocialDialogFrame'
import type { ReactNode } from 'react'
import chatFrame from '../../../assets/messages/conversation-chat-frame.png'
import { customizationListPanel } from '../../../lib/uiClasses'

type PanelProps = { width: number; height: number; children: ReactNode; compact?: boolean; hidden?: boolean }
const desktopPanelTop = 'calc(var(--ranking-62) + var(--ranking-14) - var(--ranking-title-width) * 360 / 2166 + 10px)'

export function MessagesSidebar({ width, height, children, compact, hidden }: PanelProps) {
  if (hidden) return null
  if (compact) return <div style={{ width: '100%', height: '100%' }} className="flex min-h-0 flex-col overflow-hidden bg-transparent font-body text-[#ffebba]"><aside aria-label="Danh sách hội thoại" className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 pt-2">{children}</aside></div>
  return <div className="relative shrink-0 font-['Times_New_Roman']" style={{ width: '32%', marginTop: desktopPanelTop, height: `calc(100% - (${desktopPanelTop}))` }}>
    <aside aria-label="Danh sách hội thoại" className="absolute inset-0 z-10 flex min-h-0 flex-col overflow-hidden p-0">{children}</aside>
  </div>
}

export function MessagesChatPane({ width, height, children, compact, hidden }: PanelProps) {
  if (hidden) return null
  if (compact) return <div style={{ width: '100%', height: '100%' }} className="relative min-h-0 overflow-hidden rounded-lg font-body text-[#ffebba]"><svg aria-hidden="true" viewBox="30 45 820 910" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full"><image href={chatFrame} width="890" height="998" preserveAspectRatio="none"/></svg><section aria-label="Hội thoại" className="relative flex h-full min-h-0 flex-col overflow-hidden">{children}</section></div>
  return <div className={`relative min-w-0 flex-1 overflow-hidden font-['Times_New_Roman'] ${customizationListPanel}`} style={{ marginTop: desktopPanelTop, height: 'calc(100% + var(--spacing) * 2 + var(--ranking-title-width) * 360 / 2166 - var(--ranking-62) - var(--ranking-14) - 10px)', marginRight: 'calc(var(--spacing) * -2)' }}>
    <svg aria-hidden="true" viewBox="30 45 820 910" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full"><image href={chatFrame} width="890" height="998" preserveAspectRatio="none"/></svg>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/45" />
    <section aria-label="Hội thoại" className="absolute inset-0 z-10 flex min-h-0 flex-col overflow-hidden">{children}</section>
  </div>
}

export function MessagesDialogSurface({ compact, activeChat = false, hideClose = false, layout, onClose, children }: { compact: boolean; activeChat?: boolean; hideClose?: boolean; layout: { width: number; height: number; scale: number }; onClose: () => void; children: ReactNode }) {
  const frameLayout = { ...layout, compact }
  return <SocialDialogFrame layout={frameLayout} titleImage={messagesTitle} titleCrop={{ width: 2172, height: 724, top: 179, cropHeight: 366 }} hideClose={hideClose} overlayTitle={compact && activeChat} hideTitle={compact && activeChat} contentStyle={compact && activeChat ? { paddingInline: 0, paddingBottom: 0 } : undefined} titleId="messages-frame-title" title="Tin nhắn" onClose={onClose}>{children}</SocialDialogFrame>
}
