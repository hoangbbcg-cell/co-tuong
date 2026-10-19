import { useEffect, useRef, useState } from 'react'
import type { useLobby } from './useLobby'
import { useLobbyPresence } from './useLobbyPresence'
import { useSessionStore } from '../../../store/sessionStore'

export function useRoomSelection(lobby: ReturnType<typeof useLobby>) {
  const [province, setProvince] = useState(lobby.province)
  const presence = useLobbyPresence(province)
  const [roomFilter, setRoomFilter] = useState<'all' | 'vacant' | 'locked'>('all')
  const vacantOnly = roomFilter === 'vacant'
  const [creating, setCreating] = useState(false)
  const [provincePickerOpen, setProvincePickerOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)
  const quickTimeRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!timeOpen) return
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !quickTimeRef.current?.contains(event.target)) setTimeOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [timeOpen])
  const [quickMinutes, setQuickMinutes] = useState(10)
  const [message, setMessage] = useState('')
  const openProvincePicker = () => {
    if (!useSessionStore.getState().countryCode) {
      setMessage('Vui lòng chọn địa chỉ của bạn trong Hồ sơ trước khi chọn tỉnh/thành phố.')
      return
    }
    setProvincePickerOpen(true)
  }
  const provinceRooms = lobby.rooms.filter(room => room.province === province)
  const available = provinceRooms.filter(room => room.players === 1 && room.phase !== 'playing')
  const quickPlay = () => {
    lobby.quickPlay(() => setCreating(true), quickMinutes)
  }
  return { openProvincePicker, quickTimeRef, timeOpen, setTimeOpen, quickMinutes, setQuickMinutes, provincePickerOpen, setProvincePickerOpen, province, setProvince, vacantOnly, roomFilter, setRoomFilter, creating, setCreating, message, setMessage, quickPlay,
    rooms: roomFilter === 'locked' ? provinceRooms.filter(room => room.locked) : vacantOnly ? available : provinceRooms,
    players: presence.provinceCounts[province] ?? (presence.province === province ? presence.players : 0), provinceCounts: presence.provinceCounts }
}
