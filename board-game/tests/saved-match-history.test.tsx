// @vitest-environment jsdom
import { createRef } from 'react'
import { act, cleanup, createEvent, fireEvent, screen, within } from '@testing-library/react'
import { renderWithQuery as render } from './helpers/renderWithQuery'
import { afterEach, expect, it, vi } from 'vitest'
import { SavedMatchesList } from '../src/features/lobby/components/SavedMatchesList'
import { HistoryDialog } from '../src/features/lobby/components/HistoryDialog'
import { useSessionStore } from '../src/store/sessionStore'
import { usePlayedMatches } from '../src/store/playedMatchesStore'
import { useSavedMatches } from '../src/store/savedMatchesStore'
import { createGame } from '../src/game/state/initial'
import { finishGame } from '../src/game/moves/actions'

afterEach(cleanup)
it.each(['red', 'black'] as const)('places the owner first when playing %s', side => {
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} })
  const owner = 'Picolozz'
  useSavedMatches.setState({ entries: [{ id: 'one', owner, endedAt: 1,
    redName: side === 'red' ? owner : 'Opponent', blackName: side === 'black' ? owner : 'Opponent',
    states: [createGame(), finishGame(createGame(), side, 'resign')],
  }] })
  render(<HistoryDialog dialogRef={createRef()} layout={{ width: 1120, height: 750, scale: 1, compact: false }} name={owner} onClose={() => {}} onReplay={() => {}} onOpenProfile={() => {}} />)
  fireEvent.click(screen.getByRole('tab', { name: 'Đã lưu', hidden: true }))
  const row = screen.getByLabelText('Các ván đã lưu').querySelector('li')!
  const profileButtons = within(row).getAllByRole('button', { name: /^Mở hồ sơ của / })
  const ownerButton = profileButtons.find(button => button.getAttribute('aria-label') === `Mở hồ sơ của ${owner}`)!
  const opponentButton = profileButtons.find(button => button.getAttribute('aria-label') === 'Mở hồ sơ của Opponent')!
  expect(ownerButton.compareDocumentPosition(opponentButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

it.each([false, true])('reveals the save time after holding a row, cancels scrolling, and suppresses release actions (compact=%s)', compact => {
  vi.useFakeTimers()
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} })
  try {
    const savedAt = new Date('2026-10-27T08:30:00Z').getTime()
    useSavedMatches.setState({ entries: [{ id: 'held', owner: 'me', endedAt: 1, savedAt,
      redName: 'me', blackName: 'Opponent', states: [finishGame(createGame(), 'red', 'resign')],
    }] })
    const onOpenProfile = vi.fn()
    const { container } = render(<SavedMatchesList owner="me" scale={1} compact={compact} onClose={() => {}} onOpenProfile={onOpenProfile} />)
    const row = container.querySelector('li')!
    const player = within(row).getByText('me').closest('button')!
    const press = () => {
      const event = createEvent.pointerDown(player)
      Object.defineProperties(event, { isPrimary: { value: true }, button: { value: 0 }, clientX: { value: 120 }, clientY: { value: 180 }, pointerId: { value: 1 } })
      fireEvent(player, event)
    }
    press()
    act(() => vi.advanceTimersByTime(199))
    expect(screen.queryByRole('status', { hidden: true })).toBeNull()
    fireEvent.scroll(container.querySelector('ol')!)
    act(() => vi.advanceTimersByTime(1))
    expect(screen.queryByRole('status', { hidden: true })).toBeNull()
    press()
    act(() => vi.advanceTimersByTime(200))
    expect(screen.getByRole('status', { hidden: true }).querySelector('time')?.dateTime).toBe(new Date(savedAt).toISOString())
    expect(screen.getByRole('status', { hidden: true }).style.top).toBe('170px')
    expect(screen.getByRole('status', { hidden: true }).style.left).toBe('120px')
    fireEvent.pointerUp(player)
    expect(screen.queryByRole('status', { hidden: true })).toBeNull()
    fireEvent.contextMenu(player)
    expect(screen.queryByRole('status', { hidden: true })).toBeNull()
    fireEvent.click(player)
    expect(onOpenProfile).not.toHaveBeenCalled()
    fireEvent.scroll(container.querySelector('ol')!)
    expect(screen.queryByRole('status', { hidden: true })).toBeNull()
  } finally {
    vi.useRealTimers()
  }
})

