# Mở game từ đường dẫn — kiểm tra 2026-11-10

## Kết quả website công khai

- `https://hovanggame.com/`: HTTP 200; Chrome và Edge desktop hiển thị màn đăng nhập, không có lỗi JavaScript trong lượt kiểm tra.
- `http://hovanggame.com/`: HTTP 301 chuyển sang HTTPS.
- `https://www.hovanggame.com/`: không phân giải được DNS từ máy kiểm tra. Chưa sửa DNS hoặc máy chủ.
- Chromium mô phỏng Pixel 7, iPhone 13, iPad gen7: tới màn đăng nhập. Pixel cần bấm **Để sau** trên lời mời lối tắt có sẵn. Đây là mô phỏng Chromium, không phải Safari/iOS thật.
- WebKit Windows cài sẵn không khởi chạy được (`spawn UNKNOWN`), nên chưa có kiểm chứng Safari/WebKit. Chưa kiểm tra mọi thiết bị/phiên bản trình duyệt, chưa đăng nhập hoặc tạo tài khoản trên website thật.

## Sửa local

`public/hovang-startup.js` chạy bằng script thường trước ứng dụng: thông báo đang mở game, hiện **Thử lại** khi entry module/preload/bootstrap lỗi hoặc 30 giây chưa render. Ứng dụng render thành công sẽ gỡ overlay/listener/timer; không xóa cookie hoặc dữ liệu, không tự reload giữa ván. `src/main.tsx` bắt lỗi tải appBootstrap; `index.html` nạp script và có hướng dẫn khi JavaScript bị tắt. Đây là phục hồi lỗi tải, không phải polyfill toàn bộ ứng dụng cho trình duyệt quá cũ.

## Phần DNS cần thực hiện tại nhà cung cấp tên miền

1. Kiểm tra/sửa bản ghi `www` để trỏ tới cùng dịch vụ đang phục vụ tên miền gốc (thường CNAME `www` → `hovanggame.com`). Không thay IP tên miền gốc đang hoạt động nếu chưa kiểm chứng.
2. Dịch vụ HTTPS phải có chứng chỉ hợp lệ bao gồm `www.hovanggame.com` và nhận host đó. Sau đó chuyển `www` về `https://hovanggame.com`, giữ path/query. DNS riêng không bảo đảm chứng chỉ/virtual host đã đúng.
3. Kiểm tra lại HTTP/HTTPS cả hai tên miền và link được chia sẻ từ ứng dụng chat trên điện thoại thật.

Không SSH/deploy/đổi DNS trong nhiệm vụ này. Thay đổi local cần phát hành mới có tác dụng trên website công khai.

- 2026-11-10 device-entry kiểm chứng cuối:58/58tests5suite PASS; npm.cmd run build PASS gồmTypeScript/Vite/2postbuild; public/dist startup script SHA256 khớp. BrowserChrome local: chặn entry hoặc bootstrap đều hiện retry; bỏ chặn+bấmThửlại vàoLogin; normalLogin không bị overlay. LiveChrome/Edgedesktop +ChromiumemulationPixel7/iPhone13/iPadgen7 đếnLogin; không có testđăngnhập/gameplay/Safarithật. Khôngdeploy/SSH/DNS. wwwvẫnthiếuDNS, đang chờ thông tin nhà cung cấpDNS. Diffcheckindex.html báo blank trailingwhitespace cósẵn trongbackup, khôngchỉnh ngoài phạmvi.
