import { App } from './App'
import { LoginPage } from '../pages/login/LoginPage'
import { useEntryStore } from '../store/entryStore'
import { useEffect } from 'react'

export function EntryGate() {
  const entry = useEntryStore(state => state.entry)
  const loading=useEntryStore(state=>state.loading)
  useEffect(()=>{void useEntryStore.getState().restore()},[])
  if(loading)return <main className="fixed inset-0 grid place-items-center bg-[#241007] text-[#ffe5a6]" role="status">Đang tải tài khoản...</main>
  return entry ? <App /> : <LoginPage />
}
