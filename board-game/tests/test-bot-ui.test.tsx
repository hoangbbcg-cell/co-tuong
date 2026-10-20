// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useTestBot } from '../src/features/game/hooks/useTestBot'
import { useGame } from '../src/features/game/hooks/useGame'
import { useGameStore } from '../src/store/gameStore'
import { useSessionStore } from '../src/store/sessionStore'
import { accountApi } from '../src/services/accountApi'
import { TestBotService } from '../server/services/testBotService'
import { getLegalMoves } from '../src/game/rules'
import type { AccountProfile } from '../src/types/account'
import type { Move } from '../src/types/game'

vi.mock('../src/features/game/hooks/useMoveSound',()=>({useMoveSound:()=>({playMatchIntro:vi.fn()})}))

afterEach(()=>{cleanup();vi.restoreAllMocks();useSessionStore.getState().leave()})
it.each(['xiangqi','jieqi'] as const)('plays two human %s moves through useGame and applies the server balance', async variant=>{
  vi.spyOn(HTMLMediaElement.prototype,'play').mockResolvedValue()
  vi.spyOn(HTMLMediaElement.prototype,'pause').mockImplementation(()=>{})
  const profile={id:'one',displayName:'Tester',gold:'0',energy:5,stats:[],avatarCode:'avatar-0',avatarFrameCode:'frame-0',countryCode:null,provinceName:null,wardName:null,energyRecoveryAt:null} as unknown as AccountProfile
  useSessionStore.setState({screen:'home',account:profile,gold:0})
  const server=new TestBotService({reward:async(_user,_match,gold)=>({...profile,gold:String(gold)})})
  vi.spyOn(accountApi,'testBotStart').mockImplementation(async v=>server.start('one',v))
  const api=vi.spyOn(accountApi,'testBotMove').mockImplementation(async(id,move,key)=>server.move('one',id,move,key))
  const launch=renderHook(useTestBot)
  await act(async()=>launch.result.current.start(variant))
  const match=renderHook(()=>useGame())
  for(let turn=0;turn<2;turn++){
    const game=useGameStore.getState().game
    let move:Move|undefined
    for(let row=0;row<10&&!move;row++)for(let col=0;col<9&&!move;col++)if(game.board[row][col]?.side==='red'){
      const to=getLegalMoves(row,col,game.board)[0];if(to)move={from:{row,col},to}
    }
    if(!move)throw new Error('No move')
    const animations: Move[] = []
    const unsubscribe = useGameStore.subscribe(state => { if (state.animation) animations.push(state.animation) })
    act(()=>match.result.current.select(move.from))
    act(()=>match.result.current.select(move.to))
    await waitFor(()=>expect(useGameStore.getState().history).toHaveLength(turn+1))
    expect(animations).toContainEqual(move)
    await waitFor(()=>expect(useGameStore.getState().animation).toBeNull())
    unsubscribe()
  }
  expect(api).toHaveBeenCalledTimes(2)
  expect(useGameStore.getState().game.result?.winner).toBe('black')
  expect(useSessionStore.getState().gold).toBe(0)
  expect(useSessionStore.getState().account?.gold).toBe(String(useSessionStore.getState().testBotGold))
})
