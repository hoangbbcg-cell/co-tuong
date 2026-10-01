import { state } from "../game/state.js"
import { boardElement, markerLayer, pieceLayer } from "./elements.js"
import { getX, getY, renderGame } from "./board.js"
import { renderClocks } from "./player.js"
import { movePiece } from "../game/game.js"

export async function animateMove(fromRow, fromCol, toRow, toCol) {
  const element = pieceLayer.querySelector(
    `[data-row="${fromRow}"][data-col="${fromCol}"]`
  )
  const version = ++state.animationVersion
  state.isAnimating = true
  state.selectedPosition = null
  markerLayer.innerHTML = ""
  boardElement.classList.add("is-animating")
  renderClocks()

  try {
    if (element && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const dx = getX(toCol) - getX(fromCol)
      const dy = getY(toRow) - getY(fromRow)
      const duration = Math.min(375, 135 + Math.hypot(dx, dy) * 0.375)
      element.classList.add("is-sliding")
      state.activeMoveAnimation = element.animate([
        { transform: "translate(-50%, -50%) translate(0px, 0px)" },
        { transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px)` },
      ], { duration, easing: "ease-in-out", fill: "forwards" })
      await state.activeMoveAnimation.finished
    }
  } catch (error) {
    // Reset cancels the animation; unexpected failures still allow the move.
    if (error.name !== "AbortError") console.error(error)
  } finally {
    if (version === state.animationVersion) {
      state.activeMoveAnimation?.cancel()
      state.activeMoveAnimation = null
      state.isAnimating = false
      state.lastClockUpdate = performance.now()
      boardElement.classList.remove("is-animating")
      movePiece(fromRow, fromCol, toRow, toCol)
      renderGame()
    }
  }
}
