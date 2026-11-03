import './hovang-social-scroll-rail.css'

import './hovang-selection-lock.css'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { EntryGate } from './app/EntryGate'
import { startNativeFcmRegistration } from './services/nativeFcmClient'
import { startNativeFcmAccountBinding } from './services/nativeFcmAccountBinding'
import { Providers } from './app/providers'
import './app/styles/index.css'
const AdminPage = lazy(() => import('./pages/admin/AdminPage').then(module => ({ default: module.AdminPage })))
const MobilePreviewPage = lazy(() => import('./pages/preview/MobilePreviewPage').then(module => ({ default: module.MobilePreviewPage })))
import { DesktopCanvas } from './lib/desktopCanvas'

void startNativeFcmRegistration()
startNativeFcmAccountBinding()

const path = window.location.pathname.replace(/\/$/, '')
createRoot(document.getElementById('root')!).render(<StrictMode><Suspense fallback={null}>{path === '/mobile-preview'
  ? <MobilePreviewPage />
  : <DesktopCanvas><Providers>{path === '/admin' ? <AdminPage /> : <EntryGate />}</Providers></DesktopCanvas>}</Suspense></StrictMode>)
