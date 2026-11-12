# Cấu hình thời gian tạo bàn — 2026-11-11

Theo yêu cầu người dùng, bổ sung ván 1 và 2 phút; danh sách chung là 1, 2, 3, 5, 10, 15, 30 phút. Chọn Bàn dùng cùng danh sách để tìm được các bàn mới; mặc định 10 phút giữ nguyên.

Giới hạn mỗi nước vẫn chọn từ 30, 60, 90, 120 giây nhưng không được lớn hơn thời gian ván ban đầu. Ván 1 phút có 30/60 giây; ván 2 phút trở lên giữ các lựa chọn hiện có. Khi giảm thời gian ván, form tự hạ lựa chọn đang vượt giới hạn. Server xác thực lại và từ chối cấu hình vượt giới hạn.

Tích lũy chọn Không (0, mặc định) hoặc 1–10 giây. Server lưu `RoomSnapshot.incrementSeconds`, game lưu `incrementMs` và trần `initialTimeMs` khi bật tích lũy. Ngay khi nước hợp lệ được áp dụng, cộng số giây đã chọn vào thời gian còn lại của bên vừa đi, tối đa bằng thời gian ban đầu của mỗi bên. Không cộng cho nước sai, nước bị cấm lặp, nước sai lượt hoặc đã hết giờ. Không được vượt mốc ban đầu. Ví dụ chọn 1 phút, còn 58 giây và tích lũy 5 giây thì lên đúng 60 giây; còn 40 giây thì lên 45 giây. Đây là quy tắc người dùng đính chính ngày 2026-11-11, thay cách cộng không giới hạn trước đó; giới hạn mỗi nước vẫn theo cấu hình ban đầu.

Áp dụng bàn Cờ Tướng, Cờ Úp và thế cờ riêng. Tạo lại ván trong phòng giữ cấu hình, khởi tạo lại số dư đồng hồ ban đầu. Đi lại khôi phục snapshot trước nước nên bỏ phần tích lũy của các nước bị hoàn tác. Không thay clock local/máy khi game không có `incrementMs`.

Luồng: CreateRoomForm → useLobby → roomApi → roomController → RoomService → engine `applyMoveWithResult`. Tham số mới thêm ở cuối các chữ ký để giữ caller cũ. DB lưu cấu hình trong `initial_state` JSON đã có; không thêm migration. Không đổi năng lượng, Elo, vàng, quy tắc Ready, timeout hay luật quân đi.

Đây là thay đổi cả frontend và backend/engine. Khi triển khai VPS phải cập nhật đồng bộ backend; không dùng gói chỉ cập nhật giao diện của task animation trước. Task này chỉ sửa và kiểm chứng local, chưa triển khai VPS.

Kiểm chứng lượt thêm cấu hình ban đầu: 79/79 test trên 8 suite gồm HTTP/controller thật, service, clock, đi lại, thế riêng, UI và hồi quy rules/store; TypeScript PASS. Chrome form thật 9 trường hợp trên desktop/mobile × thường/khóa/thế riêng PASS, không chồng nút và các trường có thể cuộn tới. Ảnh/nhật ký và backup tại `.checkpoints/room-time-increment-20261111` ở gốc repository. Chưa kiểm tra MySQL/thiết bị thật trong task này.

Đính chính trần tích lũy theo người dùng: `initialTimeMs` được server chốt từ số phút đã chọn cho mỗi bên, giữ qua reset/rematch/thế riêng và snapshot đi lại. Engine cộng trong cùng bước áp dụng nước đi hợp lệ, không chờ hết animation; số dư sau cộng = min(thời gian ban đầu mỗi bên, thời gian còn lại + tích lũy). Không cộng vào giới hạn từng nước. Trial có đồng hồ riêng 10 phút thì dùng trần riêng đó, không sửa snapshot nguồn. Kiểm chứng quy tắc mới: 94/94 test trên 9 suite và TypeScript PASS.

