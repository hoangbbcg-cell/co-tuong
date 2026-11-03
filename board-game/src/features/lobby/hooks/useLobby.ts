import { isEnergyError } from '../../../lib/energy'
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
  const sessionName = useSessionStore(s => s.name)
  const lobbyOpen = useSessionStore(s => s.lobbyOpen)
  const province = useSessionStore(s => s.province)
  const notice = useSessionStore(s => s.notice)
  const client = useQueryClient()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [name, setName] = useState(sessionName)
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
  const onEnergyError = (error: unknown) => { if (isEnergyError(errorMessage(error))) useSessionStore.getState().showEnergyNotice() }
  const rooms = useQuery({ queryKey: ['rooms'], queryFn: ({ signal }) => roomApi.list(signal), enabled: lobbyOpen, refetchInterval: lobbyOpen ? 5000 : false, retry: 1 })
  const join = useMutation({
    onError: onEnergyError,
    mutationFn: ({ roomId, password }: { roomId: string; password?: string }) => roomSocket.join(roomId, name.trim(), password),
    onSuccess: room => { setPasswordRoom(null); useSessionStore.getState().setName(name); useSessionStore.getState().enterOnline(room); void client.invalidateQueries({ queryKey: ['rooms'] }) },
  })
  const create = useMutation({
    onError: onEnergyError,
    mutationFn: ({ roomMinutes, turnSeconds, province, password }: { roomMinutes: number; turnSeconds: number; province: string; password?: string }) => { if (!requireEnergy()) throw new Error('Không đủ năng lượng.'); return roomApi.create('Bàn cờ', roomMinutes, turnSeconds, province, password) },
    onSuccess: (room, variables) => { void client.invalidateQueries({ queryKey: ['rooms'] }); join.mutate({ roomId: room.id, password: variables.password }) },
  })
  const quick = useMutation({
    onError: onEnergyError,
    mutationFn: async ({ minutes, province }: { minutes: number | null; province?: string }) => {
      const latest = await client.fetchQuery({ queryKey: ['rooms'], queryFn: ({ signal }) => roomApi.list(signal), staleTime: 0 })
      const room = randomAvailableRoom(minutes === null ? latest : latest.filter(room => (room.minutes ?? 10) === minutes), Math.random, 'xiangqi', !useSessionStore.getState().countryCode, { province, allowPasswordlessLocked: true })
      if (!room) return null
      return roomSocket.join(room.id, name.trim())
    },
    onSuccess: room => {
      if (!room) return
      useSessionStore.getState().setName(name)
      useSessionStore.getState().enterOnline(room)
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
      join.reset()
      if (room.passwordRequired ?? room.locked) { setPasswordRoom(room); return }
      join.mutate({ roomId: room.id })
    },
  })
  useEffect(() => {
    const dialog = dialogRef.current
    if (lobbyOpen && !dialog?.open) dialog?.showModal()
    if (!lobbyOpen && dialog?.open) dialog.close()
  }, [lobbyOpen])
  const joinLocal = () => {
    if (!validateName()) return
    useSessionStore.getState().setName(name)
    useGameStore.getState().reset(performance.now())
    useSessionStore.getState().joinLocal()
  }
  return { requireEnergy, minutes, setMinutes, province: province, dialogRef, open: lobbyOpen, name, setName, rooms: rooms.data ?? [], loading: rooms.isLoading,
    pending: join.isPending || create.isPending || quick.isPending || findRoom.isPending, error: notice || ((!passwordRoom && join.error) || create.error || quick.error || rooms.error ? errorMessage((!passwordRoom && join.error) || create.error || quick.error || rooms.error) : ''),
    quickPlay: (onNoRoom: () => void, minutes: number | null = null, province?: string) => {
      if (validateName()) quick.mutate({ minutes, province }, { onSuccess: room => { if (!room) onNoRoom() } })
    },
    roomSearchNotice: Boolean(roomSearchNotice),
    joinByCode: (code: string) => { if (!/^\d{6}$/.test(code.trim())) { setRoomSearchNotice(value => value + 1); return } if (validateName()) { setRoomSearchNotice(0); join.reset(); findRoom.mutate(code.trim()) } },
    nameError, dismissNameError: () => setNameError(''), validateName,
    passwordRoom, passwordError: join.error ? errorMessage(join.error) : '', dismissPasswordRoom: () => { if (!join.isPending) { setPasswordRoom(null); join.reset() } },
    joinLocal, join: (id: string, password?: string) => {
      if (!validateName()) return
      const room = rooms.data?.find(candidate => candidate.id === id)
      if ((room?.passwordRequired ?? room?.locked) && password === undefined) { join.reset(); setPasswordRoom(room); return }
      join.mutate({ roomId: id, password })
    }, create: (roomMinutes: number, turnSeconds: number, province = useSessionStore.getState().province, password?: string) => { if (validateName() && requireEnergy()) create.mutate({ roomMinutes, turnSeconds, province, password }) }, refresh: () => void rooms.refetch() }
}
