import { useEntryStore } from '../../../store/entryStore'
import { useSessionStore } from '../../../store/sessionStore'
import { useGameStore } from '../../../store/gameStore'
import { socket } from '../../../services/socket'

export function useAccountLogout() {
  return () => {
    useEntryStore.getState().signOut()
    // Server handles leaving/disconnecting online players under existing rules.
    socket.disconnect()
    useSessionStore.getState().leave()
    useGameStore.getState().reset(performance.now())
  }
}
