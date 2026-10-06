# Tiến độ

- 2026-10-03: Chuẩn hóa hàng người chơi ở các tab bạn bè theo hàng gợi ý cao 85px; tab Danh sách bỏ chia khung thành 5 hàng kéo giãn, hiển thị toàn bộ kết quả với cuộn dọc trong khung cố định. Các tab đã dùng chung FriendRow. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Theo làm rõ của người dùng, ba ảnh 91d7…, a6bb…, e96b… dùng cho trạng thái inactive của Danh sách/Thêm bạn/Lời mời; khôi phục bộ active trước đó. Ảnh nguồn lưu trong `src/assets/references/uploads/`; giữ kích thước asset hiện tại. `npm.cmd run build` PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Đồng bộ dải nâu tab Danh sách theo đúng chiều dài 600px của mẫu tab Thêm bạn; bỏ chiều dài riêng 671px. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Đồng bộ chiều cao khung danh sách ở tab Danh sách với tab Thêm bạn: cùng lấy phần chiều cao còn lại của panel cố định; chỉnh slot tìm kiếm 48→46px để hai vùng danh sách bằng nhau, giữ nguyên thanh tìm kiếm hiển thị. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Dải nền trang trí trong tab Danh sách tăng từ 600px lên 671px để bù cột thao tác rộng hơn tab gợi ý 71px, giữ phần đệm cuối dải giống mẫu quanh danh hiệu/nút Kết bạn. `npm.cmd run build` PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Toast trạng thái trong hộp Bạn bè tự ẩn sau 3 giây; thông báo mới đặt lại bộ hẹn giờ và timer được dọn khi component unmount. `npm.cmd run build` PASS, `dist` cập nhật; chưa browser QA.
- 2026-10-03: Trong tab Thêm bạn, sau khi gửi lời mời giữ nguyên nút/khung/icon/chữ “Kết bạn”, chỉ hạ độ sáng xuống 72% và khóa bấm lại; không đổi sang nút trạng thái khác. `npm.cmd run build` PASS, `dist` cập nhật; chưa browser QA.
- 2026-10-03: Loại bỏ vệt tua đỏ/bóng ảnh mẫu còn lấn mép trên của bốn tab Danh sách/Lời mời, nối lại dải viền và giữ nguyên kích thước/chữ/icon. `npm.cmd run build` PASS, `dist` cập nhật; đã kiểm tra các crop phóng lớn, chưa browser QA.
- 2026-10-03: Cố định cột nút ở 244px riêng trong danh sách Bạn bè để nền trang trí các dòng cùng độ dài dòng đầu; tab gợi ý/lời mời giữ nguyên cách co cột. `npm.cmd run build` PASS, `dist` cập nhật; chưa browser QA.

- 2026-10-03: Avatar hai người trong mỗi hàng Lịch sử có con trỏ tay và mở ProfileDialog với tên người chơi tương ứng; nút “Kết bạn” theo luồng thông báo hiện tại. `npm.cmd run build` PASS; bundle mới `index-C7w-DjnB.js` có trong `dist`.

- 2026-10-03: Đổi thứ tự chú thích footer Lịch sử thành Cờ tướng trước Cờ úp; giữ nguyên kiểu dáng và đường phân cách. `npm.cmd run build` PASS; bundle mới `index-AeHFme_-.js` có trong `dist`.

- 2026-10-03: Cắt nền ngoài góc bo phía trên của sáu asset trạng thái ba tab Bạn bè thành alpha trong suốt, giữ viền/văn bản/biểu tượng/tua rua và họa tiết còn lại. `npm.cmd run build` PASS; sáu asset crop mới có trong `dist`; đã xem ảnh asset, chưa browser QA.

- 2026-10-03: Tách state danh sách “Đã lưu” khỏi “Đã chơi”; xóa mục khỏi danh sách đã lưu không còn xóa ván khỏi lịch sử đã chơi. `npm.cmd run build` PASS; Vite phát sinh bundle mới `index-_t7xaY8L.js` trong `dist`.

- 2026-10-03: Tăng nhẹ cỡ hai nhãn “Cờ úp”/“Cờ tướng” trong footer Lịch sử từ 16px lên 18px; giữ nguyên căn giữa dọc và vị trí. `npm.cmd run build` PASS; CSS 18px có trong `dist`; chưa browser QA.

- 2026-10-03: Làm sáng nền nút xóa ở Lịch sử “Đã lưu” từ xám đậm sang gradient xám vừa `#777672`→`#5b5a56`, viền `#696761`; giữ nét icon/khoảng cách. `npm.cmd run build` PASS; màu mới có trong CSS `dist`; chưa browser QA.

- 2026-10-03: Icon ELO Cờ Úp trên Home dùng chung `history-hidden-user.png` với Lịch sử, giữ kích thước/vị trí hiển thị. `npm.cmd run build` PASS; asset có trong `dist`; chưa browser QA.

- 2026-10-03: Đính chính hai nhãn “Cờ úp”/“Cờ tướng”: bỏ dịch lên, tăng cỡ chữ 14→16px và căn giữa dọc trong ô 38px. `npm.cmd run build` PASS; xác nhận CSS 16px/38px có trong `dist`; chưa browser QA.

- 2026-10-03: Đổi riêng nét thùng rác trong Lịch sử “Đã lưu” sang xám trắng nhạt `#e5e7eb`; giữ nền nút và khoảng cách. `npm.cmd run build` PASS; xác nhận màu mới có trong CSS `dist`; chưa browser QA.

- 2026-10-03: Căn hai nhãn “Cờ úp”/“Cờ tướng” trong ô cao 38px để thẳng giữa với quân cờ, đồng thời nâng thêm 2px. `npm.cmd run build` PASS; xác nhận CSS độ cao và vị trí mới có trong `dist`; chưa browser QA.

- 2026-10-03: Làm biểu tượng thùng rác trong tab Lịch sử “Đã lưu” nhạt hơn (`#dedbd3`) và tăng khoảng cách với nút “Xem lại” thêm 4px. `npm.cmd run build` PASS; xác nhận màu và khoảng cách có trong CSS của `dist`; chưa browser QA.

- 2026-10-03: Nâng nhẹ hai nhãn “Cờ úp” và “Cờ tướng” trong footer Lịch sử lên 4px; giữ nguyên icon, kích thước và bố cục. `npm.cmd run build` PASS; xác nhận CSS `-top-1` có trong `dist`; chưa browser QA.

- 2026-10-03: Tab “Đã chơi” cũng có asset nền nâu đậm/chữ kem khi chưa chọn; trạng thái chọn vẫn dùng asset đỏ. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Tab “Đã lưu” khi chưa chọn dùng nền nâu đậm/chữ kem sáng như mẫu “Đã chơi”; khi chọn giữ artwork đỏ. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Tab Lịch sử “Đã lưu” dùng cùng artwork đỏ khi được chọn như tab “Đã chơi”; trạng thái chưa chọn giữ nét cọ nâu. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Đổi tab Lịch sử “Đã xem” thành “Đã lưu”, gồm asset chữ, nhãn trợ năng và aria-label; giữ layout/hiệu ứng. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Tooltip năng lượng đổi nhãn thành “Hồi năng lượng sau: …”; giữ nguyên đồng hồ hồi/mẫu 5:00. Build/typecheck PASS, dist xác nhận có nhãn mới.

- 2026-10-03: Tạm tooltip Năng lượng luôn hiện thời gian hồi khi rê chuột: đầy 5/5 hiện mẫu 5:00, khi thiếu vẫn đếm ngược thật. Không đổi logic hồi/trừ năng lượng. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Dọn src/assets: xóa 129 ảnh không được tham chiếu (79.775.205 byte, khoảng 76 MiB), gom 8 ảnh nguồn vào references/uploads, cập nhật đường dẫn tài liệu. Giữ ảnh runtime, reference, đầu vào script crop và giấy phép; không đổi pixel/UI. Build/typecheck PASS, dist có các asset đang dùng. Full suite 98/118 PASS, 20 FAIL ở rooms/server/move-sound/chess-piece/ui (gồm thiếu scrollTo/jsdom và assertion gameplay/animation); chưa xác nhận baseline trước dọn, chưa browser QA. Không sửa ngoài phạm vi dọn asset.

