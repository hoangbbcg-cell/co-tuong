import { useEffect, useRef } from 'react'
import { showRoomNotice } from '../../../lib/roomNotice'
import type { RoomSnapshot } from '../../../types/room'
import type { Side } from '../../../types/game'

export function useTakebackDeclineNotice({ scope, online, playerSide, notice, computer, localVersion }: {
  scope: string; online: boolean; playerSide?: Side; notice?: RoomSnapshot['takebackDecline']; computer: boolean; localVersion: number
}) {
  const previous = useRef({ scope, id: notice?.id, localVersion })
  useEffect(() => {
    const before = previous.current
    previous.current = { scope, id: notice?.id, localVersion }
    if (before.scope !== scope) return
    if (online && notice && notice.id !== before.id && playerSide && notice.requester === playerSide) showRoomNotice('Từ chối')
    else if (!online && computer && localVersion > before.localVersion) showRoomNotice('Từ chối')
  }, [scope, online, playerSide, notice?.id, computer, localVersion])
}
