export function downloadScreenshotBlob(image: Blob): void {
  const imageUrl = URL.createObjectURL(image)
  const link = document.createElement('a')
  link.download = `co-tuong-${new Date().toISOString().replace(/[:.]/g, '-')}.png`
  link.href = imageUrl
  document.body.appendChild(link)
  try { link.click() } finally {
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(imageUrl), 1000)
  }
}