- 2026-11-12: Nhãn tích lũy trên bàn dùng IncrementBadge tròn20px, số giây + s (0s khi không bật). Laptop bên phải khung đồng hồ cách7px; mobile thay đồng hồ cát giữa2đồng hồ. Lấy game.incrementMs/1000, đồng bộ live/xem lại; không đổi cách cộng thời gian hoặc clock/avatar.

## 2026-11-12 — Bố cục hai ô và menu tích lũy

Điện thoại: Thời gian nước đi và Thời gian tích lũy cùng một hàng, hai cột bằng nhau; vẫn giữ select native mobile. Laptop: riêng tích lũy dùng menu tùy chỉnh luôn mở dưới trường, cuộn danh sách Không/1–10 giây. Menu portal ngoài khối clip của sảnh, theo tọa độ field thực tế, tính cả scale canvas; chọn bằng chuột/phím, Escape/click ngoài đóng. Không thay giá trị mặc định, giới hạn mỗi nước hoặc luật cộng tích lũy có trần.

Chrome kiểm tra 9 trường hợp laptop/mobile × thường/khóa/thế riêng: hai trường cùng hàng, menu mở xuống trong viewport, đủ 11 lựa chọn, chọn 10 giây được chuyển đúng vào tạo bàn. Chưa kiểm tra điện thoại thật.

- 2026-11-12 theo user tăng nhẹ huy hiệu tích lũy: IncrementBadge chung đường kính20→22px, số10→12px, chữs8→11px. Áp dụng tự động laptop/mobile/live/replay; giữ neo/gap7px và gridmobile, không đổi đồng hồ/avatar/luật. Badge22px vẫn vừa khe24px giữa hai đồng hồ mobile, còn1px mỗi phía. Backup .checkpoints/increment-badge-size-20261112. Đối chiếu source/diff PASS; chưa build/browser/VPS lượt tăng cỡ này.

- 2026-11-12 theo user tăng tiếp huy hiệu tích lũy và đổi cam sữa: IncrementBadge chung đường kính22→28px, số và chữs cùng15px (bỏsnhỏriêng), viền1px và chữ cùng#f0bd80, nền#503a23 nhưkhungđồnghồlaptop. Laptop giữneo/gap7px. Mobile nớicộtgiữa16→28px đểbadgekhôngđè2đồnghồ, giữcăngiữacụm/hướngclock/cỡ2clock; khôngđổiluật. Thaycỡ22/12/11 ởghi chútrước. Backup .checkpoints/increment-badge-orange-20261112. Source/diffcheckPASS; chưa build/browser/VPS lượtđổicỡmàunày.

- 2026-11-12 user đính chính kiểu menu tích lũy laptop: dùng nền nâu, font Times New Roman và dòng chọn xanh như menu Thời gian nước đi trong ảnh; bỏ bo góc/vàng/checkmark kiểu riêng, giữ menu mở xuống có cuộn. Không đổi select mobile hoặc cấu hình/luật thời gian.

- 2026-11-12 theo user thu nhẹ huy hiệu tích lũy: đường kính28→26px, số/chữs15→14px qua IncrementBadge chung laptop/mobile/live/replay. Giữ cam sữa#f0bd80, viền1px, nền/neo/gap và cộtgiữa28px. Backup .checkpoints/increment-badge-trim-20261112. Đối chiếu2sizetokensPASS; chưa build/browser/VPS lượtthu này.

- 2026-11-12 theo ảnh user: menu tích lũy laptop căn trái, padding trái 20%/phải 15% cùng trường chọn thời gian nước đi; thay căn giữa và padding 12px của lượt trước. Chỉ khoảng đệm option, không đổi mobile/giá trị/luật. Backup .checkpoints/increment-menu-padding-20261112. TypeScript PASS; chưa build dist/browser/deploy lượt chỉnh nhỏ này.

- 2026-11-12 theo ảnh user: Tạo bàn mobile đưa công tắc Bàn khóa về cạnh phải nhãn ở bên trái hàng, justify-start/gap16px thay justify-between đẩy sát mép phải. Laptop, kích thước công tắc và hành vi khóa giữ nguyên. Backup .checkpoints/room-lock-toggle-left-20261112. Chỉ source local, chưa build/browser/VPS lượt chỉnh vị trí này.