- 2026-10-02: Quân úp trong hàng Lịch sử tăng 43→47px, bằng quân đỏ/đen; chú thích giữ cả ba 38px. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Thay ba quân đỏ/đen/úp trong Lịch sử và chú thích bằng ảnh người dùng 3c629ef6/a74f864b/235a94c0, crop sát artwork/loại alpha nhiễu; giữ layout/kích thước. Build/typecheck PASS, dist xác nhận đủ ba asset; chưa browser QA.

- 2026-10-02: Năng lượng hồi 1 mỗi 5 phút tới 5/5, theo mốc thời gian xuyên màn hình và bù chu kỳ khi tab chậm; rê/focus khung hiện đếm ngược hoặc đã đầy. Đấu máy không trừ; local hai người/online giữ trừ khi bắt đầu. Chưa lưu qua reload. 12/12 test năng lượng/store PASS, build/typecheck PASS, dist xác nhận có tooltip; chưa browser QA.

- 2026-10-02: Nền hai nút cộng giữ vàng nâu ở nửa dưới, chuyển vàng sáng dần từ 50% lên trên bằng gradient dọc; giữ dấu cộng/viền/vị trí. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Hai họa tiết ngoài cùng khung Năng lượng/Vàng giữ màu ảnh gốc bằng clip vùng 0–10% và 90–100%; giữ độ tối hai ô và họa tiết giữa sáng. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Dịch hai nút cộng Năng lượng/Vàng lên 1px bằng top calc(50% - 1px); giữ vị trí ngang/kích thước. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Họa tiết nối giữa khung Năng lượng/Vàng hiển thị màu ảnh gốc bằng lớp ảnh clip vùng giữa 46–54%; hai ô giữ brightness 75%. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Vàng khởi đầu 1000 trong session store, Home hiển thị từ state qua useHome; giữ typography/vị trí. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Dịch hai nút cộng Năng lượng/Vàng xuống nhẹ, top 46%→50%; giữ vị trí ngang/kích thước. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Home căn số giữa mỗi ô, năng lượng session khởi tạo 5/5 và trừ 1 mỗi lần ván local/online bắt đầu (online chỉ người ngồi), không âm, không trừ snapshot lặp/reset/người xem. Chưa lưu qua reload hoặc chặn chơi khi hết. Hai nút cộng nhích lên/trái nhẹ. 10/10 test năng lượng/store PASS, build/typecheck PASS; đã kiểm tra dist chứa năng lượng /5 và vị trí nút mới. Chưa browser QA.
- 2026-10-02: Ghi rõ trong AGENTS.md: sau mỗi nhiệm vụ thay đổi project phải chờ build thành công và kiểm tra dist trước khi báo hoàn tất, không để sang nhiệm vụ sau.

- 2026-10-02: Chỉnh hai nút cộng Home theo ảnh mẫu: nền vàng nâu, viền vàng sáng, bo góc và bóng inset; nút 24px (compact 19px), dấu cộng trắng kem 16px. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Thêm hai nút dấu cộng trắng/nền vuông vàng bên phải số Năng lượng/Vàng Home, 18px (compact 15px). Bấm báo tính năng bổ sung chưa hỗ trợ; chưa có luồng tài nguyên. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Tăng nhẹ icon Năng lượng Home từ 28→31px (compact 22→24px), giữ vị trí và icon Vàng. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Ô Vàng đồng bộ độ tối với Năng lượng: brightness 75%, contrast 1.08 trên ảnh khung chung; bỏ ảnh phủ riêng nửa trái. Giữ icon/số. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Ô Năng lượng giảm brightness từ 82% xuống 75% để tối thêm nhẹ; giữ ô Vàng/icon/số. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Ô Năng lượng giảm brightness thêm từ 90% xuống 82%; giữ ô Vàng/icon/số. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Số trong khung Thông tin hồ sơ (ELO, bạn bè, theo dõi, lượt thích, ID) dùng Times New Roman với lining/tabular nums như Năng lượng/Vàng; giữ cỡ/màu/độ đậm. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-02: Ô Năng lượng bên trái tối thêm 10% bằng bản ảnh brightness 90% clip nửa trái; giữ ô Vàng/icon/số. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Tăng contrast khung Năng lượng/Vàng Home lên 1.08 để màu đậm nhẹ theo yêu cầu; giữ icon/số/vị trí. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Bỏ brightness/saturation/sepia trên khung Năng lượng/Vàng Home để hiển thị màu ảnh gốc. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Thay khung Năng lượng/Vàng bằng ảnh 3b5d198c… crop 2130×311, giữ filter nâu hiện tại và icon/số/kích thước/vị trí. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Thu nhỏ thêm icon Năng lượng/Vàng Home xuống 28/32px (compact 22/25px), giữ vị trí và tỷ lệ. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-02: Số Năng lượng/Vàng đổi Georgia sang Times New Roman với lining/tabular nums như ELO Home để nét bớt tròn; giữ cỡ/màu/vị trí. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Thu nhỏ icon trong khung Năng lượng/Vàng Home: tia sét cao 32px, vàng 36px (compact 25/28px), giữ tỷ lệ ảnh, sát trái và giữa dọc. Dùng chiều cao px để tránh chiều cao % không xác định trong wrapper tự động. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Làm khung Năng lượng/Vàng dịu và ngả nâu bằng brightness 90%, saturation 50%, sepia 30%; giữ icon/số/vị trí. Build/typecheck PASS, dist cập nhật (gồm hai icon mới); chưa browser QA.

- 2026-10-02: Thêm icon tia sét/đồng vàng từ ảnh người dùng vào ô tương ứng Home, crop alpha, sát trái phần lòng khung và căn giữa dọc; giữ khung/số. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Thu nhỏ khung Năng lượng/Vàng Home 420→390px (compact 320→300px), nâng lên 8px. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Thay ảnh khung Năng lượng/Vàng Home bằng b63717d7… theo yêu cầu, crop 2134×302; giữ vị trí, chiều rộng và số tạm 0. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Thay cụm Năng lượng/Vàng Home bằng ảnh 085402e8… (1) crop sát khung; số tạm 0 đặt trên hai ô. Desktop rộng 420px, compact 320px. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Home thêm Năng lượng/Vàng giữa phía trên, dùng ảnh nangluong (trùng ảnh quân úp, tái sử dụng bản crop co-up-user.png) và khung ELO hiện có. Compact xếp sau cụm header; số tạm 0, chưa có logic tài nguyên. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Dùng ảnh người dùng 785cbc7c… (1), crop alpha thành icons/co-up-user.png cho ELO Cờ Úp Home và Lịch sử/chú thích. Home được khôi phục từ Git theo xác nhận người dùng và áp dụng lại avatar 106px, khoảng cách tên–ELO 8px, ELO cao 32px/padding ngang như trước. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Sửa icon quân úp Lịch sử dùng đúng gradient/viền/bóng và mặt quân 60% từ icon ELO Home, thay SVG khác hình. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Lịch sử dùng icon Cờ Úp màu kem co-up.svg đã lưu từ ELO Home thay quân úp gỗ trong hàng và chú thích; quân đỏ đã dùng cùng asset Home. Giữ phân biệt Cờ Tướng bằng quân đen. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Giảm chiều cao hai ô ELO hồ sơ 4px bằng padding dọc 2→0px; giữ cỡ icon/số và chiều rộng. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-02: Giảm khoảng trống dọc quanh tên trong khung Thông tin hồ sơ bằng leading-tight; giữ font và cỡ chữ. Build/typecheck PASS, dist cập nhật; chưa browser QA.

Cập nhật: 2026-10-01. Tóm tắt trạng thái từ tài liệu hiện có; không thay cho kiểm chứng runtime.

## Phạm vi đang khóa theo yêu cầu người dùng
- Các tab trong Danh hiệu chính của ProfileDialog: Tất cả, Vinh Quang Kỳ Đài, Danh Hiệu Phong Tặng, Chuỗi Chiến Thắng, Tổng Ván Chơi và Online Chuyên Cần. Khóa trực tiếp giao diện và hành vi của các tab này, gồm khung, icon, chữ, vị trí và trạng thái chọn. Yêu cầu sửa trực tiếp các tab phải được người dùng mở khóa trước.

