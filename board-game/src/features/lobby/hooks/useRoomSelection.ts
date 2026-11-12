import { normalizeRoomProvince, preferVietnamRooms, roomRegionActivity } from '../../../lib/roomRegions'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { useLobby } from './useLobby'
import { useLobbyPresence } from './useLobbyPresence'
import { useSessionStore } from '../../../store/sessionStore'

type RoomVariant = 'xiangqi' | 'jieqi'
type RoomFilter = 'all' | 'vacant' | 'locked'

type VariantSelection = {
  province: string
  allProvinces: boolean
  roomFilter: RoomFilter
  quickMinutes: number
}

export function useRoomSelection(lobby: ReturnType<typeof useLobby>, variant: RoomVariant = 'xiangqi') {
  const [variantSelections, setVariantSelections] = useState<Record<RoomVariant, VariantSelection>>(() => {
    const makeInitial = (): VariantSelection => ({
      province: useSessionStore.getState().countryCode === 'VN' ? lobby.province : '',
      allProvinces: useSessionStore.getState().countryCode !== 'VN',
      roomFilter: 'all',
      quickMinutes: 10,
    })
    return { xiangqi: makeInitial(), jieqi: makeInitial() }
  })

  const { province, allProvinces, roomFilter, quickMinutes } = variantSelections[variant]

  const updateVariant = (patch: Partial<VariantSelection>) => {
    setVariantSelections(previous => ({
      ...previous,
      [variant]: { ...previous[variant], ...patch },
    }))
  }

  const setProvince = (value: string) => updateVariant({ province: value })
  const setAllProvinces = (value: boolean) => updateVariant({ allProvinces: value })
  const setRoomFilter = (value: RoomFilter) => updateVariant({ roomFilter: value })
  const setQuickMinutes = (value: number) => updateVariant({ quickMinutes: value })
  const presence = useLobbyPresence(province)
  const vacantOnly = roomFilter === 'vacant'
  const [creating, setCreatingState] = useState(false)
  const setCreating = (next: boolean) => { if (next && !lobby.requireEnergy()) return; setCreatingState(next) }
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

  const [message, setMessage] = useState('')
  useEffect(() => {
    if (!message) return
    const timer = window.setTimeout(() => setMessage(''), 2000)
    return () => window.clearTimeout(timer)
  }, [message])
  const [addressNoticeOpen, setAddressNoticeOpen] = useState(false)
  const openProvincePicker = () => {
    if (!useSessionStore.getState().countryCode) {
      setAddressNoticeOpen(true)
      return
    }
    setProvincePickerOpen(true)
  }
  const variantRooms = useMemo(
    () => lobby.rooms.filter(room => (room.variant ?? 'xiangqi') === variant),
    [lobby.rooms, variant]
  )

  const regionRooms = useMemo(() => {
    const occupied = variantRooms.filter(
      room => (room.onlineCount ?? (room.players + (room.viewerCount ?? 0))) > 0
    )
    return allProvinces
      ? preferVietnamRooms(occupied)
      : occupied.filter(
          room => normalizeRoomProvince(room.province) === normalizeRoomProvince(province)
        )
  }, [variantRooms, province, allProvinces])
  const activity = roomRegionActivity(regionRooms)
  const provinceRooms = useMemo(() => {
    const candidates = regionRooms.filter(room => (roomFilter !== 'locked' || room.locked) && (roomFilter !== 'vacant' || (room.players === 1 && room.phase !== 'playing')))
    if (!allProvinces) return candidates
    for (let i = candidates.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [candidates[i], candidates[j]] = [candidates[j], candidates[i]] }
    return candidates.slice(0, 30)
  }, [regionRooms, allProvinces, roomFilter])
  const available = provinceRooms.filter(room => room.players === 1 && room.phase !== 'playing')
  const quickPlay = () => {
    setMessage('')
    lobby.quickPlay(() => setMessage('Không có bàn phù hợp với thời gian đã chọn.'), quickMinutes, allProvinces ? undefined : province, variant)
  }
  return { variantRooms, creationProvince: allProvinces ? '' : province, regionRooms, activity, addressNoticeOpen, setAddressNoticeOpen, openProvincePicker, quickTimeRef, timeOpen, setTimeOpen, quickMinutes, setQuickMinutes, provincePickerOpen, setProvincePickerOpen, province, setProvince, allProvinces, setAllProvinces, vacantOnly, roomFilter, setRoomFilter, creating, setCreating, message, setMessage, quickPlay,
    rooms: roomFilter === 'locked' ? provinceRooms.filter(room => room.locked) : vacantOnly ? available : provinceRooms,
    players: presence.provinceCounts[province] ?? (presence.province === province ? presence.players : 0), provinceCounts: presence.provinceCounts }
}
