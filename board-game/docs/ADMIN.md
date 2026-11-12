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

## Thống kê người chơi và nhật ký hoạt động — 2026-11-10

Sau khi đăng nhập `/admin`, mục **Người chơi & hoạt động** nằm phía trên phần chỉnh tài khoản hiện có:

- Sáu ô: tài khoản đã vào game, online, offline, Google, khách, tài khoản có hoạt động trong kỳ. Tổng tài khoản lấy từ users có status active; đây là số tài khoản, không phải số con người hay tổng lượt đăng nhập. Google là google_sub khác NULL, khách là NULL, theo liên kết hiện tại. Tổng này bao gồm tài khoản đã tồn tại trước bản cập nhật.
- Online lấy tài khoản đã xác thực có socket đang kết nối trên toàn game (Home/máy/online/replay/shop), loại trùng nhiều tab/thiết bị. Offline = tổng tài khoản active − online. Offline không có nghĩa đã đăng xuất; tab nền còn socket vẫn online. Mất mạng được phản ánh khi Socket.IO xác nhận ngắt. Phạm vi là tiến trình server hiện tại, chưa phải bộ đếm phân tán nhiều server.
- Danh sách người chơi: tên, ID công khai, Google/khách, online/offline, ngày tạo, hoạt động gần nhất; mỗi trang50 người. “Xem hoạt động” lọc nhật ký theo ID đó.
- Nhật ký hoạt động: thời gian, tên/ID người chơi, loại và trang/chức năng. Mỗi trang50 sự kiện; sắp thời gian và ID giảm dần để phân trang ổn định.
- Thống kê chức năng: số lượt và số tài khoản duy nhất theo từng trang/chức năng, dùng cùng bộ lọc với nhật ký.
- Lọc theo tên/ID, Google/khách, online/offline hiện tại; thời gian24h/7ngày/30ngày/toàn bộ; loại vào trang/chức năng/đăng nhập và mã cụ thể. Bộ lọc thời gian áp dụng nhật ký/tổng hợp, không loại tài khoản cũ khỏi danh sách. Các ô tổng không bị bộ lọc người chơi/loại/kết nối làm thay đổi; ô hoạt động trong kỳ chỉ theo khoảng thời gian.
- Tự làm mới15giây khi tab hiện, hoặc bấm Làm mới thống kê. Lỗi tải hiện rõ, không giả số0.

### Ghi nhận và giới hạn

- `GET /api/admin/analytics` cần phiên admin hiện có. Cookie người chơi không đọc được thống kê. Trả ID công khai/tên và thống kê, không trả google_sub, email, hash cookie, mật khẩu hoặc credential.
- `POST /api/account/activity` dùng cookie tài khoản server xác thực; chỉ nhận1–20 sự kiện/mẻ, tối đa120 sự kiện/phút/tài khoản. UUIDv4 chống ghi lặp. Không nhận userId hoặc thời gian từ client làm nguồn xác thực; server tự gắn danh tính/thời gian. Chỉ mã page/feature cố định, không nhận raw URL hoặc nội dung tự do; client không giả được mã login/API-thành-công.
- App ghi các trang home/rooms/computer/position/game/replay/shop khi đổi màn, các chế độ vào bàn và các điều khiển được nhận diện theo danh mục cố định (Bạn bè/Xếp hạng/Hồ sơ/Lịch sử/Tin nhắn/Danh hiệu/Ready/hàng chờ/Lưu/Gợi ý/Phân tích/Đấu ngay…). Không ghi từng nước đi, mọi click, phím nhập, nội dung chat, tên thế cờ, nội dung biểu mẫu, IP hay token. Sự kiện UI thể hiện mở/bấm; không chứng minh thao tác business đã thành công.
- Server ghi đăng nhập Google, chơi/khôi phục khách thành công; các API mua vật phẩm, nhận năng lượng, sửa hồ sơ, bạn bè, hội thoại/tin nhắn, quản lý nhóm, lưu/xóa thế cờ, bookmark, danh hiệu và thích ván chỉ ghi sau HTTP2xx. Chỉ ghi loại chức năng, không ghi nội dung/yêu cầu/đối tác. Lượt API thành công không phải số giao dịch duy nhất vì yêu cầu idempotent thành công lặp vẫn là lượt gọi.
- Client gom mẻ1giây, tối đa100 sự kiện chờ, flush best effort khi ẩn/rời trang, bỏ qua lỗi; không chặn gameplay, không retry sang tài khoản khác, không lưu nội dung vào localStorage. Mạng mất/đóng đột ngột có thể mất sự kiện. Ghi login/API lỗi không làm hỏng thao tác game thành công. Không dùng nhật ký này để tính thưởng, thanh toán hoặc xác nhận kết quả.
- Nhật ký chỉ có từ lúc triển khai/migrate bản mới; không dựng lại thao tác cũ. “Hoạt động gần nhất” chỉ là thời gian sự kiện được ghi gần nhất, không phải heartbeat. Chưa thiết lập tự xóa nhật ký; theo dõi dung lượng khi vận hành.

