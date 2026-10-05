import { memo } from 'react'
import type { useChat } from '../hooks/useChat'
import avatar from '../../../assets/icons/avatar.svg'
import defaultAvatarFrame from '../../../assets/30dfa56b-d9f3-4129-b9fd-aaf0ea884188.png'
import { AvatarFrameOverlay } from './AvatarFrameOverlay'
import { buttonInteraction } from '../../../lib/uiClasses'

const suggestions = ['Chào bạn!', 'Nước đi hay!', 'Chúc bạn chơi vui!']
const pickerStyle = 'absolute inset-x-2 bottom-[48px] z-10 flex max-h-[calc(100%-60px)] flex-wrap gap-1 overflow-y-auto scroll-smooth motion-reduce:scroll-auto rounded-[14px] border border-[#b2945e] bg-[#0a211d] p-2 shadow-[0_6px_18px_#0009]'
const quickPickerStyle = 'absolute inset-x-[-1.5px] top-0 bottom-[48px] z-10 flex flex-col gap-1 overflow-y-auto scroll-smooth motion-reduce:scroll-auto rounded-md border border-[#b2945e] bg-[#0b1c19] p-2 shadow-[0_6px_18px_#0009]'

export const Chat = memo(function Chat({ chat, onAvatarClick }: { chat: ReturnType<typeof useChat>; onAvatarClick?: (name: string) => void }) {
  const visibleMessages = chat.messages.filter(message => !message.system || message.text.endsWith('đã vào phòng.'))
  const togglePicker = (picker: 'emoji' | 'quick') => {
    if (chat.collapsed) chat.toggle()
    chat.togglePicker(picker)
  }
  return <section ref={chat.containerRef} className={`relative flex w-[calc(100%-20px)] min-w-0 flex-col overflow-visible rounded-none border border-[#c39a52] bg-[#06181dcc] p-2 text-left shadow-[inset_0_0_0_1px_#e3bf704f,inset_0_0_24px_#0008] desktop:absolute desktop:-right-4 desktop:bottom-0 desktop:w-[calc(100%+16px)] compact:absolute compact:right-0 compact:bottom-2 compact:z-9 compact:w-[min(290px,calc(92%_-_10px))] ${chat.collapsed ? 'h-[92px] flex-none justify-end' : 'h-[318px] flex-none compact:h-[300px]'}`} aria-label="Trò chuyện">
    <div className="pointer-events-none absolute right-2 bottom-[52px] z-2">
      <button id="chatToggle" className={`${buttonInteraction} pointer-events-auto grid size-5 shrink-0 place-items-center border-0 bg-transparent p-0 text-[#35b9f4]`} aria-label={chat.collapsed ? 'Mở trò chuyện' : 'Thu gọn trò chuyện'} aria-expanded={!chat.collapsed} aria-controls="chatMessages" onClick={chat.toggle}>
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true"><path d={chat.collapsed ? 'M4 17 12 3 20 17Z' : 'M4 7 12 21 20 7Z'} fill="currentColor"/></svg>
      </button>
    </div>
    <div id="chatMessages" hidden={chat.collapsed || visibleMessages.length === 0} className="relative z-1 mb-2 min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth motion-reduce:scroll-auto px-1 pt-[12px] pb-0.5 [scrollbar-width:thin]" role="log" aria-live="polite" aria-label="Tin nhắn" ref={chat.messagesRef}>
      {visibleMessages.map(message => message.system
        ? <p key={message.id} className="m-0 px-0.5 py-px text-[14px]/[1.4] text-white [overflow-wrap:anywhere] [&+*]:mt-[6px]">{message.text}</p>
        : <article key={message.id} className="flex items-center gap-2 px-0.5 py-0.5 text-white [text-shadow:0_1px_2px_#00151c] [&+*]:mt-[6px]">
          <button type="button" aria-label={`Xem hồ sơ ${message.name}`} onClick={() => onAvatarClick?.(message.name)} className="relative m-0 block size-8 flex-[0_0_32px] cursor-pointer rounded-full border-0 bg-transparent p-0 leading-none shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe2a1]"><img src={avatar} alt="" className="block size-full rounded-full border-0 object-cover" /><AvatarFrameOverlay src={defaultAvatarFrame} /></button>
          <div className="min-w-0 flex-1 text-[14px]/[1.4] [overflow-wrap:anywhere]">
            <strong className="font-semibold text-[#f2d58e]">{message.name}: </strong>
            <span>{message.text}</span>
          </div>
        </article>)}
    </div>
    <div id="quickChatPicker" className={quickPickerStyle} hidden={chat.picker !== 'quick'} aria-label="Gợi ý chat">
      {suggestions.map(message => <button className={`${buttonInteraction} flex h-9 w-full shrink-0 items-center gap-2 rounded-sm border border-[#a78d5d] bg-[#183f35] px-2 text-left text-[#f3f1e9] shadow-[inset_0_1px_0_#e1c17a33,0_2px_5px_#0005] compact:h-8`} key={message} type="button" disabled={chat.sending} onClick={() => { chat.togglePicker('quick'); void chat.send(message) }}>
        <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center">
          <svg viewBox="0 0 32 32" className="size-[18px]" fill="none"><path d="M5 7.5A3.5 3.5 0 0 1 8.5 4h15A3.5 3.5 0 0 1 27 7.5v11a3.5 3.5 0 0 1-3.5 3.5h-8.8L8 27v-5.4a3.5 3.5 0 0 1-3-3.5Z" fill="#f0c995"/><circle cx="11" cy="13" r="1.5" fill="#102722"/><circle cx="16" cy="13" r="1.5" fill="#102722"/><circle cx="21" cy="13" r="1.5" fill="#102722"/></svg>
        </span>
        <span className="min-w-0 flex-1 truncate text-[14px] leading-tight compact:text-[12px]">{message}</span>
        <svg aria-hidden="true" viewBox="0 0 20 28" className="h-4 w-2 shrink-0" fill="none"><path d="m4 3 11 11L4 25" stroke="#c5a15b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>)}
    </div>
    <div id="emojiPicker" className={pickerStyle} hidden={chat.picker !== 'emoji'} aria-label="Biểu cảm">
      {['😀', '😂', '👍', '👏', '🤔', '❤️'].map(emoji => <button className={`${buttonInteraction} border-0 bg-transparent p-1 text-[21px] text-white hover:bg-[#436657]`} key={emoji} type="button" aria-label={`Chèn ${emoji}`} onClick={() => chat.emoji(emoji)}>{emoji}</button>)}
    </div>
    <form id="chatForm" className="relative z-1 flex h-[40px] shrink-0 items-center overflow-hidden rounded-[16px] border border-[#77816e] bg-[#0b1c19]/95 shadow-[inset_0_1px_5px_#0005] compact:h-[38px]" onSubmit={event => { event.preventDefault(); void chat.send() }}>
      <input id="chatInput" className="h-full w-0 min-w-0 flex-1 border-0 bg-transparent px-3 font-arial text-[15px] leading-[normal] text-white placeholder:text-[#a5aaa2] placeholder:opacity-100 focus:outline-none focus:ring-0 compact:px-2 compact:text-[13px]" ref={chat.inputRef} value={chat.input} onChange={event => chat.setInput(event.target.value)} aria-label="Nội dung chat" placeholder="Nhập nội dung chat..." maxLength={300} autoComplete="off" />
      <button id="emojiButton" className={`${buttonInteraction} grid size-7 shrink-0 place-items-center border-0 bg-transparent p-0 text-[#f0c995]`} type="button" aria-label="Biểu cảm" aria-expanded={chat.picker === 'emoji'} aria-controls="emojiPicker" onClick={() => togglePicker('emoji')}>
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true"><defs><linearGradient id="chatEmojiGold" x1="5" y1="4" x2="19" y2="20" gradientUnits="userSpaceOnUse"><stop stopColor="#ffe98c"/><stop offset="0.55" stopColor="#ffd34f"/><stop offset="1" stopColor="#f3ad28"/></linearGradient></defs><circle cx="12" cy="12" r="9" fill="url(#chatEmojiGold)" stroke="#d99a2b" strokeWidth="0.7"/><path d="M8 14s1.4 2 4 2 4-2 4-2" fill="none" stroke="#75451f" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="9" r="1" fill="#75451f"/><circle cx="15" cy="9" r="1" fill="#75451f"/></svg>
      </button>
      <button id="quickChatButton" className={`${buttonInteraction} grid size-7 shrink-0 place-items-center border-0 bg-transparent p-0 text-[#f0c995]`} type="button" aria-label="Gợi ý chat" aria-expanded={chat.picker === 'quick'} aria-controls="quickChatPicker" onClick={() => togglePicker('quick')}>
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true"><defs><linearGradient id="chatBubbleInnerShade" x1="0" y1="13" x2="0" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#000" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity="0.42"/></linearGradient><clipPath id="chatBubbleClip"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-3 2v-5.2A7.5 7.5 0 1 1 20 11.5Z"/></clipPath></defs><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-3 2v-5.2A7.5 7.5 0 1 1 20 11.5Z" fill="#fff"/><rect x="3" y="12" width="19" height="10" fill="url(#chatBubbleInnerShade)" clipPath="url(#chatBubbleClip)"/><circle cx="8" cy="12" r="1" fill="#0b1c19"/><circle cx="12" cy="12" r="1" fill="#0b1c19"/><circle cx="16" cy="12" r="1" fill="#0b1c19"/></svg>
      </button>
      <button type="submit" className={`${buttonInteraction} mr-1.5 grid size-9 shrink-0 place-items-center border-0 bg-transparent p-0 text-[#f0c995]`} aria-label="Gửi tin nhắn" disabled={chat.sending}>
        <svg viewBox="0 0 36 36" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 29-12-10 29-6-13L3 16Z"/><path d="M16 20 32 4"/></svg>
      </button>
    </form>
  </section>
}, (previous, next) => {
  const before = previous.chat
  const after = next.chat
  return previous.onAvatarClick === next.onAvatarClick
    && before.input === after.input
    && before.picker === after.picker
    && before.collapsed === after.collapsed
    && before.sending === after.sending
    && before.messages === after.messages
    && before.mode === after.mode
})