## Đã hoàn thành

- 2026-10-03: Chuyển lớp phủ bên trong nút “Đã gửi” sang vàng nhạt `#f3e2b3` với alpha 85%; giữ viền và giới hạn màu trong lòng nút.
- 2026-10-03: Sửa trạng thái “Đã gửi” kết bạn: bỏ filter màu áp lên toàn ảnh nút, đặt lớp kem nhạt lùi 7px vào trong viền và giữ opacity ngoài ở 100% để màu không lem ra bóng/viền.
- 2026-10-03: Đồng bộ nút Chấp nhận/Từ chối lời mời với cỡ nút hành động bạn bè 173×60px; giữ nút chat dạng icon.
- 2026-10-03: Nút “Đã gửi” sau khi gửi lời mời kết bạn dùng tông kem nâu nhạt đã giảm sắc hồng; không đổi màu các nút phụ khác.
- 2026-10-03: Nền nâu sau huy hiệu hạng trong các hàng Bạn bè dùng chiều rộng cố định 600px và phủ đủ chiều cao hàng để các tab có cùng khung trang trí lớn, dài.
- 2026-10-03: Avatar trong Xếp hạng và Bạn bè mở hồ sơ người chơi khi bấm; con trỏ tay hiển thị khi rê. Các avatar ở Home, Lịch sử và Game đã có tương tác mở hồ sơ.

- Migration sang React + TypeScript strict + Vite + Tailwind; Zustand cho game local/phiên, TanStack Query + Axios cho danh sách phòng, Express + Socket.IO cho online. Luật TypeScript thuần dùng chung frontend/server; backend Controller → Service → Repository RAM.
- Home, Chọn Bàn, Chơi Với Máy và GamePage đã có luồng điều hướng. Phòng hỗ trợ 3/5/10/15/30 phút mỗi bên; Chơi Nhanh Home ưu tiên bàn có người chờ, hết bàn chuyển sang máy cơ bản.
- Chơi local, máy cơ bản, Pikafish native + NNUE và Cờ Úp local với máy. Pikafish chạy qua UCI phía server, kiểm tra lịch sử/nước đi, có giới hạn tài nguyên, hủy tính toán và thử lại khi lỗi. Giấy phép tại `board-game/engines/pikafish/README.md`.
- Online có tạo/vào/rời phòng, sẵn sàng, đi quân, chat, cầu hòa, xin thua, đồng hồ server; người xem và xếp/thoát hàng. Người thắng có thể nhận lời mời đấu người đầu hàng sau ván.
- Đồng hồ mỗi lượt tối đa 60 giây, vòng xanh avatar theo thời gian; khai cuộc khóa nước đi và trì hoãn clock 1300ms. Animation nước đi 250ms; lượt/clock chuyển khi nước hợp lệ được áp dụng.
- Chụp hình xuất trực tiếp main đang hiển thị bằng html-to-image, pixelRatio 1; loại status/alert và phần tử được đánh dấu. Không dùng worker dựng lại giao diện.
- Hồ sơ, tùy chỉnh avatar/khung và catalog năm nhóm danh hiệu đã có UI. Catalog tạm hiển thị 39 danh hiệu để chỉnh giao diện; chưa nối luồng cấp/phong danh hiệu thật. Quy ước tại `board-game/docs/HONOR-SYSTEM.md`.
- Danh hiệu trong hồ sơ xếp theo nhóm → cấp khung → thứ tự catalog. Có chọn danh hiệu, xem chi tiết và công tắc ẩn chi tiết tại danh sách; giữ badge và thông tin hồ sơ khi ẩn. Bấm ngoài bảng chi tiết đóng bảng và bỏ glow thẻ vừa bấm. Điều khiển đã chọn dùng nền xanh/dấu tích trắng; không có halo quanh tick.
- Mục Danh hiệu hồ sơ hiện nhãn “Sở hữu: n” tính tổng danh hiệu đã mở khóa (cùng nguồn với mục Tất cả), độc lập với số chọn hiển thị, cạnh biểu tượng sửa; bỏ dòng “Đã chọn: n/3” trong catalog. Asset được gom theo nhóm; nguồn và giấy phép giữ cùng tài nguyên.

## Giới hạn và việc cần kiểm chứng

- Phòng/chat/ván online lưu RAM, mất khi restart; chưa có auth, database, resume hoặc lịch sử/ELO thật. Xếp hạng và một số số liệu hồ sơ vẫn minh họa.
- Cờ Úp chưa online. Vị trí tùy chỉnh/Cờ thế chưa hỗ trợ; luật lặp nước/chiếu dai/đuổi quân chưa triển khai, không tuyên bố hỗ trợ giải đấu.
- Nhật ký 2026-09-26 ghi full suite 97/104 pass, còn 7 lỗi tại `tests/chess-piece.test.tsx` và `tests/ui.test.tsx`; chưa có bằng chứng full suite đã xử lý hết. Các lần build/typecheck và test riêng sau đó không thay thế kết quả full suite.
- Nhiều thay đổi UI mới chỉ được build/typecheck hoặc DOM test; còn cần browser QA desktop/mobile so với reference.
- Windows có thể chặn npm.ps1: dùng npm.cmd. Sandbox từng chặn tsx đọc os.userInfo; không sửa dependency để né giới hạn môi trường.
- Không tìm thấy PROJECT.md khi đọc context; kiến trúc hiện hành được ghi trong AGENTS.md. `board-game/PROGRESS.md` còn là nhật ký cũ, không dùng các mục đã bị thay thế để suy ra trạng thái hiện tại.

## Task tiếp theo

- Theo yêu cầu người dùng; chưa tự triển khai thêm feature.
- Khi có task phù hợp: kiểm chứng lại full suite và browser QA; tài khoản, persistence Prisma/MySQL, lịch sử/ELO hoặc resume cần yêu cầu cụ thể.

## Bảo trì tài liệu

