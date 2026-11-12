if (!('ResizeObserver' in globalThis)) {
  class JSDOMResizeObserver implements ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(globalThis, 'ResizeObserver', { configurable: true, writable: true, value: JSDOMResizeObserver })
}