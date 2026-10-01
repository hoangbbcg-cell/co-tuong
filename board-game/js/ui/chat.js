import { state } from "../game/state.js"

const chatMessages = document.getElementById("chatMessages")
const chatInput = document.getElementById("chatInput")


const chatPickers = [
  [document.getElementById("emojiButton"), document.getElementById("emojiPicker")],
  [document.getElementById("quickChatButton"), document.getElementById("quickChatPicker")],
]

export function appendChat(name, message, system = false) {
  const line = document.createElement("p")
  line.className = system ? "chat-system" : "chat-message"
  const author = document.createElement("strong")
  author.textContent = system ? "" : `${name === state.localPlayerName ? "Bạn" : name}: `
  if (!system) {
    const avatar = document.createElement("img")
    avatar.src = "./assets/avatar.svg"
    avatar.alt = ""
    avatar.className = "chat-avatar"
    line.appendChild(avatar)
  }
  const content = document.createElement("span")
  content.className = "chat-content"
  content.appendChild(author)
  content.appendChild(document.createTextNode(message))
  line.appendChild(content)
  chatMessages.appendChild(line)
  while (chatMessages.children.length > 100) chatMessages.firstElementChild.remove()
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function closeChatPickers() {
  for (const [button, picker] of chatPickers) {
    picker.hidden = true
    button.setAttribute("aria-expanded", "false")
  }
}

export function initChat() {
appendChat("", `${state.localPlayerName} đã vào phòng.`, true)
document.getElementById("chatForm").addEventListener("submit", event => {
  event.preventDefault()
  const message = chatInput.value.trim()
  if (!message) return
  appendChat(state.localPlayerName, message)
  chatInput.value = ""
})



for (const [button, picker] of chatPickers) {
  button.addEventListener("click", () => {
    const shouldOpen = picker.hidden
    closeChatPickers()
    picker.hidden = !shouldOpen
    button.setAttribute("aria-expanded", String(shouldOpen))
  })
  picker.addEventListener("click", event => {
    const option = event.target.closest("button")
    if (!option) return
    if (option.dataset.message) {
      appendChat(state.localPlayerName, option.dataset.message)
    } else {
      const start = chatInput.selectionStart ?? chatInput.value.length
      const end = chatInput.selectionEnd ?? start
      if (chatInput.value.length - (end - start) + option.dataset.emoji.length <= chatInput.maxLength) {
        chatInput.setRangeText(option.dataset.emoji, start, end, "end")
      }
    }
    closeChatPickers()
    chatInput.focus()
  })
}
document.addEventListener("click", event => {
  if (!event.target.closest(".chat")) closeChatPickers()
})
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeChatPickers()
})
document.getElementById("chatToggle").addEventListener("click", event => {
  closeChatPickers()
  const collapsed = document.querySelector(".chat").classList.toggle("collapsed")
  event.currentTarget.setAttribute("aria-expanded", String(!collapsed))
  event.currentTarget.textContent = collapsed ? "\u25B2" : "\u25BC"
  event.currentTarget.setAttribute("aria-label", collapsed ? "Mở trò chuyện" : "Thu gọn trò chuyện")
  event.currentTarget.title = collapsed ? "Mở trò chuyện" : "Thu gọn trò chuyện"
})

}
