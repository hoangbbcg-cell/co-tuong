import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { roomApi, errorMessage } from '../../../services/api'
import { roomSocket } from '../../../services/socket'
import { useSessionStore } from '../../../store/sessionStore'
import { useGameStore } from '../../../store/gameStore'
import { playerNameError } from '../../../lib/playerName'
import { randomAvailableRoom } from '../../../lib/quickRoom'
import type { RoomSummary } from '../../../types/room'

export function useLobby() {
  const session = useSessionStore()
  const client = useQueryClient()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [name, setName] = useState(session.name)
  const [nameError, setNameError] = useState('')
  const [roomSearchNotice, setRoomSearchNotice] = useState(0)
  useEffect(() => { if (!roomSearchNotice) return; const timer = setTimeout(() => setRoomSearchNotice(0), 2000); return () => clearTimeout(timer) }, [roomSearchNotice])
  const validateName = () => {
    const error = playerNameError(name)
    setNameError(error)
    return !error
  }
  const [minutes, setMinutes] = useState(10)
  const [passwordRoom, setPasswordRoom] = useState<RoomSummary | null>(null)
  const requireEnergy = () => {
    const current = useSessionStore.getState()
    if (current.account?.energyUnlimited) return true
    current.recoverEnergy()
    if (useSessionStore.getState().energy > 0) return true
    useSessionStore.getState().showEnergyNotice()
    return false
  }
  const rooms = useQuery({ queryKey: ['rooms'], queryFn: ({ signal }) => roomApi.list(signal), enabled: session.lobbyOpen, refetchInterval: session.lobbyOpen ? 5000 : false, retry: 1 })
  const join = useMutation({
    mutationFn: ({ roomId, password }: { roomId: string; password?: string }) => roomSocket.join(roomId, name.trim(), password),
    onSuccess: room => { setPasswordRoom(null); session.setName(name); session.enterOnline(room); void client.invalidateQueries({ queryKey: ['rooms'] }) },
  })
  const create = useMutation({
    mutationFn: ({ roomMinutes, turnSeconds, province, password }: { roomMinutes: number; turnSeconds: number; province: string; password?: string }) => roomApi.create('Bàn cờ', roomMinutes, turnSeconds, province, password),
    onSuccess: (room, variables) => { void client.invalidateQueries({ queryKey: ['rooms'] }); join.mutate({ roomId: room.id, password: variables.password }) },
  })
  const quick = useMutation({
    mutationFn: async (minutes: number | null) => {
      const latest = await client.fetchQuery({ queryKey: ['rooms'], queryFn: ({ signal }) => roomApi.list(signal), staleTime: 0 })
      const room = randomAvailableRoom(minutes === null ? latest : latest.filter(room => (room.minutes ?? 10) === minutes))
      if (!room) return null
      if (!requireEnergy()) return { blocked: true as const }
      return roomSocket.join(room.id, name.trim())
    },
    onSuccess: room => {
      if (!room || 'blocked' in room) return
      session.setName(name)
      session.enterOnline(room)
      void client.invalidateQueries({ queryKey: ['rooms'] })
    },
  })
  const findRoom = useMutation({
    mutationFn: async (code: string) => {
      const latest = await client.fetchQuery({ queryKey: ['rooms'], queryFn: ({ signal }) => roomApi.list(signal), staleTime: 0 })
      const room = latest.find(candidate => candidate.code === code.trim())
      if (!room) throw new Error('Không tìm thấy phòng có số này.')
      return room
    },
    onError: () => setRoomSearchNotice(value => value + 1),
    onSuccess: room => {
      if (room.phase !== 'playing' && !requireEnergy()) return
      join.reset()
      if (room.locked) { setPasswordRoom(room); return }
      join.mutate({ roomId: room.id })
    },
  })
  useEffect(() => {
    const dialog = dialogRef.current
    if (session.lobbyOpen && !dialog?.open) dialog?.showModal()
    if (!session.lobbyOpen && dialog?.open) dialog.close()
  }, [session.lobbyOpen])
  const joinLocal = () => {
    if (!validateName()) return
    session.setName(name)
    useGameStore.getState().reset(performance.now())
    session.joinLocal()
  }
  return { minutes, setMinutes, province: session.province, dialogRef, open: session.lobbyOpen, name, setName, rooms: rooms.data ?? [], loading: rooms.isLoading,
    pending: join.isPending || create.isPending || quick.isPending || findRoom.isPending, error: session.notice || ((!passwordRoom && join.error) || create.error || quick.error || rooms.error ? errorMessage((!passwordRoom && join.error) || create.error || quick.error || rooms.error) : ''),
    quickPlay: (onNoRoom: () => void, minutes: number | null = null) => {
      if (validateName() && requireEnergy()) quick.mutate(minutes, { onSuccess: room => { if (!room) onNoRoom() } })
    },
    roomSearchNotice: Boolean(roomSearchNotice),
    joinByCode: (code: string) => { if (!/^\d{6}$/.test(code.trim())) { setRoomSearchNotice(value => value + 1); return } if (validateName()) { setRoomSearchNotice(0); join.reset(); findRoom.mutate(code.trim()) } },
    nameError, dismissNameError: () => setNameError(''), validateName,
    passwordRoom, passwordError: join.error ? errorMessage(join.error) : '', dismissPasswordRoom: () => { if (!join.isPending) { setPasswordRoom(null); join.reset() } },
    joinLocal, join: (id: string, password?: string) => {
      if (!validateName()) return
      const room = rooms.data?.find(candidate => candidate.id === id)
      if (room?.phase !== 'playing' && !requireEnergy()) return
      if (room?.locked && password === undefined) { join.reset(); setPasswordRoom(room); return }
      join.mutate({ roomId: id, password })
    }, create: (roomMinutes: number, turnSeconds: number, province = session.province, password?: string) => { if (validateName() && requireEnergy()) create.mutate({ roomMinutes, turnSeconds, province, password }) }, refresh: () => void rooms.refetch() }
}
