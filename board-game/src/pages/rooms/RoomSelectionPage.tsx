import { getComputerAvatar } from '../../lib/computerAvatar'
import { useRef, useState } from 'react'
import { RoomSelection } from '../../features/lobby/components/RoomSelection'
import { useLobby } from '../../features/lobby/hooks/useLobby'
import { useHomeMusic } from '../../features/lobby/hooks/useHomeMusic'
import { useSessionStore } from '../../store/sessionStore'
import { useHome } from '../../features/lobby/hooks/useHome'
import { useFriendsLayout } from '../../features/lobby/hooks/useFriendsLayout'
import { useProfileLayout } from '../../features/lobby/hooks/useProfileLayout'
import { useRankingLayout } from '../../features/lobby/hooks/useRankingLayout'
import { FriendsDialog } from '../../features/lobby/components/FriendsDialog'
import { RankingDialog } from '../../features/lobby/components/RankingDialog'
import { ProfileDialog } from '../../features/lobby/components/ProfileDialog'
import { MessagesDialog, type MessageConversationRequest } from '../../features/lobby/components/MessagesDialog'
import { homeUtilityButton as utility } from '../../lib/uiClasses'

export function RoomSelectionPage({ onEntranceComplete }: { onEntranceComplete: () => void }) {
  const lobby = useLobby()
  const home = useHome()
  const music = useHomeMusic()
  const friendsLayout = useFriendsLayout()
  const profileLayout = useProfileLayout()
  const rankingLayout = useRankingLayout()
  const historyPlayerProfileRef = useRef<HTMLDialogElement>(null)
  const messagesRef = useRef<HTMLDialogElement>(null)
  const messageRequestId = useRef(0)
  const [messageRequest, setMessageRequest] = useState<MessageConversationRequest | null>(null)
  const [historyPlayerName, setHistoryPlayerName] = useState('')
  const openMessages = (name?: string, image?: string, status?: 'online' | 'offline', playerId?: string) => {
    if (name) setMessageRequest({ id: ++messageRequestId.current, name, image, status, playerId })
    if (!messagesRef.current?.open) messagesRef.current?.showModal()
  }
  const openPlayerProfile = (playerName: string) => {
    if (getComputerAvatar(playerName)) return
    if (playerName === home.name) {
      home.openProfile()
      return
    }
    setHistoryPlayerName(playerName)
    if (!historyPlayerProfileRef.current?.open) historyPlayerProfileRef.current?.showModal()
  }
  return <main aria-label="Chọn Bàn" className="flex h-dvh w-full items-center justify-center overflow-hidden bg-[#263a35] text-[#eee4ce]">
    <div className="relative h-[calc(100dvh-12px)] w-[calc(100%-240px)] overflow-hidden border-[5px] border-[#80582c] shadow-[inset_0_0_0_2px_#efd397,0_0_0_1px_#e1c993,0_8px_30px_#101d18aa] compact:w-[calc(100%-12px)]">
    <RoomSelection lobby={lobby} music={music} onEntranceComplete={onEntranceComplete} onOpenFriends={home.openFriends} onOpenRanking={home.openRanking} onOpenProfile={() => { if (lobby.name.trim()) useSessionStore.getState().setName(lobby.name); home.openProfile() }} onFullscreen={() => void home.fullscreen()} onClose={() => { if (lobby.name.trim()) useSessionStore.getState().setName(lobby.name); useSessionStore.setState({ screen: 'home', lobbyOpen: false }) }}/>
    <dialog ref={home.messageRef} aria-label="Thông báo" className="m-auto w-[min(384px,90vw)] rounded-xl border border-[#c7a264] bg-[#30271e] p-6 text-center text-[#f7e6c1] shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm" onCancel={() => home.setMessage('')}>
      <p className="leading-relaxed">{home.message}</p><button autoFocus className={`${utility} mx-auto mt-5 w-auto px-6 text-base`} onClick={() => home.setMessage('')}>Đã hiểu</button>
    </dialog>
    <ProfileDialog layout={profileLayout} dialogRef={home.profileRef} name={home.name} editable onClose={home.closeProfile} primaryActionLabel="Liên kết tài khoản" onPrimaryAction={() => home.setMessage('Liên kết tài khoản sắp ra mắt. Hiện bạn đang chơi với tư cách khách.')} />
    <MessagesDialog layout={rankingLayout} dialogRef={messagesRef} openRequest={messageRequest} onViewInfo={openPlayerProfile} onClose={() => messagesRef.current?.close()} />
    <ProfileDialog layout={profileLayout} dialogRef={historyPlayerProfileRef} name={historyPlayerName} onOpenMessages={(name, playerId) => openMessages(name, undefined, undefined, playerId)} onClose={() => historyPlayerProfileRef.current?.close()} primaryActionLabel="Kết bạn" onPrimaryAction={() => {
      historyPlayerProfileRef.current?.close()
      home.setMessage('Tính năng kết bạn sắp ra mắt.')
    }} />
    <RankingDialog layout={rankingLayout} dialogRef={home.rankingRef} onClose={home.closeRanking} onOpenProfile={openPlayerProfile} />
    <FriendsDialog layout={friendsLayout} dialogRef={home.friendsRef} onClose={home.closeFriends} onOpenProfile={openPlayerProfile} onOpenMessages={openMessages} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-[2px] z-10 border border-[#e3bf78] shadow-[inset_0_0_0_2px_#63472055]" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 left-0 z-10 font-georgia text-[38px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
      <span aria-hidden="true" className="pointer-events-none absolute right-0 -bottom-1 z-10 -scale-x-100 font-georgia text-[38px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
    </div>
  </main>
}
