Source: ../4470bd4d-e86e-44ae-b57e-7f0f4af78a2f.png (user provided).
Bottom two buttons only: analysis at (275,851,342,317), hint at (681,851,342,317).
Connected exterior grayscale checkerboard removed to true alpha, then trimmed
to the remaining nonzero-alpha bounds. Artwork colors and lettering preserved.
Runtime: trial-analysis.png 323x300; trial-hint.png 324x296.
All corners transparent; used without additional button backgrounds or padding.

Middle control frame: trial-control-frame.png, 937x525, source bounds
(180,301,937,525). Exterior connected checkerboard removed to alpha.
Original machine-label lettering replaced with background sampled/interpolated
from the same button so live HTML can display Máy đi · Bật/Tắt.
Original frame, robot and three navigation-button artworks are preserved.
Transparent hit areas use source-relative positions; analysis/hint remain separate.

Independent render crops from trial-control-frame.png:
trial-back.png (75,72,225,184), trial-forward.png (636,72,225,184),
trial-machine.png (73,294,792,182). Exterior bevel corners masked to alpha,
with visible artwork touching file edges. Used as img elements rather than
resampled background atlas; disabled navigation dims the rendered img itself.

2026-10-14 current runtime artwork: ../6c0cdab5-e284-4ae6-ac70-c3119205ed80.png.
Reproducible crop script: ../../../docs/crop-replay-controls.ps1.
Separate outputs: controls-frame-v2 (692x611), play (668x174), back (184x159),
count (303x133), forward (190x160), machine (696x180), analysis (293x267), hint (292x267).
All exterior connected checkerboard pixels are removed, outputs tight-trimmed,
all four corners alpha=0 for every output. No machine name plaque is used.
Play icon/label, count and machine state labels are removed with row interpolation
from the same button artwork; React renders live labels and count. Robot preserved.
Frame uses border-image; every button is independent and interactive. The count
frame also houses the existing Reset control in trial mode.
- Reset: source ../0fed4f87-153a-4338-ad9b-a3a0e2e1ff1c.png, crop (175,190,905,820), exterior checker removed and tight-trimmed to controls-reset-v2.png 879x800; used beside Hint. Middle trial field displays live step/total.
