# CD bằng tài khoản cotuong_deploy

Ngày 2026-10-22: người dùng xác nhận Ubuntu24.04, SSH key của `cotuong_deploy` đã đăng nhập được tại `103.9.78.75:22`, CI master PASS, adapter backup chạy thành công cả hai action. Đây là hiện trạng người dùng báo; task này **chỉ chuẩn bị Local**, không SSH, đổi quyền VPS, restart, push hoặc deploy production.

`nhat_hoang` tiếp tục là tài khoản quản trị sudo. GitHub CD chỉ đăng nhập `cotuong_deploy`; workflow và script đều từ chối user quản trị/root. Giữ nguyên app `/home/nhat_hoang/co-tuong/board-game`, WEB `/var/www/cotuong`, systemd/Nginx/MySQL/backup hiện có. Incoming, lock, log và snapshot mới ở `/home/cotuong_deploy/.cotuong-incoming` và `.cotuong-deploy`, mode0700.

## 1. Đối chiếu trước khi cấp quyền

Các lệnh Linux bên dưới do bạn chạy thủ công bằng `nhat_hoang`, sau khi review. Tạm ngừng mọi workflow/thao tác deploy cũ trước khi chuyển lock sang home mới; không xóa lock cũ để ép chạy. Không chuyển snapshot cũ chứa secrets sang nơi công khai.

```bash
id cotuong_deploy
getent passwd cotuong_deploy
namei -l /home/nhat_hoang/co-tuong/board-game/.env /var/www/cotuong
sudo -l -U cotuong_deploy
systemctl show --property=User --property=WorkingDirectory cotuong.service
ps -C nginx -o user=,args=
command -v setfacl getfacl rsync node npm
```

Xác nhận home deploy là `/home/cotuong_deploy`; không thuộc group `sudo`/`admin`, không có sudo `ALL`, shell/interpreter hoặc wildcard từ file/group khác. File sudoers mới không tự thu hồi quyền rộng đã có. Không thêm deploy vào group `nhat_hoang`, không `chmod755` home quản trị hoặc `chmod777`.

Đối chiếu working directory với APP bên dưới. Ghi đúng `User` của service và user worker Nginx; ví dụ worker thường là `www-data`, phải đối chiếu kết quả thực tế. `User` service trống/root thì dừng, cần xử lý cấu hình runtime riêng trước khi cấp user deploy quyền sửa code chạy bởi service đó. Node22/npm phải có trong PATH SSH không tương tác; không source `.bashrc` của quản trị. Nếu thiếu `setfacl/getfacl`, quản trị cài gói Ubuntu `acl` để cấp quyền riêng theo user, rồi chạy lại kiểm tra; script deploy không tự cài gói.

## 2. Lưu ACL và cấp quyền đúng phạm vi

Chạy trong **cùng phiên Bash** để giữ các biến. Kiểm tra đường dẫn thật, không dùng cây app/WEB symlink. Đặt WEB_USER theo bước1 nếu khác ví dụ.

```bash
set -euo pipefail
APP=/home/nhat_hoang/co-tuong/board-game
WEB=/var/www/cotuong
DEPLOY=cotuong_deploy
DEPLOY_GROUP="$(id -gn "$DEPLOY")"
RUNTIME_USER="$(systemctl show --property=User --value cotuong.service)"
WEB_USER=www-data
test -n "$RUNTIME_USER" && test "$RUNTIME_USER" != root
id "$RUNTIME_USER" >/dev/null
test "$(id -u "$RUNTIME_USER")" != 0
id "$WEB_USER" >/dev/null
test "$(realpath -e "$APP")" = "$APP"
test "$(realpath -e "$WEB")" = "$WEB"
test -f "$APP/.env" && test ! -L "$APP/.env"

sudo install -d -o root -g root -m0700 /root/cotuong-acl-before-deploy-user
ACL_BACKUP="$(sudo mktemp /root/cotuong-acl-before-deploy-user/acl.XXXXXX)"
sudo getfacl -p /home/nhat_hoang /home/nhat_hoang/co-tuong \
  | sudo tee "$ACL_BACKUP" >/dev/null
sudo getfacl -R -p "$APP" "$WEB" | sudo tee -a "$ACL_BACKUP" >/dev/null
printf 'ACL backup: %s\n' "$ACL_BACKUP"

# Chỉ đi qua hai thư mục cha; không cho deploy liệt kê home quản trị.
sudo setfacl -m "u:$DEPLOY:--x" /home/nhat_hoang /home/nhat_hoang/co-tuong

# Không chown toàn project; bỏ qua secrets, git, engine và dữ liệu runtime.
sudo find "$APP" \( -name '.env*' -o -name '.admin-access*' -o -name .git \
  -o -name engines -o -name uploads -o -name media -o -name storage \) -prune -o \
  -type d -exec setfacl -m "u:$DEPLOY:rwx,u:$RUNTIME_USER:r-x,d:u:$DEPLOY:rwx,d:u:$RUNTIME_USER:r-x" {} +
sudo find "$APP" \( -name '.env*' -o -name '.admin-access*' -o -name .git \
  -o -name engines -o -name uploads -o -name media -o -name storage \) -prune -o \
  -type f -exec setfacl -m "u:$DEPLOY:rwX,u:$RUNTIME_USER:r-X" {} +

# Deploy cần đọc cấu hình để build/verify; không in hoặc sao chép ra GitHub.
sudo setfacl -m "u:$DEPLOY:r--" "$APP/.env"

# WEB chỉ chứa frontend; xác nhận không có DB/media trước khi cho rsync --delete.
sudo find "$WEB" -type d -exec setfacl -m "u:$DEPLOY:rwx,u:$WEB_USER:r-x,d:u:$DEPLOY:rwx,d:u:$WEB_USER:r-x" {} +
sudo find "$WEB" -type f -exec setfacl -m "u:$DEPLOY:rwX,u:$WEB_USER:r-X" {} +

sudo install -d -o "$DEPLOY" -g "$DEPLOY_GROUP" -m0700 \
  /home/cotuong_deploy/.cotuong-incoming /home/cotuong_deploy/.cotuong-deploy
sudo getfacl -p /home/nhat_hoang /home/nhat_hoang/co-tuong "$APP" "$APP/.env" "$WEB"
```

