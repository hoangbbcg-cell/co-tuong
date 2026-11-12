import redRook from '../../assets/pieces/mobile-rendered-v1/red-rook.webp'
import redHorse from '../../assets/pieces/mobile-rendered-v1/red-horse.webp'
import redElephant from '../../assets/pieces/mobile-rendered-v1/red-elephant.webp'
import redAdvisor from '../../assets/pieces/mobile-rendered-v1/red-advisor.webp'
import redGeneral from '../../assets/pieces/mobile-rendered-v1/red-general.webp'
import redCannon from '../../assets/pieces/mobile-rendered-v1/red-cannon.webp'
import redSoldier from '../../assets/pieces/mobile-rendered-v1/red-soldier.webp'
import blackRook from '../../assets/pieces/mobile-rendered-v1/black-rook.webp'
import blackHorse from '../../assets/pieces/mobile-rendered-v1/black-horse.webp'
import blackElephant from '../../assets/pieces/mobile-rendered-v1/black-elephant.webp'
import blackAdvisor from '../../assets/pieces/mobile-rendered-v1/black-advisor.webp'
import blackGeneral from '../../assets/pieces/mobile-rendered-v1/black-general.webp'
import blackCannon from '../../assets/pieces/mobile-rendered-v1/black-cannon.webp'
import blackSoldier from '../../assets/pieces/mobile-rendered-v1/black-soldier.webp'
import type { PieceType, Side } from '../../types/game'

/** Original faces rendered once at DPR3; sRGB lossless files bypass lossy postbuild. */
export const MOBILE_PIECE_ARTWORK: Record<Side, Record<PieceType, string>> = {
  red: { rook: redRook, horse: redHorse, elephant: redElephant, advisor: redAdvisor, general: redGeneral, cannon: redCannon, soldier: redSoldier },
  black: { rook: blackRook, horse: blackHorse, elephant: blackElephant, advisor: blackAdvisor, general: blackGeneral, cannon: blackCannon, soldier: blackSoldier },
}
