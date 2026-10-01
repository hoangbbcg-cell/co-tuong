import { state } from "./game/state.js"
import { resetGame, finishByAgreement } from "./game/game.js"
import { updateClock } from "./game/clock.js"
import { initBoard, renderGame } from "./ui/board.js"
import { initChat, appendChat } from "./ui/chat.js"
import { initRoom } from "./ui/room.js"
import { resetButton, startButton } from "./ui/elements.js"

initBoard()
initChat()
initRoom()
resetButton.addEventListener("click", resetGame)
resetGame()

startButton.addEventListener("click", () => {
  if (state.clockStarted || state.gameOver) return
  state.clockStarted = true
  state.lastClockUpdate = performance.now()
  startButton.disabled = true
  startButton.hidden = true
  startButton.textContent = "Đang chơi"
  renderGame()
})
setInterval(updateClock, 100)


document.getElementById("drawButton").addEventListener("click", () => {
  updateClock()
  if (!state.clockStarted || state.gameOver || state.isAnimating) return
  const opponent = state.currentTurn === "red" ? "Đen" : "Đỏ"
  const accepted = window.confirm(`${opponent} có đồng ý lời cầu hòa không?`)
  updateClock()
  if (state.gameOver) return
  if (accepted) finishByAgreement("Hai bên đồng ý hòa. Ván cờ kết thúc!")
  else appendChat("", `${opponent} từ chối cầu hòa.`, true)
})
document.getElementById("resignButton").addEventListener("click", () => {
  updateClock()
  if (!state.clockStarted || state.gameOver || state.isAnimating) return
  const side = state.currentTurn === "red" ? "Đỏ" : "Đen"
  const winner = state.currentTurn === "red" ? "Đen" : "Đỏ"
  const accepted = window.confirm(`${side} xác nhận xin thua?`)
  updateClock()
  if (!state.gameOver && accepted) finishByAgreement(`${side} xin thua. ${winner} thắng!`)
})
