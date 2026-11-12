import { MATCH_INTRO_MS, applyMoveWithResult } from '../src/game/moves/actions'
import { describe, expect, it } from 'vitest'
import { RoomService } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'
import { createGame } from '../src/game/state/initial'
import { positionFen } from '../src/game/state/customPosition'

describe('Cấu hình thời gian khi tạo bàn', () => {
  it.each([[58000,5000,60000],[40000,5000,45000],[59500,1000,60000]])('cộng ngay trên thời gian còn lại %i+%i nhưng không vượt1phút', (remaining,increment,expected) => {
    const source={...createGame(),phase:'playing' as const,initialTimeMs:60000,incrementMs:increment,remainingTime:{red:remaining,black:60000}}
    const result=applyMoveWithResult(source,{from:{row:6,col:0},to:{row:5,col:0}},0)
    expect(result.rejection).toBeUndefined()
    expect(result.game.remainingTime.red).toBe(expected)
    expect(result.game.remainingTime.black).toBe(60000)
    expect(result.game.lastMove).toEqual({from:{row:6,col:0},to:{row:5,col:0}})
  })
  it.each([1,2,3,5,10,15,30])('trần tích lũy đúng mốc %i phút của phòng', minutes => {
    let now=0
    const service=new RoomService(new RoomRepository(),()=>now,()=> 'red')
    const {id}=service.create('Có trần',minutes,60,undefined,undefined,'xiangqi',undefined,undefined,10)
    service.join(id,'red','Đỏ');service.join(id,'black','Đen')
    service.command('red',{type:'ready'});service.command('black',{type:'ready'})
    now=MATCH_INTRO_MS+1000
    const moved=service.command('red',{type:'move',move:{from:{row:6,col:0},to:{row:5,col:0}}})
    expect(moved.game.initialTimeMs).toBe(minutes*60000)
    expect(moved.game.remainingTime.red).toBe(minutes*60000)
  })
  it.each([0,1,2,3,4,5,6,7,8,9,10])('tích lũy %i giây cho bên vừa đi nhưng không vượt trần', increment => {
    const source = { ...createGame(), phase: 'playing' as const, initialTimeMs: 60000, incrementMs: increment * 1000, remainingTime: { red: 60000, black: 60000 } }
    const { game, rejection } = applyMoveWithResult(source, { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }, 1000)
    expect(rejection).toBeUndefined()
    expect(game.remainingTime).toEqual({ red: Math.min(60000, 59000 + increment * 1000), black: 60000 })
    expect(source.remainingTime.red).toBe(60000)
  })
  it('không dùng tích lũy để cứu nước đi đã hết giờ', () => {
    const source = { ...createGame(), phase: 'playing' as const, incrementMs: 10000, remainingTime: { red: 1000, black: 60000 } }
    const { game, rejection } = applyMoveWithResult(source, { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }, 1000)
    expect(rejection).toBe('invalid')
    expect(game.remainingTime.red).toBe(0)
    expect(game.result).toEqual({ winner: 'black', reason: 'timeout' })
  })
  it('phòng thế cờ riêng giữ tích lũy khi tạo lại ván', () => {
    const service = new RoomService(new RoomRepository())
    const { id } = service.create('Thế riêng',2,120,undefined,undefined,'xiangqi',undefined,positionFen(createGame().board,'red'),10)
    service.join(id,'red','Đỏ')
    const reset = service.command('red',{ type:'reset' })
    expect(reset.game.incrementMs).toBe(10000)
    expect(reset.game.initialTimeMs).toBe(120000)
    expect(reset.game.remainingTime).toEqual({red:120000,black:120000})
  })
  it('đi lại không giữ phần tích lũy của các nước đã hoàn tác', () => {
    let now = 0
    const service = new RoomService(new RoomRepository(), () => now, () => 'red')
    const {id}=service.create('Đi lại',1,60,undefined,undefined,'xiangqi',undefined,undefined,5)
    service.join(id,'red','Đỏ'); service.join(id,'black','Đen')
    service.command('red',{type:'ready'}); service.command('black',{type:'ready'})
    now=MATCH_INTRO_MS+1000
    service.command('red',{type:'move',move:{from:{row:6,col:0},to:{row:5,col:0}}})
    now+=1000
    service.command('black',{type:'move',move:{from:{row:3,col:0},to:{row:4,col:0}}})
    service.command('red',{type:'request-takeback'})
    service.command('black',{type:'reply-takeback',accepted:true})
    expect(service.roomFor('red')?.game.remainingTime).toEqual({red:60000,black:60000})
    expect(service.roomFor('red')?.game.incrementMs).toBe(5000)
  })
  it.each([1, 2])('cho phép ván %i phút với giới hạn lượt phù hợp', minutes => {
    const service = new RoomService(new RoomRepository())
    const { id } = service.create('Nhanh', minutes, minutes * 60)
    service.join(id, 'red', 'Đỏ')
    expect(service.roomFor('red')?.game.remainingTime.red).toBe(minutes * 60_000)
  })
  it.each([90, 120])('không cho ván1phút chọn giới hạn %i giây', seconds => {
    expect(() => new RoomService(new RoomRepository()).create('Sai', 1, seconds)).toThrow('Thời gian mỗi nước không hợp lệ.')
  })
  it.each([-1, 11, 1.5, '5', NaN, null, Infinity])('từ chối tích lũy ngoài danh sách %s', increment => {
    expect(() => new RoomService(new RoomRepository()).create('Sai', 1, 60, undefined, undefined, 'xiangqi', undefined, undefined, increment)).toThrow('Thời gian tích lũy không hợp lệ.')
  })
  it.each(['xiangqi', 'jieqi'] as const)('cộng tích lũy một lần sau nước hợp lệ, giữ cấu hình khi reset %s', variant => {
    let now = 0
    const service = new RoomService(new RoomRepository(), () => now, () => 'red')
    const { id } = service.create('Nhanh', 1, 60, undefined, undefined, variant, undefined, undefined, 5)
    service.join(id, 'red', 'Đỏ'); service.join(id, 'black', 'Đen')
    service.command('red', { type: 'ready' }); service.command('black', { type: 'ready' })
    now = MATCH_INTRO_MS + 1000
    service.command('red', { type: 'move', move: { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } } })
    expect(service.roomFor('red')?.game.remainingTime).toEqual({ red: 60000, black: 60000 })
    expect(() => service.command('red', { type: 'move', move: { from: { row: 5, col: 0 }, to: { row: 4, col: 0 } } })).toThrow()
    expect(service.roomFor('red')?.game.remainingTime.red).toBe(60000)
    now += 2000
    service.command('black', { type: 'move', move: { from: { row: 3, col: 0 }, to: { row: 4, col: 0 } } })
    expect(service.roomFor('red')?.game.remainingTime).toEqual({ red: 60000, black: 60000 })
    service.command('red', { type: 'resign' })
    const reset = service.command('red', { type: 'reset' })
    expect(reset.incrementSeconds).toBe(5)
    expect(reset.game.incrementMs).toBe(5000)
    expect(reset.game.initialTimeMs).toBe(60000)
    expect(reset.game.turnTimeLimitMs).toBe(60000)
    expect(reset.game.remainingTime).toEqual({ red: 60000, black: 60000 })
  })
  it.each([30, 60, 90, 120])('hết lượt đúng %i giây và giữ cấu hình khi reset', seconds => {
    let now = 0
    const service = new RoomService(new RoomRepository(), () => now, () => 'red')
    const { id } = service.create('Bàn cờ', 15, seconds)
    service.join(id, 'red', 'Đỏ')
    service.join(id, 'black', 'Đen')
    service.command('red', { type: 'ready' })
    service.command('black', { type: 'ready' })
    now = MATCH_INTRO_MS + seconds * 1000 - 1
    service.tick()
    expect(service.roomFor('red')?.game.phase).toBe('playing')
    now++
    service.tick()
    expect(service.roomFor('red')?.game.result).toEqual({ winner: 'black', reason: 'timeout' })
    const reset = service.command('red', { type: 'reset' })
    expect(reset.turnSeconds).toBe(seconds)
    expect(reset.game.turnTimeLimitMs).toBe(seconds * 1000)
    expect(reset.game.remainingTime).toEqual({ red: 900000, black: 900000 })
  })
  it.each([15, 0, 61, '60', null])('server từ chối giới hạn lượt sai %s', seconds => {
    const service = new RoomService(new RoomRepository())
    expect(() => service.create('Bàn cờ', 10, seconds)).toThrow('Thời gian mỗi nước không hợp lệ.')
  })
})
