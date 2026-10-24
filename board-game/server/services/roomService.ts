import { playerNameError } from '../../src/lib/playerName'
import { randomUUID, randomBytes, randomInt, scryptSync, timingSafeEqual } from 'node:crypto'
import { performance } from 'node:perf_hooks'
import { createHiddenGame } from '../../src/game/state/hidden'
import { createGame, opposite } from '../../src/game/state/initial'
import { advanceClock, applyMoveWithResult, finishGame, startGame, takebackSnapshot, MATCH_INTRO_MS } from '../../src/game/moves/actions'
import { isInsideBoard } from '../../src/game/rules'
import { REPETITION_FORBIDDEN_MESSAGE } from '../../src/game/rules/repetition'
import type { RoomCommand, RoomSnapshot, RoomSummary } from '../../src/types/room'
import type { GameState, Position } from '../../src/types/game'
import { ROOM_MINUTES, ROOM_TURN_SECONDS } from '../../src/types/room'
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
function createRoomGame(now:number,minutes:number,turnSeconds:number,variant:GameState['variant']) {
  const game=variant==='jieqi'?createHiddenGame(now,Array.from({length:28},()=>randomInt(0,2**24)/2**24)):createGame(now)
  return {...game,remainingTime:{red:minutes*60000,black:minutes*60000},turnTimeLimitMs:turnSeconds*1000}
}
export class RoomService {
  private queueRotations = new Map<string, { result: GameState['result']; deadline: number; waitingAtFinish: Set<string> }>()
  private readyWaits = new Map<string, { pair: string; since: number; readyPlayer: string | null; readySince: number | null }>()
  private histories = new Map<string, GameState[]>()
  private repetitionNoticeDeadlines = new Map<string, number | null>()
  constructor(private repository: RoomRepository, private now = () => performance.now(), private firstPlayerSide: () => 'red' | 'black' = () => randomInt(0, 2) === 0 ? 'red' : 'black') {}
  private startMatch(room: RoomSnapshot, now: number) {
    room.takebackBlocked = {}
    const chosenSide = this.firstPlayerSide()
    room.players = room.players.map(player => ({ ...player, side: player.side === chosenSide ? 'red' : 'black' }))
    room.game = startGame({ ...room.game, currentTurn: 'red' }, now, MATCH_INTRO_MS)
    delete room.lastCompletedMatch
  }
  list(): RoomSummary[] {
    this.repository.pruneEmpty()
    return this.repository.all().map(({ id, code, name, players, viewers, game, minutes, province, locked }) => ({ id, code, name, players: players.length, viewerCount: viewers?.length ?? 0, playerNames: players.map(player => player.name), variant: game.variant ?? 'xiangqi', phase: game.phase, minutes: minutes ?? 10, province, locked: !!locked }))
  }
  readyPlayerIds(){return this.repository.all().filter(r=>r.game.phase==='ready'||r.game.phase==='finished').flatMap(r=>r.players.map(p=>p.id))}
  markInvitedPair(roomId: string, sender: string, target: string) {
    const room = this.get(roomId)
    const pairs = room.goldRewardExcludedPairs ??= []
    if (!pairs.some(pair => pair.includes(sender) && pair.includes(target))) pairs.push([sender, target])
  }
  create(name: unknown, minutes: unknown = 10, turnSeconds: unknown = 60, province?: unknown, password?: unknown, variant:unknown='xiangqi'): RoomSummary {
    if(variant!=='xiangqi'&&variant!=='jieqi')throw new RoomError('Invalid game variant.')
    if (password !== undefined && (typeof password !== 'string' || password.length < 1 || password.length > 64)) throw new RoomError('Mật khẩu phải có từ 1 đến 64 ký tự.')
    if (typeof turnSeconds !== 'number' || !ROOM_TURN_SECONDS.some(value => value === turnSeconds)) throw new RoomError('Thời gian mỗi nước không hợp lệ.');
    if (typeof minutes !== 'number' || !ROOM_MINUTES.some(value => value === minutes)) throw new RoomError('Thời gian không hợp lệ.')
    if (province !== undefined && (typeof province !== 'string' || province.trim().length === 0 || province.trim().length > 100)) throw new RoomError('Tỉnh/thành phố không hợp lệ.')
    this.repository.pruneEmpty()
    if (this.repository.all().length >= 100) throw new RoomError('Máy chủ đã đủ phòng. Vui lòng dùng phòng có sẵn.')
    const normalizedProvince = typeof province === 'string' ? province.trim().normalize('NFC') : undefined
    const usedCodes = new Set(this.repository.all().map(room => room.code))
    let code = randomInt(100000, 1000000)
    while (usedCodes.has(String(code))) code = code === 999999 ? 100000 : code + 1
    const room: RoomSnapshot = { id: randomUUID(), code: String(code), name: textInput(name, 40), province: normalizedProvince, players: [], viewers: [], minutes, turnSeconds, game: createRoomGame(this.now(), minutes, turnSeconds, variant), messages: [], drawOffer: null, takebackOffer: null, takebackDecline: null, takebackRemaining: { red: 2, black: 2 }, moveCount: 0, repetitionNoticePaused: false, repetitionNoticeKind: null, repetitionAttemptNotice: null }
    this.histories.set(room.id, [])
    room.locked = password !== undefined
    if (typeof password === 'string') {
      const salt = randomBytes(16)
      this.repository.setPassword(room.id, { salt, hash: scryptSync(password, salt, 32) })
    }
    this.repository.save(room)
    return { id: room.id, code: room.code, name: room.name, players: 0, viewerCount: 0, variant, phase: 'ready', minutes, province: normalizedProvince, locked: room.locked }
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
  private captureCompletedMatch(room: RoomSnapshot) {
    if (room.game.phase !== 'finished' || room.lastCompletedMatch?.states.at(-1)?.result === room.game.result) return
    room.players = room.players.map(player => ({ ...player, ready: false }))
    const states = [...(this.histories.get(room.id) ?? []), room.game]
    room.lastCompletedMatch = {
      id: randomUUID(), endedAt: Date.now(),
      redName: room.players.find(player => player.side === 'red')?.name ?? 'Đỏ',
      blackName: room.players.find(player => player.side === 'black')?.name ?? 'Đen',
      states,
    }
    this.repository.recordCompletion(room)
  }
  private advanceQueuedPlayer(room: RoomSnapshot, losingPlayer: RoomSnapshot['players'][number], nextViewer: NonNullable<RoomSnapshot['viewers']>[number], now: number, readinessTimeout = false) {
    room.players = room.players.map(member => member.id === losingPlayer.id
      ? { id: nextViewer.id, name: nextViewer.name, side: member.side, ready: false }
      : { ...member, ready: readinessTimeout && member.ready })
    room.viewers = [...(room.viewers ?? []).filter(viewer => viewer.id !== nextViewer.id), { id: losingPlayer.id, name: losingPlayer.name, queued: !readinessTimeout }]
    this.readyWaits.delete(room.id)
    room.readyCountdown = null
    room.game = createRoomGame(now, room.minutes ?? 10, room.turnSeconds ?? 60, room.game.variant)
    room.drawOffer = null
    room.takebackOffer = null
    room.takebackDecline = null
    room.takebackRemaining = { red: 2, black: 2 }
    room.moveCount = 0
    this.histories.set(room.id, [])
    this.append(room, '', `${losingPlayer.name} xuống ${readinessTimeout ? 'khán giả' : 'hàng chờ'}; ${nextViewer.name} lên bàn.`, true)
  }
  private updateReadyWait(room: RoomSnapshot, now = this.now()): boolean {
    const previousCountdown = room.readyCountdown ?? null
    const nextViewer = room.viewers?.find(viewer => viewer.queued)
    if (room.game.phase !== 'ready' || room.players.length !== 2 || !nextViewer) {
      this.readyWaits.delete(room.id)
      room.readyCountdown = null
      return previousCountdown !== null
    }
    const pair = room.players.map(player => player.id).join(':')
    let wait = this.readyWaits.get(room.id)
    if (!wait || wait.pair !== pair) {
      wait = { pair, since: now, readyPlayer: null, readySince: null }
      this.readyWaits.set(room.id, wait)
    }
    const readyPlayers = room.players.filter(player => player.ready)
    room.readyCountdown = null
    if (readyPlayers.length === 1) {
      if (wait.readyPlayer !== readyPlayers[0].id) {
        wait.readyPlayer = readyPlayers[0].id
        wait.readySince = now
      }
      if (now - wait.readySince! >= 30_000) {
        const notReady = room.players.find(player => !player.ready)!
        this.append(room, '', `${notReady.name} xuống khán giả vì không Sẵn sàng trong 30 giây.`, true)
        this.advanceQueuedPlayer(room, notReady, nextViewer, now, true)
        this.updateReadyWait(room, now)
        return true
      }
    } else if (readyPlayers.length === 0) {
      wait.readyPlayer = null
      wait.readySince = null
      const elapsed = now - wait.since
      if (elapsed >= 30_000) {
        if(!this.repository.canStart(room)){room.readyCountdown=null;return true}
        room.players = room.players.map(player => ({ ...player, ready: true }))
        this.startMatch(room, now)
        this.readyWaits.delete(room.id)
        return true
      }
      if (elapsed >= 10_000) room.readyCountdown = Math.ceil((30_000 - elapsed) / 1000)
    }
    return previousCountdown !== (room.readyCountdown ?? null)
  }
  private rotateQueueAfterFinishedGame(room: RoomSnapshot, now = this.now()) {
    this.captureCompletedMatch(room)
    const winner = room.game.result?.winner
    const nextViewer = room.viewers?.find(viewer => viewer.queued)
    const eligible = room.game.phase === 'finished'
      && room.game.result?.reason !== 'leave'
      && winner !== null && winner !== undefined
      && room.players.length === 2
      && room.players.some(player => player.side === winner)
      && room.players.some(player => player.side === opposite(winner))
    const losingPlayer = eligible ? room.players.find(player => player.side === opposite(winner!)) : undefined
    if (!eligible || !losingPlayer) { this.queueRotations.delete(room.id); return }
    let rotation = this.queueRotations.get(room.id)
    if (!rotation || rotation.result !== room.game.result) {
      room.players = room.players.map(player => ({ ...player, ready: false }))
      rotation = { result: room.game.result, deadline: now + 3000, waitingAtFinish: new Set(room.viewers?.filter(viewer => viewer.queued).map(viewer => viewer.id)) }
      this.queueRotations.set(room.id, rotation)
    }
    if (!nextViewer || rotation.waitingAtFinish.has(nextViewer.id) && now < rotation.deadline) return
    this.queueRotations.delete(room.id)
    this.advanceQueuedPlayer(room, losingPlayer, nextViewer, now)
  }
  join(id: unknown, playerId: string, name: unknown, password?: unknown, asViewer: unknown = false): RoomSnapshot {
    const room = this.get(textInput(id, 64))
    if (typeof name !== 'string') throw new RoomError('Tên người chơi không hợp lệ.')
    const nameError = playerNameError(name)
    if (nameError) throw new RoomError(nameError)
    const playerName = name.trim().normalize('NFC')
    const current = this.roomFor(playerId)
    if (current?.id === room.id) return room
    if (room.locked) {
      const secret = this.repository.getPassword(room.id)
      if (!secret || typeof password !== 'string' || password.length > 64 || !timingSafeEqual(scryptSync(password, secret.salt, 32), secret.hash)) throw new RoomError('Mật khẩu bàn không đúng.')
    }
    if (current) throw new RoomError('Hãy rời phòng hiện tại trước.')
    if (typeof asViewer !== 'boolean') throw new RoomError('Vai trò vào phòng không hợp lệ.')
    if (asViewer && room.game.phase !== 'playing') throw new RoomError('Người chơi không còn đang đấu trong phòng này.')
    const joinsAsViewer = asViewer || room.players.length >= 2 || room.game.phase === 'playing'
    if (joinsAsViewer) {
      room.viewers = [...(room.viewers ?? []), { id: playerId, name: playerName, queued: false }]
    } else {
      const side = room.players.some(player => player.side === 'red') ? 'black' : 'red'
      room.players = [...room.players, { id: playerId, name: playerName, side, ready: false }]
    }
    this.append(room, '', `${playerName} đã vào phòng.`, true)
    this.updateReadyWait(room)
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
      this.rotateQueueAfterFinishedGame(room)
      this.updateReadyWait(room)
      if (!room.players.length && !room.viewers.length) { this.repository.delete(room.id); this.queueRotations.delete(room.id); this.histories.delete(room.id); this.repetitionNoticeDeadlines.delete(room.id) }
      else this.repository.save(room)
      return room
    }
    const player = room.players.find(player => player.id === playerId)
    if (!player) return null
    const leavingAt = this.now()
    this.repetitionNoticeDeadlines.delete(room.id)
    room.repetitionNoticePaused = false
    room.repetitionNoticeKind = null
    room.repetitionAttemptNotice = null
    room.game = advanceClock({ ...room.game, lastClockUpdate: leavingAt }, leavingAt)
    if (room.game.phase === 'playing') room.game = finishGame(room.game, opposite(player.side), 'leave')
    this.captureCompletedMatch(room)
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
    this.rotateQueueAfterFinishedGame(room)
    this.updateReadyWait(room)
    if (!room.players.length && !room.viewers?.length) { this.repository.delete(room.id); this.histories.delete(room.id); this.repetitionNoticeDeadlines.delete(room.id) }
    else this.repository.save(room)
    return room
  }
  command(playerId: string, input: unknown): RoomSnapshot {
    const room = this.memberRoom(playerId)
    if (!input || typeof input !== 'object' || !('type' in input)) throw new RoomError('Thao tác không hợp lệ.')
    const command = input as RoomCommand
    const viewer = room.viewers?.find(member => member.id === playerId)
    if (command.type === 'repetition-notice') {
      if (!room.players.some(member => member.id === playerId)) throw new RoomError(viewer ? 'Người xem không thể tạm dừng đồng hồ.' : 'Bạn chưa vào phòng.')
      const now = this.now()
      if (room.repetitionNoticePaused) {
        room.game = {
          ...room.game,
          lastClockUpdate: now,
          repetition: room.repetitionNoticeKind === 'warning' && room.game.repetition
            ? { ...room.game.repetition, warning: false, warningSide: null }
            : room.game.repetition,
        }
        room.repetitionNoticePaused = false
        room.repetitionNoticeKind = null
        room.repetitionAttemptNotice = null
        this.repetitionNoticeDeadlines.delete(room.id)
      }
      this.repository.save(room)
      return room
    }
    if (command.type === 'repetition-attempt') {
      const player = room.players.find(member => member.id === playerId)
      if (!player) throw new RoomError('Người xem không thể thao tác ván cờ.')
      if (!command.move || !position(command.move.from) || !position(command.move.to)) throw new RoomError('Tọa độ không hợp lệ.')
      const result = applyMoveWithResult(room.game, command.move, this.now(), player.side)
      if (result.rejection !== 'repetition') throw new RoomError('Nước đi không phải là nước lặp bị chặn.')
      room.repetitionAttemptNotice = { id: randomUUID(), recipient: opposite(player.side), message: 'Đối thủ đã thử đi một nước lặp bị cấm.' }
      this.repository.save(room)
      return room
    }
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
      this.rotateQueueAfterFinishedGame(room)
      this.updateReadyWait(room)
      this.repository.save(room)
      return room
    }
    const player = room.players.find(member => member.id === playerId)
    if (!player) throw new RoomError('Người xem không thể thao tác ván cờ.')
    if (room.repetitionNoticePaused) throw new RoomError('Đóng bảng nhắc nhở để tiếp tục ván cờ.')
    const now = this.now()
    room.game = room.takebackOffer ? { ...room.game, lastClockUpdate: now } : command.type === 'move' ? room.game : advanceClock(room.game, now)
    if (room.game.phase === 'finished') {
      room.drawOffer = null
      room.takebackOffer = null
    }
    this.rotateQueueAfterFinishedGame(room)
    this.updateReadyWait(room, now)
    if ((command.type === 'ready' || command.type === 'reset') && room.game.phase === 'finished' && room.viewers?.some(viewer => viewer.queued) && this.queueRotations.has(room.id)) throw new RoomError('??i 3 gi?y ?? chuy?n ng??i trong h?ng ch? l?n b?n.')
    if (!room.players.some(member => member.id === playerId)) throw new RoomError('B?n ?? xu?ng h?ng ch?.')
    switch (command.type) {
      case 'ready':
        if (room.game.phase === 'finished') {
          // Committing to a rematch closes the previous game's replacement window.
          // Later queue entries must wait for this new match to finish.
          this.queueRotations.delete(room.id)
          room.game = createRoomGame(now, room.minutes ?? 10, room.turnSeconds ?? 60, room.game.variant)
          room.players = room.players.map(member => ({ ...member, ready: false }))
          room.drawOffer = null
          room.takebackOffer = null
          room.takebackRemaining = { red: 2, black: 2 }
          room.moveCount = 0
          this.histories.set(room.id, [])
        }
        if (room.game.phase !== 'ready') throw new RoomError('Ván đã bắt đầu.')
        room.players.find(member => member.id === playerId)!.ready = true
        if (room.players.length === 2 && room.players.every(player => player.ready)) { if(!this.repository.canStart(room))throw new RoomError('Không đủ năng lượng hoặc tài khoản không hợp lệ.');this.startMatch(room, now) }
        break
      case 'move': {
        if (room.takebackOffer) throw new RoomError('Hãy trả lời yêu cầu đi lại trước.')
        if (!command.move || !position(command.move.from) || !position(command.move.to)) throw new RoomError('Tọa độ không hợp lệ.')
        const before = takebackSnapshot(room.game)
        const result = applyMoveWithResult(room.game, command.move, now, player.side)
        const next = result.game
        if (next.board === room.game.board) {
          if (result.rejection === 'repetition') throw new RoomError(REPETITION_FORBIDDEN_MESSAGE)
          room.game = next
          throw new RoomError('Nước đi không hợp lệ hoặc chưa đến lượt bạn.')
        }
        this.histories.set(room.id, [...(this.histories.get(room.id) ?? []), before])
        room.game = next
        room.takebackBlocked = { ...room.takebackBlocked, [player.side]: false }
        room.repetitionAttemptNotice = null
        room.moveCount = (room.moveCount ?? 0) + 1
        room.drawOffer = null
        if (next.repetition?.warning) {
          room.repetitionNoticePaused = true
          room.repetitionNoticeKind = 'warning'
          this.repetitionNoticeDeadlines.set(room.id, null)
        }
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
      case 'request-takeback': {
        const history = this.histories.get(room.id) ?? []
        const remaining = room.takebackRemaining ?? { red: 2, black: 2 }
        if (room.game.phase !== 'playing' || room.takebackOffer || room.drawOffer) throw new RoomError('Không thể yêu cầu đi lại lúc này.')
        if (remaining[player.side] <= 0) throw new RoomError('Bạn đã dùng hết 2 lần yêu cầu đi lại.')
        if (room.takebackBlocked?.[player.side]) throw new RoomError('Bạn phải đi một nước mới trước khi yêu cầu đi lại tiếp.')
        const requestedPlies: 1 | 2 = room.game.currentTurn === player.side ? 2 : 1
        if (!history.length) throw new RoomError('Chưa có đủ nước đi để hoàn tác.')
        if (!history.some(state => state.currentTurn === player.side)) throw new RoomError('Bạn phải đi ít nhất một nước trước khi yêu cầu đi lại.')
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
          room.game = { ...restored, repetition: restored.repetition ? { ...restored.repetition, warning: false, warningSide: null } : undefined, lastClockUpdate: now }
          this.histories.set(room.id, history.slice(0, -offer.plies))
          room.moveCount = Math.max(0, (room.moveCount ?? history.length) - offer.plies)
          const remaining = room.takebackRemaining ?? { red: 2, black: 2 }
          room.takebackRemaining = { ...remaining, [offer.requester]: 2 }
          room.takebackBlocked = { ...room.takebackBlocked, [offer.requester]: true }
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
        if (room.game.phase === 'ready' && room.viewers?.some(viewer => viewer.queued)) throw new RoomError('Không thể cài lại khi đang có người chờ đấu.')
        if (room.game.phase === 'playing') throw new RoomError('Hãy kết thúc ván trước khi chơi lại.')
        room.game = createRoomGame(now, room.minutes ?? 10, room.turnSeconds ?? 60, room.game.variant)
        room.repetitionNoticePaused = false
        room.repetitionNoticeKind = null
        room.repetitionAttemptNotice = null
        this.repetitionNoticeDeadlines.delete(room.id)
        room.players = room.players.map(player => ({ ...player, ready: false }))
        room.drawOffer = null
        room.takebackOffer = null
        room.takebackDecline = null
        room.takebackRemaining = { red: 2, black: 2 }
        room.moveCount = 0
        this.histories.set(room.id, [])
        break
      default: throw new RoomError('Thao tác không được hỗ trợ.')
    }
    this.rotateQueueAfterFinishedGame(room)
    this.updateReadyWait(room, now)
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
      if (room.game.phase !== 'playing') {
        const beforeGame = room.game
        this.rotateQueueAfterFinishedGame(room)
        const readinessChanged = this.updateReadyWait(room)
        if (beforeGame !== room.game || readinessChanged) { this.repository.save(room); changed.push(room) }
        continue
      }
      const now = this.now()
      const repetitionNoticeDeadline = this.repetitionNoticeDeadlines.get(room.id)
      if (room.repetitionNoticePaused && (repetitionNoticeDeadline === undefined || repetitionNoticeDeadline === null || now < repetitionNoticeDeadline)) {
        changed.push(room)
        continue
      }
      if (repetitionNoticeDeadline !== undefined && repetitionNoticeDeadline !== null) {
        room.game = { ...room.game, lastClockUpdate: repetitionNoticeDeadline }
        room.repetitionNoticePaused = false
        room.repetitionNoticeKind = null
        this.repetitionNoticeDeadlines.delete(room.id)
      }
      room.game = room.takebackOffer ? { ...room.game, lastClockUpdate: now } : advanceClock(room.game, now)
      if (room.game.phase === 'finished') { room.drawOffer = null; room.takebackOffer = null }
      this.rotateQueueAfterFinishedGame(room)
      this.updateReadyWait(room, now)
      this.repository.save(room)
      changed.push(room)
    }
    return changed
  }
}
