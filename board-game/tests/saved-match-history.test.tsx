// @vitest-environment jsdom
import { createRef } from 'react'
import { cleanup, fireEvent, screen, within } from '@testing-library/react'
import { renderWithQuery as render } from './helpers/renderWithQuery'
import { afterEach, expect, it } from 'vitest'
import { HistoryDialog } from '../src/features/lobby/components/HistoryDialog'
import { useSavedMatches } from '../src/store/savedMatchesStore'
import { createGame } from '../src/game/state/initial'
import { finishGame } from '../src/game/moves/actions'

afterEach(cleanup)
it.each(['red', 'black'] as const)('places the owner first when playing %s', side => {
  const owner = 'Picolozz'
  useSavedMatches.setState({ entries: [{ id: 'one', owner, endedAt: 1,
    redName: side === 'red' ? owner : 'Opponent', blackName: side === 'black' ? owner : 'Opponent',
    states: [createGame(), finishGame(createGame(), side, 'resign')],
  }] })
  render(<HistoryDialog dialogRef={createRef()} layout={{ width: 1120, height: 750, scale: 1 }} name={owner} onClose={() => {}} onReplay={() => {}} onOpenProfile={() => {}} />)
  fireEvent.click(screen.getByRole('tab', { name: 'Đã lưu', hidden: true }))
  const row = screen.getByLabelText('Các ván đã lưu').querySelector('li')!
  const profiles = within(row).getAllByRole('button', { name: /Mở hồ sơ/, hidden: true })
  expect(profiles[0].getAttribute('aria-label')).toBe(`Mở hồ sơ của ${owner}`)
  expect(profiles[1].getAttribute('aria-label')).toBe('Mở hồ sơ của Opponent')
})
