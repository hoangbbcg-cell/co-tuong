# Artwork bàn trong danh sách

- Bàn: nguồn người dùng `998873f2-4e94-4eb1-807e-40dcbd926489.png`, giữ bản gốc tại `../references/uploads/room-tables/board-source.png`.
- Người chơi: nguồn `07100236-8b2c-46b7-a762-41aa66c18726.png`, giữ tại `../references/uploads/room-tables/players-source.png`; chia hai nửa ảnh rồi trim riêng.
- Runtime: table-board.png934×922, table-player-blue.png648×585, table-player-red.png614×573. Crop theo bounding box pixel alpha>8, giữ tỷ lệ/màu/chi tiết gốc.
- RoomTableGrid dùng4 cột, chiều cao mỗi hàng bằng (vùng danh sách−16px)/3; gap8px. Tất cả ô là bàn thường; khi trống dùng12 bàn mẫu xem thử, khi có phòng lấy dữ liệu thật. Ghế hiện theo players; không tự thêm tiền cược vì dữ liệu phòng chưa có trường đó.
- Tab “Còn trống” chỉ hiển thị phòng có đúng1 người đang ngồi và chưa chơi; `RoomSummary.players` chỉ đếm người ngồi, không gồm viewers. Khi đang xem mẫu, tab này lọc còn các bàn mẫu một người.
- Tab “Tất cả” vẫn giữ thẻ phòng có khán giả dù `players` bằng0; số ghế/icon không tính khán giả. Chỉ ẩn phòng hoàn toàn không có người chơi lẫn khán giả. Preview chỉ bật khi API thật không có phòng nào, không bật chỉ vì bộ lọc hiện tại trả về rỗng.
- Thẻ thật bấm vào sẽ vào/xem đúng phòng qua `onJoin(room.id)`; bàn mẫu mở demo cục bộ xem hai máy tự đấu; nếu người xem xếp hàng thì được thay Đen sau3 nửa-nước và tiếp tục đấu Đỏ; nếu không có người chờ, Đỏ thắng. Hàng chờ demo là cục bộ, không gọi join/API online. Icon mắt phía trên bàn, nằm ngoài artwork và cách bàn5px, hiển thị tổng người trong phòng (`players + viewerCount`), gồm người chơi và khán giả; hình ghế/tên vẫn chỉ theo players.
- Sau khi áp dụng bộ lọc, sắp xếp bàn theo tổng người trong phòng giảm dần (`players + viewerCount`); nếu bằng nhau giữ thứ tự tạo phòng do `RoomRepository` Map cung cấp, nên phòng cũ đứng trước.
- Thanh cuộn RoomTableGrid dùng gutter ổn định, đặt sát mép trong khung; chỉ xuất hiện khi danh sách thực sự tràn, không làm lưới dịch ngang.
- Thẻ phòng hiện thời lượng và tên ghế đầu theo playerNames. Vùng hình cao78% thẻ; bàn theo chiều cao thực, aspect934/922. Người cao45% bàn, width:auto, neo sát hai cạnh bàn với khoảng hở3px; không dùng slot rộng/object-contain làm hình cách xa bàn.

- 2026-10-15: Bàn khóa: nguồn ../references/uploads/65c16869-b75b-45de-a4b3-d810d8036a6a.png; runtime table-board-locked.png crop(107,140,1041,964) theo alpha>16, góc alpha0, giữ pixel/màu/tỷ lệ. Hiển thị object-contain trong slot bàn chung.
