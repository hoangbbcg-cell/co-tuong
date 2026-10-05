import novice from '../assets/ranks/rank-01-novice-v2.png'
import knight from '../assets/ranks/rank-02-knight-v2.png'
import adept from '../assets/ranks/rank-03-adept-v2.png'
import commander from '../assets/ranks/rank-04-commander-v2.png'
import king from '../assets/ranks/rank-05-king-v2.png'
import grandmaster from '../assets/ranks/rank-06-grandmaster-v2.png'
import saint from '../assets/ranks/rank-07-saint-v2.png'
import type { RankName } from './rankProgression'

// All seven artworks use the same fixed Home badge box and star position.
export const rankArtwork = {
  'Tân Binh': { image: novice },
  'Kỳ Sĩ': { image: knight },
  'Kỳ Thủ': { image: adept },
  'Kỳ Tướng': { image: commander },
  'Đại Sư': { image: grandmaster },
  'Kỳ Vương': { image: king },
  'Kỳ Thánh': { image: saint },
} as const satisfies Record<RankName, { image: string }>
