import { memo, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'
import type { Board as BoardState, Move, Piece, Position } from '../../../types/game'
import { buttonInteraction } from '../../../lib/uiClasses'
import mapleBoard from '../../../assets/boards/banco-inner-clean-v1.png'
import readyButton from '../../../assets/buttons/ready-button-ss-shadow-reference.png'
import moveIndicatorDot from '../../../assets/icons/move-indicator-dot.png'
import checkmateHitAnimation from '../../../assets/effects/checkmate-hit-0.2s.webp'
import { PIECE_MOVE_DURATION_MS, getPieceMovePath } from '../moveAnimation'
import { ChessPiece } from './ChessPiece'

const columns = [73, 195, 319, 442, 567, 691, 816, 940, 1061]
const rows = [55, 198, 324, 450, 576, 707, 833, 959, 1085, 1216]
const x = (col: number) => columns[col]
const y = (row: number) => rows[row]
const location = (point: Position, flipped = false) => ({ left: x(flipped ? 8 - point.col : point.col), top: y(flipped ? 9 - point.row : point.row) })
const points = Array.from({ length: 90 }, (_, index) => ({ row: Math.floor(index / 9), col: index % 9 }))
const layer = 'absolute top-0 left-0 h-[1296px] w-[1134px] origin-top-left'
const pieceWidth = 108
const pieceHeight = 112
const pieceFlightHeight = 8
const pieceLiftDurationMs = 500
const pieceLiftRiseMs = 100
const pieceLiftHoldMs = 300
const CHECKMATE_HIT_DURATION_MS = 200
const CHECKMATE_AUDIO_LEAD_MS = 100
const pieceLiftSamples = [
  { name: 'light', rise: 8, shadowScaleX: 1, shadowScaleY: 0.7, shadowBlur: 4, shadowOpacity: 0.25 },
  { name: 'medium', rise: 12, shadowScaleX: 1.35, shadowScaleY: 1.18, shadowBlur: 6, shadowOpacity: 0.38 },
  { name: 'strong', rise: 16, shadowScaleX: 1.5, shadowScaleY: 0.82, shadowBlur: 8, shadowOpacity: 0.34 },
] as const
type PieceLiftVariant = typeof pieceLiftSamples[number]['name']
const emptyPath: Array<{ left: number; top: number }> = []
const frameEdgeExtension = 0
const moveMarkerImageClass = 'absolute block size-[155px] -translate-x-1/2 -translate-y-1/2 object-contain'
const lastMovePieceRing = 'absolute size-[122px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-white bg-transparent shadow-[0_0_5px_1px_#ffffffb3]'
const markerCorners = ['top-0 left-0 border-t-[7px] border-l-[7px]', 'top-0 right-0 border-t-[7px] border-r-[7px]', 'bottom-0 left-0 border-b-[7px] border-l-[7px]', 'bottom-0 right-0 border-b-[7px] border-r-[7px]']
function playCheckmateHit(strikeX: number) {
  const overlay = document.createElement('div')
  overlay.setAttribute('aria-hidden', 'true')
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '2147483647',
    overflow: 'hidden',
    pointerEvents: 'none',
  })
  const image = new Image()
  image.alt = ''
  image.draggable = false
  image.decoding = 'async'
  Object.assign(image.style, {
    position: 'absolute',
    top: '0',
    left: `${strikeX}px`,
    width: '100dvh',
    height: '100dvh',
    maxWidth: 'none',
    objectFit: 'contain',
    transform: 'translate3d(-50%, 0, 0)',
    mixBlendMode: 'screen',
    willChange: 'transform',
    pointerEvents: 'none',
  })
  let timer: number | null = null
  let stopped = false
  const stop = () => {
    if (stopped) return
    stopped = true
    if (timer !== null) window.clearTimeout(timer)
    overlay.remove()
  }
  const finishOnePass = () => {
    if (stopped || timer !== null) return
    timer = window.setTimeout(stop, CHECKMATE_HIT_DURATION_MS)
  }
  image.addEventListener('load', finishOnePass, { once: true })
  image.addEventListener('error', stop, { once: true })
  overlay.append(image)
  document.body.append(overlay)
  image.src = checkmateHitAnimation
  if (image.complete && image.naturalWidth > 0) finishOnePass()
  return stop
}
function animatePieceLift(layer: HTMLDivElement | null, variant: PieceLiftVariant, scale: number, excludePieceId: string | null, onStart?: () => void) {
  if (!layer || typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    onStart?.()
    return () => {}
  }
  const pieces = Array.from(layer.querySelectorAll<HTMLElement>('[data-checkmate-flight="true"]'))
    .filter(piece => piece.dataset.pieceId !== excludePieceId)
  if (!pieces.length || typeof pieces[0].animate !== 'function') {
    onStart?.()
    return () => {}
  }

  const sample = pieceLiftSamples.find(item => item.name === variant) ?? pieceLiftSamples[1]
  const { rise, shadowScaleX, shadowScaleY, shadowBlur, shadowOpacity } = sample
  const riseOffset = pieceLiftRiseMs / pieceLiftDurationMs
  const holdOffset = (pieceLiftRiseMs + pieceLiftHoldMs) / pieceLiftDurationMs
  const shadowBaseTransform = 'rotate(20deg) scale(0.78, 0.95)'
  const liftEasing = 'cubic-bezier(0.2, 0.75, 0.3, 1)'
  const landingEasing = 'cubic-bezier(0.3, 0, 0.7, 0.3)'
  const animations: Animation[] = []
  pieces.forEach(piece => {
    const flight = piece.animate([
      { transform: 'translate3d(0px, 0px, 0px)', offset: 0 },
      { transform: `translate3d(0px, -${rise}px, 0px)`, offset: riseOffset, easing: liftEasing },
      { transform: `translate3d(0px, -${rise}px, 0px)`, offset: holdOffset },
      { transform: 'translate3d(0px, 0px, 0px)', offset: 1, easing: landingEasing },
    ], { duration: pieceLiftDurationMs, easing: 'linear' })
    animations.push(flight)

    const shadow = piece.parentElement?.querySelector<HTMLElement>('[data-checkmate-shadow="true"]')
    if (shadow) {
      animations.push(shadow.animate([
        { opacity: 0.34, transform: shadowBaseTransform, filter: 'blur(1px)', offset: 0 },
        { opacity: shadowOpacity, transform: `translate3d(${rise}px, ${rise}px, 0px) rotate(20deg) scale(${shadowScaleX}, ${shadowScaleY})`, filter: `blur(${shadowBlur}px)`, offset: riseOffset, easing: liftEasing },
        { opacity: shadowOpacity, transform: `translate3d(${rise}px, ${rise}px, 0px) rotate(20deg) scale(${shadowScaleX}, ${shadowScaleY})`, filter: `blur(${shadowBlur}px)`, offset: holdOffset },
        { opacity: 0.34, transform: shadowBaseTransform, filter: 'blur(1px)', offset: 1, easing: landingEasing },
      ], { duration: pieceLiftDurationMs, easing: 'linear' }))
    }

    const sprite = piece.querySelector<HTMLImageElement>('img')
    if (sprite) {
      const baseShadow = `drop-shadow(${9 * scale}px ${13 * scale}px ${4 * scale}px #6a4827c2)`
      const liftedShadow = `drop-shadow(${2 * scale}px ${3 * scale}px ${2 * scale}px #6a4827b8)`
      animations.push(sprite.animate([
        { filter: baseShadow, offset: 0 },
        { filter: liftedShadow, offset: riseOffset, easing: liftEasing },
        { filter: liftedShadow, offset: holdOffset },
        { filter: baseShadow, offset: 1, easing: landingEasing },
      ], { duration: pieceLiftDurationMs, easing: 'linear' }))
    }
  })
  onStart?.()
  return () => animations.forEach(animation => animation.cancel())
}
function PieceMotion({ pieceId, selected, moving, duration, scale, path, children }: { pieceId: string; selected: boolean; moving: boolean; duration: number; scale: number; path: Array<{ left: number; top: number }>; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!moving || !ref.current || path.length < 2 || typeof ref.current.animate !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = path[0]
    const destination = path[path.length - 1]
    const dx = Math.round(destination.left * scale) - Math.round(start.left * scale)
    const dy = Math.round(destination.top * scale) - Math.round(start.top * scale)
    const selectedLift = Math.round(12 * scale)
    const lift = Math.round(pieceFlightHeight * scale)
    const keyframes: Keyframe[] = [
      { transform: `translate3d(0px, ${-selectedLift}px, 0px)`, offset: 0, easing: 'linear' },
      { transform: `translate3d(${dx}px, ${dy - lift}px, 0px)`, offset: 0.9, easing: 'ease-out' },
      { transform: `translate3d(${dx}px, ${dy}px, 0px)`, offset: 1 },
    ]

    const motion = ref.current.animate(keyframes, { duration, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)', fill: 'both' })
    return () => motion.cancel()
  }, [moving, duration, scale, path])
  return <div className={`relative size-full ${moving ? 'transition-none' : 'transition-transform duration-150 ease-out motion-reduce:transition-none'}`} style={{
    transform: selected && !moving ? `translate3d(0px, ${-Math.round(12 * scale)}px, 0px)` : undefined,
  }}>
    {!moving && <div data-checkmate-shadow="true" className="pointer-events-none absolute bottom-[3%] left-[18%] z-0 h-[26%] w-[64%] rounded-[50%] bg-[#21170f]" style={{ opacity: 0.34, transform: 'rotate(20deg) scale(0.78, 0.95)', filter: 'blur(1.5px)' }} />}
    <div ref={ref} data-checkmate-flight="true" data-piece-id={pieceId} className={`relative z-[1] size-full ${moving ? 'will-change-transform' : ''}`}>{children}</div>
  </div>
}
interface PieceViewProps {
  piece: Piece
  testId: string
  left: number
  top: number
  visualRow: number
  selected: boolean
  moving: boolean
  duration: number
  scale: number
  path: Array<{ left: number; top: number }>
}
const PieceView = memo(function PieceView({ piece, testId, left, top, visualRow, selected, moving, duration, scale, path }: PieceViewProps) {
  return <div data-testid={testId} data-piece-id={piece.id} className="absolute" style={{
    left: Math.round((left - pieceWidth / 2) * scale),
    top: Math.round((top - pieceHeight / 2) * scale),
    width: Math.round(pieceWidth * scale),
    height: Math.round(pieceHeight * scale),
    zIndex: moving ? 20 : visualRow + 1,
  }}>
    <PieceMotion pieceId={piece.id} selected={selected} moving={moving} duration={duration} scale={scale} path={path}>
      {piece.concealed
        ? <span data-testid="covered-piece" className="block size-full rounded-full bg-[radial-gradient(circle_at_35%_25%,#f5d7a4,#d8a363)] shadow-[inset_0_1px_3px_#fff0c977,inset_0_-1px_2px_#9b602b55]" />
        : <ChessPiece side={piece.side} type={piece.type} character={piece.name} scale={scale} moving={moving} />}
    </PieceMotion>
  </div>
})
function CornerMarker({ point, flipped = false, testId }: { point: Position; flipped?: boolean; testId?: string }) {
  return <div data-testid={testId} style={location(point, flipped)} className="absolute size-[114px] -translate-x-1/2 -translate-y-1/2">
    {markerCorners.map(corner => <span key={corner} className={`absolute size-[34px] border-white shadow-[0_0_4px_#ffffffcc] ${corner}`} />)}
  </div>
}
interface Props {
  hiddenChess?: boolean
  revealPieces?: boolean
  checkmateEffect?: boolean
  flipped?: boolean
  board: BoardState; selected: Position | null; legalMoves: Position[]; animation: Move | null; lastMove?: Move | null
  frameWidth: number; scale: number; disabled: boolean; showStart: boolean; startDisabled: boolean
  startLabel: string; onSelect: (point: Position) => void; onStart: () => void
  onCheckmateEffectStart?: () => void
}
export const Board = memo(function Board(props: Props) {
  const { board, selected, legalMoves, animation, scale } = props
  const piecesLayerRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const checkmateHitCancelRef = useRef<(() => void) | null>(null)
  const animationRef = useRef(animation)
  animationRef.current = animation
  const scaleRef = useRef(scale)
  scaleRef.current = scale
  const checkmateStartRef = useRef(props.onCheckmateEffectStart)
  checkmateStartRef.current = props.onCheckmateEffectStart
  const checkmateLiftRef = useRef<{ key: string; status: 'scheduled' | 'started'; cancel?: () => void } | null>(null)
  useEffect(() => () => checkmateHitCancelRef.current?.(), [])
  const layerStyle = { transform: `scale(${scale})` }
  const path = useMemo(() => animation ? getPieceMovePath(animation).map(point => location(point, props.flipped)) : [], [animation, props.flipped])
  const duration = PIECE_MOVE_DURATION_MS
  const effectPieceId = props.checkmateEffect && props.lastMove
    ? board[props.lastMove.to.row][props.lastMove.to.col]?.id ?? null
    : null
  const effectMoveKey = props.lastMove
    ? `${props.lastMove.from.row},${props.lastMove.from.col}-${props.lastMove.to.row},${props.lastMove.to.col}`
    : null
  const effectTarget = useMemo(() => {
    if (!props.checkmateEffect || !props.lastMove) return null
    const attacker = board[props.lastMove.to.row][props.lastMove.to.col]
    const checkedSide = attacker ? attacker.side === 'red' ? 'black' : 'red' : null
    return (checkedSide && points.find(point => {
      const piece = board[point.row][point.col]
      return piece?.side === checkedSide && piece.type === 'general'
    })) ?? props.lastMove.to
  }, [board, props.checkmateEffect, props.lastMove])
  useLayoutEffect(() => {
    if (!props.checkmateEffect || props.revealPieces === false || !effectPieceId || !effectMoveKey) {
      checkmateLiftRef.current?.cancel?.()
      checkmateLiftRef.current = null
      checkmateHitCancelRef.current?.()
      checkmateHitCancelRef.current = null
      return
    }
    const key = `${effectPieceId}:${effectMoveKey}`
    if (checkmateLiftRef.current?.key === key) return
    checkmateLiftRef.current?.cancel?.()
    const lift: { key: string; status: 'scheduled' | 'started'; cancel?: () => void } = { key, status: 'scheduled' }
    checkmateLiftRef.current = lift
    const startCheckmateAudio = () => {
      if (checkmateLiftRef.current === lift) checkmateStartRef.current?.()
    }
    const startEffects = () => {
      if (checkmateLiftRef.current !== lift) return
      lift.status = 'started'
      lift.cancel = animatePieceLift(piecesLayerRef.current, 'medium', scaleRef.current, effectPieceId, () => {
        checkmateHitCancelRef.current?.()
        const boardBounds = boardRef.current?.getBoundingClientRect()
        const strikeLeft = effectTarget ? location(effectTarget, props.flipped).left * scaleRef.current : props.frameWidth / 2
        const strikeX = boardBounds ? boardBounds.left + strikeLeft : window.innerWidth / 2
        checkmateHitCancelRef.current = playCheckmateHit(strikeX)
      })
    }
    if (animationRef.current) {
      const effectDelay = Math.max(0, PIECE_MOVE_DURATION_MS - 200)
      const audioTimer = window.setTimeout(startCheckmateAudio, Math.max(0, effectDelay - CHECKMATE_AUDIO_LEAD_MS))
      const effectTimer = window.setTimeout(startEffects, effectDelay)
      return () => {
        window.clearTimeout(audioTimer)
        window.clearTimeout(effectTimer)
        if (checkmateLiftRef.current === lift && lift.status === 'scheduled') checkmateLiftRef.current = null
      }
    }
    startCheckmateAudio()
    startEffects()
    return () => {
      if (checkmateLiftRef.current === lift) {
        lift.cancel?.()
        checkmateLiftRef.current = null
      }
    }
  }, [effectMoveKey, effectPieceId, props.checkmateEffect, props.revealPieces])
  const frameEdgeSize = frameEdgeExtension * scale
  const outerFrameWidth = props.frameWidth + frameEdgeSize * 2
  return <div data-testid="board-frame" className="relative col-start-2 row-start-1 max-w-full self-center justify-self-center overflow-visible rounded-[14px] bg-center bg-no-repeat shadow-[0_4px_12px_#170d0766] compact:col-span-full compact:row-start-2" style={{ width: outerFrameWidth, paddingBlock: frameEdgeSize, backgroundImage: `url(${mapleBoard})`, backgroundSize: '100% 100%' }}>
    <div ref={boardRef} id="board" className="relative mx-auto aspect-[1134/1296] touch-manipulation overflow-visible rounded-[0.5%] bg-[length:100%_100%] bg-center shadow-[0_7px_12px_#24120580] select-none" style={{ width: props.frameWidth, backgroundImage: `url(${mapleBoard})` }} aria-label={props.hiddenChess ? 'Bàn cờ úp' : 'Bàn cờ tướng'}>
      <div className={`${layer} pointer-events-none`} style={layerStyle} aria-hidden="true">
        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-georgia text-[48px] leading-none font-bold whitespace-nowrap text-[#936332] italic" style={{ top: 641.5 }}>HOANGBBCG</span>
      </div>
      <div hidden={props.revealPieces === false} className={`${layer} pointer-events-none z-3`} style={layerStyle} aria-hidden="true">
        {props.lastMove && !animation && !selected && <>
          <img data-testid="last-move-origin" src={moveIndicatorDot} alt="" className={moveMarkerImageClass} style={location(props.lastMove.from, props.flipped)} />
          <div data-testid="last-move-destination" className={lastMovePieceRing} style={location(props.lastMove.to, props.flipped)} />
        </>}
        {selected && <CornerMarker testId="selected-marker" point={selected} flipped={props.flipped} />}
        {legalMoves.map(point => board[point.row][point.col]
          ? <CornerMarker key={`${point.row}-${point.col}`} testId="capture-move-marker" point={point} flipped={props.flipped} />
          : <img key={`${point.row}-${point.col}`} data-testid="move-marker" src={moveIndicatorDot} alt="" className={moveMarkerImageClass} style={location(point, props.flipped)} />)}
      </div>
      {/* Render pieces at display resolution; scaling a shared raster layer softens every piece during animation. */}
      <div ref={piecesLayerRef} hidden={props.revealPieces === false} className="pointer-events-none absolute inset-0 isolate z-4" aria-hidden="true">
        {points.map(point => {
          const isMovingSource = animation?.from.row === point.row && animation.from.col === point.col
          const isMovingDestination = animation?.to.row === point.row && animation.to.col === point.col
          if (isMovingDestination) return null
          const piece = isMovingSource && animation
            ? board[animation.to.row][animation.to.col]
            : board[point.row][point.col]
          if (!piece) return null
          const moving = isMovingSource
          const selectedPiece = selected?.row === point.row && selected.col === point.col
          const target = moving && animation ? animation.to : point
          const movingPath = moving ? path : emptyPath
          const visualRow = props.flipped ? 9 - target.row : target.row
          const position = moving && path.length ? path[0] : location(point, props.flipped)
          return <PieceView key={piece.id} piece={piece} testId={`piece-${point.row}-${point.col}`} left={position.left} top={position.top} visualRow={visualRow} selected={selectedPiece} moving={moving} duration={duration} scale={scale} path={movingPath} />
        })}
      </div>
      <div className={`${layer} z-5`} style={layerStyle}>
        {points.map(point => <button type="button" key={`${point.row}-${point.col}`} data-testid="board-hit" className={`absolute size-[100px] -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent p-0 [-webkit-tap-highlight-color:transparent] disabled:opacity-100 focus-visible:rounded-full focus-visible:outline-4 focus-visible:-outline-offset-8 focus-visible:outline-[#ffe2a1] ${animation ? 'cursor-default' : 'cursor-pointer disabled:cursor-default'}`} style={location(point, props.flipped)}
          aria-label={`Hàng ${point.row + 1}, cột ${point.col + 1}${board[point.row][point.col] ? `, ${board[point.row][point.col]!.name}` : ''}`}
          aria-pressed={selected?.row === point.row && selected.col === point.col} disabled={props.disabled} onClick={() => props.onSelect(point)} />)}
      </div>
      {props.showStart && (props.startLabel === 'Sẵn sàng'
        ? <button id="startButton" aria-label={props.startLabel} className={`${buttonInteraction} absolute top-1/2 left-1/2 z-6 m-0 h-fit w-fit -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent p-0 leading-none shadow-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ffe290]`} disabled={props.startDisabled} onClick={props.onStart}><img src={readyButton} alt="" className="m-0 block h-auto w-[170px] border-0 p-0 compact:w-[135px]" /></button>
        : <button id="startButton" className={`${buttonInteraction} absolute top-1/2 left-1/2 z-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#dfbd79] bg-[linear-gradient(#e7c68e,#ac713a)] px-[18px] py-1.5 font-georgia text-lg font-bold whitespace-nowrap text-[#352112] italic shadow-[inset_0_0_0_2px_#8f5e32,0_3px_4px_#301c1599] focus-visible:outline-offset-3 compact:px-3 compact:py-1 compact:text-sm`} disabled={props.startDisabled} onClick={props.onStart}>{props.startLabel}</button>)}
    </div>
  </div>
})

