# CI/CD cho VPS hiện tại

Trạng thái: chuẩn bị Local, **chưa kích hoạt GitHub/VPS, chưa deploy thật**. Không đổi UI, cơ chế đăng nhập, firewall, SSH, Nginx hay MySQL production.

## CI

`.github/workflows/ci.yml`: push/PR vào master, Ubuntu 24.04 + Node 22, `npm ci`, `npm run typecheck`, `npm test`, `npm run build`. Không `continue-on-error`, không lọc bỏ test lỗi. Chỉ chạy các bước tiếp sau nếu bước trước thành công.

MySQL integration dùng service container MySQL 8.0 trên runner, database `cotuong_ci`, tài khoản/quyền giới hạn trong DB này; mật khẩu trong YAML là dữ liệu thử công khai dùng một lần, không phải credential production. Chạy migrate hai lần, verify, smoke và bốn file integration thật, tuần tự một worker. Không dùng `.env` hay secrets VPS. Script `db:integration` hiện dành cho MySQL binary Windows nên CI gọi các script DB/test bên trong bằng service Linux, không giả vờ script Windows chạy được ở Ubuntu.

Đã sửa các lỗi full suite Local theo [CI-TEST-AUDIT.md](CI-TEST-AUDIT.md):378 unit/UI đạt và17 integration MySQL tạm đạt riêng. Workflow vẫn báo Failure cho mọi lỗi test/build mới; không coi build thành công là đủ điều kiện deploy. CI không được chạy trên self-hosted runner gắn production. Chưa push nên chưa xác nhận run GitHub Node22/Ubuntu thực tế.

## Cổng triển khai

`.github/workflows/deploy.yml` chỉ `workflow_dispatch`, chỉ chạy từ master. Người quản trị điền **SHA đầy đủ 40 ký tự**. Workflow kiểm tra commit nằm trong lịch sử master và có run **push CI của chính SHA đó kết luận success** qua GitHub API. Không dùng CI của commit khác hoặc run PR. Checkout workflow/script tin cậy trên master, payload là `git archive` của đúng SHA; không chứa file Local chưa commit, node_modules, `.env` hay dist Local. Script deploy lấy từ checkout workflow đang được review, không lấy script cũ từ SHA payload.

Job dùng Environment `production`; cấu hình required reviewers trong Settings → Environments trước khi cấp SSH secrets, ngăn tự phê duyệt và bypass nếu gói GitHub hỗ trợ. Giới hạn deployment branch master. YAML không tự tạo quy tắc bảo vệ Environment. Nếu gói repository không hỗ trợ reviewers, workflow vẫn yêu cầu bấm Run workflow nhưng không có phê duyệt độc lập; chưa đạt yêu cầu hai người cho đến khi nâng gói/quy trình. Đặt branch protection master với required check `CI / checks`, review thay đổi workflow/scripts, hạn chế người có quyền Actions và Environment.

Concurrency GitHub không hủy deploy đang chạy; `flock` trên VPS ngăn cả deploy thủ công khác dùng script này. SSH disconnect không được xem là thành công; kiểm tra log/lock/server trước retry, không xóa lock để ép chạy. Không có cơ chế GitHub nào thay thế backup hoặc bảo đảm tránh SIGKILL/mất điện.

## Việc quản trị viên phải làm một lần trên VPS (chưa thực hiện)

