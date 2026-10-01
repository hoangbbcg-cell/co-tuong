const vietnameseGraphemeSegmenter = new Intl.Segmenter('vi', { granularity: 'grapheme' })

export function normalizeHonorTitle(text: string) {
  return text.normalize('NFC')
}

export function countHonorTitleGraphemes(text: string) {
  let graphemeCount = 0
  for (const _grapheme of vietnameseGraphemeSegmenter.segment(normalizeHonorTitle(text))) graphemeCount += 1
  return graphemeCount
}

export function getHonorTitleFontSize(text: string) {
  const graphemeCount = countHonorTitleGraphemes(text)
  if (graphemeCount <= 12) return 30
  if (graphemeCount <= 16) return 27
  if (graphemeCount <= 20) return 24
  return 21
}
