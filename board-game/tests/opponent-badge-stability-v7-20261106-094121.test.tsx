// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { AvatarRankBadge } from '../src/features/game/components/AvatarRankBadge'

const spies = vi.hoisted(() => ({
  renders: vi.fn(),
}))

vi.mock('../src/features/game/components/RankTitleBadge', () => ({
  RankTitleBadge: ({ elo }: { elo: number }) => {
    spies.renders(elo)
    return <span data-testid="rank-title" data-elo={elo} />
  },
}))

afterEach(() => {
  cleanup()
  spies.renders.mockClear()
})

it('does not rerender rank artwork for unrelated clock updates', () => {
  const view = render(
    <div data-clock="600">
      <AvatarRankBadge elo={1500} />
    </div>,
  )

  const node = screen.getByTestId('rank-title')
  expect(node.getAttribute('data-elo')).toBe('1500')

  const before = spies.renders.mock.calls.length

  view.rerender(
    <div data-clock="599">
      <AvatarRankBadge elo={1500} />
    </div>,
  )

  expect(spies.renders).toHaveBeenCalledTimes(before)
  expect(screen.getByTestId('rank-title')).toBe(node)
})

it('updates the rank when real Elo changes', () => {
  const view = render(<AvatarRankBadge elo={1500} />)
  const before = spies.renders.mock.calls.length

  view.rerender(<AvatarRankBadge elo={1600} />)

  expect(spies.renders).toHaveBeenCalledTimes(before + 1)
  expect(screen.getByTestId('rank-title').getAttribute('data-elo')).toBe('1600')
})

it('does not rerender for an unchanged preview star count', () => {
  const view = render(
    <AvatarRankBadge elo={1500} previewStars={2} />,
  )

  const before = spies.renders.mock.calls.length

  view.rerender(
    <AvatarRankBadge elo={1500} previewStars={2} />,
  )

  expect(spies.renders).toHaveBeenCalledTimes(before)
})

it('updates when the preview star count changes', () => {
  const view = render(
    <AvatarRankBadge elo={1500} previewStars={1} />,
  )

  const before = spies.renders.mock.calls.length

  view.rerender(
    <AvatarRankBadge elo={1500} previewStars={2} />,
  )

  expect(spies.renders).toHaveBeenCalledTimes(before + 1)
})