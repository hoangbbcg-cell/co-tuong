# MySQL integration — 2026-10-16

- 2026-10-24: Sửa Gợi ý bạn trống do socialStore.search query rỗng luôn xóa users. Thêm GET /social/suggestions qua session auth→PersistenceService→SocialRepository: random tối đa20 active users, loại bản thân/accepted friends/block hai chiều. Query rỗng lấy gợi ý, query có chữ giữ search tên/ID; version bỏ phản hồi cũ. Mobile và desktop dùng chung dữ liệu, không đổi geometry laptop. Build/typecheck PASS; persistence-rules2/2 PASS; dist cập nhật. Chưa xác minh SQL trên DB/browser thật; backend cần nạp code mới, không restart/deploy trong task.

- 2026-10-23: Theo user, đấu bạn bè không cộng/trừ Elo. MatchRepository.complete dùng policy đã chốt gold_reward_eligible cùng kiểm tra accepted lúc kết thúc để delta0 cho cả2 người (gồm Mời chơi/So tài, gỡ bạn giữa ván không bật lại). Giữ stats/năng lượng/lịch sử và chính sách vàng; đối thủ thường Elo như cũ. Không migration vì tái dùng policy persisted. Existing match-gold-policy5/5 PASS; typecheck/build PASS; dist cập nhật (backend-only bundle không đổi). Môi trường từ chối ghi tests nên chưa thêm regression Elo; chưa QA DB thật, backend cần nạp code mới.

Cập nhật Google Sign-In thật đã triển khai/migration004: xem [GOOGLE-SIGN-IN.md](GOOGLE-SIGN-IN.md). Những ghi chú Google chưa triển khai phía dưới là trạng thái lịch sử trước thay đổi này.

## Trạng thái

Đã nối dữ liệu mới của tài khoản thật theo Frontend → API/Socket → Service/Repository → MySQL 8.0.45. `cotuong` dùng `.env` hiện có, runtime `cotuong_app`; không root, không in secret. `001_foundation.sql` giữ nguyên; database thật đã áp dụng 002/003 và chạy lại không áp dụng thêm. Không cài package mới trong lượt tích hợp; tiếp tục mysql2/promise.

## Migration

- 006_match_gold_reward.sql thêm matches.gold_reward_eligible: chốt quyền vàng khi bắt đầu ván. Bạn bè accepted hoặc cặp qua lời mời bị loại; khi kết thúc kiểm tra thêm bạn bè mới. Không cập nhật gold/ledger nếu bị loại, giữ Elo/stat/energy. Cột được kiểm tra bằng db:verify; không tự migrate khi start.

- `002_accounts_and_resources.sql` (5 bước): thêm country/province/ward names và mã, location_set_at, hash credential Guest/device/session, unique index credential và index địa giới; bỏ CHECK energy<=5, mở energy thành INT UNSIGNED; thêm FK người chơi cho saved_positions; thêm số ngày hoạt động và ngày hoạt động cuối.
- `003_honor_catalog.sql` (1 bước): seed 39 danh hiệu từ HONOR-SYSTEM.md theo code chuẩn, không ghi đè catalog đã có. Frontend map code chuẩn ↔ ID artwork hiện hành bằng honorIdentity.ts.
- address_label cũ được giữ để không mất dữ liệu, không còn là nguồn hiển thị/ghi địa chỉ nhà. Public ID cũ giữ nguyên; user mới nhận public_id ngẫu nhiên 8 chữ số unique, không thay ID đã cấp.
- db:verify đối chiếu cả schema mới, CHECK năng lượng cũ đã bỏ và catalog. Journal/checksum/advisory lock vẫn giữ; DDL lỗi vẫn cần kiểm tra thủ công, không tự DROP/reset/repair.

## Dữ liệu đã tích hợp

