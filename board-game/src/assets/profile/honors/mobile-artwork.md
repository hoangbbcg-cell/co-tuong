# Mobile honors artwork

Source: existing approved `honors-frame-tight.png` (1366 × 999 RGBA), supplied artwork already used by the desktop catalog. No replacement artwork, fonts or icons were generated.

Reproduce with `scripts/crop-honors-mobile.py` using Pillow. The script trims each output to its alpha bounding box and asserts that all four image bounds are tight.

- `mobile-frame.png`: original outside corners/edges and original inner patterned panel, with the old vertical sidebar removed. Original top strip repeats under the detached title; mirrored original corner artwork removes the embedded close/tab fragments. Used as a nine-slice border (`110 fill`, 28px border image width) so phone height does not stretch the corners.
- `mobile-title.png`: source rectangle `(380,0)-(986,109)`, original red/gold title, chains and tassels. Alpha silhouette removes the background outside the artwork.
- `mobile-close.png`: source rectangle `(1280,20)-(1366,157)`, original close button and tassel, masked and alpha trimmed to 78 × 137.
- Image tabs preserve their original icon, text and frame: All `(20,107)-(288,205)`; Arena `(28,210)-(278,312)`; Awarded `(28,321)-(278,431)`; Streak `(28,440)-(278,546)`; Games `(28,555)-(278,664)`; Attendance `(28,674)-(278,787)`. Corners outside the button artwork have real alpha. No surrounding button padding or background is added in the UI.

Desktop continues using the unmodified source image. Keep the source and crop script when reorganizing assets.

2026-10-21: Mobile All tab now reuses the desktop neutral background/icon/text composition rather than mobile-tab-all.png (whose source already contains selected artwork). The cropped All file remains for provenance/reproduction. Selected mobile tabs reuse the desktop honorsSelectionFrame image with mix-blend-lighten; no new artwork generated.