- 2026-10-01: Nền Cờ Úp dùng đỏ trầm ở cả hai trạng thái, mask loại quân cờ và viền khỏi lớp đỏ để tránh hồng; glow vẫn chỉ khi chọn. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Bỏ clip vùng chữ của lớp màu Cờ Úp: lớp đỏ phủ toàn khung theo alpha ảnh, không lem ngoài asset. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Chỉnh Cờ Úp chưa chọn sang sắc đỏ trầm, cùng brightness 1.1 như Cờ Tướng chưa chọn; bỏ lớp screen đỏ cam ở trạng thái chọn. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Làm tab Cờ Úp sáng/đỏ hơn khi chưa chọn: brightness 1.2, lớp đỏ screen blend 65% chỉ trong lòng tab; viền ảnh được mask giữ nguyên. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Đồng bộ lòng tab Cờ Úp sang sắc đỏ như tab Cờ Tướng bằng lớp phủ có mask; quân, chữ và viền asset được giữ nguyên. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Sửa tab chọn Xếp hạng bị hồng/trắng do lớp đỏ phủ quân và viền: giới hạn lớp đỏ trong lòng tab, dùng quầng vàng #ffcf38/#ffad16 và tăng saturation ảnh. Build/typecheck PASS; chưa browser QA.
- 2026-10-01: Tab Xếp hạng được chọn tăng sáng 15%, viền/quầng vàng bám alpha ảnh theo mẫu, chuyển trạng thái 200ms; lớp màu vẫn mask, không thêm hover. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Bỏ hover tăng sáng hai tab Xếp hạng; lớp màu được mask theo alpha asset và isolate trong nút để không lem ra nền ngoài. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Tab Xếp hạng chưa chọn tăng sáng ảnh 10%, giảm lớp phủ nâu từ 70% xuống 25% để chữ/quân/viền rõ hơn. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Tab Xếp hạng đang chọn dùng gradient đỏ #6c170b → #2b0b05 từ tab Tùy chỉnh avatar. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Lưu quân tròn không chữ trong ELO Home thành asset “cờ úp” tại src/assets/icons/co-up.svg để dùng làm icon theo yêu cầu sau; chưa thay icon hiện tại.
- 2026-10-01: Nới khoảng cách nội dung–viền ELO Home: khung cao 32px thay 28px (thêm 2px trên/dưới), icon cách mép trái 8px thay 6px; giữ cỡ icon/số. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Tăng thêm padding ngang nhẹ trong hai khung ELO Home để số cách mép khung hơn. Build/typecheck PASS, dist đã cập nhật.
- 2026-10-01: Home tăng khoảng cách khung tên–ELO từ 4px lên 8px; hai khung ELO tăng padding ngang từ trái 24/phải 4px lên trái 28/phải 8px. Build/typecheck PASS, dist đã cập nhật; chưa QA trực quan trong browser.
- 2026-10-01: Áp dụng toàn ứng dụng quy tắc chỉ chọn chữ; ảnh/SVG không bị quét xanh, ảnh không kéo thành ảnh bằng chuột. Đặt class Tailwind tại body trong index.html, giữ hành vi chọn chữ. Build/typecheck PASS, dist có CSS tương ứng; chưa QA trực quan trong browser.
- 2026-10-01: Home avatar tăng 100→106px, bảng Tân Binh tiếp tục theo HOME_AVATA_TITLE_BADGE_STYLE; hai khung ELO thêm padding trái/phải nhẹ cho nội dung. Build/typecheck PASS, dist đã cập nhật; chưa QA trực quan trong browser.
- 2026-10-01: Giảm nhẹ riêng chữ và số “Sở hữu” từ 24px xuống 22px trong tiêu đề Danh hiệu hồ sơ. Build/typecheck PASS, dist đã cập nhật.
- 2026-10-01: Giới hạn vùng chọn trong màn hồ sơ: ảnh/SVG không còn bị tô xanh hoặc kéo thành ảnh khi quét chuột, chữ vẫn chọn được; không đổi các tab Danh hiệu đang khóa. Build/typecheck PASS, dist đã cập nhật; chưa QA trực quan trong browser.
- 2026-10-01: Tăng padding dọc khung thông tin hồ sơ từ 4px lên 8px, cân khoảng cách giữa các hàng còn 6px để giữ kích thước khung và tổng chiều cao nội dung. Build/typecheck PASS, dist đã cập nhật.
- 2026-10-01: Giãn khoảng cách dọc giữa các hàng tên, chỉ số, thống kê, địa chỉ và ID trong khung thông tin hồ sơ; giảm padding dọc tương ứng để giữ nguyên kích thước khung. Build/typecheck PASS, dist đã cập nhật; chưa QA trực quan trong browser.
- 2026-10-01: Dọn AGENTS.md và PROGRESS.md gốc; bỏ quy tắc trùng, câu dở dang, trạng thái đã bị thay thế và nhật ký tinh chỉnh UI vụn. Giữ các quyết định hiện hành, giới hạn chưa giải quyết và phạm vi đang khóa. Không đổi source/UI/kiến trúc.
- Kiểm tra task dọn tài liệu: npm.cmd run build PASS (gồm typecheck), dist đã cập nhật; Vite vẫn có cảnh báo chunk trên 500 kB. Không chạy lại full suite cho thay đổi chỉ ở tài liệu.
- 2026-10-01: Sửa bộ đếm Sở hữu dùng tổng danh hiệu mở khóa thay số chọn hiển thị; tái sử dụng getUnlockedProfileHonors, giữ giao diện. Build/typecheck PASS, dist đã cập nhật.
- 2026-10-01: Số Sở hữu dùng lining-nums/tabular-nums để các chữ số cùng chiều cao và thẳng baseline với nhãn; giữ cách tính tổng mở khóa.
- Kiểm tra chỉnh số Sở hữu: build/typecheck PASS, dist cập nhật; chưa kiểm chứng trực quan trong browser.

