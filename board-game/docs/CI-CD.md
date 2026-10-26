# CI/CD cho VPS hiện tại

Trạng thái 2026-10-22: người dùng xác nhận CI master PASS, SSH key user `cotuong_deploy` và hai action Backup Adapter đã thử thành công. Bản chuyển tài khoản CD được chuẩn bị Local; chưa SSH/đổi quyền/restart/deploy production trong task này. Các thay đổi mới vẫn cần review/push/CI riêng. Xem hướng dẫn thủ công [DEPLOY-USER.md](DEPLOY-USER.md).

## CI

`.github/workflows/ci.yml`: push/PR vào master, Ubuntu 24.04 + Node 22, `npm ci`, `npm run typecheck`, `npm test`, MySQL integration riêng, `npm run build`. Không `continue-on-error`, không lọc bỏ test lỗi. Chỉ chạy các bước tiếp sau nếu bước trước thành công. Actions dùng `checkout@v7`/`setup-node@v7` để chuyển runtime nội bộ action sang Node24; project vẫn chạy Node22. Deploy workflow chỉ cập nhật checkout action. Runner là GitHub-hosted Ubuntu24.04.

MySQL integration dùng service container MySQL 8.0 trên runner, database `cotuong_ci`, tài khoản/quyền giới hạn trong DB này; mật khẩu trong YAML là dữ liệu thử công khai dùng một lần, không phải credential production. Chạy migrate hai lần, verify, smoke và bốn file integration thật, tuần tự một worker. Không dùng `.env` hay secrets VPS. Script `db:integration` hiện dành cho MySQL binary Windows nên CI gọi các script DB/test bên trong bằng service Linux, không giả vờ script Windows chạy được ở Ubuntu.

Local full suite sau sửa lỗi GitHub:381 PASS/17 SKIP, trong đó17 MySQL integration test chạy riêng17/17 PASS bằng MySQL tạm; 6 test Pikafish thật chỉ chạy trên Windows có binary, nên CI Ubuntu skip nhóm này có điều kiện. Workflow vẫn báo Failure cho mọi lỗi test/build mới; không coi build thành công là đủ điều kiện deploy. CI không được chạy trên self-hosted runner gắn production. Chưa push nên chưa xác nhận run GitHub sau sửa.

## Cổng triển khai

`.github/workflows/deploy.yml` chỉ `workflow_dispatch`, chỉ chạy từ master. Người quản trị điền **SHA đầy đủ 40 ký tự**. Workflow kiểm tra commit nằm trong lịch sử master và có run **push CI của chính SHA đó kết luận success** qua GitHub API. Không dùng CI của commit khác hoặc run PR. Checkout workflow/script tin cậy trên master, payload là `git archive` của đúng SHA; không chứa file Local chưa commit, node_modules, `.env` hay dist Local. Script deploy lấy từ checkout workflow đang được review, không lấy script cũ từ SHA payload.

Job dùng Environment `production`; cấu hình required reviewers trong Settings → Environments trước khi cấp SSH secrets, ngăn tự phê duyệt và bypass nếu gói GitHub hỗ trợ. Giới hạn deployment branch master. YAML không tự tạo quy tắc bảo vệ Environment. Nếu gói repository không hỗ trợ reviewers, workflow vẫn yêu cầu bấm Run workflow nhưng không có phê duyệt độc lập; chưa đạt yêu cầu hai người cho đến khi nâng gói/quy trình. Đặt branch protection master với required check `CI / checks`, review thay đổi workflow/scripts, hạn chế người có quyền Actions và Environment.

Concurrency GitHub không hủy deploy đang chạy; `flock` trên VPS ngăn cả deploy thủ công khác dùng script này. SSH disconnect không được xem là thành công; kiểm tra log/lock/server trước retry, không xóa lock để ép chạy. Không có cơ chế GitHub nào thay thế backup hoặc bảo đảm tránh SIGKILL/mất điện.

## Việc quản trị viên phải làm một lần trên VPS (chưa thực hiện)

