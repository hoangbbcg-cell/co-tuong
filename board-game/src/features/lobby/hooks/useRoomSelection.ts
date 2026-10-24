import { useEffect, useMemo, useRef, useState } from 'react'
import type { useLobby } from './useLobby'
import { useLobbyPresence } from './useLobbyPresence'
import { useSessionStore } from '../../../store/sessionStore'

export function useRoomSelection(lobby: ReturnType<typeof useLobby>) {
  const [province, setProvince] = useState(lobby.province)
  const [allProvinces, setAllProvinces] = useState(() => useSessionStore.getState().countryCode !== 'VN')
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
  const [addressNoticeOpen, setAddressNoticeOpen] = useState(false)
  const openProvincePicker = () => {
    if (!useSessionStore.getState().countryCode) {
      setAddressNoticeOpen(true)
      return
    }
    setProvincePickerOpen(true)
  }
  const provinceRooms = useMemo(() => {
    const candidates = lobby.rooms.filter(room => (allProvinces || room.province === province) && (room.players > 0 || (room.viewerCount ?? 0) > 0) && (roomFilter !== 'locked' || room.locked) && (roomFilter !== 'vacant' || (room.players === 1 && room.phase !== 'playing')))
    if (!allProvinces) return candidates
    for (let i = candidates.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [candidates[i], candidates[j]] = [candidates[j], candidates[i]] }
    return candidates.slice(0, 30)
  }, [lobby.rooms, province, allProvinces, roomFilter])
  const available = provinceRooms.filter(room => room.players === 1 && room.phase !== 'playing')
  const quickPlay = () => {
    setMessage('')
    lobby.quickPlay(() => setMessage('Không có bàn phù hợp với thời gian đã chọn.'), quickMinutes)
  }
  return { addressNoticeOpen, setAddressNoticeOpen, openProvincePicker, quickTimeRef, timeOpen, setTimeOpen, quickMinutes, setQuickMinutes, provincePickerOpen, setProvincePickerOpen, province, setProvince, allProvinces, setAllProvinces, vacantOnly, roomFilter, setRoomFilter, creating, setCreating, message, setMessage, quickPlay,
    rooms: roomFilter === 'locked' ? provinceRooms.filter(room => room.locked) : vacantOnly ? available : provinceRooms,
    players: presence.provinceCounts[province] ?? (presence.province === province ? presence.players : 0), provinceCounts: presence.provinceCounts }
}
