import { randomUUID } from 'node:crypto'
import { performance } from 'node:perf_hooks'
import { createGame, opposite } from '../../src/game/state/initial'
import { advanceClock, applyMove, finishGame, startGame, takebackSnapshot, MATCH_INTRO_MS } from '../../src/game/moves/actions'
import { isInsideBoard } from '../../src/game/rules'
import type { RoomCommand, RoomSnapshot, RoomSummary } from '../../src/types/room'
import type { GameState, Position } from '../../src/types/game'
import { ROOM_MINUTES } from '../../src/types/room'
import { RoomRepository } from '../repositories/roomRepository'

export class RoomError extends Error {}
function textInput(value: unknown, limit: number): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > limit) throw new RoomError(`Nội dung phải có 1–${limit} ký tự.`)
  return value.trim()
}
function position(value: unknown): value is Position {
  if (!value || typeof value !== 'object') return false
  const point = value as Position
  return isInsideBoard(point.row, point.col)
}
export class RoomService {
  private histories = new Map<string, GameState[]>()
  constructor(private repository: RoomRepository, private now = () => performance.now()) {}
  list(): RoomSummary[] {
    this.repository.pruneEmpty()
    return this.repository.all().map(({ id, name, players, game, minutes }) => ({ id, name, players: players.length, phase: game.phase, minutes: minutes ?? 10 }))
  }
  create(name: unknown, minutes: unknown = 10): RoomSummary {
    if (typeof minutes !== 'number' || !ROOM_MINUTES.some(value => value === minutes)) throw new RoomError('Thời gian không hợp lệ.')
    this.repository.pruneEmpty()
    if (this.repository.all().length >= 100) throw new RoomError('Máy chủ đã đủ phòng. Vui lòng dùng phòng có sẵn.')
    const room: RoomSnapshot = { id: randomUUID(), name: textInput(name, 40), players: [], viewers: [], minutes, game: createGame(this.now(), minutes * 60_000), nextMatchOffer: null, nextMatchDeclinedId: null, messages: [], drawOffer: null, takebackOffer: null, takebackDecline: null, takebackRemaining: { red: 2, black: 2 }, moveCount: 0 }
    this.histories.set(room.id, [])
    this.repository.save(room)
    return { id: room.id, name: room.name, players: 0, phase: 'ready', minutes }
  }
  private get(id: string) {
    const room = this.repository.get(id)
    if (!room) throw new RoomError('Phòng không còn tồn tại.')
    return room
  }
  roomFor(playerId: string) { return this.repository.all().find(room => room.players.some(player => player.id === playerId) || room.viewers?.some(viewer => viewer.id === playerId)) }
  private memberRoom(playerId: string) {
    const room = this.roomFor(playerId)
    if (!room) throw new RoomError('Bạn chưa vào phòng.')
    return room
  }
  private append(room: RoomSnapshot, name: string, text: string, system = false) {
    room.messages = [...room.messages, { id: randomUUID(), name, text, system }].slice(-100)
  }
  private syncNextMatchOffer(room: RoomSnapshot) {
    const winner = room.game.result?.winner
    const nextViewer = room.viewers?.find(viewer => viewer.queued)
    const eligible = room.game.phase === 'finished'
      && room.game.result?.reason !== 'leave'
      && winner !== null && winner !== undefined
      && room.players.length === 2
      && room.players.some(player => player.side === winner)
      && room.players.some(player => player.side === opposite(winner))

    if (!eligible || !nextViewer) {
      room.nextMatchOffer = null
      room.nextMatchDeclinedId = null
      return
    }
    if (room.nextMatchDeclinedId === nextViewer.id) {
      room.nextMatchOffer = null
      return
    }
    if (room.nextMatchOffer?.winner === winner && room.nextMatchOffer.nextPlayerId === nextViewer.id) return
    room.nextMatchOffer = { id: randomUUID(), winner, loser: opposite(winner), nextPlayerId: nextViewer.id }
    room.nextMatchDeclinedId = null
  }
  join(id: unknown, playerId: string, name: unknown): RoomSnapshot {
    const room = this.get(textInput(id, 64))
    const playerName = textInput(name, 24)
    const current = this.roomFor(playerId)
    if (current?.id === room.id) return room
    if (current) throw new RoomError('Hãy rời phòng hiện tại trước.')
    if (room.players.length >= 2 || room.game.phase === 'playing') {
      room.viewers = [...(room.viewers ?? []), { id: playerId, name: playerName, queued: false }]
    } else {
      const side = room.players.some(player => player.side === 'red') ? 'black' : 'red'
      room.players = [...room.players, { id: playerId, name: playerName, side, ready: false }]
    }
    this.append(room, '', `${playerName} đã vào phòng.`, true)
    this.repository.save(room)
    return room
  }
  leave(playerId: string): RoomSnapshot | null {
    const room = this.roomFor(playerId)
    if (!room) return null
    const viewer = room.viewers?.find(member => member.id === playerId)
    if (viewer) {
      room.viewers = room.viewers!.filter(member => member.id !== playerId)
      this.append(room, '', `${viewer.name} đã rời phòng.`, true)
      this.syncNextMatchOffer(room)
      if (!room.players.length && !room.viewers.length) { this.repository.delete(room.id); this.histories.delete(room.id) }
      else this.repository.save(room)
      return room
    }
    const player = room.players.find(player => player.id === playerId)
    if (!player) return null
    room.game = advanceClock(room.game, this.now())
    if (room.game.phase === 'playing') room.game = finishGame(room.game, opposite(player.side), 'leave')
    room.players = room.players.filter(player => player.id !== playerId).map(player => ({ ...player, ready: false }))
    this.append(room, '', `${player.name} đã rời phòng.`, true)
    const nextViewer = room.viewers?.find(member => member.queued)
    if (nextViewer) {
      room.viewers = room.viewers!.filter(member => member.id !== nextViewer.id)
      room.players = [...room.players, { id: nextViewer.id, name: nextViewer.name, side: player.side, ready: false }]
      this.append(room, '', `${nextViewer.name} đã được chuyển từ hàng chờ lên bàn.`, true)
    }
    room.drawOffer = null
    room.takebackOffer = null
    this.syncNextMatchOffer(room)
    if (!room.players.length && !room.viewers?.length) { this.repository.delete(room.id); this.histories.delete(room.id) }
    else this.repository.save(room)
    return room
  }
  command(playerId: string, input: unknown): RoomSnapshot {
    const room = this.memberRoom(playerId)
    if (!input || typeof input !== 'object' || !('type' in input)) throw new RoomError('Thao tác không hợp lệ.')
    const command = input as RoomCommand
    const viewer = room.viewers?.find(member => member.id === playerId)
    if (command.type === 'join-queue' || command.type === 'leave-queue') {
      if (!viewer) throw new RoomError('Chỉ người xem mới có thể xếp hàng.')
      if (command.type === 'join-queue' && room.players.length < 2 && room.game.phase !== 'playing') {
        const side = room.players.some(member => member.side === 'red') ? 'black' : 'red'
        room.viewers = room.viewers!.filter(member => member.id !== playerId)
        room.players = [...room.players, { id: viewer.id, name: viewer.name, side, ready: false }]
        this.append(room, '', `${viewer.name} đã vào ghế trống.`, true)
      } else if (command.type === 'join-queue') {
        room.viewers = [...room.viewers!.filter(member => member.id !== playerId), { ...viewer, queued: true }]
      } else {
        viewer.queued = false
      }
      this.syncNextMatchOffer(room)
      this.repository.save(room)
      return room
    }
    const player = room.players.find(member => member.id === playerId)
    if (!player) throw new RoomError('Người xem không thể thao tác ván cờ.')
    const previousNextMatchOffer = room.nextMatchOffer ?? null
    const now = this.now()
    room.game = room.takebackOffer ? { ...room.game, lastClockUpdate: now } : advanceClock(room.game, now)
    if (room.game.phase === 'finished') {
      room.drawOffer = null
      room.takebackOffer = null
    }
    this.syncNextMatchOffer(room)
    if (room.nextMatchOffer && command.type !== 'reply-next-match') throw new RoomError('Hãy trả lời lời mời đấu tiếp trước.')
    switch (command.type) {
      case 'ready':
        if (room.nextMatchOffer) throw new RoomError('Hãy trả lời lời mời đấu tiếp trước.')
        if (room.game.phase === 'finished') {
          room.game = createGame(now, (room.minutes ?? 10) * 60_000)
          room.players = room.players.map(member => ({ ...member, ready: false }))
          room.drawOffer = null
          room.takebackOffer = null
          room.takebackRemaining = { red: 2, black: 2 }
          room.moveCount = 0
          room.nextMatchDeclinedId = null
          this.histories.set(room.id, [])
        }
        if (room.game.phase !== 'ready') throw new RoomError('Ván đã bắt đầu.')
        room.players.find(member => member.id === playerId)!.ready = true
        if (room.players.length === 2 && room.players.every(player => player.ready)) room.game = startGame(room.game, now, MATCH_INTRO_MS)
        break
      case 'move': {
        if (room.takebackOffer) throw new RoomError('Hãy trả lời yêu cầu đi lại trước.')
        if (!command.move || !position(command.move.from) || !position(command.move.to)) throw new RoomError('Tọa độ không hợp lệ.')
        const before = takebackSnapshot(room.game)
        const next = applyMove(room.game, command.move, now, player.side, { forceCheckmate: (room.moveCount ?? 0) === 0 })
        if (next.board === room.game.board) throw new RoomError('Nước đi không hợp lệ hoặc chưa đến lượt bạn.')
        this.histories.set(room.id, [...(this.histories.get(room.id) ?? []), before].slice(-500))
        room.game = next
        room.moveCount = (room.moveCount ?? 0) + 1
        room.drawOffer = null
        break
      }
      case 'resign':
        if (room.game.phase !== 'playing') throw new RoomError('Ván chưa diễn ra.')
        room.game = finishGame(room.game, opposite(player.side), 'resign')
        room.drawOffer = null
        break
      case 'offer-draw':
        if (room.game.phase !== 'playing' || room.drawOffer) throw new RoomError('Không thể cầu hòa lúc này.')
        room.drawOffer = player.side
        break
      case 'reply-draw':
        if (room.game.phase !== 'playing' || !room.drawOffer || room.drawOffer === player.side || typeof command.accepted !== 'boolean') throw new RoomError('Không có lời cầu hòa từ đối thủ.')
        if (command.accepted) room.game = finishGame(room.game, null, 'draw')
        else this.append(room, '', `${player.name} từ chối cầu hòa.`, true)
        room.drawOffer = null
        break
      case 'reply-next-match': {
        const offer = previousNextMatchOffer
        if (!offer || room.nextMatchOffer?.id !== offer.id || room.game.phase !== 'finished' || offer.winner !== player.side || typeof command.accepted !== 'boolean') {
          throw new RoomError('Không có lời mời đấu tiếp dành cho bạn.')
        }
        const nextViewer = room.viewers?.find(viewer => viewer.id === offer.nextPlayerId && viewer.queued)
        const losingPlayer = room.players.find(member => member.side === offer.loser)
        if (!nextViewer || !losingPlayer) throw new RoomError('Người chơi tiếp theo không còn trong hàng chờ.')
        if (command.accepted) {
          room.players = room.players.map(member => member.id === losingPlayer.id
            ? { id: nextViewer.id, name: nextViewer.name, side: member.side, ready: false }
            : { ...member, ready: false })
          room.viewers = [...room.viewers!.filter(viewer => viewer.id !== nextViewer.id), { id: losingPlayer.id, name: losingPlayer.name, queued: true }]
          room.game = createGame(now, (room.minutes ?? 10) * 60_000)
          room.drawOffer = null
          room.takebackOffer = null
          room.takebackDecline = null
          room.takebackRemaining = { red: 2, black: 2 }
          room.moveCount = 0
          room.nextMatchOffer = null
          room.nextMatchDeclinedId = null
          this.histories.set(room.id, [])
          this.append(room, '', `${losingPlayer.name} xuống hàng chờ; ${nextViewer.name} lên bàn đấu tiếp.`, true)
        } else {
          room.nextMatchOffer = null
          room.nextMatchDeclinedId = nextViewer.id
          this.append(room, '', `${player.name} từ chối đấu với ${nextViewer.name}.`, true)
        }
        break
      }
      case 'request-takeback': {
        const history = this.histories.get(room.id) ?? []
        const remaining = room.takebackRemaining ?? { red: 2, black: 2 }
        if (room.game.phase !== 'playing' || room.takebackOffer || room.drawOffer) throw new RoomError('Không thể yêu cầu đi lại lúc này.')
        if (remaining[player.side] <= 0) throw new RoomError('Bạn đã dùng hết 2 lần yêu cầu đi lại.')
        const requestedPlies: 1 | 2 = room.game.currentTurn === player.side ? 2 : 1
        if (!history.length) throw new RoomError('Chưa có đủ nước đi để hoàn tác.')
        const plies: 1 | 2 = requestedPlies === 2 && history.length === 1 ? 1 : requestedPlies
        room.takebackRemaining = { ...remaining, [player.side]: remaining[player.side] - 1 }
        room.takebackOffer = { requester: player.side, plies }
        room.takebackDecline = null
        break
      }
      case 'reply-takeback': {
        const offer = room.takebackOffer
        if (room.game.phase !== 'playing' || !offer || offer.requester === player.side || typeof command.accepted !== 'boolean') throw new RoomError('Không có yêu cầu đi lại từ đối thủ.')
        if (command.accepted) {
          const history = this.histories.get(room.id) ?? []
          const restored = history.at(-offer.plies)
          if (!restored) throw new RoomError('Không thể khôi phục nước đi.')
          room.game = { ...restored, lastClockUpdate: now }
          this.histories.set(room.id, history.slice(0, -offer.plies))
          room.moveCount = Math.max(0, (room.moveCount ?? history.length) - offer.plies)
          const remaining = room.takebackRemaining ?? { red: 2, black: 2 }
          room.takebackRemaining = { ...remaining, [offer.requester]: 2 }
          this.append(room, '', `${player.name} đồng ý cho đối thủ đi lại.`, true)
          room.takebackDecline = null
        } else {
          this.append(room, '', `${player.name} từ chối yêu cầu đi lại.`, true)
          room.takebackDecline = { id: randomUUID(), requester: offer.requester, declinedBy: player.side }
        }
        room.takebackOffer = null
        break
      }
      case 'reset':
        if (room.nextMatchOffer) throw new RoomError('Hãy trả lời lời mời đấu tiếp trước.')
        if (room.game.phase === 'playing') throw new RoomError('Hãy kết thúc ván trước khi chơi lại.')
        room.game = createGame(now, (room.minutes ?? 10) * 60_000)
        room.players = room.players.map(player => ({ ...player, ready: false }))
        room.drawOffer = null
        room.takebackOffer = null
        room.takebackDecline = null
        room.takebackRemaining = { red: 2, black: 2 }
        room.moveCount = 0
        room.nextMatchOffer = null
        room.nextMatchDeclinedId = null
        this.histories.set(room.id, [])
        break
      default: throw new RoomError('Thao tác không được hỗ trợ.')
    }
    this.syncNextMatchOffer(room)
    this.repository.save(room)
    return room
  }
  chat(playerId: string, input: unknown): RoomSnapshot {
    const room = this.memberRoom(playerId)
    const member = room.players.find(player => player.id === playerId) ?? room.viewers?.find(viewer => viewer.id === playerId)
    if (!member) throw new RoomError('Bạn chưa vào phòng.')
    this.append(room, member.name, textInput(input, 300))
    this.repository.save(room)
    return room
  }
  tick(): RoomSnapshot[] {
    const changed: RoomSnapshot[] = []
    for (const room of this.repository.all()) {
      if (room.game.phase !== 'playing') continue
      const now = this.now()
      room.game = room.takebackOffer ? { ...room.game, lastClockUpdate: now } : advanceClock(room.game, now)
      if (room.game.phase === 'finished') { room.drawOffer = null; room.takebackOffer = null }
      this.syncNextMatchOffer(room)
      this.repository.save(room)
      changed.push(room)
    }
    return changed
  }
}
