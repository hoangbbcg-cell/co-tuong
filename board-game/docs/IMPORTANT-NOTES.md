# Ghi chú quan trọng về assets

Đối chiếu với frontend ngày 2026-09-19. Đường dẫn dưới đây tính từ `src/assets/`.

## Bàn và quân cờ

- `Board.tsx` hiện dựng bàn bằng SVG/Tailwind, không dùng `boards/board-transparent.png`. Ghi chú cũ nói dùng PNG và cấm SVG overlay đã lỗi thời; không áp dụng lại vào code hiện tại.
- Bàn có hệ tọa độ 532×608. Cột: 38.5, 95, 152.5, 209.5, 266.5, 323, 380.5, 438, 495. Hàng: 45.5, 102.5, 159, 216, 272, 332, 388.5, 444.5, 501, 557. Quân, marker và vùng bấm cùng dùng các tọa độ này và cùng scale. Thay mặt bàn phải căn đồng bộ các lớp.
- Quân hiện dùng Tailwind và `PieceText`; PNG và registry trong `pieces/` chỉ còn để đối chiếu. `pieces/index.ts` vẫn export `pieces/source.png`: nếu xóa nguồn phải xử lý registry cùng lúc.

## Nền, font và Home

- Home và Game dùng `backgrounds/home.png`; ComputerSetup và RoomSelection dùng `backgrounds/computer.png`. Nền ngoài trong `index.html` dùng `backgrounds/landscape-background.png`. ProfileDialog dùng `backgrounds/wood.svg`.
- Font local nằm ở `fonts/ma-shan-zheng-regular.ttf`, khai báo trong `src/app/styles/index.css`. Giữ giấy phép `fonts/ma-shan-zheng-ofl.txt` đi cùng font.
- Home dùng nguyên cụm `home-actions/quick-full.png`, `rooms-full.png`, `computer-full.png`, `hidden-full.png`, đã có bảng chữ. Giữ alpha, tỷ lệ ảnh, tên truy cập và callback HTML.
- Bốn cụm cắt từ `home-actions/full-badges-sheet.png` (1122×1402), mỗi ô 561×701: quick (0,0), hidden (561,0), computer (0,701), rooms (561,701). Nguồn người dùng: `home-actions/badges-source.png`. Ba ảnh quick/hidden/rooms cũ lấy từ `extracted-sheet.png`, nguồn `actions-source.png`.
- Giải đấu hiện dùng `home-actions/tournament-title-large.png`, có chữ trong ảnh, alpha và mask CSS hòa mép. Cúp, hai dòng phụ và trang trí là DOM riêng. Không gộp chúng vào ảnh khi chỉ đổi đường dẫn.

## Danh hiệu

- `ranks/rank-sheet-source.png` là ảnh nguồn danh hiệu. Chín khung được cắt thành `rank-01-novice.png` đến `rank-09-chess-saint.png`; giữ ảnh nguồn để có thể cắt lại khi cần.
- Danh hiệu đang hiển thị ở Home và PlayerCard là `rank-01-novice.png` (Tân Binh). Huy hiệu là lớp con tuyệt đối của avatar và chồng nhẹ vào mép dưới avatar; không đặt thành hàng độc lập.
- Hộp hồ sơ mở từ avatar dùng `profile/info-title.png` và hai nhãn chế độ `profile/mode-xiangqi.png`/`profile/mode-hidden.png`. Danh hiệu dưới avatar dùng chung `ranks/rank-01-novice-clean.png` như Home và PlayerCard. Các vùng còn lại là HTML/Tailwind để tên, số liệu và nút vẫn động.
- Bảng Xếp hạng mở từ nút Cúp ở Home. Nó dùng `rankings/ranking-title-transparent.png`, tách nền từ `rankings/ranking-title-source.png`; hai tab là PNG nền trong suốt, tách từ `rankings/ranking-tabs-source.png`; phần thân dùng `rankings/ranking-body-panel.png`, tách từ `rankings/ranking-body-source.png` để không tạo khung dày bên ngoài. Danh sách và các nút là HTML/Tailwind để vẫn tương tác. Avatar và danh hiệu dùng lại kiểu Home và `ranks/rank-01-novice-clean.png`; ba hạng đầu phủ thêm `rankings/ranking-wreath.png` với tâm trong suốt. Số hạng 1–3 dùng ba PNG `rank-number-01-gold.png`, `rank-number-02-silver.png`, `rank-number-03-bronze.png`; không dựng lại huy hiệu bằng CSS.
- Hộp Bạn bè mở từ icon Bạn bè ở Home. Nó dùng `friends/friends-title.png` là title “Bạn bè” đã tách nền; sáu avatar danh sách dùng các crop `friends/friend-avatar-01.png` đến `friend-avatar-06.png`. Khung ngoài dùng `friends/friends-frame.png` qua border-image; chữ/tab dùng các crop `friends/friends-tab-*.png` để giữ đúng kiểu chữ từ ảnh mẫu. Bốn file `friends/*-source.png` là ảnh mẫu người dùng cung cấp để đối chiếu/cắt lại khi cần. Các hàng, bộ lọc và nút là HTML/Tailwind để tab và trạng thái vẫn tương tác.

