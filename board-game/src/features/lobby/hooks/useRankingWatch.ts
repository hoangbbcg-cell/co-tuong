import { useEffect, useState, type RefObject } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { roomApi, errorMessage } from '../../../services/api'
import { roomSocket } from '../../../services/socket'
import { useSessionStore } from '../../../store/sessionStore'
import type { RoomSummary } from '../../../types/room'

export function useRankingWatch(dialogRef: RefObject<HTMLDialogElement | null>, onClose: () => void, mode: 'xiangqi' | 'hidden') {
  const [open, setOpen] = useState(false)
  const [target, setTarget] = useState<{ room: RoomSummary; name: string } | null>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const update = () => setOpen(dialog.open)
    update()
    const observer = new MutationObserver(update)
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] })
    return () => observer.disconnect()
  }, [dialogRef])
  const rooms = useQuery({ queryKey: ['rooms'], queryFn: ({ signal }) => roomApi.list(signal), enabled: open, refetchInterval: open ? 5000 : false, retry: 1 })
  const matchFor = (name: string, list = rooms.data ?? []) => mode === 'xiangqi' ? list.find(room => room.phase === 'playing' && room.playerNames?.includes(name)) : undefined
  const join = useMutation({
    mutationFn: async ({ roomId, name, password }: { roomId: string; name: string; password?: string }) => {
      const current = matchFor(name, await roomApi.list())
      if (!current || current.id !== roomId) throw new Error('Người chơi không còn đang đấu trong phòng này.')
      return roomSocket.join(roomId, useSessionStore.getState().name, password, true)
    },
    onSuccess: room => { setTarget(null); onClose(); useSessionStore.getState().enterOnline(room) },
  })
  return {
    matchFor,
    watch: (name: string) => {
      const room = matchFor(name)
      if (!room || join.isPending) return
      join.reset()
      if (room.locked) setTarget({ room, name })
      else join.mutate({ roomId: room.id, name })
    },
    error: join.error ? errorMessage(join.error) : '',
    passwordControls: {
      passwordRoom: target?.room ?? null,
      pending: join.isPending,
      passwordError: join.error ? errorMessage(join.error) : '',
      join: (roomId: string, password?: string) => { if (target) join.mutate({ roomId, name: target.name, password }) },
      dismissPasswordRoom: () => { if (!join.isPending) { setTarget(null); join.reset() } },
    },
  }
}
