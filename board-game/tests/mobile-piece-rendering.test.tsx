// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { Board } from '../src/features/game/components/Board'
import { ChessPiece } from '../src/features/game/components/ChessPiece'
import { createGame } from '../src/game/state/initial'

afterEach(() => { cleanup(); vi.unstubAllGlobals() })
const props = { board: createGame().board, selected: null, animation: null, legalMoves: [], frameWidth: 370, scale: 370 / 1134, disabled: true, showStart: false, startDisabled: true, startLabel: '', onSelect: () => {}, onStart: () => {} }

it('uses32pre-rendered faces without live SVG filters only on compact Xiangqi boards', () => {
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('max-width') }))
  const view = render(<Board {...props} />)
  expect(view.container.querySelectorAll('[data-cached-piece-face]')).toHaveLength(32)
  expect(view.container.querySelectorAll('[data-checkmate-flight] filter')).toHaveLength(0)
  view.rerender(<Board {...props} hiddenChess />)
  expect(view.container.querySelectorAll('[data-cached-piece-face]')).toHaveLength(0)
  expect(view.container.querySelectorAll('[data-checkmate-flight] filter')).toHaveLength(32)
})

it('retains the desktop renderer', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  const view = render(<Board {...props} />)
  expect(view.container.querySelectorAll('[data-cached-piece-face]')).toHaveLength(0)
  expect(view.container.querySelectorAll('[data-checkmate-flight] filter')).toHaveLength(32)
})

it('keeps the shadow size and removes it during the same motion', () => {
  const view = render(<ChessPiece side="black" type="horse" character="馬" scale={.5} cachedFace />)
  const image = view.container.querySelector('img')!
  expect(image.style.filter).toBe('drop-shadow(4.5px 6.5px 2px #6a4827c2)')
  expect(image.src).toContain('black-horse.webp')
  view.rerender(<ChessPiece side="black" type="horse" character="馬" scale={.5} cachedFace moving />)
  expect(view.container.querySelector('img')).toBe(image)
  expect(image.style.filter).toBe('none')
})

it('falls back to the original face if the pre-rendered asset fails', () => {
  const view = render(<ChessPiece side="red" type="rook" character="車" cachedFace />)
  fireEvent.error(view.container.querySelector('img')!)
  expect(view.container.querySelector('[data-cached-piece-face]')).toBeNull()
  expect(view.container.querySelector('img')!.src).toContain('red-rook-codo-coden-v2')
  expect(view.container.querySelector('filter')).not.toBeNull()
})
