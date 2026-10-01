import type { useLobby } from '../hooks/useLobby'
import { buttonInteraction, lobbyButton } from '../../../lib/uiClasses'

export function LobbyDialog({ lobby, onClose }: { lobby: ReturnType<typeof useLobby>; onClose?: () => void }) {
  return <dialog ref={lobby.dialogRef} id="lobbyDialog" className="m-auto max-h-[90dvh] w-[min(340px,90%)] overflow-y-auto rounded-md border border-[#b59754] bg-[#193932] p-5 text-[#ffe3a0] backdrop:bg-[#061917dd]" aria-labelledby="lobbyTitle" onCancel={event => event.preventDefault()}>
    <form id="joinForm" className="grid gap-3.5" onSubmit={event => { event.preventDefault(); lobby.joinLocal() }}>
      {onClose && <button type="button" className={`${lobbyButton} justify-self-end`} onClick={onClose}>Đóng</button>}
      <h2 id="lobbyTitle" className="m-0 text-[22px]">Vào phòng cờ</h2>
      <label htmlFor="playerName">Tên người chơi</label>
      <input id="playerName" className="min-w-0 bg-white p-2.5 text-[#1c2924]" value={lobby.name} onChange={event => lobby.setName(event.target.value)} maxLength={24} required />
      <button className={`${buttonInteraction} rounded border-0 bg-[#d1ad65] p-2.5`} type="submit" disabled={lobby.pending || !lobby.name.trim()}>Chơi cùng máy</button>
    </form>
    <section className="mt-5 grid gap-3 border-t border-amber-200/30 pt-4" aria-label="Phòng online">
      <div className="flex items-center justify-between gap-2"><h3 className="font-bold">Phòng online</h3><button className={lobbyButton} onClick={lobby.refresh} disabled={lobby.loading}>Làm mới</button></div>
      <form className="flex gap-2" onSubmit={event => { event.preventDefault(); lobby.create() }}>
        <input className="min-w-0 flex-1 rounded bg-white px-2 py-2 text-stone-900" aria-label="Tên phòng" value={lobby.roomName} onChange={event => lobby.setRoomName(event.target.value)} maxLength={40} required />
        <button className={lobbyButton} type="submit" disabled={lobby.pending || !lobby.name.trim() || !lobby.roomName.trim()}>Tạo phòng</button>
      </form>
      {lobby.error && <p role="alert" className="text-sm text-red-200">{lobby.error}</p>}
      {!lobby.rooms.length && !lobby.loading && <p className="text-sm">Chưa có phòng. Bạn có thể tạo phòng mới.</p>}
      <ul className="grid max-h-48 gap-2 overflow-y-auto">
        {lobby.rooms.map(room => <li key={room.id} className="flex items-center justify-between gap-2 rounded bg-black/20 p-2 text-sm">
          <span className="min-w-0 break-words">{room.name} · {room.players}/2</span>
          <button className={`${lobbyButton} shrink-0`} disabled={lobby.pending || !lobby.name.trim()} onClick={() => lobby.join(room.id)}>{room.players >= 2 || room.phase === 'playing' ? 'Xem phòng' : 'Vào phòng'}</button>
        </li>)}
      </ul>
    </section>
  </dialog>
}
