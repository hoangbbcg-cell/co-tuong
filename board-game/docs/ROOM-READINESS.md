# Sẵn sàng và hàng chờ phòng online

Quy tắc chốt2026-10-15, server là nguồn sự thật.

- Người thua ván thường vẫn xuống cuối hàng chờ, đầu hàng lên bàn theo quy tắc hiện hành (3 giây nếu đã chờ trước kết thúc ván; vào hàng sau kết thúc thì lên ngay khi đủ điều kiện).
- Luật Sẵn sàng dưới đây áp dụng cho hai người đang ngồi trên bàn, chỉ khi còn ít nhất một khán giả đang xếp hàng. Khán giả không xếp hàng không kích hoạt luật.
- Không có ai xếp hàng: cả hai chưa Sẵn sàng hoặc chỉ một người Sẵn sàng đều được chờ tự do, không tự bắt đầu/không xử thua.
- Có hàng chờ và cả hai chưa Sẵn sàng: cặp mới chờ10 giây, sau đó server công bố readyCountdown từ20 giảm dần. Hết20 giây tự bắt đầu; giữ khai cuộc1300ms. Hàng chờ mới xuất hiện bắt đầu thời gian chờ tại lúc có hàng chờ, không phạt hồi tố thời gian chưa có người chờ.
- Một người Sẵn sàng: ẩn countdown và bắt đầu đếm ngầm30 giây từ lần bấm đầu tiên. Bấm lại không kéo dài. Người còn lại Sẵn sàng đúng hạn thì bắt đầu ngay. Nếu thời gian chờ đang bị hủy vì không còn hàng chờ, hàng chờ xuất hiện lại sẽ mở mốc chờ mới.
- Hết30 giây mà người kia chưa Sẵn sàng: không xử thua, không tạo kết quả/ván đấu mới; giữ kết quả ván trước nếu có; đưa người đó xuống khán giả (queued=false), đưa người đầu hàng vào đúng ghế. Người đã Sẵn sàng giữ trạng thái đó; người mới lên nhận mốc chờ riêng nếu còn hàng chờ. Ghi tin hệ thống lý do chuyển xuống khán giả.
- Rời hàng/rời phòng hết người chờ thì hủy cả countdown và mốc chờ. Đổi cặp, bắt đầu ván hoặc rời phòng xóa mốc cũ. Không cho reset khi đang chờ đấu có hàng chờ để tránh bỏ qua mốc.
- Bảng xanh Sẵn sàng nằm trên các lớp avatar/kết quả; chỉ hiển thị trong phase ready. Nút giữa bàn ẩn sau khi người đó Sẵn sàng, không thay bằng chữ chờ đối thủ. Số đếm nằm trên nút, không cản click.

Triển khai: RoomService.updateReadyWait và tick; RoomSnapshot.readyCountdown; GamePage/Board/PlayerCard. Thời gian nội bộ dùng đồng hồ monotonic của server; client chỉ hiển thị số nhận từ snapshot. Không áp dụng ép Sẵn sàng cho máy/local/demo hoặc replay.

Kiểm chứng: tests/room-readiness.test.ts dùng đồng hồ giả kiểm tra mốc10/20/30, FIFO, cả hai ghế, hủy khi hết hàng chờ, không kéo dài bằng ready/reset, và đổi ghế sau ván. Các test cấu hình thời gian/HTTP-Socket/lời mời liên quan cũng qua. Chưa QA browser trực tiếp.
## Xem thử tạm2026-10-15
Người dùng yêu cầu bật preview ở bàn mẫu Chọn Bàn: vào là hiện20 và đếm ngay, hết20s bắt đầu hai máy. Đây là ngoại lệ UI local dùng useDemoReadyCountdown; không đổi server, không ghi room hoặc tác động replay/trial. Rời bàn hủy timer. Gỡ sau khi người dùng kết thúc xem thử.

- 2026-10-15: Số countdown dùng text-black, font-number72×scale, không bóng chữ; online và demo dùng chung Board.
- 2026-10-16: Bàn online chưa đủ2 ghế có người thì ẩn nút Sẵn sàng. Lưu thế cờ chỉ khả dụng sau ít nhất1 nửa-nước (match.moveCount>0), disabled nút và guard callback khi0; áp dụng GamePage chung online/local/replay/trial. Không đổi đồng hồ/ready server.
