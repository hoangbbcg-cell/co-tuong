import { useRef, useState } from 'react'
import type { PointerEvent, MouseEvent } from 'react'
import type { PieceType, Position, Side } from '../../../types/game'
import { BOARD_COLUMNS, BOARD_ROWS } from '../boardGeometry'
import type { usePositionEditor } from './usePositionEditor'

type Source = { side: Side; type: PieceType; from?: Position }
export function usePositionDrag(editor: ReturnType<typeof usePositionEditor>) {
  const pending = useRef<{ source: Source; x: number; y: number; id: number; dragging: boolean } | null>(null)
  const suppressClick = useRef(false)
  const [ghost, setGhost] = useState<(Source & { x: number; y: number }) | null>(null)
  const clear = () => { pending.current = null; setGhost(null) }
  return {
    ghost,
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      suppressClick.current = false
      if (event.button !== 0 || editor.starting) return
      const element = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-position-type], button[data-testid="board-hit"]')
      if (!element || element.disabled) return
      let source: Source | undefined
      if (element.dataset.positionType) source = { side: element.dataset.positionSide as Side, type: element.dataset.positionType as PieceType }
      else {
        const from = { row: Number(element.dataset.row), col: Number(element.dataset.col) }
        const piece = editor.board[from.row][from.col]
        if (piece) source = { side: piece.side, type: piece.type, from }
      }
      if (source) { suppressClick.current = false; pending.current = { source, x: event.clientX, y: event.clientY, id: event.pointerId, dragging: false } }
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      const drag = pending.current
      if (!drag || drag.id !== event.pointerId) return
      if (!drag.dragging && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 5) return
      if (!drag.dragging) {
        drag.dragging = true
        if (!drag.source.from) editor.chooseForDrag(drag.source.side, drag.source.type)
        event.currentTarget.setPointerCapture(event.pointerId)
      }
      event.preventDefault()
      setGhost({ ...drag.source, x: event.clientX, y: event.clientY })
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      const drag = pending.current
      if (!drag || drag.id !== event.pointerId) return
      if (drag.dragging) {
        suppressClick.current = true
        const rect = event.currentTarget.querySelector('#board')?.getBoundingClientRect()
        let target: Position | null = null
        if (rect && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
          const nearest = (values: readonly number[], value: number) => values.reduce((best, item, index) => Math.abs(item - value) < Math.abs(values[best] - value) ? index : best, 0)
          const col = nearest(BOARD_COLUMNS, (event.clientX - rect.left) / rect.width * 1134)
          const row = nearest(BOARD_ROWS, (event.clientY - rect.top) / rect.height * 1296)
          target = editor.side === 'black' ? { row: 9 - row, col: 8 - col } : { row, col }
        }
        editor.drop(drag.source, target)
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
      }
      clear()
    },
    onPointerCancel: clear,
    onClickCapture: (event: MouseEvent<HTMLElement>) => { if (suppressClick.current) { suppressClick.current = false; event.preventDefault(); event.stopPropagation() } },
  }
}
