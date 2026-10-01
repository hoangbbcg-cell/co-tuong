// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { downloadScreenshotBlob } from '../src/lib/downloadScreenshot'

describe('downloadScreenshotBlob', () => {
  afterEach(() => {
    document.body.replaceChildren()
    vi.restoreAllMocks()
  })

  it('downloads a prepared PNG blob and schedules its object URL for revocation', () => {
    const image = new Blob(['screenshot'], { type: 'image/png' })
    const createObjectURL = vi.fn(() => 'blob:game-screen')
    const revokeObjectURL = vi.fn()
    vi.stubGlobal('URL', { ...URL, createObjectURL, revokeObjectURL })
    let downloadedFile = ''
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      downloadedFile = this.download
    })

    downloadScreenshotBlob(image)

    expect(createObjectURL).toHaveBeenCalledWith(image)
    expect(downloadedFile).toMatch(/^co-tuong-.+\.png$/)
    expect(document.querySelector('a[download]')).toBeNull()
    expect(revokeObjectURL).not.toHaveBeenCalled()
  })
})
