// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { PlayerCard } from '../src/features/game/components/PlayerCard'
import { getAvatarFrame } from '../src/lib/avatarFrames'

vi.mock('../src/features/lobby/hooks/useDatabaseProfile',()=>({useDatabaseProfile:(name:string)=>name?({displayName:'Người thật',avatarCode:'avatar-3',avatarFrameCode:'frame-2',stats:[{variant:'xiangqi',elo:1500}]}):null}))
vi.mock('../src/features/lobby/components/AvatarCustomization',()=>({AvatarPortrait:({avatarIndex}:{avatarIndex:number})=><span data-testid="portrait" data-avatar={avatarIndex} />}))
afterEach(cleanup)
const props={side:'black' as const,name:'Tên cũ',started:false,active:false,remaining:600000,turnElapsed:0,likeMatchId:'',likeActorId:''}
it('keeps the empty seat identity anchor so its clock remains in the same position',()=>{
  const view=render(<PlayerCard {...props} empty />)
  expect(view.container.querySelector('[data-player-identity]')).toBeTruthy()
  expect(screen.getByTestId('portrait')).toBeTruthy()
  expect(view.container.querySelector('section')?.style.visibility).toBe('hidden')
  expect(screen.getByLabelText('Thời gian quân đen').textContent).toBe('10:00')
})
it('uses the occupied player profile for portrait, frame, name and Elo',()=>{
  const view=render(<PlayerCard {...props} playerId="123" />)
  expect(screen.getByTestId('portrait').getAttribute('data-avatar')).toBe('3')
  expect(screen.getByText('Người thật')).toBeTruthy()
  expect(screen.getByText('1500')).toBeTruthy()
  expect([...view.container.querySelectorAll('img')].some(img=>img.getAttribute('src')===getAvatarFrame(2).image)).toBe(true)
})
it.each(['top','bottom'] as const)('keeps the %s player clock with the name beside the avatar after the game starts',mobileEdge=>{
  const view=render(<PlayerCard {...props} mobileEdge={mobileEdge} playerId="123" started showClock remaining={125000} />)
  const clock=view.container.querySelector('[data-testid="mobile-clock-black"]')
  expect(clock?.textContent).toBe('02:05')
  expect(view.container.querySelector('[data-player-identity]')?.contains(clock)).toBe(true)
  expect(view.container.querySelector('[data-player-identity] [data-player-elo]')?.hasAttribute('hidden')).toBe(false)
})

it('shows the recorded clock even at the initial replay position and updates when seeking', () => {
  const view = render(<PlayerCard {...props} mobileHeader recordedClock remaining={600000} />)
  expect(screen.getByLabelText('Thời gian đã lưu quân đen').textContent).toBe('10:00')
  view.rerender(<PlayerCard {...props} mobileHeader recordedClock remaining={598000} />)
  expect(screen.getByLabelText('Thời gian đã lưu quân đen').textContent).toBe('09:58')
})

it('shows a stationary desktop clock before Ready without changing the mobile header clock', () => {
  const view = render(<PlayerCard {...props} remaining={300000} />)
  const clock = screen.getByLabelText('Thời gian quân đen')
  expect(clock.textContent).toBe('05:00')
  expect(clock.parentElement?.hasAttribute('hidden')).toBe(false)
  expect(clock.parentElement?.className).toContain('desktop:flex')
  view.rerender(<PlayerCard {...props} mobileHeader remaining={300000} />)
  expect(view.container.querySelector('[data-testid="mobile-clock-black"]')?.hasAttribute('hidden')).toBe(true)
})
