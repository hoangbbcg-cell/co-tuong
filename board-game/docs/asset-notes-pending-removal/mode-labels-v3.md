# Ảnh chữ theo mẫu và bảng màu mới — 2026-09-17

Dùng ImageGen tích hợp với ảnh sáu tên chế độ người dùng gửi làm tham chiếu. Thay bốn file `label-quick-play.png`, `label-create-room.png`, `label-computer.png`, `label-hidden-chess.png` trong thư mục này.

Prompt cho từng ảnh:

Use the attached six-label image as the exact lettering reference, not merely inspiration. Extract/recreate ONLY the specified matching label from that sheet as a standalone transparent PNG, preserving its particular chunky compact brush shapes, Vietnamese accents, letter joins, slant and proportions. Replace the face colors with a clean vertical gradient top #F9EDA0 to bottom #C39D44. Solid outline and offset lower shadow MUST be #353B36, not brown and not black. No glow, extra strokes, ornaments, background or other words. Actual alpha transparent background. Tight crop with minimal 3% padding. Text exact: "Chơi nhanh" / "Tạo bàn" / "Chơi với máy" / "Cờ Úp" (mỗi lần chỉ một tên).

Ảnh được dựng lại, không phải font gốc. Màu yêu cầu được đưa vào prompt; màu từng pixel có thể khác do texture và khử răng cưa.

Ảnh Cờ Úp cuối cùng dùng label-quick-play.png làm tham chiếu để đồng nhất viền, với prompt: Change the text of this label to exactly 'Cờ Úp'. Keep this same crisp compact angular brush font and solid dark green outline #353B36. Letter ờ includes BOTH right horn and grave accent. Face vertical gradient #F9EDA0 to #C39D44. Transparent background with NO glow, no backdrop, no blur or haze. This is a flat 2D UI sprite, hard outline. Crop tightly. Text only Cờ Úp.
