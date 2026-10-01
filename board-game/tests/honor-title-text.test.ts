import { describe, expect, it } from 'vitest'
import { countHonorTitleGraphemes, getHonorTitleFontSize, normalizeHonorTitle } from '../src/features/lobby/honorTitleText'

const titleCases = [
  { title: 'Huyền Thoại', graphemes: 11, fontSize: 30 },
  { title: 'Thánh Thủ', graphemes: 9, fontSize: 30 },
  { title: 'Bậc Thầy', graphemes: 8, fontSize: 30 },
  { title: 'Tôn Sư', graphemes: 6, fontSize: 30 },
  { title: 'Truyền Nghệ', graphemes: 11, fontSize: 30 },
  { title: 'Truyền Lửa', graphemes: 10, fontSize: 30 },
  { title: 'Bằng Hữu', graphemes: 8, fontSize: 30 },
  { title: 'Đồng Hành', graphemes: 9, fontSize: 30 },
  { title: 'Kỳ Đạo Tông Sư', graphemes: 14, fontSize: 27 },
  { title: 'Đối Thủ Đáng Kính', graphemes: 17, fontSize: 24 },
] as const

describe('Vietnamese honor title text', () => {
  it.each(titleCases)('normalizes and measures graphemes in "$title"', ({ title, graphemes, fontSize }) => {
    const decomposedTitle = title.normalize('NFD')

    expect(normalizeHonorTitle(decomposedTitle)).toBe(title.normalize('NFC'))
    expect(countHonorTitleGraphemes(title)).toBe(graphemes)
    expect(countHonorTitleGraphemes(decomposedTitle)).toBe(graphemes)
    expect(getHonorTitleFontSize(decomposedTitle)).toBe(fontSize)
  })
})