- 2026-10-01: Thay ảnh tab Xếp hạng Cờ Úp bằng ranking-hidden-tab-red.png chỉnh trực tiếp bằng imagegen theo màu Cờ Tướng (nền đỏ toàn lòng khung, viền vàng, quân kem); bỏ lớp phủ screen/mask cũ của Cờ Úp. Asset crop alpha 2170×650, nguồn/prompt lưu cạnh ảnh. Build/typecheck PASS, dist cập nhật; đã kiểm tra ảnh, chưa browser QA.
- 2026-10-01: Giảm brightness riêng tab Cờ Úp từ 1.1 xuống 0.95 ở cả hai trạng thái; giữ màu, kích thước và quầng khi chọn. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Hạ saturation Cờ Úp xuống 0.75 để viền vàng dịu hơn; quầng chọn giảm 2/7px xuống 1/4px và chuyển vàng trầm. Giữ brightness 0.95. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Thay asset Cờ Úp bằng đúng tab bên phải từ ảnh người dùng 0da80393-0b10-4062-ad21-a74cd1119b64.png; crop alpha nhiễu ngoài tab, bỏ filter saturation/brightness riêng ở trạng thái chưa chọn để giữ màu ảnh gốc. Build/typecheck PASS, dist cập nhật; đã kiểm tra crop ảnh, chưa browser QA.
- 2026-10-01: Tab Cờ Úp tăng chiều rộng từ 244px lên 264px, đồng kích thước với tab Cờ Tướng; cả hai cao 70px. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Dịch tab Cờ Úp xuống 4px so với Cờ Tướng để canh hàng theo yêu cầu; giữ kích thước 264×70px. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Cân phần thân khung Cờ Úp với Cờ Tướng: giữ rộng 264px, giảm cao ảnh Cờ Úp 70→60px và dịch xuống 10px để cùng mép dưới; ảnh Cờ Tướng có phần quân nhô cao hơn khung. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Dùng đúng src/assets/references/uploads/0da80393-0b10-4062-ad21-a74cd1119b64.png để thay cả hai tab Xếp hạng; cắt riêng Cờ Tướng/Cờ Úp, cùng ô 264×70px, bỏ bù cao/dịch riêng Cờ Úp và lớp phủ màu chưa chọn. Giữ hiệu ứng chọn. Build/typecheck PASS, dist cập nhật; đã kiểm tra ảnh nguồn, chưa browser QA.
- 2026-10-01: Nút Vào xem Xếp hạng dùng lại typography Times New Roman 21px đậm nghiêng từ SocialUi; hover tăng sáng 10%, nâng 2px và tăng bóng, mũi tên dịch nhẹ. Giữ asset/nội dung/nút 52px; chỉ áp dụng Xếp hạng. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-01: Hover Vào xem chỉ còn tăng sáng màu 10%; bỏ nâng nút, dịch mũi tên và tăng bóng. Build/typecheck PASS, dist cập nhật.
- 2026-10-02: Đổi font tên trong panel Thông tin ProfileDialog sang Cormorant Garamond 600 có sẵn; giữ cỡ 30px, màu và bố cục. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-02: Danh hiệu đã chọn trong hồ sơ xếp theo 3 cột cùng rộng, khoảng cách ngang/dọc đều; hàng chưa đủ 3 căn giữa. Bỏ scale 1.06 làm huy hiệu tràn ô; mỗi badge giữ tỷ lệ aspect 3:1. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-02: Hoàn tác thay đổi bố cục lưới danh hiệu theo yêu cầu; khôi phục grid 3×3 và scale huy hiệu 1.06. Build/typecheck PASS, dist cập nhật.
- 2026-10-02: Giữ lưới danh hiệu hồ sơ 3×3 xếp từ trái sang phải; căn badge giữa từng hàng và căn chữ danh hiệu phong tặng ở 50% như danh hiệu kỳ đài để thẳng cùng trục ngang. Giữ vị trí cột, thứ tự và scale. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-02: Hoàn tác căn chữ và items-center ở danh hiệu hồ sơ. Giữ vị trí chữ theo từng khung; dịch toàn bộ badge phong tặng theo tâm mặt bảng để ngang khung kỳ đài, giữ thứ tự trái sang phải và cột cũ. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-02: Thay tab Xếp hạng Cờ Tướng/Cờ Úp bằng hai ảnh người dùng 0cf04dc5… / b063cf49… trong src/assets; crop sát alpha. Hai nút dùng chung 264×70px, img block/object-fill, cùng mép dưới và không lệch vị trí riêng; nguồn ghi cạnh asset. Build/typecheck PASS, dist cập nhật; đã kiểm tra ảnh nguồn, chưa browser QA.
- 2026-10-02: Tăng lề trái avatar trong từng hàng Xếp hạng 8px để tạo thêm khoảng cách với huy hiệu Top; tên đi cùng cụm avatar, giữ kích thước/cột khác. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-02: Tăng chữ nút Vào xem trong bảng Xếp hạng từ 21 lên 24px; giữ mũi tên, nút và hiệu ứng hover. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-02: Tăng tên trong khung Thông tin từ 30px lên 32px, giữ Cormorant Garamond và bố cục. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-02: Tăng nhẹ tên hồ sơ từ 32px lên 34px, giữ Cormorant Garamond và vị trí. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Giảm avatar riêng trong hàng bạn bè từ 76px xuống 72px để tạo khoảng hở trên/dưới cân hơn trong hàng cao 85px; không đổi avatar ở các màn khác. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Trạng thái người dùng Facebook trong danh sách Bạn bè hiển thị “Đang online” màu xanh lá; chuyển biểu tượng f sang bên phải chữ. Những trạng thái khác giữ nhãn hiện tại. `npm.cmd run build` PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Nút Kết bạn sau khi gửi lời mời giữ nguyên nội dung nhưng phủ nền trắng 48% lên riêng ảnh khung để chuyển sang tông kem sáng; chữ và icon giữ độ tương phản. `npm.cmd run build` PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Ẩn tràn ngang trong các khung danh sách Bạn bè có dải nâu rộng; cuộn dọc vẫn giữ nguyên. `npm.cmd run build` PASS, dist cập nhật; chưa kiểm tra trực quan trong browser.
- 2026-10-03: Giảm riêng icon Facebook trong trạng thái bạn bè từ 25px xuống 22px; `npm.cmd run build` PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Thêm chấm trạng thái online trước nhãn của bạn bè Facebook; giữ icon Facebook ở cuối nhãn. `npm.cmd run build` PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Danh sách bạn bè có 9 người, mỗi hàng dùng một ảnh chức hiệu tách từ atlas 9 rank; tên chức hiệu hiển thị cạnh ảnh. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Tab Bạn bè đang chọn dùng glow vàng và filter brightness/saturation giống hiệu ứng tab Xếp hạng; mở rộng overflow để quầng không bị cắt. `npm.cmd run build` PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Bạn bè và Xếp hạng dùng chung selectedImageTabGlow tại uiClasses.ts (brightness 1.1, saturation 1.3, glow vàng 2/7px, chuyển 200ms). Tab Bạn bè dùng ảnh gốc ở cả hai trạng thái, bỏ đổi sang ảnh active có sáng sẵn. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Nút Kết bạn sau khi bấm dùng lớp vàng nhạt #ffe89e 38% thay lớp trắng 48%, giữ ảnh nút, chữ và icon. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Làm nút Kết bạn đã bấm vàng nhạt hơn bằng lớp #fff3be 58%. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Nút Kết bạn đã bấm chuyển sang tông vàng nâu tối bằng lớp #4a2a0d 30%, đổi nhãn thành Đã gửi; giữ khung và icon hiện có. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Giữ chiều rộng nhãn Kết bạn khi đổi sang Đã gửi bằng ô chữ chồng nhau, tránh icon dịch ngang theo độ dài chữ. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Ẩn thanh cuộn nhìn thấy ở danh sách bạn bè, vẫn giữ cuộn dọc bằng wheel/touch và khóa gesture ngang. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Danh sách bạn bè chỉ hiển thị Đang online hoặc Offline; trạng thái trong sảnh được hiển thị như online và được tính trong bộ lọc online. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Thay 7 ảnh chức hiệu bằng 7 asset mới riêng biệt; giữ ảnh cũ cho Kỳ Đồ/Kỳ Tài chưa có asset mới. Xác nhận hai file 1116 có cùng SHA-256, bỏ bản sao và 7 crop cũ không còn dùng. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Tăng nhẹ ảnh chức hiệu trong hàng bạn bè lên 116×52px và chữ bên cạnh từ 16px lên 18px. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Dịch ảnh/chữ chức hiệu sang trái 12px và dải nâu nền sang trái cùng khoảng. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Ô tìm trong tab Thêm bạn nhận tên hoặc ID. Tìm tên khớp một phần; ID chỉ hiện hồ sơ khi nhập đủ ID mẫu và bấm Tìm, so sánh chính xác; chỉnh sửa ô nhập xóa trạng thái gửi ID. Build/typecheck PASS, dist cập nhật.
- 2026-10-03: Ẩn thanh cuộn ở danh sách gợi ý và hai danh sách lời mời của Bạn bè; vẫn giữ cuộn dọc. Build/typecheck PASS, dist cập nhật.
- 2026-10-03: Dịch cụm ảnh/chữ chức hiệu sang trái thêm 16px; dải nâu đi theo, rộng thêm 60px theo chiều ngang và giữ nguyên chiều cao. Build/typecheck PASS, dist cập nhật.
- 2026-10-03: Phóng ảnh chức hiệu trong hàng bạn bè từ 116×52px lên 138×62px; giữ vị trí chữ, chiều cao hàng và dải nâu. Build/typecheck PASS, dist cập nhật.
- 2026-10-03: Bỏ lề âm của ảnh chức hiệu gây đè chữ; giữ ảnh 138×62px, khoảng cách 12px và mở cột chức hiệu Danh sách lên 256px. Dải nâu hai tab cùng rộng 660px, neo chung mép phải; giữ chiều cao hàng. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Căn cả cụm ảnh/chữ/sao chức hiệu Danh sách cách mép trái dải nâu 20px bằng cột 384px; giữ khoảng cách ảnh–chữ 12px và vị trí nút. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Tăng khoảng cách cụm chức hiệu Danh sách với mép trái dải nâu từ 20px lên 28px. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Phóng ảnh danh hiệu trong hàng Bạn bè từ 138×62px lên 160×72px; nới cụm lên 268px để giữ khoảng cách với chữ/sao. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Tăng ảnh danh hiệu trong hàng Bạn bè lên 174×76px, chữ cấp bậc và sao từ 18px lên 22px; nới cụm lên 290px để giữ khoảng cách. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Nút Mời chơi trong danh sách bạn bè sau khi bấm chuyển sang lớp nâu tối và nhãn Đã mời; icon/vị trí chữ giữ nguyên, không hiện toast. Trạng thái giữ trong phiên giao diện. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Áp dụng brightness(.72) lên toàn bộ nút Đã mời để ảnh nền, icon và chữ cùng tối đi. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Trạng thái Đã mời ở nút Mời chơi tự trở về Mời chơi sau 3 giây; dọn timer khi component unmount. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Thay dải Tân Binh đầu tiên trong bộ huy hiệu 7 ảnh vào vị trí dưới avatar tại Home và Thông tin; giữ vị trí/kích thước ngang theo AVATA_TITLE_BADGE_STYLE, chiều cao tự theo tỷ lệ ảnh để không méo. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Thu nhỏ huy hiệu dưới avatar tại Home và Thông tin còn 85% theo ảnh tham khảo; giữ căn giữa và tỷ lệ ảnh. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Bỏ scale 85% ở huy hiệu dưới avatar Home/Thông tin; khôi phục chiều ngang theo AVATA_TITLE_BADGE_STYLE và chiều cao theo tỷ lệ gốc asset. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Phóng huy hiệu Tân Binh dưới avatar tại Home và Thông tin thêm 25%, giữ căn giữa và tỷ lệ ảnh gốc. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Tăng huy hiệu Tân Binh dưới avatar lên 140% và dịch lên 4px tại Home/Thông tin. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Màn bàn cờ bỏ inert toàn màn hình khi mở; chỉ khóa thao tác bàn/công cụ phụ trong lúc chuyển cảnh để nút Rời phòng dùng được ngay. Nút Sẵn sàng hiện tức thì nhưng chỉ bấm được khi hiệu ứng mở xong. Build/typecheck PASS, dist cập nhật; chưa browser QA.
- 2026-10-03: Nâng z-index mặt cười kết quả trên avatar từ 4 lên 100 để phủ huy hiệu, dải Sẵn sàng và các lớp avatar. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Thay 7 huy hiệu rank cũ bằng 7 asset mới trong danh sách Bạn bè; cập nhật huy hiệu Tân Binh dưới avatar Home/Thông tin sang asset mới cùng hạng, giữ ảnh Kỳ Đồ/Kỳ Tài. Xóa đúng 7 file ảnh cũ sau khi chuyển toàn bộ import. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Nút Sẵn sàng chỉ xuất hiện khi hiệu ứng mở màn bàn cờ hoàn tất, tránh hiện trạng thái disabled mờ trong lúc mở. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Âm thanh bàn cờ dùng GameSounds (Web Audio) nạp/giải mã sẵn 6 asset, mỗi cue có nguồn riêng tránh pause/seek cắt lượt phát trước; resume từ pointer/keyboard và khi quay lại tab, giữ cue chờ quyền phát và hủy khi reset/rời bàn. Hai lớp khai cuộc/chiếu bí dùng chung audio clock; giữ âm lượng và quy tắc move/capture/check hiện có. useMoveSound phân biệt nước mới bằng moveCount cùng tọa độ, tránh phát lại do clock/socket và bỏ sót nước trùng tọa độ. 9 kiểm tra âm thanh PASS; 6/6 WAV/MP4 giải mã thành công, có tín hiệu trong Chrome headless thật; build/typecheck PASS, dist cập nhật. Chưa nghe thử luồng chơi trên loa máy.

