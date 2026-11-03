import { HovangLoadingOverlay } from '../../components/HovangLoadingOverlay'
import { oneChoiceNoticeDialog, oneChoiceNoticeButton } from '../../features/lobby/components/OneChoiceNoticeStyles'
import { getComputerAvatar } from '../../lib/computerAvatar'
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
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
import type { MessageConversationRequest } from '../../features/lobby/components/MessagesDialog'
import { homeUtilityButton as utility } from '../../lib/uiClasses'

const LazyMessagesDialog = lazy(() =>
  import('../../features/lobby/components/MessagesDialog')
    .then(module => ({ default: module.MessagesDialog }))
)

function MessagesMountReady({ onReady }: { onReady: () => void }) {
  useEffect(() => { onReady() }, [onReady])
  return null
}

export function RoomSelectionPage({ onEntranceComplete }: { onEntranceComplete: () => void }) {
  const lobby = useLobby()
  const home = useHome()
  const music = useHomeMusic()
  const friendsLayout = useFriendsLayout()
  const profileLayout = useProfileLayout()
  const rankingLayout = useRankingLayout()
  const historyPlayerProfileRef = useRef<HTMLDialogElement>(null)
  const messagesRef = useRef<HTMLDialogElement>(null)
  const [messagesMounted, setMessagesMounted] = useState(false)
  const messageRequestId = useRef(0)
  const [messageRequest, setMessageRequest] = useState<MessageConversationRequest | null>(null)
  const [historyPlayerName, setHistoryPlayerName] = useState('')
  const openMessages = (name?: string, image?: string, status?: 'online' | 'offline', playerId?: string) => {
    if (name) setMessageRequest({ id: ++messageRequestId.current, name, image, status, playerId })
    setMessagesMounted(true)
    if (messagesRef.current && !messagesRef.current.open) messagesRef.current.showModal()
  }
  const showMountedMessages = useCallback(() => {
    if (messagesRef.current && !messagesRef.current.open) messagesRef.current.showModal()
  }, [])
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
    <div className="relative h-dvh w-full overflow-hidden desktop:h-[calc(100dvh-12px)] desktop:w-[calc(100%-240px)] desktop:border-[5px] desktop:border-[#80582c]">
    <RoomSelection lobby={lobby} music={music} onEntranceComplete={onEntranceComplete} onOpenFriends={home.openFriends} onOpenRanking={home.openRanking} onOpenProfile={() => { if (lobby.name.trim()) useSessionStore.getState().setName(lobby.name); home.openProfile() }} onFullscreen={() => void home.fullscreen()} onClose={() => { if (lobby.name.trim()) useSessionStore.getState().setName(lobby.name); useSessionStore.setState({ screen: 'home', lobbyOpen: false }) }}/>
    <dialog ref={home.messageRef} aria-label="Thông báo" className={`${oneChoiceNoticeDialog} backdrop:bg-black/60 backdrop:backdrop-blur-sm`} onCancel={() => home.setMessage('')}>
      <p className="leading-relaxed">{home.message}</p><button autoFocus className={oneChoiceNoticeButton} onClick={() => home.setMessage('')}>Đã hiểu</button>
    </dialog>
    <ProfileDialog layout={profileLayout} dialogRef={home.profileRef} name={home.name} editable accountActions={false} onClose={home.closeProfile} primaryActionLabel="Liên kết tài khoản" onPrimaryAction={() => home.setMessage('Liên kết tài khoản sắp ra mắt. Hiện bạn đang chơi với tư cách khách.')} />
    {messagesMounted && <Suspense fallback={<HovangLoadingOverlay fullscreen />}>
      <LazyMessagesDialog layout={rankingLayout} dialogRef={messagesRef} openRequest={messageRequest} onViewInfo={openPlayerProfile} onClose={() => messagesRef.current?.close()} />
      <MessagesMountReady onReady={showMountedMessages} />
    </Suspense>}
    <ProfileDialog layout={profileLayout} dialogRef={historyPlayerProfileRef} name={historyPlayerName} onOpenMessages={(name, playerId) => openMessages(name, undefined, undefined, playerId)} onClose={() => historyPlayerProfileRef.current?.close()} primaryActionLabel="Kết bạn" onPrimaryAction={() => {
      historyPlayerProfileRef.current?.close()
      home.setMessage('Tính năng kết bạn sắp ra mắt.')
    }} />
    <RankingDialog layout={rankingLayout} dialogRef={home.rankingRef} onClose={home.closeRanking} onOpenProfile={openPlayerProfile} />
    <FriendsDialog layout={friendsLayout} dialogRef={home.friendsRef} onClose={home.closeFriends} onOpenProfile={openPlayerProfile} onOpenMessages={openMessages} />
    </div>
  </main>
}
