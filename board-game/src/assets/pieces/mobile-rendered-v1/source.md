# Mobile piece faces

These are lossless captures of the existing `ChessPiece` faces, including their existing red displacement and black wood colour filters. They are not redesigned artwork.

- Source: `../codo-coden-v2/*.png` and the original inline filters in `ChessPiece.tsx`.
- Render: Chromium, 108 × 112 CSS pixels at DPR 3, transparent background, shadow disabled.
- Output: 324 × 336 WebP, lossless, sRGB ICC profile retained. The profile prevents the existing finalpass script from applying a lossy re-encode.
- Verified all visible RGB and alpha samples match the captured PNG exactly. Transparent RGB values have no visual meaning.
- Used only by compact Xiangqi boards. Desktop and covered Jieqi artwork retain their existing renderer. Shadow, movement geometry, scale, and timing remain runtime values.
- Capture harness and pixel-check reports: `.checkpoints/piece-mobile-recovery-20261111` at repository root; fixture: `board-game/.checkpoints/mobile-motion-qa`.
