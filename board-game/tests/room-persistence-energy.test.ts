import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import { afterEach, expect, it, vi } from 'vitest'
import { RoomPersistence } from '../server/services/roomPersistence'
import { AccountRepository } from '../server/repositories/accountRepository'
import { MatchRepository } from '../server/repositories/matchRepository'
import { createGame } from '../src/game/state/initial'
import type { AccountProfile } from '../src/types/account'
import type { RoomSnapshot } from '../src/types/room'

afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers() })
const profile = (energy: number, recoveryAt: number | null, unlimited = false): AccountProfile => ({ id: '1', publicId: '12345678', displayName: 'Player', linked: false, renamed: false, avatarCode: 'avatar-0', avatarFrameCode: 'frame-0', countryCode: null, provinceCode: null, provinceName: null, wardCode: null, wardName: null, locationSet: false, gold: '0', energy, energyRecoveryAt: recoveryAt, energyUnlimited: unlimited, friends: 0, followers: 0, likes: 0, stats: [] })

it('uses natural recovery and the unlimited entitlement for seat eligibility', async () => {
  vi.useFakeTimers(); vi.setSystemTime(1000)
  const accounts = new AccountRepository()
  const read = vi.spyOn(accounts, 'profile').mockResolvedValue(profile(0, 2000))
  const persistence = new RoomPersistence(new MatchRepository(), accounts)
  persistence.identities.set('a', { id: '1', name: 'Player' })
  await persistence.prepareStarts(['a'])
  expect(persistence.hasEnergy('a')).toBe(false)
  vi.setSystemTime(2000)
  expect(persistence.hasEnergy('a')).toBe(true)
  read.mockResolvedValue(profile(0, null, true))
  await persistence.canPlay('a')
  expect(persistence.hasEnergy('a')).toBe(true)
})

it('refreshes the authoritative energy cache after a match charges its players', async () => {
  const accounts = new AccountRepository()
  let balance = 1
  vi.spyOn(accounts, 'profile').mockImplementation(async () => profile(balance, Date.now() + 420000))
  const matches = new MatchRepository()
  vi.spyOn(matches, 'start').mockImplementation(async () => { balance = 0 })
  const persistence = new RoomPersistence(matches, accounts)
  persistence.identities.set('a', { id: '1', name: 'PlayerA' })
  persistence.identities.set('b', { id: '2', name: 'PlayerB' })
  await persistence.prepareStarts(['a', 'b'])
  expect(persistence.hasEnergy('a')).toBe(true)
  const room: RoomSnapshot = { id: 'room', name: 'Bàn', players: [{ id: 'a', name: 'PlayerA', side: 'red', ready: true }, { id: 'b', name: 'PlayerB', side: 'black', ready: true }], game: { ...createGame(), phase: 'playing' }, messages: [], drawOffer: null }
  persistence.observe(room)
  await persistence.flush()
  expect(persistence.hasEnergy('a')).toBe(false)
  expect(persistence.hasEnergy('b')).toBe(false)
})

it('allows the verified friend pair to ready at zero energy without granting other rooms free energy',async()=>{
  const accounts=new AccountRepository(),matches=new MatchRepository()
  vi.spyOn(accounts,'profile').mockResolvedValue(profile(0,null))
  const friendship=vi.spyOn(matches,'areFriends').mockResolvedValue(true)
  const persistence=new RoomPersistence(matches,accounts)
  persistence.identities.set('a',{id:'1',name:'An'});persistence.identities.set('b',{id:'2',name:'Binh'})
  const room:RoomSnapshot={id:'friend-room',name:'Friends',players:[{id:'a',name:'An',side:'red',ready:false},{id:'b',name:'Binh',side:'black',ready:false}],game:createGame(),messages:[],drawOffer:null}
  await persistence.prepareStarts(['a','b'],[room])
  expect(room.friendEnergyExemptPair).toEqual(['a','b'])
  expect(persistence.canStart(room)).toBe(true)
  await expect(persistence.canPlay('a',room)).resolves.toBeUndefined()
  expect(persistence.hasEnergy('a')).toBe(false)
  expect(persistence.hasEnergy('outsider',room)).toBe(false)
  room.players[1]={...room.players[1],id:'stranger'}
  expect(persistence.hasEnergy('a',room)).toBe(false)
  room.players[1]={...room.players[1],id:'b'}
  friendship.mockResolvedValue(false)
  await persistence.prepareStarts(['a','b'],[room])
  expect(persistence.canStart(room)).toBe(false)
  expect(room.friendEnergyExemptPair).toBeUndefined()
})

it('lets a zero-energy friend take the vacant seat, play, and remain seated after the free match',async()=>{
  let now=0,balance=1
  const accounts=new AccountRepository(),matches=new MatchRepository()
  vi.spyOn(accounts,'profile').mockImplementation(async()=>profile(balance,null))
  vi.spyOn(matches,'areFriends').mockResolvedValue(true)
  vi.spyOn(matches,'start').mockResolvedValue()
  vi.spyOn(matches,'complete').mockResolvedValue()
  const persistence=new RoomPersistence(matches,accounts)
  persistence.identities.set('a',{id:'1',name:'An'});persistence.identities.set('b',{id:'2',name:'Binh'})
  const service=new RoomService(new RoomRepository(room=>persistence.observe(room),room=>persistence.canStart(room),(id,room)=>persistence.hasEnergy(id,room)),()=>now,()=> 'red')
  await persistence.prepareStarts(['a'])
  const id=service.create('Friends').id
  const room=service.join(id,'a','An')
  balance=0
  await persistence.prepareStarts(['b'],[room])
  service.join(id,'b','Binh')
  await persistence.prepareStarts(['a','b'],[room])
  expect(room.players.map(player=>player.id)).toEqual(['a','b'])
  service.command('a',{type:'ready'});service.command('b',{type:'ready'})
  await persistence.flush()
  expect(room.game.phase).toBe('playing')
  now=2000;service.command('b',{type:'resign'});await persistence.flush()
  await persistence.prepareStarts(['a','b'],[room])
  now=7000;service.tick()
  expect(room.players.map(player=>player.id)).toEqual(['a','b'])
  expect(room.readyCountdown).toBe(30)
})
