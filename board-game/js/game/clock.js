import { state } from "./state.js"
import { statusText } from "../ui/elements.js"
import { renderGame } from "../ui/board.js"
import { renderClocks } from "../ui/player.js"

export function updateClock() {
  const now = performance.now()
  const elapsed = now - state.lastClockUpdate
  state.lastClockUpdate = now
  if (!state.clockStarted || state.gameOver || state.isAnimating) return
  state.remainingTime[state.currentTurn] = Math.max(0, state.remainingTime[state.currentTurn] - elapsed)
  state.turnElapsed += elapsed
  if (state.remainingTime[state.currentTurn] === 0) {
    state.gameOver = true
    state.selectedPosition = null
    statusText.textContent = state.currentTurn === "red" ? "Đỏ hết giờ! Đen thắng!" : "Đen hết giờ! Đỏ thắng!"
    renderGame()
  }
  renderClocks()
}
