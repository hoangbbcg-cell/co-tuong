# Bootstrap VPS Ubuntu 24.04 mới

Trạng thái SSH của task hiện tại: public key và `SSH_KEY_OK` đã được xác nhận. Để chuẩn bị cài môi trường trên VPS thử nghiệm, dùng bộ script/quy trình review tại [ops/vps-new/README.md](../ops/vps-new/README.md); không cần lặp lại các bước cấp key bên dưới.

Phạm vi: máy mới `103.153.254.184`, admin `nhat_hoang`. Không dùng các lệnh trong tài liệu này với VPS cũ `103.9.78.75`. Không thay DNS `hovanggame.com`, không xóa/di chuyển dữ liệu cũ. Chưa cấu hình app, database, firewall hoặc dịch vụ trước khi SSH bằng public key đã được xác nhận thành công.

## 1. Tạo khóa riêng trên Windows

Mở PowerShell trên máy Windows (không phải VNC), tạo Ed25519 riêng cho máy mới. Nếu file đã tồn tại, không ghi đè; chọn tên file khác.

```powershell
New-Item -ItemType Directory -Force "$HOME\.ssh" | Out-Null
ssh-keygen -t ed25519 -a 64 -f "$HOME\.ssh\cotuong_new_vps" -C "nhat_hoang@103.153.254.184"
```

Đặt passphrase khi được hỏi. Private key `cotuong_new_vps` ở lại máy Windows; chỉ public key `cotuong_new_vps.pub` được chuyển. Không gửi/đăng private key hoặc passphrase.

Hiển thị public key để copy nguyên một dòng:

```powershell
Get-Content -Raw "$HOME\.ssh\cotuong_new_vps.pub"
```

Trên Windows, lấy fingerprint của server qua kênh VNC tin cậy ở bước kế tiếp; không dùng `ssh-keyscan` làm bằng chứng tin cậy.

## 2. Dùng VNC: xác nhận máy và cài public key

Đăng nhập console VNC bằng `nhat_hoang`. Lệnh đầu chỉ kiểm tra danh tính máy, tài khoản và trạng thái SSH; chưa sửa file cấu hình hay restart dịch vụ:

```bash
hostnamectl
id nhat_hoang
sudo -v
sudo sshd -T | grep -E '^(port|pubkeyauthentication|authorizedkeysfile|passwordauthentication|kbdinteractiveauthentication|permitrootlogin) '
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

So sánh IP/hostname/Ubuntu 24.04 với VPS mới đã mở trong nhà cung cấp. Đọc fingerprint ED25519 trên VNC để ghim đúng máy khi PowerShell lần đầu hỏi xác nhận. Nếu không có host key ED25519 hoặc output bất thường, dừng và xử lý qua console trước.

Tạo `.ssh` đúng quyền cho `nhat_hoang`, rồi mở authorized_keys bằng editor để dán public key vừa tạo (chỉ một dòng). Lệnh không bật password auth, không sửa sshd_config, không thay key cũ:

```bash
install -d -m 700 "$HOME/.ssh"
touch "$HOME/.ssh/authorized_keys"
chmod 600 "$HOME/.ssh/authorized_keys"
nano "$HOME/.ssh/authorized_keys"
```

Trong nano: dán nguyên dòng public key, xuống một dòng nếu cần, lưu `Ctrl+O`, Enter, thoát `Ctrl+X`. Giữ nguyên mọi key đang có. Sau đó xác minh quyền và fingerprint key được thêm:

```bash
chmod 700 "$HOME/.ssh"
chmod 600 "$HOME/.ssh/authorized_keys"
chown "$(id -un):$(id -gn)" "$HOME/.ssh" "$HOME/.ssh/authorized_keys"
ssh-keygen -lf "$HOME/.ssh/authorized_keys"
```

Fingerprint authorized_keys phải khớp public key Windows:

```powershell
ssh-keygen -lf "$HOME\.ssh\cotuong_new_vps.pub"
```

Nếu `sshd -T` báo `pubkeyauthentication no`, authorized keys đặt ở vị trí tùy chỉnh, hoặc quyền/owner sai, chưa chỉnh cấu hình SSH mù; sửa nguyên nhân từ VNC và đọc lại `sshd -T`. Không tắt mật khẩu hay đóng phiên console.

## 3. Xác minh SSH từ Windows trước mọi thay đổi xác thực

Từ PowerShell, chỉ kiểm tra đăng nhập và identity; không chạy lệnh thay đổi cấu hình. Lần đầu đối chiếu fingerprint `ED25519` được hỏi với fingerprint host key đọc trực tiếp ở VNC, chỉ nhập `yes` khi trùng:

```powershell
ssh -i "$HOME\.ssh\cotuong_new_vps" -o IdentitiesOnly=yes -o PreferredAuthentications=publickey -o PasswordAuthentication=no nhat_hoang@103.153.254.184 'id; printf "SSH_KEY_OK\\n"'
```

Chỉ khi thấy đúng `uid`/username `nhat_hoang` và `SSH_KEY_OK` thì coi là SSH key thành công. Nếu thất bại, giữ VNC mở; không đổi `PasswordAuthentication`, `PermitRootLogin`, firewall hoặc restart sshd. Kiểm tra client đang dùng đúng key (`ssh -vv` nếu cần), public key có nguyên dòng trong authorized_keys, home/.ssh/key ownership và kết quả `sshd -T` từ console. Có thể dùng `ssh -i ... -o IdentitiesOnly=yes ...` sau này; không thêm private key vào repo/agent khác.

## 4. Sau khi key login đã được xác nhận

Chụp lại trạng thái máy trước khi cài app và xác minh phiên SSH bằng key vẫn mở được. Bước triển khai ứng dụng chưa được thực hiện trong tài liệu bootstrap này. Trước đó cần lập kế hoạch riêng cho domain cutover, TLS, reverse proxy, database backup/restore và vận hành song song; đến khi có quyết định rõ ràng thì giữ DNS `hovanggame.com` và VPS `103.9.78.75` nguyên trạng.

Không tái sử dụng script deploy hiện hành trên VPS mới: [DEPLOY-USER.md](DEPLOY-USER.md) và [CI-CD.md](CI-CD.md) được viết cho đường dẫn, service và production hiện tại trên máy cũ.
