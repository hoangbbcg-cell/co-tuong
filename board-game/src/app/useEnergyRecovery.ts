import { useEffect } from 'react'
import { useSessionStore } from '../store/sessionStore'
import { refreshAccount } from '../services/accountSession'
export function useEnergyRecovery() {
  useEffect(() => {
    let pending=false,last=0
    const recover = () => {
      if(!useSessionStore.getState().account){useSessionStore.getState().recoverEnergy();return}
      if(pending||Date.now()-last<5000)return
      pending=true;last=Date.now()
      void refreshAccount().catch(()=>{}).finally(()=>{pending=false})
    }
    recover()
    const timer = window.setInterval(recover, 1000)
    window.addEventListener('focus', recover)
    return () => { window.clearInterval(timer); window.removeEventListener('focus', recover) }
  }, [])
}
