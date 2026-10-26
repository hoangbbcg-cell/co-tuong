import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSessionStore } from '../../../store/sessionStore'
import { accountApi } from '../../../services/accountApi'
export interface DatabaseConversation {online?:boolean;id:string;type:string;title:string|null;avatarUrl:string|null;nickname:string|null;peerId:string|null;peerName:string|null;lastMessageAt:string|null;preview:string|null;unreadCount:number;mutedUntil:string|null;mutedIndefinitely:number}
export type GroupMemberRole = 'owner' | 'deputy' | 'member'
export interface BlockedGroupMember { id: string; name: string }
export interface PendingGroupMember { id:string; name:string; inviterName:string }
export interface DatabaseMessage {id:string;senderId:string;displayName:string;body:string;sentAt:string;clientMessageId:string}
const databaseMessages={
  list:async()=>(await accountApi.request.get<DatabaseConversation[]>('/conversations')).data,
  messages:async(id:string)=>(await accountApi.request.get<DatabaseMessage[]>(`/conversations/${id}/messages`)).data,
  direct:async(name:string)=>{
    const users=await accountApi.search(name),user=users.find(u=>u.name===name||u.publicId===name)
    if(!user)throw new Error('Không tìm thấy người chơi.')
    return (await accountApi.request.post<{id:string}>('/conversations',{members:[user.id]})).data.id
  },
  group:async(title:string,names:string[])=>{
    const members=await Promise.all(names.map(async name=>{const users=await accountApi.search(name),user=users.find(u=>u.name===name);if(!user)throw new Error('Không tìm thấy thành viên.');return user.id}))
    return (await accountApi.request.post<{id:string}>('/conversations',{title,members})).data.id
  },
  send:async(id:string,body:string,clientMessageId:string)=>{await accountApi.request.post(`/conversations/${id}/messages`,{body,clientMessageId})},
  sendImage:async(id:string,image:string,clientMessageId:string)=>{await accountApi.request.post(`/conversations/${id}/images`,{image,clientMessageId})},
  member:async(id:string,action:string,value?:string)=>(await accountApi.request.patch<{pendingApproval?:boolean}>(`/conversations/${id}`,{action,value})).data,
}
export function useDatabaseMessages(){
  const queryClient = useQueryClient()
  return {...databaseMessages,
    social:()=>accountApi.social(),
    settings:async(id:string)=>(await accountApi.request.get<{approvalRequired:boolean}>(`/conversations/${id}/settings`)).data,
    blocked:async(id:string)=>(await accountApi.request.get<BlockedGroupMember[]>(`/conversations/${id}/blocked`)).data,
    manageMember:async(id:string,name:string,action:'block-member'|'unblock-member'|'promote-deputy'|'demote-deputy')=>{
      const endpoint=action==='unblock-member'?'blocked':'members'
      const candidates=(await accountApi.request.get<{id:string;name:string}[]>(`/conversations/${id}/${endpoint}`)).data
      const target=candidates.find(member=>member.name===name)
      if(!target)throw new Error('Không tìm thấy thành viên.')
      await databaseMessages.member(id,action,target.id)
    },
    pending:async(id:string)=>(await accountApi.request.get<PendingGroupMember[]>(`/conversations/${id}/pending`)).data,
    setApproval:async(id:string,approvalRequired:boolean)=>{await accountApi.request.patch(`/conversations/${id}/settings`,{approvalRequired})},
    invite:async(id:string,name:string)=>{
      const users=await accountApi.search(name),target=users.find(user=>user.name===name)
      if(!target)throw new Error('Không tìm thấy người chơi.')
      return databaseMessages.member(id,'add',target.id)
    },
    members:async(id:string)=>(await accountApi.request.get<{id:string;name:string;role:string}[]>(`/conversations/${id}/members`)).data,
    transferOwner:async(id:string,name:string)=>{
      const members=(await accountApi.request.get<{id:string;name:string;role:string}[]>(`/conversations/${id}/members`)).data
      const target=members.find(member=>member.name===name)
      if(!target)throw new Error('Người chơi không còn trong nhóm.')
      await databaseMessages.member(id,'transfer-owner',target.id)
    },
    removeMember:async(id:string,name:string)=>{
      const members=(await accountApi.request.get<{id:string;name:string;role:string}[]>(`/conversations/${id}/members`)).data
      const target=members.find(member=>member.name===name)
      if(!target)throw new Error('Người chơi không còn trong nhóm.')
      await databaseMessages.member(id,'remove',target.id)
    },
    read:async(id:string,messageId:string)=>{await accountApi.request.post(`/conversations/${id}/read`,{messageId});void queryClient.invalidateQueries({queryKey:['message-unread-total']})},
    block:async(targetId:string,enabled:boolean)=>{await accountApi.socialAction({targetId,action:'message-block',enabled})},
    mute:async(id:string,hours:number|null)=>{await accountApi.request.patch(`/conversations/${id}/mute`,{hours})},
    avatar:async(id:string,image:string)=>(await accountApi.request.patch<{url:string}>(`/conversations/${id}/avatar`,{image})).data.url,
    title:async(id:string,title:string)=>{await accountApi.request.patch(`/conversations/${id}/title`,{title})},
  }
}

export function useUnreadMessageCount() {
  const accountId = useSessionStore(state => state.account?.id)
  const { data } = useQuery({
    queryKey: ['message-unread-total', accountId],
    queryFn: databaseMessages.list,
    enabled: !!accountId,
    refetchInterval: 4000,
  })
  return accountId ? (data ?? []).reduce((total, conversation) => total + Math.max(0, Number(conversation.unreadCount) || 0), 0) : 0
}
