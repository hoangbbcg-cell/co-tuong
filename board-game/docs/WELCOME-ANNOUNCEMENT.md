# Thông báo chào mừng HOVANG — local

2026-11-04: user yêu cầu dùng mẫu artwork mới và ẩn URL.

- Dùng nguyên ảnh user cung cấp `src/assets/welcome-announcement/welcome-board.png` (1205×1305), giữ tiêu đề Thông Báo, nền giấy/khung vàng và nội dung trong mẫu.
- `WelcomeAnnouncement` dùng ảnh làm artwork, có anchor HTML thật khớp hai nút Cộng đồng Facebook/Nhóm Zalo và button X thật. Không hiện địa chỉ URL; vẫn dùng Facebook mới https://www.facebook.com/share/1cMN4XZVtX/ và Zalo https://zalo.me/g/8ux46ujifj5hjjzlfil5. Mở tab mới/noopener noreferrer.
- Native NoticeOverlay qua portal body, căn giữa viewport. Bảng giữ đúng tỷ lệ và fit cả chiều rộng/cao màn hình; không cuộn nội dung riêng vì text thuộc artwork.
- Có nhãn/nội dung cho trình đọc màn hình; X/Escape đóng. Hiện khi Home mỗi vòng đời App; thoát/tải lại/mở lại game thì hiện lại, đóng không tự hiện lại khi chuyển màn/về Home.
- Chỉ local, không deploy VPS hoặc sửa Home/avatar/backend.
- Backup outputs/backups/welcome-reference-design-20261104. Test3/3 và typecheck PASS. Chưa xác nhận screenshot browser do Chrome không tạo được ảnh trong môi trường hiện tại.
- 2026-11-04: User yêu cầu deploy cùng khung tên Home cố định bằng2Elo và nameplate bàn đấu min140. Gói welcome-name-vps-20261104 đã upload, chờ user sudo kích hoạt; chưa tuyên bố đã lênVPS.