1. Xác minh service `cotuong.service` dùng working directory `/home/nhat_hoang/co-tuong/board-game`, Node 22 và code tại đường dẫn đó, backend cổng loopback3001. Kiểm tra `systemctl cat cotuong.service` **tại VPS**, không paste nội dung chứa secrets lên GitHub. Nếu unit khác, chỉnh script theo unit đã xác nhận trước khi bật CD; script không sửa unit. Node/npm phải có trong PATH của SSH không tương tác; dùng bản cài hiện có, không tự cài thêm bằng deploy.
2. SSH chỉ dùng `cotuong_deploy`; app giữ đường dẫn cũ. Cấp ACL đi qua (`--x`) riêng cho deploy ở `/home/nhat_hoang` và `co-tuong`, không mở home750 thành755. Cấp ACL code/WEB và default ACL để runtime/Nginx đọc file mới; deploy đọc `.env`. Incoming/state chuyển sang `/home/cotuong_deploy/.cotuong-incoming` và `.cotuong-deploy`, deploy-owned0700. Thực hiện đúng [DEPLOY-USER.md](DEPLOY-USER.md), kiểm probe thực tế và `deploy-vps.sh --check` trước kích hoạt. Không chown toàn app, thêm deploy vào group quản trị hoặc cấp sudo rộng. Xác minh không có DB/media trong WEB trước rsync--delete.
3. Cho phép sudo không hỏi mật khẩu **chỉ lệnh cụ thể**: `systemctl stop/start cotuong.service`, `systemctl is-active --quiet cotuong.service` và hai lệnh backup bên dưới. Dùng đường dẫn binary tuyệt đối do `command -v` trên VPS trả về trong sudoers; quản trị viên dùng `visudo` và kiểm tra `sudo -l`. Không cấp `sudo bash`, `sudo rsync`, `sudo npm`, wildcard service, ALL hoặc quyền MySQL admin cho CI. Quyền SSH này vẫn có khả năng sửa ứng dụng/đọc `.env`, phải coi là credential production, dùng key riêng có thể thu hồi.
4. Adapter theo [BACKUP-ADAPTER.md](BACKUP-ADAPTER.md) đã được người dùng báo thử cả hai action thành công; không thay adapter/unit backup trong lần chuyển user này. Giữ đúng backup hiện có `/usr/local/sbin/cotuong-backup.sh`, `cotuong-backup.service` → OnSuccess `cotuong-cloud-backup.service`, file `/var/backups/cotuong/cotuong-YYYY-MM-DD_HH-MM-SS.sql.gz`. `verify-existing`/`create-and-verify` vẫn bắt buộc, sudoers exact commands nay dành cho `cotuong_deploy`. Reviewer tiếp tục kiểm bằng chứng offsite/restore cô lập; adapter không tự chứng minh hai việc này.
5. Xác nhận `.env` VPS đủ DB, GOOGLE_CLIENT_ID/VITE_GOOGLE_CLIENT_ID, ADMIN_PASSWORD_HASH, NODE_ENV và cấu hình hiện hành; không upload lên GitHub. Vite chỉ bundle biến VITE_: chỉ đưa dữ liệu công khai vào prefix này. Script copy `.env` vào release riêng quyền600 để build đúng OAuth, thư mục release umask077; không log nội dung. Không commit `.env`, `.admin-access.txt`, SSH key, database dump. Không cần Client Secret Google để CI build.
6. Kiểm chứng kết nối DB runtime có SELECT để `db:verify`. Không chạy `db:smoke` trên production. Đảm bảo app đang chạy phiên bản có journal và verify hợp lệ; nếu bản cũ chưa có CLI verify tương thích, cần bootstrap thủ công được review, không bỏ qua gate.
7. Xác nhận `rsync`, `curl`, `tar`, `flock`, `node`, `npm` đã có trên VPS, dung lượng đủ cho code+node_modules+frontend cả bản mới và snapshot cũ. Script giữ `engines/`, `uploads/`, `media/`, `storage/`, `.env*`, `.admin-access*` ở app cũ; engine binary/NNUE hiện có phải tương thích phiên bản mới, cần review thủ công. Bản snapshot không bao gồm secrets/uploads/engine, không phải bản backup toàn VPS.

## GitHub Environment secrets

Tạo trong Environment `production`, không repository-wide nếu không cần:

| Secret | Nội dung |
|---|---|
| VPS_HOST | Host/IP VPS hiện có |
| VPS_USER | Bắt buộc `cotuong_deploy`; workflow/script từ chối user quản trị |
| VPS_PORT | Cổng SSH đang có, để trống dùng22; không mở cổng mới |
| VPS_SSH_KEY | Private key deploy riêng; không chia sẻ qua chat/log |
| VPS_KNOWN_HOSTS | Dòng known_hosts đã xác minh fingerprint qua kênh tin cậy; cổng khác22 dùng `[host]:port` |

Không lấy `ssh-keyscan` không kiểm chứng rồi coi là tin cậy; workflow bật StrictHostKeyChecking, không tự chấp nhận host key. GitHub token chỉ contents:read/actions:read; không PAT/write token. Các action dùng version major chính thức; quản trị viên có thể pin SHA đã xác minh và bật Dependabot để quản lý cập nhật.

## Migration tự động sau backup

Workflow manual giữ nguyên cổng CI đúng SHA/master. Trên VPS, `deploy-vps.sh` kiểm tra schema hiện tại bằng `cotuong_app`, build release, lưu snapshot code/frontend, gọi backup adapter `create-and-verify` và chỉ khi dump mới cùng job cloud được xác minh mới chạy migration. Lệnh migration và post-migration `db:verify` dùng `cotuong_migrator`; backend sau deploy tiếp tục dùng `cotuong_app` chỉ có DML. Runner giữ thứ tự file, chỉ áp dụng bước journal còn thiếu, kiểm tra checksum và từ chối journal sai/đang `running`/không liên tục.