1. Xác minh service `cotuong.service` dùng working directory `/home/nhat_hoang/co-tuong/board-game`, Node 22 và code tại đường dẫn đó, backend cổng loopback3001. Kiểm tra `systemctl cat cotuong.service` **tại VPS**, không paste nội dung chứa secrets lên GitHub. Nếu unit khác, chỉnh script theo unit đã xác nhận trước khi bật CD; script không sửa unit. Node/npm phải có trong PATH của SSH không tương tác; dùng bản cài hiện có, không tự cài thêm bằng deploy.
2. Tài khoản SSH phải đọc `.env` hiện tại và ghi được thư mục app, `/var/www/cotuong`, `/home/nhat_hoang/.cotuong-incoming` và `.cotuong-deploy`. Kiểm tra ownership/ACL hiện có; không cấp sudo tùy ý hoặc `chmod 777`. Nếu Nginx đang phục vụ đường dẫn khác/symlink, phải đối chiếu và sửa script, không chạy thử trên đường dẫn chưa xác minh. Xác minh không có DB/media nằm trong WEB trước `rsync --delete`.
3. Cho phép sudo không hỏi mật khẩu **chỉ lệnh cụ thể**: `systemctl stop/start cotuong.service`, `systemctl is-active --quiet cotuong.service` và hai lệnh backup bên dưới. Dùng đường dẫn binary tuyệt đối do `command -v` trên VPS trả về trong sudoers; quản trị viên dùng `visudo` và kiểm tra `sudo -l`. Không cấp `sudo bash`, `sudo rsync`, `sudo npm`, wildcard service, ALL hoặc quyền MySQL admin cho CI. Quyền SSH này vẫn có khả năng sửa ứng dụng/đọc `.env`, phải coi là credential production, dùng key riêng có thể thu hồi.
4. Cài adapter đã cung cấp theo [BACKUP-ADAPTER.md](BACKUP-ADAPTER.md), dùng đúng backup hiện có `/usr/local/sbin/cotuong-backup.sh`, `cotuong-backup.service` → OnSuccess `cotuong-cloud-backup.service`, file `/var/backups/cotuong/cotuong-YYYY-MM-DD_HH-MM-SS.sql.gz`. Hai action `verify-existing`/`create-and-verify` bắt buộc; script/unit hiện có không bị sửa. Adapter kiểm gzip/marker/checksum/file mới và chờ lần chạy cloud mới kết thúc; không kiểm restore hoặc tự chứng minh remote checksum. Reviewer phải kiểm bằng chứng offsite và restore định kỳ cô lập trước khi duyệt Environment. Cài thủ công root-owned adapter/state, audit quyền script/unit/phụ thuộc và sudoers chính xác theo hướng dẫn; không cấp quyền root rộng. Thiếu điều kiện/timeout/lỗi sẽ chặn CD trước khi thay app. Chưa cài trên VPS.
5. Xác nhận `.env` VPS đủ DB, GOOGLE_CLIENT_ID/VITE_GOOGLE_CLIENT_ID, ADMIN_PASSWORD_HASH, NODE_ENV và cấu hình hiện hành; không upload lên GitHub. Vite chỉ bundle biến VITE_: chỉ đưa dữ liệu công khai vào prefix này. Script copy `.env` vào release riêng quyền600 để build đúng OAuth, thư mục release umask077; không log nội dung. Không commit `.env`, `.admin-access.txt`, SSH key, database dump. Không cần Client Secret Google để CI build.
6. Kiểm chứng kết nối DB runtime có SELECT để `db:verify`. Không chạy `db:smoke` trên production. Đảm bảo app đang chạy phiên bản có journal và verify hợp lệ; nếu bản cũ chưa có CLI verify tương thích, cần bootstrap thủ công được review, không bỏ qua gate.
7. Xác nhận `rsync`, `curl`, `tar`, `flock`, `node`, `npm` đã có trên VPS, dung lượng đủ cho code+node_modules+frontend cả bản mới và snapshot cũ. Script giữ `engines/`, `uploads/`, `media/`, `storage/`, `.env*`, `.admin-access*` ở app cũ; engine binary/NNUE hiện có phải tương thích phiên bản mới, cần review thủ công. Bản snapshot không bao gồm secrets/uploads/engine, không phải bản backup toàn VPS.

## GitHub Environment secrets

Tạo trong Environment `production`, không repository-wide nếu không cần:

| Secret | Nội dung |
|---|---|
| VPS_HOST | Host/IP VPS hiện có |
| VPS_USER | User deploy đã được review quyền (đường dẫn hiện tại nhat_hoang) |
| VPS_PORT | Cổng SSH đang có, để trống dùng22; không mở cổng mới |
| VPS_SSH_KEY | Private key deploy riêng; không chia sẻ qua chat/log |
| VPS_KNOWN_HOSTS | Dòng known_hosts đã xác minh fingerprint qua kênh tin cậy; cổng khác22 dùng `[host]:port` |

