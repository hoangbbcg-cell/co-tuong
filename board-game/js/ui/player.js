import { state } from "../game/state.js"
import { turnText, statusText } from "./elements.js"
import { isInCheck } from "../game/rules.js"

export function renderClocks() {
  if (state.ringSide !== state.currentTurn || !state.clockStarted) {
    state.ringSide = state.currentTurn
    state.turnElapsed = 0
  }
  document.getElementById("matchActions").hidden = !state.clockStarted || state.gameOver
  document.getElementById("drawButton").disabled = state.isAnimating
  document.getElementById("resignButton").disabled = state.isAnimating
  for (const side of ["red", "black"]) {
    const seconds = Math.ceil(state.remainingTime[side] / 1000)
    document.getElementById(`clock-${side}`).textContent =
      `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`
    const active = state.clockStarted && !state.gameOver && state.currentTurn === side
    const player = document.getElementById(`player-${side}`)
    player.classList.toggle("has-started", state.clockStarted)
    player.classList.toggle("active", active)
    player.style.setProperty("--turn-angle", `${Math.min(360, state.turnElapsed / 60000 * 360)}deg`)
    player.classList.toggle("low-time", state.remainingTime[side] <= 60000)
  }
}

export function updateGameInfo() {

  renderClocks()

  if (state.gameOver) {

    turnText.textContent =
      "Ván cờ kết thúc"

    return
  }

  turnText.textContent =
    state.currentTurn === "red"
      ? "Lượt: Đỏ"
      : "Lượt: Đen"

  if (
    isInCheck(
      state.currentTurn,
      state.board
    )
  ) {

    statusText.textContent =
      state.currentTurn === "red"
        ? "Đỏ đang bị chiếu!"
        : "Đen đang bị chiếu!"

  } else {

    statusText.textContent = ""
  }
}
