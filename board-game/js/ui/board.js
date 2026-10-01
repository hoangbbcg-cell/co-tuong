import { state, CELL_SIZE, PADDING_X, PADDING_Y, ROWS, COLS } from "../game/state.js"
import { boardElement, lineLayer, markerLayer, pieceLayer, hitLayer } from "./elements.js"
import { getLegalMoves } from "../game/rules.js"
import { handlePointClick } from "../game/game.js"
import { updateGameInfo } from "./player.js"

export function getX(col) {

  return (
    PADDING_X +
    col * CELL_SIZE
  )
}

export function getY(row) {

  return (
    PADDING_Y +
    row * CELL_SIZE
  )
}

export function createBoardLines() {

  lineLayer.innerHTML = ""

  createHorizontalLines()

  createVerticalLines()

  createPalaceLines()

  createPositionMarks()
}

export function createPositionMarks() {
  const positions = [[2, 1], [2, 7], [7, 1], [7, 7]]
  for (const row of [3, 6]) {
    for (let col = 0; col < COLS; col += 2) positions.push([row, col])
  }
  for (const [row, col] of positions) {
    for (const direction of [-1, 1]) {
      if ((col === 0 && direction === -1) || (col === 8 && direction === 1)) continue
      for (const vertical of [-1, 1]) {
        const mark = document.createElement("div")
        mark.className = "position-mark"
        mark.style.left = `${getX(col) + direction * 6}px`
        mark.style.top = `${getY(row) + vertical * 6}px`
        mark.style.transform = `scale(${direction}, ${vertical})`
        lineLayer.appendChild(mark)
      }
    }
  }
}

export function createHorizontalLines() {

  for (
    let row = 0;
    row < ROWS;
    row++
  ) {

    const line =
      document.createElement("div")

    line.classList.add(
      "horizontal-line"
    )

    line.style.left =
      `${getX(0)}px`

    line.style.top =
      `${getY(row)}px`

    line.style.width =
      `${CELL_SIZE * 8}px`

    lineLayer.appendChild(line)
  }
}

export function createVerticalLines() {

  for (
    let col = 0;
    col < COLS;
    col++
  ) {

    /*
      Hai đường ngoài cùng
      chạy xuyên qua sông.
    */

    if (
      col === 0 ||
      col === 8
    ) {

      const line =
        document.createElement("div")

      line.classList.add(
        "vertical-line"
      )

      line.style.left =
        `${getX(col)}px`

      line.style.top =
        `${getY(0)}px`

      line.style.height =
        `${CELL_SIZE * 9}px`

      lineLayer.appendChild(line)

      continue
    }

    /*
      Phần trên sông
    */

    const topLine =
      document.createElement("div")

    topLine.classList.add(
      "vertical-line"
    )

    topLine.style.left =
      `${getX(col)}px`

    topLine.style.top =
      `${getY(0)}px`

    topLine.style.height =
      `${CELL_SIZE * 4}px`

    lineLayer.appendChild(topLine)

    /*
      Phần dưới sông
    */

    const bottomLine =
      document.createElement("div")

    bottomLine.classList.add(
      "vertical-line"
    )

    bottomLine.style.left =
      `${getX(col)}px`

    bottomLine.style.top =
      `${getY(5)}px`

    bottomLine.style.height =
      `${CELL_SIZE * 4}px`

    lineLayer.appendChild(
      bottomLine
    )
  }
}

export function createPalaceLines() {

  /*
    BLACK PALACE

    (0,3) -> (2,5)
    (0,5) -> (2,3)
  */

  createDiagonalLine(
    0,
    3,
    2,
    5
  )

  createDiagonalLine(
    0,
    5,
    2,
    3
  )

  /*
    RED PALACE
  */

  createDiagonalLine(
    7,
    3,
    9,
    5
  )

  createDiagonalLine(
    7,
    5,
    9,
    3
  )
}

