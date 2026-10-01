import './piece-text.css'

export type PieceTextColor = 'green' | 'orange' | 'red' | 'black'

interface Props {
  children: string
  color: PieceTextColor
  shift?: 'right' | 'down-right'
}

export function PieceText({ children, color, shift }: Props) {
  return <span className="piece-text" data-color={color} data-shift={shift}>{children}</span>
}