it.each([false, true])('asks before deleting a saved game and keeps confirmation open on failure (compact=%s)', async compact => {
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} })
  const originalShow = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal')
  const originalClose = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'close')
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.open = true } })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function (this: HTMLDialogElement) { this.open = false } })
  const remove = vi.spyOn(useSavedMatches.getState(), 'remove').mockRejectedValueOnce(new Error('offline')).mockResolvedValue(undefined)
  try {
    useSavedMatches.setState({ entries: [{ id: 'delete-one', owner: 'me', savedTitle: 'Ván thử', endedAt: 1,
      redName: 'me', blackName: 'Opponent', states: [finishGame(createGame(), 'red', 'resign')],
    }] })
    render(<SavedMatchesList owner="me" scale={1} compact={compact} onClose={() => {}} onOpenProfile={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: 'Xóa ván me với Opponent' }))
    expect(screen.getByRole('alertdialog').textContent).toContain('Ván thử')
    expect(remove).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))
    expect(screen.queryByRole('alertdialog')).toBeNull()
    expect(remove).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Xóa ván me với Opponent' }))
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Đồng ý' })) })
    expect(remove).toHaveBeenCalledWith('me', 'delete-one')
    expect(screen.getByRole('alert').textContent).toContain('Không thể xóa')
    expect(screen.getByRole('alertdialog')).toBeTruthy()
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Đồng ý' })) })
    expect(remove).toHaveBeenCalledTimes(2)
    expect(screen.queryByRole('alertdialog')).toBeNull()
  } finally {
    cleanup()
    remove.mockRestore()
    if (originalShow) Object.defineProperty(HTMLDialogElement.prototype, 'showModal', originalShow)
    else Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
    if (originalClose) Object.defineProperty(HTMLDialogElement.prototype, 'close', originalClose)
    else Reflect.deleteProperty(HTMLDialogElement.prototype, 'close')
  }
})

it.each([false, true])('shows the in-game save icon and label while holding a played row (compact=%s)', compact => {
  vi.useFakeTimers()
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} })
  try {
    usePlayedMatches.setState({ entries: [{ id: 'played-hold', owner: 'me', isOnline: true, endedAt: Date.now(),
      redName: 'me', blackName: 'Opponent', states: [finishGame(createGame(), 'red', 'resign')],
    }] })
    const onOpenProfile = vi.fn()
    render(<HistoryDialog dialogRef={createRef()} layout={{ width: 1120, height: 750, scale: 1, compact }} name="me" onClose={() => {}} onReplay={() => {}} onOpenProfile={onOpenProfile} />)
    const player = screen.getByRole('button', { name: 'Mở hồ sơ của me', hidden: true })
    const press = () => {
      const event = createEvent.pointerDown(player)
      Object.defineProperties(event, { isPrimary: { value: true }, button: { value: 0 }, clientX: { value: 120 }, clientY: { value: 180 }, pointerId: { value: 1 } })
      fireEvent(player, event)
      act(() => vi.advanceTimersByTime(200))
    }
    press()
    const notice = screen.getByRole('status', { hidden: true })
    expect(notice.textContent).toBe('Lưu ván cờ')
    expect(notice.querySelector('svg')).not.toBeNull()
    expect(notice.style.top).toBe('170px')
    expect(notice.style.left).toBe('120px')
    fireEvent.pointerUp(player)
    expect(screen.getByRole('status', { hidden: true })).toBe(notice)
    fireEvent.click(player)
    expect(onOpenProfile).not.toHaveBeenCalled()
    fireEvent.pointerDown(notice)
    fireEvent.click(notice)
    expect(screen.getByRole('status', { hidden: true })).toBe(notice)
    fireEvent.scroll(player.closest('ol')!)
    expect(screen.getByRole('status', { hidden: true })).toBe(notice)
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole('status', { hidden: true })).toBeNull()
    press()
    fireEvent.click(screen.getByRole('tab', { name: 'Đã lưu', hidden: true }))
    expect(screen.queryByRole('status', { hidden: true })).toBeNull()
  } finally {
    cleanup()
    usePlayedMatches.setState({ entries: [] })
    vi.useRealTimers()
  }
})

