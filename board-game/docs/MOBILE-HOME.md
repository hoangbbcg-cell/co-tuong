# Home điện thoại

2026-10-18: Bố cục theo ảnh người dùng, ảnh chỉ dẫn vị trí; artwork lấy từ project.

- `src/pages/home/MobileHome.tsx` là phần trình bày compact (<=800px); HomePage giữ toàn bộ dialog và hook nghiệp vụ hiện có. Không đổi desktop hoặc token avatar toàn project.
- Nền home.png, avatar/khung tài khoản thật và AvatarRankBadge/PlayerNameplate dùng chung. Quyền bố trí lại avatar chỉ trong Home compact của task này; giữ khóa sau task.
- Hai ô tài nguyên xếp dọc góc phải, dùng gold-frame-v2 và icon v2. Số dư thật; cộng năng lượng mở EnergyDialog, vàng vẫn báo chưa hỗ trợ.
- Banner dùng tournament-title-large, không tạo artwork mới. Hai chế độ mỗi trang: Cờ Tướng/Chọn Bàn, Cờ Úp/Chơi Với Máy. Mũi tên chuyển trang, vòng lại; callback/energy gate/backend giữ useHome.
- Dock: Xếp hạng/Bạn bè/Lịch sử/Cửa hàng/Chat/Cài đặt. Không thêm nhiệm vụ hoặc túi đồ chưa có. Cài đặt mở lên trên để nằm trong viewport; mặc định desktop vẫn mở xuống.
- Cỡ theo container và chiều cao viewport, có safe-area đáy; không dùng màn mobile demo cũ với chữ lỗi mã hóa và emoji placeholder.

Kiểm chứng:6/6 test mobile-home/home-settings/home-quick-wait/audio-preferences PASS; typecheck/build PASS. Chưa browser QA hoặc kiểm tra hình học trên máy thật vì không có browser kết nối trong phiên. Test DOM chỉ xác nhận carousel/callback/settings, không xác nhận ảnh/pixel/overflow thực tế.
2026-10-18: Nút Cửa hàng đã mở screen shop phủ viewport, dùng chung đường vào với Home desktop.

