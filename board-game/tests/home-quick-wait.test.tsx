// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, expect, it, vi } from 'vitest'
import { useHome } from '../src/features/lobby/hooks/useHome'
import { roomApi } from '../src/services/api'
import { roomSocket } from '../src/services/socket'
import { useSessionStore } from '../src/store/sessionStore'
import { createGame } from '../src/game/state/initial'
import type { RoomSnapshot } from '../src/types/room'

afterEach(()=>{cleanup();vi.restoreAllMocks()})
it('opens a solo online hidden room without entering computer mode',async()=>{
  useSessionStore.setState({name:'PlayerOne',energy:5,energyRecoveryAt:null,mode:'local',screen:'home'})
  vi.spyOn(roomApi,'list').mockResolvedValue([{id:'normal',name:'Normal',players:1,phase:'ready'}])
  const create=vi.spyOn(roomApi,'create').mockResolvedValue({id:'hidden',name:'Hidden',players:0,phase:'ready',variant:'jieqi'})
  vi.spyOn(roomSocket,'join').mockResolvedValue({id:'hidden',name:'Hidden',players:[{id:'one',name:'PlayerOne',side:'red',ready:false}],game:{...createGame(),variant:'jieqi'},messages:[],drawOffer:null})
  const client=new QueryClient({defaultOptions:{queries:{retry:false},mutations:{retry:false}}})
  const hook=renderHook(useHome,{wrapper:({children})=><QueryClientProvider client={client}>{children}</QueryClientProvider>})
  act(()=>hook.result.current.playHidden())
  await waitFor(()=>expect(useSessionStore.getState().mode).toBe('online'))
  expect(create).toHaveBeenCalledWith('Bàn Cờ Úp',10,60,useSessionStore.getState().province,undefined,'jieqi')
  expect(useSessionStore.getState().room?.players).toHaveLength(1)
  client.clear()
})
it('creates an online waiting room instead of starting an AI game when nobody is available',async()=>{
  useSessionStore.setState({name:'Kỳ Thủ 123456',energy:5,energyRecoveryAt:null,mode:'local',screen:'home'})
  vi.spyOn(roomApi,'list').mockResolvedValue([])
  const create=vi.spyOn(roomApi,'create').mockResolvedValue({id:'waiting',name:'Bàn cờ',players:0,phase:'ready'})
  const snapshot:RoomSnapshot={id:'waiting',name:'Bàn cờ',players:[{id:'me',name:'Kỳ Thủ 123456',side:'red',ready:false}],game:createGame(),messages:[],drawOffer:null}
  vi.spyOn(roomSocket,'join').mockResolvedValue(snapshot)
  const client=new QueryClient({defaultOptions:{queries:{retry:false},mutations:{retry:false}}})
  const hook=renderHook(useHome,{wrapper:({children})=><QueryClientProvider client={client}>{children}</QueryClientProvider>})
  act(()=>hook.result.current.quickPlay())
  await waitFor(()=>expect(useSessionStore.getState().mode).toBe('online'))
  expect(create).toHaveBeenCalledWith('Bàn cờ',10,60,useSessionStore.getState().province)
  expect(useSessionStore.getState().room?.players).toHaveLength(1)
  client.clear()
})
