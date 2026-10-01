import background from '../../../assets/backgrounds/home.png'
import board from '../../../assets/boards/banco-inner-clean-v1.png'
import avatar from '../../../assets/icons/avatar.svg'
import avatarFallback from '../../../assets/computer-setup/avatar.png'
import blackAdvisor from '../../../assets/pieces/codo-coden-v2/black-advisor-codo-coden-v2.png'
import blackCannon from '../../../assets/pieces/codo-coden-v2/black-cannon-codo-coden-v2.png'
import blackElephant from '../../../assets/pieces/codo-coden-v2/black-elephant-codo-coden-v2.png'
import blackGeneral from '../../../assets/pieces/codo-coden-v2/black-general-codo-coden-v2.png'
import blackHorse from '../../../assets/pieces/codo-coden-v2/black-horse-codo-coden-v2.png'
import blackRook from '../../../assets/pieces/codo-coden-v2/black-rook-codo-coden-v2.png'
import blackSoldier from '../../../assets/pieces/codo-coden-v2/black-soldier-codo-coden-v2.png'
import redAdvisor from '../../../assets/pieces/codo-coden-v2/red-advisor-codo-coden-v2.png'
import redCannon from '../../../assets/pieces/codo-coden-v2/red-cannon-codo-coden-v2.png'
import redElephant from '../../../assets/pieces/codo-coden-v2/red-elephant-codo-coden-v2.png'
import redGeneral from '../../../assets/pieces/codo-coden-v2/red-general-codo-coden-v2.png'
import redHorse from '../../../assets/pieces/codo-coden-v2/red-horse-codo-coden-v2.png'
import redRook from '../../../assets/pieces/codo-coden-v2/red-rook-codo-coden-v2.png'
import redSoldier from '../../../assets/pieces/codo-coden-v2/red-soldier-codo-coden-v2.png'
import moveMarker from '../../../assets/icons/move-indicator-dot.png'
import eloFrame from '../../../assets/player/elo-frame.png'
import nameFrame from '../../../assets/player/name-frame.png'
import type { ScreenshotAssetUrls } from './screenshot.types'

export const screenshotAssetUrls: ScreenshotAssetUrls = {
  background,
  board,
  moveMarker,
  avatar,
  avatarFallback,
  nameFrame,
  eloFrame,
  pieces: {
    red: {
      rook: redRook,
      horse: redHorse,
      elephant: redElephant,
      advisor: redAdvisor,
      general: redGeneral,
      cannon: redCannon,
      soldier: redSoldier,
    },
    black: {
      rook: blackRook,
      horse: blackHorse,
      elephant: blackElephant,
      advisor: blackAdvisor,
      general: blackGeneral,
      cannon: blackCannon,
      soldier: blackSoldier,
    },
  },
}
