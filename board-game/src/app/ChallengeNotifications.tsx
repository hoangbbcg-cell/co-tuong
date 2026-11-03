import { isEnergyError } from '../lib/energy'
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
import { NumberText } from '../lib/NumberText'
import { useInviteSentNotice } from '../features/lobby/components/InviteSentNotice'
import { CHALLENGE_BLOCKED_MESSAGE, CHALLENGE_TABLE_FULL_MESSAGE } from '../types/challenge'

export function ChallengeNotifications() {
  const [invite, setInvite] = useState<ChallengeInvite | null>(null)
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)
  const blockedNotice = useInviteSentNotice()
  const [host, setHost] = useState<Element>(document.body)
  const popup = useRef<HTMLDivElement>(null)
  const name = useSessionStore(s => s.name)
  const avatarIndex = useSessionStore(s => s.avatarIndex)
  const avatarFrameIndex = useSessionStore(s => s.avatarFrameIndex)
  const elo = useSessionStore(s => s.elo)
  const screen = useSessionStore(s => s.screen)
  const mode = useSessionStore(s => s.mode)
  const localPhase = useGameStore(state => state.game.phase)

  useEffect(() => {
    const update = () => { void publishChallengePresence().catch(() => { /* Room/challenge actions surface connection errors. */ }) }
    const receive = (next: ChallengeInvite) => { setInvite(next); setMessage(''); setPending(false) }
    const result = (next: ChallengeResult) => {
      setInvite(current => current?.id === next.id ? null : current)
      if (next.message === CHALLENGE_BLOCKED_MESSAGE) { setMessage(''); blockedNotice.show(next.message) }
      else if (next.message) setMessage(next.message)
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
  }, [name, avatarIndex, avatarFrameIndex, elo, screen, mode, localPhase])
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

  const respond = async (accepted: boolean, duration?: 5 | 10) => {
    if (!invite || pending) return
    setPending(true)
    try { await replyChallenge(invite.id, accepted, duration); setInvite(null) }
    catch (error) { const message = errorMessage(error); if (isEnergyError(message)) useSessionStore.getState().showEnergyNotice(); else if (message === CHALLENGE_TABLE_FULL_MESSAGE) { setInvite(null); setMessage(''); blockedNotice.show(message) } else setMessage(message) }
    finally { setPending(false) }
  }
  if (!invite && !message) return blockedNotice.notice ? createPortal(blockedNotice.notice, host) : null
  return createPortal(<><div ref={popup} popover="manual" role="region" aria-label="Lời mời So tài" aria-live="polite"
    className="fixed inset-auto right-4 bottom-4 z-[2147483647] m-0 w-[min(320px,66.667vw)] max-w-[calc(100vw-24px)] rounded-xl border-[3px] border-[#dca44d] bg-[linear-gradient(135deg,#633516,#241309)] p-[12px] text-[#ffebba] desktop:w-[min(360px,66.667vw)] desktop:p-[16px] compact:w-[66.667vw] compact:[&_p]:text-[16px] compact:[&_p]:leading-relaxed compact:[&_button]:h-[46px] compact:[&_button]:w-[90px] shadow-[inset_0_0_0_2px_#875026,0_4px_24px_#000a]">
    {invite ? <>
      <div className="flex items-start gap-3">
        <div className="relative mt-1 mr-4 size-[48px] shrink-0 cursor-pointer desktop:size-[60px] desktop:[image-rendering:-webkit-optimize-contrast] desktop:[&_img]:[image-rendering:-webkit-optimize-contrast]">
          <AvatarPortrait avatarIndex={invite.sender.avatarIndex} className="size-full rounded-full" />
          <AvatarFrameOverlay src={getAvatarFrame(invite.sender.avatarFrameIndex).image} />
          <AvatarRankBadge elo={invite.sender.elo} />
        </div>
        <div className="min-w-0 flex-1 self-center desktop:-translate-y-[4px]">
          <p className="break-words text-[16px] leading-snug desktop:text-[20px] desktop:font-body compact:text-[16px]! compact:leading-snug!"><span className="font-heading desktop:font-body desktop:[&_span]:text-[1em]"><NumberText text={invite.sender.name} compact weight="normal" soften={false} /></span> muốn so tài.</p>
        </div>
      </div>
      {message && <p role="alert" className="mr-3 text-sm text-[#ffd48b]">{message}</p>}
      <div className="flex justify-end gap-3">
        <button type="button" aria-label="Từ chối So tài" disabled={pending} onClick={() => void respond(false)} className={`${buttonInteraction} grid h-[30px] w-14 desktop:h-[34px] desktop:w-[64px] compact:h-[30px]! compact:w-[64px]! place-items-center rounded-md border-2 border-[#cd9271] bg-[#722d1b] text-[28px] leading-none font-bold text-[#ffe3ce] disabled:opacity-50`}>×</button>
        <button type="button" data-ui-tab-sound aria-label="Chấp nhận So tài" disabled={pending} onClick={() => void respond(true)} className={`${buttonInteraction} grid h-[30px] w-14 desktop:h-[34px] desktop:w-[64px] compact:h-[30px]! compact:w-[64px]! place-items-center rounded-md border-2 border-[#a9cf7b] bg-[#315922] text-[28px] leading-none font-bold text-[#efffc8] disabled:opacity-50`}>✓</button>
      </div>
      <label className="ml-auto mt-2 flex w-2/3 cursor-pointer items-center justify-end gap-[5px] font-body text-[12px] desktop:text-[14px] text-white">
        <span>Không hiển thị lại</span>
        <input type="checkbox" aria-label="Không hiển thị lại lời mời từ người chơi này trong 5 phút" disabled={pending} onChange={event => { if (event.target.checked) void respond(false, 5) }} className="size-[14px] shrink-0 cursor-pointer accent-white [color-scheme:light] disabled:cursor-default" />
      </label>
    </> : <p role="status" className="text-base">{message}</p>}
  </div>{blockedNotice.notice}</>, host)
}
