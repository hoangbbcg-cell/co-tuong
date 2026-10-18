# Bàn khóa và mật khẩu

Triển khai2026-10-15, thay bản UI xem trước trước đó.

- Chọn Bàn: ba mục Tất cả, Còn trống, Bàn khóa từ trái sang phải. Bàn khóa chỉ lọc phòng có locked=true trong khu vực đang chọn. Tất cả gồm cả bàn mở và khóa; Còn trống giữ quy tắc một người ngồi/chưa đấu. Bàn khóa không tạo bàn mẫu giả khi danh sách trống.
- Tạo bàn bật Bàn khóa thì bắt buộc mật khẩu1–64 ký tự. Tắt thì tạo bàn mở. Người tạo tự vào bằng mật khẩu vừa nhập. Mật khẩu so sánh chính xác, không tự trim/đổi chữ hoa/thường.
- Bấm bàn khóa mở RoomPasswordDialog dùng chung Chọn Bàn/LobbyDialog: nhập đúng mới vào; sai giữ bảng và hiện lỗi. Giữ input hiện chữ theo yêu cầu hiện hành; tắt autocomplete. Hủy/Escape đóng khi không đang gửi; Tab giữ focus trong bảng.
- HTTP create nhận password tùy chọn; Socket room:join gửi password tùy chọn. RoomService xác thực trước khi thêm ghế/người xem. Người xem cũng phải nhập mật khẩu; thành viên đang ở phòng có thể nhận lại snapshot mà không nhập lại.
- RoomSummary/RoomSnapshot chỉ chứa locked, không chứa mật khẩu/salt/hash. RoomService dùng scrypt với salt ngẫu nhiên và timingSafeEqual; RoomRepository giữ salt/hash trong Map riêng và xóa cùng phòng. Không thêm database/auth/dependency.
- Chơi nhanh ở Home/Chọn Bàn luôn bỏ qua bàn khóa. Lời mời vào phòng đang khóa không bypass mật khẩu: báo vào từ Chọn Bàn trước khi thay đổi phòng người nhận. Không tự rời phòng cũ nếu chưa xác thực đích.
- Sai mật khẩu là lỗi nghiệp vụ, không ngắt/reconnect socket; giữ kết nối hiện tại để nhập lại.
- RAM giữ theo vòng đời server như phòng hiện có. Khởi động lại server xóa phòng/mật khẩu theo kiến trúc hiện hành.

Kiểm chứng: unit service kiểm tra mật khẩu sai/thiếu/đúng ở cả ghế và người xem, giới hạn, không lộ secret qua JSON, giữ khóa sau reset; hook/UI kiểm tra lọc theo khu vực và gửi đúng mật khẩu; HTTP/Socket thật kiểm tra create→sai→đúng. QuickRoom/challenge/server regression liên quan cũng qua. Chưa QA trình duyệt trực tiếp.
- 2026-10-15: Bàn khóa dùng room-selection/table-board-locked.png từ65c16869, crop107,140,1041,964; bàn mở giữ ảnh cũ. Áp dụng cả Tất cả/Còn trống/Bàn khóa thông qua RoomTableGrid.
- 2026-10-16: Kết thúc xem thử bàn mẫu Chọn Bàn theo yêu cầu dữ liệu thật. RoomTableGrid chỉ dùng rooms API đã lọc khu vực/trạng thái, bỏ22 previewRooms và đường vào demo. Không có phòng hiện rỗng, không giả người/bàn; Tạo/vào/khóa/ghép nhanh giữ server thật.
