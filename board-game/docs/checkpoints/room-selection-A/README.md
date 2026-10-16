# Bản A — Chọn Bàn, 2026-10-10

Lưu theo yêu cầu người dùng trước khi thử đổi sắc nâu/độ trong suốt khung danh sách.

- `RoomSelection.tsx.snapshot`: toàn bộ component tại thời điểm lưu A.
- Nền khung danh sách bản A: `bg-[#2C1408]/65` (alpha65%, trong suốt35%).
- Khi yêu cầu hoàn tác màu khung về A, khôi phục đúng class nền này; giữ các thay đổi khác phát sinh sau đó trừ khi người dùng yêu cầu hoàn tác toàn component.
- Không ghi đè snapshot A khi thử tiếp các phiên bản.
