// @vitest-environment jsdom
import { act, cleanup, fireEvent, screen, within } from '@testing-library/react'
import { renderWithQuery as render } from './helpers/renderWithQuery'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { RoomStandUpButton, RoomUsersPanel } from '../src/features/game/components/RoomUsersPanel'

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals() })

describe('RoomUsersPanel', () => {
  it('đưa người chờ ghép lên trước, đánh số theo thứ tự vào và để người xem phía sau', () => {
    const { container } = render(<RoomUsersPanel users={[
      { id: 'viewer-1', name: 'Người xem trước' },
      { id: 'waiting-1', name: 'Người chờ một', ready: true },
      { id: 'viewer-2', name: 'Người xem sau' },
      { id: 'waiting-2', name: 'Người chờ hai', ready: true },
    ]} />)

    const cards = [...container.querySelectorAll('li')]
    expect(cards.map(card => card.dataset.userStatus)).toEqual(['waiting', 'waiting', 'watching', 'watching'])
    expect(cards.map(card => card.textContent)).toEqual([
      '1Người chờ một',
      '2Người chờ hai',
      'Người xem trước',
      'Người xem sau',
    ])
    expect(within(cards[0]).getByLabelText('Thứ tự chờ 1')).toBeInTheDocument()
    expect(within(cards[1]).getByLabelText('Thứ tự chờ 2')).toBeInTheDocument()
    expect(screen.queryByLabelText('Thứ tự chờ 3')).not.toBeInTheDocument()
  })
})

it('mobile giữ dòng View mở quản lý, không hiện nút ba chấm và không mở hồ sơ sau giữ', () => {
  vi.useFakeTimers()
  const manage = vi.fn(), profile = vi.fn()
  const view = render(<RoomUsersPanel users={[{ id: 'viewer', name: 'Khán giả' }]} onManage={manage} onAvatarClick={profile} />)
  const row = view.container.querySelector('li')!
  fireEvent.touchStart(row, { touches: [{ clientX: 20, clientY: 20 }] })
  act(() => vi.advanceTimersByTime(550))
  fireEvent.touchEnd(row, { touches: [] })
  fireEvent.click(within(row).getByRole('button', { name: 'Xem hồ sơ Khán giả' }))
  expect(manage).toHaveBeenCalledWith('viewer')
  expect(profile).not.toHaveBeenCalled()
  expect(screen.queryByRole('button', { name: 'Quản lý Khán giả' })).toBeNull()
})

it('nhận menu giữ mặc định của trình duyệt mobile thành quản lý, không mở hai lần', () => {
  vi.useFakeTimers()
  vi.stubGlobal('matchMedia', () => ({ matches: true }))
  const manage = vi.fn()
  const view = render(<RoomUsersPanel users={[{ id: 'viewer', name: 'Khán giả' }]} onManage={manage} />)
  const row = view.container.querySelector('li')!
  fireEvent.touchStart(row, { touches: [{ clientX: 20, clientY: 20 }] })
  act(() => vi.advanceTimersByTime(500))
  fireEvent.contextMenu(row)
  act(() => vi.advanceTimersByTime(100))
  expect(manage).toHaveBeenCalledTimes(1)
})

it('shows the supplied stand-up artwork instead of queue controls for a seated action',()=>{
  const stand=vi.fn(),queue=vi.fn()
  render(<RoomUsersPanel users={[]} onStandUp={stand} onToggleQueue={queue}/>)
  const button=screen.getByRole('button',{name:'Xuống bàn'})
  expect(within(button).getByAltText('Xuống bàn')).toHaveAttribute('src',expect.stringContaining('stand-up.png'))
  expect(screen.queryByRole('button',{name:'Xếp hàng chờ chơi'})).not.toBeInTheDocument()
  fireEvent.click(button);expect(stand).toHaveBeenCalledOnce();expect(queue).not.toHaveBeenCalled()
})
it('keeps queue controls for viewers without exposing stand-up',()=>{
  render(<RoomUsersPanel users={[]} onToggleQueue={()=>{}}/>)
  expect(screen.queryByRole('button',{name:'Xuống bàn'})).not.toBeInTheDocument()
  expect(screen.getByRole('button',{name:'Xếp hàng chờ chơi'})).toBeInTheDocument()
})

it.each(['panel', 'footer'])('keeps the %s stand-up artwork opaque and mounted while a move acknowledgement is pending', placement => {
  const style=document.createElement('style')
  style.textContent='button[aria-label="Xuống bàn"]{opacity:1}.disabled\\:opacity-60:disabled{opacity:.6}.disabled\\:opacity-100:disabled{opacity:1}'
  document.head.appendChild(style)
  const stand=vi.fn()
  const action=(pending:boolean)=>placement==='panel'
    ? <RoomUsersPanel users={[]} onStandUp={stand} queueDisabled={pending}/>
    : <RoomStandUpButton onStandUp={stand} disabled={pending}/>
  try {
    const view=render(action(false))
    const button=screen.getByRole('button',{name:'Xuống bàn'})
    const image=within(button).getByAltText('Xuống bàn')
    expect(getComputedStyle(button).opacity).toBe('1')
    view.rerender(action(true))
    expect(screen.getByRole('button',{name:'Xuống bàn'})).toBe(button)
    expect(within(button).getByAltText('Xuống bàn')).toBe(image)
    expect(button).toBeDisabled()
    expect(getComputedStyle(button).opacity).toBe('1')
    fireEvent.click(button);expect(stand).not.toHaveBeenCalled()
    view.rerender(action(false))
    expect(button).not.toBeDisabled()
    expect(getComputedStyle(button).opacity).toBe('1')
    fireEvent.click(button);expect(stand).toHaveBeenCalledOnce()
  } finally {style.remove()}
})