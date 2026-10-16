import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ChallengeInvite, ChallengeResult, ChallengeAccepted } from '../types/challenge'
import { socket } from '../services/socket'
import { publishChallengePresence, replyChallenge } from '../services/challenge'
import { errorMessage } from '../services/api'
import { useSessionStore } from '../store/sessionStore'
import { useGameStore } from '../store/gameStore'
import { AvatarPortrait } from '../features/lobby/components/AvatarCustomization'
import { AvatarFrameOverlay } from '../features/game/components/AvatarFrameOverlay'
import { AvatarRankBadge } from '../features/game/components/AvatarRankBadge'
import { getAvatarFrame } from '../lib/avatarFrames'
import { buttonInteraction } from '../lib/uiClasses'

export function ChallengeNotifications() {
  const [invite, setInvite] = useState<ChallengeInvite | null>(null)
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)
  const [host, setHost] = useState<Element>(document.body)
  const popup = useRef<HTMLDivElement>(null)
  const session = useSessionStore()
  const localPhase = useGameStore(state => state.game.phase)

  useEffect(() => {
    const update = () => { void publishChallengePresence().catch(() => { /* Room/challenge actions surface connection errors. */ }) }
    const receive = (next: ChallengeInvite) => { setInvite(next); setMessage(''); setPending(false) }
    const result = (next: ChallengeResult) => {
      setInvite(current => current?.id === next.id ? null : current)
      if (next.message) setMessage(next.message)
    }
    const accepted = ({ room }: ChallengeAccepted) => {
      // Close top-layer dialogs before switching the active table.
      document.querySelectorAll<HTMLDialogElement>('dialog[open]').forEach(dialog => dialog.close())
      useGameStore.getState().reset(performance.now())
      useSessionStore.getState().enterOnline(room)
      setInvite(null); setMessage('')
    }
    const disconnected = () => { setInvite(null); setPending(false) }
    socket.on('connect', update)
    socket.on('challenge:invite', receive)
    socket.on('challenge:result', result)
    socket.on('challenge:accepted', accepted)
    socket.on('disconnect', disconnected)
    update()
    return () => {
      socket.off('connect', update); socket.off('challenge:invite', receive)
      socket.off('challenge:result', result); socket.off('challenge:accepted', accepted)
      socket.off('disconnect', disconnected)
    }
  }, [])
  useEffect(() => {
    void publishChallengePresence().catch(() => {})
  }, [session.name, session.avatarIndex, session.avatarFrameIndex, session.elo, session.screen, session.mode, localPhase])
  useEffect(() => {
    if (!invite) return
    const timeout = window.setTimeout(() => { setInvite(null); setMessage('') }, Math.max(0, invite.expiresAt - Date.now()))
    return () => clearTimeout(timeout)
  }, [invite])
  useEffect(() => {
    if (!message || invite) return
    const timeout = window.setTimeout(() => setMessage(''), 5000)
    return () => clearTimeout(timeout)
  }, [message, invite])
  // A portal inside the foremost modal avoids its inert subtree. Manual popover
  // places the notice in the browser top layer, above every existing dialog.
  useLayoutEffect(() => {
    const updateHost = () => {
      const dialogs = document.querySelectorAll('dialog[open]')
      setHost(dialogs.item(dialogs.length - 1) ?? document.body)
    }
    updateHost()
    const observer = new MutationObserver(updateHost)
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['open'] })
    return () => observer.disconnect()
  }, [])
  useLayoutEffect(() => {
    const element = popup.current
    if (!element || (!invite && !message)) return
    element.showPopover()
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? null : element.animate([{ transform: 'translateX(calc(100% + 24px))', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }], { duration: 420, easing: 'ease-out' })
    return () => { motion?.cancel(); if (element.matches(':popover-open')) element.hidePopover() }
  }, [host, invite?.id, Boolean(message)])

  const respond = async (accepted: boolean) => {
    if (!invite || pending) return
    setPending(true)
    try { await replyChallenge(invite.id, accepted); setInvite(null) }
    catch (error) { setMessage(errorMessage(error)) }
    finally { setPending(false) }
  }
  if (!invite && !message) return null
  return createPortal(<div ref={popup} popover="manual" role="region" aria-label="Lời mời So tài" aria-live="polite"
    className="fixed inset-auto right-4 bottom-4 z-[2147483647] m-0 w-[380px] max-w-[calc(100vw-24px)] rounded-xl border-[3px] border-[#dca44d] bg-[linear-gradient(135deg,#633516,#241309)] p-4 text-[#ffebba] shadow-[inset_0_0_0_2px_#875026,0_4px_24px_#000a]">
    {invite ? <>
      <div className="flex items-start gap-4">
        <div className="relative mt-1 mr-8 size-[76px] shrink-0 cursor-pointer">
          <AvatarPortrait avatarIndex={invite.sender.avatarIndex} className="size-full rounded-full" />
          <AvatarFrameOverlay src={getAvatarFrame(invite.sender.avatarFrameIndex).image} />
          <AvatarRankBadge elo={invite.sender.elo} />
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <p className="break-words font-heading text-2xl font-bold leading-tight">{invite.sender.name}</p>
          <p className="mt-2 break-words text-base leading-snug"><span className="font-heading">{invite.sender.name}</span> muốn so tài.</p>
        </div>
      </div>
      {message && <p role="alert" className="mr-3 text-sm text-[#ffd48b]">{message}</p>}
      <div className="flex justify-end gap-3">
        <button type="button" aria-label="Chấp nhận So tài" disabled={pending} onClick={() => void respond(true)} className={`${buttonInteraction} h-10 w-20 rounded-md border-2 border-[#a9cf7b] bg-[#315922] text-2xl font-bold text-[#efffc8] disabled:opacity-50`}>✓</button>
        <button type="button" aria-label="Từ chối So tài" disabled={pending} onClick={() => void respond(false)} className={`${buttonInteraction} h-10 w-20 rounded-md border-2 border-[#cd9271] bg-[#722d1b] text-2xl font-bold text-[#ffe3ce] disabled:opacity-50`}>×</button>
      </div>
    </> : <p role="status" className="text-base">{message}</p>}
  </div>, host)
}
