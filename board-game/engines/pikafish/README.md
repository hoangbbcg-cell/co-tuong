# Pikafish cho Chơi Với Máy

Đã cài bản chính thức **Pikafish 2026-09-06**, Windows x86-64 universal,
cùng `pikafish.nnue`. Không cần cài package npm.

- Nguồn: https://github.com/official-pikafish/Pikafish/releases/tag/Pikafish-2026-09-06
- Mã nguồn tương ứng: https://github.com/official-pikafish/Pikafish/tree/Pikafish-2026-09-06
- Gói: `Pikafish.2026-09-06.7z` (53,603,424 bytes).
- SHA-256: `41952bbfe2520faceb5902c69e6ab4845cc999841d2b49a95cc1be7867a25e5b`.
- Engine dùng GPL-3.0: xem `Copying.txt` và `AUTHORS` đi kèm.
- **NNUE có giấy phép riêng**: xem `NNUE-License.md`; mạng đi kèm không cho phép
  sử dụng thương mại nếu chưa được tác giả cho phép. Khi phân phối engine,
  giữ giấy phép và cung cấp mã nguồn tương ứng theo GPL.

## Chạy

Từ `board-game/`, chạy `npm.cmd run dev`, hoặc `npm.cmd run build` rồi
`npm.cmd start`. Vào Home → Chơi Với Máy → Pikafish → chọn bên → Đấu ngay →
Sẵn sàng. Máy của phe đối diện người chơi lấy từ ô chọn của phe đó.
Pikafish là lựa chọn đầu tiên/mặc định ở cả hai ô; Máy · Cơ bản vẫn chọn được.
Chơi nhanh và Cờ Úp vẫn dùng máy cơ bản.

Engine chạy trên **backend**, không nằm trong bundle trình duyệt. API riêng
`GET /api/pikafish/ready` kiểm tra cả việc tìm nước/nạp NNUE;
`POST /api/pikafish/move` nhận lịch sử UCI và thời gian còn lại của ván local.
Server dựng lại thế cờ từ khai cuộc, xác thực mọi nước đi và kết quả engine.
API này không thay đổi phòng hoặc snapshot online.

Mặc định tối đa 4 luồng CPU, 128 MB hash mỗi tiến trình, MultiPV mặc định 1,
không hạ cấp sức mạnh. Mỗi nước nghĩ tối đa 1 giây, giảm theo thời gian còn lại.
Sức mạnh thực tế phụ thuộc CPU và thời gian tính; không cam kết ELO.
Tối đa 2 tiến trình đồng thời; timeout 15 giây; tối đa 500 nửa-nước/lịch sử.
Mỗi yêu cầu dùng tiến trình riêng để cô lập ván và hủy an toàn. Không giữ hash
giữa các lượt. Rời bàn/reset/kết thúc ván hủy request và dừng tính toán;
lỗi hiện thông báo và nút thử lại, không âm thầm chuyển sang máy cơ bản.

## Cài lại / máy chủ khác

Tải đúng gói từ release phía trên, xác minh SHA-256 rồi giải nén vào thư mục
này. Windows cần `Pikafish-Windows-x86-64-universal.exe`, `pikafish.nnue`,
`Copying.txt`, `NNUE-License.md`, `AUTHORS`. Bản universal tự chọn CPU phù hợp.
Linux/macOS: dùng binary tương ứng từ cùng gói, cấp quyền chạy và đặt
`PIKAFISH_PATH` đến binary; `PIKAFISH_EVAL_FILE` đến NNUE nếu dùng vị trí khác.
Các biến này là cấu hình tiến trình server, không phải biến VITE.
Backend mặc định Linux tìm `pikafish` trong thư mục này.
Đặt NNUE cạnh binary với tên ASCII để tránh lỗi đường dẫn Unicode trên Windows.

`npm.cmd test -- tests/pikafish.test.ts` có kiểm thử engine thật khi đã cài bản
Windows; các kiểm thử chuyển tọa độ và từ chối input luôn chạy.
