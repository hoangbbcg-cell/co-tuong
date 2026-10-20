import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EntryGate } from './app/EntryGate'
import { Providers } from './app/providers'
import './app/styles/index.css'
import { AdminPage } from './pages/admin/AdminPage'
import { MobilePreviewPage } from './pages/preview/MobilePreviewPage'

const path = window.location.pathname.replace(/\/$/, '')
createRoot(document.getElementById('root')!).render(<StrictMode>{path === '/mobile-preview'
  ? <MobilePreviewPage />
  : <Providers>{path === '/admin' ? <AdminPage /> : <EntryGate />}</Providers>}</StrictMode>)
