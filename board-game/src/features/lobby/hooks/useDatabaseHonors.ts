import { useEffect,useState } from 'react'
import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'
import { honorCode,honorUiId } from '../../../lib/honorIdentity'
export function useDatabaseHonors(name:string) {
  const account=useSessionStore(s=>s.account)
  const [owned,setOwned]=useState<{code:string;selected:number}[]>([])
  const [counts,setCounts]=useState<Record<string,number>>({})
  useEffect(()=>{setOwned([]);setCounts({});if(!account)return;let active=true;const load=async()=>{
    const id=name===account.displayName?account.id:(await accountApi.search(name)).find(u=>u.name===name)?.id
    if(!id)return
    const data=(await accountApi.request.get<{owned:{code:string;selected:number}[];endorsements:{code:string;count:number}[]}>(`/honors/${id}`)).data
    if(active){setOwned(data.owned);setCounts(Object.fromEntries(data.endorsements.map(e=>[e.code,Number(e.count)])))}
  };void load().catch(()=>{});let pending=false;const refresh=async()=>{if(pending||document.visibilityState==='hidden')return;pending=true;try{await load()}catch{}finally{pending=false}};const timer=setInterval(()=>{void refresh()},5000);const onVisible=()=>{if(document.visibilityState==='visible')void refresh()};document.addEventListener('visibilitychange',onVisible);return()=>{active=false;clearInterval(timer);document.removeEventListener('visibilitychange',onVisible)}},[account?.id,name])
  return {ownedIds:owned.map(h=>honorUiId(h.code)),selectedIds:owned.filter(h=>Number(h.selected)===1).map(h=>honorUiId(h.code)),counts,select:async(ids:string[])=>{await accountApi.request.put('/honors',{codes:ids.map(honorCode)});setOwned(current=>current.map(h=>({...h,selected:ids.includes(honorUiId(h.code))?1:0})))}}
}