### Cơ sở dữ liệu và triển khai

Migration mới `022_user_activity.sql` thêm `user_activity_events` và `user_activity_state`, có FK và các index thời gian/người dùng/loại chức năng. Không sửa001–021, không tự migrate khi start. Khi triển khai thủ công, theo quy trình backup hiện hành, chạy `npm.cmd run db:migrate` rồi `npm.cmd run db:verify` với cấu hình/quyền migrator đúng, sau đó nạp backend và frontend mới. Task này chỉ chuẩn bị source/build, không áp dụng migration vào DB thật, không SSH/restart/deploy.

Kiểm chứng local:18/18 test service/collector/React/admin/migration; MySQL8.0.45 tạm cổng33319:56bước migrate, rerun0, schema/smoke PASS,42/42 integration PASS (gồm quyền đọc admin, auth người ghi, chống trùng,2socket/1người, online→offline, phân loại Google, thời gian và phân trang). TypeScript và npm run build (Vite +2postbuild WebP) PASS. Chưa browser QA/2thiết bị thực tế. Backup `.checkpoints/admin-analytics-20261110`.

### Local activation issue observed 2026-11-10

If022tables are absent, overview/account list remain available; activity counters display — with a not-enabled notice, not zero activity. Migration runner can report ER_TABLEACCESS_DENIED_ERROR if the configured migrator lacks REFERENCES. SHOW GRANTS on this local environment confirmed SELECT/INSERT/UPDATE/CREATE/INDEX/ALTER only. A MySQL administrator must run `GRANT REFERENCES ON cotuong.* TO 'cotuong_migrator'@'localhost';`, then normal db:migrate/db:verify can finish022. This task did not modify grants. A failed unapplied022running marker was removed only after checking no022tables exist and exact checksum/version/status match; applied history was not edited. Backup and prepared grant SQL: .checkpoints/admin-analytics-activation-20261110. Never bypass foreign keys or rewrite migration checksums to work around permissions.

- Activation follow-up 2026-11-10: administrator granted REFERENCES successfully. Local db:migrate completed exactly2pending022steps; db:verify and actual ActivityService report PASS, activityAvailable=true. Earlier missing-permission/pending status is resolved. No fake activity or account changes; refresh /admin.

### Phiên quản trị hết hiệu lực

Admin session giữ RAM2h; backend restart hoặc phiên hết hạn có thể trả401. Trang tự dọn dữ liệu quản trị, dừng polling thống kê và hiện form đăng nhập lại khi bất kỳ luồng analytics/catalog/thao tác quản trị nhận401. Đăng nhập lại dùng mật khẩu trang admin game (không phải MySQL root). Lỗi mạng không tự xóa trạng thái auth hợp lệ. Kiểm chứng2026-11-10:7/7 React regression,TypeScript PASS,health backend/proxy200; chưa browserQA.

## 2026-11-10 — Quyền ẩn cụm điều khiển AI

Admin có quyền riêng **Quyền Bỏ AI**, cấp/thu hồi theo người chơi bằng action `ai-controls`, có lý do/UUID/audit/idempotency như các quyền khác. Migration023 thêm users.ai_controls_control mặc định0, profile trả aiControlsControl boolean. Quyền này độc lập với quyền Bỏ logo; không tự cấp cho tài khoản nào.

