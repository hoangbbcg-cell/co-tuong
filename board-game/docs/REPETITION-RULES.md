# Chống lặp chu kỳ phối hợp hai bên

Quy tắc cập nhật theo yêu cầu người dùng 2026-10-09.

- Chỉ một chu kỳ phối hợp được theo dõi tại một thời điểm. Một vòng gồm: bên bắt đầu đi quân của mình từ A→B; bên kia đi quân của mình D→E; bên bắt đầu quay B→A; bên kia quay E→D. Quân và cặp ô của từng bên phải giữ nguyên.
- Nước đầu tiên xác định `starter`. Chỉ hoàn tất vòng khi cả hai bên đi đúng nửa chu kỳ của mình. Một bên đảo quân riêng trong lúc đối thủ đi nước khác không làm tăng số vòng. Nước lệch chu kỳ ở bất kỳ bên nào xóa chu kỳ cũ và bắt đầu ứng viên mới từ nước lệch đó.
- Hai vòng đầu bình thường. Khi hoàn tất vòng 3, cảnh báo bên bắt đầu. Vòng 4 vẫn được hoàn thành. Khi bên bắt đầu định đi nước mở đầu của vòng 5, nước đó bị cấm trước commit.
- `GameState.repetition.cycle` lưu starter, shuttle (ID quân và hai ô) của mỗi bên, pha chu kỳ và số vòng đã hoàn tất. Snapshot game hiện có giữ trạng thái để undo rollback. Ván mới/rematch đặt `cycle` về null.
- Cảnh báo vòng3: “Cả hai bên đã lặp cùng một chu kỳ 3 vòng. Hãy chú ý.” Đây là một trạng thái thẻ chung của phòng: cả hai người chơi và khán giả đều thấy cùng lúc. Clock server dừng cho đến khi một trong hai người chơi bấm ngoài thẻ; thao tác đó đóng bảng và resume cho cả phòng. Khán giả chỉ xem, không thể đóng bảng.
- Không hiện thông báo cho người đang chọn/chạm chấm đỏ. Click bị chặn giữ selection, không đổi lượt/board/clock, animation hoặc sound; online gửi yêu cầu riêng để server xác thực và chỉ báo cho đối thủ. Thông báo đối thủ nằm ở dòng status thường, không pause clock.
- Cảnh báo vòng3 là bảng duy nhất ở giữa bàn, tồn tại đến khi một người chơi đóng; không tự timeout. Ở local, clock dừng đến lúc đóng. Online, `RoomSnapshot.repetitionNoticePaused` và `repetitionNoticeKind` đồng bộ bảng và clock với hai người chơi/khán giả; chỉ người chơi được dismiss.
- Gợi ý lấy các đích hợp lệ qua luật hiện hành rồi đánh dấu đích nước starter mở vòng 5 bằng chấm đỏ. Click online được server validate bằng `applyMoveWithResult`; không commit nước bị cấm.
- `applyMoveWithResult` dùng validation cờ tướng hiện có một lần, phân biệt nước sai luật và nước lặp bị cấm. Store, RoomService, máy cơ bản và Pikafish dùng chung trạng thái/helper.
- Không áp dụng luật đuổi quân. Đây là luật lặp chu kỳ phối hợp riêng, không xử hòa/thua.
- Fixture test thủ công hiện dùng máy Đỏ đi trước, người dùng cầm Đen; cả hai bên shuttle Pháo hàng ngang giữa cột1↔4. Máy chờ người dùng đóng bảng cảnh báo vòng3 để kiểm tra đồng bộ; đây không phải cấu hình gameplay mặc định.
- Quy tắc mới 2026-10-09: chỉ tính chu kỳ đi quân qua lại không tạo chiếu. Nếu một nước trong chu kỳ làm đối thủ bị chiếu, chu kỳ hiện tại bị xóa và nước đó không khởi tạo chu kỳ mới; không có luật chiếu lặp, cảnh báo hoặc phạt riêng.
