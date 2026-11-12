import { useLayoutEffect, useState, useSyncExternalStore } from 'react'
import { loadingInstall } from './loadingInstall'
import { GameLoadingScreen } from './GameLoadingScreen'
import { App } from './App'
import { LoginPage } from '../pages/login/LoginPage'
import { useEntryStore } from '../store/entryStore'
import { useEffect } from 'react'

export function EntryGate({ installController = loadingInstall }: { installController?: typeof loadingInstall }) {
  const [minLoadingElapsed, setMinLoadingElapsed] = useState(false)
  const installPending = useSyncExternalStore(installController.subscribe, installController.getGateSnapshot, () => false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMinLoadingElapsed(true)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [])
  const entry = useEntryStore(state => state.entry)
  const loading=useEntryStore(state=>state.loading)
  const restoreError=useEntryStore(state=>state.restoreError)
  useEffect(()=>{void useEntryStore.getState().restore()},[])
  useLayoutEffect(() => {
    if (restoreError) installController.cancel()
    else if (!loading && minLoadingElapsed && !installPending) installController.setLoading(false)
  }, [installController, loading, minLoadingElapsed, installPending, restoreError])
  if (loading || (!minLoadingElapsed && !restoreError) || (!restoreError && installPending)) return <GameLoadingScreen installInvitationAllowed={!restoreError} installController={installController} />
  if(restoreError)return <main className="fixed inset-0 grid place-items-center bg-[#241007] p-5 text-[#ffe5a6]">
    <section role="alert" className="max-w-md text-center">
      <h1 className="mb-3 text-xl font-bold">Chưa tải được tài khoản</h1>
      <p>{restoreError}</p>
      <p className="mt-2">Hãy thử kết nối lại để tiếp tục tài khoản đang dùng.</p>
      <button type="button" className="mt-5 cursor-pointer rounded-lg border border-[#ffe08b] bg-[#613014] px-6 py-3 font-bold" onClick={()=>void useEntryStore.getState().restore()}>Thử lại</button>
    </section>
  </main>
  return entry ? <App /> : <LoginPage />
}
