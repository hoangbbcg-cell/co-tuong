// @vitest-environment jsdom
import { fireEvent, render, cleanup } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { PlayerInfoCard } from '../src/features/lobby/components/PlayerInfoCard'
afterEach(()=>{cleanup();vi.restoreAllMocks()})
it('toggles a long address and collapses it when its information dialog closes',()=>{
  vi.spyOn(HTMLElement.prototype,'scrollWidth','get').mockReturnValue(500)
  vi.spyOn(HTMLElement.prototype,'clientWidth','get').mockReturnValue(100)
  const view=render(<dialog open><PlayerInfoCard className="" idCopied={false} onCopyId={()=>{}} data={{name:'Guest',xiangqiScore:1000,jieqiScore:1000,friends:0,followers:0,likes:'0',address:'Phường rất dài, Thành phố Hồ Chí Minh'}}/></dialog>)
  fireEvent.click(view.getByRole('button',{name:'Hiển thị đầy đủ địa chỉ'}))
  expect(view.getByRole('button',{name:'Thu gọn địa chỉ'}).getAttribute('aria-expanded')).toBe('true')
  fireEvent.click(view.getByRole('button',{name:'Thu gọn địa chỉ'}))
  expect(view.getByRole('button',{name:'Hiển thị đầy đủ địa chỉ'}).getAttribute('aria-expanded')).toBe('false')
  fireEvent.click(view.getByRole('button',{name:'Hiển thị đầy đủ địa chỉ'}))
  fireEvent(view.container.querySelector('dialog')!,new Event('close'))
  expect(view.getByRole('button',{name:'Hiển thị đầy đủ địa chỉ'}).getAttribute('aria-expanded')).toBe('false')
})
