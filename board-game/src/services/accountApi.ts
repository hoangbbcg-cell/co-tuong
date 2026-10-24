import axios from 'axios'
import type { AccountProfile } from '../types/account'
import type { TestBotSnapshot } from '../types/testBot'
import type { GameVariant, Move } from '../types/game'
import type { RecordedMatch } from '../types/recordedMatch'
import type { SavedPosition } from '../store/savedPositionsStore'
const api=axios.create({baseURL:'/api/account',timeout:15000})
export const accountApi={
  testBotStart:async(variant:GameVariant)=>(await api.post<TestBotSnapshot>('/test-bot',{variant})).data,
  testBotMove:async(id:string,move:Move,requestId:string)=>(await api.post<TestBotSnapshot>(`/test-bot/${id}/move`,{move,requestId})).data,
  me:async()=>(await api.get<AccountProfile>('/me')).data,
  guest:async()=>(await api.post<AccountProfile>('/guest')).data,
  restoreGuest:async()=>(await api.post<AccountProfile>('/guest/restore')).data,
  googleNonce:async(link=false)=>(await api.post<{nonce:string}>('/google/nonce',{link})).data.nonce,
  google:async(credential:string)=>(await api.post<AccountProfile>('/google',{credential})).data,
  logout:async()=>{await api.post('/logout')},
  rename:async(name:string)=>{await api.patch('/name',{name})},
  location:async(input:unknown)=>{await api.patch('/location',input)},
  avatar:async(avatarCode:string,avatarFrameCode:string)=>{await api.patch('/avatar',{avatarCode,avatarFrameCode})},
  purchase:async(productId:string,requestId:string)=>(await api.post<AccountProfile>('/shop/purchase',{productId,requestId})).data,
  history:async(saved=false)=>(await api.get<RecordedMatch[]>(saved?'/saved-matches':'/history')).data,
  bookmark:async(id:string,enabled:boolean)=>{await api.put(`/saved-matches/${id}`,{enabled})},
  positions:async()=>(await api.get<(Omit<SavedPosition,'savedAt'>&{savedAt:string})[]>('/positions')).data,
  savePosition:async(position:SavedPosition)=>{await api.put('/positions',position)},
  removePosition:async(id:string)=>{await api.delete(`/positions/${id}`)},
  ranking:async(variant:string)=>(await api.get<{id:string;publicId:string;name:string;elo:number;online:boolean;avatarCode:string;avatarFrameCode:string}[]>('/ranking',{params:{variant}})).data,
  social:async()=>(await api.get<{friends:{id:string;name:string;publicId:string;status:string;requestedBy:string;elo:number;online:boolean;avatarCode:string;avatarFrameCode:string}[];follows:{id:string}[];blocks:{id:string}[]}>('/social')).data,
  socialAction:async(input:unknown)=>{await api.post('/social',input)},
  search:async(q:string)=>(await api.get<{id:string;publicId:string;name:string;elo:number;avatarCode:string;avatarFrameCode:string}[]>('/search',{params:{q}})).data,
  request:api,
}

