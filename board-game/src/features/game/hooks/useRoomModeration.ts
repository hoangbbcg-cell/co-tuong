import { useEffect, useState } from 'react'
import type { RoomCommand, RoomSnapshot } from '../../../types/room'
import { roomSocket, socket } from '../../../services/socket'
import { errorMessage } from '../../../services/api'
import { useSessionStore } from '../../../store/sessionStore'
import { useInviteSentNotice } from '../../lobby/components/InviteSentNotice'

export type ModerationAction = Extract<RoomCommand, { type: 'moderate' }>['action']
export type ModerationTarget = { id: string; name: string; seated: boolean }
export function useRoomModeration(room: RoomSnapshot | null) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [target, setTarget] = useState<ModerationTarget | null>(null)
  const [action, setAction] = useState<ModerationAction | null>(null)
  const [settingsDraft, setSettingsDraft] = useState<{ queueBlocked: boolean; chatBlocked: boolean } | null>(null)
  const [pending, setPending] = useState(false)
  const notice = useInviteSentNotice()
  const owner = !!room?.locked && room.ownerId === socket.id
  useEffect(() => {
    const receive = (event: Event) => notice.show((event as CustomEvent<string>).detail)
    window.addEventListener('room-notice', receive)
    return () => window.removeEventListener('room-notice', receive)
  }, [notice.show])
  useEffect(() => { setSettingsOpen(false); setTarget(null); setAction(null); setSettingsDraft(null) }, [room?.id, owner])
  useEffect(() => {
    if (target && ![...(room?.players ?? []), ...(room?.viewers ?? [])].some(member => member.id === target.id)) { setTarget(null); setAction(null) }
  }, [room, target])
  const send = async (command: RoomCommand) => {
    if (!owner || pending) return
    setPending(true)
    try { useSessionStore.getState().receiveRoom(await roomSocket.command(command)); setTarget(null); setAction(null) }
    catch (error) { notice.show(errorMessage(error)) }
    finally { setPending(false); setSettingsDraft(null) }
  }
  return { queueBlocked: settingsDraft?.queueBlocked ?? !!room?.queueBlocked, chatBlocked: settingsDraft?.chatBlocked ?? !!room?.chatBlocked, owner, settingsOpen, setSettingsOpen, target, action, setAction, pending, notice: notice.notice,
    openTarget: (id: string) => {
      if (!owner || id === socket.id) return
      const seated = room!.players.find(member => member.id === id)
      const member = seated ?? room!.viewers?.find(member => member.id === id)
      if (member) { setTarget({ id, name: member.name, seated: !!seated }); setAction(null) }
    },
    closeTarget: () => { if (!pending) { setTarget(null); setAction(null) } },
    settings: (queueBlocked: boolean, chatBlocked: boolean) => { if (!owner || pending) return; setSettingsDraft({ queueBlocked, chatBlocked }); return send({ type: 'room-settings', queueBlocked, chatBlocked }) },
    confirm: () => target && action ? send({ type: 'moderate', targetId: target.id, action }) : undefined,
  }
}
