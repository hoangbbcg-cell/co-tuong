/* HOVANG_MOBILE_MESSAGE_IMAGE_V3
 * Prepare camera/gallery images before submitting them as JSON data URLs.
 * Preserve GIF animation and avoid unsupported media being uploaded.
 */
export const isMessageImage = (value: string) =>
  /^\/media\/message-images\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.(jpg|png|webp|gif)$/.test(value)

const MAX_INPUT = 50 * 1024 * 1024
const MAX_OUTPUT = 700 * 1024
const MAX_EDGE = 1920

function readDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () =>
      typeof reader.result === 'string'
        ? resolve(reader.result)
        : reject(new Error('Kh\u00f4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c \u1ea3nh.'))
    reader.onerror = () =>
      reject(new Error('Kh\u00f4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c \u1ea3nh.'))
    reader.readAsDataURL(file)
  })
}

async function decodeImage(file: File): Promise<{
  width: number
  height: number
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void
  cleanup: () => void
}> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file)
      return {
        width: bitmap.width,
        height: bitmap.height,
        draw: (ctx, width, height) => ctx.drawImage(bitmap, 0, 0, width, height),
        cleanup: () => bitmap.close(),
      }
    } catch {
      // Some mobile WebViews do not support createImageBitmap for photos.
    }
  }

  const url = URL.createObjectURL(file)
  const image = new Image()

  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error(
        'Kh\u00f4ng m\u1edf \u0111\u01b0\u1ee3c \u0111\u1ecbnh d\u1ea1ng \u1ea3nh n\u00e0y. H\u00e3y ch\u1ecdn JPG ho\u1eb7c PNG.'
      ))
      image.src = url
    })

    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
      draw: (ctx, width, height) => ctx.drawImage(image, 0, 0, width, height),
      cleanup: () => URL.revokeObjectURL(url),
    }
  } catch (error) {
    URL.revokeObjectURL(url)
    throw error
  }
}

export async function prepareMessageImage(file: File): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error('\u1ea2nh \u0111\u00e3 ch\u1ecdn b\u1ecb tr\u1ed1ng.')
  }

  if (file.size > MAX_INPUT) {
    throw new Error('\u1ea2nh qu\u00e1 l\u1edbn. H\u00e3y ch\u1ecdn \u1ea3nh d\u01b0\u1edbi 50 MB.')
  }

  const type = file.type.toLowerCase()
  const supported = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  const couldBeImage = type.startsWith('image/') ||
    (!type && /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name))

  if (!couldBeImage) {
    throw new Error('Vui l\u00f2ng ch\u1ecdn m\u1ed9t t\u1ec7p \u1ea3nh.')
  }

  // An animated GIF must never be flattened to a still JPEG.
  if (type === 'image/gif' || (!type && /\.gif$/i.test(file.name))) {
    if (file.size > MAX_OUTPUT) {
      throw new Error('GIF qu\u00e1 l\u1edbn. H\u00e3y ch\u1ecdn GIF d\u01b0\u1edbi 700 KB.')
    }
    return readDataUrl(file)
  }


  const decoded = await decodeImage(file)

  try {
    if (decoded.width <= 0 || decoded.height <= 0) {
      throw new Error('K\u00edch th\u01b0\u1edbc \u1ea3nh kh\u00f4ng h\u1ee3p l\u1ec7.')
    }

    const ratio = Math.min(
      1,
      MAX_EDGE / Math.max(decoded.width, decoded.height)
    )

    let width = Math.max(1, Math.round(decoded.width * ratio))
    let height = Math.max(1, Math.round(decoded.height * ratio))

    for (let attempt = 0; attempt < 4; attempt++) {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Thi\u1ebft b\u1ecb kh\u00f4ng h\u1ed7 tr\u1ee3 x\u1eed l\u00fd \u1ea3nh.')
      }

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
      decoded.draw(ctx, width, height)

      const quality = Math.max(0.60, 0.88 - attempt * 0.09)
      const result = canvas.toDataURL('image/jpeg', quality)

      if (!result.startsWith('data:image/jpeg;base64,')) {
        throw new Error('Kh\u00f4ng chuy\u1ec3n \u0111\u01b0\u1ee3c \u1ea3nh sang JPEG.')
      }

      const estimatedBytes = Math.ceil(
        (result.length - result.indexOf(',') - 1) * 3 / 4
      )

      if (estimatedBytes <= MAX_OUTPUT) {
        return result
      }

      width = Math.max(1, Math.round(width * 0.75))
      height = Math.max(1, Math.round(height * 0.75))
    }

    throw new Error('\u1ea2nh v\u1eabn qu\u00e1 l\u1edbn sau khi n\u00e9n.')
  } finally {
    decoded.cleanup()
  }
}