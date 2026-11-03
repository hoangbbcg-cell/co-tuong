const LATER_KEY = 'hovang-shortcut-later-until'
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000
const INSTALLED_DISPLAY = '(display-mode: standalone), (display-mode: fullscreen)'
type ShortcutStage = 'invitation' | 'instructions' | null

// The entry gate and card share this controller. No native install event is retained.
export function createLoadingInstallController(host: Window) {
  let loading = true
  let stage: ShortcutStage = 'invitation'
  let laterUntil = 0
  let installed = false
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach(listener => listener())
  const read = (key: string) => { try { return host.localStorage.getItem(key) } catch { return null } }
  const write = (key: string, value: string) => { try { host.localStorage.setItem(key, value) } catch { /* Retain session cooldown. */ } }
  const standalone = () => host.matchMedia?.(INSTALLED_DISPLAY).matches ||
    (host.navigator as Navigator & { standalone?: boolean }).standalone === true
  const eligible = () => {
    const nav = host.navigator as Navigator & { brave?: unknown; userAgentData?: { brands: { brand: string }[] } }
    return /Android/i.test(nav.userAgent) && /Chrome\/\d+/i.test(nav.userAgent) &&
      nav.vendor === 'Google Inc.' && !nav.brave &&
      !/EdgA|OPR|SamsungBrowser|YaBrowser|UCBrowser|DuckDuckGo|Vivaldi|; wv\)/i.test(nav.userAgent) &&
      !nav.userAgentData?.brands.some(({ brand }) => /Edge|Opera|Brave|Samsung/i.test(brand))
  }
  const blocked = () => installed || standalone() || Math.max(laterUntil, Number(read(LATER_KEY)) || 0) > Date.now()
  const snapshot = (): ShortcutStage => loading && eligible() && !blocked() ? stage : null
  const cancel = () => { stage = null; notify() }
  const finish = () => { laterUntil = Date.now() + SEVEN_DAYS; write(LATER_KEY, String(laterUntil)); cancel() }
  // Suppress automatic app-install promotion on Android; never invoke its prompt.
  const suppressInstallPromotion = (event: Event) => { if (eligible() && !standalone()) event.preventDefault() }
  const onInstalled = () => { installed = true; cancel() }
  const displayMode = host.matchMedia?.(INSTALLED_DISPLAY)
  const onMode = () => { if (standalone()) cancel() }
  host.addEventListener('beforeinstallprompt', suppressInstallPromotion)
  host.addEventListener('appinstalled', onInstalled)
  displayMode?.addEventListener?.('change', onMode)
  return {
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener) } },
    getSnapshot: snapshot,
    getGateSnapshot: () => snapshot() !== null,
    setLoading(value: boolean) { loading = value; notify() },
    cancel,
    later: finish,
    showInstructions() { if (snapshot() === 'invitation') { stage = 'instructions'; notify() } },
    closeInstructions: finish,
    dispose() {
      cancel()
      host.removeEventListener('beforeinstallprompt', suppressInstallPromotion)
      host.removeEventListener('appinstalled', onInstalled)
      displayMode?.removeEventListener?.('change', onMode)
      listeners.clear()
    },
  }
}

export const loadingInstall = createLoadingInstallController(window)