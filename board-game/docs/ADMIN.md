# Trang quản trị — 2026-10-19

Mở `/admin` trên cùng địa chỉ đang chạy game, ví dụ `http://localhost:5173/admin` khi dev hoặc `http://localhost:3001/admin` sau build. Trang này đăng nhập bằng mật khẩu riêng, không dùng tài khoản Guest/Google.

## Mật khẩu

Đã chạy `node scripts/setup-admin.mjs`: mật khẩu ngẫu nhiên 24 ký tự nằm trong `board-game/.admin-access.txt`, hash scrypt nằm trong `.env` qua `ADMIN_PASSWORD_HASH`. Cả hai file được Git bỏ qua. Không đưa hash hoặc mật khẩu vào biến `VITE_`, bundle, log hay localStorage.

Thiết lập máy mới: chạy `node scripts/setup-admin.mjs`, sau đó khởi động lại backend. Script không ghi đè cấu hình đang có. Muốn đổi mật khẩu: sao lưu riêng nếu cần, xóa đúng dòng `ADMIN_PASSWORD_HASH` trong `.env` và file `.admin-access.txt`, chạy lại script rồi khởi động lại backend. Mọi phiên cũ hết hiệu lực khi đổi hash hoặc restart server. Khi triển khai Internet, phục vụ qua HTTPS.

## Sử dụng

1. Nhập mật khẩu trên trang quản trị.
2. Tìm ID công khai 8 số hoặc tên, chọn đúng người chơi.
3. Nhập lý do (3–300 ký tự).
4. Đặt số dư vàng/năng lượng và Elo riêng Cờ Tướng/Cờ Úp, rồi bấm lưu; đây là đặt giá trị cuối, không phải cộng thêm.
5. Hoặc chọn avatar/khung/danh hiệu và cấp. Tùy chọn trang bị/hiển thị ngay được bật mặc định.
6. Xem lịch sử trước/sau ngay trong trang. Người chơi tải lại trang để lấy dữ liệu mới.

Giới hạn nhập: vàng 0–1 tỷ, năng lượng/Elo 0–1 triệu, số nguyên. Năng lượng trên5 hợp lệ; hồi tự nhiên chỉ tới5. Không sửa số ván thắng/thua, lịch sử trận, địa chỉ hay quyền liên kết tài khoản.

## Phạm vi kỹ thuật

- Frontend `/admin` đứng ngoài EntryGate; không tự tạo Guest, không đổi Home hoặc hình học avatar.
- `/api/admin` dùng mật khẩu scrypt + session ngẫu nhiên, lưu hash session trong RAM, cookie HttpOnly/SameSite Strict, path `/api/admin`, hết hạn2 giờ. Cookie người chơi không có quyền quản trị. Sai mật khẩu5 lần/IP bị chặn10 phút; cấu hình thiếu thì đóng truy cập. Giữ kiểm tra Origin.
- Controller → AdminService → AdminRepository. Mọi thao tác ghi nằm trong transaction, khóa user/resources, bắt buộc lý do và UUID. UUID được chống ghi lặp; dùng lại với payload khác trả409. Không log credential hoặc hash.
- Migration005 thêm `user_cosmetics` và `admin_audit`; không sửa001–004, không tự migrate khi start. Bảng resource_events tiếp tục ghi chênh lệch vàng/năng lượng.
- Cấp được18 avatar (15 sprite + 3 ảnh Shop),7 khung và39 danh hiệu catalog hiện hành. Quyền avatar mới lưu DB và được backend kiểm tra khi người chơi chọn; AvatarPortrait dùng chung hiển thị3 ảnh mới ở mọi nơi, giữ kích thước/vị trí. Danh sách avatar đã cấp cuộn thêm khi quá15 ô; vẫn5 cột/3 hàng nhìn thấy.
- Shop đã mua thật bằng vàng từ2026-10-19; sở hữu dùng chung user_cosmetics, kể cả đồ admin cấp. Không mua/cấp vật phẩm cho người chơi thật trong kiểm thử.
- Migration runner chuẩn hóa CRLF→LF để khớp journal DB cũ sau Windows checkout; không thay nội dung SQL hoặc journal và vẫn phát hiện sửa SQL.

## Kiểm chứng

- MySQL8.0.45 tạm: migrate30 bước/rerun0/verify/smoke PASS;11/11 integration tài khoản + admin PASS. Có kiểm tra chỉnh2 Elo, số dư>5, ledger/audit, request trùng, sở hữu avatar, cấp danh hiệu, rollback vật phẩm không tồn tại và chặn Guest tự cấp.
- DB cotuong: migration005 áp dụng2 bước, verify PASS. Chỉ thêm bảng, không buff tài khoản thật.
- API đang chạy qua proxy5173: login/me/catalog/search/logout PASS; sau logout401. Catalog39, không in mật khẩu/cookie.
- Chưa browser QA trên trang quản trị thực tế; React test không thay kiểm tra trình duyệt.

Kiểm chứng cuối:16/16 unit/React/migration +11/11 MySQLtạm PASS, typecheck/build PASS; dist có admin UI và không chứa mật khẩu hoặc hash.001–004 không có diff.