- 2026-10-03: Thu huy hiệu Tân Binh dưới avatar Home/Thông tin từ scale 1.4 xuống 1.3; giữ nguyên neo và tỷ lệ asset. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Căn giữa ngang huy hiệu dưới avatar với tâm avatar bằng cách bỏ độ lệch 3px; áp dụng cho Home, Thông tin và vị trí huy hiệu dùng chung. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Căn quang học khung danh hiệu dưới avatar bằng cách dịch neo ngang sang trái 6px theo tỷ lệ gốc, bù huy hiệu tròn làm dải nhìn nặng bên trái và cân với avatar. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Khôi phục âm chiếu bí độc lập với hiệu ứng bàn: phát từ kết quả ván ngay khi nhận nước kết thúc, chỉ một lần mỗi nước; tách file âm chính khỏi lớp overlay để lỗi tải overlay không làm mất tiếng chiếu bí. Test âm thanh 11 cases PASS, build/typecheck PASS, dist cập nhật.

- 2026-10-03: Ô đầu tab Chọn khung hiển thị avatar mẫu phía sau khung vàng để nhìn như viền ảnh tham chiếu; giữ ô đầu được chọn mặc định và cùng asset đang dùng trên avatar. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Thu nhỏ huy hiệu danh hiệu dưới avatar Home/Thông tin từ scale 1.3 xuống 1.2; giữ căn giữa ngang và vị trí dọc. Build/typecheck PASS, dist cập nhật; chưa browser QA.

- 2026-10-03: Bỏ avatar mẫu khỏi ô đầu Chọn khung; chỉ hiển thị khung viền vàng như yêu cầu, giữ khung đầu danh sách và mặc định. Build/typecheck PASS, dist cập nhật.

- 2026-10-03: Đặt asset khung vàng mới 30dfa56b… làm ô đầu và khung mặc định; thay khung mặc định ở AvatarCustomization, Home/Profile, thẻ người chơi, chat và danh sách người xem để đồng bộ mọi vị trí avatar. Build/typecheck PASS, dist cập nhật; chưa browser QA.

## Phạm vi đang khóa

- 2026-10-05: Người dùng cho phép thay đổi sao và đồng bộ theo Home trên toàn project. Chuẩn chung: danh hiệu top84.876613px, sao top118.961945px theo anchor106px, offsetX3px, sao25cqw, gap1.5cqw. RankTitleBadge/RANK_TITLE_STARS_STYLE dùng chung ở Home/Hồ sơ/Tùy chỉnh/PlayerCard/Xếp hạng/Bạn bè; bỏ offset riêng Home. Tỷ lệ và hướng điền trái→phải tiếp tục theo quy tắc; thay vị trí phải đồng bộ các consumer, không tạo ngoại lệ màn hình.

- 2026-10-05: Sao neo dưới đáy khung thêm2px, giữ tỷ lệ25%/gap1.5%; nới các thẻ dùng chung đủ chỗ. Danh hiệu dùng Canvas làm nét tĩnh đúng kích thước cũ; chữ Thắng24px gọn trong nền, ô giữ nguyên. Quy tắc hiện hành ở PROJECT-MEMORY/RANK-SYSTEM/FRIENDS-UI-RULES. Build/typecheck PASS, dist cập nhật; QA các dialog chính và Home. Chi tiết tại board-game/PROGRESS.md.

- 2026-10-05: Theo yêu cầu hoàn tác, phục hồi sao top118.961945px theo avatar106px (bottomInset14/clusterOffsetY-8), giữ tỷ lệ25%/gap1.5%/offsetX3. Khôi phục vùng chứa trước lần neo sao xuống đáy: Ranking138/132px, Friends85/84px, Profile190px, AvatarCustomization190/188/183px, PlayerCard margins78/54px và bỏ compact mb28. Giữ thay đổi làm nét Canvas và chữ Thắng vì người dùng chỉ yêu cầu hoàn tác vị trí sao. Cập nhật quy tắc hiện hành và STAR-04: không tự đổi chuẩn vị trí từ yêu cầu giữ tỷ lệ. Build/typecheck PASS; dist index-tWx-SYxJ.js xác nhận clusterOffsetYPx:-8, không còn titleGapPx:2. Chưa browser QA lượt hoàn tác.

- 2026-10-05: Cải thiện nét danh hiệu nhỏ theo yêu cầu giữ nguyên kích thước: SharpRankArtwork bỏ chuỗi giảm đôi nhiều lần làm mềm chữ, dùng lấy mẫu2x rồi thu một lần về độ phân giải hiển thị; unsharp mask1.1 cho khung≤140px/0.65 cho khung lớn, threshold1.5 và bù nét giới hạn±28 để hạn chế viền sáng. Component chung áp dụng cả7 bậc và mọi consumer. Không sửa kích thước/khung/vị trí danh hiệu hoặc sao; giữ clusterOffsetY-8. Cập nhật PROJECT-MEMORY/RANK-SYSTEM. Build/typecheck PASS, dist index-CxeKkb9u.js cập nhật. Chưa browser QA trực quan lượt này; mức rõ tối đa vẫn phụ thuộc số pixel của chữ nhỏ.

- 2026-10-05: Kiểm tra nguyên nhân mờ Xếp hạng trước sửa: parent transform matrix0.85 ở1280×720/matrix0.728205 ở960×600, không CSS zoom; danh hiệu105.188×42.063px và sao26.287/26.3px trước parent scale. Danh hiệu Canvas lại nằm trong parent scale. Nguồn rank2144×724/star1199×1219 đủ2×, avatarSVG; icon red-general60×62 thiếu2× ở43px. Đã báo nguyên nhân trước sửa. RankingDialog chuyển toàn bảng sang kích thước CSS cuối cùng/token pixel nguyên, bỏ parent scale và medal scale110; RankingRankBadge render ảnh gốc/img trực tiếp, object-contain, đọc cùng token tọa độ cũ. Không đổi asset hay các màn khác. Browser QA trước/sau1280×720 và960×600, cả2 tab; sau sửa root/ancestor ảnh transform none/scale none/zoom1, Canvas0. Ở1280: medal84×84, avatar65×65, title89×36, sao22×22; ở960: title77×31, sao19×19. Hàng117px so với117.3px trước ở1280,100px so với100.492px ở960; bề rộng hàng chênh vài pixel do làm tròn/viền, không đổi cấu trúc/cột. Ảnh trực tiếp tránh nội suy parent, chữ nhỏ vẫn giới hạn chi tiết theo số pixel. Đã reset viewport. Build/typecheck PASS; dist index-eS4U3gEw.js có token mới. Chưa đạt nguồn2× cho icon Điểm vì không được thay asset; đã báo giới hạn. Quy tắc cập nhật PROJECT-MEMORY/RANK-SYSTEM.

