import { useEffect,useState } from 'react'
import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'
import { honorCode,honorUiId } from '../../../lib/honorIdentity'
export function useDatabaseHonors(name:string) {
  const account=useSessionStore(s=>s.account)
  const [owned,setOwned]=useState<{code:string;selected:number}[]>([])
  const [counts,setCounts]=useState<Record<string,number>>({})
  useEffect(()=>{if(!account)return;let active=true;const load=async()=>{
    const id=name===account.displayName?account.id:(await accountApi.search(name)).find(u=>u.name===name)?.id
    if(!id)return
    const data=(await accountApi.request.get<{owned:{code:string;selected:number}[];endorsements:{code:string;count:number}[]}>(`/honors/${id}`)).data
    if(active){setOwned(data.owned);setCounts(Object.fromEntries(data.endorsements.map(e=>[e.code,Number(e.count)])))}
  };void load().catch(()=>{});const timer=setInterval(()=>{void load().catch(()=>{})},5000);return()=>{active=false;clearInterval(timer)}},[account?.id,name])
  return {ownedIds:owned.map(h=>honorUiId(h.code)),selectedIds:owned.filter(h=>Number(h.selected)===1).map(h=>honorUiId(h.code)),counts,select:async(ids:string[])=>{await accountApi.request.put('/honors',{codes:ids.map(honorCode)});setOwned(current=>current.map(h=>({...h,selected:ids.includes(honorUiId(h.code))?1:0})))}}
}
