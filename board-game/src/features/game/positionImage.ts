import { CHESS_PIECE_ARTWORK, pieceColorFilter } from './components/ChessPiece'
import { emptyPosition, POSITION_PIECES, positionPiece } from '../../game/state/customPosition'
import type { PieceType, Side } from '../../types/game'
import { BOARD_COLUMNS, BOARD_ROWS } from './boardGeometry'

export interface ImagePoint { x: number; y: number }
export function loadPositionImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Không đọc được ảnh. Hãy chọn ảnh PNG/JPEG/WebP.'))
    image.src = source
  })
}
// Template matching stays on-device. Only clear screenshots using this game's
// piece artwork are supported; the editable result is never started automatically.
function ink(data: Uint8ClampedArray) {
  const brightness = Array.from({ length: data.length / 4 }, (_, i) => .299 * data[i * 4] + .587 * data[i * 4 + 1] + .114 * data[i * 4 + 2])
  const median = [...brightness].sort((a, b) => a - b)[Math.floor(brightness.length / 2)]
  const mask = brightness.map(value => value < median - 35)
  let chroma = 0, count = 0
  mask.forEach((value, i) => {
    if (!value) return
    count++
    const offset = i * 4
    chroma += data[offset] - data[offset + 1]
  })
  return { mask, count, chroma: chroma / Math.max(1, count) }
}

export async function recognizePosition(image: HTMLImageElement, first: ImagePoint, last: ImagePoint, flipped: boolean) {
  const dx = (last.x - first.x) / 8, dy = (last.y - first.y) / 9
  if (dx < 12 || dy < 12) throw new Error('Chọn giao điểm trên trái trước, rồi giao điểm dưới phải của bàn cờ.')
  const canvas = document.createElement('canvas')
  canvas.width = 32; canvas.height = 32
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) throw new Error('Trình duyệt không đọc được ảnh.')
  const sample = (source: HTMLImageElement, x: number, y: number, w: number, h: number) => {
    context.fillStyle = '#d8b47c'; context.fillRect(0, 0, 32, 32)
    context.drawImage(source, x, y, w, h, 0, 0, 32, 32)
    return ink(context.getImageData(0, 0, 32, 32).data)
  }
  const templates: { side: Side; type: PieceType; mask: boolean[]; count: number; chroma: number }[] = []
  for (const side of ['red', 'black'] as const) for (const type of POSITION_PIECES) {
    const art = await loadPositionImage(CHESS_PIECE_ARTWORK[side][type])
    const w = art.naturalWidth, h = art.naturalHeight
    context.filter = pieceColorFilter(side) || 'none'
    const pixels = sample(art, w * .28, h * .25, w * .44, h * .44)
    context.filter = 'none'
    templates.push({ ...pixels, side, type })
  }
  const board = emptyPosition()
  let count = 0
  for (let row = 0; row < 10; row++) {
    // Yield between ranks so importing a large photo cannot lock the controls.
    await new Promise<void>(resolve => window.setTimeout(resolve, 0))
    for (let col = 0; col < 9; col++) {
      const centerX = first.x + (BOARD_COLUMNS[col] - BOARD_COLUMNS[0]) / (BOARD_COLUMNS[8] - BOARD_COLUMNS[0]) * (last.x - first.x)
      const centerY = first.y + (BOARD_ROWS[row] - BOARD_ROWS[0]) / (BOARD_ROWS[9] - BOARD_ROWS[0]) * (last.y - first.y)
      const pixels = sample(image, centerX - dx * .20, centerY - dx * .23, dx * .40, dx * .40)
      if (pixels.count < 55) continue
      let best: typeof templates[number] | undefined, score = .52
      for (const template of templates) {
        const colorPenalty = Math.min(.35, Math.abs(template.chroma - pixels.chroma) / 100)
        for (const shiftX of [-3, 0, 3]) for (const shiftY of [-3, 0, 3]) {
          const overlap = template.mask.reduce((sum, ink, i) => {
            const x = i % 32 + shiftX, y = Math.floor(i / 32) + shiftY
            return sum + (ink && x >= 0 && x < 32 && y >= 0 && y < 32 && pixels.mask[y * 32 + x] ? 1 : 0)
          }, 0)
          const match = 2 * overlap / (template.count + pixels.count) - colorPenalty
          if (match > score) { score = match; best = template }
        }
      }
      if (best) {
        const r = flipped ? 9 - row : row, c = flipped ? 8 - col : col
        board[r][c] = positionPiece(best.side, best.type, `image-${r}-${c}`)
        count++
      }
    }
  }
  if (!count) throw new Error('Chưa nhận ra quân. Hãy dùng ảnh rõ với bộ quân của game và chọn lại hai giao điểm.')
  return board
}
