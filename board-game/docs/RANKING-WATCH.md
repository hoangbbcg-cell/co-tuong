# Vào xem từ Xếp hạng

- 2026-10-15: Người dùng mở riêng nút Vào xem và luồng vào phòng; giữ bố cục, avatar và phần còn lại của Xếp hạng.
- RankingViewButton dùng ảnh friend-action-button-frame.png hiện có (210×62, alpha0 ở góc, nội dung sát mép). Wrapper ôm ảnh h-fit/w-fit, padding/margin/border0, line-height0, shadow-none; bỏ bóng CSS hình chữ nhật gây cảm giác crop dư. Giữ kiểu chữ/icon và chiều rộng173×scale, ảnh giữ tỷ lệ.
- Tên/ELO/thứ hạng vẫn là fixture hiện có, chưa có API bảng xếp hạng. useRankingWatch đối chiếu tên người trong top với RoomSummary.playerNames và phase playing; chỉ phòng đang đấu mới hiện nút. Có phòng đang đấu cũng chứng minh người đó đang online; offline/online rảnh không có nút.
- Danh sách phòng dùng Query key rooms, chỉ bật/refetch5s khi dialog mở; observer theo thuộc tính open, đóng thì dừng poll. Trước khi vào xem lấy lại danh sách để tránh ván vừa hết/người đã rời.
- Bấm vào phòng thật bằng Socket room:join asViewer=true. Server kiểm tra phase đang chơi, luôn đưa vào viewers chứ không chiếm ghế. Không trừ/chặn năng lượng của khán giả. Bàn khóa vẫn dùng bảng nhập mật khẩu dùng chung và server kiểm tra mật khẩu.
- Frontend component không gọi API trực tiếp: hook quản lý Query/mutation/trạng thái mật khẩu/lỗi, thành công đóng bảng top và enterOnline. Home và Chọn Bàn dùng cùng RankingDialog; bỏ callback thông báo đang phát triển cũ.
- Cờ Úp chưa hỗ trợ phòng online trong project nên không bật Vào xem phòng Cờ Tướng ở tab Cờ Úp.
- Nhận diện top↔phòng theo tên là giới hạn hiện tại vì chưa auth/ID người dùng backend cho bảng xếp hạng; không tuyên bố dữ liệu ELO/thứ hạng đã trực tuyến.

Kiểm chứng: test DOM điều kiện nút, hook vào phòng thật/kiểm tra lại phòng đã hết/bàn khóa, server vai trò người xem và HTTP-Socket phòng. Chưa QA browser trực tiếp.
- 2026-10-15: Ngoại lệ xem thử tạm: top1 có nút mẫu khi không có phòng đang đấu, click không gọi socket mà hiện thông báo mẫu. Có phòng thật dùng watch như cũ. Thanh cuộn mảnh nâu vàng#92612d, track/corner trong suốt; gỡ nút mẫu khi kết thúc xem UI.

- 2026-10-15: Thumb thanh cuộn đổi trắng#fff theo yêu cầu, track/corner giữ trong suốt.