Không truyền mật khẩu MySQL qua GitHub, workflow, SSH arguments hoặc log. Quản trị viên cấu hình credential một lần trên VPS tại `/home/cotuong_deploy/.cotuong-deploy/mysql-migrator.json`, owner `cotuong_deploy`, mode `0600`; thư mục cha phải mode `0700`. File JSON có dạng `{"user":"cotuong_migrator","password":"..."}`. Tạo file bằng prompt ẩn, không đưa password vào câu lệnh hay shell history:

```bash
sudo -iu cotuong_deploy
read -r -s -p 'MySQL cotuong_migrator password: ' DB_MIGRATOR_PASSWORD; printf '\n'
export DB_MIGRATOR_PASSWORD
node --input-type=module -e '
import { writeFileSync } from "node:fs";
const path = "/home/cotuong_deploy/.cotuong-deploy/mysql-migrator.json";
if (process.env.DB_MIGRATOR_PASSWORD === undefined || !process.env.DB_MIGRATOR_PASSWORD) process.exit(2);
writeFileSync(path, JSON.stringify({user:"cotuong_migrator",password:process.env.DB_MIGRATOR_PASSWORD}), {flag:"wx",mode:0o600});
'
unset DB_MIGRATOR_PASSWORD
```

Nếu cần xoay mật khẩu, quản trị viên thay credential MySQL và file local trong cùng maintenance; không ghi đè file qua deploy. Trước lần deploy đầu, xác minh trạng thái user/host/khóa/mật khẩu hết hạn và grants bằng tài khoản MySQL quản trị tại VPS:

```sql
SELECT user, host, account_locked, password_expired
FROM mysql.user WHERE user IN ('cotuong_app','cotuong_migrator') ORDER BY user,host;
SHOW GRANTS FOR 'cotuong_migrator'@'<host lấy từ kết quả trên>';
```

Tài khoản migrator phải đăng nhập được vào đúng database `cotuong` và chỉ cần `SELECT, INSERT, UPDATE, CREATE, ALTER, INDEX, REFERENCES` trên `cotuong.*`; không cấp `DROP`, global grants, quyền quản trị hay DDL cho `cotuong_app`. Host account cần khớp host MySQL thực tế, không đoán `'localhost'`. Sau khi lưu file, kiểm tra kết nối từ thư mục app mà không in credential: `DB_MIGRATOR_CREDENTIALS_FILE=/home/cotuong_deploy/.cotuong-deploy/mysql-migrator.json npm run db:check`. Nếu kiểm tra hoặc grants không đúng, chưa deploy.

Migration 006 thêm `gold_reward_eligible NOT NULL DEFAULT TRUE` nên các trận cũ vẫn giữ mặc định đủ điều kiện, không cập nhật lịch sử; 007 thêm title rỗng/note NULL cho bookmark cũ; 008 thêm hai bảng chợ mới; 009 thêm cờ duyệt mặc định `FALSE` và bảng yêu cầu join rỗng; 010 đổi CHECK role để cho phép `deputy` và tạo bảng block rỗng. 010 giả định dữ liệu role cũ chỉ có `owner`/`member` theo CHECK trước đó; nếu schema/data thực tế lệch, migration sẽ dừng ở lỗi DDL/journal. Không có migration nào tự xóa bản ghi hiện hữu.

MySQL DDL có implicit commit. Nếu migration hoặc verify thất bại, deploy dừng service, không publish code, không tự rollback code và không khôi phục MySQL. Journal `running` có thể cần kiểm tra/sửa thủ công theo schema và backup đã xác minh; không đánh dấu `applied` giả. Backup pre-migration giữ nguyên làm điểm khôi phục, không restore tự động. Sau migration thành công mới bắt đầu publish. Lỗi activation/health chỉ tự rollback code/frontend khi input `rollback_compatible=true`; mặc định false thì service dừng để review. Tích chọn chỉ sau khi đã xác nhận semantics ghi dữ liệu mới tương thích với backend trước; rollback code không rollback schema/dữ liệu.

## Luồng deploy và rollback

Sau preflight user/quyền và kiểm tra backup hiện có: giải nén vào `/home/cotuong_deploy/.cotuong-deploy/<timestamp>-<sha>/code`, `npm ci` đầy đủ (backend đang cần tsx thuộc devDependencies), build trước khi chạm app đang chạy, verify schema mới/cũ. Không dùng `npm ci --omit=dev`. Lưu code+node_modules và WEB cũ; tạo backup mới và chờ local/cloud kết thúc thành công; dừng service, rsync bản mới và dist, start service. Publish/rollback cùng dùng rsync không giữ owner/group/perms/directory-times; giữ ACL đích và default ACL cho file mới. Thư mục app/WEB phải được quản trị cấp quyền trước; script không sửa owner/ACL/Nginx.

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
