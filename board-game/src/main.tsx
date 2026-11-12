import { mountIPadCanvas, shouldUseIPadCanvas } from './ipadCanvas'

if (shouldUseIPadCanvas()) {
  mountIPadCanvas()
} else {
  void import('./appBootstrap').catch(() => {
    window.dispatchEvent(new Event('hovang:startup-error'))
  })
}
