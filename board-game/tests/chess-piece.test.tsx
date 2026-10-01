// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ChessPiece } from '../src/features/game/components/ChessPiece'
import { Board } from '../src/features/game/components/Board'
import { applyMove } from '../src/game/moves/actions'
import { cloneBoard } from '../src/game/rules'
import { createGame, createInitialBoard } from '../src/game/state/initial'
import type { Move } from '../src/types/game'

afterEach(cleanup)

describe('Board rendering stability', () => {
  it('preserves unchanged piece references and DOM nodes when one piece moves', () => {
    const game = createGame()
    game.phase = 'playing'
    const move: Move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }
    const next = applyMove(game, move, 0)
    const cloned = cloneBoard(game.board)
    const staticPiece = game.board[0][0]
    const movingPiece = game.board[6][0]

    expect(cloned[0][0]).toBe(staticPiece)
    expect(next.board[0][0]).toBe(staticPiece)
    expect(next.board[5][0]).toBe(movingPiece)

    const originalAnimate = Object.getOwnPropertyDescriptor(Element.prototype, 'animate')
    const originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia')
    Object.defineProperty(Element.prototype, 'animate', {
      configurable: true,
      value: () => ({ cancel: vi.fn() }) as unknown as Animation,
    })
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: () => ({ matches: false }) })

    try {
      const props = { selected: null, legalMoves: [], frameWidth: 532, scale: 1, disabled: false, showStart: false, startDisabled: false, startLabel: '', onSelect: () => undefined, onStart: () => undefined }
      const view = render(<Board {...props} board={game.board} animation={null} />)
      const staticNode = view.container.querySelector('[data-piece-id="black-0-0"]')
      const movingNode = view.container.querySelector('[data-piece-id="red-6-0"]')

      view.rerender(<Board {...props} board={next.board} animation={move} />)

      expect(view.container.querySelector('[data-piece-id="black-0-0"]')).toBe(staticNode)
      expect(view.container.querySelector('[data-piece-id="red-6-0"]')).toBe(movingNode)
      expect(view.container.querySelector('[data-testid="piece-6-0"]')).toBe(movingNode)
      expect(view.container.querySelectorAll('[data-testid="board-hit"]')).toHaveLength(90)
      expect(view.container.querySelector('[data-testid="board-hit"]')).toHaveClass('cursor-default')
      expect(view.container.querySelector('[data-testid="board-hit"]')).not.toHaveClass('cursor-wait')
    } finally {
      if (originalAnimate) Object.defineProperty(Element.prototype, 'animate', originalAnimate)
      else Reflect.deleteProperty(Element.prototype, 'animate')
      if (originalMatchMedia) Object.defineProperty(window, 'matchMedia', originalMatchMedia)
      else Reflect.deleteProperty(window, 'matchMedia')
    }
  })
})

