import './hovang-social-scroll-rail.css'
import { useSessionStore } from './store/sessionStore'
import { useGameStore } from './store/gameStore'

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
import { isJieqiComputerPath, JIEQI_COMPUTER_PATH } from './lib/computerPresentation'

void startNativeFcmRegistration()
startNativeFcmAccountBinding()

const path = window.location.pathname.replace(/\/$/, '')

// HOVANG_JIEQI_AUTO_V2
// Automatically enter the isolated Jieqi computer game.
if (isJieqiComputerPath(path)) {
  if (path !== JIEQI_COMPUTER_PATH) window.history.replaceState(window.history.state, '', JIEQI_COMPUTER_PATH + window.location.search + window.location.hash)
  try {
    const key = 'hovang-jieqi-start-v1'
    const saved = window.sessionStorage.getItem(key)

    if (saved) {
      window.sessionStorage.removeItem(key)

      const pending: unknown = JSON.parse(saved)

      if (pending && typeof pending === 'object') {
        const data = pending as Record<string, unknown>

        if (
          typeof crossOriginIsolated !== 'undefined' &&
          crossOriginIsolated &&
          (data.humanSide === 'red' || data.humanSide === 'black') &&
          typeof data.level === 'number' &&
          Number.isInteger(data.level) &&
          data.level >= 1 &&
          data.level <= 10 &&
          typeof data.expires === 'number' &&
          Date.now() <= data.expires
        ) {
          useGameStore.getState().reset(performance.now(), 'jieqi')
          useSessionStore.getState().joinLocal()

          useSessionStore.setState({
            mode: 'computer',
            humanSide: data.humanSide,
            computerEngine: 'pikaJieqi',
            computerLevel: data.level,
          })
        }
      }
    }
  } catch (error) {
    console.error('HOVANG Jieqi bootstrap:', error)
  }

  useSessionStore.subscribe((state, previous) => {
    if (
      previous.screen === 'game' &&
      previous.mode === 'computer' &&
      previous.computerEngine === 'pikaJieqi' &&
      state.screen === 'home'
    ) {
      window.location.replace('/')
    }
  })
}

createRoot(document.getElementById('root')!).render(<StrictMode><Suspense fallback={null}>{path === '/mobile-preview'
  ? <MobilePreviewPage />
  : <DesktopCanvas><Providers>{path === '/admin' ? <AdminPage /> : <EntryGate />}</Providers></DesktopCanvas>}</Suspense></StrictMode>)