| Hệ thống | Nguồn sự thật và hành vi |
|---|---|
| Guest | Tạo users + stats xiangqi/jieqi Elo1000 + tài nguyên trong một transaction. Tên Kỳ Thủ XXXXXX, guest_code6 và public_id8 unique, retry collision. ID qua JSON là string. Vàng ban đầu0 vì chưa có khoản cấp ban đầu được duyệt. |
| Xác thực Guest | Cookie HttpOnly/SameSite=Strict; production HTTPS dùng Secure. Chỉ lưu SHA-256 của token ngẫu nhiên 256 bit trong MySQL. Cookie device chỉ gửi tới endpoint Guest để tiếp tục cùng user sau đăng xuất; cookie session dùng API/socket. Logout thu hồi session; socket kiểm tra lại credential. localStorage marker không cấp quyền. Mỗi user hiện có một session đang hoạt động; Google/OAuth chưa có. |
| Profile | API tải tên, public ID, avatar/frame code, thống kê, số bạn/follow/like và địa giới. Đổi tên atomic chỉ khi linked_at có thật và chưa đổi lần nào. Không có endpoint để client tự khai linked. Địa giới lưu một lần, backend khóa sửa; VN xác minh mã tỉnh/phường bằng cùng dịch vụ địa giới đang dùng, các nước khác hiện chỉ chọn quốc gia. |
| Elo | Hai variant riêng. PvP chính thức bắt đầu mới được tính; AI/Pikafish không ghi trận/Elo. Bậc/sao derive getRankProgress, trần hiển thị Kỳ Thánh3 sao3000, Elo thật không clamp. Hòa0. Trong ±3 sao giữ bảng đã chốt; thắng ngoài3 sao +20, thua người cao hơn -10/thấp hơn -13 theo quy tắc hướng đối thủ. |
| Vàng/năng lượng | Winner nhận random125–150 vàng trong transaction kết quả, không trừ vàng người thua, không cược/chuyển vàng. Ledger reason/match/idempotency. Energy có thể >5, hồi1/7 phút chỉ khi dưới5; bắt đầu PvP trừ1 cho mỗi người chơi. Thưởng trên5 được giữ nguyên và không hồi. Ngoại lệ máy cơ bản đang xem thử vẫn trừ qua API riêng/ledger; không tạo match/Elo cho AI. Ngoại lệ user theo yêu cầu: public ID 29622295 và 96161606 được năng lượng vô hạn, backend bỏ qua kiểm tra/trừ cho cả online và máy thử; UI hiển thị ∞. Số dư DB không bị thay đổi bởi quyền này. |
| Trận/lịch sử | Server lưu match khi bắt đầu, chụp kết quả tại captureCompletedMatch kể cả xin thua/leave/timeout/draw/không nước đi. Transaction kết thúc lưu moves/snapshots, Elo before/delta/after, stats và vàng; retry không trả thưởng lần hai. Lịch sử tải tên hiện tại từ users; snapshot chỉ fallback/audit. Replay không nhân đôi trạng thái cuối. Đã chơi hiện một tháng lịch; bản ghi DB không tự xóa, bookmark vẫn mở được. |
| Saved | saved_matches reference tới match đã tồn tại; saved_positions snapshot riêng, API kiểm tra owner và bàn10×9. Lưu/sửa/xóa đợi backend rồi mới báo thành công. Tên trong thế có user FK được resolve hiện tại; nguồn local không xác định được user vẫn giữ snapshot. Không sửa replay/trial/gameStore thật. |
| Bạn bè/follow/block | User FK, friendship hai chiều pending/accepted; follow một chiều. Block chỉ chặn chiều người bị chặn gửi direct message tới người chặn, không sửa quan hệ/room/matchmaking. Danh sách/tìm kiếm/Xếp hạng lấy DB; trạng thái online vẫn lấy kết nối RAM. |
| Chat | Direct pair unique, group + membership, message có sender FK và client_message_id chống gửi trùng. Giới hạn300 ký tự tại backend. Tên sender join users hiện tại. Biệt danh riêng theo member, clear boundary riêng mỗi người; gửi/clear được serialize theo conversation. Backend có thêm/rời nhóm, tên nhóm chỉ owner, mute và read cursor; UI chat hiện hành tải/gửi/nhóm/biệt danh/clear/block/mute qua API. Polling4 giây khi mở, không socket hóa DM ở lượt này. |
| Danh hiệu/like | Catalog39 code chuẩn; ownership chỉ backend, chọn tối đa3/nhóm và phải sở hữu; phong/bỏ phong có count thật và ngưỡng từ docs; cấp Chuỗi/Tổng ván khi chốt trận, Chuyên cần theo ngày có thao tác/login, không đếm treo online. Like online lưu match_likes ngay khi đang đấu qua activeMatchId hoặc khi kết thúc; mỗi tài khoản một lượt mỗi ván. Artwork vẫn frontend. |

