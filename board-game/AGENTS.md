- 2026-10-22: Theo yêu cầu người dùng, riêng Xếp hạng mobile phóng nội dung từng dòng1.5×, gồm huy hiệu top1–4/avatar/tên/điểm/nút; để khoảng6 dòng. Biển tiêu đề tăng12%, hai tab Cờ Tướng/Cờ Úp tăng40%, nhãn cột đồng scale1.5× cho thẳng hàng. Elo trong hàng thu về1.35× và dịch phải36px theo scale dialog; cột Elo122×eloScale. Tên mobile cho xuống dòng đầy đủ, chữ và số cùng font/cỡ. Dock Home mobile dùng nút12.5cqw/nhãn3.6cqw. Laptop giữ nguyên. Bố cục còn khóa lại sau task.

- 2026-10-23: Bạn bè laptop giữ nguyên giao diện trước lượt đồng bộ Xếp hạng, đã khôi phục riêng qua FriendsDialogFrame nhánh desktop. User khóa laptop; các chỉnh Bạn bè tiếp theo mặc định chỉ mobile nếu không mở laptop rõ.

- 2026-10-22: Nút đóng Xếp hạng/Bạn bè/Lịch sử dùng chung DialogCloseButton. Trên compact vùng bấm72px, dấu56px theo scale dialog; desktop56/42 theo scale; mobile bo góc12px cố định như Xếp hạng và cùng buttonInteraction.

- 2026-10-16: Tên Guest hiển thị mới dùng “Kỳ thủ” + 5 số random; guest_code nội bộ DB vẫn 6 số để giữ unique/schema. Guest cũ 6 số vẫn được validate để tương thích, tên tự sinh cũ trong DB chỉ đổi display_name/search_name, không xóa hồ sơ/dữ liệu. Cách vào trên thiết bị mới (tự vào Guest hay hiện màn chọn) đang chờ người dùng làm rõ.
- 2026-10-21: User hủy yêu cầu khóa xoay điện thoại; đã gỡ tự khóa portrait và tự bật fullscreen.
- 2026-10-16 (đính chính): Tên hiển thị Guest mới phải là “Guest” + 5 chữ số random (ví dụ Guest04217), không phải “Kỳ thủ”. guest_code nội bộ vẫn 6 số; tên cũ vẫn được validate tương thích. Đã đổi lại tên Guest cũ trong DB từ Kỳ thủxxxxx sang Guestxxxxx, giữ toàn bộ dữ liệu.
- 2026-10-22: Home desktop/mobile: rê vào vùng năng lượng chỉ hiện thông báo thời gian hồi; rời vùng thì ẩn. Chỉ nút dấu cộng mở EnergyDialog mua năng lượng.
- 2026-10-22: Bút đổi tên chỉ hiện trong hồ sơ chính mình khi đã liên kết/Google và chưa đổi tên thành công. Guest không có bút; backend giữ quyền đổi một lần. Hủy/lỗi không mất quyền; thành công tải lại account/dữ liệu và ẩn bút. Xem docs/ACCOUNT-MODEL.md.
