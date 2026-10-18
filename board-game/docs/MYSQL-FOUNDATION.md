# MySQL foundation

Trạng thái mới: xem [MYSQL-INTEGRATION.md](MYSQL-INTEGRATION.md). Nội dung dưới mô tả mốc foundation ban đầu; các phần users/auth/persistence/schema đã được bổ sung bằng002/003, không sửa001.

Target: MySQL Community 8.0.45; InnoDB, utf8mb4_0900_ai_ci, DATETIME(3) UTC, native JSON. Runtime dùng mysql2/promise và cotuong_app, không root/ORM. Không thay đổi phòng RAM, socket, gameplay, UI hoặc localStorage.

## Chạy

Từ `board-game/`, tự sao chép `.env.example` thành `.env` nếu chưa có và điền:

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cotuong
DB_USER=cotuong_app
DB_PASSWORD="tu-dien-mat-khau"
```

Không commit .env, không dùng VITE_ hoặc gửi mật khẩu trong chat. Biến môi trường đang có ưu tiên hơn .env. Không tự tạo database/user/quyền.

```powershell
npm.cmd run db:check
npm.cmd run db:migrate
npm.cmd run db:verify
npm.cmd run db:smoke
npm.cmd run build
npm.cmd start
```

`db:check` chỉ SELECT 1; `db:migrate` áp dụng schema rồi verify; chạy lại không đổi schema. `db:verify` đối chiếu checksum/history, 19 bảng InnoDB/collation, PK/FK/CHECK và index với migration. `db:smoke` tạo/đọc dữ liệu thử trong cả 19 bảng, kiểm tra unique/FK/CHECK, rồi rollback kể cả khi lỗi; không để bản ghi thử nhưng có thể tạo khoảng trống AUTO_INCREMENT. Nên chạy smoke trên môi trường dev hoặc khi không có traffic. Chưa cấu hình .env thì các CLI dừng rõ ràng; game RAM vẫn chạy được.

## Migration và phục hồi

`server/migrations/001_foundation.sql` có 19 CREATE TABLE + 2 ALTER FK con trỏ chat. `schema_migrations` là bảng kỹ thuật thứ 20, theo dõi từng statement, checksum SHA-256 và trạng thái running/applied. Runner lấy advisory lock trên connection riêng. Không sửa migration đã áp dụng: thêm file mới và đăng ký trong migrationFiles. Format hiện hỗ trợ CREATE TABLE/ALTER TABLE, không procedure/delimiter hoặc dấu chấm phẩy trong chuỗi SQL.

MySQL DDL implicit commit: không thể rollback toàn migration. Nếu lỗi/crash sau DDL, journal running được giữ lại và lần sau dừng; không tự DROP, tự áp dụng lại hoặc nhận vơ bảng có sẵn. Backup trước triển khai. Khi phục hồi, quản trị viên đối chiếu statement/checksum với information_schema và bản backup; chỉ đánh dấu applied khi xác nhận statement đã hoàn tất chính xác, hoặc khôi phục backup rồi chạy lại. Không tự sửa journal để bỏ qua lỗi. Database có bảng ứng dụng nhưng không có history sẽ bị từ chối.

## Schema và quan hệ

SQL migration là định nghĩa đầy đủ cột/kiểu/PK/FK/unique/check/index. Các FK mặc định RESTRICT; xóa tài khoản dùng trạng thái mềm, chưa có purge/cascade.

| Bảng | Vai trò và quan hệ chính |
|---|---|
| users | BIGINT UNSIGNED tự tăng; public_id riêng unique, guest_code CHAR(6) unique; tên, avatar/frame code, địa chỉ, trạng thái liên kết/đã đổi tên |
| user_game_stats | PK(user_id,variant), FK users; Elo mặc định1000, số ván/thắng/hòa/thua/streak; index xếp hạng theo variant/Elo |
| user_resources | user_id PK/FK; gold, energy<=5, recovery/version; gold khởi tạo phải được service quyết định |
| resource_events | UUID; FK user/match tùy chọn; delta tài nguyên và unique idempotency_key; index lịch sử user/time |
| matches | UUID; nguồn, snapshot đầu/cuối JSON, luật/thời gian/kết quả và phiên bản rating; recorder FK users tùy chọn; room_ref chỉ metadata |
| match_players | PK(match_id,side), unique(match_id,user_id); FK match/user; snapshot tên và Elo before/delta/after |
| match_moves | PK(match_id,ply); FK match và (match_id,side) người chơi; tọa độ/UCI/JSON snapshot |
| saved_matches | PK(user_id,match_id), hai FK; bookmark, không nhân bản match |
| saved_positions | UUID; owner FK, source match tùy chọn; snapshot JSON/version/tên/ghi chú; source_ply là metadata để giữ snapshot độc lập |
| friendships | PK cặp user thấp/cao, FK cả hai và requester; pending/accepted; index nhận lời mời |
| user_follows | PK(follower_id,followed_id), FK users, cấm tự follow; reverse index |
| user_blocks | PK(blocker_id,blocked_id), FK users, cấm tự chặn; reverse index |
| conversations | UUID; direct pair unique, group pair NULL; FK thành viên direct/creator; tiêu đề/metadata |
| conversation_members | PK(conversation_id,user_id); FK conv/user; role/mute/read/clear; con trỏ FK composite bảo đảm message cùng conversation |
| messages | BIGINT UNSIGNED tự tăng; FK conversation và membership sender; unique(sender,client_message_id) chống gửi trùng; index lịch sử theo conv/id |
| honors | code PK, nhóm/cấp/thứ tự/criteria JSON; chưa seed catalog, không lưu ảnh |
| user_honors | PK(user_id,honor_code), FK users/honors và match nguồn tùy chọn; sở hữu/chọn/thu hồi |
| honor_endorsements | PK(giver,recipient,honor), FK users/catalog, cấm tự phong tặng |
| match_likes | PK(match_id,actor_id), FK actor và (match_id,target_side) người chơi |

UUID dùng CHAR(36) ascii_bin. Mọi user FK là BIGINT UNSIGNED; boundary TypeScript dùng string và truy vấn CAST khi lấy ID, không chuyển sang Number. Tên/code không là FK. Public ID không phải credential.

## Code đã nối và giới hạn

CLI → migration/smoke repository → pool. UserService → UserRepository đã có tạo Guest thật (mã 6 số unique được DB bảo vệ, retry collision; tên `Kỳ Thủ XXXXXX`) và đổi tên atomic chỉ khi linked_at tồn tại, chưa đổi tên, user active. Không có HTTP/socket endpoint chưa xác thực. Service này chưa nối entry gate; khi liên kết tương lai cập nhật cùng users.id. Khởi tạo stats/resources chưa gắn createGuest; cần transaction khi tích hợp luồng đăng ký thật.

Elo/rank/sao frontend hiện hành giữ nguyên; rank/sao derive, không lưu bảng riêng. Chưa có OAuth/session/token hoặc cơ chế xác minh linked_at. Chưa chuyển profile/social/chat/history/positions/localStorage sang DB, chưa seed honors, chưa giao dịch cập nhật Elo/tài nguyên hoặc lưu trận tự động. Không tin Elo/kết quả/linked flag từ client. JSON cần validate bằng engine/service lúc tích hợp; DB chỉ bảo đảm JSON hợp lệ, không xác minh luật cờ. Messages cần service kiểm tra 300 ký tự, membership đang hoạt động và block; FK chỉ bảo đảm membership tồn tại. Ledger không tự cập nhật balance: service tương lai phải transaction và kiểm tra idempotency/version. Chưa có thanh toán/quảng cáo/gói năng lượng.

Khi backend HTTP bắt đầu dùng pool phải nối closeMysqlPool vào shutdown; hiện pool chỉ được CLI hoặc service gọi chủ động, không mở khi import. Runtime phòng/presence/hàng chờ/socket tiếp tục RAM. Không lưu PNG, binary engine hoặc NNUE vào DB.