Tài khoản được cấp quyền sẽ thấy **Bỏ AI** ngay sau Bỏ logo trong Cài đặt Home, icon SVG chữ AI gạch chéo đỏ. Bật tùy chọn sẽ ẩn toàn bộ khung chọn bên máy (hai nút, công tắc và hai hình quân), đưa cụm Nước trước/số nước/Nước sau lên thay vị trí đó trong bàn đánh thử từ Vị trí tùy chỉnh/Đấu ngay. Desktop và mobile dùng chung ReplayControls; mobile bỏ cụm tua cũ phía dưới để chỉ có một bộ điều khiển. Máy giữ trạng thái và logic hoạt động hiện tại; thay đổi chỉ là presentation. Xem lại/đánh thử từ Lịch sử, online và các bố cục khác giữ hành vi hiện tại qua scope customPositionTrial.

Lựa chọn lưu theo publicId trên trình duyệt, mặc định hiện AI. Chỉ profile được backend cấp quyền mới áp dụng lựa chọn; thu hồi quyền/tài khoản khác khôi phục UI mặc định. Người chơi tải lại hồ sơ/trang để nhận quyền admin mới. Không nhận quyền từ localStorage hoặc body API tài khoản; localStorage chỉ lưu lựa chọn hiển thị. Ghi nhận toggle bằng mã activity cố định ai_controls.

Task đã sao lưu SQL local trước migration, apply đúng1bước023 và db:verify PASS; không cấp quyền cho user thật, không thay VPS. Migration023 phải áp dụng trước profile source mới khi triển khai, không sửa001–022. Backup/code tại .checkpoints/ai-setting-20261110. Chưa browserQA. Chi tiết kiểm chứng cuối ghi trong AI_CHANGELOG.md.

- 2026-11-11: Admin UI: danh sách người chơi tối đa30/trang, online trước rồi ID giảm dần ngay tại repository trước LIMIT/OFFSET; nhật ký vẫn50/trang. Xem chi tiết mở tài khoản trong khối quản lý, cuộn tới thông tin/tài nguyên/Elo/quyền; giữ Xem hoạt động riêng. Giao diện admin chia khối, trạng thái online có màu. Không thay UI game/avatar/auth/DB schema. Kiểm chứng:15 test liên quan PASS (13 ban đầu và2 regression mới), TypeScript PASS; chưa browser QA. Backup .checkpoints/admin-ui-20261111.

- Kiểm chứng cuối admin UI2026-11-11: chạy lại5suite15/15PASS, tscPASS, Vite bundlePASS. Full npm build KHÔNG PASS: bước hovang-webp-finalpass lỗi ENOENT dist/assets/phong-tang-2-C0-SjYor.webp (PNG tồn tại, WebP thiếu). Không xác nhận dist sẵn sàng phát hành; giữ thay đổi source đã qua regression, chưa browserQA/deploy.

## 2026-11-12 — Giao diện quản trị và xóa bộ lọc

Theo yêu cầu người dùng, thiết kế lại riêng /admin theo nền xanh đậm, điểm nhấn vàng, thẻ thống kê, thanh điều hướng nội trang, nhóm bộ lọc, tab và bảng dữ liệu. Form quản lý tài khoản dùng cùng kiểu điều khiển; bỏ cột kết quả trống khi chưa tìm kiếm, đánh dấu người chơi đang chọn. CSS được giới hạn dưới .admin-shell, không đổi giao diện game, avatar hoặc backend/auth/quyền/dữ liệu.

Hai ô tìm ID/tên dùng AdminSearchInput chung có nút ×. Ở thống kê, × xóa cả nội dung và bộ lọc đã áp dụng, reset phân trang và chuyển về Danh sách người chơi ngay, giữ các bộ lọc khác. Ở quản lý tài khoản, × xóa từ khóa và tải danh sách không lọc. Không cần bấm Lọc/Tìm lại. Giữ nguyên polling 15 giây, phiên hết hạn và API hiện có.

Kiểm chứng bằng test React/HTTP và Chrome với API giả riêng; không chỉnh tài nguyên hoặc tạo tài khoản thật. Backup/ảnh/log: .checkpoints/admin-room-ui-20261112 ở gốc repo. Chỉ local, chưa triển khai VPS.
