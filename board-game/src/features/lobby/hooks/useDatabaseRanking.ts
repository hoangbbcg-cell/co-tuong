import { RANKING_PLAYER_LIMIT } from '../../../lib/rankingLimits'
import { useEffect,useState } from 'react'
import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'
export function useDatabaseRanking(mode:string){
  const account=useSessionStore(s=>s.account)
  const [players,setPlayers]=useState<{id:string;name:string;online:boolean;playing:string;elo:string;avatarCode:string;avatarFrameCode:string}[]>([])
  useEffect(()=>{if(!account)return;let active=true;const load=()=>accountApi.ranking(mode==='hidden'?'jieqi':'xiangqi').then(list=>{if(active)setPlayers(list.slice(0,RANKING_PLAYER_LIMIT).map(p=>({...p,playing:p.online?'Đang online':'Offline',elo:String(p.elo)})))}).catch(()=>{});void load();let pending=false;const refresh=async()=>{if(pending||document.visibilityState==='hidden')return;pending=true;try{await load()}finally{pending=false}};const timer=setInterval(()=>{void refresh()},15000);const onVisible=()=>{if(document.visibilityState==='visible')void refresh()};document.addEventListener('visibilitychange',onVisible);return()=>{active=false;clearInterval(timer);document.removeEventListener('visibilitychange',onVisible)}},[account?.id,mode])
  return players
}
