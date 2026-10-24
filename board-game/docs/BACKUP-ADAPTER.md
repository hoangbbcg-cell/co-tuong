# Backup Adapter — Ubuntu 24.04

2026-10-22: người dùng xác nhận đã cài và chạy thành công cả hai action trên VPS. Lần chuyển CD sang `cotuong_deploy` chỉ cập nhật sudoers/hướng dẫn Local; không SSH hoặc thay adapter/unit production. Adapter chỉ đọc dump và gọi `systemctl start cotuong-backup.service`; không gọi mysql, restore, migration, rclone, xóa backup hoặc sửa unit/script backup hiện có.

## Hợp đồng và giới hạn

- Cài `scripts/cotuong-backup-check.py` thành `/usr/local/sbin/cotuong-backup-check`. Python3 chuẩn Ubuntu, không pip/dependency mới. Shebang `/usr/bin/python3 -I` bỏ ảnh hưởng PYTHONPATH/user site/current directory. Không nhận biến môi trường, đường dẫn hoặc command từ deploy user.
- Hai đối số duy nhất: `verify-existing`, `create-and-verify`. Exit0 mới cho CD tiếp tục; mọi lỗi/timeout exit khác0. stdout không chứa SQL/credential; khi lỗi xem journal tại VPS bằng tài khoản quản trị.
- Chỉ nhận `/var/backups/cotuong/cotuong-YYYY-MM-DD_HH-MM-SS.sql.gz`; bỏ `.tmp`. File thường, không symlink/hardlink, không rỗng, tuổi tối đa24h, không tương lai quá5s. Đọc hết gzip để kiểm CRC/footer; giới hạn SQL giải nén20GiB, kiểm header DB `cotuong`, CREATE TABLE và dấu kết thúc mysqldump. Tính SHA256; phát hiện thay đổi inode/size/mtime trong lúc đọc và trong lúc cloud chạy. Không thực thi SQL.
- `verify-existing` kiểm file mới nhất, trạng thái thành công local/cloud hiện tại và thứ tự thời gian của hai job. Không tìm file cũ để bỏ qua file mới nhất bị hỏng. Sau reboot mà systemd mất lịch sử, adapter từ chối: quản trị chạy backup hiện có và chờ cloud thành công trước khi thử lại.
- `create-and-verify` gọi đúng service cũ, yêu cầu một **tên file mới chưa có trước lời gọi**, mtime sau lời gọi; không chấp nhận touch/ghi đè tên cũ. Chờ local kết thúc rồi chờ cloud có start timestamp monotonic mới, sau local exit, và kết thúc thành công. Không dựa vào `InvocationID` vì có thể rỗng khi unit inactive; không coi OnSuccess được kích hoạt là cloud đã xong. Service phải sẵn có `Type=oneshot`, `RemainAfterExit=no`; khác cấu hình thì từ chối, không tự sửa.
- Thời hạn900s gồm local và cloud. Timeout không stop/kill/restart các service; backup có thể vẫn chạy. Kiểm tra journal/trạng thái trước retry. File có tên theo giây: gọi hai lần cùng giây có thể bị từ chối an toàn. Timer đang chạy thì adapter từ chối để tránh nhập nhằng.
- Lock/receipt riêng root-only tại `/var/lib/cotuong-backup-check`. Receipt SHA256 chỉ bảo vệ so với lần đã kiểm trước, không chứng minh nguồn gốc bản đầu. Giữ ownership `nhat_hoang:nhat_hoang` của dump hiện tại. User CD riêng `cotuong_deploy` không được cấp thêm quyền vào dump/backup credential; adapter đọc bằng root. Không tự đổi ownership hệ thống backup.

**Ba mức bằng chứng khác nhau:** gzip/marker/checksum hợp lệ chỉ là kiểm tra cấu trúc file; cloud exit0 chỉ chứng minh service đã kết thúc theo hợp đồng của script cloud; khả năng restore chỉ được xác nhận bằng restore thực tế vào MySQL cô lập. Adapter không tuyên bố đã kiểm restore hoặc tự chứng minh remote Drive chứa đúng dữ liệu/mã hóa chỉ từ exit0.

Trước khi bật CD, quản trị phải audit script cloud: chạy đồng bộ đồng bộ hóa xong mới exit, truyền lỗi rclone về systemd, đúng encrypted remote/directory, bao gồm file vừa tạo và có kiểm tra remote theo chính sách hiện có. Script chạy nền hoặc nuốt lỗi không đạt; dừng kích hoạt CD và review riêng, không sửa mù hệ thống backup. Ghi bằng chứng kiểm tra bản sao ngoài VPS và restore định kỳ (khuyến nghị≤30ngày) vào hồ sơ vận hành riêng, không tạo chứng nhận giả. Quy trình review Environment phải chặn triển khai nếu bằng chứng thiếu/hết hạn; adapter **không tự kiểm hồ sơ restore hoặc remote checksum**.

## Cài an toàn bởi quản trị viên