- 2026-10-05: Theo yêu cầu lấy khoảng cách/kích thước sao Home áp dụng toàn project, tìm mọi consumer. Home/Hồ sơ/Tùy chỉnh/PlayerCard/Bạn bè đã dùng RankStars/RANK_TITLE_STARS_STYLE chung; RankingRankBadge còn tự làm tròn sao/gap/top nên lệch nhẹ. Bỏ phần tính/render sao riêng của Ranking, dùng cùng component/style Home. Giữ tọa độ chuẩn và khung/layout hiện hành; ảnh danh hiệu Ranking vẫn render trực tiếp, parent không scale. Ưu tiên tỷ lệ25%/gap1.5% của Home hơn làm tròn từng sao. Cập nhật PROJECT-MEMORY/RANK-SYSTEM. Build/typecheck PASS, dist index-CS5d2E5R.js cập nhật. Chưa browser QA lượt này.

- 2026-10-05: Sửa rendering ảnh nhỏ toàn project theo nguyên nhân đã báo trước sửa: Home/Profile/Tùy chỉnh/Bạn bè/Lịch sử/ComputerSetup có parent transform scale; rank Canvas trung gian còn bị lấy mẫu lại; crop huy hiệu và marker layer có scale riêng. Không CSS zoom; nguồn rank/sao đủ2x, một số icon/frame Lịch sử không đủ. Thêm CrispUiImage/crispUiRendering để img native và CSS cuối cùng, pixel token nguyên; bỏ parent scale, SharpRankArtwork Canvas và GPU translateZ/backface ép buộc. Giữ contrast1.12 tĩnh, asset gốc, cấu trúc và tọa độ/tỷ lệ sao Home. FittedUiArtwork chuyển stretch huy hiệu đã duyệt sang kích thước ảnh thật, giữ crop/style; nền Game scale1.16 thành box116% tương đương. Board marker/hit layer dùng tọa độ/kích thước cuối cùng, không đổi luật/animation/quân. Đồng bộ SocialUi/RankStars/AvatarFrameOverlay/RankingRankBadge; History frame object-contain. Ghi docs/UI-IMAGE-RENDERING.md, cập nhật PROJECT-MEMORY/RANK-SYSTEM/FRIENDS-UI-RULES/HONOR-SYSTEM. Browser QA Home/Profile/Tùy chỉnh/Huy hiệu/Bạn bè/Lịch sử/ComputerSetup/Board tại1280x720 và/hoặc960x600; Xếp hạng cả2 tab ở960 và1280, title89x36 ở1280 với ancestors không scale, Canvas0. Huy hiệu arena213x82px, img chỉ translate tâm, giữ hình dáng; console error0 trong lượt đọc cuối. Đã reset viewport. Build/typecheck PASS; dist index-ZKCooTym.js. Làm tròn có sai khác dưới1px; sao/crop giữ tỷ lệ nên vẫn có kích thước phân số. Không thay ảnh nguồn nhỏ/không tuyên bố khôi phục chi tiết chữ dưới giới hạn pixel; chưa kiểm chứng nhấp nháy từng frame hoặc mọi thao tác chơi cờ.

- 2026-10-05: Theo yêu cầu dịch sao xuống2px và đồng bộ mọi nơi, đổi RANK_STAR_LAYOUT.clusterOffsetYPx từ-8 thành-6; chuẩn sao top120.961945px theo avatar106px (tự co theo tỷ lệ). RankTitleBadge/RankingRankBadge đọc RANK_TITLE_STARS_STYLE chung, áp dụng Home/Hồ sơ/Tùy chỉnh/PlayerCard/Bạn bè/Xếp hạng. Giữ danh hiệu, size/gap/offsetX và rendering. Cập nhật PROJECT-MEMORY/RANK-SYSTEM/UI-IMAGE-RENDERING. Build/typecheck PASS; dist index-DtrYrnFo.js xác nhận clusterOffsetYPx:-6. Chưa browser QA lượt này.

- 2026-10-05: Theo yêu cầu giữ Tân Binh và hạ sao ở6 danh hiệu còn lại1px, thêm getRankTitleStarsStyle(rankLevel) trong playerIdentityLayout; bậc1 trả style cũ, bậc2–7 chỉ top calc(+1px CSS). RankTitleBadge và RankingRankBadge dùng chung helper, đồng bộ mọi consumer. Không sửa vị trí/kích thước avatar, danh hiệu, thẻ hoặc UI khác; size/gap sao giữ nguyên. Cập nhật3 tài liệu quy tắc. Build/typecheck PASS; dist index-D0nu3fLi.js xác nhận +1px. Chưa browser QA lượt này.

- 2026-10-05: Thu khung đỏ Gợi ý cho bạn trong tab Thêm bạn bằng khung Lời mời: bỏ inline height54 cố định, dùng friendSectionTitle cao50px thiết kế/token responsive. Hàng chứa54px giữ mốc điều khiển cùng Danh sách. Giữ asset/chiều rộng và các hàng bạn. Cập nhật FRIENDS-UI-RULES/PROJECT-MEMORY. Build/typecheck PASS; dist index-Dpi2lHR7.js cập nhật. Chưa browser QA lượt này.

- 2026-10-05: Đồng bộ icon tìm kiếm Bạn bè Danh sách/Thêm bạn bằng SearchIcon chung31px/stroke3.5, giữ màu/bóng nền. Build/typecheck PASS, dist index-Bhk2LSwb.js.

- 2026-10-05: Tăng chữ ô nhập tên ở Danh sách và Thêm bạn21→23px, giữ bố cục. Build/typecheck PASS; dist index-DzV7MuEB.js.

- 2026-10-05: Sửa chiều cao nút Tìm Thêm bạn dùng cùng token responsive56px với ô nhập, bỏ inline pixel cố định. Build/typecheck PASS; dist index-CaRXOdxz.js.

- 2026-10-05: Đã căn x ngang khung danh hiệu Lời mời trùng Danh sách theo quyền mở khóa rõ của người dùng; tất cả FriendRow dùng cột240px. Giữ nguyên kích thước khóa, cột action330px. QA trình duyệt ở1280x720 xác nhận anchor danh hiệu x=516.8px ở Danh sách/Lời mời và action bắt đầu x=713px; ảnh xác nhận các hàng/cột vẫn hiển thị. Build/typecheck PASS, dist index-DdbyJ0Cn.js.

- 2026-10-05: Tăng chiều cao các hàng Bạn bè85→90px responsive, giữ track nội dung85px để avatar/danh hiệu/sao không đổi vị trí tương đối. Browser QA List at1280x720. Build/typecheck PASS, dist index-BImLFixZ.js.

- 2026-10-05: Đồng bộ chiều cao nút Kết bạn, Chấp nhận/Từ chối và Hủy lời mời theo nút Mời chơi của Danh sách bằng token responsive60px; không đổi chiều rộng, icon hay vị trí. Build/typecheck PASS; browser QA tại1280x720: Kết bạn và Chấp nhận đều cao51px CSS sau scale responsive.


- 2026-10-05: Căn giữa theo chiều dọc nội dung FriendRow trong hàng cao90px: giữ track85px, thêm căn giữa content của grid để phân bổ khoảng trống thừa đều trên/dưới. Kích thước, khoảng cách tương đối avatar/danh hiệu/sao và các nút không đổi; áp dụng chung mọi tab Bạn bè. Build/typecheck PASS, dist index-BIZNY3sd.js; browser QA Danh sách ở localhost: hàng55px màn hình, nội dung centerDelta=-0.4px do responsive scale.


- 2026-10-05: Quy tắc mới: mọi avatar trong project hiển thị cursor-pointer. Đặt trực tiếp trong SocialAvatar, AvatarPortrait, avatar placeholder ở Chọn Bàn và avatar header Chơi với máy; Home/Hồ sơ/Xếp hạng/PlayerCard/Chat/RoomUsersPanel vốn ở trong vùng tương tác có cursor pointer. Không đổi geometry bị khóa. Build/typecheck PASS; dist index-DAWRtbaz.js.