## Chơi với máy và Chọn Bàn

- Ảnh cắt có thể chứa sẵn nền/bóng từ screenshot; không tự xóa nền, đổi tỷ lệ hoặc sinh lại ảnh khi dọn thư mục. Giữ điều khiển HTML và tên truy cập.
- ComputerSetup dùng `computer-setup/title-transparent.png`; `title.png` và `footer.png` không còn được import.
- RoomSelection dùng `room-selection/brown-button.png` qua border-image slice `14 fill`, width `12px`; `panel.png` slice `42`, width `30px`. `borderImageWidth` phải ghi đơn vị px; số không đơn vị là hệ số nhân border-width.
- `room-selection/red-button.png` dùng background-image. Hai ảnh brown/red lấy từ `computer-setup/custom-position.png` và `start-match.png`, đã bỏ nội dung cũ để đặt HTML. Không dùng screenshot chứa chữ/số thay nội dung động.
- Icon Cúp/Loa/Bạn bè/Video của RoomSelection hiện dùng HomeIcon SVG chung; PNG cũ không còn được import. Icon bàn trống dùng mix-blend-screen.

Các vùng cắt đang dùng, theo `x, y, width, height` từ góc trên trái ảnh nguồn:

| Nguồn | File đích | Vùng cắt |
| --- | --- | --- |
| computer-setup/source.png (1956×804) | title.png (nguồn title-transparent.png) | 570,84,814,96 |
| computer-setup/source.png | robot-black.png | 554,180,174,141 |
| computer-setup/source.png | robot-red.png | 554,317,174,143 |
| computer-setup/source.png | custom-position.png | 536,508,444,80 |
| computer-setup/source.png | start-match.png | 999,508,422,80 |
| computer-setup/source.png | puzzles.png | 466,595,1025,141 |
| computer-setup/source.png | trophy.png | 1739,15,56,54 |
| computer-setup/source.png | muted.png | 1817,15,55,54 |
| computer-setup/source.png | avatar.png | 171,16,52,50 |
| computer-setup/source.png | back.png | 104,27,34,23 |
| room-selection/source.png (1673×940) | panel.png | 262,188,1148,552 |
| room-selection/source.png | house.png | 308,108,74,57 |
| room-selection/source.png | empty-board.png | 765,405,137,85 |
| room-selection/source.png | back.png | 164,25,39,36 |
| room-selection/source.png | avatar.png | 242,19,49,49 |

## Nguồn và dọn tiếp

- Giữ nguyên nguồn người dùng trong các file source/screenshot. Các nền home-background, home-ink-background, landscape-background; nhãn label-* và các biến thể tournament được tạo/chỉnh bằng ImageGen theo tài liệu cũ. Home-mountain-background là ảnh người dùng cung cấp, chưa có thông tin tác giả/giấy phép. Không suy diễn quyền sử dụng mới khi chuyển thư mục.
- Nguồn giải đấu là `home-actions/tournament-source.png`; các biến thể khác là ảnh chỉnh từ nguồn này. Không cần giữ prompt hoặc lịch sử xử lý pixel trong tài liệu hiện hành.
- Danh sách di chuyển, đổi tên và ứng viên xóa: [ASSET-CLEANUP.md](ASSET-CLEANUP.md). Markdown cũ tạm ở `asset-notes-pending-removal/`, chờ xác nhận xóa; không dùng làm chỉ dẫn hiện hành.
