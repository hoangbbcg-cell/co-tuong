# Máy giả thử thưởng — 2026-10-19

Cập nhật: máy giả trình diễn cả hình và âm thanh chiếu bí trước khi mở popup thưởng. Bảng đợi tín hiệu hoàn tất hình và cả hai lớp audio onended; kết quả nghiệp vụ vẫn là máy nhường thắng (`resign`), không ép luật cờ hoặc kết quả PvP thành chiếu bí.

Theo yêu cầu người dùng: Home có hai nút Máy giả Cờ Tướng / Máy giả Cờ Úp ở góc dưới trái. Người chơi cầm Đỏ, đi hai nước hợp lệ; máy đáp lại sau nước đầu và nhường thắng sau nước thứ hai. Đây là luồng thử riêng, không đổi Chơi nhanh/Chọn bàn hoặc Pikafish.

Luồng: Home/useTestBot → accountApi → accountController (cookie auth + kiểm tra Origin hiện có) → TestBotService → TestBotRepository → MySQL. Dùng lại GamePage/Board và popup kết quả. Không thêm dependency hoặc migration.

- API POST `/api/account/test-bot` nhận variant xiangqi/jieqi, trả UUID và snapshot do server tạo. Một ván thử hiện hành/tài khoản, hết hạn sau 30 phút, runtime RAM mất khi restart server.
- POST `/api/account/test-bot/:id/move` nhận move và requestId UUID; server kiểm tra chủ ván, nước đi bằng engine chung, thực hiện nước máy và đếm hai nước của người chơi. Client không khai winner, board hoặc giá trị thưởng.
- Sau hai nước, server xử máy nhường thắng (`resign`) và chọn ngẫu nhiên 125–150 vàng. TestBotRepository lock user/resource, tăng số dư + ledger `test_bot_win` trong một transaction. Key `test-bot:{userId}:{matchId}` unique chống cộng trùng. Service serialize yêu cầu từng ván/cache request; cùng UUID khác nước bị chặn. Lỗi ghi DB rollback và cho retry cùng request cuối với cùng số thưởng.
- Client cập nhật account từ profile API thật, hiện số vàng trong ô Vật phẩm của popup, trở về Home vẫn thấy số dư mới. Response ván cũ/tài khoản cũ bị bỏ qua khi rời ván/đổi tài khoản.
- Ngoại lệ thử nghiệm riêng: không trừ năng lượng, không cập nhật Elo/thắng-thua PvP/giải đấu, không tạo user hoặc phòng online giả, không phát presence hay mời người khác vào. Sẵn sàng sau ván tạo một ván máy giả mới. Không thay luật thưởng đấu thật.
- Bản cập nhật cần tải lại trang; nếu backend chạy `npm start` không có watch thì restart backend để có route mới.

Kiểm chứng: unit service (hai variant, quyền sở hữu ván, chống trùng, retry khi DB lỗi); React useGame→useTestBot→account update; MySQL tạm qua scripts/mysql-integration-qa.mjs (HTTP auth, cả hai variant, profile reload, duplicate, rollback). Không buff thử tài khoản thật. Browser QA được ghi trong PROGRESS.md theo kết quả thực tế.

- 2026-10-20: Xem thử theo user: cả hai Máy giả cho người chơi Đỏ thua sau 2 nước hợp lệ (winner black/resign), không cộng hoặc trừ vàng. Giữ popup/chiếu bí/audio và khóa đóng 1s. Thay tạm luồng thắng thử trước đó; không đổi PvP/Pikafish. 13/13 test service/result PASS; typecheck/build PASS, chưa browser QA/DB integration lượt này.


- 2026-10-20: Sửa mất animation Máy giả: useTestBot trước gán snapshot animation:null. Nay sau API xác nhận, trình diễn nước Đỏ qua applyMoveWithResult/animation dùng chung, chờ PIECE_MOVE_DURATION_MS rồi snapshot+nước đáp máy; nước cuối giữ animation nước Đỏ. Khóa chọn khi animation, guard id/account/animationVersion bỏ phản hồi sau reset/rời. Không đổi kết quả thua thử hoặc DB/luật thưởng. 15/15 tests test-bot-ui/service/match-result PASS gồm animation cả2variant; typecheck/build PASS, dist cập nhật. Chưa browser QA.


Trạng thái 2026-10-20: Hai nút khởi chạy Máy giả đã được gỡ khỏi Home theo yêu cầu. Endpoint/service test-bot còn trong backend nhưng UI không còn entry point.