it.each([false, true])('shows saved feedback only after saving succeeds and supports retry (compact=%s)', async compact => {
  vi.useFakeTimers()
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} })
  const originalAnimate = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'animate')
  const originalMatchMedia = window.matchMedia
  Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: () => ({ cancel() {}, onfinish: null }) })
  window.matchMedia = vi.fn().mockReturnValue({ matches: false })
  let completeSave!: () => void
  const save = vi.spyOn(useSavedMatches.getState(), 'save').mockRejectedValueOnce(new Error('offline')).mockImplementation(() => new Promise<void>(resolve => { completeSave = resolve }))
  try {
    const record = { id: 'played-save', owner: 'me', isOnline: true as const, endedAt: Date.now(), redName: 'me', blackName: 'Opponent', states: [finishGame(createGame(), 'red', 'resign')] }
    usePlayedMatches.setState({ entries: [record] })
    render(<HistoryDialog dialogRef={createRef()} layout={{ width: 1120, height: 750, scale: 1, compact }} name="me" onClose={() => {}} onReplay={() => {}} onOpenProfile={() => {}} />)
    const player = screen.getByRole('button', { name: 'Mở hồ sơ của me', hidden: true })
    const event = createEvent.pointerDown(player)
    Object.defineProperties(event, { isPrimary: { value: true }, button: { value: 0 }, clientX: { value: 120 }, clientY: { value: 180 }, pointerId: { value: 1 } })
    fireEvent(player, event)
    act(() => vi.advanceTimersByTime(200))
    fireEvent.pointerUp(player)
    const button = screen.getByRole('button', { name: 'Lưu ván cờ', hidden: true })
    await act(async () => { fireEvent.pointerDown(button); fireEvent.click(button) })
    expect(save).toHaveBeenCalledWith('me', record)
    expect(screen.getByText('Không thể lưu ván cờ. Hãy thử lại.')).toBeTruthy()
    expect(screen.queryByText('Đã lưu', { selector: 'p' })).toBeNull()
    fireEvent.click(button)
    fireEvent.click(button)
    expect(save).toHaveBeenCalledTimes(2)
    expect((button as HTMLButtonElement).disabled).toBe(true)
    expect(screen.queryByText('Đã lưu', { selector: 'p' })).toBeNull()
    await act(async () => { completeSave() })
    expect(screen.getByText('Đã lưu', { selector: 'p' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Lưu ván cờ', hidden: true })).toBeNull()
  } finally {
    cleanup()
    save.mockRestore()
    usePlayedMatches.setState({ entries: [] })
    window.matchMedia = originalMatchMedia
    if (originalAnimate) Object.defineProperty(HTMLElement.prototype, 'animate', originalAnimate)
    else Reflect.deleteProperty(HTMLElement.prototype, 'animate')
    vi.useRealTimers()
  }
})

it.each([false, true])('saves the selected played game with the real store and centers feedback inside its dialog (compact=%s)', async compact => {
  vi.useFakeTimers()
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} })
  const originalAnimate = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'animate')
  const originalMatchMedia = window.matchMedia
  Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: () => ({ cancel() {}, onfinish: null }) })
  window.matchMedia = vi.fn().mockReturnValue({ matches: false })
  const previousAccount = useSessionStore.getState().account
  const previousSaved = useSavedMatches.getState().entries
  const previousStorage = localStorage.getItem('xiangqi-saved-matches-v1')
  try {
    useSessionStore.setState({ account: null })
    useSavedMatches.setState({ entries: [] })
    const states = [finishGame(createGame(), 'red', 'resign')]
    const target = { id: 'selected-game', owner: 'me', isOnline: true as const, endedAt: Date.now(), redName: 'me', blackName: 'Chosen', savedTitle: 'Ván được chọn', startedAt: Date.now(), states }
    usePlayedMatches.setState({ entries: [{ ...target, id: 'other-game', blackName: 'Other' }, target] })
    const dialogRef = createRef<HTMLDialogElement>()
    render(<HistoryDialog dialogRef={dialogRef} layout={{ width: 1120, height: 750, scale: 0.7, compact }} name="me" onClose={() => {}} onReplay={() => {}} onOpenProfile={() => {}} />)
    const player = screen.getByRole('button', { name: 'Mở hồ sơ của Chosen', hidden: true })
    const event = createEvent.pointerDown(player)
    Object.defineProperties(event, { isPrimary: { value: true }, button: { value: 0 }, clientX: { value: 120 }, clientY: { value: 180 }, pointerId: { value: 1 } })
    fireEvent(player, event)
    act(() => vi.advanceTimersByTime(200))
    fireEvent.pointerUp(player)
    const saveButton = screen.getByRole('button', { name: 'Lưu ván cờ', hidden: true })
    expect(saveButton.closest('dialog')).toBe(dialogRef.current)
    await act(async () => { fireEvent.pointerDown(saveButton); fireEvent.click(saveButton) })
    expect(useSavedMatches.getState().entries.map(record => record.id)).toEqual(['selected-game'])
    expect(JSON.parse(localStorage.getItem('xiangqi-saved-matches-v1')!)[0].blackName).toBe('Chosen')
    const notice = screen.getByText('Đã lưu', { selector: 'p' })
    expect(notice.closest('dialog')).toBe(dialogRef.current)
    expect(notice.getAttribute('popover')).toBe('manual')
    expect(notice.style.left).toBe('50%')
    expect(notice.style.top).toBe('50%')
    expect(notice.style.transform).toBe('translate(-50%, -50%)')
    fireEvent.click(screen.getByRole('tab', { name: 'Đã lưu', hidden: true }))
    expect(screen.getByLabelText('Các ván đã lưu').querySelectorAll('li')).toHaveLength(1)
  } finally {
    cleanup()
    usePlayedMatches.setState({ entries: [] })
    useSavedMatches.setState({ entries: previousSaved })
    useSessionStore.setState({ account: previousAccount })
    if (previousStorage === null) localStorage.removeItem('xiangqi-saved-matches-v1')
    else localStorage.setItem('xiangqi-saved-matches-v1', previousStorage)
    window.matchMedia = originalMatchMedia
    if (originalAnimate) Object.defineProperty(HTMLElement.prototype, 'animate', originalAnimate)
    else Reflect.deleteProperty(HTMLElement.prototype, 'animate')
    vi.useRealTimers()
  }
})

