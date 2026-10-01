import { state } from "../game/state.js"
import { updateClock } from "../game/clock.js"
import { resetGame } from "../game/game.js"
import { appendChat } from "./chat.js"

export function initRoom() {
document.getElementById("viewersButton").addEventListener("click", event => {
  const users = document.getElementById("roomUsers")
  users.hidden = !users.hidden
  event.currentTarget.setAttribute("aria-expanded", String(!users.hidden))
})
const lobbyDialog = document.getElementById("lobbyDialog")
if (window.matchMedia("(max-width: 800px)").matches) {
  document.getElementById("chatToggle").click()
}
document.getElementById("backButton").addEventListener("click", () => {
  updateClock()
  resetGame()
  appendChat("", `${state.localPlayerName} đã rời phòng.`, true)
  document.getElementById("roomUsers").textContent = "Phòng trống"
  lobbyDialog.showModal()
})
lobbyDialog.addEventListener("cancel", event => event.preventDefault())
document.getElementById("joinForm").addEventListener("submit", event => {
  event.preventDefault()
  const name = document.getElementById("playerName").value.trim()
  if (!name) return
  state.localPlayerName = name
  document.querySelector("#player-red h2").textContent = name
  document.getElementById("roomUsers").textContent = `${name} · Người chơi`
  appendChat("", `${name} đã vào phòng.`, true)
  lobbyDialog.close()
})

}