ACL `mask` thể hiện ở các bit group của `ls -l`; đọc cả `getfacl` để kiểm quyền effective của các entry cũ. Không dùng `chmod -R` sau đó vì có thể thu mask và làm ACL mất hiệu lực. Default ACL bắt buộc để runtime/Nginx đọc được file mới do deploy tạo, trong khi cây staging vẫn riêng tư.

Script publish dùng `rsync -rlt --no-owner --no-group --no-perms --omit-dir-times --omit-link-times`, không chown/chmod thư mục thuộc quản trị. `--chmod=Du=rwx,Dgo=rx,Fu+rw,Fgo+r,a+X` mô tả mode nguồn cho file mới: đọc được và giữ executable khi có. Kết hợp default ACL ở đích để tránh file build dưới umask077 trở thành không đọc được bởi runtime/Nginx. Snapshot riêng vẫn giữ mode; không copy ACL của staging vào cây live. Xem [rsync --perms/--chmod](https://download.samba.org/pub/rsync/rsync.1#opt--perms), [setfacl](https://manpages.debian.org/bookworm/acl/setfacl.1.en.html).

## 3. Kiểm tra kế thừa quyền trước deploy

Vẫn trong phiên quản trị ở bước2. Probe chỉ dùng dữ liệu giả; không đụng file app hiện có và không restart. Việc này kiểm chứng quyền thực tế tốt hơn chỉ nhìn mode của thư mục gốc.

```bash
SOURCE="$(sudo -u "$DEPLOY" mktemp -d /home/cotuong_deploy/.cotuong-incoming/acl-source.XXXXXX)"
APP_PROBE="$(sudo -u "$DEPLOY" mktemp -d "$APP/.acl-probe.XXXXXX")"
WEB_PROBE="$(sudo -u "$DEPLOY" mktemp -d "$WEB/.acl-probe.XXXXXX")"
sudo -u "$DEPLOY" bash --noprofile --norc -c '
  umask 077
  mkdir "$1/nested"
  printf "permission probe\n" > "$1/nested/read.txt"
  printf "#!/bin/sh\nexit 0\n" > "$1/nested/run.sh"
  chmod 0700 "$1/nested/run.sh"
' bash "$SOURCE"
for DEST in "$APP_PROBE" "$WEB_PROBE"; do
  sudo -u "$DEPLOY" rsync -rlt --no-owner --no-group --no-perms \
    --omit-dir-times --omit-link-times --chmod=Du=rwx,Dgo=rx,Fu+rw,Fgo+r,a+X "$SOURCE/" "$DEST/"
done
sudo -u "$RUNTIME_USER" test -r "$APP_PROBE/nested/read.txt"
sudo -u "$RUNTIME_USER" test -x "$APP_PROBE/nested/run.sh"
sudo -u "$WEB_USER" test -r "$WEB_PROBE/nested/read.txt"
sudo -u "$DEPLOY" test -r "$APP/.env"
sudo -u "$DEPLOY" test ! -w /home/nhat_hoang

# Chỉ xóa ba thư mục probe vừa tạo, sau kiểm tra prefix.
[[ "$SOURCE" == /home/cotuong_deploy/.cotuong-incoming/acl-source.* && \
   "$APP_PROBE" == "$APP"/.acl-probe.* && "$WEB_PROBE" == "$WEB"/.acl-probe.* ]]
sudo -u "$DEPLOY" rm -r -- "$SOURCE" "$APP_PROBE" "$WEB_PROBE"
```

Nếu một kiểm tra thất bại, giữ CD chưa kích hoạt và đối chiếu ACL/traverse; không nới quyền bằng777 hoặc cấp sudo rsync. Script không đổi quyền engine/media/uploads; các thư mục này vẫn do runtime và quy trình backup hiện có quản lý.

## 4. Sudoers tối thiểu

Adapter đã thử thành công theo người dùng nên không cần thay adapter hoặc unit backup. Review file `scripts/cotuong-deploy.sudoers.example`: chỉ hai action adapter và stop/start/is-active đúng `cotuong.service`, user `cotuong_deploy`, `NOPASSWD: NOSETENV`. Không có shell, wildcard, `sudo npm/rsync`, quyền DDL/MySQL hoặc quyền start trực tiếp backup/cloud unit.

Chuyển file mẫu mới lên `/tmp/cotuong-deploy.sudoers.example` bằng kênh quản trị, rồi chạy thủ công:

```bash
command -v systemctl
sudo visudo -cf /tmp/cotuong-deploy.sudoers.example
sudo install -o root -g root -m0440 /tmp/cotuong-deploy.sudoers.example /etc/sudoers.d/cotuong-deploy
sudo visudo -c
sudo -l -U cotuong_deploy
```

Xác nhận binary đúng `/usr/bin/systemctl`. Review/tạo bản lưu root-only của file sudoers cũ nếu file đích đã tồn tại trước khi thay. Quyền quản trị sudo của `nhat_hoang` được giữ trong cấu hình quản trị riêng.

## 5. Preflight bằng đúng SSH key, không restart

Sau khi bạn đã thực hiện các bước trên, từ Windows trong thư mục `board-game`:

```powershell
scp -i "$HOME\.ssh\cotuong_github_deploy" -o IdentitiesOnly=yes scripts/deploy-vps.sh cotuong_deploy@103.9.78.75:/home/cotuong_deploy/.cotuong-incoming/deploy-vps-check.sh
ssh -i "$HOME\.ssh\cotuong_github_deploy" -o IdentitiesOnly=yes cotuong_deploy@103.9.78.75 'bash /home/cotuong_deploy/.cotuong-incoming/deploy-vps-check.sh --check'
```

`--check` xác minh user/HOME, Node22/PATH, quyền đọc/ghi/traverse code/WEB, private state/incoming0700, runtime non-root, adapter root-owned và sudoers từng command. Nó chỉ kiểm service active và gọi `verify-existing`; không chạy stop/start, build, `create-and-verify`, rsync live hay migration. Không in `.env`. Kiểm tra ACL kế thừa ở bước3 vẫn cần vì deploy user không được sudo giả danh runtime/Nginx.

## 6. Chuyển GitHub Environment production

Giữ các cổng CI/backup/schema/approval đang có. Cập nhật secrets trong **Environment production**:

| Secret | Giá trị |
|---|---|
| VPS_HOST | `103.9.78.75` |
| VPS_PORT | `22` |
| VPS_USER | `cotuong_deploy` |
| VPS_SSH_KEY | Private key tương ứng public key đã cài cho deploy; chỉ nhập vào giao diện secrets |
| VPS_KNOWN_HOSTS | Host key đã đối chiếu fingerprint bằng kênh tin cậy |

Không đưa private key vào repo/chat/log; không tự lấy key của quản trị thay thế. Workflow có IdentitiesOnly/StrictHostKeyChecking và kiểm lại user/HOME trên VPS trước upload; VPS_USER khác `cotuong_deploy` bị từ chối.

Các sửa đổi workflow/script ở Local phải được review, commit/push riêng, và nhận CI PASS trên master trước khi dùng. Run CI đã PASS trước đó không chứng minh những sửa đổi mới này đã chạy GitHub. Chưa bấm Run workflow/deploy production trong task này. Khi được duyệt triển khai sau này, chọn đúng SHA có push CI success, Environment production phê duyệt và maintenance như [CI-CD.md](CI-CD.md).

## Hoàn tác cấu hình nếu cần

Giữ CD tạm dừng. Quản trị có thể khôi phục ACL **các entry đã lưu** bằng `sudo setfacl --restore=/root/cotuong-acl-before-deploy-user/acl.<mã-đã-ghi>` và khôi phục sudoers cũ đã lưu sau kiểm tra `visudo`. File tạo sau snapshot ACL không nằm trong bản lưu; đây không phải rollback app/DB. Không chuyển GitHub lại sang user quản trị để vượt preflight. Task này không di chuyển app, không tạo migration và không thay backup/Nginx/systemd.