## API

Prefix `/api/account`. Chỉ `POST /guest` không cần session; các endpoint khác lấy actor từ cookie, không nhận actor user_id tự khai.

- `GET /me`, `POST /logout`, `PATCH /name`, `/location`, `/avatar`, `POST /demo-energy`.
- `GET /search?q=...`, `/profiles/:id`, `/ranking?variant=xiangqi|jieqi&country=...&province=...&ward=...`.
- `GET/POST /social` (request/accept/remove/follow/message-block).
- `GET/POST /conversations`, `GET/POST /conversations/:id/messages`, `PATCH /conversations/:id` (clear/nickname/leave/add), `GET .../members`, `POST .../read`, `PATCH .../title`, `PATCH .../mute`.
- `GET /history`, `/saved-matches`, `PUT /saved-matches/:id`.
- `GET/PUT /positions`, `DELETE /positions/:id`.
- `GET /honors/catalog`, `/honors`, `/honors/:id`; `PUT /honors`, `/honors/endorse`, `/match-likes/:id`.

Không có API cấp vàng/Elo/linked flag/kết quả từ client. Room/game command vẫn được engine server kiểm tra; danh tính socket lấy cookie. HTTP tạo phòng kiểm tra session/năng lượng. Khi DB_NAME được cấu hình, backend bật persistence/auth; không cấu hình DB chỉ giữ chế độ RAM cho các test/service cũ, frontend Guest mới vẫn yêu cầu API tài khoản.

## RAM/localStorage còn lại

- RAM: room đang chạy, connection/presence, queue/readiness, challenge, clock, engine process, animation/dialog/replay trial. Đây là dữ liệu runtime được yêu cầu giữ RAM.
- Zustand chỉ là cache/render state của dữ liệu DB mới. Legacy localStorage về lịch sử/saved/profile/honor không bị xóa và không tự import sang user mới: dữ liệu cũ dựa trên tên/fixture, không có chứng minh user_id. Những fallback legacy giữ cho test/offline cũ; tài khoản DB mới không ghi các kho đó.
- Marker entry localStorage là tiện ích tương thích, không xác thực. Credential là cookie HttpOnly; xóa dữ liệu trình duyệt mất quyền Guest. Tùy chọn UI/âm thanh/ảnh nền và trạng thái mở panel vẫn local.

## File và trách nhiệm

- Backend: accountController, accountService, persistenceService, administrativeLocation, rating, roomPersistence; Account/Social/Content/Match repositories; app lắp auth/API/shutdown; room/challenge controllers nối identity và persistence. SQL chỉ ở Repository.
- Frontend: accountApi/accountSession, account type, socialStore; EntryGate/entryStore/LoginPage; session resource cache; hooks database profile/ranking/messages/honors/profile persistence và match saving/likes; các màn hiện hành nhận dữ liệu mới, giữ geometry/avatar/artwork.
- Migrations/verify/smoke và tests được cập nhật; thêm script `scripts/mysql-integration-qa.mjs` chỉ dùng MySQL tạm cổng33319, không đọc .env và xóa datadir thử sau chạy. Root chỉ bootstrap instance tạm; ứng dụng kiểm thử vẫn dùng cotuong_app.

## Chạy

