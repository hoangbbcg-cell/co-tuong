import { create } from 'zustand'
import { accountApi } from '../services/accountApi'
import { useSessionStore } from './sessionStore'
let socialSearchVersion=0
export interface SocialUser {id:string;publicId:string;name:string;status?:string;requestedBy?:string;elo?:number;online?:boolean;avatarCode?:string;avatarFrameCode?:string}
export const useSocialStore=create<{users:SocialUser[];friends:SocialUser[];follows:string[];blocks:string[];refresh:()=>Promise<void>;search:(q:string)=>Promise<void>;action:(target:string,action:string,enabled?:boolean)=>Promise<void>}>((set,get)=>({
  users:[],friends:[],follows:[],blocks:[],
  refresh:async()=>{const s=await accountApi.social();set({friends:s.friends,follows:s.follows.map(x=>x.id),blocks:s.blocks.map(x=>x.id)})},
  search:async(q)=>{const version=++socialSearchVersion;const query=q.trim();const users=query?await accountApi.search(query):await accountApi.suggestions();if(version===socialSearchVersion)set({users})},
  action:async(target,action,enabled)=>{const user=[...get().users,...get().friends].find(u=>u.name===target||u.id===target);if(!user)throw new Error('Không tìm thấy người chơi.');await accountApi.socialAction({targetId:user.id,action,enabled});await get().refresh()},
}))
export async function socialActionByName(name:string,action:string,enabled?:boolean){
  let user=[...useSocialStore.getState().users,...useSocialStore.getState().friends].find(u=>u.name===name)
  if(!user){const list=await accountApi.search(name);user=list.find(u=>u.name===name);if(user)useSocialStore.setState({users:[...useSocialStore.getState().users,user]})}
  if(!user)throw new Error('Không tìm thấy người chơi.')
  await accountApi.socialAction({targetId:user.id,action,enabled});await useSocialStore.getState().refresh()
}

