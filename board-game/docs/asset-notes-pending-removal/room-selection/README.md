# Tài nguyên Chọn Bàn

2026-09-19 (độ rõ nút): Hai ô nâu dùng ảnh đầy đủ brown-button.png qua border-image slice `14 fill`, rộng viền 12px: giữ cả nền ảnh và góc nguyên tỷ lệ thay vì kéo giãn toàn ảnh theo hai chiều. Bốn nút Cúp/Loa/Bạn bè/Video chuyển sang homeUtilityButton và HomeIcon SVG dùng chung với Home, 48×48px; các PNG icon cũ giữ nguồn đối chiếu.

2026-09-19 (mặt nút đầy đủ): `brown-button.png` giữ toàn bộ ảnh `computer-setup/custom-position.png`, `red-button.png` giữ ảnh `computer-setup/start-match.png`. Thay vùng nội dung cũ bằng dải nền trống cùng ảnh (nâu x=125..145, đỏ x=145..170; y=12..68), trải vào vùng x=45..width-55, y=12..68. Giữ mặt nút, bóng, viền và góc của ảnh nguồn; UI dùng background-image toàn nút, không dùng border-image cho nút nữa. Nội dung tương tác đặt bằng HTML. Các asset chỉ-viền cũ giữ để đối chiếu.

2026-09-19 (chỉnh theo phản hồi): `custom-button-frame.png` lấy từ `../computer-setup/custom-position.png` (444×80), xóa vùng x=14, y=10, width=416, height=60 để chỉ giữ viền. Hai ô phía trên và hai nút lọc dùng viền này, slice 14 và độ rộng 12px. Khung danh sách tiếp tục dùng `panel.png` cắt từ ảnh gốc, slice 42 và độ rộng 30px. `borderImageWidth` bắt buộc có đơn vị px; số không đơn vị là hệ số nhân border-width và gây phóng đại viền. Header chuyển sang thanh gọn 56px (compact 48px) như Chơi Với Máy; header.png giữ nguồn đối chiếu.

Nguồn: `../chọn bàn.png` (1673 × 940), ảnh người dùng cung cấp ngày 2026-09-19. Cắt trực tiếp từ ảnh, giữ ảnh nguồn; không sinh lại hình.

Tọa độ `x, y, width, height` tính từ góc trên trái:

| File | Vùng cắt | Lát viền |
| --- | --- | --- |
| header.png | 119, 12, 1437, 64 | 24 |
| panel.png | 262, 188, 1148, 552 | 42 |
| button.png | 636, 97, 281, 79 | 20 |
| quick.png | 934, 97, 455, 79 | 20 |
| house.png | 308, 108, 74, 57 | — |
| empty-board.png | 765, 405, 137, 85 | — |
| back.png | 164, 25, 39, 36 | — |
| avatar.png | 242, 19, 49, 49 | — |
| trophy.png | 1390, 19, 54, 50 | — |
| muted.png | 1464, 19, 54, 50 | — |
| friends.png | 740, 832, 67, 64 | — |
| video.png | 865, 832, 68, 64 | — |

Bốn ảnh khung xóa vùng giữa thành alpha, dùng border-image không fill để giữ góc khi đổi kích thước và không đưa chữ/số từ ảnh vào UI. Nền dùng lại `../nền máy.png` của Chơi Với Máy. Icon giữ RGB/nền trong vùng cắt; icon bàn trống hòa nền bằng mix-blend-screen.

Riêng header xóa thêm vùng x=36, y=4, width=1365, height=56 trong ảnh cắt để loại toàn bộ avatar/tên/icon khỏi lát viền, giữ đường viền và hai góc trang trí.

Tên người chơi, số bàn/người, thời gian, danh sách phòng và trạng thái rỗng là nội dung động. Các nút, bộ lọc và select vẫn là điều khiển HTML thật, giữ luồng API/socket hiện có.