Không lấy `ssh-keyscan` không kiểm chứng rồi coi là tin cậy; workflow bật StrictHostKeyChecking, không tự chấp nhận host key. GitHub token chỉ contents:read/actions:read; không PAT/write token. Các action dùng version major chính thức; quản trị viên có thể pin SHA đã xác minh và bật Dependabot để quản lý cập nhật.

## Migration: chủ động chặn, không tự cấp quyền

Runner hiện có MySQL DDL implicit commit, journal từng statement `running/applied` và checksum; migration dang dở không thể rollback transaction. Vì chưa kiểm tra danh tính/quyền MySQL và công cụ backup trên VPS, CD giai đoạn này **không tự chạy migration, GRANT/REVOKE hoặc restore MySQL**. Nó chạy `db:verify` trên cả code mới và code cũ **trước khi dừng service**. Pending migration, schema/journal/checksum mismatch hoặc mất DB sẽ dừng an toàn. Gate này bảo thủ: kể cả migration chỉ thêm dữ liệu cũng cần quản trị xử lý riêng.

Nếu release cần migration: không bấm deploy lặp để vượt gate. Quản trị viên review SQL và khả năng tương thích cả bản cũ/mới, tạo backup mới, bố trí maintenance và dừng ghi bằng service hiện có. Chạy migration qua tài khoản migration tạm riêng có quyền đúng schema/DDL cần thiết; không nâng quyền lâu dài của runtime, không dùng tài khoản root trong app. Quy trình quản trị phải bọc việc tạo user/quyền → migrate/verify trong `try/finally` hoặc trap EXIT/ERR/INT/TERM, **thu hồi quyền/drop user kể cả migrate thất bại**, kiểm chứng lại grants sau đó; nếu cleanup thất bại phải cảnh báo và xử lý ngay. Không đưa password vào tham số/log/GitHub, dùng cấu hình root-only hiện có. SIGKILL/mất điện không chạy trap, phải có kiểm tra/revoke độc lập sau sự cố. Không cung cấp SQL GRANT mặc định khi chưa biết schema/host/account thực tế.

Nếu DDL đã chạy một phần: giữ dừng deploy, đối chiếu journal/backup và sửa thủ công; không sửa journal giả thành công, không tự restore DB. Nếu sau migration bản cũ không còn verify được, pipeline cũng chặn: cần kế hoạch nâng cấp có maintenance/rollback đã review riêng. Đây là giới hạn có chủ đích, không tuyên bố tự động hóa migration production đã hoàn thành.

## Luồng deploy và rollback

Sau kiểm tra backup hiện có: giải nén vào `.cotuong-deploy/<timestamp>-<sha>/code`, `npm ci` đầy đủ (backend đang cần tsx thuộc devDependencies), build trước khi chạm app đang chạy, verify schema mới/cũ. Không dùng `npm ci --omit=dev`. Lưu code+node_modules và WEB cũ; tạo backup mới và chờ local/cloud kết thúc thành công; dừng service, rsync bản mới và dist, start service. Thư mục app và WEB phải có quyền ghi trước, script không tự sửa owner/ACL/Nginx.

Kiểm tra systemd active, JSON `/api/health` loopback và HTTPS public, homepage200 và nội dung index public trùng dist mới, `db:verify` bằng code mới. Nếu Nginx/CDN cache index cũ sẽ báo lỗi và rollback: cấu hình cache phải được quản trị kiểm tra trước, không bỏ kiểm tra cho xanh. Health endpoint hiện chỉ liveness; DB verify bổ sung kiểm tra DB/schema nhưng chưa thay thế QA Socket.IO/game/OAuth/engine. Restart làm mất phòng/socket/queue/session admin RAM, người chơi có thể bị ngắt/xử thua theo luật hiện tại: chỉ deploy trong maintenance đã thông báo, chưa có drain/resume tự động.

