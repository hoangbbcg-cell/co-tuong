import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { roomApi, errorMessage } from '../../../services/api'
import { roomSocket } from '../../../services/socket'
import { useSessionStore } from '../../../store/sessionStore'
import { useGameStore } from '../../../store/gameStore'

export function useLobby() {
  const session = useSessionStore()
  const client = useQueryClient()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [name, setName] = useState(session.name)
  const [minutes, setMinutes] = useState(10)
  const [roomName, setRoomName] = useState('Phòng cờ của tôi')
  const rooms = useQuery({ queryKey: ['rooms'], queryFn: ({ signal }) => roomApi.list(signal), enabled: session.lobbyOpen, refetchInterval: session.lobbyOpen ? 5000 : false, retry: 1 })
  const join = useMutation({
    mutationFn: (roomId: string) => roomSocket.join(roomId, name.trim()),
    onSuccess: room => { session.setName(name); session.enterOnline(room); void client.invalidateQueries({ queryKey: ['rooms'] }) },
  })
  const create = useMutation({
    mutationFn: () => roomApi.create(roomName.trim(), minutes),
    onSuccess: room => { void client.invalidateQueries({ queryKey: ['rooms'] }); join.mutate(room.id) },
  })
  useEffect(() => {
    const dialog = dialogRef.current
    if (session.lobbyOpen && !dialog?.open) dialog?.showModal()
    if (!session.lobbyOpen && dialog?.open) dialog.close()
  }, [session.lobbyOpen])
  const joinLocal = () => {
    if (!name.trim()) return
    session.setName(name)
    useGameStore.getState().reset(performance.now())
    session.joinLocal()
  }
  return { minutes, setMinutes, dialogRef, open: session.lobbyOpen, name, setName, roomName, setRoomName, rooms: rooms.data ?? [], loading: rooms.isFetching,
    pending: join.isPending || create.isPending, error: session.notice || (join.error || create.error || rooms.error ? errorMessage(join.error || create.error || rooms.error) : ''),
    joinLocal, join: (id: string) => join.mutate(id), create: () => create.mutate(), refresh: () => void rooms.refetch() }
}
