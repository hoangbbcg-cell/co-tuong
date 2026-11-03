# VPS_CHECKPOINT — Cờ Tướng Online

Ngày lập: 2026-10-27

## Phạm vi và cách dùng

Checkpoint này tổng hợp trạng thái local và các kết quả đã quan sát trong hội thoại. Nó không phải bằng chứng cho những cấu hình chưa được đọc trực tiếp trên VPS. VPS mục tiêu là `103.153.254.184`; tuyệt đối không dùng VPS cũ `103.9.78.75`, không chuyển DNS `hovanggame.com`, không di chuyển/xóa dữ liệu người chơi.

Tại yêu cầu lập checkpoint này, người dùng cấm SSH nếu chưa cho phép. Vì vậy không có kết nối mới, lệnh mới trên VPS, bootstrap hoặc thay đổi nào được thực hiện trong lượt này.

## Trạng thái đã xác minh

### Kết nối và khôi phục

- Người dùng đã xác nhận đăng nhập VNC/Console của VPS mới được.
- SSH public-key tới `nhat_hoang@103.153.254.184` đã được xác nhận trước đó (`SSH_KEY_OK`, SSH Agent OK); trong lần kiểm tra gần nhất được lưu trong hội thoại, Codex kết nối lại bằng khóa với `BatchMode=yes` thành công.
- VNC là đường khôi phục đã xác nhận bởi người dùng.
- `sudo -n` thất bại do cần mật khẩu sudo. Không có mật khẩu nào được yêu cầu hoặc ghi vào checkpoint.

### Hệ điều hành và APT

Lần đọc trạng thái SSH gần nhất trong hội thoại xác nhận:

- Ubuntu 24.04 LTS (Noble), `x86_64`.
- Kernel đang chạy: `6.8.0-31-generic`.
- APT cache liệt kê 334 gói có thể nâng cấp.
- `apt-mark showhold` không liệt kê gói nào bị giữ bằng hold.
- `/var/run/reboot-required` chưa tồn tại tại thời điểm kiểm tra.
- Người dùng đã báo `sudo apt update` hoàn tất thành công: tải 42.2 MB, không có lỗi. Đây là thao tác làm mới metadata APT, không phải nâng cấp gói.

### Mô phỏng nâng cấp

`sudo -n apt-get -s upgrade` **không chạy được** vì sudo yêu cầu mật khẩu. Không được xem kết quả sau đây là lần chạy bằng sudo.

Để vẫn xem kế hoạch mà không thay đổi hệ thống, `apt-get -s upgrade` đã chạy dưới user thường và trả kết quả thành công:

- 329 gói nâng cấp, 0 gói mới, 0 gói bị gỡ, 5 gói không nâng cấp.
- Năm gói không nâng cấp trong mô phỏng: `linux-generic`, `linux-headers-generic`, `linux-image-generic`, `sosreport`, `ubuntu-server-minimal`. Chúng không phải các gói được `apt-mark hold`; APT giữ chúng lại trong lệnh `upgrade` thường.
- OpenSSH dự kiến đổi lên `1:9.6p1-3ubuntu13.14` (`openssh-server`, `openssh-client`, `openssh-sftp-server`).
- `systemd` và các thành phần liên quan dự kiến lên `255.4-1ubuntu8.12`.
- `libc6`, `libc6-dev`, `libc-bin` dự kiến lên `2.39-0ubuntu8.6`.
- Gói kernel generic bị giữ lại; không có kernel image mới trong phần cài đặt mô phỏng. `dpkg-query` cho thấy image đã cài là `linux-image-6.8.0-31-generic`.
- Mô phỏng không báo gỡ gói, lỗi dependency hoặc xung đột.

Kết quả này là snapshot theo APT metadata lúc kiểm tra. Sau nâng cấp thật, phải kiểm tra lại SSH, dịch vụ, kernel và reboot marker. Việc mô phỏng không thể dự đoán reboot marker sau khi cài; systemd/libc/OpenSSH đều được cập nhật dù kernel image không đổi.

## Trạng thái phần mềm và dịch vụ trên VPS

**Chưa xác minh trực tiếp.** Trong lượt cuối, không được SSH theo ranh giới người dùng đặt ra. Các file dưới `ops/vps-new` là kế hoạch và script local, không chứng minh script đã được upload hay chạy.

Không có bằng chứng xác nhận Node.js 22, Nginx, MySQL, Fairy-Stockfish, Netdata, systemd app unit, backup timer, deploy user hoặc CI/CD đã được cài/kích hoạt. Cũng chưa có báo cáo `systemctl`, `dpkg-query` đầy đủ hay kiểm tra listener trên VPS. Không được suy luận rằng các dịch vụ đó chắc chắn đã cài hoặc chắc chắn vắng mặt.

## Trạng thái bundle local

