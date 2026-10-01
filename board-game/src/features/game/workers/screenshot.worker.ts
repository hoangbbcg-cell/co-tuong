import type { ScreenshotAssetUrls, ScreenshotSnapshot, ScreenshotWorkerRequest, ScreenshotWorkerResponse } from '../screenshot/screenshot.types'

interface WorkerScope {
  onmessage: ((event: MessageEvent<ScreenshotWorkerRequest>) => void) | null
  postMessage: (message: ScreenshotWorkerResponse) => void
}

const workerScope = self as unknown as WorkerScope
const boardColumns = [73, 195, 319, 442, 567, 691, 816, 940, 1061]
const boardRows = [55, 198, 324, 450, 576, 707, 833, 959, 1085, 1216]
const boardWidth = 1134
const boardHeight = 1296
const playerPanelHeight = 210
const canvasHeight = boardHeight + playerPanelHeight * 2
const bitmaps = new Map<string, ImageBitmap>()
let pendingSnapshot: ScreenshotSnapshot | null = null
let rendering = false

function flattenAssets(assets: ScreenshotAssetUrls): Array<[string, string]> {
  const entries: Array<[string, string]> = [
    ['background', assets.background], ['board', assets.board], ['moveMarker', assets.moveMarker],
    ['avatar', assets.avatar], ['nameFrame', assets.nameFrame], ['eloFrame', assets.eloFrame],
  ]
  for (const side of ['red', 'black'] as const) {
    for (const [type, url] of Object.entries(assets.pieces[side])) entries.push([`${side}-${type}`, url])
  }
  return entries
}

async function preloadAssets(assets: ScreenshotAssetUrls): Promise<void> {
  await Promise.all(flattenAssets(assets).map(async ([key, url]) => {
    try {
      const response = await fetch(url, { credentials: 'same-origin' })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      bitmaps.set(key, await createImageBitmap(await response.blob()))
    } catch (error) {
      if (key === 'avatar') {
        try {
          const fallback = await fetch(assets.avatarFallback, { credentials: 'same-origin' })
          if (!fallback.ok) throw new Error(`HTTP ${fallback.status}`)
          bitmaps.set(key, await createImageBitmap(await fallback.blob()))
          return
        } catch (fallbackError) {
          const reason = fallbackError instanceof Error ? fallbackError.message : String(fallbackError)
          throw new Error(`Không thể giải mã avatar chính hoặc avatar dự phòng: ${reason}`)
        }
      }
      const reason = error instanceof Error ? error.message : String(error)
      throw new Error(`Không thể nạp asset screenshot "${key}": ${reason}`)
    }
  }))
}

function bitmap(key: string): ImageBitmap {
  const image = bitmaps.get(key)
  if (!image) throw new Error(`Asset screenshot chưa sẵn sàng: ${key}`)
  return image
}

function roundedRect(ctx: OffscreenCanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
  ctx.closePath()
}

function drawCover(ctx: OffscreenCanvasRenderingContext2D, image: ImageBitmap): void {
  const scale = Math.max(boardWidth / image.width, canvasHeight / image.height)
  const width = image.width * scale
  const height = image.height * scale
  ctx.drawImage(image, (boardWidth - width) / 2, (canvasHeight - height) / 2, width, height)
  ctx.fillStyle = '#071b17a8'
  ctx.fillRect(0, 0, boardWidth, canvasHeight)
}

function fitText(ctx: OffscreenCanvasRenderingContext2D, text: string, maxWidth: number, size: number, family: string): string {
  let currentSize = size
  ctx.font = `600 ${currentSize}px ${family}`
  while (ctx.measureText(text).width > maxWidth && currentSize > 12) {
    currentSize -= 1
    ctx.font = `600 ${currentSize}px ${family}`
  }
  return ctx.font
}

