import { state, INITIAL_TIME, createInitialBoard } from "./state.js"
import { isMoveLegal, hasAnyLegalMove, isInCheck } from "./rules.js"
import { updateClock } from "./clock.js"
import { animateMove } from "../ui/animation.js"
import { renderGame } from "../ui/board.js"
import { boardElement, statusText, startButton } from "../ui/elements.js"

export function handlePointClick(
  row,
  col
) {

  updateClock()
  if (!state.clockStarted) return

  if (state.gameOver || state.isAnimating) {
    return
  }

  const clickedPiece =
    state.board[row][col]

  /*
    CHƯA CHỌN QUÂN
  */

  if (!state.selectedPosition) {

    if (!clickedPiece) {
      return
    }

    if (
      clickedPiece.side !==
      state.currentTurn
    ) {
      return
    }

    state.selectedPosition = {
      row,
      col,
    }

    renderGame()

    return
  }

  const fromRow =
    state.selectedPosition.row

  const fromCol =
    state.selectedPosition.col

  /*
    Click quân cùng phe
    -> đổi quân đang chọn
  */

  if (
    clickedPiece &&
    clickedPiece.side ===
      state.currentTurn
  ) {

    state.selectedPosition = {
      row,
      col,
    }

    renderGame()

    return
  }

  /*
    Thử di chuyển
  */

  if (
    isMoveLegal(
      fromRow,
      fromCol,
      row,
      col,
      state.board
    )
  ) {

    animateMove(
      fromRow,
      fromCol,
      row,
      col
    )

    return
  }

  state.selectedPosition = null

  renderGame()
}

export function movePiece(
  fromRow,
  fromCol,
  toRow,
  toCol
) {

  const piece =
    state.board[fromRow][fromCol]

  const capturedPiece =
    state.board[toRow][toCol]

  state.board[toRow][toCol] =
    piece

  state.board[fromRow][fromCol] =
    null

  /*
    Ăn Tướng
  */

  if (
    capturedPiece &&
    capturedPiece.type ===
      "general"
  ) {

    state.gameOver = true

    statusText.textContent =
      piece.side === "red"
        ? "Đỏ thắng!"
        : "Đen thắng!"

    return
  }

  /*
    Đổi lượt
  */

  state.currentTurn =
    state.currentTurn === "red"
      ? "black"
      : "red"

  /*
    Kiểm tra còn nước đi không
  */

  const hasMove =
    hasAnyLegalMove(
      state.currentTurn,
      state.board
    )

  if (!hasMove) {

    state.gameOver = true

    const winner =
      state.currentTurn === "red"
        ? "Đen"
        : "Đỏ"

    if (
      isInCheck(
        state.currentTurn,
        state.board
      )
    ) {

      statusText.textContent =
        `Chiếu bí! ${winner} thắng!`

    } else {

      /*
        Trong cờ tướng,
        hết nước đi cũng thua.
      */

      statusText.textContent =
        `Hết nước đi! ${winner} thắng!`
    }
  }
}

export function resetGame() {

  state.clockStarted = false
  state.remainingTime = { red: INITIAL_TIME, black: INITIAL_TIME }
  state.lastClockUpdate = performance.now()
  startButton.disabled = false
  startButton.hidden = false
  startButton.textContent = "Sẵn sàng"

  state.animationVersion++
  state.activeMoveAnimation?.cancel()
  state.activeMoveAnimation = null
  state.isAnimating = false
  boardElement.classList.remove("is-animating")

  state.board =
    createInitialBoard()

  state.currentTurn =
    "red"

  state.selectedPosition =
    null

  state.gameOver =
    false

  statusText.textContent =
    ""

  renderGame()
}

export function finishByAgreement(message) {
  state.gameOver = true
  state.selectedPosition = null
  statusText.textContent = message
  renderGame()
}
