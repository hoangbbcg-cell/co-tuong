import { useCallback } from 'react'
import { useGameStore } from '../../../store/gameStore'
import { useSessionStore } from '../../../store/sessionStore'

// Temporary local spectator demo; never creates or joins a server room.
export function useRoomDemo() {
  return useCallback((minutes: number) => {
    const now = performance.now()
    const local = useGameStore.getState()
    local.reset(now)
    useGameStore.setState(state => ({ game: {
      ...state.game,
      remainingTime: { red: minutes * 60_000, black: minutes * 60_000 },
    } }))
    useSessionStore.setState({ screen: 'game', mode: 'computer', computerDemo: true, computerDemoQueued: false,
      computerEngine: 'basic', humanSide: 'red', room: null, lobbyOpen: false, notice: '' })
  }, [])
}
