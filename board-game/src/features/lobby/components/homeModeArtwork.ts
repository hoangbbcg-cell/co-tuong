import quick from '../../../assets/home-actions/quick-full.png'
import rooms from '../../../assets/home-actions/rooms-full.png'
import hidden from '../../../assets/home-actions/hidden-full.png'
import computer from '../../../assets/home-actions/computer-full.png'

/** Source-canvas offsets align the baked name plaques across all four modes. */
export const homeModeArtwork = {
  quick: { image: quick, artworkOffset: 0, alphaInsets: [38, 0, 0, 0] },
  rooms: { image: rooms, artworkOffset: 50, alphaInsets: [1, 10, 0, 0] },
  hidden: { image: hidden, artworkOffset: 0, alphaInsets: [41, 24, 0, 0] },
  computer: { image: computer, artworkOffset: 55, alphaInsets: [0, 0, 42, 15] },
} as const
