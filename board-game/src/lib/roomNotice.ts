export function showRoomNotice(message: string) {
  window.dispatchEvent(new CustomEvent<string>('room-notice', { detail: message }))
}