describe('ChessPiece', () => {
  it('dùng asset mới đồng bộ cho quân đen và quân đỏ', () => {
    const black = render(<ChessPiece side="black" type="soldier" character="卒" />)
    const blackRoot = black.container.firstElementChild as HTMLImageElement

    black.unmount()

    const red = render(<ChessPiece side="red" type="soldier" character="兵" />)
    const redRoot = red.container.firstElementChild as HTMLImageElement

    expect(redRoot.tagName).toBe('IMG')
    expect(redRoot.getAttribute('src')).toContain('red-soldier-codo-coden-v2')
    expect(blackRoot.tagName).toBe('IMG')
    expect(blackRoot.getAttribute('src')).toContain('black-soldier-codo-coden-v2')
    expect(blackRoot.style.filter).toBe('')
    expect(redRoot.style.filter).toBe('')
    expect(blackRoot.className).not.toContain('contrast(')
    expect(redRoot.className).not.toContain('contrast(')
    expect(blackRoot.className).toContain('drop-shadow')
    expect(redRoot.className).toContain('drop-shadow')
    expect(red.container.querySelector('svg')).toBeNull()
  })

  it.each([
    ['rook', '車', 'red-rook-codo-coden-v2'],
    ['horse', '馬', 'red-horse-codo-coden-v2'],
    ['elephant', '相', 'red-elephant-codo-coden-v2'],
    ['advisor', '仕', 'red-advisor-codo-coden-v2'],
    ['general', '帥', 'red-general-codo-coden-v2'],
    ['cannon', '炮', 'red-cannon-codo-coden-v2'],
  ] as const)('dùng asset cùng phong cách Pháo cho quân đỏ %s', (type, character, assetName) => {
    const { container } = render(<ChessPiece side="red" type={type} character={character} />)
    const redRoot = container.firstElementChild as HTMLImageElement

    expect(redRoot.tagName).toBe('IMG')
    expect(redRoot.getAttribute('src')).toContain(assetName)
  })

  it.each([
    ['rook', '車', 'black-rook-codo-coden-v2'],
    ['horse', '馬', 'black-horse-codo-coden-v2'],
    ['elephant', '象', 'black-elephant-codo-coden-v2'],
    ['advisor', '士', 'black-advisor-codo-coden-v2'],
    ['general', '將', 'black-general-codo-coden-v2'],
    ['cannon', '炮', 'black-cannon-codo-coden-v2'],
    ['soldier', '卒', 'black-soldier-codo-coden-v2'],
  ] as const)('dùng asset cùng phong cách quân đỏ cho quân đen %s', (type, character, assetName) => {
    const { container } = render(<ChessPiece side="black" type={type} character={character} />)
    const blackRoot = container.firstElementChild as HTMLImageElement

    expect(blackRoot.tagName).toBe('IMG')
    expect(blackRoot.getAttribute('src')).toContain(assetName)
  })

  it('dùng cùng kích thước 108×112px trong hệ tọa độ bàn mới cho quân đen và quân đỏ', () => {
    const { container } = render(<Board board={createInitialBoard()} selected={null} legalMoves={[]} animation={null} frameWidth={532} scale={1} disabled showStart={false} startDisabled={false} startLabel="" onSelect={() => undefined} onStart={() => undefined} />)

    expect(container.querySelector('[data-testid="piece-0-0"]')).toHaveStyle({ width: '108px', height: '112px' })
    expect(container.querySelector('[data-testid="piece-6-0"]')).toHaveStyle({ width: '108px', height: '112px' })
    expect(container.querySelector('[data-testid="piece-6-4"]')).toHaveStyle({ width: '108px', height: '112px' })
    expect(container.querySelector('[data-testid="piece-9-0"]')).toHaveStyle({ width: '108px', height: '112px' })
  })

  it('hiện dấu chấm ở ô cũ và vòng quanh quân mới sau khi animation kết thúc', () => {
    const move: Move = { from: { row: 6, col: 4 }, to: { row: 5, col: 4 } }
    const board = cloneBoard(createInitialBoard())
    board[5][4] = board[6][4]
    board[6][4] = null
    const props = { board, selected: null, legalMoves: [], frameWidth: 532, scale: 1, disabled: true, showStart: false, startDisabled: false, startLabel: '', onSelect: () => undefined, onStart: () => undefined }
    const view = render(<Board {...props} animation={move} lastMove={move} />)

    expect(view.queryByTestId('last-move-origin')).not.toBeInTheDocument()
    expect(view.queryByTestId('last-move-destination')).not.toBeInTheDocument()
    view.rerender(<Board {...props} animation={null} lastMove={move} />)

    const origin = view.getByTestId('last-move-origin')
    const destination = view.getByTestId('last-move-destination')
    expect(origin).toHaveStyle({ left: '567px', top: '833px' })
    expect(origin.tagName).toBe('IMG')
    expect(origin.getAttribute('src')).toContain('otron.png')
    expect(origin).toHaveClass('size-[155px]', 'object-contain', '-translate-x-1/2', '-translate-y-1/2')
    expect(destination).toHaveStyle({ left: '567px', top: '707px' })
    expect(destination).toHaveClass('rounded-full', 'border-[5px]', 'border-white', 'bg-transparent')
    expect(destination).toHaveClass('shadow-[0_0_5px_1px_#ffffffb3]')

    view.rerender(<Board {...props} selected={move.to} legalMoves={[{ row: 4, col: 4 }, { row: 9, col: 4 }]} animation={null} lastMove={move} />)
    expect(view.queryByTestId('last-move-origin')).not.toBeInTheDocument()
    expect(view.queryByTestId('last-move-destination')).not.toBeInTheDocument()
    const moveMarker = view.getByTestId('move-marker')
    const selectedMarker = view.getByTestId('selected-marker')
    const captureMarker = view.getByTestId('capture-move-marker')
    expect(moveMarker.tagName).toBe('IMG')
    expect(moveMarker.getAttribute('src')).toContain('otron.png')
    expect(moveMarker).toHaveStyle({ left: '567px', top: '576px' })
    expect(moveMarker).toHaveClass('size-[155px]', 'object-contain', '-translate-x-1/2', '-translate-y-1/2')
    expect(selectedMarker.querySelector('span')).toHaveClass('border-white')
    expect(selectedMarker.className).not.toContain('filter')
    expect(selectedMarker.querySelector('span')).toHaveClass('shadow-[0_0_4px_#ffffffcc]')
    expect(captureMarker.querySelector('span')).toHaveClass('border-white')
    expect(captureMarker.className).not.toContain('filter')
    expect(captureMarker).toHaveStyle({ left: '567px', top: '1216px' })
    expect(captureMarker).toHaveClass('-translate-x-1/2', '-translate-y-1/2')
    expect(captureMarker.querySelector('span')).toHaveClass('shadow-[0_0_4px_#ffffffcc]')
    expect(view.getByTestId('piece-5-4').firstElementChild?.getAttribute('style')).not.toContain('filter')
  })

  it.each([
    ['nước thường', { from: { row: 9, col: 0 }, to: { row: 8, col: 0 } }],
    ['nước ăn', { from: { row: 9, col: 0 }, to: { row: 0, col: 0 } }],
  ] as const)('đi theo từng ô và kết thúc đúng tư thế cho %s', (kind, animation) => {
    const originalAnimate = Object.getOwnPropertyDescriptor(Element.prototype, 'animate')
    const originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia')
    const calls: Array<{ frames: Keyframe[]; options?: KeyframeAnimationOptions }> = []
    const cancel = vi.fn()

    Object.defineProperty(Element.prototype, 'animate', {
      configurable: true,
      value: (frames: Keyframe[] | PropertyIndexedKeyframes, options?: KeyframeAnimationOptions) => {
        calls.push({ frames: frames as Keyframe[], options })
        return { cancel } as unknown as Animation
      },
    })
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: () => ({ matches: false }) })

    try {
      const board = createInitialBoard()
      const movedBoard = cloneBoard(board)
      movedBoard[animation.to.row][animation.to.col] = movedBoard[animation.from.row][animation.from.col]
      movedBoard[animation.from.row][animation.from.col] = null
      render(<Board board={movedBoard} selected={null} legalMoves={[]} animation={animation} frameWidth={532} scale={1} disabled showStart={false} startDisabled={false} startLabel="" onSelect={() => undefined} onStart={() => undefined} />)

      expect(calls).toHaveLength(1)
      expect(calls[0].options).toMatchObject({ duration: 400, fill: 'both' })
      expect(calls[0].frames[0].transform).toBe('translate(0px, -8px)')
      const destinationY = animation.to.row === 0 ? -1161 : -131
      expect(calls[0].frames[1].transform).toBe(`translate(0px, ${destinationY - 8}px)`)
      expect(calls[0].frames.at(-1)).toMatchObject({ offset: 1, transform: `translate(0px, ${destinationY}px)` })
      cleanup()
      expect(cancel).toHaveBeenCalledOnce()
    } finally {
      if (originalAnimate) Object.defineProperty(Element.prototype, 'animate', originalAnimate)
      else Reflect.deleteProperty(Element.prototype, 'animate')
      if (originalMatchMedia) Object.defineProperty(window, 'matchMedia', originalMatchMedia)
      else Reflect.deleteProperty(window, 'matchMedia')
    }
  })

  it('dùng khung gỗ tích hợp trong asset mới mà giữ nguyên kích thước mặt bàn', () => {
    const { container } = render(<Board board={createInitialBoard()} selected={null} legalMoves={[]} animation={null} frameWidth={532} scale={1} disabled showStart={false} startDisabled={false} startLabel="" onSelect={() => undefined} onStart={() => undefined} />)

    expect(container.querySelector('[data-testid="board-frame"]')).toHaveStyle({ width: '532px', paddingBlock: '0px' })
    expect(container.querySelector('#board')).toHaveStyle({ width: '532px' })
  })
})
