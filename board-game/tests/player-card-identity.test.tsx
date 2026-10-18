// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { PlayerCard } from '../src/features/game/components/PlayerCard'
import { getAvatarFrame } from '../src/lib/avatarFrames'

vi.mock('../src/features/lobby/hooks/useDatabaseProfile',()=>({useDatabaseProfile:()=>({displayName:'Người thật',avatarCode:'avatar-3',avatarFrameCode:'frame-2',stats:[{variant:'xiangqi',elo:1500}]})}))
vi.mock('../src/features/lobby/components/AvatarCustomization',()=>({AvatarPortrait:({avatarIndex}:{avatarIndex:number})=><span data-testid="portrait" data-avatar={avatarIndex} />}))
afterEach(cleanup)
const props={side:'black' as const,name:'Tên cũ',started:false,active:false,remaining:600000,turnElapsed:0,likeMatchId:'',likeActorId:''}
it('renders no identity at all for an empty seat',()=>{
  const view=render(<PlayerCard {...props} empty />)
  expect(view.container.childElementCount).toBe(0)
})
it('uses the occupied player profile for portrait, frame, name and Elo',()=>{
  const view=render(<PlayerCard {...props} playerId="123" />)
  expect(screen.getByTestId('portrait').getAttribute('data-avatar')).toBe('3')
  expect(screen.getByText('Người thật')).toBeTruthy()
  expect(screen.getByText('1500')).toBeTruthy()
  expect([...view.container.querySelectorAll('img')].some(img=>img.getAttribute('src')===getAvatarFrame(2).image)).toBe(true)
})
