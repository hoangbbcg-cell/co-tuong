# Ảnh chữ chế độ — bản dựng lại 2026-09-17

Tạo bằng công cụ ImageGen tích hợp từ mẫu chữ người dùng gửi; thay thế các PNG được HomePage sử dụng:
- `label-quick-play.png`: Chơi nhanh
- `label-create-room.png`: Tạo bàn
- `label-computer.png`: Chơi với máy
- `label-hidden-chess.png`: Cờ Úp

Prompt chung (mỗi ảnh thay Text bằng tên tương ứng):

Recreate the lettering style of the reference screenshot's bottom labels Cờ Tướng / Cờ Úp / Kho Games as closely as possible: chunky angular hand-painted Vietnamese brush lettering, forward-leaning energetic broad wedge strokes, irregular chiseled brush terminals, warm pale cream-gold upper faces shading into muted ochre-gold lower faces, thin dark chocolate brown contour with a firm offset dark brown lower-right extruded shadow. Not cursive script, not Times/serif, no swashes, no glow, no ornamental curls. Only the requested text, exactly spelled with all Vietnamese diacritics. One horizontal line, tightly cropped with 4% transparent padding, actual alpha transparent background, no checkerboard or scene, no button. Match stroke proportions and flat illustrated game UI finish from screenshot. Make all letters equal visual size, bold and legible. Text (verbatim): "Chơi nhanh" / "Tạo bàn" / "Chơi với máy" / "Cờ Úp". Produce a single standalone transparent game menu label PNG.

Kiểm tra từng ảnh và alpha; đây là chữ dựng lại theo mẫu, không phải bộ font/asset gốc và không bảo đảm trùng từng pixel.

Prompt sửa dấu Cờ Úp: Correct ONLY Vietnamese spelling in this transparent label image: it must read exactly 'Cờ Úp'. The first word's second letter is ờ = o WITH A RIGHT-SIDE HORN plus GRAVE ACCENT above. Add a clearly visible horn projecting up/right from the right upper shoulder of the o (ơ), retaining the separate grave accent. Keep all other gold brush lettering, shadow, transparent alpha background and layout unchanged.
