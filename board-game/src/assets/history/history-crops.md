# History UI crops

Nguồn: `history-reference.png` (1470×1070), giữ lại nguyên bản làm ảnh đối chiếu.

| Asset | Vùng nguồn (x, y, rộng, cao) | Xử lý |
| --- | --- | --- |
| `history-tab-played.png` | 410, 140, 315, 82 | Xóa nền giấy nối từ mép, trim sát nét cọ. |
| `history-tab-watched.png` | 800, 140, 315, 82 | Xóa nền giấy nối từ mép, trim sát nét cọ. |
| `history-replay-button-frame.png` | 1132, 263, 151, 52 | Cắt đúng viền nút, xóa chữ/icon mờ trong ảnh và mask bốn góc alpha 0; UI đặt icon/chữ HTML sắc nét lên trên. |
| `history-concealed-piece.png` | 775, 260, 58, 58 | Cắt sát mặt quân, mặt nạ tròn feather 1px; bốn góc alpha 0. |
| `history-result-win-v2.png` | 578, 263, 104, 49 | Giữ sọc và màu vàng bên trong, cắt bỏ viền gấp bên phải, phóng 4×; file cuối 416×196. |
| `history-result-loss-v2.png` | 578, 449, 104, 49 | Giữ sọc và màu xanh bên trong, cắt bỏ viền gấp bên phải, phóng 4×; file cuối 416×196. |
| `history-brown-texture.png` | 735, 962, 55, 60 | Texture gỗ nâu trống từ footer ảnh tham chiếu; dùng lặp theo chiều ngang ở footer Lịch sử. |
| `history-parchment-background.png` | Generated 1024×1536 | Nền giấy nâu vàng toàn ảnh, không alpha/padding; tạo từ mẫu lịch sử bằng imagegen và dùng `cover` cho khung danh sách. |
