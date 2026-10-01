import { useState } from 'react'
import type { useLobby } from './useLobby'

export function useRoomSelection(lobby: ReturnType<typeof useLobby>) {
  const [vacantOnly, setVacantOnly] = useState(false)
  const [creating, setCreating] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)
  const [message, setMessage] = useState('')
  const available = lobby.rooms.filter(room => room.players < 2 && room.phase !== 'playing')
  const quickPlay = () => {
    const match = available.find(room => (room.minutes ?? 10) === lobby.minutes)
    if (match) lobby.join(match.id)
    else setCreating(true)
  }
  return { timeOpen, setTimeOpen, vacantOnly, setVacantOnly, creating, setCreating, message, setMessage, quickPlay,
    rooms: vacantOnly ? available : lobby.rooms,
    players: lobby.rooms.reduce((total, room) => total + room.players, 0) }
}
