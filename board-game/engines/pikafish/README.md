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
tự bắt đầu (khai cuộc1,3 giây). Biển Pikafish cố định, chọn sức mạnh bằng cấp1–10.
Chơi nhanh và Cờ Úp vẫn dùng máy cơ bản.

Engine chạy trên **backend**, không nằm trong bundle trình duyệt. API riêng
`GET /api/pikafish/ready` kiểm tra cả việc tìm nước/nạp NNUE;
`POST /api/pikafish/move` nhận lịch sử UCI và thời gian còn lại của ván local.
Server dựng lại thế cờ từ khai cuộc, xác thực mọi nước đi và kết quả engine.
API này không thay đổi phòng hoặc snapshot online.

## 10 cấp độ (2026-10-13)

Đã đọc `uci` trực tiếp từ binary cài tại đây; bản ghi ở `uci-options.txt`.
Bản này **không có Skill Level/UCI_Elo**. Threads hỗ trợ1–1024, Hash1–33554432 MB;
EvalFile là string. Service đọc lại options ở mỗi handshake, chỉ set option thực sự
được quảng bá và clamp theo min/max. Không dựa vào giả định cho binary thay thế.

Config chuẩn: `server/services/pikafishLevels.ts` (`PIKAFISH_LEVELS`).

| Cấp | Giới hạn search chính | Deadline server (ms) | Threads tối đa | Hash MB |
|---|---|---:|---:|---:|
|1|depth1|80|1|16|
|2|depth2|120|1|16|
|3|depth3|180|1|16|
|4|nodes4096|250|1|32|
|5|nodes16000|350|1|32|
|6|nodes40000|500|1|64|
|7|nodes100000|700|1|64|
|8|nodes200000|1000|2|128|
|9|nodes400000|1500|2|128|
|10|movetime2500|2500|4|128|

Mỗi `go` chỉ có một limit chính; không ghép depth/nodes/movetime. Deadline server
gửi `stop` nếu engine chưa trả nước, giảm còn tối đa remainingMs/30 (sàn50ms)
để giữ dư clock. Threads còn bị giới hạn bởi số CPU khả dụng. Cấp10 không giới hạn
depth/nodes, dùng sức mạnh engine trong ngân sách2,5 giây; không có nghĩa phân tích
vô hạn. Cấp thấp có thể bỏ sót nước vì tìm ít nodes, không tự chèn nước sai luật.
Các mức là cấu hình khởi đầu; chưa đo ELO hoặc chứng minh mức5 phù hợp mọi người mới.
Sức mạnh thực tế phụ thuộc CPU/thế cờ. Level lưu trong session khi chọn và gửi mỗi search.

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

## Sai số có kiểm soát (2026-10-13)

MultiPV được bật theo số ứng viên trong PIKAFISH_MOVE_WEIGHTS tại server/services/pikafishCandidates.ts, chỉ khi engine quảng bá option. Cấp1–3 dùng depth1/2/3 với deadline80/120/180ms: nodes64 không đủ hoàn thành top5 trong test engine thật. Cấp4–10 giữ ngân sách cũ. Không ghép nhiều limit chính trong go.

Xác suất top1..5: cấp1 [20,25,25,20,10]; cấp2 [45,30,15,10]; cấp3 [65,25,10]; cấp4 [75,20,5]; cấp5 [85,12,3]; cấp6 [93,7]; cấp7 [97,3]; cấp8 [99,1]; cấp9 [99.5,0.5]; cấp10 [100].

Lấy vòng MultiPV hoàn chỉnh mới nhất, không trộn các depth. Chỉ lấy nước hợp lệ cho đúng phe, không lặp bị cấm. Loại nước cho đối thủ thắng ngay ở một nước nếu có ứng viên tránh được; loại mate âm khi có lựa chọn không thua mate, ưu tiên mate thắng khi tìm được; loại nước kém đánh giá tốt nhất hơn300cp. Giữ trọng số theo hạng ban đầu và chuẩn hóa các ứng viên còn lại, kể cả khi engine chưa trả đủ PV. Nếu không có PV dùng bestmove và vẫn xác thực luật; không random ngoài candidates. Cấp10 luôn dùng bestmove của engine. Bộ lọc không đảm bảo tránh mọi chiến thuật sâu hoặc lỗi đánh giá ở depth thấp.
