# Artwork màn đăng nhập — 2026-10-16

- Người dùng yêu cầu tự tạo artwork theo ảnh tham chiếu đăng nhập Cờ Tướng trong hội thoại.
- Nguồn tạo bằng imagegen: `exec-d130457a-219b-4dfe-9532-9ca49bd7f345.png`, 1203×1307 RGBA.
- Bản nguồn giữ tại `../references/uploads/login-panel-generated-2026-10-16.png`.
- Runtime `login-panel.png`: trim bounding box toàn bộ pixel alpha > 0 tại (0,0), kích thước1202×1307. Bốn góc alpha0; không thêm padding/nền giả.
- Logo, khung gỗ và hai artwork nút nằm trong ảnh alpha chung. Nút là button HTML thật; chữ/icon/chú thích là HTML/SVG, không dùng ảnh chụp thay điều khiển.
- Nền tái dùng `../backgrounds/home.png`, không thay asset hoặc UI Home.
- Tỷ lệ hiển thị1202/1307; các tọa độ phần trăm trong LoginPage khớp artwork runtime. Chưa tích hợp Google OAuth.

- 2026-10-16: Cảnh báo khách dùng top82.8% thay84.3% để tránh họa tiết đáy che chữ; giữ các tọa độ khác.