Từ board-game, dùng `.env` đã có, không gửi mật khẩu:

```powershell
npm.cmd run db:check
npm.cmd run db:migrate
npm.cmd run db:migrate
npm.cmd run db:verify
npm.cmd run db:smoke
npm.cmd run typecheck
npm.cmd test -- --maxWorkers=4
npm.cmd run db:integration
npm.cmd run build
npm.cmd start
```

Game production local: http://127.0.0.1:3001. Dev dùng npm.cmd run dev và cổng5173 proxy3001. Cần khởi động lại backend đang chạy bằng bản cũ. db:integration yêu cầu MySQL8.0 binary local; mặc định Windows MySQL Server8.0, có thể đặt MYSQL_QA_BINARY. Không chạy integration test trực tiếp với DB_INTEGRATION=1 trên DB người dùng.

## Giới hạn/TODO

- Google OAuth/link identity provider/khôi phục thiết bị khác chưa triển khai; không fake linked/auth. Service rename và quan hệ giữ users.id sẵn sàng cho luồng xác minh thật. Chưa có provider identity table.
- UI thêm/rời thành viên nhóm chưa có điều khiển tương ứng trong mẫu hiện hành; backend đã có API. Upload ảnh nhóm/ảnh tùy chỉnh cần object storage/upload service, chưa lưu blob/base64 vào DB. Avatar/frame hiện chỉ các code sẵn có, chưa shop/quyền sở hữu mua hàng.
- Pagination sâu (hiện giới hạn100 mục), push DM, resume phòng sau restart, hàng đợi persistence bền vững khi DB mất kết nối/server crash, quản trị/purge/backup vận hành và Google session đa thiết bị là công việc tiếp theo. Pending write hiện giữ RAM, retry và chặn command khi lỗi; không tuyên bố chống mất dữ liệu khi process crash.
- Matchmaking ±3 sao vẫn là thiết kế riêng đã ghi trong MATCHMAKING.md, không thay gameplay ghép nhanh/fallback trong task persistence này. Cờ Úp online chưa tồn tại; schema/stat/repository hỗ trợ variant, không tự mở gameplay online mới.
- Không tự cấp danh hiệu giải đấu; điều kiện/tổ chức giải thật chưa có. Thanh toán, video và gói năng lượng theo backlog chưa triển khai.
- Chưa browser QA thực tế cho tất cả màn; API/socket/MySQL được kiểm thử tích hợp riêng. Giữ nguyên 52 lỗi baseline ngoài DB, không sửa UI/audio/engine tests để làm xanh giả.

## Kết quả kiểm chứng
- cotuong thật/MySQL8.0.45: db:check PASS;002/003 apply6 bước mới, rerun0; db:verify/schema mới/FK/index/catalog PASS; db:smoke19 bảng rollback PASS. Không tạo dữ liệu test người dùng trong DB thật.
- MySQL tạm cô lập: migrate27/rerun0/verify/smoke PASS;6/6 integration API/socket PASS (Guest/auth/lock profile, message block và clear boundary, saved/honors, xin thua0 nước, hòa có replay đúng1 nước và energy8→7, disconnect sau start/không history trước start).
- Typecheck PASS;34/34 test liên quan DB/backend/entry/saved/logout/ranking PASS. Build PASS, dist được cập nhật; không thấy mysql2/DB_PASSWORD/guest_session_hash trong frontend bundle.
- Full suite baseline được đối chiếu bằng --maxWorkers=4; kết quả cuối ghi tại PROGRESS.md. Một lần chạy song song mặc định có thêm timeout5s ở UI test, chạy riêng test đó trở về20 lỗi UI baseline; không sửa timeout/test audio để làm xanh.

Full suite cuối: **236 PASS / 52 FAIL / 6 SKIP**,8 file lỗi đúng baseline.6 SKIP là integration cần MySQL tạm đã chạy riêng PASS. So với baseline233/52: tăng3 test PASS, không tăng lỗi. Build cuối PASS, dist index-CdiyPx17.js.