- `board-game/ops/vps-new/` tồn tại trong workspace, gồm bootstrap PowerShell/Bash, helper quản trị, hai sudoers policy, systemd/Nginx/backup templates, hướng dẫn README và CI/CD.
- `board-game/docs/NEW-VPS-BOOTSTRAP.md` mô tả quy trình bootstrap SSH key; `ops/vps-new/README.md` và `CI-CD.md` mô tả triển khai VPS thử nghiệm độc lập.
- Tài liệu giới hạn mục tiêu ở VPS mới, không dùng cấu hình production cũ; Node 22 được pin, Fairy-Stockfish cố ý fail-closed đến khi xác minh binary XQ/license/checksum. Nginx HTTP, thông tin DB/app, SSH key deploy, offsite backup và workflow CI có cổng phê duyệt riêng.
- Các tài liệu bảo mật nói `bootstrap-vps.ps1` khi được chạy sẽ upload bundle vào thư mục review riêng rồi in lệnh sudo để người vận hành quyết định; **chưa có bằng chứng nó đã được chạy**. Không thấy thao tác bootstrap, cài app hay thay đổi SSH/firewall/DNS trong lịch sử hội thoại được quan sát.
- Các kiểm tra local được thực hiện trước đó: `bash -n` cả 5 script PASS; `visudo -cf` cả 2 policy PASS trong Ubuntu WSL; PowerShell parser PASS; quét literal secrets PASS; invariant staging/quyền/rollback/sudo PASS.
- `git diff --check` scoped cho bundle và no-index check các file ops chưa track không có lỗi whitespace. Lệnh `git diff --check` toàn workspace báo nhiều trailing whitespace/CRLF trên những thay đổi project khác ngoài phạm vi VPS; chúng không được sửa trong task này.
- `board-game/ops/vps-new/` và `board-game/docs/NEW-VPS-BOOTSTRAP.md` hiện chưa được track theo `git status`; workspace còn nhiều thay đổi và file chưa track khác. Không reset/clean workspace.

## Terminal và lịch sử thao tác

- Công cụ Codex báo không có app terminal session nào đang gắn vào thread này, nên không thể đọc output từ terminal UI hiện hành.
- Có PSReadLine history local, nhưng không trích raw command vào báo cáo vì có thể chứa bí mật. Lịch sử hội thoại vẫn xác nhận các thao tác liên quan: người dùng chạy `sudo apt update`; Codex thực hiện SSH read-only để xem OS/APT và chạy APT simulation không sudo sau khi `sudo -n` bị từ chối. Không có lệnh nâng cấp thật hay bootstrap được ghi nhận.

## Các bước đã xong / đang chờ / còn thiếu

1. **SSH key và xác nhận đường khôi phục VNC:** hoàn tất theo xác nhận người dùng và kiểm tra SSH đã có.
2. **`apt update`:** người dùng xác nhận hoàn tất.
3. **Xem gói và mô phỏng APT:** đã thu được kế hoạch dưới user thường; chưa chạy được chính xác `sudo apt-get -s upgrade` vì thiếu xác thực sudo.
4. **Nâng cấp Ubuntu thật:** chưa làm; phải chờ người dùng xem kế hoạch và duyệt rõ. Trước đó cần có snapshot VPS và xác nhận VNC/Console khôi phục.
5. **Bootstrap quyền/scripts NOPASSWD giới hạn:** chưa upload, chưa bootstrap, chưa cài policy/helper.
6. **Node/Nginx/MySQL/Netdata/deploy user/service/backup/engine/CI:** chưa có trạng thái cài đặt được xác minh; các bước còn lại phải thực hiện tuần tự, kiểm tra từng bước.
7. **DNS, TLS/cutover, dữ liệu production và VPS cũ:** ngoài phạm vi; giữ nguyên.

## Bước tiếp theo chính xác

Chưa nâng cấp thật. Để có đúng kết quả của lệnh sudo-mô phỏng, người dùng có thể tự chạy trong PowerShell; sudo password sẽ được nhập trực tiếp tại máy người dùng, không gửi vào chat:

```powershell
ssh -tt -i "$HOME\.ssh\cotuong_new_vps" -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes nhat_hoang@103.153.254.184 "sudo apt-get -s upgrade"
```

Hoặc cấp quyền rõ ràng cho một lần SSH **read-only** tới đúng VPS mới để Codex chạy lệnh này qua terminal tương tác. Sau khi xem đủ kết quả mô phỏng, người dùng quyết định có duyệt nâng cấp thật hay không. Nếu duyệt, chỉ thực hiện giai đoạn nâng cấp; sau đó kiểm tra lại SSH, kernel, dịch vụ và reboot trước khi sang bước khác.

Không yêu cầu private key/passphrase/mật khẩu qua chat. Không tự kết nối SSH lần nữa khi chưa được cho phép. Không upload/bootstrap, không đổi firewall/SSH/DNS, không tác động VPS cũ hoặc dữ liệu người chơi.
