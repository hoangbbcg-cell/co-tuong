import { useEffect } from 'react'
import { useSessionStore } from '../store/sessionStore'
export function useEnergyRecovery() {
  useEffect(() => {
    const recover = () => useSessionStore.getState().recoverEnergy()
    recover()
    const timer = window.setInterval(recover, 1000)
    window.addEventListener('focus', recover)
    return () => { window.clearInterval(timer); window.removeEventListener('focus', recover) }
  }, [])
}
