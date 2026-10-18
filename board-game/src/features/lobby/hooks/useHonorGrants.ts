import { useEffect, useState } from 'react'
import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'

const STORAGE_KEY = 'co-tuong-honor-grants-v1'
const GRANTS_CHANGED_EVENT = 'co-tuong-honor-grants-changed'
type HonorGrants = Record<string, string[]>

function loadGrants(): HonorGrants {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {}
    return Object.fromEntries(Object.entries(stored).filter(([, ids]) => Array.isArray(ids)).map(([name, ids]) => [name, [...new Set((ids as unknown[]).filter((id): id is string => typeof id === 'string' && /^pt_[1-5]_/.test(id)))]]))
  } catch {
    return {}
  }
}

const recipientKey = (name: string) => name.normalize('NFC').trim().toLocaleLowerCase('vi')

/** Local profile grants persist across room changes and browser reloads. */
export function useHonorGrants(targetName?:string) {
  const account=useSessionStore(s=>s.account)
  const [grants, setGrants] = useState<HonorGrants>(()=>useSessionStore.getState().account?{}:loadGrants())
  const [counts,setCounts]=useState<Record<string,Record<string,number>>>({})
  useEffect(()=>{
    if(!account||!targetName)return
    let active=true
    const load=async()=>{
      const user=targetName===account.displayName?account:(await accountApi.search(targetName)).find(u=>u.name===targetName)
      if(!user)return
      const data=(await accountApi.request.get<{endorsements:{code:string;count:number;granted:number}[]}>(`/honors/${user.id}`)).data
      if(active){setGrants(current=>({...current,[recipientKey(targetName)]:data.endorsements.filter(e=>Number(e.granted)===1).map(e=>e.code)}));setCounts(current=>({...current,[recipientKey(targetName)]:Object.fromEntries(data.endorsements.map(e=>[e.code,Number(e.count)]))}))}
    }
    void load().catch(()=>{});const timer=setInterval(()=>{void load().catch(()=>{})},5000);return()=>{active=false;clearInterval(timer)}
  },[account?.id,targetName])
  useEffect(() => {
    if(account)return
    const sync = (event: StorageEvent) => { if (event.key === STORAGE_KEY || event.key === null) setGrants(loadGrants()) }
    const syncCurrentPage = () => setGrants(loadGrants())
    window.addEventListener('storage', sync)
    window.addEventListener(GRANTS_CHANGED_EVENT, syncCurrentPage)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(GRANTS_CHANGED_EVENT, syncCurrentPage)
    }
  }, [account?.id])
  const getGrantedHonorIds = (name: string) => grants[recipientKey(name)] ?? []
  const toggleGrant = async (name: string, honorId: string): Promise<boolean> => {
    if(account){
      const user=(await accountApi.search(name)).find(u=>u.name===name)
      if(!user)throw new Error('Không tìm thấy người chơi.')
      const profile=(await accountApi.request.get<{endorsements:{code:string;granted:number}[]}>(`/honors/${user.id}`)).data
      const granting=!profile.endorsements.some(e=>e.code===honorId&&Number(e.granted)===1)
      await accountApi.request.put('/honors/endorse',{targetId:user.id,code:honorId,enabled:granting})
      setGrants(current=>({...current,[recipientKey(name)]:granting?[...(current[recipientKey(name)]??[]),honorId]:(current[recipientKey(name)]??[]).filter(id=>id!==honorId)}))
      return granting
    }
    // Read storage at action time so reopened panels and other tabs cannot add duplicates.
    const current = loadGrants()
    const key = recipientKey(name)
    const ids = current[key] ?? []
    const granting = !ids.includes(honorId)
    const next = { ...current, [key]: granting ? [...ids, honorId] : ids.filter(id => id !== honorId) }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setGrants(next)
    window.dispatchEvent(new Event(GRANTS_CHANGED_EVENT))
    return granting
  }
  const getGrantCount = (name: string, honorId: string) => account?counts[recipientKey(name)]?.[honorId]??0:getGrantedHonorIds(name).includes(honorId) ? 1 : 0
  return { getGrantedHonorIds, getGrantCount, toggleGrant }
}