function drawPlayer(ctx: OffscreenCanvasRenderingContext2D, side: 'red' | 'black', player: ScreenshotSnapshot['red'], y: number): void {
  roundedRect(ctx, 18, y + 12, boardWidth - 36, playerPanelHeight - 24, 20)
  ctx.fillStyle = '#09241fdc'
  ctx.fill()
  ctx.lineWidth = 3
  ctx.strokeStyle = player.active ? '#ffe19a' : '#b88b48'
  ctx.stroke()

  const avatarX = 43
  const avatarY = y + 35
  const avatarSize = 140
  const centerX = avatarX + avatarSize / 2
  const centerY = avatarY + avatarSize / 2
  const avatarGradient = ctx.createLinearGradient(avatarX, avatarY, avatarX + avatarSize, avatarY + avatarSize)
  avatarGradient.addColorStop(0, '#fff0b6')
  avatarGradient.addColorStop(0.48, '#a87532')
  avatarGradient.addColorStop(0.78, '#f6dc9a')
  avatarGradient.addColorStop(1, '#704c22')
  ctx.fillStyle = avatarGradient
  ctx.beginPath()
  ctx.arc(centerX, centerY, avatarSize / 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.save()
  ctx.beginPath()
  ctx.arc(centerX, centerY, avatarSize / 2 - 9, 0, Math.PI * 2)
  ctx.clip()
  ctx.filter = side === 'black' ? 'hue-rotate(35deg)' : 'none'
  ctx.drawImage(bitmap('avatar'), avatarX + 9, avatarY + 9, avatarSize - 18, avatarSize - 18)
  ctx.restore()

  const nameFrameX = 218
  const nameFrameY = y + 30
  ctx.drawImage(bitmap('nameFrame'), nameFrameX, nameFrameY, 460, 61)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffe7ae'
  ctx.shadowColor = '#2a1008'
  ctx.shadowBlur = 3
  ctx.font = fitText(ctx, player.name, 400, 29, 'Georgia, serif')
  ctx.fillText(player.name, nameFrameX + 230, nameFrameY + 31, 400)
  ctx.shadowBlur = 0

  const eloFrameX = 218
  const eloFrameY = y + 105
  ctx.drawImage(bitmap('eloFrame'), eloFrameX, eloFrameY, 258, 61)
  ctx.fillStyle = '#f5d59a'
  ctx.beginPath()
  ctx.arc(eloFrameX + 40, eloFrameY + 30, 18, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = side === 'red' ? '#bd342b' : '#4b4030'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = side === 'red' ? '#a91e15' : '#252419'
  ctx.font = 'bold 22px serif'
  ctx.fillText(side === 'red' ? '帥' : '將', eloFrameX + 40, eloFrameY + 31)
  ctx.fillStyle = '#ffe5a3'
  ctx.font = '26px "Times New Roman", serif'
  ctx.fillText(String(player.elo), eloFrameX + 151, eloFrameY + 31)

  const clockX = 757
  const clockY = y + 54
  roundedRect(ctx, clockX, clockY, 327, 78, 14)
  ctx.fillStyle = player.active ? '#244b40' : '#503a23'
  ctx.fill()
  ctx.lineWidth = 3
  ctx.strokeStyle = player.active ? '#e8c479' : '#c5ad6b'
  ctx.stroke()
  ctx.fillStyle = '#ebd39d'
  ctx.beginPath()
  ctx.arc(clockX + 46, clockY + 39, 25, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#70572c'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.fillStyle = side === 'red' ? '#a11b11' : '#252419'
  ctx.font = 'bold 27px serif'
  ctx.fillText(side === 'red' ? '帥' : '將', clockX + 46, clockY + 40)
  ctx.fillStyle = '#e8b923'
  ctx.font = 'bold 38px Arial, sans-serif'
  ctx.fillText(player.clock, clockX + 195, clockY + 41)
  if (player.ready) {
    ctx.textAlign = 'right'
    ctx.fillStyle = '#ffe19a'
    ctx.font = 'bold 17px Arial, sans-serif'
    ctx.fillText('SẴN SÀNG', boardWidth - 54, y + 28)
  }
  if (player.outcome) {
    ctx.textAlign = 'right'
    ctx.fillStyle = player.outcome === 'win' ? '#ffe19a' : '#d9f5ff'
    ctx.font = 'bold 17px Arial, sans-serif'
    ctx.fillText(player.outcome === 'win' ? 'THẮNG' : 'THUA', boardWidth - 54, y + 28)
  }
  ctx.textAlign = 'left'
}

function boardPoint(row: number, col: number, flipped: boolean): { x: number; y: number } {
  return {
    x: boardColumns[flipped ? 8 - col : col],
    y: boardRows[flipped ? 9 - row : row],
  }
}

function drawMoveCorners(ctx: OffscreenCanvasRenderingContext2D, x: number, y: number, size: number): void {
  const half = size / 2
  const corner = 25
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 7
  ctx.shadowColor = '#fff'
  ctx.shadowBlur = 5
  ctx.beginPath()
  ctx.moveTo(x - half, y - half + corner); ctx.lineTo(x - half, y - half); ctx.lineTo(x - half + corner, y - half)
  ctx.moveTo(x + half - corner, y - half); ctx.lineTo(x + half, y - half); ctx.lineTo(x + half, y - half + corner)
  ctx.moveTo(x - half, y + half - corner); ctx.lineTo(x - half, y + half); ctx.lineTo(x - half + corner, y + half)
  ctx.moveTo(x + half - corner, y + half); ctx.lineTo(x + half, y + half); ctx.lineTo(x + half, y + half - corner)
  ctx.stroke()
  ctx.shadowBlur = 0
}

function drawBoard(ctx: OffscreenCanvasRenderingContext2D, snapshot: ScreenshotSnapshot): void {
  const boardY = playerPanelHeight
  const flipped = snapshot.bottomSide === 'black'
  ctx.drawImage(bitmap('board'), 0, boardY, boardWidth, boardHeight)
  ctx.strokeStyle = '#d6ad68'
  ctx.lineWidth = 5
  ctx.strokeRect(2.5, boardY + 2.5, boardWidth - 5, boardHeight - 5)

  ctx.fillStyle = '#936332'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = 'bold italic 48px Georgia, serif'
  ctx.fillText('HOANGBBCG', boardWidth / 2, boardY + 641.5)

  if (snapshot.lastMove && !snapshot.selected) {
    const origin = boardPoint(snapshot.lastMove.from.row, snapshot.lastMove.from.col, flipped)
    const destination = boardPoint(snapshot.lastMove.to.row, snapshot.lastMove.to.col, flipped)
    ctx.drawImage(bitmap('moveMarker'), origin.x - 77.5, boardY + origin.y - 77.5, 155, 155)
    ctx.beginPath()
    ctx.arc(destination.x, boardY + destination.y, 59, 0, Math.PI * 2)
    ctx.strokeStyle = '#ffffffb3'
    ctx.lineWidth = 5
    ctx.shadowColor = '#fff'
    ctx.shadowBlur = 5
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  if (snapshot.selected) {
    const selected = boardPoint(snapshot.selected.row, snapshot.selected.col, flipped)
    drawMoveCorners(ctx, selected.x, boardY + selected.y, 114)
    for (const move of snapshot.legalMoves) {
      const point = boardPoint(move.row, move.col, flipped)
      const targetPiece = snapshot.board[move.row]?.[move.col]
      if (targetPiece) drawMoveCorners(ctx, point.x, boardY + point.y, 114)
      else ctx.drawImage(bitmap('moveMarker'), point.x - 77.5, boardY + point.y - 77.5, 155, 155)
    }
  }

  for (let row = 0; row < snapshot.board.length; row += 1) {
    for (let col = 0; col < snapshot.board[row].length; col += 1) {
      const piece = snapshot.board[row][col]
      if (!piece) continue
      const point = boardPoint(row, col, flipped)
      const x = point.x - 54
      const y = boardY + point.y - 56
      if (piece.concealed) {
        const gradient = ctx.createRadialGradient(x + 36, y + 28, 4, x + 54, y + 56, 58)
        gradient.addColorStop(0, '#f5d7a4')
        gradient.addColorStop(1, '#d8a363')
        ctx.fillStyle = gradient
        ctx.shadowColor = '#9b602b88'
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.ellipse(point.x, boardY + point.y, 49, 50, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      } else {
        ctx.save()
        ctx.filter = 'drop-shadow(9px 13px 4px #6a4827c2)'
        ctx.drawImage(bitmap(`${piece.side}-${piece.type}`), x, y, 108, 112)
        ctx.restore()
      }
    }
  }
}

function render(snapshot: ScreenshotSnapshot): Promise<Blob> {
  const canvas = new OffscreenCanvas(boardWidth, canvasHeight)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Trình duyệt không tạo được OffscreenCanvas 2D.')
  drawCover(ctx, bitmap('background'))
  const topSide = snapshot.bottomSide === 'red' ? 'black' : 'red'
  drawPlayer(ctx, topSide, snapshot[topSide], 0)
  drawBoard(ctx, snapshot)
  drawPlayer(ctx, snapshot.bottomSide, snapshot[snapshot.bottomSide], playerPanelHeight + boardHeight)
  return canvas.convertToBlob({ type: 'image/png' })
}

async function processSnapshots(): Promise<void> {
  if (rendering) return
  rendering = true
  while (pendingSnapshot) {
    const snapshot = pendingSnapshot
    pendingSnapshot = null
    try {
      const startedAt = performance.now()
      const blob = await render(snapshot)
      workerScope.postMessage({ type: 'rendered', version: snapshot.version, blob, durationMs: performance.now() - startedAt })
    } catch (error) {
      workerScope.postMessage({ type: 'error', version: snapshot.version, message: error instanceof Error ? error.message : 'Không thể dựng ảnh chụp.' })
    }
  }
  rendering = false
}

workerScope.onmessage = event => {
  const message = event.data
  if (message.type === 'init') {
    void preloadAssets(message.assets)
      .then(() => workerScope.postMessage({ type: 'ready' }))
      .catch(error => workerScope.postMessage({ type: 'error', message: error instanceof Error ? error.message : 'Không thể tải asset screenshot.' }))
    return
  }
  pendingSnapshot = message.snapshot
  void processSnapshots()
}
