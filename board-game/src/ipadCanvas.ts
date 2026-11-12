import bambooBackground from './assets/backgrounds/home.png'
import { DESKTOP_CANVAS_HEIGHT, DESKTOP_CANVAS_WIDTH } from './lib/desktopCanvas'

// iPadOS can identify itself as a Mac when requesting desktop websites.
// Viewport width alone must never select phones or laptops.
export function isIPadDevice(device: Pick<Navigator, 'userAgent' | 'platform' | 'maxTouchPoints'>) {
  return /iPad/.test(device.userAgent)
    || (/Mac/.test(device.platform) && (device.maxTouchPoints > 1 || (/Mobile/.test(device.userAgent) && /Safari/.test(device.userAgent))))
}

export function isPhoneDevice(device: Pick<Navigator, 'userAgent'>) {
  return /iPhone|iPod|Android/i.test(device.userAgent)
}

export function shouldUseIPadCanvas() {
  return window.self === window.top
    && !['/mobile-preview', '/admin'].includes(window.location.pathname.replace(/\/$/, ''))
    && !isPhoneDevice(window.navigator)
    && isIPadDevice(window.navigator)
}

// One rigid scene covers the viewport; centered excess is clipped by the host.
export function fitIPadCanvas(width: number, height: number) {
  const scale = Math.max(0, width / DESKTOP_CANVAS_WIDTH, height / DESKTOP_CANVAS_HEIGHT)
  return { scale, width: DESKTOP_CANVAS_WIDTH * scale, height: DESKTOP_CANVAS_HEIGHT * scale }
}

// The same-origin child supplies one stable viewport to CSS and JS. Native hit
// testing maps touches through the transform; body portals stay inside it.
// Only the child imports appBootstrap; the host starts no account/socket/app.
export function mountIPadCanvas() {
  const root = document.getElementById('root')!
  const host = document.createElement('div')
  host.id = 'ipad-canvas-viewport'
  host.style.cssText = 'position:fixed;overflow:hidden;box-sizing:border-box;background-position:center;background-size:cover;background-repeat:no-repeat;'
  host.style.backgroundImage = `url("${bambooBackground}")`
  const safeArea = document.createElement('div')
  safeArea.style.cssText = 'position:absolute;inset:0;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);box-sizing:border-box;pointer-events:none;'
  const available = document.createElement('div')
  available.style.cssText = 'position:relative;width:100%;height:100%;'
  const frame = document.createElement('iframe')
  frame.id = 'ipad-app-canvas'
  frame.title = 'HOVANG — iPad'
  frame.src = window.location.href
  frame.allow = 'fullscreen; autoplay'
  frame.style.cssText = `position:absolute;left:50%;top:50%;width:${DESKTOP_CANVAS_WIDTH}px;height:${DESKTOP_CANVAS_HEIGHT}px;border:0;transform-origin:center;pointer-events:auto;`
  safeArea.append(available)
  host.append(safeArea)
  root.append(host)

  const resize = () => {
    const viewport = window.visualViewport
    host.style.left = `${viewport?.offsetLeft ?? 0}px`
    host.style.top = `${viewport?.offsetTop ?? 0}px`
    host.style.width = `${viewport?.width ?? window.innerWidth}px`
    host.style.height = `${viewport?.height ?? window.innerHeight}px`
    const fit = fitIPadCanvas(available.clientWidth, available.clientHeight)
    frame.style.transform = `translate(-50%, -50%) scale(${fit.scale})`
  }
  // Attach once; rotation and keyboard updates never navigate the running app.
  available.append(frame)
  window.addEventListener('resize', resize)
  window.visualViewport?.addEventListener('resize', resize)
  window.visualViewport?.addEventListener('scroll', resize)
  const observer = new ResizeObserver(resize)
  observer.observe(available)
  resize()
  window.addEventListener('pagehide', event => {
    if (event.persisted) return
    observer.disconnect()
    window.removeEventListener('resize', resize)
    window.visualViewport?.removeEventListener('resize', resize)
    window.visualViewport?.removeEventListener('scroll', resize)
  }, { once: true })
}