1. Review commit và chạy test trên Ubuntu staging trước. Đặt file từ bản review trong thư mục staging riêng của quản trị; không cài trực tiếp script từ thư mục writable của deploy user khi chưa kiểm SHA256. Không chạy script deploy ở bước cài adapter.
2. Đọc tại VPS, không paste secrets:

   ```sh
   command -v python3 systemctl
   systemctl cat cotuong-backup.service cotuong-cloud-backup.service
   systemctl show cotuong-backup.service cotuong-cloud-backup.service \
     -p Type -p RemainAfterExit -p OnSuccess -p Result -p ExecMainStatus
   systemctl list-timers cotuong-backup.timer
   namei -l /usr/local/sbin/cotuong-backup.sh /var/backups/cotuong
   ```

   Kiểm tra unit/drop-ins, script local/cloud và mọi executable/config chúng gọi không writable bởi deploy user (kể cả ACL/thư mục cha). Không đặt executable trong app writable. Adapter kiểm root ownership/mode của chính nó, script local, unit/drop-ins và state; audit các phụ thuộc còn lại là việc quản trị. Các path này không được là symlink. Nếu không phù hợp thì dừng và review quyền riêng; không tự chmod/chown backup hiện có. Xác nhận timestamp/NTP VPS đúng.
3. Từ thư mục staging đã review, quản trị chạy:

   ```sh
   sudo install -d -o root -g root -m 0700 /var/lib/cotuong-backup-check
   sudo install -o root -g root -m 0755 cotuong-backup-check.py /usr/local/sbin/cotuong-backup-check
   sudo /usr/local/sbin/cotuong-backup-check verify-existing
   sudo /usr/local/sbin/cotuong-backup-check create-and-verify
   ```

   Hai lệnh cuối chỉ sau khi đã review tải I/O/dung lượng và chọn giờ phù hợp. Tạo mới vẫn dùng mysqldump single-transaction cũ; không thay đổi DB. Chờ cloud kết thúc. Nếu xác minh cũ không đạt vì reboot/lịch sử unit, quản trị chạy **service backup đang có** rồi chờ local/cloud thành công, không xóa receipt/file để vượt lỗi. Backup cũ hỏng/hết hạn cần xử lý theo quy trình vận hành, không bypass gate.
4. Review `scripts/cotuong-deploy.sudoers.example`, đường dẫn `/usr/bin/systemctl` và user `cotuong_deploy` trên VPS. Dùng `sudo visudo -f /etc/sudoers.d/cotuong-deploy`, nhập đúng dòng đã review; `sudo chmod 0440 /etc/sudoers.d/cotuong-deploy`; `sudo visudo -cf /etc/sudoers.d/cotuong-deploy`; `sudo -l -U cotuong_deploy`. Không cấp `ALL`, wildcard, `sudo python/bash/npm/rsync`, trực tiếp start backup/cloud hoặc quyền DB admin. Quyền sẵn có khác của user cũng phải audit; file này không thu hồi quyền rộng cũ. Phân quyền app và thư mục cha theo [DEPLOY-USER.md](DEPLOY-USER.md); giữ `nhat_hoang` làm quản trị riêng.
5. Trong phiên SSH deploy user:

   ```sh
   sudo -n /usr/local/sbin/cotuong-backup-check verify-existing
   sudo -n /usr/local/sbin/cotuong-backup-check create-and-verify
   ```

   Kiểm tra `sudo -n /usr/local/sbin/cotuong-backup-check invalid` bị từ chối; `sudo -n -l` không có quyền shell/systemctl wildcard. Không chạy thử lệnh stop app để kiểm quyền. Chỉ bật secrets/Environment sau khi restore drill cô lập và offsite audit đạt. Chưa bấm Run workflow production ở task này.

## Kiểm thử

Local/CI, chỉ fixture giả và mock systemd, không cần root/DB/Drive:

```sh
cd board-game
python3 -m unittest discover -s tests/backup_adapter -v
bash -n scripts/deploy-vps.sh
```

Bao phủ gzip rỗng/hỏng/truncated, sai DB/footer, quá hạn/tương lai, giới hạn giải nén, bỏ tmp, checksum đổi, job bận/lỗi, không file mới, cloud cũ/lỗi và luồng thành công chờ cloud. Đây không phải nghiệm thu systemd hoặc restore thật.

Trên **VM staging cô lập**, tạo unit oneshot cùng tên, local sinh dump giả đúng format và cloud sleep rồi exit0; cài adapter cùng đường dẫn. Chạy cả hai action; adapter phải đợi cloud sleep. Lần lượt thay fixture local exit1, không tạo file, chỉ touch file cũ, gzip hỏng/rỗng/quá hạn, cloud exit1/sleep quá900s, thiếu OnSuccess, unit Type=simple, gọi adapter song song: mỗi trường hợp phải exit khác0. Chỉ sửa fixture/unit staging, tuyệt đối không làm hỏng backup/unit production để thử. Sau đó nghiệm thu thật trên VPS bằng hai action thành công và journal cả hai service; chứng minh remote file/restore trong môi trường cô lập theo chính sách quản trị.

Deploy script kiểm existing trước chuẩn bị, tạo backup mới sau build/schema verify/snapshot và **trước phase activate**. Hook lỗi không stop app, không rsync app/WEB và không restore DB. Sudoers chỉ cho hook hai action cố định; adapter không tự cài hoặc cập nhật trong workflow.

Nguồn semantics systemd: [systemctl](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html), [oneshot service](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html). Kiểm tra `man` của systemd trên Ubuntu VPS khi nghiệm thu.
