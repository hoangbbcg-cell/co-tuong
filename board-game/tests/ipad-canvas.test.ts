// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { fitIPadCanvas, isIPadDevice, isPhoneDevice, mountIPadCanvas } from '../src/ipadCanvas'

afterEach(() => { document.body.replaceChildren(); vi.unstubAllGlobals() })

describe('isolated iPad canvas', () => {
  it.each([
    ['iPad', 'iPad', 5, true],
    ['Mozilla Macintosh Mobile Safari', 'MacIntel', 5, true],
    ['Mozilla Macintosh Mobile Safari', 'MacIntel', 0, true],
    ['Mozilla Macintosh Safari', 'MacIntel', 0, false],
    ['Mozilla Macintosh Safari', 'MacIntel', 5, true],
    ['iPhone', 'iPhone', 5, false],
    ['Android', 'Linux armv8l', 5, false],
    ['Windows', 'Win32', 10, false],
  ])('recognizes %s / %s without selecting phones or laptops', (userAgent, platform, maxTouchPoints, expected) => {
    expect(isIPadDevice({ userAgent, platform, maxTouchPoints })).toBe(expected)
  })

  it.each(['iPhone','iPod','Android','Windows', 'Mozilla Macintosh Safari'])('identifies phone/browser agents separately: %s', userAgent => {
    expect(isPhoneDevice({userAgent})).toBe(/iPhone|iPod|Android/i.test(userAgent))
  })

  it.each([[768, 1024], [1024, 768], [744, 1050], [1366, 1024], [1024, 500]])('covers both limits uniformly at %s × %s', (width, height) => {
    const fit = fitIPadCanvas(width, height)
    expect(fit.width).toBeGreaterThanOrEqual(width - 1e-9)
    expect(fit.height).toBeGreaterThanOrEqual(height - 1e-9)
    expect(fit.width / fit.height).toBeCloseTo(1493 / 731)
    expect(Math.max(width - fit.width, height - fit.height)).toBeCloseTo(0)
  })

  it('keeps the same browsing context and URL through orientation updates', () => {
    document.body.innerHTML = '<div id="root"></div>'
    const disconnect = vi.fn()
    vi.stubGlobal('ResizeObserver', class { observe() {} disconnect = disconnect })
    mountIPadCanvas()
    const frame = document.querySelector<HTMLIFrameElement>('iframe')!
    const child = frame.contentWindow
    const source = frame.src
    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('resize'))
    expect(document.querySelectorAll('iframe')).toHaveLength(1)
    expect(frame.contentWindow).toBe(child)
    expect(frame.src).toBe(source)
    expect(frame.style.width).toBe('1493px')
    expect(frame.style.height).toBe('731px')
    expect(frame.style.left).toBe('50%')
    expect(frame.style.top).toBe('50%')
    expect(frame.style.transformOrigin).toBe('center')
    expect(frame.style.transform).toContain('translate(-50%, -50%) scale(')
    expect(document.getElementById('ipad-canvas-viewport')!.style.overflow).toBe('hidden')
    window.dispatchEvent(new PageTransitionEvent('pagehide'))
    expect(disconnect).toHaveBeenCalledOnce()
  })
})
