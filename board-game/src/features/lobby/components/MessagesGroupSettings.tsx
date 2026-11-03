import { GroupCheckbox } from './GroupCheckbox'
import { useEffect, useState } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'
import { errorMessage } from '../../../services/api'
import { MessagesBackButton } from './MessagesBackButton'
import { MessagesFriendRemovalConfirmation } from './MessagesFriendButton'
import rowImage from '../../../assets/messages/options/action-row-blank.png'
export function MessagesGroupSettings({name,onBack,onDissolve,chatDisabled,deputyChatAllowed,onSetChat,compact=false}:{
  name:string;onBack:()=>void;onDissolve:()=>Promise<void>;chatDisabled:boolean;deputyChatAllowed:boolean;onSetChat:(disabled:boolean,deputyAllowed:boolean)=>Promise<void>;compact?:boolean
}){
  const [chatPage,setChatPage]=useState(false)
  const [chatChecked,setChatChecked]=useState(chatDisabled)
  const [deputyChecked,setDeputyChecked]=useState(deputyChatAllowed)
  const [dissolving,setDissolving]=useState(false)
  const [pending,setPending]=useState(false)
  const [error,setError]=useState('')
  useEffect(()=>{if(!pending){setChatChecked(chatDisabled);setDeputyChecked(deputyChatAllowed)}},[chatDisabled,deputyChatAllowed,pending])
  useEffect(()=>{if(!error)return;const timer=window.setTimeout(()=>setError(''),3000);return()=>window.clearTimeout(timer)},[error])
  async function run(action:()=>Promise<void>,done:()=>void=()=>{}){if(pending)return;setPending(true);setError('');try{await action();done()}catch(error){setError(errorMessage(error));setChatChecked(chatDisabled);setDeputyChecked(deputyChatAllowed)}finally{setPending(false)}}
  return <section aria-label="Cài đặt nhóm" className="absolute inset-0 z-30 flex min-h-0 flex-col gap-[12px] bg-[#281205] p-[20px] text-[#ffe8ad] [-webkit-tap-highlight-color:transparent] [&_button:disabled]:opacity-100 [&_input:disabled]:opacity-100">
    <header className="flex shrink-0 items-center gap-[12px]"><MessagesBackButton size={compact ? 28 : 38} label="Quay lại tùy chọn nhóm" onClick={()=>{if(!pending){if(chatPage)setChatPage(false);else onBack()}}}/><h2 className="font-heading text-[length:var(--ui-p-28)] compact:text-[22px]">{chatPage?'Tắt tin nhắn nhóm':'Cài đặt nhóm'}</h2></header>
    {error&&!dissolving&&<p role="alert" className="text-[16px] text-[#ff9b9b]">{error}</p>}
    {!chatPage&&<><button data-ui-selection-sound type="button" onClick={()=>setChatPage(true)} className={buttonInteraction+' relative flex h-[var(--ui-p-90)] compact:h-[50px] w-full shrink-0 items-center gap-[12px] border-0 bg-transparent px-[16px] text-left'}><img src={rowImage} alt="" className="pointer-events-none absolute inset-0 size-full"/><svg aria-hidden="true" viewBox="0 0 24 24" className="relative size-[24px] shrink-0 text-[#f4c75e]" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11a8 8 0 0 1-8 8H6l-4 3V11a9 9 0 0 1 18-4M3 3l18 18"/></svg><span className="relative font-number text-[length:var(--ui-p-22)] compact:text-[18px]">Tắt tin nhắn nhóm</span></button><hr className="my-[4px] w-full border-0 border-t border-[#79501e]"/><button data-ui-selection-sound type="button" disabled={pending} onClick={()=>setDissolving(true)} className={buttonInteraction+' flex h-[var(--ui-p-90)] compact:h-[50px] w-full shrink-0 items-center gap-[12px] rounded-[6px] border border-[#ad761e] bg-[linear-gradient(135deg,#3e200e,#1c0e07)] px-[16px] text-left font-number text-[length:var(--ui-p-22)] compact:text-[18px] text-[#ff5555] shadow-[inset_0_0_0_1px_#6c430e]'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/></svg>Giải tán nhóm</button></>}
    {chatPage&&<div className="flex flex-col gap-[16px] text-[18px]"><label className="flex items-center justify-between gap-[12px] border-b border-[#79501e] py-[12px]"><span className="flex min-w-0 flex-1 flex-col gap-[6px]"><span>Tắt tin nhắn nhóm</span><span className="text-[14px] font-normal leading-relaxed text-[#c8aa78]">Người dùng trong nhóm sẽ không thể gửi tin nhắn</span></span><GroupCheckbox aria-label="Tắt tin nhắn nhóm" checked={chatChecked} disabled={pending} onChange={event=>{const checked=event.target.checked;setChatChecked(checked);void run(()=>onSetChat(checked,deputyChecked))}} className="size-[24px] shrink-0 accent-[#d8ac35]"/></label><label className="flex items-center justify-between gap-[12px] py-[12px]"><span>Khóa bạc có thể nhắn</span><GroupCheckbox aria-label="Khóa bạc có thể nhắn" checked={deputyChecked} disabled={pending} onChange={event=>{const checked=event.target.checked;setDeputyChecked(checked);void run(()=>onSetChat(chatChecked,checked))}} className="size-[24px] shrink-0 accent-[#d8ac35]"/></label></div>}
    {dissolving&&<MessagesFriendRemovalConfirmation name={name} skip={false} onSkipChange={()=>{}} message="Giải tán nhóm? Tất cả thành viên sẽ rời nhóm và không thể gửi thêm tin nhắn." pending={pending} error={error} onCancel={()=>{if(!pending)setDissolving(false)}} onConfirm={()=>{void run(onDissolve,()=>setDissolving(false))}}/>}
  </section>
}
