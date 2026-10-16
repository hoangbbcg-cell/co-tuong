import { App } from './App'
import { LoginPage } from '../pages/login/LoginPage'
import { useEntryStore } from '../store/entryStore'

export function EntryGate() {
  const entry = useEntryStore(state => state.entry)
  return entry ? <App /> : <LoginPage />
}
