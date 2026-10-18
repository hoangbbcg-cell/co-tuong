import { create } from 'zustand'
import { ENTRY_STORAGE_KEY } from '../lib/guestIdentity'
import type { GuestEntry } from '../lib/guestIdentity'
import { useSessionStore } from './sessionStore'
import { accountApi } from '../services/accountApi'
import { loadAccountData } from '../services/accountSession'
import { socket } from '../services/socket'
import axios from 'axios'
export { ENTRY_STORAGE_KEY, readGuestEntry } from '../lib/guestIdentity'
let restoreInFlight: Promise<void> | null = null

/** Browser entry preference only; never use this as server authentication. */
export const useEntryStore = create<{
  entry: GuestEntry | null
  loading:boolean
  restore:()=>Promise<void>
  enterGuest: () => Promise<void>
  enterGoogle: (credential:string) => Promise<void>
  signOut: () => Promise<void>
}>((set, get) => ({
  entry:null,loading:true,
  enterGoogle:async(credential)=>{
    const profile=await accountApi.google(credential)
    const connected=socket.connected
    socket.disconnect()
    await loadAccountData(profile)
    set({entry:{version:1,provider:'guest',name:profile.displayName}})
    if(connected)socket.connect()
  },
  restore:()=>{
    if(restoreInFlight)return restoreInFlight
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
      } catch {set({entry:null})} finally {set({loading:false})}
    })().finally(()=>{restoreInFlight=null})
    return restoreInFlight
  },
  enterGuest: async () => {
    const profile=await accountApi.guest()
    await loadAccountData(profile)
    const entry: GuestEntry = { version: 1, provider: 'guest', name: profile.displayName }
    try{localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify(entry))}catch{/* Authentication is held by the server cookie. */}
    useSessionStore.getState().setName(entry.name)
    set({ entry })
  },
  signOut: async () => {
    await accountApi.logout()
    window.google?.accounts.id.disableAutoSelect()
    const entry = get().entry
    try{if (entry) localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify({ ...entry, signedOut: true }))}catch{/* Session already revoked by the backend. */}
    set({ entry: null })
    useSessionStore.setState({account:null})
  },
}))
