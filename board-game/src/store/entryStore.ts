import { create } from 'zustand'
import { ENTRY_STORAGE_KEY } from '../lib/guestIdentity'
import type { GuestEntry } from '../lib/guestIdentity'
import { useSessionStore } from './sessionStore'
import { accountApi } from '../services/accountApi'
import { loadAccountData } from '../services/accountSession'
import { socket } from '../services/socket'
import axios from 'axios'
import { errorMessage } from '../services/api'
export { ENTRY_STORAGE_KEY, readGuestEntry } from '../lib/guestIdentity'
let restoreInFlight: Promise<void> | null = null

/** Browser entry preference only; never use this as server authentication. */
export const useEntryStore = create<{
  entry: GuestEntry | null
  loading:boolean
  restoreError:string
  restore:()=>Promise<void>
  enterGuest: () => Promise<void>
  enterGoogle: (credential:string) => Promise<void>
  signOut: () => Promise<void>
}>((set, get) => ({
  entry:null,loading:true,restoreError:'',
  enterGoogle:async(credential)=>{
    const profile=await accountApi.google(credential)
    const connected=socket.connected
    socket.disconnect()
    await loadAccountData(profile)
    set({entry:{version:1,provider:'guest',name:profile.displayName},restoreError:''})
    if(connected)socket.connect()
  },
  restore:()=>{
    if(restoreInFlight)return restoreInFlight
    set({loading:true,restoreError:''})
    restoreInFlight=(async()=>{
      try {
        const profile=await accountApi.me().catch(error=>{
          if(!axios.isAxiosError(error)||error.response?.status!==401)throw error
          return accountApi.restoreGuest()
        })
        await loadAccountData(profile)
        const entry:GuestEntry={version:1,provider:'guest',name:profile.displayName}
        try{localStorage.setItem(ENTRY_STORAGE_KEY,JSON.stringify(entry))}catch{/* Cookies remain authoritative. */}
        set({entry})
      } catch(error) {
        if(axios.isAxiosError(error)&&error.response?.status===401)set({entry:null})
        else set({restoreError:errorMessage(error)})
      } finally {set({loading:false})}
    })().finally(()=>{restoreInFlight=null})
    return restoreInFlight
  },
  enterGuest: async () => {
    const profile=await accountApi.guest()
    await loadAccountData(profile)
    const entry: GuestEntry = { version: 1, provider: 'guest', name: profile.displayName }
    try{localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify(entry))}catch{/* Authentication is held by the server cookie. */}
    useSessionStore.getState().setName(entry.name)
    set({ entry,restoreError:'' })
  },
  signOut: async () => {
    await accountApi.logout()
    window.google?.accounts.id.disableAutoSelect()
    const entry = get().entry
    try{if (entry) localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify({ ...entry, signedOut: true }))}catch{/* Session already revoked by the backend. */}
    set({ entry: null,restoreError:'' })
    useSessionStore.setState({account:null})
  },
}))