- 2026-10-05: Ẩn thanh cuộn trực quan trong danh sách Bạn bè/Lời mời bằng scrollbar-width:none và ::-webkit-scrollbar:hidden; vẫn giữ overflow-y-auto để cuộn dọc, overflow-x-hidden và scrollbar-gutter:stable để không đổi bề ngang nội dung. Build/typecheck PASS; Browser QA tab Lời mời: overflowY=auto, scrollbarWidth=none, scrollHeight220>clientHeight195 nên nội dung còn cuộn được; dist index-DeKVuXl5.js.


- 2026-10-05: Người dùng cho phép mở khóa một lần; dịch nền nâu và nội dung danh hiệu/sao/tên bậc/nút sang trái50px thiết kế responsive bằng brownGroupPosition trong FriendRow. Khóa lại mốc mới. Browser QA Danh sách/Thêm bạn/Lời mời: offset thực30px theo viewport hiện tại, nền x258.3→228.3, rank281.3→251.3, action434.6→404.6; avatar/tên x55.8 và y/width/height giữ nguyên. Build/typecheck PASS; dist index-DhvXVJ9q.js.


- 2026-10-05: Sửa hiểu nhầm yêu cầu: hoàn tác dịch trái cả cụm, chỉ kéo dài nền nâu50px thiết kế về bên trái (margin-left=-(38px+50px), responsive). Nội dung danh hiệu/sao/nút trở về mốc cũ và khóa lại. Không thay chiều cao/kích thước nội dung. Browser QA Danh sách/Lời mời: nền x228.3, width407.3 (+30px CSS tại viewport hiện tại), right635.6 giữ nguyên; rank x281.3 và action x434.6 phục hồi đúng mốc trước dịch. Build/typecheck PASS, dist index-BU_4_TfW.js. Bài học: phân biệt kéo dài nền với dịch toàn bộ nền và nội dung; quy tắc hiện hành đã cập nhật.


- 2026-10-05: Theo yêu cầu tiếp nối, dịch riêng danh hiệu/sao/tên bậc/nút trong nền nâu sang trái50px thiết kế responsive qua brownContentPosition chung cho mọi FriendRow. Nền nâu giữ nguyên chiều dài đã nới, mép phải giữ nguyên. Dùng quyền cho phép trong cùng phạm vi và khóa lại vị trí mới. Browser QA cả3 tab: nền x228.3/right635.6/width407.3 giữ nguyên; rank281.3→251.3, action434.6→404.6 (30px CSS theo scale hiện tại); avatar/tên người chơi giữ x55.8. Build/typecheck PASS, dist index-C5E4-Sxm.js.


- 2026-10-05: Căn nhóm nút của mọi tab Bạn bè sát mép phải nền nâu, chừa8px thiết kế responsive. Bỏ brownContentPosition ở cột thao tác, giữ offset50px của danh hiệu/sao và chiều dài nền. Browser QA cả3 tab: frameRight635.6, buttonRight630.6, gap5px CSS theo scale hiện tại; rankX251.3 giữ nguyên. Build/typecheck PASS; dist index-a-AO4_38.js.


- 2026-10-05: Đổi placeholder tìm kiếm ở cả Danh sách và Thêm bạn thành “Nhập tên / ID người chơi...”. Chỉ cập nhật chữ gợi ý; logic lọc giữ nguyên. Kiểm tra source đủ2 input, build/typecheck PASS; dist index-BWJSBwp2.js. Chưa browser QA lượt này.


- 2026-10-05: Dịch tên người chơi và trạng thái sang trái8px thiết kế responsive trong toàn bộ Bạn bè bằng giảm gap FriendIdentity từ36px xuống28px. FriendRow chung bao phủ Danh sách/Online/Facebook/Thêm bạn/Lời mời nhận và gửi. Avatar, danh hiệu/sao và các nút giữ tọa độ hiện hành. Build/typecheck PASS; dist index-DUIt7Cwp.js. Kiểm tra mã dùng chung; chưa browser QA lượt này.


- 2026-10-05: Thêm nút Tìm vào tab Danh sách, dùng chung FriendSearchButton với Thêm bạn (cao56px/rộng tối thiểu170px responsive). Thu chiều rộng ô nhập để chừa nút, giữ mốc hàng tìm kiếm và khung danh sách. Danh sách vẫn lọc khi nhập; bấm Tìm/Enter trim query. Browser QA tìm “ LinhMeo ” trả LinhMeo99 và trim thành LinhMeo; cả2 tab ô nhập/nút cao34px màn hình, nút rộng104px, cùng top224.91 theo scale hiện tại. Đã xóa query kiểm tra. Build/typecheck PASS; dist index-CForDYMl.js.


- 2026-10-05: Rút nhãn hiển thị nút lời mời đã gửi từ “Hủy lời mời” thành “Hủy”; aria-label giữ mô tả đầy đủ. Build/typecheck PASS; dist index-BtHLrFlg.js.
- 2026-10-05: Người dùng chốt quy tắc khóa: kể cả khi làm task khác, nếu thay đổi chạm/cần sửa hoặc ảnh hưởng phụ đến vùng đã khóa thì dừng trước phần đó, báo đúng phạm vi và hỏi xác nhận mở khóa cho task hiện tại; phần độc lập vẫn được tiếp tục. Xác nhận chỉ áp dụng đúng phạm vi/task và sau đó khóa lại. Đã lưu trong AGENTS.md và docs/PROJECT-MEMORY.md.

- 2026-10-05: Sửa lỗi danh hiệu sprite méo/cắt dư: metadata có imageHeight theo kích thước nguồn/crop và cả bốn consumer render chiều cao tường minh, giữ hình học ô hiện hành. Áp dụng Chuỗi Chiến Thắng/Tổng Ván Chơi/Online Chuyên Cần và chi tiết danh hiệu. Cập nhật bài học PROJECT-MEMORY và HONOR-SYSTEM. npm run build/typecheck PASS; dist index-CQ-oopQk.js. Browser QA cả ba nhóm và chi tiết Thống Trị: viền đầy đủ, không còn lộ khung khác; ảnh đối chiếu lưu trong outputs/danh-hieu-sau-sua.jpg của phiên.

- 2026-10-05: Đồng bộ khoảng cách dọc các tab catalog Danh hiệu theo Tất cả trong HonorsFrame (ProfileDialog.tsx), chuẩn hóa rowGap theo số hàng thay vì 3% giống nhau ở mọi danh sách. Giữ hình học badge/crop và lưới ba cột. Build tạo dist index-ZtfX4uYY.js; browser QA: Tất cả và năm tab riêng cùng gap13.875px/cardHeight57.8125px tại viewport hiện tại. Lưu quy tắc trong PROJECT-MEMORY/HONOR-SYSTEM và ảnh outputs/danh-hieu-khoang-cach.jpg của phiên.

- 2026-10-05: Căn ba khung tiêu đề Bạn bè theo vị trí Gợi ý cho bạn của Thêm bạn. FriendsDialog dùng friendSectionTitleStyle top=calc((--ui-p-54 - --ui-p-50)/2), Add bỏ căn giữa riêng để giữ tọa độ mẫu; hai khung Lời mời áp dụng cùng inset. Build/typecheck PASS, dist index-DyfCCasH.js. Browser QA: mẫu Add x54.2/y186.4125/w606/h30 giữ nguyên; Lời mời nhận y184.9125→186.4125, gửi y420.2→421.7; tọa độ tất cả hàng Add và Lời mời giữ nguyên. Ảnh đối chiếu khung-ban-be-can-vi-tri.jpg trong outputs của phiên.

- 2026-10-05: Thay Thắng/Thua trong MatchResultBadge bằng hai vùng ảnh từ PNG24f07314-e511-454e-9d58-2a50197a5a34 của người dùng. Đặt nguồn vào src/assets/history, crop bằng viewBox giữ tỉ lệ/alpha/màu, ô và offset cũ. Cập nhật PROJECT-MEMORY/history-crops để thay quy tắc text cũ. Typecheck/build PASS, dist index-BtDRXcty.js. Browser QA Đã chơi14 badge/Đã lưu6 badge đều dùng nguồn mới; ô50×24px tại viewport hiện tại. Ảnh kết quả thang-thua-anh-moi.jpg trong outputs của phiên.
