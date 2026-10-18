import { useEffect,useState } from 'react'
import type { AccountProfile } from '../../../types/account'
import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'
export function useDatabaseProfile(name:string,own:boolean,playerId?:string){
  const account=useSessionStore(s=>s.account)
  const [profile,setProfile]=useState<AccountProfile|null>(null)
  useEffect(()=>{setProfile(null);if(!account||own||!name)return;let active=true;void (async()=>{const id=playerId??(await accountApi.search(name)).find(u=>u.name===name)?.id;if(id){const p=(await accountApi.request.get<AccountProfile>(`/profiles/${id}`)).data;if(active)setProfile(p)}})().catch(()=>{});return()=>{active=false}},[name,own,account?.id,playerId])
  return own?account:profile
}
