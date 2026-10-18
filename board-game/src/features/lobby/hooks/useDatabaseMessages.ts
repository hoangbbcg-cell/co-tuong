import { accountApi } from '../../../services/accountApi'
export interface DatabaseConversation {id:string;type:string;title:string|null;avatarUrl:string|null;nickname:string|null;peerId:string|null;peerName:string|null;lastMessageAt:string|null;preview:string|null;unreadCount:number;mutedUntil:string|null;mutedIndefinitely:number}
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
  member:async(id:string,action:string,value?:string)=>{await accountApi.request.patch(`/conversations/${id}`,{action,value})},
}
export function useDatabaseMessages(){
  return {...databaseMessages,
    social:()=>accountApi.social(),
    members:async(id:string)=>(await accountApi.request.get<{id:string;name:string;role:string}[]>(`/conversations/${id}/members`)).data,
    read:async(id:string,messageId:string)=>{await accountApi.request.post(`/conversations/${id}/read`,{messageId})},
    block:async(targetId:string,enabled:boolean)=>{await accountApi.socialAction({targetId,action:'message-block',enabled})},
    mute:async(id:string,hours:number|null)=>{await accountApi.request.patch(`/conversations/${id}/mute`,{hours})},
    avatar:async(id:string,image:string)=>(await accountApi.request.patch<{url:string}>(`/conversations/${id}/avatar`,{image})).data.url,
    title:async(id:string,title:string)=>{await accountApi.request.patch(`/conversations/${id}/title`,{title})},
  }
}

