# Hướng dẫn vận hành backup Cờ Tướng

## Trạng thái hiện tại

Quy trình này dành riêng cho **VPS test `103.153.254.184`, schema `cotuong_stage`**; không áp dụng cho VPS cũ `103.9.78.75` hoặc dữ liệu production. Code và systemd units trong Git đã được chuẩn bị nhưng chưa được cài/xác minh trên VPS trong lượt này. Timer chưa bật; chưa chạy backup, tải dữ liệu thật, restore hoặc xóa. Lệnh có `sudo` chỉ chạy sau phê duyệt riêng cho đúng thao tác.

## Xem lần chạy gần nhất

```bash
sudo systemctl show cotuong-local-backup.service \
  -p ActiveState -p SubState -p Result -p ExecMainStatus \
  -p ExecMainStartTimestamp -p ExecMainExitTimestamp
sudo journalctl -u cotuong-local-backup.service -n 100 --no-pager
sudo journalctl -t cotuong-backup-alert -n 20 --no-pager
```

Chỉ `BACKUP_COMPLETE=PASS` mới xác nhận local database+media set hợp lệ và các object đã mã hóa trên R2 được tải đọc lại, so SHA-256. Exit code upload riêng lẻ không đủ. Lỗi service ghi alert local mức `daemon.crit` vào journal; email/SMS/chat chưa được cấu hình nên chưa có thông báo ngoài VPS.

## Xem lịch 03:00 giờ Việt Nam

```bash
sudo systemctl list-timers --all cotuong-local-backup.timer
sudo systemctl is-enabled cotuong-local-backup.timer
sudo systemctl status cotuong-local-backup.timer --no-pager
```

Unit đã chuẩn bị lịch mỗi ngày `03:00 Asia/Ho_Chi_Minh`, `Persistent=false` (không chạy bù sau khi VPS khởi động lại). Trạng thái trước khi được phê duyệt kích hoạt phải là `disabled` hoặc `not-found`.

## Chạy thủ công và xem bản local

Lệnh sau tạo dump DB, archive media, mã hóa và upload dữ liệu thật lên R2; cần được phê duyệt trước:

```bash
sudo systemctl start --wait cotuong-local-backup.service
sudo journalctl -u cotuong-local-backup.service -n 100 --no-pager
```

Liệt kê tên và kích thước file local, không đọc nội dung:

```bash
sudo find /var/backups/cotuong-stage -maxdepth 1 -type f \
  -printf '%f %s bytes\n' | sort
```

Bucket đã được chỉ định trong cấu hình là `cotuong-stage-backup`; object backup dùng prefix `cotuong-stage/`, tách khỏi `cotuong-smoke/`. Không dùng credential VPS để tải recovery; Windows phải dùng credential Object Read Only riêng đã lưu an toàn.

## Kiểm tra/tải và khôi phục từ R2

`verify-offsite-test-backup.py` tải bộ object theo prefix vào thư mục tạm, xác minh SHA-256 ciphertext, giải mã tạm bằng age identity trên Windows, kiểm tra manifest, gzip và cấu trúc archive media; sau đó script xóa thư mục tạm. Nó chỉ chứng minh tính toàn vẹn, **chưa xuất artifact để chuyển lên VPS**, nên chưa đủ để khôi phục thật.

Quy trình recovery offsite cần thêm bước export được bảo vệ: lưu file giải mã trong thư mục ACL riêng trên Windows, truyền qua SSH đã ghim host key, kiểm checksum lại trên VPS, rồi chạy validator vào schema scratch và thư mục media scratch mới. Script export/transfer hoàn chỉnh chưa có trong bộ hiện tại; không thay bằng lệnh tùy ý.

Các validator đã có, nhưng thao tác của chúng vẫn cần phê duyệt trước:

```bash
sudo /usr/local/sbin/validate-test-backup.py /var/backups/cotuong-stage/<timestamp>.sql.gz
sudo /usr/local/sbin/cotuong-media-backup.py --restore-validate /var/backups/cotuong-stage/<timestamp>.uploads.tar.gz
```

SQL validator chỉ tạo schema scratch với tên mới và chỉ drop schema do đúng lần chạy đó tạo. Media validator tạo thư mục scratch mới. Không restore vào `cotuong_stage` đang dùng.

Nếu VPS mất hoàn toàn: dựng Ubuntu 24.04 mới từ bootstrap đã review, lấy release artifact/source từ `master`, tái tạo protected configuration từ password manager, khôi phục DB/media vào scratch, verify bằng account app, rồi mới xin duyệt riêng service activation. Backup cố ý không chứa `.env`, OAuth/R2 token, SSH/age private key hay secrets khác. Phòng, socket, queue và ván đang diễn ra nằm trong RAM nên không được khôi phục; phạm vi bảo vệ hiện tại là schema `cotuong_stage` cùng `uploads/group-avatars/` và `uploads/message-images/`.

## Log, lỗi và dừng lịch

- `BACKUP_COMPLETE` vắng mặt: xem journal; giữ mọi file/object dở dang để điều tra, không xóa hoặc chạy lặp vô hạn.
- `unsafe ... directory/lock`: dừng và kiểm tra metadata owner/mode/link; không tự `chmod`, `chown` hoặc xóa.
- Attestation R2 thiếu/hết hạn: kiểm tra dashboard, xác nhận bucket private, lock đúng prefix tối thiểu 30 ngày, không có lifecycle delete chồng lấn; cập nhật attestation root-only. Không lưu Admin Read account-wide trên VPS.
- Upload/readback lỗi: giữ local backup, giữ object dở dang, kiểm tra thông báo đã lọc và credential bucket-scoped.
- Hết dung lượng: dừng, không xóa thủ công; chỉ xem kế hoạch retention dry-run và xin duyệt riêng.

Sau khi timer được cài và bật theo phê duyệt, lệnh tạm dừng lịch (không xóa backup) là:

```bash
sudo systemctl disable --now cotuong-local-backup.timer
```

Timer hiện chưa được xác minh là đã cài nên có thể trả `not-found`; kiểm tra trạng thái service trước khi thao tác.

## Retention

Retention local là **30×24 giờ**. R2 giữ **35×24 giờ** để có biên an toàn sau Bucket Lock 30 ngày; cả hai không phải tháng lịch. Dry-run chỉ xét bộ backup hoàn chỉnh trong `/var/backups/cotuong-stage` và prefix `cotuong-stage/`, xác minh checksum/offsite marker và giữ bộ mới nhất. Không bypass lock hoặc thử xóa rộng hơn. Retention units nếu cài chỉ chạy dry-run. `--apply`, bật quyền xóa và bật timer backup đều cần phê duyệt riêng sau khi xem danh sách đối tượng cụ thể.