it.each([false, true])('resets history tabs and discards unfinished edits on close (compact=%s)', async compact => {
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} })
  const originalScroll = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView')
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() })
  const scrollHeight = vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(180)
  try {
    useSavedMatches.setState({ entries: [{ id: 'close-edit', owner: 'me', endedAt: 1,
      savedTitle: 'Tên đã lưu', savedNote: 'Ghi chú đã lưu', redName: 'me', blackName: 'Opponent',
      states: [finishGame(createGame(), 'red', 'resign')],
    }] })
    const dialogRef = createRef<HTMLDialogElement>()
    render(<HistoryDialog dialogRef={dialogRef} layout={{ width: 1120, height: 750, scale: 1, compact }} name="me" onClose={() => {}} onReplay={() => {}} onOpenProfile={() => {}} />)
    const savedTab = screen.getByRole('tab', { name: 'Đã lưu', hidden: true })
    fireEvent.click(savedTab)
    fireEvent.click(screen.getByRole('button', { name: 'Sửa tên ván đấu', hidden: true }))
    fireEvent.change(screen.getByRole('textbox', { name: 'Tên ván đấu', hidden: true }), { target: { value: 'Chưa lưu' } })
    fireEvent(dialogRef.current!, new Event('close'))
    expect(screen.getByRole('tab', { name: 'Đã chơi', hidden: true }).getAttribute('aria-selected')).toBe('true')
    fireEvent.click(savedTab)
    expect(screen.queryByRole('textbox', { name: 'Tên ván đấu', hidden: true })).toBeNull()
    expect(screen.getByText('Tên đã lưu')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Sửa ghi chú', hidden: true }))
    const input = screen.getByRole('textbox', { name: 'Ghi chú ván đấu', hidden: true }) as HTMLTextAreaElement
    expect(input.style.height).toBe('182px')
    fireEvent.change(input, { target: { value: 'Ghi chú chưa lưu' } })
    fireEvent(dialogRef.current!, new Event('close'))
    fireEvent.click(savedTab)
    expect(screen.queryByRole('textbox', { name: 'Ghi chú ván đấu', hidden: true })).toBeNull()
    expect(screen.getByText('Ghi chú đã lưu')).toBeTruthy()
    await act(async () => { dialogRef.current!.setAttribute('open', '') })
    expect(screen.getByRole('tab', { name: 'Đã chơi', hidden: true }).getAttribute('aria-selected')).toBe('true')
  } finally {
    scrollHeight.mockRestore()
    if (originalScroll) Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', originalScroll)
    else Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView')
  }
})


it.each([false, true])('only shows decisive completed matches in played history (compact=%s)', compact => {
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} })
  const base = { owner: 'me', isOnline: true as const, endedAt: Date.now(), redName: 'me', startedAt: Date.now() }
  const ongoing = { ...base, id: 'active', blackName: 'ActiveOpponent', states: [{ ...createGame(), phase: 'playing' as const }] }
  const finished = { ...base, id: 'done', blackName: 'FinishedOpponent', states: [finishGame(createGame(), 'red', 'resign')] }
  const drawn = { ...base, id: 'draw', blackName: 'DrawOpponent', states: [finishGame(createGame(), null, 'draw')] }
  usePlayedMatches.setState({ entries: [ongoing, finished, drawn] })
  render(<HistoryDialog dialogRef={createRef()} layout={{ width: 1120, height: 750, scale: 1, compact }} name="me" onClose={() => {}} onReplay={() => {}} onOpenProfile={() => {}} />)
  expect(screen.queryByRole('button', { name: 'Mở hồ sơ của ActiveOpponent', hidden: true })).toBeNull()
  expect(screen.queryByRole('button', { name: 'Mở hồ sơ của DrawOpponent', hidden: true })).toBeNull()
  expect(screen.getByRole('button', { name: 'Mở hồ sơ của FinishedOpponent', hidden: true })).toBeTruthy()
  expect(screen.queryByText('Đang đấu')).toBeNull()
  act(() => usePlayedMatches.setState({ entries: [{ ...ongoing, states: [finishGame(createGame(), 'black', 'resign')] }, finished] }))
  expect(screen.getByRole('button', { name: 'Mở hồ sơ của ActiveOpponent', hidden: true })).toBeTruthy()
  usePlayedMatches.setState({ entries: [] })
})