export function createDiagonalLine(
  fromRow,
  fromCol,
  toRow,
  toCol
) {

  const x1 =
    getX(fromCol)

  const y1 =
    getY(fromRow)

  const x2 =
    getX(toCol)

  const y2 =
    getY(toRow)

  const deltaX =
    x2 - x1

  const deltaY =
    y2 - y1

  const length =
    Math.sqrt(
      deltaX * deltaX +
      deltaY * deltaY
    )

  const angle =
    Math.atan2(
      deltaY,
      deltaX
    ) * 180 / Math.PI

  const line =
    document.createElement("div")

  line.classList.add(
    "palace-line"
  )

  line.style.left =
    `${x1}px`

  line.style.top =
    `${y1}px`

  line.style.width =
    `${length}px`

  line.style.transform =
    `rotate(${angle}deg)`

  lineLayer.appendChild(line)
}

export function createHitPoints() {

  hitLayer.innerHTML = ""

  for (
    let row = 0;
    row < ROWS;
    row++
  ) {

    for (
      let col = 0;
      col < COLS;
      col++
    ) {

      const point =
        document.createElement("div")

      point.classList.add(
        "hit-point"
      )

      point.style.left =
        `${getX(col)}px`

      point.style.top =
        `${getY(row)}px`

      point.addEventListener(
        "click",
        () => {
          handlePointClick(
            row,
            col
          )
        }
      )

      hitLayer.appendChild(point)
    }
  }
}

export function renderGame() {

  renderPieces()

  renderMarkers()

  updateGameInfo()
}

export function renderPieces() {

  pieceLayer.innerHTML = ""

  for (
    let row = 0;
    row < ROWS;
    row++
  ) {

    for (
      let col = 0;
      col < COLS;
      col++
    ) {

      const piece =
        state.board[row][col]

      if (!piece) {
        continue
      }

      const element =
        document.createElement("div")

      element.classList.add(
        "piece",
        piece.side
      )

      element.textContent =
        piece.name

      element.dataset.row = row
      element.dataset.col = col

      element.style.left =
        `${getX(col)}px`

      element.style.top =
        `${getY(row)}px`

      pieceLayer.appendChild(
        element
      )
    }
  }
}

export function renderMarkers() {

  markerLayer.innerHTML = ""

  if (!state.selectedPosition) {
    return
  }

  const selectedMarker =
    document.createElement("div")

  selectedMarker.classList.add(
    "selected-marker"
  )

  selectedMarker.style.left =
    `${getX(
      state.selectedPosition.col
    )}px`

  selectedMarker.style.top =
    `${getY(
      state.selectedPosition.row
    )}px`

  markerLayer.appendChild(
    selectedMarker
  )

  const legalMoves =
    getLegalMoves(
      state.selectedPosition.row,
      state.selectedPosition.col,
      state.board
    )

  for (
    const move of legalMoves
  ) {

    const target =
      state.board[
        move.row
      ][
        move.col
      ]

    const marker =
      document.createElement("div")

    if (target) {

      marker.classList.add(
        "capture-marker"
      )

    } else {

      marker.classList.add(
        "move-marker"
      )
    }

    marker.style.left =
      `${getX(move.col)}px`

    marker.style.top =
      `${getY(move.row)}px`

    markerLayer.appendChild(
      marker
    )
  }
}



export function initBoard() {
createBoardLines()
createHitPoints()
const boardObserver = new ResizeObserver(() => {
  const scale = boardElement.clientWidth / 588
  boardElement.querySelectorAll(".layer").forEach(layer => { layer.style.transform = `scale(${scale})` })
})
boardObserver.observe(boardElement)
const arenaElement = document.querySelector(".arena")
const boardFrame = document.querySelector(".board-frame")
function fitBoard() {
  const compact = window.matchMedia("(max-width: 800px)").matches
  const availableHeight = arenaElement.clientHeight - (compact ? 130 : 0)
  const arenaStyle = getComputedStyle(arenaElement)
  const gap = parseFloat(arenaStyle.columnGap) || 0
  const availableWidth = compact ? arenaElement.clientWidth :
    arenaElement.clientWidth - document.getElementById("player-red").offsetWidth -
    document.querySelector(".right-rail").offsetWidth - gap * 2
  const padding = parseFloat(getComputedStyle(boardFrame).paddingLeft) * 2 + 4
  const width = Math.max(0, Math.min(availableWidth, (availableHeight - padding) * 588 / 652 + padding))
  boardFrame.style.width = `${width}px`
}
new ResizeObserver(fitBoard).observe(arenaElement)
window.addEventListener("resize", fitBoard)
fitBoard()


}
