import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EntryGate } from './app/EntryGate'
import { Providers } from './app/providers'
import './app/styles/index.css'
import { AdminPage } from './pages/admin/AdminPage'

createRoot(document.getElementById('root')!).render(<StrictMode><Providers>{window.location.pathname === '/admin' || window.location.pathname === '/admin/' ? <AdminPage /> : <EntryGate />}</Providers></StrictMode>)
