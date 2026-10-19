# Máy giả thử thưởng — 2026-10-19

Theo yêu cầu người dùng: Home có hai nút Máy giả Cờ Tướng / Máy giả Cờ Úp ở góc dưới trái. Người chơi cầm Đỏ, đi hai nước hợp lệ; máy đáp lại sau nước đầu và nhường thắng sau nước thứ hai. Đây là luồng thử riêng, không đổi Chơi nhanh/Chọn bàn hoặc Pikafish.

Luồng: Home/useTestBot → accountApi → accountController (cookie auth + kiểm tra Origin hiện có) → TestBotService → TestBotRepository → MySQL. Dùng lại GamePage/Board và popup kết quả. Không thêm dependency hoặc migration.

- API POST `/api/account/test-bot` nhận variant xiangqi/jieqi, trả UUID và snapshot do server tạo. Một ván thử hiện hành/tài khoản, hết hạn sau 30 phút, runtime RAM mất khi restart server.
- POST `/api/account/test-bot/:id/move` nhận move và requestId UUID; server kiểm tra chủ ván, nước đi bằng engine chung, thực hiện nước máy và đếm hai nước của người chơi. Client không khai winner, board hoặc giá trị thưởng.
- Sau hai nước, server xử máy nhường thắng (`resign`) và chọn ngẫu nhiên 125–150 vàng. TestBotRepository lock user/resource, tăng số dư + ledger `test_bot_win` trong một transaction. Key `test-bot:{userId}:{matchId}` unique chống cộng trùng. Service serialize yêu cầu từng ván/cache request; cùng UUID khác nước bị chặn. Lỗi ghi DB rollback và cho retry cùng request cuối với cùng số thưởng.
- Client cập nhật account từ profile API thật, hiện số vàng trong ô Vật phẩm của popup, trở về Home vẫn thấy số dư mới. Response ván cũ/tài khoản cũ bị bỏ qua khi rời ván/đổi tài khoản.
- Ngoại lệ thử nghiệm riêng: không trừ năng lượng, không cập nhật Elo/thắng-thua PvP/giải đấu, không tạo user hoặc phòng online giả, không phát presence hay mời người khác vào. Sẵn sàng sau ván tạo một ván máy giả mới. Không thay luật thưởng đấu thật.
- Bản cập nhật cần tải lại trang; nếu backend chạy `npm start` không có watch thì restart backend để có route mới.

Kiểm chứng: unit service (hai variant, quyền sở hữu ván, chống trùng, retry khi DB lỗi); React useGame→useTestBot→account update; MySQL tạm qua scripts/mysql-integration-qa.mjs (HTTP auth, cả hai variant, profile reload, duplicate, rollback). Không buff thử tài khoản thật. Browser QA được ghi trong PROGRESS.md theo kết quả thực tế.
