import { useSyncExternalStore } from 'react'
import { useSessionStore } from '../store/sessionStore'

const eventName = 'ai-controls-visibility-changed'
export function readAiControlsHidden(publicId: string) {
  try { return localStorage.getItem(`ai-controls-hidden:${publicId}`) === 'true' } catch { return false }
}
export function writeAiControlsHidden(publicId: string, hidden: boolean) {
  try { localStorage.setItem(`ai-controls-hidden:${publicId}`, String(hidden)) } catch { /* Keep controls visible if storage is unavailable. */ }
  window.dispatchEvent(new Event(eventName))
}
function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback)
  window.addEventListener('storage', callback)
  return () => { window.removeEventListener(eventName, callback); window.removeEventListener('storage', callback) }
}
export function useAiControlsHidden() {
  const publicId = useSessionStore(state => state.account?.publicId)
  const granted = useSessionStore(state => state.account?.aiControlsControl === true)
  return useSyncExternalStore(subscribe, () => !!(granted && publicId && readAiControlsHidden(publicId)), () => false)
}
