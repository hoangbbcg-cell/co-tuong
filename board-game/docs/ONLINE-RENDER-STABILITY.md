# Ổn định render snapshot online — 2026-11-05

User báo cả giao diện nháy khi đi quân online. Chưa có bản quay/profile GPU để kết luận toàn bộ nguyên nhân hiển thị.

Đã tái hiện bằng regression: ACK cùng dữ liệu vẫn thông báo store, clock snapshot tạo lại bàn/quân/ghế, quân đứng yên mất reference. Trước sửa: 3/4 test snapshot không đạt.

- `shareRoomSnapshot` giữ reference cho các nhánh JSON live không đổi, không sửa snapshot cũ/mới; ACK trùng không phát store update khi các trường không đổi. Không deep-walk lastCompletedMatch vì có thể chứa hàng trăm bàn cờ.
- `sessionStore.receiveRoom` vẫn áp dụng mọi dữ liệu authoritative, gồm takeback, ready, queue và result; chỉ bỏ cập nhật hoàn toàn giống nhau.
- App chỉ subscribe phase/room/seat key cần cho vòng đời; đọc snapshot hiện tại khi xử lý đổi ghế. Clock/move không render lại route shell. GamePage/clock vẫn nhận snapshot mới qua subscription riêng.
- Không đổi luật, Socket.IO/server, clock, animation timing, âm thanh, hình học/avatar hoặc giao diện đã chốt.

Kiểm chứng: 22/22 test trên 8 suite PASS (snapshot4, animation4, route shell1, vòng đời/kết quả/store13); typecheck và Vite build PASS. Chưa browser/GPU/hai thiết bị QA, chưa deploy VPS. Không kết luận đã loại mọi nháy GPU trước khi user thử lại.

Backup: outputs/backups/online-render-stability-20261105/App.tsx và sessionStore.ts. Rollback hai file từ backup, bỏ helper mới src/lib/roomSnapshot.ts nếu hoàn tác toàn bộ.