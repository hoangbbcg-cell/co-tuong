import { shouldRestartReadyForChangedPair } from '../../src/lib/roomReadiness'
import { playerNameError } from '../../src/lib/playerName'
import { randomUUID, randomBytes, randomInt, scryptSync, timingSafeEqual } from 'node:crypto'
import { performance } from 'node:perf_hooks'
import { createHiddenGame } from '../../src/game/state/hidden'
import { createGame, opposite } from '../../src/game/state/initial'
import { gameFromPositionFen, positionError } from '../../src/game/state/customPosition'
import { advanceClock, applyMoveWithResult, finishGame, startGame, takebackSnapshot, MATCH_INTRO_MS } from '../../src/game/moves/actions'
import { isInsideBoard } from '../../src/game/rules'
import { REPETITION_FORBIDDEN_MESSAGE } from '../../src/game/rules/repetition'
import type { RoomCommand, RoomSnapshot, RoomSummary } from '../../src/types/room'
import type { GameState, Position } from '../../src/types/game'
import { ROOM_MINUTES, ROOM_TURN_SECONDS, ROOM_INCREMENT_SECONDS, ROOM_REACTIONS } from '../../src/types/room'
import { RoomRepository } from '../repositories/roomRepository'

export class RoomError extends Error {}
// Managed rooms keep their owner while that member is watching from View.
function keepsViewerOwner(room: RoomSnapshot) { return !!(room.locked || room.customFen) }
const TAKEBACK_TIMEOUT_MS = 10_000
export const DISCONNECT_GRACE_MS = 3 * 60_000
function textInput(value: unknown, limit: number): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > limit) throw new RoomError(`Nội dung phải có 1–${limit} ký tự.`)
  return value.trim()
}
function position(value: unknown): value is Position {
  if (!value || typeof value !== 'object') return false
  const point = value as Position
  return isInsideBoard(point.row, point.col)
}
function createRoomGame(now:number,minutes:number,turnSeconds:number,variant:GameState['variant'],incrementSeconds=0) {
  const game=variant==='jieqi'?createHiddenGame(now,Array.from({length:28},()=>randomInt(0,2**24)/2**24)):createGame(now)
  return {...game,remainingTime:{red:minutes*60000,black:minutes*60000},turnTimeLimitMs:turnSeconds*1000,...(incrementSeconds ? {incrementMs:incrementSeconds*1000,initialTimeMs:minutes*60000} : {})}
}export class RoomService {
  private viewerArrivalOrder = new Map<string, number>()
  private viewerArrivalSequence = 0
  private moderatedSeatWaits = new Map<string, number>()
  private queueRotations = new Map<string, { result: GameState['result']; deadline: number | null; completedPlayers: Set<string> }>()
  private takebackDeadlines = new Map<string, number>()
  private rematchWaits = new Map<string, { matchId: string; pair: string; notBefore: number; completed: Set<string>; queuedAtFinish: Set<string> }>()
  private takebackStateChanges = new Set<string>()
  private readyWaits = new Map<string, { pair: string; since: number }>()
  private energyNotices = new Map<string, Set<string>>()
  private energyRemovals = new Map<string, Set<string>>()
  private histories = new Map<string, GameState[]>()
  private prunedRooms = new Map<string, RoomSnapshot>()
  private disconnectDeadlines = new Map<string, number>()
  private repetitionNoticeDeadlines = new Map<string, number | null>()
  constructor(private repository: RoomRepository, private now = () => performance.now(), private firstPlayerSide: () => 'red' | 'black' = () => randomInt(0, 2) === 0 ? 'red' : 'black') {}
  private save(room: RoomSnapshot, command?: RoomCommand, playerId?: string) {
    const history = this.histories.get(room.id) ?? []
    if (room.persistenceHistory !== history) {
      room.persistenceHistory = history
    }
    const takebackDeadline=this.takebackDeadlines.get(room.id)
    if(takebackDeadline!==undefined)room.persistenceTakebackDeadlineEpochMs=Date.now()+(takebackDeadline-this.now())
    else delete room.persistenceTakebackDeadlineEpochMs
    if (command?.commandId && playerId) {
      const accountId = room.players.find(player => player.id === playerId)?.userId ?? room.viewers?.find(viewer => viewer.id === playerId)?.userId ?? playerId
      const commands = room.processedCommandIds ??= {}
      commands[accountId] = [...(commands[accountId] ?? []).filter(id => id !== command.commandId), command.commandId].slice(-200)
    }
    this.repository.save(room)
    if (this.energyRemovals.has(room.id) && !room.players.length && !room.viewers?.length) {
      this.repository.delete(room.id)
      this.histories.delete(room.id)
      this.readyWaits.delete(room.id)
      this.queueRotations.delete(room.id)
      this.rematchWaits.delete(room.id)
      this.repetitionNoticeDeadlines.delete(room.id)
    }
  }
  isCommandProcessed(accountId: string, commandId: string) {
    return this.repository.all().some(room => (room.processedCommandIds?.[accountId] ?? []).includes(commandId))
  }
  restore(room: RoomSnapshot) {
    if (room.game.phase !== 'playing' || !room.id || !room.game.board || room.players.length !== 2 || room.players[0].userId === room.players[1].userId) throw new RoomError('Snapshot ván đấu không hợp lệ.')
    if (this.repository.get(room.id)) throw new RoomError('Ván đấu đã được khôi phục.')
    const history = room.persistenceHistory ?? []
    if (!Array.isArray(history) || history.some(state => !state?.board || state.phase !== 'playing')) throw new RoomError('Lịch sử snapshot không hợp lệ.')
    this.histories.set(room.id, history)
    if(room.takebackOffer&&Number.isFinite(room.persistenceTakebackDeadlineEpochMs))this.takebackDeadlines.set(room.id,this.now()+(room.persistenceTakebackDeadlineEpochMs!-Date.now()))
    for (const player of room.players) {
      player.connected = false
      player.leaseGeneration = (player.leaseGeneration ?? 0) + 1
      player.disconnectedAtEpochMs ??= Date.now()
      const remaining = player.disconnectedAtEpochMs + DISCONNECT_GRACE_MS - Date.now()
      this.disconnectDeadlines.set(`${room.id}:${player.userId}`, this.now() + remaining)
    }
    this.repository.restore(room)
  }
  private startMatch(room: RoomSnapshot, now: number) {
    this.rematchWaits.delete(room.id)
    this.clearDisconnectDeadlines(room.id)
    this.takebackDeadlines.delete(room.id)
    room.takebackOffer = null
    room.takebackBlocked = {}
    if (room.customFen) {
      // Custom rooms keep the seated sides; the first turn is chosen by the owner.
      room.players = room.players.map(player => ({ ...player, disconnectedAtEpochMs: undefined }))
      room.game = startGame({ ...room.game, currentTurn: room.customFirstTurn ?? room.game.currentTurn }, now, MATCH_INTRO_MS)
    } else {
      const chosenSide = this.firstPlayerSide()
      room.players = room.players.map(player => ({ ...player, disconnectedAtEpochMs: undefined, side: player.side === chosenSide ? 'red' : 'black' }))
      room.game = startGame({ ...room.game, currentTurn: 'red' }, now, MATCH_INTRO_MS)
    }
    delete room.lastCompletedMatch
  }
  private summary(room: RoomSnapshot): RoomSummary {
    return { id: room.id, code: room.code, name: room.name, ownerName: room.players.find(player => player.id === room.ownerId)?.name ?? room.viewers?.find(viewer => viewer.id === room.ownerId)?.name ?? room.players[0]?.name, players: room.players.length, viewerCount: room.viewers?.length ?? 0, onlineCount: new Set([...room.players.filter(player => player.connected !== false).map(player => player.userId ?? player.id), ...(room.viewers ?? []).map(viewer => viewer.userId ?? viewer.id)]).size, playerNames: room.players.map(player => player.name), variant: room.game.variant ?? 'xiangqi', phase: room.game.phase, minutes: room.minutes ?? 10, province: room.province, locked: !!room.locked, passwordRequired: !!room.passwordRequired }
  }
  list(): RoomSummary[] {
    this.pruneEmptyRooms()
    // Custom-position rooms stay discoverable only by room code or invite.
    return this.repository.all().filter(room => !room.customFen && (room.locked || room.players.length > 0)).map(room => this.summary(room))
  }
  private pruneEmptyRooms() {
    for (const room of this.repository.pruneEmpty()) {
      this.histories.delete(room.id)
      this.readyWaits.delete(room.id)
      this.prunedRooms.set(room.id, room)
    }
  }
  byCode(code: unknown): RoomSummary {
    const room = this.repository.all().find(candidate => candidate.code === (typeof code === 'string' ? code.trim() : ''))
    if (!room) throw new RoomError('Không tìm thấy phòng có số này.')
    return this.summary(room)
  }
  roomsForPreparation(){return this.repository.all()}
  readyPlayerIds(){return this.repository.all().filter(r=>r.game.phase==='ready'||r.game.phase==='finished').flatMap(r=>[...r.players.map(p=>p.id), ...(r.viewers??[]).filter(v=>v.queued).map(v=>v.id)])}
  requireEnergy(playerId: string) { if (!this.repository.hasEnergy(playerId, this.roomFor(playerId))) throw new RoomError('Không đủ năng lượng.') }
  takeEnergyNotices(roomId: string) { const ids = [...(this.energyNotices.get(roomId) ?? [])]; this.energyNotices.delete(roomId); return ids }
  takeEnergyRemovals(roomId: string) { const ids = [...(this.energyRemovals.get(roomId) ?? [])]; this.energyRemovals.delete(roomId); return ids }
  isEnergyRemoval(roomId: string, playerId: string) { return this.energyRemovals.get(roomId)?.has(playerId) ?? false }
  private notifyEnergy(roomId: string, playerId: string) { const ids = this.energyNotices.get(roomId) ?? new Set<string>(); ids.add(playerId); this.energyNotices.set(roomId, ids) }
  markInvitedPair(roomId: string, sender: string, target: string) {
    const room = this.get(roomId)
    const pairs = room.goldRewardExcludedPairs ??= []
    if (!pairs.some(pair => pair.includes(sender) && pair.includes(target))) pairs.push([sender, target])
  }
  create(name: unknown, minutes: unknown = 10, turnSeconds: unknown = 60, province?: unknown, password?: unknown, variant:unknown='xiangqi', ownerAccountId?: string, customFen?: unknown, incrementSeconds: unknown = 0): RoomSummary {
    if(variant!=='xiangqi'&&variant!=='jieqi')throw new RoomError('Invalid game variant.')
    if (password !== undefined && (typeof password !== 'string' || password.length > 64)) throw new RoomError('Mật khẩu tối đa 64 ký tự.')
    if (typeof minutes !== 'number' || !ROOM_MINUTES.some(value => value === minutes)) throw new RoomError('Thời gian không hợp lệ.')
    if (typeof turnSeconds !== 'number' || !ROOM_TURN_SECONDS.some(value => value === turnSeconds) || turnSeconds > minutes * 60) throw new RoomError('Thời gian mỗi nước không hợp lệ.')
    if (typeof incrementSeconds !== 'number' || !ROOM_INCREMENT_SECONDS.some(value => value === incrementSeconds)) throw new RoomError('Thời gian tích lũy không hợp lệ.')
    if (province !== undefined && (typeof province !== 'string' || province.trim().length === 0 || province.trim().length > 100)) throw new RoomError('Tỉnh/thành phố không hợp lệ.')
    let customGame: ReturnType<typeof gameFromPositionFen> | null = null
    let customFenSource = ''
    if (customFen !== undefined && customFen !== null && customFen !== '') {
      if (typeof customFen !== 'string') throw new RoomError('Thế cờ không hợp lệ.')
      if (variant === 'jieqi') throw new RoomError('Thế cờ riêng chỉ hỗ trợ Cờ Tướng.')
      try { customGame = gameFromPositionFen(customFen) } catch (error) { throw new RoomError(error instanceof Error ? error.message : 'Thế cờ không hợp lệ.') }
      customFenSource = customFen
    }
    this.pruneEmptyRooms()
    if (this.repository.all().length >= 100) throw new RoomError('Máy chủ đã đủ phòng. Vui lòng dùng phòng có sẵn.')
    const normalizedProvince = typeof province === 'string' ? province.trim().normalize('NFC') : undefined
    const usedCodes = new Set(this.repository.all().map(room => room.code))
    let code = randomInt(100000, 1000000)
    while (usedCodes.has(String(code))) code = code === 999999 ? 100000 : code + 1
    const room: RoomSnapshot = { id: randomUUID(), code: String(code), name: textInput(name, 40), province: normalizedProvince, players: [], viewers: [], minutes, turnSeconds, incrementSeconds, game: customGame ? { ...customGame, remainingTime: { red: minutes * 60000, black: minutes * 60000 }, turnTimeLimitMs: turnSeconds * 1000, ...(incrementSeconds ? {incrementMs:incrementSeconds*1000,initialTimeMs:minutes*60000} : {}) } : createRoomGame(this.now(), minutes, turnSeconds, variant, incrementSeconds), messages: [], drawOffer: null, takebackOffer: null, takebackDecline: null, takebackRemaining: { red: 2, black: 2 }, moveCount: 0, repetitionNoticePaused: false, repetitionNoticeKind: null, repetitionAttemptNotice: null }
    if (customGame) { room.customFen = customFenSource; room.customFirstTurn = customGame.currentTurn }
    this.histories.set(room.id, [])
    room.locked = password !== undefined
    room.passwordRequired = typeof password === 'string' && password.length > 0
    if (ownerAccountId) this.repository.reserveOwner(room.id, ownerAccountId)
    if (room.passwordRequired && typeof password === 'string') {
      const salt = randomBytes(16)
      this.repository.setPassword(room.id, { salt, hash: scryptSync(password, salt, 32) })
    }
    this.save(room)
    return { id: room.id, code: room.code, name: room.name, players: 0, viewerCount: 0, variant, phase: 'ready', minutes, province: normalizedProvince, locked: room.locked, passwordRequired: room.passwordRequired }
  }
  /** Rebuild the room's pre-match game; custom rooms restart from their source FEN. */
  private roomGame(room: RoomSnapshot, now: number) {
    if (!room.customFen) return createRoomGame(now, room.minutes ?? 10, room.turnSeconds ?? 60, room.game.variant, room.incrementSeconds ?? 0)
    const minutes = room.minutes ?? 10
    const game = gameFromPositionFen(room.customFen)
    let turn = room.customFirstTurn ?? game.currentTurn
    if (positionError(game.board, turn)) turn = game.currentTurn
    return { ...game, currentTurn: turn, remainingTime: { red: minutes * 60000, black: minutes * 60000 }, turnTimeLimitMs: (room.turnSeconds ?? 60) * 1000, ...(room.incrementSeconds ? {incrementMs:room.incrementSeconds*1000,initialTimeMs:minutes*60000} : {}) }
  }
  private get(id: string) {
    const room = this.repository.get(id)
    if (!room) throw new RoomError('Phòng không còn tồn tại.')
    return room
  }
  roomFor(playerId: string) { return this.repository.all().find(room => room.players.some(player => player.id === playerId) || room.viewers?.some(viewer => viewer.id === playerId)) }
  roomForAccount(accountId: string) { return this.repository.all().find(room => room.players.some(player => player.userId === accountId)) }
  private clearDisconnectDeadlines(roomId: string) { for (const key of this.disconnectDeadlines.keys()) if (key.startsWith(`${roomId}:`)) this.disconnectDeadlines.delete(key) }
  assertController(socketId: string) {
    const room = this.repository.all().find(candidate => candidate.players.some(player => player.id === socketId))
    if (!room) throw new RoomError('Người xem không thể thao tác ván cờ.')
    if (room.players.find(player => player.id === socketId)?.connected === false) throw new RoomError('Kết nối điều khiển đã bị thay thế.')
  }
  disconnect(socketId: string): RoomSnapshot | null {
    const room = this.roomFor(socketId)
    if (!room) return null
    const player = room.players.find(member => member.id === socketId)
    if (!player || room.game.phase !== 'playing') return this.leave(socketId)
    if (player.connected === false) return room
    player.connected = false
    player.leaseGeneration = (player.leaseGeneration ?? 0) + 1
    player.disconnectedAtEpochMs ??= Date.now()
    const key = `${room.id}:${player.userId ?? player.id}`
    const deadline = this.disconnectDeadlines.get(key) ?? this.now() + Math.max(0, player.disconnectedAtEpochMs + DISCONNECT_GRACE_MS - Date.now())
    this.disconnectDeadlines.set(key, deadline)
    this.append(room, '', `${player.name} mất kết nối. Đồng hồ vẫn chạy; có thể quay lại trong ${DISCONNECT_GRACE_MS / 60_000} phút.`, true)
    if (this.now() >= deadline) this.expireDisconnected(room, player, this.now())
    this.save(room)
    return room
  }
  resume(accountId: string, socketId: string): { room: RoomSnapshot; previousSocketId: string | null } | null {
    const room = this.repository.all().find(candidate => candidate.game.phase === 'playing' && candidate.players.some(player => player.userId === accountId))
    if (!room) return null
    const player = room.players.find(member => member.userId === accountId)!
    const deadline = this.disconnectDeadlines.get(`${room.id}:${accountId}`)
    if (player.connected === false && deadline !== undefined && this.now() >= deadline) { this.expireDisconnected(room, player, deadline); return null }
    if (player.connected === false && !room.repetitionNoticePaused) {
      room.game = advanceClock(room.game, this.now())
      if (room.game.phase === 'finished') {
        room.drawOffer = null
        room.takebackOffer = null
        this.captureCompletedMatch(room)
        this.save(room)
        return null
      }
    }
    if (player.id === socketId && player.connected !== false) return { room, previousSocketId: null }
    const previousSocketId = player.id
    this.disconnectDeadlines.delete(`${room.id}:${accountId}`)
    room.players = room.players.map(member => member === player ? { ...member, id: socketId, connected: true, disconnectedAtEpochMs: undefined, leaseGeneration: (member.leaseGeneration ?? 0) + 1 } : member)
    if (room.ownerId === previousSocketId) room.ownerId = socketId
    this.append(room, '', `${player.name} đã kết nối lại.`, true)
    this.save(room)
    return { room, previousSocketId }
  }
  private expireDisconnected(room: RoomSnapshot, player: RoomSnapshot['players'][number], at = this.now()) {
    this.resolveDisconnectExpiry(room,at)
  }
  private resolveDisconnectExpiry(room:RoomSnapshot,now:number) {
    const expired=room.players.map(player=>({player,deadline:this.disconnectDeadlines.get(`${room.id}:${player.userId??player.id}`)}))
      .filter((entry):entry is {player:RoomSnapshot['players'][number];deadline:number}=>entry.player.connected===false&&entry.deadline!==undefined&&entry.deadline<=now)
    if(!expired.length)return false
    const deadline=Math.min(...expired.map(entry=>entry.deadline))
    const first=expired.filter(entry=>entry.deadline===deadline)
    const game=room.game
    const turnLimit=game.turnTimeLimitMs??60_000
    const clockDeadline=room.repetitionNoticePaused?Number.POSITIVE_INFINITY:game.lastClockUpdate+Math.min(game.remainingTime[game.currentTurn],Math.max(0,turnLimit-game.turnElapsed))
    room.game=room.repetitionNoticePaused?game:advanceClock(game,clockDeadline<=deadline?clockDeadline:deadline)
    if(room.game.phase!=='finished') {
      if(first.length>1) {
        room.game=finishGame(room.game,null,'draw')
        this.append(room,'','Cả hai người chơi đều hết thời gian kết nối lại; ván đấu hòa.',true)
      } else {
        room.game=finishGame(room.game,opposite(first[0].player.side),'disconnect_timeout')
        this.append(room,'',`${first[0].player.name} bị xử thua do hết thời gian kết nối lại.`,true)
      }
    }
    room.drawOffer=null;room.takebackOffer=null
    this.clearDisconnectDeadlines(room.id)
    this.takebackDeadlines.delete(room.id)
    this.captureCompletedMatch(room)
    this.save(room)
    return true
  }
  private memberRoom(playerId: string) {
    const room = this.roomFor(playerId)
    if (!room) throw new RoomError('Bạn chưa vào phòng.')
    return room
  }
  private append(room: RoomSnapshot, name: string, text: string, system = false) {
    room.messages = [...room.messages, { id: randomUUID(), name, text, system }].slice(-100)
  }
  private expireTakebackOffer(room: RoomSnapshot, now: number): boolean {
    const deadline = this.takebackDeadlines.get(room.id)
    if (!room.takebackOffer || deadline === undefined || now < deadline) return false
    const offer = room.takebackOffer
    this.takebackDeadlines.delete(room.id)
    room.takebackOffer = null
    room.takebackDecline = { id: randomUUID(), requester: offer.requester, declinedBy: opposite(offer.requester) }
    room.game = advanceClock({ ...room.game, lastClockUpdate: deadline }, now)
    if (room.game.phase === 'finished') room.drawOffer = null
    this.append(room, '', 'Yêu cầu đi lại đã hết hạn.', true)
    this.save(room)
    this.takebackStateChanges.add(room.id)
    return true
  }
  private captureCompletedMatch(room: RoomSnapshot) {
    if (room.game.phase !== 'finished') return
    this.clearDisconnectDeadlines(room.id)
    if (room.lastCompletedMatch?.states.at(-1)?.result === room.game.result) return
    room.players = room.players.map(player => ({ ...player, ready: false }))
    const states = [...(this.histories.get(room.id) ?? []), room.game]
    room.lastCompletedMatch = {
      id: randomUUID(), endedAt: Date.now(),
      redName: room.players.find(player => player.side === 'red')?.name ?? 'Đỏ',
      blackName: room.players.find(player => player.side === 'black')?.name ?? 'Đen',
      states,
    }
    this.repository.recordCompletion(room)
    const queuedAtFinish = new Set(
      room.queueBlocked ? [] :
        (room.viewers ?? [])
          .filter(viewer =>
            viewer.queued &&
            this.repository.hasEnergy(viewer.id, room))
          .map(viewer => viewer.id),
    )

    this.rematchWaits.set(room.id, {
      matchId: room.lastCompletedMatch.id,
      pair: room.players.map(player => player.id).sort().join(':'),
      notBefore: this.now() + 3000,
      completed: new Set(),
      queuedAtFinish,
    })
  }
  private advanceQueuedPlayer(room: RoomSnapshot, losingPlayer: RoomSnapshot['players'][number], nextViewer: NonNullable<RoomSnapshot['viewers']>[number], now: number, readinessTimeout = false, energyExhausted = false) {
    this.takebackDeadlines.delete(room.id)
    // Transfer to the remaining opponent before inserting the queued replacement.
    if (!keepsViewerOwner(room) && room.ownerId === losingPlayer.id) room.ownerId = room.players.find(member => member.id !== losingPlayer.id)?.id ?? nextViewer.id
    room.players = room.players.map(member => member.id === losingPlayer.id
      ? { id: nextViewer.id, userId: nextViewer.userId, name: nextViewer.name, side: member.side, ready: false, connected: true, leaseGeneration: 1 }
      : { ...member, ready: (readinessTimeout || energyExhausted) && member.ready })
    this.rematchWaits.delete(room.id)
    this.viewerArrivalOrder.delete(nextViewer.id)
    this.viewerArrivalOrder.set(losingPlayer.id, ++this.viewerArrivalSequence)
    room.viewers = [...(room.viewers ?? []).filter(viewer => viewer.id !== nextViewer.id), { id: losingPlayer.id, name: losingPlayer.name, queued: false }]
    this.readyWaits.delete(room.id)
    room.readyCountdown = null
    room.game = this.roomGame(room, now)
    room.drawOffer = null
    room.takebackOffer = null
    room.takebackDecline = null
    room.takebackRemaining = { red: 2, black: 2 }
    room.moveCount = 0
    this.histories.set(room.id, [])
    this.append(room, '', `${losingPlayer.name}${energyExhausted ? ' hết năng lượng,' : ''} xuống khán giả; ${nextViewer.name} lên bàn.`, true)
    if (energyExhausted) this.notifyEnergy(room.id, losingPlayer.id)
  }
  private replaceExhaustedPlayers(room: RoomSnapshot, now: number) {
    let changed = false
    if (room.game.phase === 'playing' || room.queueBlocked) return changed
    while (!room.queueBlocked) {
      const next = room.viewers?.find(viewer => viewer.queued && this.repository.hasEnergy(viewer.id, room))
      const exhausted = room.players.find(player => !this.repository.hasEnergy(player.id, room) && !(room.locked && player.id === room.ownerId))
      if (!next || !exhausted) break
      this.advanceQueuedPlayer(room, exhausted, next, now, false, true)
      changed = true
    }
    // After a replacement, any other depleted seat must also be released,
    // even if the queue was exhausted or disabled.
    for (const player of [...room.players]) {
      if (this.repository.hasEnergy(player.id, room) || room.locked && player.id === room.ownerId) continue
      room.players = room.players.filter(member => member.id !== player.id)
      room.viewers = [...(room.viewers ?? []), { id: player.id, name: player.name, queued: false, ...(player.userId ? { userId: player.userId } : {}) }]
      this.viewerArrivalOrder.set(player.id, ++this.viewerArrivalSequence)
      if (!keepsViewerOwner(room) && room.ownerId === player.id) room.ownerId = room.players.find(member => this.repository.hasEnergy(member.id, room))?.id
      this.notifyEnergy(room.id, player.id)
      this.append(room, '', `${player.name} hết năng lượng, xuống khán giả.`, true)
      changed = true
    }
    return changed
  }
  private demoteFinishedExhaustedPlayers(room: RoomSnapshot, now: number): boolean {
    const wait = this.rematchWaits.get(room.id)
    if (room.queueBlocked || room.game.phase !== 'finished' || !wait || now < wait.notBefore) return false
    const exhausted = room.players.filter(player => !this.repository.hasEnergy(player.id, room) && !(room.locked && player.id === room.ownerId))
    if (!exhausted.length) return false
    for (const player of exhausted) {
      if (!room.players.some(member => member.id === player.id)) continue
      const next = !room.queueBlocked && room.viewers?.find(viewer => viewer.queued && this.repository.hasEnergy(viewer.id, room))
      if (next) {
        this.advanceQueuedPlayer(room, player, next, now, false, true)
      } else {
        room.players = room.players.filter(member => member.id !== player.id)
        room.viewers = [...(room.viewers ?? []), { id: player.id, userId: player.userId, name: player.name, queued: false }]
        this.viewerArrivalOrder.set(player.id, ++this.viewerArrivalSequence)
        if (!keepsViewerOwner(room) && room.ownerId === player.id) room.ownerId = room.players.find(member => this.repository.hasEnergy(member.id, room))?.id
        this.notifyEnergy(room.id, player.id)
        this.append(room, '', `${player.name} hết năng lượng, xuống khán giả.`, true)
      }
    }
    this.rematchWaits.delete(room.id)
    room.readyCountdown = null
    return true
  }
  private updateReadyWait(room: RoomSnapshot, now = this.now()): boolean {
    let finishedEnergyChanged = this.demoteFinishedExhaustedPlayers(room, now)
    const seatDeadline = this.moderatedSeatWaits.get(room.id)
    if (seatDeadline !== undefined && now >= seatDeadline) {
      this.moderatedSeatWaits.delete(room.id)
      this.fillQueuedVacancies(room)
      finishedEnergyChanged = true
    }
    const rematch = this.rematchWaits.get(room.id)
    if (room.game.phase === 'finished' && rematch && room.players.length === 2
      && rematch.matchId === room.lastCompletedMatch?.id
      && rematch.pair === room.players.map(player => player.id).sort().join(':')
      && !(this.queueRotations.has(room.id) && !room.queueBlocked && room.viewers?.some(viewer => !!this.rematchWaits.get(room.id)?.queuedAtFinish.has(viewer.id) && viewer.queued && this.repository.hasEnergy(viewer.id, room)))) {
      const previous = room.readyCountdown ?? null
      room.readyCountdown = now < rematch.notBefore ? null : Math.max(0, Math.ceil((rematch.notBefore + 30000 - now) / 1000))
      if (room.readyCountdown === 0 && room.players.every(player => rematch.completed.has(player.id)) && this.repository.canStart(room) && (!room.queueBlocked || room.players.every(player => this.repository.hasEnergy(player.id, room)))) {
        this.resetModeratedSeats(room)
        room.players = room.players.map(player => ({ ...player, ready: true }))
        this.startMatch(room, now)
        room.readyCountdown = null
        return true
      }
      return previous !== room.readyCountdown
    }
    // A newly seated pair must not inherit the previous match's finished state.
    // Preserve the existing finished/rematch timer for the unchanged pair above.
    const queueRotationPending = this.queueRotations.has(room.id)
      && !room.queueBlocked
      && !!room.viewers?.some(viewer => !!this.rematchWaits.get(room.id)?.queuedAtFinish.has(viewer.id) && viewer.queued && this.repository.hasEnergy(viewer.id, room))
    if (shouldRestartReadyForChangedPair(
      room.game.phase, room.players.map(player => player.id), rematch?.pair ?? null, queueRotationPending,
    )) {
      this.resetModeratedSeats(room)
      room.readyCountdown = null
      finishedEnergyChanged = true
    }
    const energyChanged = room.game.phase === 'ready' && this.replaceExhaustedPlayers(room, now)
    const previousCountdown = room.readyCountdown ?? null

    if (room.game.phase !== 'ready' || room.players.length !== 2) {
      this.readyWaits.delete(room.id)
      room.readyCountdown = null
      return finishedEnergyChanged || energyChanged || previousCountdown !== null
    }

    const pair = room.players.map(player => player.id).join(':')
    let wait = this.readyWaits.get(room.id)

    if (!wait || wait.pair !== pair) {
      wait = { pair, since: now }
      this.readyWaits.set(room.id, wait)
    }

    // Both players Ready: start immediately, regardless of preparation timer.
    if (room.players.every(player => player.ready) && this.repository.canStart(room) && (!room.queueBlocked || room.players.every(player => this.repository.hasEnergy(player.id, room)))) {
      room.readyCountdown = null
      this.startMatch(room, now)
      this.readyWaits.delete(room.id)
      return true
    }

    // Wait one second after the pair is seated, then show the full 30-second countdown.
    // A single Ready or queue change must not restart this deadline.
    const elapsed = now - wait.since - 1_000
    room.readyCountdown = elapsed < 0 ? null : Math.max(0, Math.ceil((30_000 - elapsed) / 1000))
    if (elapsed >= 30_000 && this.repository.canStart(room) && (!room.queueBlocked || room.players.every(player => this.repository.hasEnergy(player.id, room)))) {
      room.players = room.players.map(player => ({ ...player, ready: true }))
      this.startMatch(room, now)
      this.readyWaits.delete(room.id)
      room.readyCountdown = null
      return true
    }
    return finishedEnergyChanged || energyChanged || previousCountdown !== (room.readyCountdown ?? null)
  }
  private releaseExhaustedNormalTable(room: RoomSnapshot, now: number): boolean {
    const wait = this.rematchWaits.get(room.id)
    if (room.locked || room.game.phase !== 'finished' || room.players.length !== 2
      || !wait || now < wait.notBefore || room.players.some(player => this.repository.hasEnergy(player.id, room))) return false
    const removed = this.energyRemovals.get(room.id) ?? new Set<string>()
    for (const player of room.players) {
      removed.add(player.id)
      this.notifyEnergy(room.id, player.id)
      this.viewerArrivalOrder.delete(player.id)
    }
    room.players = []
    room.ownerId = undefined
    // FIFO queue first; otherwise use the order in which spectators entered View.
    const candidates = [...(room.viewers ?? [])].filter(viewer => this.repository.hasEnergy(viewer.id, room))
      .sort((a, b) => Number(b.queued) - Number(a.queued)
        || (a.queued && b.queued ? 0 : (this.viewerArrivalOrder.get(a.id) ?? 0) - (this.viewerArrivalOrder.get(b.id) ?? 0)))
    for (const viewer of candidates.slice(0, 2)) {
      room.players.push({ id: viewer.id, userId: viewer.userId, name: viewer.name, side: room.players.length ? 'black' : 'red', ready: false, connected: true, leaseGeneration: 1 })
      room.viewers = room.viewers!.filter(member => member.id !== viewer.id)
      this.viewerArrivalOrder.delete(viewer.id)
    }
    room.ownerId = room.players[0]?.id
    if (!room.players.length) {
      for (const viewer of room.viewers ?? []) {
        removed.add(viewer.id)
        this.notifyEnergy(room.id, viewer.id)
        this.viewerArrivalOrder.delete(viewer.id)
      }
      room.viewers = []
    } else {
      room.game = this.roomGame(room, now)
      room.moveCount = 0
      room.drawOffer = null
      room.takebackOffer = null
      room.takebackDecline = null
      room.takebackRemaining = { red: 2, black: 2 }
      this.histories.set(room.id, [])
    }
    this.energyRemovals.set(room.id, removed)
    this.rematchWaits.delete(room.id)
    this.queueRotations.delete(room.id)
    this.readyWaits.delete(room.id)
    room.readyCountdown = null
    return true
  }
  private rotateQueueAfterFinishedGame(room: RoomSnapshot, now = this.now()) {
    if (this.releaseExhaustedNormalTable(room, now)) return
    this.captureCompletedMatch(room)
    if (room.queueBlocked) {
      this.queueRotations.delete(room.id)
      return
    }
    for (const viewer of room.viewers ?? []) if (viewer.queued && !this.repository.hasEnergy(viewer.id, room)) {
      viewer.queued = false
      this.notifyEnergy(room.id, viewer.id)
    }
    const keepOwnerSeat = !!room.locked && !!room.keepOwnerSeat &&
      room.players.some(player => player.id === room.ownerId)
    const winner = room.game.result?.winner
    const exhausted = room.players.filter(player => !this.repository.hasEnergy(player.id, room) && !(room.locked && player.id === room.ownerId))
    const rematch = this.rematchWaits.get(room.id)
    const nextViewer = !room.queueBlocked && room.viewers?.find(
      viewer =>
        !!rematch?.queuedAtFinish.has(viewer.id) &&
        viewer.queued &&
        this.repository.hasEnergy(viewer.id, room),
    )
    const eligible = room.game.phase === 'finished'
      && (room.game.result?.reason !== 'leave' || exhausted.length > 0)
      && room.players.length === 2
      && (keepOwnerSeat || exhausted.length > 0 || winner !== null && winner !== undefined)
    const losingPlayer = eligible
      ? keepOwnerSeat
        ? room.players.find(player => player.id !== room.ownerId)
        : exhausted.find(player => player.side !== winner) ?? exhausted[0] ?? room.players.find(player => player.side !== winner)
      : undefined
    if (!eligible || !losingPlayer || !nextViewer || room.locked && !exhausted.length && losingPlayer.id === room.ownerId) { this.queueRotations.delete(room.id); return }
    let rotation = this.queueRotations.get(room.id)
    if (!rotation || rotation.result !== room.game.result) {
      rotation = { result: room.game.result, deadline: null, completedPlayers: new Set() }
      this.queueRotations.set(room.id, rotation)
    }

    if (!rematch || now < rematch.notBefore) return
    this.queueRotations.delete(room.id)
    this.advanceQueuedPlayer(room, losingPlayer, nextViewer, now, false, !this.repository.hasEnergy(losingPlayer.id, room))
    this.replaceExhaustedPlayers(room, now)
  }
  private fillQueuedVacancies(room: RoomSnapshot) {
    if ((this.moderatedSeatWaits.get(room.id) ?? 0) > this.now() || room.queueBlocked || room.game.phase === 'playing') return
    while (room.players.length < 2) {
      const next = room.viewers?.find(viewer => viewer.queued && this.repository.hasEnergy(viewer.id, room))
      if (!next) break
      const side = room.players.some(player => player.side === 'red') ? 'black' : 'red'
      room.viewers = room.viewers!.filter(viewer => viewer.id !== next.id)
      room.players = [...room.players, { id: next.id, userId: next.userId, name: next.name, side, ready: false, connected: true, leaseGeneration: 1 }]
      this.append(room, '', `${next.name} đã vào ghế trống.`, true)
    }
  }
  join(id: unknown, playerId: string, name: unknown, password?: unknown, asViewer: unknown = false, accountId?: string, invitedByOwner?: string): RoomSnapshot {
    const room = this.get(textInput(id, 64))
    this.expireTakebackOffer(room, this.now())
    if (typeof name !== 'string') throw new RoomError('Tên người chơi không hợp lệ.')
    const nameError = playerNameError(name)
    if (nameError) throw new RoomError(nameError)
    const playerName = name.trim().normalize('NFC')
    const current = this.roomFor(playerId)
    if (current?.id === room.id) return room
    if (room.passwordRequired && !(invitedByOwner && invitedByOwner === room.ownerId)) {
      const secret = this.repository.getPassword(room.id)
      if (!secret || typeof password !== 'string' || password.length > 64 || !timingSafeEqual(scryptSync(password, secret.salt, 32), secret.hash)) throw new RoomError('Mật khẩu bàn không đúng.')
    }
    if (current) throw new RoomError('Hãy rời phòng hiện tại trước.')
    if (accountId && this.repository.all().some(candidate =>
      [...candidate.players, ...(candidate.viewers ?? [])].some(member => member.userId === accountId && member.id !== playerId))) {
      throw new RoomError('Tài khoản đã ở trong một phòng.')
    }
    if (typeof asViewer !== 'boolean') throw new RoomError('Vai trò vào phòng không hợp lệ.')
    if (asViewer && room.game.phase !== 'playing') throw new RoomError('Người chơi không còn đang đấu trong phòng này.')
    this.fillQueuedVacancies(room)
    const joinsAsViewer = room.queueBlocked || (this.moderatedSeatWaits.get(room.id) ?? 0) > this.now() || !!room.viewers?.some(viewer => viewer.queued) || asViewer || room.players.length >= 2 || room.game.phase === 'playing' || !this.repository.hasEnergy(playerId, room)
    if (joinsAsViewer) {
      this.viewerArrivalOrder.set(playerId, ++this.viewerArrivalSequence)
      room.viewers = [...(room.viewers ?? []), { id: playerId, name: playerName, queued: false, userId: accountId }]
    } else {
      if (room.game.phase === 'finished') {
        this.queueRotations.delete(room.id)
        room.game = this.roomGame(room, this.now())
        room.repetitionNoticePaused = false
        room.repetitionNoticeKind = null
        room.repetitionAttemptNotice = null
        this.repetitionNoticeDeadlines.delete(room.id)
        room.players = room.players.map(member => ({ ...member, ready: false }))
        room.drawOffer = null
        room.takebackOffer = null
        room.takebackDecline = null
        room.takebackRemaining = { red: 2, black: 2 }
        room.moveCount = 0
        this.histories.set(room.id, [])
      }
      const side = room.players.some(player => player.side === 'red') ? 'black' : 'red'
      room.players = [...room.players, { id: playerId, name: playerName, side, ready: false, userId: accountId, connected: true, leaseGeneration: 1 }]
    }
    this.fillQueuedVacancies(room)
    if (!room.ownerId && (!room.locked || this.repository.canClaimOwner(room.id, accountId))) room.ownerId = playerId
    this.append(room, '', `${playerName} đã vào phòng.`, true)
    this.updateReadyWait(room)
    this.save(room)
    return room
  }
  private settleEmptyNormalTable(room: RoomSnapshot): boolean {
    if (room.players.length || keepsViewerOwner(room) || !room.viewers?.length) return false
    const eligible = room.viewers.filter(viewer => this.repository.hasEnergy(viewer.id, room))
    const next = eligible.find(viewer => viewer.queued) ?? eligible.sort((a, b) =>
      (this.viewerArrivalOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (this.viewerArrivalOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER))[0]
    if (next) {
      room.viewers = room.viewers.filter(viewer => viewer.id !== next.id)
      room.players = [{ id: next.id, userId: next.userId, name: next.name, side: 'red', ready: false, connected: true, leaseGeneration: 1 }]
      room.ownerId = next.id
      this.viewerArrivalOrder.delete(next.id)
      this.append(room, '', `${next.name} lên bàn và trở thành chủ phòng.`, true)
    } else {
      const removed = this.energyRemovals.get(room.id) ?? new Set<string>()
      for (const member of room.viewers) {
        removed.add(member.id)
        this.notifyEnergy(room.id, member.id)
        this.viewerArrivalOrder.delete(member.id)
      }
      this.energyRemovals.set(room.id, removed)
      room.viewers = []
      room.ownerId = undefined
    }
    return true
  }
  leave(playerId: string): RoomSnapshot | null {
    const room = this.roomFor(playerId)
    if (!room) return null
    this.viewerArrivalOrder.delete(playerId)
    if (room.ownerId === playerId) room.ownerId = [...room.players, ...(room.viewers ?? [])].find(member => member.id !== playerId)?.id
    room.mutedMemberIds = room.mutedMemberIds?.filter(id => id !== playerId)
    const viewer = room.viewers?.find(member => member.id === playerId)
    if (viewer) {
      room.viewers = room.viewers!.filter(member => member.id !== playerId)
      this.append(room, '', `${viewer.name} đã rời phòng.`, true)
      this.rotateQueueAfterFinishedGame(room)
      this.updateReadyWait(room)
      this.settleEmptyNormalTable(room)
      if (!room.players.length && !room.viewers.length) { this.rematchWaits.delete(room.id); this.repository.delete(room.id); this.queueRotations.delete(room.id); this.histories.delete(room.id); this.repetitionNoticeDeadlines.delete(room.id) }
      else this.save(room)
      return room
    }
    const player = room.players.find(player => player.id === playerId)
    if (!player) return null
    this.rematchWaits.delete(room.id)
    this.disconnectDeadlines.delete(`${room.id}:${player.userId ?? player.id}`)
    const leavingAt = this.now()
    this.takebackDeadlines.delete(room.id)
    this.repetitionNoticeDeadlines.delete(room.id)
    room.repetitionNoticePaused = false
    room.repetitionNoticeKind = null
    room.repetitionAttemptNotice = null
    room.game = advanceClock({ ...room.game, lastClockUpdate: leavingAt }, leavingAt)
    if (room.game.phase === 'playing') room.game = finishGame(room.game, opposite(player.side), 'leave')
    this.captureCompletedMatch(room)
    room.players = room.players.filter(player => player.id !== playerId).map(player => ({ ...player, ready: false }))
    this.append(room, '', `${player.name} đã rời phòng.`, true)
    const nextViewer = !room.queueBlocked && room.viewers?.find(member => member.queued && this.repository.hasEnergy(member.id, room))
    if (nextViewer) {
      room.viewers = room.viewers!.filter(member => member.id !== nextViewer.id)
      room.players = [...room.players, { id: nextViewer.id, userId: nextViewer.userId, name: nextViewer.name, side: player.side, ready: false, connected: true, leaseGeneration: 1 }]
      this.append(room, '', `${nextViewer.name} đã được chuyển từ hàng chờ lên bàn.`, true)
    }
    this.settleEmptyNormalTable(room)
    room.drawOffer = null
    room.takebackOffer = null
    this.rotateQueueAfterFinishedGame(room)
    this.updateReadyWait(room)
    this.settleEmptyNormalTable(room)
    if (!room.players.length && !room.viewers?.length) { this.rematchWaits.delete(room.id); this.takebackDeadlines.delete(room.id); this.takebackStateChanges.delete(room.id); this.repository.delete(room.id); this.histories.delete(room.id); this.repetitionNoticeDeadlines.delete(room.id) }
    else this.save(room)
    return room
  }
  command(playerId: string, input: unknown): RoomSnapshot {
    const room = this.memberRoom(playerId)
    if (!input || typeof input !== 'object' || !('type' in input)) throw new RoomError('Thao tác không hợp lệ.')
    const command = input as RoomCommand
    const viewer = room.viewers?.find(member => member.id === playerId)
    if (!viewer) this.assertController(playerId)
    if (command.type === 'stand-up') {
      const player = room.players.find(member => member.id === playerId)
      if (!player) throw new RoomError('Chỉ người đang trên bàn mới có thể xuống bàn.')
      if (room.players.length < 2 && !keepsViewerOwner(room)) throw new RoomError('Cần đủ hai người trên bàn mới có thể xuống bàn.')
      const now = this.now()
      room.game = advanceClock(room.game, now)
      if (room.game.phase === 'playing') room.game = finishGame(room.game, opposite(player.side), 'leave')
      this.captureCompletedMatch(room)
      this.rematchWaits.delete(room.id)
      this.queueRotations.delete(room.id)
      this.readyWaits.delete(room.id)
      this.takebackDeadlines.delete(room.id)
      this.repetitionNoticeDeadlines.delete(room.id)
      this.disconnectDeadlines.delete(`${room.id}:${player.userId ?? player.id}`)
      room.players = room.players.filter(member => member.id !== playerId).map(member => ({ ...member, ready: false }))
      if (!keepsViewerOwner(room) && room.ownerId === playerId) room.ownerId = room.players[0]?.id ?? room.viewers?.[0]?.id ?? playerId
      const next = !room.queueBlocked && room.viewers?.find(member => member.queued && this.repository.hasEnergy(member.id, room))
      if (next) {
        room.viewers = room.viewers!.filter(member => member.id !== next.id)
        room.players.push({ id: next.id, userId: next.userId, name: next.name, side: player.side, ready: false, connected: true, leaseGeneration: 1 })
        if (!room.ownerId) room.ownerId = next.id
      }
      room.viewers = [...(room.viewers ?? []), { id: player.id, userId: player.userId, name: player.name, queued: false }]
      this.viewerArrivalOrder.set(playerId, ++this.viewerArrivalSequence)
      room.drawOffer = null; room.takebackOffer = null; room.takebackDecline = null
      room.readyCountdown = null
      room.repetitionNoticePaused = false; room.repetitionNoticeKind = null; room.repetitionAttemptNotice = null
      this.append(room, '', `${player.name} đã xuống bàn, chuyển sang xem.`, true)
      this.updateReadyWait(room, now)
      this.save(room, command, playerId)
      return room
    }
    if (command.type === 'result-presentation-complete') {
      if (!room.players.some(member => member.id === playerId)) throw new RoomError('Chỉ người đã đấu được xác nhận hiệu ứng.')
      if (room.game.phase !== 'finished' || command.matchId !== room.lastCompletedMatch?.id) throw new RoomError('Ván đấu đã thay đổi.')
      const rematch = this.rematchWaits.get(room.id)
      if (rematch?.matchId === command.matchId) rematch.completed.add(playerId)
      const rotation = this.queueRotations.get(room.id)
      if (rotation && rotation.result === room.game.result && rotation.deadline === null) {
        rotation.completedPlayers.add(playerId)
        if (room.players.every(member => rotation.completedPlayers.has(member.id))) rotation.deadline = this.now() + 2000
      }
      return room
    }
    if (command.type === 'room-settings' || command.type === 'moderate') {
      if (!(room.locked || !!room.customFen) || room.ownerId !== playerId) throw new RoomError('Chỉ chủ phòng được cài đặt phòng.')
      if (command.type === 'room-settings') {
        if (typeof command.queueBlocked !== 'boolean' || typeof command.chatBlocked !== 'boolean' || (command.keepOwnerSeat !== undefined && typeof command.keepOwnerSeat !== 'boolean')) throw new RoomError('Cài đặt không hợp lệ.')
        room.queueBlocked = command.queueBlocked
        if (room.queueBlocked) this.queueRotations.delete(room.id)
        room.chatBlocked = command.chatBlocked
        room.keepOwnerSeat = command.keepOwnerSeat ?? !!room.keepOwnerSeat
        if (room.queueBlocked) room.viewers = room.viewers?.map(member => ({ ...member, queued: false }))
      } else {
        if (typeof command.targetId !== 'string' || command.targetId === playerId) throw new RoomError('Người chơi không hợp lệ.')
        const seated = room.players.find(member => member.id === command.targetId)
        const watching = room.viewers?.find(member => member.id === command.targetId)
        const target = seated ?? watching
        if (!target) throw new RoomError('Người chơi đã rời phòng.')
        if (room.game.phase === 'playing' && (command.action === 'demote' || command.action === 'promote' || command.action === 'kick')) throw new RoomError('Hãy kết thúc ván trước khi thay đổi người trong phòng.')
        if (command.action === 'mute' || command.action === 'unmute') {
          room.mutedMemberIds = (room.mutedMemberIds ?? []).filter(id => id !== target.id)
          if (command.action === 'mute') room.mutedMemberIds.push(target.id)
        } else if (command.action === 'promote') {
          if (!this.repository.hasEnergy(target.id, room)) throw new RoomError('Người chơi này đã hết năng lượng.')
          if (!watching) throw new RoomError('Người chơi không còn ở danh sách View.')
          if (room.game.phase === 'playing') throw new RoomError('Hãy kết thúc ván trước khi đổi người lên bàn.')
          const displaced = room.players.length >= 2 ? room.players.find(member => member.id !== playerId) : undefined
          room.viewers = room.viewers!.filter(member => member.id !== target.id)
          if (displaced) {
            room.players = room.players.map(member => member.id === displaced.id ? { id: target.id, name: target.name, side: member.side, ready: false } : member)
            room.viewers.unshift({ id: displaced.id, name: displaced.name, queued: true, ...(displaced.userId ? { userId: displaced.userId } : {}) })
            this.append(room, '', `${displaced.name} xuống xem; ${target.name} được chủ phòng đưa lên bàn.`, true)
          } else {
            room.players.push({ id: target.id, name: target.name, side: room.players.some(member => member.side === 'red') ? 'black' : 'red', ready: false })
          }
          this.resetModeratedSeats(room)
        } else if (command.action === 'demote' || command.action === 'kick') {
          if (command.action === 'demote' && !seated) throw new RoomError('Người chơi không còn trên bàn.')
          if (seated && room.game.phase === 'playing') {
            room.game = finishGame(room.game, opposite(seated.side), 'leave')
            this.captureCompletedMatch(room)
          }
          room.players = room.players.filter(member => member.id !== target.id)
          room.viewers = room.viewers?.filter(member => member.id !== target.id)
          if (command.action === 'demote') this.viewerArrivalOrder.set(target.id, ++this.viewerArrivalSequence)
          if (command.action === 'demote') room.viewers = [...(room.viewers ?? []), { id: target.id, userId: target.userId, name: target.name, queued: false }]
          else room.mutedMemberIds = room.mutedMemberIds?.filter(id => id !== target.id)
          if (seated) {
            this.resetModeratedSeats(room)
            this.moderatedSeatWaits.set(room.id, this.now() + 1000)
          }
        } else throw new RoomError('Thao tác không hợp lệ.')
      }
      this.updateReadyWait(room)
      this.save(room, command, playerId)
      return room
    }
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
      this.save(room, command, playerId)
      return room
    }
    if (command.type === 'repetition-attempt') {
      const player = room.players.find(member => member.id === playerId)
      if (!player) throw new RoomError('Người xem không thể thao tác ván cờ.')
      if (!command.move || !position(command.move.from) || !position(command.move.to)) throw new RoomError('Tọa độ không hợp lệ.')
      const result = applyMoveWithResult(room.game, command.move, this.now(), player.side)
      if (result.rejection !== 'repetition') throw new RoomError('Nước đi không phải là nước lặp bị chặn.')
      room.repetitionAttemptNotice = { id: randomUUID(), recipient: opposite(player.side), message: 'Đối thủ đã thử đi một nước lặp bị cấm.' }
      this.save(room, command, playerId)
      return room
    }
    if (command.type === 'join-queue' || command.type === 'leave-queue') {
      if (!viewer) throw new RoomError('Chỉ người xem mới có thể xếp hàng.')
      if (command.type === 'join-queue') this.requireEnergy(playerId)
      if (command.type === 'join-queue' && room.queueBlocked) throw new RoomError('Đã chặn vào hàng')
      if (command.type === 'join-queue') {
        room.viewers = [...room.viewers!.filter(member => member.id !== playerId), { ...viewer, queued: true }]
        this.fillQueuedVacancies(room)
      } else {
        viewer.queued = false
      }
      this.rotateQueueAfterFinishedGame(room)
      this.updateReadyWait(room)
      this.save(room, command, playerId)
      return room
    }
    if (command.type === 'custom-first-turn') {
      if (room.ownerId !== playerId) throw new RoomError('Chỉ chủ phòng mới được chọn bên đi trước.')
      if (!room.customFen) throw new RoomError('Phòng này không chơi từ thế cờ riêng.')
      if (room.game.phase === 'playing') throw new RoomError('Ván đã bắt đầu.')
      if (command.side !== 'red' && command.side !== 'black') throw new RoomError('Bên đi trước không hợp lệ.')
      const game = gameFromPositionFen(room.customFen)
      const error = positionError(game.board, command.side)
      if (error) throw new RoomError(error)
      room.customFirstTurn = command.side
      if (room.game.phase === 'ready') room.game = this.roomGame(room, this.now())
      this.save(room, command, playerId)
      return room
    }
    if (command.type === 'custom-swap-sides') {
      if (room.ownerId !== playerId) throw new RoomError('Chỉ chủ phòng mới được đổi bên.')
      if (!room.customFen) throw new RoomError('Phòng này không chơi từ thế cờ riêng.')
      if (room.game.phase === 'playing') throw new RoomError('Ván đã bắt đầu.')
      room.players = room.players.map(player => ({ ...player, side: player.side === 'red' ? 'black' : 'red' }))
      this.save(room, command, playerId)
      return room
    }
    const player = room.players.find(member => member.id === playerId)
    if (!player) throw new RoomError('Người xem không thể thao tác ván cờ.')
    if (room.repetitionNoticePaused) throw new RoomError('Đóng bảng nhắc nhở để tiếp tục ván cờ.')
    const now = this.now()
    const takebackExpired = this.expireTakebackOffer(room, now)
    if (takebackExpired && command.type === 'reply-takeback') throw new RoomError('Yêu cầu đi lại đã hết hạn.')
    const disconnectedSeat = room.players.some(member => member.connected === false)
    room.game = room.takebackOffer && !disconnectedSeat ? { ...room.game, lastClockUpdate: now } : command.type === 'move' ? room.game : advanceClock(room.game, now)
    if (room.game.phase === 'finished') {
      room.drawOffer = null
      room.takebackOffer = null
      this.takebackDeadlines.delete(room.id)
    }
    this.rotateQueueAfterFinishedGame(room)
    this.updateReadyWait(room, now)
    if ((command.type === 'ready' || command.type === 'reset') && room.game.phase === 'finished' && room.viewers?.some(viewer => !!this.rematchWaits.get(room.id)?.queuedAtFinish.has(viewer.id) && viewer.queued) && this.queueRotations.has(room.id)) throw new RoomError('Chờ hiệu ứng kết thúc và chuyển người trong hàng chờ lên bàn.')
    if (!room.players.some(member => member.id === playerId)) throw new RoomError('B?n ?? xu?ng h?ng ch?.')
    switch (command.type) {
      case 'ready':
        if (room.queueBlocked) {
          this.requireEnergy(playerId)
          const opponent = room.players.find(member => member.id !== playerId)
          if (opponent && !this.repository.hasEnergy(opponent.id, room)) {
            throw new RoomError('Đối thủ đã hết năng lượng. Vui lòng chờ đối thủ hồi năng lượng để tiếp tục chơi.')
          }
          if (room.game.phase === 'finished') {
            const rematch = this.rematchWaits.get(room.id)
            if (!rematch || rematch.completed.size < room.players.length || now < rematch.notBefore) {
              throw new RoomError('Vui lòng chờ hiệu ứng kết thúc ván.')
            }
          }
        } else {
          this.requireEnergy(playerId)
        }
        if (room.game.phase === 'finished') {
          // Committing to a rematch closes the previous game's replacement window.
          // Later queue entries must wait for this new match to finish.
          this.queueRotations.delete(room.id)
          this.takebackDeadlines.delete(room.id)
          // Keep the countdown deadline of the finished match.
          // The Ready phase subtracts an additional 1000ms,
          // so preserve the original deadline using this offset.
          const preservedRematch = this.rematchWaits.get(room.id)
          if (!preservedRematch ||
              preservedRematch.pair !== room.players.map(p => p.id).sort().join(':')) {
            throw new RoomError('Thông tin ván vừa kết thúc không còn hợp lệ.')
          }
          this.readyWaits.set(room.id, {
            pair: room.players.map(p => p.id).join(':'),
            since: preservedRematch.notBefore - 1000,
          })
          room.game = this.roomGame(room, now)
          room.players = room.players.map(member => ({ ...member, ready: false }))
          room.drawOffer = null
          room.takebackOffer = null
          room.takebackRemaining = { red: 2, black: 2 }
          room.moveCount = 0
          this.histories.set(room.id, [])
        }
        if (room.game.phase !== 'ready') throw new RoomError('Ván đã bắt đầu.')
        room.players.find(member => member.id === playerId)!.ready = true
        // Trận chỉ bắt đầu khi bộ đếm server kết thúc.
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
        this.append(room, '', `${player.name} đã đầu hàng.`, true)
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
        if (room.game.variant === 'jieqi') throw new RoomError('Cờ Úp không hỗ trợ đi lại.')
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
        this.takebackDeadlines.set(room.id, now + TAKEBACK_TIMEOUT_MS)
        room.takebackDecline = null
        break
      }
      case 'reply-takeback': {
        if (room.game.variant === 'jieqi') throw new RoomError('Cờ Úp không hỗ trợ đi lại.')
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
        this.takebackDeadlines.delete(room.id)
        break
      }
      case 'reset':
        if (!room.locked && room.game.phase === 'ready' && room.viewers?.some(viewer => viewer.queued)) throw new RoomError('Không thể cài lại khi đang có người chờ đấu.')
        if (room.game.phase === 'playing') throw new RoomError('Hãy kết thúc ván trước khi chơi lại.')
        room.game = this.roomGame(room, now)
        room.repetitionNoticePaused = false
        room.repetitionNoticeKind = null
        room.repetitionAttemptNotice = null
        this.repetitionNoticeDeadlines.delete(room.id)
        room.players = room.players.map(player => ({ ...player, ready: false }))
        room.drawOffer = null
        room.takebackOffer = null
        this.takebackDeadlines.delete(room.id)
        room.takebackDecline = null
        room.takebackRemaining = { red: 2, black: 2 }
        room.moveCount = 0
        this.histories.set(room.id, [])
        break
      default: throw new RoomError('Thao tác không được hỗ trợ.')
    }
    if (room.game.phase === 'finished') {
      room.takebackOffer = null
      this.takebackDeadlines.delete(room.id)
    }
    this.rotateQueueAfterFinishedGame(room)
    this.updateReadyWait(room, now)
    this.settleEmptyNormalTable(room)
    this.save(room, command, playerId)
    return room
  }
  private resetModeratedSeats(room: RoomSnapshot) {
    this.rematchWaits.delete(room.id)
    this.queueRotations.delete(room.id)
    this.takebackDeadlines.delete(room.id)
    this.readyWaits.delete(room.id)
    this.repetitionNoticeDeadlines.delete(room.id)
    room.game = this.roomGame(room, this.now())
    room.players = room.players.map(member => ({ ...member, ready: false }))
    room.moveCount = 0
    room.drawOffer = null
    room.takebackOffer = null
    room.takebackDecline = null
    room.takebackRemaining = { red: 2, black: 2 }
    room.takebackBlocked = {}
    room.repetitionNoticePaused = false
    room.repetitionNoticeKind = null
    room.repetitionAttemptNotice = null
    this.histories.set(room.id, [])
  }
  reaction(playerId: string, input: import('../../src/types/room').RoomReactionInput) {
    const room = this.memberRoom(playerId)
    if (!input || !ROOM_REACTIONS.some(reaction => reaction === input.reaction)) throw new RoomError('Biểu cảm không hợp lệ.')
    const target = room.players.find(player => player.side === input.targetSide && player.id === input.targetId)
    if (!target) throw new RoomError('Người chơi đã đổi ghế hoặc rời phòng.')
    return { roomId: room.id, matchId: room.activeMatchId ?? room.lastCompletedMatch?.id, actorId: playerId, targetSide: target.side, targetId: target.id, reaction: input.reaction, players: room.players.map(player => player.id).sort() }
  }
  chat(playerId: string, input: unknown): RoomSnapshot {
    const room = this.memberRoom(playerId)
    const member = room.players.find(player => player.id === playerId) ?? room.viewers?.find(viewer => viewer.id === playerId)
    if (!member) throw new RoomError('Bạn chưa vào phòng.')
    if (playerId !== room.ownerId && (room.chatBlocked || room.mutedMemberIds?.includes(playerId))) throw new RoomError('Đã chặn chat')
    this.append(room, member.name, textInput(input, 300))
    this.save(room)
    return room
  }
  tick(): RoomSnapshot[] {
    this.pruneEmptyRooms()
    const changed: RoomSnapshot[] = [...this.prunedRooms.values()]
    this.prunedRooms.clear()
    for (const room of this.repository.all()) {
      const takebackStateChanged = this.takebackStateChanges.delete(room.id)
      if (room.game.phase !== 'playing') {
        this.takebackDeadlines.delete(room.id)
        const beforeGame = room.game
        this.rotateQueueAfterFinishedGame(room)
        const readinessChanged = this.updateReadyWait(room)
        const emptyTableChanged = this.settleEmptyNormalTable(room)
        if (beforeGame !== room.game || readinessChanged || emptyTableChanged || takebackStateChanged || this.energyNotices.has(room.id)) { this.save(room); changed.push(room) }
        continue
      }
      const now = this.now()
      const disconnectedPlayer = room.players.find(player => player.connected === false && this.disconnectDeadlines.has(`${room.id}:${player.userId ?? player.id}`))
      const disconnectDeadline = disconnectedPlayer && this.disconnectDeadlines.get(`${room.id}:${disconnectedPlayer.userId ?? disconnectedPlayer.id}`)
      const takebackExpired = this.expireTakebackOffer(room, now)
      if (takebackExpired && (room.game as GameState).phase === 'finished') {
        room.drawOffer = null
        this.takebackDeadlines.delete(room.id)
        this.rotateQueueAfterFinishedGame(room, now)
        this.updateReadyWait(room, now)
        this.save(room)
        this.takebackStateChanges.delete(room.id)
        changed.push(room)
        continue
      }
      const repetitionNoticeDeadline = this.repetitionNoticeDeadlines.get(room.id)
      if (disconnectedPlayer && disconnectDeadline !== undefined && now >= disconnectDeadline) {
        this.resolveDisconnectExpiry(room,now)
        this.rotateQueueAfterFinishedGame(room, now)
        this.save(room)
        changed.push(room)
        continue
      }
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
      room.game = room.takebackOffer && !disconnectedPlayer ? room.game : advanceClock(room.game, now)
      if (room.game.phase === 'finished') { room.drawOffer = null; room.takebackOffer = null; this.takebackDeadlines.delete(room.id) }
      this.rotateQueueAfterFinishedGame(room)
      this.updateReadyWait(room, now)
      this.save(room)
        this.takebackStateChanges.delete(room.id)
      changed.push(room)
    }
    return changed
  }
}
