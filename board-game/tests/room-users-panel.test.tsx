// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import { RoomUsersPanel } from '../src/features/game/components/RoomUsersPanel'

afterEach(cleanup)

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
