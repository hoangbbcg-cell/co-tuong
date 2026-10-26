import { useEffect } from 'react'
import type { RefObject } from 'react'
import type { Side } from '../../../types/game'
import type { RoomReaction } from '../../../types/room'
import { socket } from '../../../services/socket'
import { useSessionStore } from '../../../store/sessionStore'

export function sendRoomReaction(targetSide: Side, reaction: string) {
  const { room, mode, screen } = useSessionStore.getState()
  if (mode !== 'online' || screen !== 'game' || !room || !socket.connected) return
  const target = room.players.find(player => player.side === targetSide)
  if (!target) return
  socket.emit('room:reaction', { targetSide, targetId: target.id, reaction }, reply => {
    if (!reply.ok) useSessionStore.getState().setNotice(reply.error)
  })
}

export function useRoomReactions(side: Side, layerRef: RefObject<HTMLSpanElement | null>) {
  const session = useSessionStore(state => state.mode === 'online' && state.room ? state.room.id + ':' + state.room.players.map(player => player.id).sort().join(':') + ':' + (state.room.activeMatchId ?? '') : '')
  useEffect(() => {
    const animations = new Set<Animation>()
    const receive = (event: RoomReaction) => {
      const { room, mode, screen } = useSessionStore.getState()
      if (mode !== 'online' || screen !== 'game' || !room || event.roomId !== room.id || event.targetSide !== side) return
      if (room.players.find(player => player.side === side)?.id !== event.targetId || room.players.map(player => player.id).sort().join(':') !== event.players.join(':')) return
      if (event.matchId !== (room.activeMatchId ?? room.lastCompletedMatch?.id)) return
      const layer = layerRef.current
      if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const bubble = document.createElement('span')
      bubble.textContent = event.reaction
      bubble.className = 'pointer-events-none absolute left-1/2 top-1/2 z-20 grid size-8 place-items-center rounded-full border border-[#fff4cb99] bg-[#233a32e6] text-xl shadow-[0_0_12px_#ffe2a188] compact:size-7'
      layer.append(bubble)
      const animation = bubble.animate([{ opacity: 1, transform: 'translate(-50%,-50%) scale(.72)' }, { opacity: 1, offset: .2, transform: 'translate(-50%,-90%) scale(1)' }, { opacity: 0, transform: 'translate(-50%,-205%) scale(.75)' }], { duration: 1200, easing: 'cubic-bezier(.2,.65,.3,1)' })
      animations.add(animation)
      const remove = () => { bubble.remove(); animations.delete(animation) }
      animation.onfinish = remove
      animation.oncancel = remove
    }
    socket.on('room:reaction', receive)
    return () => { socket.off('room:reaction', receive); animations.forEach(animation => animation.cancel()) }
  }, [side, layerRef, session])
}
