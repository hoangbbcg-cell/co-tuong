import { useMessageFriendship } from '../hooks/useMessageFriendship'
import { buttonInteraction } from '../../../lib/uiClasses'

export function MessagesMemberFriendButton({ name, showText = false, onAction, onRequestRemoval }: { name: string; showText?: boolean; onAction?: () => void; onRequestRemoval: (name: string) => void }) {
  const friendship = useMessageFriendship(name)
  const label = friendship.isFriend ? 'Đã kết bạn' : friendship.pending ? 'Đã gửi lời mời' : friendship.incoming ? 'Chấp nhận kết bạn' : 'Kết bạn'
  return <button type="button" aria-label={`${label}: ${name}`} disabled={!friendship.isFriend && friendship.pending} onClick={() => { if (friendship.isFriend) { onRequestRemoval(name); return }; friendship.activate(); onAction?.() }} className={`${buttonInteraction} flex min-h-[32px] shrink-0 items-center justify-center gap-[8px] border-0 bg-transparent p-0 text-[14px] text-[#ffe5a6] disabled:opacity-50`}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3"/>{friendship.isFriend ? <path d="m16 10 2 2 4-4"/> : friendship.pending ? <><circle cx="19" cy="11" r="4"/><path d="M19 9v2l1 1"/></> : <path d="M19 7v8m-4-4h8"/>}</svg>{showText && label}</button>
}