Lỗi sau khi bắt đầu thay code: chỉ rollback code/frontend vì pipeline không thực hiện DDL và cả hai phiên bản đã verify cùng schema; runtime có thể vẫn ghi DML bình thường, nên người review phải xác nhận semantics dữ liệu tương thích ngược. Không deploy commit có data conversion ngoài migration hoặc side effect boot không tương thích. Khi restore cây code/frontend lỗi, giữ service dừng; không start cây code nửa chừng. Rollback vẫn exit failure để GitHub đỏ. SIGKILL/mất điện hoặc mất SSH có thể cần xử lý thủ công, không cam kết rollback luôn chạy. Không tự phục hồi MySQL.

Log riêng tại `.cotuong-deploy/<timestamp>-<sha>/deploy.log`, GitHub chỉ trạng thái/lỗi lệnh không in env. Không upload release/log chứa cấu hình lên artifact công khai. Giữ snapshot/backup theo chính sách dung lượng; script không tự xóa release cũ, thao tác dọn cần review. Chưa có deploy thật nên rollback/cổng health/quyền VPS **chưa được nghiệm thu**.

Input `rollback_compatible` mặc định false: nếu lỗi sau kích hoạt thì yêu cầu dừng service và để quản trị xử lý. Chỉ bật khi reviewer đã xác nhận ghi dữ liệu của release tương thích ngược với backend trước; schema verify tự nó không chứng minh được điều này. Khi bật vẫn bắt buộc cả hai bản verify cùng schema trước deploy. Script cũng kiểm tra baseline systemd/API/public trước chuẩn bị; hệ thống đang lỗi cần xử lý riêng, không dùng deploy làm bước sửa mù.

## Kiểm chứng Local 2026-10-20

- Full `npm test`: 314 đạt,59 lỗi,17 bỏ qua;12 file lỗi. Không sửa/bỏ qua các test ngoài phạm vi CI/CD. Chi tiết lần chạy tại `ci-local-test.log` Local (ignored, không commit).
- `npm run db:integration`: migrate30 bước, chạy lại0, verify/smoke và17 test trong4 file đều đạt trên MySQL8.0.45 tạm/cổng33319; script dọn DB tạm sau chạy. Lần đầu bị sandbox chặn `tsx/os.userInfo`; chạy lại ngoài sandbox theo cơ chế duyệt và đạt. Không đọc `.env` hoặc DB Local người dùng/VPS.
- `npm run build` bao gồm typecheck: đạt, dist index-cbOcM9Cr.js cập nhật. Local đang Node24.21.0; Node22/Ubuntu và GitHub service container sẽ được kiểm chứng thực tế khi CI chạy, chưa giả định đã pass.
- `bash -n scripts/deploy-vps.sh`: đạt bằng Git Bash. `.env` và `.admin-access.txt` đã kiểm tra gitignored. Chưa có actionlint/YAML validator hoặc mô phỏng đầy đủ rollback, chưa chạy npm ci Local (dùng node_modules hiện có). Chưa push, chưa SSH, chưa chạy workflow/deploy thật.

## Kích hoạt lần đầu

Review diff → sửa lỗi full suite → commit/push thủ công master (chưa thực hiện) → đợi CI thành công → hoàn thành checklist VPS/backup/Environment/SSH phía trên → Actions → Deploy production (manual) → Run workflow trên master, điền SHA CI xanh → reviewer phê duyệt → theo dõi log/health → QA game, Socket.IO, đăng nhập Google/admin trên website. Nếu CI đỏ thì không deploy; không override bằng cách sửa gate.

Nguồn GitHub chính thức: https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments và https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments .

## Backup adapter 2026-10-21

Đã bổ sung adapter/hướng dẫn/sudoers và25 regression fixture/mock PASS, Bash syntax PASS, build gồm typecheck PASS; dist index-BqK419Up.js. Chưa chạy systemd/Drive/restore/VPS hoặc workflow GitHub. Các số lỗi full suite mục kiểm chứng2026-10-20 là lịch sử; kết quả sửa full suite sau đó xem CI-TEST-AUDIT.md, không tái chạy full npm test trong task adapter.
