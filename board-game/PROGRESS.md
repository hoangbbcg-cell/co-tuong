# Tiến độ

- 2026-09-29: Giữ tên đầy đủ trong `name`, thêm `displayName` rút gọn cho các tên dài; chữ trong khung Phong Tặng nằm giữa vùng 70%, một dòng, tự co cỡ 30/27/24/21px và không hiện ellipsis. Khung giữ nguyên scale 1.36. Build/typecheck PASS.
- 2026-09-29: Thay 5 khung Phong Tặng bằng năm khung cắt từ sprite `52405c8d-34f5-4789-a46c-20e1d0674b2e.png` theo thứ tự VIP 1→5; giữ alpha, tỷ lệ gốc và canvas 1500×500, căn thân đặt chữ cùng tâm/bề rộng 580px. Tăng render scale chung lên 1.36 để vùng thân đạt xấp xỉ chuẩn 790px; build/typecheck PASS, asset đã kiểm tra trực quan.
- 2026-09-29: Sửa dấu/chữ trong tên Phong Tặng: dùng Cormorant Garamond có glyph tiếng Việt, chuẩn hóa NFC, nới line-height và giảm stroke để dấu không dính chữ. Build/typecheck PASS; chưa browser QA.
- 2026-09-29: Bộ asset Phong Tặng trước đó được chuẩn hóa thành PNG transparent 1500×500 với thân rộng 790px, sau đó được thay bằng sprite mới phía trên.
- 2026-09-28: Hoàn thiện 9 biến thể Vinh Quang Kỳ Đài: ba cấp khung, mỗi cấp dùng cùng chữ Quán Quân, Á Quân, Hạng Ba; bỏ Top 4/Top 3. Hiển thị theo lưới ba cột, cập nhật thông tin chi tiết theo cấp khung và tài liệu quy tắc.
- 2026-09-28: Bổ sung đủ 30 danh hiệu Phong Tặng (6 tên cho mỗi cấp khung 1–5), tái sử dụng năm asset tím chuẩn hóa; nhóm Phong Tặng và mục Tất cả hiển thị danh sách cuộn theo lưới 3 cột, giữ Vinh Quang Kỳ Đài ở trước. Cập nhật danh sách tên, ý nghĩa và mã nội bộ trong `docs/HONOR-SYSTEM.md`. Đây là catalog giao diện, chưa nối luồng phong/cấp danh hiệu.
- 2026-09-28: Chuẩn hóa 5 khung tím thành PNG transparent 1500×500, scale theo vùng thân đặt chữ, căn tâm vùng thân về cùng tâm canvas; UI dùng chung ô 3:1 với `object-fit: contain`. Không thể kiểm tra trực tiếp trong browser vì phiên làm việc không có browser khả dụng; đã kiểm tra trực quan 5 asset đầu ra.
- 2026-09-28: Tạo `docs/HONOR-SYSTEM.md` để lưu quy ước 23 khung danh hiệu, màu nhóm, thứ bậc, mapping nội dung, mã nội bộ và quy tắc hiển thị; liên kết tài liệu từ AGENTS.md.
- 2026-09-28: Khôi phục tên gốc cho năm danh hiệu phong tặng; dùng cùng cỡ chữ, màu chữ và khung 3:1 như danh hiệu Vinh Quang Kỳ Đài.
- 2026-09-28: Đổi tên năm khung trong Danh Hiệu Phong Tặng thành Danh Hiệu Phong Tặng 1–5; giữ nguyên thứ tự và ảnh.
- 2026-09-28: Thay nhánh snapshot thử nghiệm bằng `OPENING_MODE` (`clip`/`cover-transform`); mode cover giữ nguyên board live và mở bốn panel cố định bằng transform3d, gỡ cover sau 600ms. Build chờ xác nhận.
- 2026-09-28: Thu hitbox bốn chế độ Home về đúng bounding box alpha của từng ảnh thay vì ô vuông lớn; vùng trống quanh ảnh không còn nhận click. Typecheck/build PASS.
- 2026-09-28: Giữ nguyên reveal clip-path bung từ tâm cho cờ Tướng/Cờ Úp; thêm will-change cho scene để trình duyệt chuẩn bị layer cắt trước animation. Quân cờ/thẻ người chơi hiện sẵn bên dưới hiệu ứng. Typecheck/build PASS; chưa browser QA.
- 2026-09-28: Thu phạm vi bấm của bốn chế độ Home về vùng hình/nút; vùng trống bên dưới không còn kích hoạt chế độ. Typecheck/build PASS.
- 2026-09-28: Thu phạm vi click mở hồ sơ Home về avatar; tên và ELO không còn nằm trong nút mở hồ sơ. Typecheck/build PASS.
- 2026-09-28: Gom các asset còn nằm trực tiếp trong `src/assets/` vào `profile/`, `icons/`, `audio/` và `references/`; cập nhật import đang dùng. Typecheck/build PASS.
- 2026-09-28: Trong preview Chỉnh sửa avatar, bỏ viền lồng chiếm diện tích để ảnh tròn phủ hết lòng khung avatar; build PASS.
- 2026-09-28: Phóng icon Skin riêng bằng scale 125% để bù khoảng alpha trong ảnh và cân với các icon tab còn lại, không đổi kích thước thẻ; build PASS.
- 2026-09-28: Bỏ độ dịch xuống 2px của icon các tab Chỉnh sửa avatar để icon căn giữa cùng dòng chữ; build PASS.
- 2026-09-28: Hạ sáng góc chuyển sắc của khung thông tin tên trong ProfileDialog để tông nâu trầm gần với khung Danh hiệu bên dưới; build PASS.
- 2026-09-28: Thay biểu tượng sửa tên/địa chỉ bằng asset `903174a3-cfa1-4f7c-badc-1dd24d62c991.png`, hiển thị lớn hơn trong nút hiện có; build PASS.
- 2026-09-28: Đồng bộ nền khung tên với nền khung Danh hiệu (`#3b1d0b` → `#1b100b`); build PASS.
- 2026-09-28: Thêm ID khách gồm 9 chữ số, lưu ổn định trong localStorage, hiển thị nhỏ màu xám ở hồ sơ của mình và thêm nút sao chép; build PASS.
- 2026-09-28: Thêm 1 Thẻ đổi tên thử nghiệm lưu trong localStorage; yêu cầu thẻ để mở sửa tên, chỉ tiêu hao khi tên đổi thành công và khóa nút khi hết thẻ; build PASS.
- 2026-09-28: Hạ rõ tông khung tên xuống gradient nâu trầm `#2a160b` → `#1b100b` sau phản hồi rằng màu trước khó nhận ra; build PASS.
- 2026-09-28: Căn nội dung hai ô chỉ số về trái và kéo hàng Bạn bè/Theo dõi/Lượt thích full-width để các hàng trong khung hồ sơ bám cùng mép trái; build PASS.
- 2026-09-28: Tăng dòng ID hồ sơ từ 13px lên 15px và căn cả mã/nút sao chép về mép phải; build PASS.
- 2026-09-28: Gỡ sửa tên và bút cạnh tên khỏi hồ sơ; giữ nguyên sửa địa chỉ và nhập tên ở luồng vào phòng, gỡ yêu cầu Thẻ đổi tên khỏi profile; build PASS.
- 2026-09-28: Căn khung thông tin tên giữa theo chiều dọc với hàng hồ sơ, bỏ độ dịch lên trước đó ở cả hồ sơ chủ và hồ sơ xem; build PASS.
- 2026-09-28: Căn lại tâm khung thông tin tên theo cụm avatar và bảng danh hiệu bằng cách nâng 15px; build PASS.
- 2026-09-28: Đổi nền khung tên sang gradient ngang từ trái `#281408` sang phải `#1C0F08`; build PASS.
- 2026-09-28: Nhích khung tên lên thêm 6px, độ dịch dọc hiện tại là -21px; build PASS.
- 2026-09-27: Bấm avatar trong Hồ sơ Home mở màn Tùy chỉnh avatar; thử nghiệm một khung rồng đỏ trong lưới 6×3 (17 ô mẫu khóa), có xem trước, Hủy và Sử dụng. Typecheck/build PASS.
- 2026-09-27: Dịch toàn bộ hộp thoại Tùy chỉnh avatar lên 20px để viền trên gần mép hơn; không đổi vị trí Hồ sơ.
- 2026-09-27: Thu khung xem trước bên phải còn nhỉnh hơn nửa bề ngang khu trên; tăng khung avatar và căn giữa trong cột trái, giữ tên bên dưới.
- 2026-09-27: Dùng lại nền cảnh Hồ sơ sau khu preview avatar; thay nhãn tên tạm bằng asset khung tên gỗ và quân Tướng tròn, căn tên ở giữa ngay dưới avatar.
- 2026-09-27: Hoàn tác dịch chuyển hộp thoại; giữ nguyên vị trí avatar và kéo nền cảnh liền từ đầu khung tới hết vùng hồ sơ phía trên, lấp khoảng trống dưới tiêu đề.
- 2026-09-27: Kéo nền cảnh trong màn Tùy chỉnh avatar lên phủ cả khoảng trống dưới tiêu đề và hết hàng preview; kết thúc nền trước các tab, giữ nguyên vị trí avatar.
- 2026-09-27: Đưa nút Đóng của màn Tùy chỉnh ra góc trên bên phải, không đổi nút Hồ sơ; nhích khung tên avatar lên 4px.
- 2026-09-27: Dịch nút Đóng thêm 18px về góc phải; giảm khoảng trống dưới tiêu đề Hồ sơ để đẩy hàng hồ sơ lên 8px.
- 2026-09-27: Tăng cao tấm tiêu đề Tùy chỉnh avatar và nhích lên nhẹ để che phần chữ “Thông tin” lộ từ banner bên dưới, bỏ cảm giác hai khung chồng nhau.
- 2026-09-27: Tăng tấm tiêu đề tùy chỉnh thêm 5px và căn giữa lại theo chiều dọc.
- 2026-09-27: Dịch hộp thoại Tùy chỉnh lên 50px; dùng banner Hồ sơ làm khung tiêu đề duy nhất và thay chữ bằng lớp nền phẳng, bỏ viền lồng gây chồng khung.
- 2026-09-27: Điều chỉnh theo xác nhận: tăng chiều cao toàn hộp thoại Tùy chỉnh thêm 50px và căn giữa dọc; bỏ dịch chuyển lên 50px.
- 2026-09-27: Đặt asset 9a48f628-f3a9-4a19-ba3c-a7ae83b0b6c2 làm nền ảnh cho khu hồ sơ phía trên; khôi phục nền khung/panel đặc để bỏ hiệu ứng nhìn xuyên nền trang.
- 2026-09-27: Làm nền khung và panel Hồ sơ bán trong suốt để lộ cảnh Home phía sau theo ảnh tham chiếu; giữ nguyên bố cục và các thẻ nội dung.
- 2026-09-27: Thêm icon chỉnh sửa tên và địa chỉ căn phải trong hồ sơ Home; cho phép sửa inline, lưu bằng nút/Enter hoặc hủy bằng nút/Escape. Hồ sơ xem đối thủ không hiện chức năng chỉnh sửa.
- 2026-09-27: Dịch icon của hai ELO trên Home sang phải 2px và tăng số Cờ Úp lên cùng kiểu/cỡ 18px như Cờ Tướng.
- 2026-09-27: Dùng chung khung ELO ảnh của Cờ Tướng cho ô Cờ Úp bên phải trên Home; giữ biểu tượng và số ELO của Cờ Úp.
- 2026-09-27: Phóng khung danh hiệu dưới avatar Home theo tỷ lệ avatar 100/84, tăng chiều rộng từ 172px lên 205px và giữ căn giữa.
- 2026-09-27: Phóng avatar trên Home từ 84px lên 100px; căn lại khung Tân Binh để tiếp tục áp sát mép dưới avatar.
- 2026-09-27: Phóng khung ELO Cờ Tướng trên Home phủ kín ô 88×28px để khớp kích thước với ô Cờ Úp bên phải.
- 2026-09-27: Tăng số ELO Cờ Tướng bên trái trên Home lên kiểu hiển thị 18px Times New Roman, đồng bộ với ELO trong thẻ người chơi; giữ nguyên ELO Cờ Úp bên phải.
- 2026-09-27: Panel người xem chỉ hiển thị người không ngồi trên bàn. Kết thúc ván có người thắng và có người xếp hàng thì gửi lời mời “Đấu với …?” riêng cho người thắng; chấp nhận đổi ghế người thua với người đầu hàng và đưa người thua xuống cuối hàng, từ chối giữ nguyên hai ghế. Typecheck/build PASS.
- 2026-09-27: Hiệu ứng nảy dùng lại bóng nền sẵn có của mỗi quân; bóng dịch chéo xuống phải theo độ cao/tốc độ nảy, kéo dài chéo và tăng blur khi bay lên, giữ trên không 0,4 giây rồi thu ngược về trạng thái gốc trong lúc đáp 0,1 giây. Không tạo lớp bóng mới. Typecheck/build PASS.
- 2026-09-27: Tách hai nút Xếp hàng/Thoát hàng nguyên pixel từ `src/assets/image.png`; cho người vào bàn đầy/đang chơi tham gia xem, xếp hàng bằng nút ảnh, hiện ở khung vàng kèm số thứ tự và tự chuyển người đầu hàng lên ghế khi ghế trống. Người xem chat/xem nhưng không thao tác ván. Typecheck/build PASS.
- 2026-09-26: Gom asset từng nằm ở gốc `src/assets` vào `audio`, `boards/source`, `pieces/coden-codo-v1`, `icons`, `references` và `room-users`; cập nhật import, script cắt quân và ghi chú nguồn.
- 2026-09-26: TEST A debug tạm thời: `DEBUG_DISABLE_BACKGROUND_SCREENSHOTS` bật trong dev để ngăn screenshot worker tự render/mã hóa PNG khi snapshot đổi; bấm Chụp hình vẫn render theo yêu cầu. Production không bị ảnh hưởng; typecheck/build PASS.
- 2026-09-26: Giảm giật khi đi quân: bỏ chuyển động CSS `top` chồng lên animation transform, đưa quân bằng `translate3d` có compositor; memo hóa chat để tránh dựng lại danh sách tin nhắn theo nhịp đồng hồ. Build PASS.
- 2026-09-26: Tránh seek/reset hai MP4 mỗi lần đi quân; chỉ pause intro khi nó còn chạy và tua về đầu lúc bắt đầu ván tiếp theo. Build PASS.
- 2026-09-26: Phát MP4 `1790415939459_2137874395677077050_7229889354659670468` trước ở volume 0.9; preload MP4 còn lại im lặng rồi tua/bật tiếng ở mốc 1/5, để track đầu chạy đến hết. Build PASS.
- 2026-09-26: Tạo bong bóng like trực tiếp trong click handler qua Web Animations API, không chờ React cập nhật state/layout effect; giữ giới hạn 100ms, nút không đổi. Build PASS.
- 2026-09-26: Cho bong bóng like hiện ngay ở frame đầu thay vì fade-in trễ, rút thời gian bay còn 650ms để hết dồn hiệu ứng nhanh hơn; giữ nguyên nút. Build PASS.
- 2026-09-26: Giới hạn tạo bong bóng like ở một lần mỗi 100ms để tránh dồn hiệu ứng; không khóa, giảm sáng hoặc nhấp nháy nút. Build PASS.
- 2026-09-26: Khởi chạy từng bong bóng like đồng bộ ngay sau khi mount bằng useLayoutEffect; không xếp lịch tạo bóng sau khi ngừng bấm, các animation đang chạy vẫn tự hoàn tất. Build PASS.
- 2026-09-26: Khi bấm nút like, hiện bong bóng tròn chứa icon trắng bay lên và mờ dần; animation chạy trong component nút, tôn trọng reduced motion. Build PASS.
- 2026-09-26: Tách dấu like từ src/assets/images.jpg thành PNG trắng nền trong suốt tight-crop 186×200, gắn vào nút like; xác minh alpha và khung cắt. Build PASS.
- 2026-09-26: Vẽ lại icon like theo hình tham chiếu: cổ tay trái, ngón cái hướng lên và bàn tay bo tròn; giữ màu trắng. Build PASS.
- 2026-09-26: Đổi biểu tượng like sang màu trắng, giữ nguyên nền và viền vòng tròn. Build PASS.
- 2026-09-26: Thay icon like bằng silhouette ngón tay cái kiểu Facebook Like, giữ màu kem và vòng tròn phát sáng. Build PASS.
- 2026-09-26: Đổi icon tim thành ngón tay cái like và tăng vòng tròn lên 40px (compact 36px). Build PASS.
- 2026-09-26: Đổi nút like sang tim vàng kem, nền tròn xanh tối bán trong suốt và viền kem phát sáng. Build PASS.
- 2026-09-26: Thêm nút like cách avatar 15px, căn giữa theo chiều cao; người chơi thấy nút ở phía đối thủ, người xem thấy cả hai. Nút bật/tắt cục bộ, chưa gửi reaction cho phòng. Build PASS.

- 2026-09-26: Hoàn tác đổi tông màu thẻ người xem theo yêu cầu; khôi phục khung asset xanh xám ban đầu. Build PASS.
- 2026-09-26: Chỉnh nền và khung các thẻ người xem sang nền xanh đậm và viền vàng hợp tông khung chat; giữ nguyên asset khung và nội dung. Build PASS.
- 2026-09-26: Bo góc nhẹ bảng gợi ý và từng nút; đổi nền sang xanh giao diện hiện có để tăng độ phân biệt. Build PASS.
- 2026-09-26: Bảng gợi ý chat phủ hết vùng nội dung phía trên ô nhập; bỏ bo góc ở bảng và từng gợi ý để hiển thị trọn danh sách. Build PASS.
- 2026-09-26: Khi bấm emoji hoặc gợi ý lúc chat đang thu gọn, tự mở khung rồi hiển thị đúng picker; khung vẫn neo đáy. Build PASS.
- 2026-09-26: Chuyển mũi tên chat sang cyan xanh hơn, tăng chiều cao tam giác giữ nguyên bề rộng; khi thu gọn, ghim ô nhập xuống đáy trong khung để không nhảy lên. Build PASS.
- 2026-09-26: Đổi nút thu/mở chat sang tam giác đặc xanh ngọc, đỉnh cao hơn; giữ thao tác đổi chiều cao và neo đáy khung chat cố định. Build PASS.
- 2026-09-26: Bỏ nút tròn thu/mở ở góc trên khung chat; chuyển thành chevron xanh ngọc ở góc phải ngay trên ô nhập. Build PASS.
- 2026-09-26: Bỏ outline và focus ring mặc định trên ô nhập chat khi focus. Build PASS.
- 2026-09-26: Chuyển bóng icon gợi ý chat vào trong bong bóng bằng gradient đen đổ xuống; giữ thân icon trắng và các chấm dễ đọc. Build PASS.
- 2026-09-26: Tăng hai icon chat lên 24px và thu vùng nút xuống 28px để icon gần nhau hơn. Build PASS.
- 2026-09-26: Đổi icon mặt cười sang gradient vàng theo mẫu; icon chat chuyển trắng và thêm bóng nhẹ bên dưới. Build PASS.
- 2026-09-26: Tô kín icon biểu cảm và gợi ý chat bằng màu vàng hiện có, giữ chi tiết bên trong màu nền tối. Build PASS.
- 2026-09-26: Nâng khung chat compact lên 8px bằng cách tăng bottom offset; giữ nguyên kích thước và bố cục nội dung. Build PASS.
- 2026-09-26: Khắc phục preload screenshot Worker khi trình duyệt không giải mã được avatar SVG bằng PNG dự phòng có sẵn; lỗi asset khác giờ báo rõ tên. Build PASS; chưa kiểm tra runtime trong browser.
- 2026-09-26: Thay chụp DOM bằng screenshot renderer Worker/OffscreenCanvas; cache asset trong worker, gửi snapshot có version cho bàn cờ/quân cờ/hai người chơi/ELO/đồng hồ, giữ blob/version mới nhất bằng refs và chờ đúng version khi tải. Gỡ `html-to-image`. Typecheck/build PASS; browser QA không khả dụng.

- 2026-09-26: Giảm khựng khi chơi: không dựng screenshot nền khi đang chờ hoặc chơi; chỉ chuẩn bị sau 5 giây ở màn hình kết thúc, bỏ quét font toàn màn hình lúc mở game và tránh hai lượt `html-to-image` chồng nhau. Typecheck/build PASS.

- 2026-09-26: Khôi phục hình marker nước đi gốc từ `src/assets/image.png` (hash `y3X00btU` trùng marker cũ trong dist), giữ kích thước hiển thị gốc và bỏ CSS drop-shadow dư. Chặn thông báo store khi đồng hồ tick nhưng game chưa chạy/đã kết thúc, tránh render thừa 10 lần/giây. Typecheck/build PASS.

- 2026-09-26: Rà asset sau hiện tượng giật: `otron.png` bị thiếu đã được thay bằng marker tight-crop hiện có, build không còn import thiếu. Giảm tải main thread bằng cách chỉ chuẩn bị screenshot sau khi bàn cờ ổn định 1200ms và trình duyệt rảnh; vẫn giữ blob hợp lệ gần nhất để tải tức thì. Typecheck/build PASS.

- 2026-09-26: Giảm giật khi chọn quân: dùng marker đã tight-crop 480×475 thay cho ảnh cũ 1254×1254 có vùng trong suốt lớn và bỏ `drop-shadow` GPU trên từng marker nước hợp lệ; ảnh marker vốn đã có hiệu ứng sáng. Typecheck/build PASS.

- 2026-09-26: Khung chat dùng nền, viền và bóng của khung danh sách người chơi; bỏ nền tròn trắng quanh icon và đổi màu icon sang vàng kem #f0c995. Sửa import marker nước đi trong `Board.tsx` sang asset hiện có `move-indicator-dot-user.png`; typecheck/build PASS.

- 2026-09-26: Mở rộng chat để cách bàn cờ và viền ngoài 8px; đổi khung ngoài thành hình chữ nhật, giảm khoảng tin nhắn còn 6px và giảm chiều cao ô nhập 10px. Typecheck/build PASS.

- 2026-09-26: Cố định khung chat vào đáy cột bên phải để cạnh dưới ngang viền dưới khu vực game; chiều cao tăng về phía trên, compact cũng bỏ khoảng lệch đáy 15px. Typecheck/build PASS.

- 2026-09-26: Tăng thêm 20px chiều cao khung chat đang mở; tăng khoảng đệm trên vùng tin nhắn từ 4px lên 12px và giảm khoảng cách giữa các tin từ 15px xuống 10px. Typecheck/build PASS.

- 2026-09-26: Tăng thêm 20px chiều cao khung chat đang mở; chuyển nút thu gọn lên góc khung và giảm padding đầu vùng tin nhắn từ 15px xuống 4px để nội dung sát viền hơn. Typecheck/build PASS.

- 2026-09-26: Tăng thêm 10px chiều cao khung chat đang mở; giữ nội dung cách đầu vùng tin nhắn 15px và tăng khoảng cách giữa các tin lên 15px. Typecheck/build PASS.

- 2026-09-26: Theo ảnh tham chiếu, đẩy khung chat lên 15px, thu thêm 10px, tăng khoảng cách trên của tin nhắn lên 15px và khoảng cách giữa tin nhắn lên 10px; bỏ vạch ngăn, thêm nền tròn trắng cho icon. Typecheck/build PASS.

- 2026-09-26: Theo yêu cầu, đảo ngược lần hoàn tác trước: ô chat trở lại hẹp hơn 10px/cao hơn 10px, ba gợi ý nằm trong popup từ icon chat cạnh emoji. Cập nhật regression mở popup rồi gửi gợi ý. Typecheck/build PASS.

- 2026-09-26: Ô chat hẹp 10px và cao thêm 10px. Thu ba gợi ý thành popup mở từ icon bong bóng cạnh icon mặt cười; từng gợi ý thấp hơn trước và popup rộng hơn khung 3px. Cập nhật regression mở popup rồi gửi gợi ý. Typecheck/build PASS.

- 2026-09-26: Làm lại ô chat theo ảnh tham chiếu: khung xanh đậm viền vàng, ba gợi ý Chào bạn!/Nước đi hay!/Chúc bạn chơi vui! dạng nút có icon hội thoại và mũi tên; ô nhập bo tròn, nút gửi hình máy bay giấy. Giữ lịch sử tin, gửi nhanh, emoji, thu gọn/mở rộng và responsive. Cập nhật UI regression theo gợi ý luôn hiển thị khi mở chat. Build cần chạy.

- 2026-09-26: Chụp hình dùng Blob chuẩn bị nền ở idle sau mỗi thay đổi board và sau khi animation kết thúc; Blob mới lưu trong ref, Blob hợp lệ trước đó vẫn dùng trong lúc bản mới đang tạo. Click chỉ tạo Object URL/tải ngay, không gọi html-to-image hoặc cập nhật state khi thành công. pixelRatio 1; ghi Performance measure và console cho thời gian tạo Blob/click-to-download. Typecheck/build PASS; chưa có số đo runtime trong browser.

- 2026-09-26: Chụp hình dùng Blob chuẩn bị nền ở idle sau mỗi thay đổi board và sau khi animation kết thúc; Blob mới lưu trong ref, Blob hợp lệ trước đó vẫn dùng trong lúc bản mới đang tạo. Click chỉ tạo Object URL/tải ngay, không gọi html-to-image hoặc cập nhật state khi thành công. pixelRatio 1; ghi Performance measure và console cho thời gian tạo Blob/click-to-download. Typecheck/build PASS; chưa đo số liệu thực tế trong browser.

- 2026-09-26: Nút Chụp hình chụp trực tiếp `#gameScreen` bằng html-to-image `toBlob` ở pixelRatio 2, tạo Object URL và tự tải `co-tuong-[timestamp].png`, sau đó thu hồi URL. Không mở chọn vùng/preview/tab mới; dùng ref chống bấm lặp để thao tác không cập nhật state/re-render bàn cờ; thêm thông báo lỗi asset CORS. Build cần chạy.

- 2026-09-26: Tối ưu tiếp nút chụp ảnh: chuẩn bị sẵn CSS font ngay khi vào bàn và tái sử dụng lúc chụp, đồng thời xuất ở đúng kích thước màn hình (pixelRatio 1) để giảm thời gian dựng PNG khi bấm. Build cần chạy.

- 2026-09-26: Chụp màn hình bắt đầu ngay trong thao tác bấm: preload html-to-image khi mở bàn cờ, bỏ chờ fonts.ready và gọi dựng ảnh trước khi cập nhật trạng thái nút đang chụp. Giữ pixelRatio 1.5; build cần chạy.

- 2026-09-26: Tăng tốc chụp màn hình ván cờ bằng cách giảm pixelRatio từ 2 xuống 1.5; giảm khoảng 44% số pixel render trong khi ảnh vẫn xuất lớn hơn kích thước hiển thị. Cập nhật kỳ vọng test hiện có; build cần chạy.

- 2026-09-25: Rà các đoạn video có chuyển động (bỏ khung đầu còn nút phát); quân lướt liên tục qua giao điểm. Bổ sung nhấc/nghiêng nhẹ ở 76% ô cuối; tới đích trong 125ms. Khi ăn quân, nhấc cao 124px, phóng 1.2×, tăng bóng đổ, nghiêng 42° rồi đập xuống trong 250ms; clock chờ đúng 125ms hoặc 375ms. Build cần chạy lại; chưa QA trực quan trên browser.

- 2026-09-24: Cắt và thay toàn bộ 14 asset quân từ hai bộ ảnh người dùng cung cấp; mỗi quân crop sát alpha, mapping đủ 7 loại mỗi bên. Bỏ filter mực đen và drop-shadow CSS vì màu/bóng đã có sẵn trong PNG.
- 2026-09-24: Tạo và áp dụng thử riêng hàng 5 Tốt đỏ bằng asset `red-soldier-maple-v2.png` (902×930, crop alpha sát): gỗ sáng, chữ/viền đỏ và bóng gọn theo ảnh mẫu; không chồng thêm CSS shadow, các loại quân khác giữ nguyên.
- 2026-09-24: Thay bàn v3: bỏ viền đen ngoài cùng, cân khung gỗ trên/dưới bằng hai bên và crop sát 1141×1306; đo lại 90 giao điểm cùng tỷ lệ layout, quân/marker/vùng bấm giữ nguyên kích thước hiển thị.
- 2026-09-24: Thay bàn bằng asset gỗ phong sáng tạo từ ảnh mẫu (`xiangqi-board-light-maple-v2.png`, crop sát 1078×1250); đo lại 90 giao điểm, tỷ lệ bàn/quân/vùng bấm, bỏ watermark cũ và chỉnh bóng quân mềm gọn theo mẫu. Logic game giữ nguyên.
- 2026-09-24: Chuẩn hóa mọi nước đi local về đúng 250ms bất kể khoảng cách (nước gần có vận tốc chậm hơn, nước xa nhanh hơn); nước ăn bắt đầu nhấc từ 40% quãng animation, đạt cao 18px ở 72% rồi đáp đúng hạn 250ms.
- 2026-09-24: Sửa quỹ đạo ăn quân thành đường thẳng đúng tâm ô đích: bỏ lệch ngang 4px và xoay 3°, chỉ còn nhấc dọc 11px rồi đáp tại cùng tọa độ.
- 2026-09-24: Làm chậm riêng pha cong lên/đập xuống của animation ăn quân thêm 180ms; quãng bay tới giữ tốc độ cũ và completeAnimation chờ đúng tổng thời lượng để quân bị ăn không biến mất sớm.
- 2026-09-24: Thêm animation ăn quân nhiều nhịp: quân bay tới 62%, nhấc cao 11px và lệch chéo 4px ở 84%, rồi đập xuống mục tiêu; chỉ chạy khi ô đích có quân, tôn trọng prefers-reduced-motion và quân ăn giữ z-index trên cùng.
- 2026-09-24: Gỡ hoàn toàn hành vi máy tự gửi yêu cầu hoàn tác và dừng đồng hồ cho yêu cầu đó; hoàn tác do người chơi với máy và yêu cầu hoàn tác phòng online vẫn giữ nguyên.
- 2026-09-24: Đặt quân đang chạy animation ở z-index 20 để khi ăn quân luôn nằm trên quân bị ăn; sau animation, quân trở lại thứ tự lớp theo hàng hiển thị.
- 2026-09-24: Đưa marker/chấm nước đi xuống dưới lớp quân để glow không làm mờ mặt quân; quân được chọn nhấc lên 6px, scale 1.04 và giảm nhẹ glow ngoài, giúp quân nổi rõ trên hiệu ứng.
- 2026-09-24: Làm lại marker theo ảnh mẫu: chấm nước đi 13px có tâm cam/vòng vàng sáng và glow rõ; khung chọn quân 60px với bốn góc 18px, nét 4px trắng vàng và viền sáng cam, không phủ mặt quân.
- 2026-09-24: Tăng độ rõ bóng ngoài quân: offset 3×5px, opacity 55%, giảm blur còn 1px để bóng đậm và gọn hơn thay vì nhòe; áp dụng đồng nhất quân đỏ/đen.
- 2026-09-24: Làm nhẹ bóng ngoài của toàn bộ quân đỏ/đen: giảm độ lệch 4×6px xuống 3×4px và opacity từ 60% xuống 35%; giữ nguyên asset, chữ, viền, màu và bộ lọc chữ quân đen.
- 2026-09-24: Làm rõ phong cảnh nền màn chơi: bỏ blur 0.6px, tăng nhẹ contrast/saturation lên 1.08 và giảm độ tối viền phủ từ alpha 0x33 xuống 0x1f; không đổi bàn, quân hay panel.
- 2026-09-24: Sửa bóng quân phía trên phủ lên quân phía dưới: bỏ z-index toàn cục của quân được chọn/đang chạy và xếp lớp quân theo hàng hiển thị, có hỗ trợ bàn đảo chiều; quân luôn nằm trên bóng của hàng phía trên.
- 2026-09-24: Tăng kích thước quân cờ thêm 2px mỗi chiều thành 50.6×54px theo yêu cầu; giữ nguyên tâm giao điểm, tọa độ bàn và vùng bấm.
- 2026-09-24: Sửa hai quân ở hàng liền nhau bị chồng hình bằng cách giới hạn asset quân còn 48.6×52px theo đúng tỷ lệ cũ; chiều cao không còn vượt bước hàng nhỏ nhất, tâm giao điểm và vùng bấm giữ nguyên.
- 2026-09-24: Sửa quân ngoài biên bị gờ gỗ lấn bằng cách thu vùng 90 giao điểm vào 5px ở bốn mép và nội suy lại hàng/cột; kích thước quân giữ nguyên, vùng bấm và marker đi theo tọa độ mới.
- 2026-09-24: Bỏ lớp bóng nâu CSS vừa thêm để quân dùng lại bóng tự nhiên trong asset; giảm nhẹ glow chọn quân từ 3/7px xuống 2/5px, giữ kích thước quân hiện tại.
- 2026-09-24: Tăng quân cờ lại 1px mỗi chiều (55.26×59.14px) và bổ sung bóng đổ nâu nhẹ phía dưới; hiệu ứng phát sáng khi chọn quân vẫn được giữ.
- 2026-09-24: Giảm riêng kích thước quân cờ thêm 2px theo cả chiều rộng và chiều cao (54.26×58.14px trong lớp tọa độ), giữ nguyên kích thước bàn và tâm giao điểm.
- 2026-09-24: Bù lại hệ số phóng 3% của bàn mới để quân cờ giữ đúng kích thước hiển thị trước khi tăng bàn (56.26×60.14px trong lớp tọa độ); chỉ bàn và khoảng cách được mở rộng.
- 2026-09-24: Hoàn tác phần khung gỗ nới thêm 8px và tăng tiếp kích thước toàn bàn khoảng 3%; giữ nguyên tỷ lệ, lưới và vị trí quân.
- 2026-09-24: Làm dày khung gỗ quanh bàn thêm 8px mỗi cạnh để tạo khoảng thở giữa quân ngoài cùng và mép khung; giữ nguyên lưới, kích thước quân và tỷ lệ bàn.
- 2026-09-24: Tăng kích thước hiển thị bàn gỗ mới khoảng 3%, giữ nguyên tỷ lệ và tọa độ 90 giao điểm.
- 2026-09-24: Thay riêng asset bàn bằng bàn gỗ trang trí sắc nét theo ảnh mẫu (1222×1287), đúng 9×10 giao điểm; đo lại tọa độ quân/vùng bấm, bỏ lớp khung kéo dài cũ vì khung đã tích hợp trong ảnh. Quân và marker giữ nguyên.
- 2026-09-24: Tăng nhẹ nút Sẵn sàng từ 190px lên 205px (compact 150px lên 162px); bỏ hoàn toàn transform nhấc 14px và nghiêng 18° của quân đang chọn, giữ glow chọn quân.
- 2026-09-24: Làm rõ riêng chữ quân đen bằng lớp mực #050606 opacity 82% trong vùng giữa mặt quân; mặt nạ loại trừ vòng viền và phần gỗ, quân đỏ giữ nguyên.
- 2026-09-24: Hoàn tác đổi màu vòng viền quân đen sang #F8D394; quân đen trở về nguyên màu asset AI v1 và xóa bộ lọc vòng viền vừa thêm.
- 2026-09-24: Sửa bộ lọc vòng viền quân đen để bao gồm mép mực khử răng cưa ngả nâu và tăng độ phủ màu thay thế, tránh sót hai mép đen quanh màu #F8D394.
- 2026-09-24: Áp dụng màu #F8D394 cho vòng viền khắc bên trong quân đen bằng bộ lọc giới hạn vùng vòng viền và pixel mực; loại trừ chữ ở giữa và gỗ bên ngoài.
- 2026-09-24: Nới ngang bàn thêm 3% và giảm cao thêm 3%, cập nhật đồng bộ tỷ lệ nền, giao điểm và vùng bấm; giữ kích thước quân.
- 2026-09-24: Hoàn tác hiệu ứng làm đậm quân đen, dùng lại nguyên màu asset AI v1 khi tạo chung với quân đỏ; giữ kích thước hiện tại.
- 2026-09-24: Giới hạn bộ lọc mực đen vào vùng chữ giữa mặt quân, loại vòng viền khắc khỏi vùng làm đậm theo yêu cầu; giữ nguyên màu gỗ và vòng viền.
- 2026-09-24: Bỏ contrast toàn ảnh quân đen; dùng SVG filter khoanh vùng pixel tối gần trung tính để làm đậm mực đen, loại trừ sắc gỗ ấm khỏi vùng điều chỉnh.
- 2026-09-24: Tăng tương phản hiển thị riêng quân đen 18% để chữ và vòng viền đậm hơn; giữ nguyên ảnh nguồn và quân đỏ.
- 2026-09-24: Đổi khung quân thành 58×62px; bỏ overflow-hidden và paint containment tại mặt bàn/khung ngoài để không cắt quân sát mép hoặc khi nhấc lên.
- 2026-09-24: Thay toàn bộ 14 loại quân bằng bộ AI cùng phong cách Tốt đỏ đã duyệt; bỏ preview riêng một quân, tăng khung quân từ 58×58px lên 60×60px. Đã đối chiếu trực quan cả bộ chữ đỏ/đen.
- 2026-09-24: Áp dụng thử ảnh AI mới riêng cho quân Tốt đỏ trung tâm (id red-6-4) trên bàn Cờ Tướng; ảnh theo quân khi di chuyển, các quân khác giữ nguyên.
- 2026-09-24: Nới ngang mặt bàn 4%, giảm cao 3%; cập nhật đồng bộ tọa độ quân, marker và vùng bấm theo tỷ lệ mới, giữ nguyên khung quân vuông.
- 2026-09-24: Làm rõ toàn bộ 14 asset quân cờ bằng upscale bicubic 3× và sharpen nhẹ có bảo toàn alpha/chữ Hán; lưu bản `*-hd.png` và chuyển ChessPiece sang dùng bộ HD.
- 2026-09-24: Tăng thêm kích thước bàn cờ bằng cách giảm khoảng dự phòng dọc từ 18px còn 4px; lớp bàn và tọa độ giao điểm phóng đồng bộ nên khoảng cách giữa các quân rộng hơn.
- 2026-09-24: Tăng nhẹ diện tích hiển thị bàn cờ bằng cách giảm khoảng dự phòng dọc 12px; sửa vùng ảnh quân từ 56×59px thành vuông 58×58px để quân tròn, không còn bị kéo dọc.
- 2026-09-24: Tạo asset bàn cờ v4 giữ nguyên 1173×1341px và toàn bộ hình học/khung gỗ, chỉ làm đường lưới bên trong nhạt hơn và nâu ấm hơn; Board đã chuyển sang dùng asset mới.
- 2026-09-24: Đổi hiệu ứng chọn quân/nước hợp lệ sang tông cam đỏ phát sáng theo ảnh mẫu: quân chọn có khung góc và glow, ô trống có chấm sáng, vị trí ăn quân có khung góc cùng màu.
- 2026-09-24: Tăng độ bay của quân đang chọn từ 8px lên 14px, giữ độ nghiêng 18°.
- 2026-09-24: Tăng độ nổi của animation chọn quân từ 4px lên 8px và độ nghiêng phối cảnh từ 10° lên 18° theo yêu cầu.
- 2026-09-24: Thêm animation chọn quân trên Board: quân được nhấc thấp 4px và nghiêng 10° theo phối cảnh; phe gần người xem nghiêng về trước, phe đối diện nghiêng ngược lại, hỗ trợ cả bàn đảo chiều và motion-reduce.
- 2026-09-24: Tăng nhẹ thẻ tên PlayerCard từ 158×35px lên 170×39px, chữ tên từ 18px lên 20px; compact tăng thành 120×28px và chữ 14px.
- 2026-09-24: Tăng padding ngang của thẻ ELO tự ôm nội dung từ 8px lên 14px ở desktop và compact.
- 2026-09-24: Bỏ chiều rộng cố định của thẻ ELO trong PlayerCard; thẻ tự ôm cụm icon–số với padding ngang đúng 8px ở desktop và compact.
- 2026-09-24: Tăng chữ ELO lên 18px (compact 13px), khung cao 37px (compact 30px); nền khung phủ đầy kích thước để chiều cao hiển thị tăng theo container.
- 2026-09-24: Sửa các chữ số ELO cao thấp khác nhau do Georgia: dùng Times New Roman và lining-nums riêng cho số trong PlayerCard; giữ nguyên kích thước thẻ.
- 2026-09-24: Tăng thẻ ELO trong PlayerCard đúng 8px chiều rộng và 5px chiều cao thành 130×33px (compact 96×26px); bỏ dịch chuyển riêng và căn số ELO vào giữa theo chiều dọc.
- 2026-09-24: Thu gọn đồng bộ thẻ ELO trong PlayerCard còn 122×28px (compact 88×21px), giảm icon/chữ và nâng số 1px để icon–số thẳng hàng theo thị giác.
- 2026-09-24: Thu chiều ngang thẻ ELO trong PlayerCard từ 142px xuống 134px (compact 96px), bỏ phần đệm lệch và căn giữa theo chiều dọc cụm biểu tượng–số.
- 2026-09-24: Tăng nhẹ thẻ ELO trong PlayerCard lên 142×44px (compact 100×31px), đồng thời tạo khoảng cách 10px giữa biểu tượng và số ELO để nội dung thoáng, rõ hơn.
- 2026-09-24: Xóa biểu tượng quân đỏ vẽ sẵn khỏi asset nền ELO để không còn chồng với biểu tượng HTML theo phe; tăng khung ELO trong PlayerCard từ 112×35px lên 126×39px (compact 90×28px).
- 2026-09-23: Thiết kế lại khung tên và ELO theo mẫu gỗ nâu/viền vàng, giữ tên và số bằng HTML động; áp dụng khung tên chung cho PlayerCard trong ván và hồ sơ nhanh ngoài Home.
- 2026-09-23: Thêm dải xanh “Sẵn sàng” nền trong suốt đè ngang giữa avatar theo ảnh mẫu; hiển thị riêng trên avatar của thành viên online đã bấm Sẵn sàng trong lúc chờ đối thủ.
- 2026-09-23: Thay asset nút “Sẵn sàng” bằng mẫu kem-vàng mới người dùng cung cấp; tách nền bàn cờ, giữ alpha thật và crop sát còn 1936×499px, không đổi hành vi nút.
- 2026-09-23: Tách nút “Sẵn sàng” từ ảnh người dùng cung cấp thành PNG nền trong suốt, crop sát 2048×669px và thay nút dựng CSS ở giữa bàn; trạng thái “Đang chờ đối thủ…” vẫn dùng chữ động hiện có.
- 2026-09-23: Thêm `capture-piece.wav` từ file người dùng cung cấp và phát riêng cho nước ăn quân; nước đi không bắt quân tiếp tục dùng âm thanh đi quân hiện tại.
- 2026-09-23: Đưa Máy · Cơ bản về thời gian đi 500ms; luôn đặt người chơi ở cột trái và đảo tọa độ hiển thị bàn khi người chơi cầm Đen để quân Đen nằm dưới, không đổi tọa độ/luật game.
- 2026-09-23: Sửa luồng máy xin Đi lại sau nước thứ hai: khi người chơi đồng ý, hoàn cả hai nửa-nước và khôi phục snapshot thời gian của cả hai bên.

- 2026-09-23: Điều chỉnh demo Máy · Cơ bản: khi bấm Sẵn sàng, người chơi chuyển sang Đen để máy Đỏ đi trước; máy chờ 4 giây mỗi lượt và chỉ gửi yêu cầu Đi lại sau khi hoàn tất nước thứ hai của máy (lịch sử đạt 3 nửa-nước), không gửi sau nước mở màn.
- 2026-09-23: Tăng thời gian chờ trước mỗi nước của Máy · Cơ bản từ 550ms lên 4000ms để dễ quan sát UI clock/vòng lượt/popup; Pikafish giữ delay tối thiểu 550ms.
- 2026-09-23: Snapshot Đi lại giờ lưu mốc đầu lượt: khi hoàn một nước sẽ trả lại toàn bộ thời gian người đó đã dùng cho nước bị hủy; hoàn hai nước trả lại thời gian của cả hai bên và đặt `turnElapsed` về 0. Áp dụng chung engine local/máy và server online.
- 2026-09-23: Dấu X trên popup Đi lại là vùng button Từ chối. Trong thời gian popup mở, local/máy dừng tick và online server cập nhật `lastClockUpdate` mà không trừ giờ/không tăng `turnElapsed`, nên đồng hồ và vòng avatar đứng yên; đóng popup đặt lại mốc clock để không cộng dồn thời gian chờ. Overlay giảm còn alpha khoảng 15% và bỏ blur.
- 2026-09-23: Bỏ transition fade/scale của popup Đi lại theo yêu cầu; popup xuất hiện tức thì, giữ kích thước 520px và overlay alpha 40%.
- 2026-09-23: Thu popup Đi lại desktop từ tối đa 760px xuống 520px; giảm overlay từ alpha 80% xuống 40%, blur còn 1px; thêm hiệu ứng mở opacity + scale 90→100% trong 300ms.
- 2026-09-23: Thêm luồng xem thử popup Đi lại ở Máy · Cơ bản: sau nước đầu tiên của máy trong mỗi ván, máy gửi một yêu cầu; Từ chối giữ bàn, Cho phép hoàn đúng nước máy vừa đi và không trừ lượt Đi lại của người chơi.
- 2026-09-23: Thay overlay yêu cầu Đi lại bằng popup gỗ từ ảnh người dùng; lưu `src/assets/takeback/takeback-dialog.png`, đồng thời cắt riêng hai nút `takeback-decline.png`/`takeback-accept.png`, tạo alpha thật ở góc và dùng chúng làm button HTML giữ nguyên logic socket.
- 2026-09-23: Thu khoảng cách giữa các dòng chat từ 8px xuống 4px và giảm padding dọc thẻ chat còn 2px.
- 2026-09-23: Chat đổi tên và nội dung về cùng một hàng cạnh avatar; tăng chữ tin nhắn và thông báo vào phòng lên 15px.
- 2026-09-23: Đổi danh sách chat: tin người chơi hiển thị avatar 32px, tên ở dòng trên và nội dung ở dòng dưới; thông báo hệ thống chỉ render sự kiện `đã vào phòng`, không render avatar và ẩn các dòng rời phòng/từ chối/đồng ý khỏi khung chat.
- 2026-09-23: Đổi đồng hồ avatar theo mẫu người dùng: lớp tròn phủ xanh trên avatar, viền neon xanh dày nằm đúng bounding box, viền vàng mảnh phía trong và lát tối chạy từ vị trí 12 giờ theo thời gian lượt.
- 2026-09-23: Khôi phục viền xanh đậm báo người đang tới lượt quanh avatar; viền dùng inset 0 nên vẫn bằng đúng kích thước avatar, không tràn ra ngoài. Vòng tiến trình SVG mượt được giữ bên dưới.
- 2026-09-23: Sửa chiều tiến trình vòng xanh avatar: đầu lượt vòng hiện đầy đủ và rút dần theo 60 giây, thay vì bị `strokeDashoffset` che toàn bộ ngay lúc chuyển lượt.
- 2026-09-23: Bỏ bảng thông báo kết quả/chiếu bí giữa bàn; kết quả chỉ còn mặt cười/mặt khóc trên avatar và sau 2 giây hiện Sẵn sàng. Thay vòng thời gian pseudo-element tràn mép bằng vòng SVG đúng kích thước avatar, stroke 4px, chuyển `stroke-dashoffset` tuyến tính 300ms; trạng thái vòng và màu đồng hồ đổi trong 100ms khi chuyển lượt. Typecheck PASS; UI kết quả PASS 2/2; store/room PASS 22/22. Chưa browser QA vì không có phiên trình duyệt khả dụng.
- 2026-09-23: Khi ván kết thúc có người thắng, avatar bên thắng phủ mặt cười animation và bên thua phủ mặt khóc animation; icon desktop 122px, nhỏ hơn avatar 10px, đồng thời có tỷ lệ compact/short-desktop. Thông báo kết quả giữ 2 giây rồi nhường chỗ cho nút Sẵn sàng. Local/máy bấm để khởi động ván mới; online người đầu chuyển phòng về ready và chờ người thứ hai. Room test PASS 17/17, UI kết quả PASS 2/2.
- 2026-09-23: Loại bỏ nháy mờ của bàn sau mỗi nước bằng cách giữ lớp nền bàn trên compositing layer ổn định và cô lập repaint. Audio đi quân dùng một instance preload dùng lại; trước âm mới sẽ dừng/tua âm cũ để tránh lần đầu phát trễ rồi chồng tiếng. Typecheck PASS; regression store/computer PASS 10/10.
- 2026-09-23: Điều chỉnh hạn mức yêu cầu Đi lại online: gửi yêu cầu sẽ trừ một lượt; bị từ chối hai lần thì hết quyền gửi, còn khi đối thủ đồng ý hoàn tác thì người yêu cầu được nạp lại đủ hai lượt. Regression room/store PASS 22/22.
- 2026-09-23: Sửa điều kiện nút Đi lại: đầu ván luôn mờ và chỉ bật sau khi chính người chơi đã đi đủ nước để hoàn tác. Bổ sung Đi lại cho ván máy/local: tự lùi một nước khi máy chưa đáp hoặc hai nước khi máy đã đáp, tối đa hai lần/ván; online đồng bộ `moveCount` để client không cho gửi yêu cầu sớm. Test store + room PASS 22/22; typecheck/build PASS và `dist/` đã cập nhật.
- 2026-09-23: Đổi nút tròn thành yêu cầu Đi lại thật, icon reset mới 30×30px. Online: mỗi bên tối đa hai lần yêu cầu/ván (tính khi gửi), đối thủ nhận overlay che màn hình với Đồng ý/Từ chối; server khóa nước đi khi chờ phản hồi. Đồng ý hoàn tác một nước nếu đối thủ chưa đi, hoặc hai nước nếu đã đi và lượt quay lại người yêu cầu; server giữ lịch sử tối đa 500 trạng thái và là nguồn sự thật. Local/máy tạm khóa nút vì không có đối thủ socket duyệt. `tests/rooms.test.ts` PASS 17/17; typecheck và production build PASS, `dist/` đã cập nhật.

- 2026-09-23: Dịch cụm Cầu hòa/Xin thua sang trái 12px và thêm nút tròn Đi lại ở bên phải, icon reset SVG 20×20px. Nút gọi luồng reset hiện có cho local/máy; khi online đang chơi nút bị khóa để giữ quy tắc server không reset ván đang diễn ra. Compact đặt nút nối tiếp trong hàng hành động. Typecheck/build PASS.

- 2026-09-23: Nâng thêm 10px đồng hồ và cụm Cầu hòa/Xin thua trên PlayerCard desktop; giữ nguyên tên/danh hiệu. Panel người xem nâng theo 10px để giữ khoảng cách 10px dưới Xin thua. Typecheck/build PASS.

- 2026-09-23: Nâng thêm 8px khung tên và đồng hồ PlayerCard; nâng cụm Cầu hòa/Xin thua cùng 8px trên desktop. Panel người xem nâng theo 8px để tiếp tục giữ khoảng cách 10px dưới Xin thua; compact giữ vị trí nút cố định cũ. Typecheck/build PASS.

- 2026-09-23: Nâng riêng khung tên PlayerCard thêm 5px (tổng 20px so với vị trí gốc) và đồng hồ lên 5px; giữ nguyên danh hiệu, Cầu hòa và Xin thua. Typecheck/build PASS.

- 2026-09-23: Nâng danh hiệu PlayerCard thêm 2px (chồng 10px vào đáy avatar; compact 7px). Lấy tỷ lệ PlayerCard 132px avatar/270px danh hiệu làm chuẩn cho các vị trí avatar có danh hiệu: Home dùng avatar kỳ sĩ thật 84px + danh hiệu 172px/chồng tỷ lệ 6px; Hồ sơ dùng avatar 128px + danh hiệu 262px/chồng 10px. Avatar nhỏ trong chat/người xem/danh sách xã hội không thêm danh hiệu. Typecheck/build và regression liên quan PASS.

- 2026-09-23: Panel người xem xếp thẻ theo hàng ngang và tự wrap khi hết chỗ. Người chơi online có `ready` được xem là đang chờ đấu: hiện icon đồng hồ cát vàng bên trái avatar và được sắp lên đầu; mẫu local đánh dấu `An` để xem trực tiếp. Typecheck/build và regression panel PASS.

- 2026-09-23: Gộp panel người xem thành một vùng duy nhất, bỏ tiêu đề/khu chờ/đường chia; mép trên panel đặt thấp hơn đáy nút Xin thua 10px theo bố cục desktop. Local hiển thị ba thẻ mẫu cùng kích thước hiện tại với tên ngắn/vừa/dài (`An`, `Picolozz`, `Nguyễn Hoàng Minh Khôi`) để đối chiếu; online tiếp tục dùng thành viên snapshot thật. Typecheck/build PASS; regression được đồng bộ theo nhãn truy cập mới.

- 2026-09-23: Hoàn tác cách chồng danh hiệu sai: danh hiệu đặt ngay dưới avatar rồi kéo lên đúng độ dày viền avatar (8px desktop, 5px compact). Panel người xem đổi tỷ lệ khu chờ/khu trong phòng từ 2:3 thành 1:3 để khu dưới chiếm 75%; thẻ user giảm đúng 8px chiều cao qua avatar 36→28px. Typecheck/build và regression panel PASS.

- 2026-09-23: Đặt danh hiệu chồng vào phần dưới bên trong avatar, cách mép ngoài theo padding khung (desktop 8px). Khu Đang chờ ghép đấu để trống hoàn toàn khi chưa có dữ liệu, đường phân cách tăng độ rõ; danh sách Người trong phòng hạ 8px và giữ avatar/tên căn giữa trong thẻ. Typecheck/build và regression panel PASS.

- 2026-09-23: Sửa lại PlayerCard theo ảnh phản hồi: danh hiệu nằm dưới avatar với mép trên chạm mép dưới avatar; panel người xem hạ thêm 80px để mép trên nằm dưới ELO 10px trong bố cục hiện tại. Thẻ người chơi trong panel thu avatar còn 36px, cao gọn hơn, rộng ôm nội dung và giữ padding ngang 8px. Typecheck/build và regression panel PASS.

- 2026-09-23: Nút Người trong phòng trên bàn cờ mở panel tách khu Đang chờ ghép đấu (nhỏ hơn) và Người trong phòng (lấy snapshot/local state thật); mỗi người là thẻ avatar/tên. Panel bắt đầu thấp hơn ELO 10px, lấp chiều rộng cột trái để cách bàn đúng gap 10px và dùng đúng nền `#061e2280`/viền trong suốt của Chat. Server hiện chưa cung cấp hàng chờ ghép đấu toàn cục nên khu trên hiển thị trạng thái dữ liệu chưa có. Mép dưới danh hiệu PlayerCard chạm mép trên avatar; tên/ELO vẫn nâng 15px. Typecheck/build và regression panel PASS.

- 2026-09-23: Hoàn tác các thử nghiệm riêng của Tốt đỏ về `red-soldier-reference-v12-tight.png`, đồng bộ lại tông gỗ, mặt, vòng và chữ với bộ quân đỏ hiện tại; vẫn hiển thị 54×57px. Các quân khác giữ nguyên.
- 2026-09-23: Kéo khung/vòng trong của Tốt đỏ xuống thêm 2px: asset `red-soldier-reference-v17-ring-down-4px-tight.png` giữ mép trên `y=11`, đáy vòng tại `y=155` (tổng cộng thấp hơn bản gốc 4px). Các phần khác giữ nguyên.
- 2026-09-23: Tốt đỏ giữ cùng kích thước hiển thị 54×57px và alpha 200×200px như các quân đỏ khác; asset `red-soldier-reference-v16-ring-down-2px-tight.png` giữ mép trên vòng đỏ tại `y=11` và mở đáy vòng xuống thêm 2px đến `y=153`. Chữ/thân quân và các quân khác giữ nguyên.
- 2026-09-23: Thử riêng Tốt đỏ với asset `red-soldier-reference-v14-black-wood-tight.png`: giữ chữ/vòng đỏ và dáng nghiêng, đổi mặt/thân sang tông gỗ vàng cam đậm theo Tốt đen hiện tại; alpha được crop sát đủ 200×200px. Các quân còn lại giữ nguyên.
- 2026-09-23: Tạo phiên bản mới của đủ bộ quân đỏ, chỉ làm chữ `車/馬/相/仕/帥/炮/兵` sáng và đỏ tươi hơn; giữ nguyên viền đỏ nâu, mặt kem, thân gỗ, alpha, kích thước và các asset gốc để hoàn tác.
- 2026-09-23: Hoàn thiện toàn bộ quân đỏ `車/馬/相/仕/帥/炮/兵` theo phong cách Pháo v8: cùng mặt kem oval nâng lên, viền đỏ, thân gỗ dày và alpha crop sát 200×200px; kể cả Tốt đỏ đã chuyển sang bộ mới. Kích thước hiển thị đỏ giữ 54×57px, quân đen không đổi.
- 2026-09-23: Chuẩn hóa kích thước nhìn thấy của Pháo đỏ theo Tốt đỏ: asset `red-cannon-reference-v8-tight.png` có canvas và alpha bounding box cùng 200×200px, tiếp tục hiển thị trong container đỏ 54×57px. Các quân khác giữ nguyên.
- 2026-09-23: Thử riêng quân Pháo đỏ bằng asset `red-cannon-reference-v7-tight.png` tạo theo ảnh mẫu: mặt kem oval nâng lên, viền/chữ đỏ và thân gỗ dày phía dưới; PNG alpha được crop sát và chuẩn hóa 200×200px. Các quân đỏ khác và quân đen giữ nguyên.
- 2026-09-22: Quân đen giữ sprite/bóng cũ 56×56px. Tốt đỏ dùng asset `兵` alpha mới, mặt trong/vòng viền nâng lên để phần chân gỗ dưới rõ hơn; asset crop sát và tối ưu 200×200px, hiển thị 58×58px. Các quân đỏ còn lại giữ render cũ.
- 2026-09-23: Hoàn tác bộ PNG v6 của sáu quân đỏ `车/马/相/仕/帅/炮`; các quân này dùng chung asset vỏ rỗng `red-empty-shell-v1-tight.png`, đã xóa mặt kem và chữ thành alpha trong suốt, chỉ giữ viền/vỏ ngoài. Năm Tốt đỏ giữ nguyên `red-soldier-reference-v9-tight.png` ở 54×57px; quân đen giữ sprite 56×56px. Giữ quy tắc bắt buộc build lại `dist/` sau mỗi nhiệm vụ có thay đổi project.

- 2026-09-22: Thử riêng quân `兵` bằng asset `src/assets/pieces/red-soldier-reference-v7.png`: làm nét viền/chữ bằng xử lý ảnh raster, trim sát alpha và render 56×56px với cùng `drop-shadow(4px 6px 1.5px rgb(65 34 15 / 72%))` của quân đen. Sáu quân đỏ khác chưa đổi, quân đen giữ sprite gốc. Build/typecheck và regression test PASS.

- 2026-09-22: Thay âm thanh đi quân cũ bằng asset mới `src/assets/đi quân (2).wav`; giữ nguyên điều kiện phát âm thanh theo `lastMove`. Build/typecheck PASS.

- 2026-09-22: Bàn cờ tăng kích thước hiển thị chung của quân đỏ/đen từ 54px lên 56px. Bản thử `red-pieces-v15.png` chỉ chỉnh ô quân `兵`: hoàn lại sáu quân khác, giữ mặt kem trong bán kính 124px và thu vòng nâu về dải 10px (124–134px) để đồng tỷ lệ với các quân còn lại; chữ đỏ khóa trong bán kính 98px. Sprite giữ lưới 2297×311 (mỗi ô 311px, gap alpha 20px).

- 2026-09-22: Dịch khung avatar Chơi với máy sang phải 45px để cách mép ô Pikafish khoảng 25px; tăng khoảng đệm dưới hai nút tới viền khung lớn thêm 10px; nâng banner Cờ thế 20px bằng cách giảm gap 65→45px.

- 2026-09-22: Hàng hai nút Vị trí tùy chỉnh/Đấu ngay rộng thêm tổng 40px (20px mỗi bên), hai ô Pikafish thu hẹp 100px. Dùng hàng 189/159/40px để tâm hai ô Pikafish khớp tâm avatar tương ứng; hàng Chọn bên giữ cùng mép trái với select.

- 2026-09-22: Nâng banner Cờ thế lên 15px, giảm khoảng cách từ 80px còn 65px.

- 2026-09-22: Tăng mạnh khoảng cách banner Cờ thế từ 40px lên 80px để tách rõ khỏi khung thiết lập.

- 2026-09-22: Tăng khoảng cách banner Cờ thế thêm 15px, từ 25px lên 40px.

- 2026-09-22: Đặt khoảng cách giữa khung thiết lập và banner Cờ thế thành 25px, đẩy riêng banner Cờ thế xuống.

- 2026-09-22: Sửa đúng khoảng cách người dùng chỉ định: bỏ margin 43px trước hai nút hành động; do khung avatar đã cách đáy vùng trên 15px nên khoảng cách khung avatar→nút còn đúng 15px và mép dưới khung lớn tự nâng lên. Khôi phục cách tính khoảng cách banner Cờ thế vì thay đổi trước nhắm nhầm vị trí.

- 2026-09-22: Khoảng cách giữa khung thiết lập Chơi với máy và banner Cờ thế được cố định còn 15px; khung Cờ thế được nâng lên tương ứng.

- 2026-09-22: Thu hai avatar AI từ 196→192px và tăng khoảng cách giữa hai ảnh từ 8→15px; khoảng cách nhìn thấy tới viền trên/dưới vẫn xấp xỉ 15px.

- 2026-09-22: Đo tỷ lệ thật hai PNG robot (174×141/143); tăng chiều rộng hiển thị 161→196px và gap 6→8px. Trong khung avatar cao 358px, tổng chiều cao ảnh còn khoảng 15px ở mép trên và dưới.

- 2026-09-22: Khung avatar Chơi với máy tăng 330→358px trong vùng cao 388px để cách viền trên/dưới đúng 15px; hai avatar tăng 155→161px và giữ gap 6px nên cũng cách khung 15px. Hàng Chọn bên căn trái thẳng với hai ô Pikafish.

- 2026-09-22: Căn lại theo ảnh mẫu Chơi với máy: khung avatar cao 330px nằm giữa vùng trên; hai robot thu còn 155px; Chọn bên và ba radio trở lại hàng ngang dưới hai ô Pikafish.

- 2026-09-22: Thu chiều cao hiển thị khung thiết lập khoảng 15px; bố cục trên đổi thành ba cột: hai AI căn giữa dọc trong khung trái, hai ô chọn máy ở giữa, Chọn bên và ba radio xếp dọc ở phải. Hàng nút giữ dưới cùng với khoảng cách cân đối.

- 2026-09-22: Chơi với máy bổ sung khung viền kép riêng cho cặp AI, hoa văn dây/mây vàng trong khung chính và lớp vân bán trong suốt trên hai nút Vị trí tùy chỉnh/Đấu ngay; giữ nguyên asset, nội dung và hành vi nút.

- 2026-09-22: Chơi với máy có khung nâu đen viền vàng bao cụm chọn máy/chọn bên/hành động theo ảnh mẫu; giảm mạnh opacity hai lớp phủ trung tâm và lớp chọn máy để background phong cảnh bên trong rõ hơn. Chưa browser QA vì phiên này không có Browser kết nối.

- 2026-09-22: Nâng thêm khung danh hiệu Tân Binh 4px, tổng offset lên 8px so với ban đầu.

- 2026-09-22: Khung danh hiệu Tân Binh trong Thông tin được nâng riêng 4px dưới avatar.

- 2026-09-22: Bỏ clipping ở dialog Thông tin và kéo banner lên thêm 8px, khôi phục toàn bộ đường viền vàng phía trên của banner.

- 2026-09-22: Khung Thông tin hạ 12px trong viewport, vẫn căn giữa ngang; banner được kéo lên thêm 8px so với khung.

- 2026-09-22: Banner Thông tin tăng cao 78→86px và được kéo lên thêm 10px để nằm chồng lên mép khung trên, không đổi kích thước khung hồ sơ.

- 2026-09-22: Thay lại banner Thông tin bằng asset mới bám đúng mẫu Banner Bạn bè người dùng cung cấp: tỷ lệ ngang 5,7:1, thanh vàng, mây vàng và hai tua đỏ; chỉ đổi tiêu đề thành “Thông tin”.

- 2026-09-22: Tiêu đề Thông tin dùng phiên bản mới của khung banner Bạn bè, thay chữ chính xác thành “Thông tin”; asset `profile/info-title-friends-frame.png` được trim alpha sát phần nhìn thấy. Khung hồ sơ không đổi kích thước.

- 2026-09-22: Phần nội dung trong khung Hồ sơ cố định dùng `justify-between`, giãn đều bốn hàng tên, ELO, chỉ số và địa chỉ mà không tăng kích thước khung.

- 2026-09-22: Thu chữ hai dòng Bạn bè/Theo dõi/Lượt thích và địa chỉ trong Thông tin từ 21px xuống 19px; số đậm và icon thu tương ứng để giữ tỷ lệ.

- 2026-09-22: Giữ nguyên kích thước các khung Thông tin; thu khoảng cách nội bộ tên→ELO và ELO→chỉ số từ 12px còn 4px, bỏ khoảng cách trước địa chỉ để toàn bộ nội dung nằm gọn trong khung cố định.

- 2026-09-22: Thu chiều cao hai ô ELO trong Thông tin thêm 4px và tăng khoảng cách hai ô thống kê Cờ Tướng/Cờ Úp từ 12px lên 20px.

- 2026-09-22: Hộp Thông tin bổ sung lượt thích (2.4K, icon tim đỏ) và địa chỉ TP. Hồ Chí Minh (icon ghim vàng), theo bố cục ảnh tham chiếu. Thêm regression DOM; typecheck PASS. UI test hiện có 4 lỗi không liên quan do mock `HTMLMediaElement.play()` của jsdom không trả Promise.

- 2026-09-21: Giới hạn Pikafish suy nghĩ tối đa 1 giây/nước thay cho 3 giây, giữ điều chỉnh theo clock. Typecheck và 4/4 kiểm thử Pikafish PASS.

- 2026-09-21: Chơi Với Máy tích hợp Pikafish 2026-09-06 thật (native UCI + NNUE ở backend), lựa chọn đầu/mặc định Pikafish, hỗ trợ chọn phe và Đấu ngay. Theo dõi lịch sử UCI, hủy phản hồi cũ khi reset/rời/kết thúc, báo lỗi/thử lại; Chơi nhanh/Cờ Úp giữ máy cơ bản. Cài engine Windows, giấy phép và hướng dẫn ở engines/pikafish. Typecheck/build và 73/73 tests PASS, gồm engine/HTTP thật và vòng đời UI; cập nhật dist. Chưa browser QA do không có trình duyệt kết nối.

- 2026-09-20: Khớp lại viền ngoài ô tìm Bạn bè theo reference bằng các lớp nâu-vàng; tăng kính lúp lên 25px, placeholder Times New Roman 20px mảnh và xám ấm. Build/typecheck thành công.

- 2026-09-20: Chỉnh ô tìm Bạn bè theo mẫu: cao 38px (3,5/5 ô lọc 54px), nền nâu vàng, font Times New Roman nghiêng, padding 10px và kính lúp SVG vàng. Build/typecheck thành công.

- 2026-09-20: Tăng rõ phần lọc Bạn bè theo phản hồi: ba ô cao 74px, ô tìm kiếm cao 62px, padding khung kem 40px ở cả trái và phải. Build/typecheck thành công.

- 2026-09-20: Làm lại ba bộ lọc Bạn bè theo mẫu: khung vàng hai lớp khi chọn, nền kem-nâu khi chưa chọn, font serif nghiêng và icon SVG nhóm người/chấm online/Facebook; thay ký tự tìm kiếm bằng kính lúp SVG. Build/typecheck thành công.

- Sửa chồng lớp hộp Bạn bè: thu title còn 520px và đặt giữa trên viền; thu hàng ba tab còn 760px; kéo panel kem sát tab; tăng riêng ba nút lọc lên cao 52px để rõ hơn và giữ đủ sáu hàng danh sách.

- Hộp Bạn bè: cắt sát alpha title, thay chữ ba tab bằng ảnh crop từ mẫu, dùng border-image khung từ mẫu và thu gọn hàng để Danh sách hiển thị đủ sáu người trong một màn hình.

- Thêm hộp Bạn bè mở từ Home: có tab Danh sách/Thêm bạn/Lời mời, bộ lọc, tìm kiếm, gửi/chấp nhận/từ chối/hủy lời mời và mời chơi/nhắn tin cục bộ. Dùng title alpha và avatar crop từ bốn ảnh mẫu mới trong `src/assets/friends/`.

- Bỏ ô nhãn ĐỎ/ĐEN dưới avatar trong PlayerCard dùng chung cho Cờ Tướng và Cờ Úp.

- Hai nút Cúp/Loa trong Chơi với máy dùng chung homeUtilityButton 48×48px và HomeIcon với Home, đồng bộ màu/viền/bóng và icon khi bật/tắt nhạc.

- Dời cả cụm bốn nút chế độ chơi trên Home lên 20px hiển thị, có bù scale màn hình.

- Căn giữa khung Xếp hạng theo cả hai chiều theo phản hồi; khoảng cách bảng tới tab là 4px, lề dưới trong khung 8px; giảm lề ngang để bảng và nội dung các hàng rộng hơn.

- Căn khung Xếp hạng giữa theo chiều ngang; đặt lề trên bằng một phần ba khoảng trống dọc để lề dưới gấp đôi lề trên.

- Tăng số hạng từ 4 lên nét cọ nâu đậm 66px cho một chữ số, tự giảm cỡ khi có nhiều chữ số; giảm khung Xếp hạng từ 1120×780 xuống 1120×750 và giữ scale cũ để chiều rộng không tăng.

- Chỉnh Vào xem theo mẫu nút bo góc viền kép, chữ serif nâu và mũi tên; hạng từ 4 dùng font Chess Brush qua Tailwind, bỏ viền/bóng vàng; tăng chấm trạng thái lên 22px và chữ trạng thái lên 23px.

- Căn lại nội dung các hàng Xếp hạng theo nền panel; tăng avatar lên 82px và ELO lên 140×46px, bỏ vòng lá ở ba avatar đầu, chỉnh nút Vào xem thành oval kem với chữ nâu. Build/typecheck thành công; chưa kiểm tra trực quan trong trình duyệt.

- 2026-09-19: Cắt 9 danh hiệu từ ranks/rank-sheet-source.png thành rank-01-novice.png đến rank-09-chess-saint.png. Home và PlayerCard dùng Tân Binh, chồng vào avatar; loại bỏ khung Kỳ Sĩ/Kỳ Thủ và ba sao cũ.
- Tăng kích thước danh hiệu Tân Binh, căn chính giữa tâm avatar và tăng phần chồng lên avatar theo phản hồi.
- Tăng thêm kích thước danh hiệu và dịch nhẹ sang phải theo phản hồi.
- Tách nền ảnh Tân Binh thành alpha trong suốt, trim sát viền, rồi tăng kích thước và dịch sang phải thêm theo phản hồi.
- Tạo `rank-01-novice-clean.png` để thay dứt điểm crop cũ/cache: trim theo alpha ≥64, bỏ viền mờ dư; Home và PlayerCard import file mới, tăng kích thước và dịch phải thêm.
- Xóa `ranks/rank-01-novice.png` cũ theo yêu cầu. Đã build lại dist: chỉ còn bundle `rank-01-novice-clean-62ZYnXEn.png` được ứng dụng phục vụ.
- Căn lại Tân Binh vào tâm ngang avatar ở Home và PlayerCard, giữ kích thước hiện tại.
- Xóa hai dòng phụ trên Home: “Khách · chỉ số mẫu” và “Chơi hai người cùng máy”.
- Cập nhật ProfileDialog theo ảnh mẫu mới: cắt title và huy hiệu Tân Binh vào assets/profile; chuyển khung/tông màu và avatar, giữ nội dung/nút HTML động.
- Thu gọn ProfileDialog còn 740×850px; thay tiêu đề và hai nhãn chế độ bằng crop sát viền, dùng lại danh hiệu Tân Binh chung, đổi hai ô thống kê sang nền kem và tăng vùng Danh hiệu.
- Cắt sát lại asset tiêu đề Thông tin để bỏ phần nền dư; tăng chữ Thắng/Thua trong hai ô thống kê.
- Tách thêm khoảng cách giữa nhãn Thắng/Thua và số liệu; hạ nhẹ danh hiệu Tân Binh dưới avatar ở Home.
- Hạ thêm danh hiệu Tân Binh ở Home, PlayerCard và hộp Thông tin để cách avatar rõ hơn.
- Thay icon minh họa ELO ở hộp Thông tin bằng PNG quân Tướng đỏ/đen có sẵn trong assets/pieces.
- Thay hai ký tự icon ELO cũ trên Home (`🪙`, `●`) bằng PNG quân Tướng đỏ/đen tương ứng.
- Đổi icon ELO bên phải trên Home từ quân Tướng đen sang mặt quân Cờ Úp.
- Thêm bảng Xếp hạng mở từ nút Cúp ở Home: dùng lại khung hồ sơ theo tỷ lệ ngang, có tab Cờ Tướng/Cờ Úp, danh sách người chơi và nút Vào xem. Chuyển ảnh mẫu người dùng cung cấp vào assets/rankings và cắt tiêu đề dùng trực tiếp.
- Dùng đầy đủ viền/góc của Popover hồ sơ cho bảng Xếp hạng; cắt sát lại tiêu đề Xếp hạng, thay crop cũ và cắt hai tab Cờ Tướng/Cờ Úp từ ảnh mẫu để dùng trực tiếp.
- Cắt sát lần nữa tiêu đề và hai tab Xếp hạng để bỏ dải nền/viền dư; ghi đè và xóa ba crop cũ.
- Cắt sâu hơn phần bảng chữ Xếp hạng và hai tab để loại dải viền dưới/các mép nền còn lại; thay và xóa crop trước đó.
- Tách nền trong suốt cho title Xếp hạng từ ảnh mới, thay crop title cũ và đặt title nhô lên mép trên Popover.
- Trim vùng alpha rỗng của title Xếp hạng và nâng nó lên qua viền trên Popover.
- Cắt sát hai tab Cờ Tướng/Cờ Úp từ ảnh mới, thay và xóa hai crop tab cũ.
- Tách nền trong suốt và trim sát lại hai tab Cờ Tướng/Cờ Úp; thay dứt điểm hai crop tab nền nâu cũ.
- Bổ sung trạng thái màu tab Xếp hạng: chọn là đỏ, chưa chọn là nâu; đổi màu khi chuyển Cờ Tướng/Cờ Úp.
- Tách khung thân bảng Xếp hạng từ ảnh mới và đặt dữ liệu HTML lên trên; thay avatar/danh hiệu từng hàng bằng kiểu Home và Tân Binh.
- Bỏ khung dày của thân bảng Xếp hạng, dùng panel màu kem có sẵn vùng hàng và bóng; thêm vòng hoa vàng quanh avatar ba hạng đầu, tạo số hạng có viền/bóng vàng-bạc-đồng và thu gọn ô ELO.
- Thay huy hiệu số hạng 1–3 dựng bằng Tailwind bằng ba PNG nền trong suốt, trim sát hình và dùng trực tiếp trong bảng Xếp hạng.

- Kiểm chứng cleanup: npm run build (bao gồm typecheck) thành công; tests/ui.test.tsx đạt 18/18; 33 tham chiếu asset frontend/HTML đều tồn tại. Chưa kiểm tra trực quan trong trình duyệt.

- 2026-09-19: Gom src/assets theo nhóm; chuyển 33 asset/giấy phép, cập nhật đường dẫn trong 10 file frontend/entry/registry. SHA-256 tất cả file di chuyển giữ nguyên. Gom ghi chú kỹ thuật vào docs/IMPORTANT-NOTES.md; giữ 18 Markdown cũ trong docs/asset-notes-pending-removal để chờ xác nhận. Danh sách đầy đủ và ứng viên xóa tại docs/ASSET-CLEANUP.md. Không thay UI/logic; không sửa ngoài board-game.

- Friends dialog: removed the embedded "Ban be" artwork from the top-center area of `friends-frame.png`; the separately rendered transparent title is now the only title over the frame.
- 2026-09-20: Sửa dứt điểm cấu trúc khung Bạn bè: bỏ border-image từ screenshot (chứa nút đóng và trang trí cũ), bỏ khung nâu lồng bên trong; dùng một khung Tailwind cùng kiểu Thông tin, một tiêu đề và một nút đóng. Tăng vùng nội dung để đủ sáu hàng. Build/typecheck thành công; chưa kiểm chứng trực quan trong trình duyệt.
- 2026-09-20: Bạn bè dùng friends-banner.png, tạo bằng ImageGen từ bảng Xếp hạng với yêu cầu chỉ đổi chữ Bạn bè, giữ thanh vàng/tua và nền trong suốt. Nâng tab 20px, chia đều sáu hàng; chỉnh nút lọc vàng/nâu nhạt và icon theo mẫu. Build/typecheck đạt; chưa QA trình duyệt.
- 2026-09-21: Tạo `social-header-landscape.png` bằng ImageGen theo dải phong cảnh Á Đông trong ảnh mẫu và dùng chung làm nền sau vùng tab của Xếp hạng/Bạn bè.
- 2026-09-21: Cắt riêng, làm sạch alpha và trim sát asset `top-one-crown.png`; dùng vương miện này trên khung avatar người đứng hạng 1.
- 2026-09-21: Chuyển ảnh mẫu lịch sử vào `src/assets/history/history-reference.png`; thêm dialog Lịch sử từ nút tiện ích Home với tab Đã chơi/Đã xem, danh sách minh họa, loại cờ và hành động Xem lại. Chưa có persistence nên chưa lưu/replay ván thật.
- Nâng hàng Chọn bên trên màn Chơi với máy 16px để cách hai nút thao tác bên dưới khoảng 22px.
- Hạ toàn bộ cụm dưới khung avatar của màn Chơi với máy 8px (hai nút thao tác, đáy khung lớn và banner Cờ thế dịch đồng bộ theo layout).
- Làm thanh header Chơi với máy trong suốt hơn với blur nhẹ; thêm bóng đen chuyển mềm vừa phải cho avatar người dùng và hai nút tiện ích màu vàng.
- Tăng độ nhận biết của hiệu ứng header Chơi với máy: cho ảnh nền chạy xuyên dưới header, giảm lớp tối còn 10% và tăng bóng chuyển mềm quanh avatar/hai nút vàng.
- Nới khung bàn cờ thêm 8px mỗi cạnh trái/phải, giữ nguyên kích thước mặt bàn, lưới và quân để các quân biên có thêm khoảng cách với mép ngoài.
- Nới tiếp khung bàn cờ thêm 8px ở cạnh trên/dưới, đồng thời cập nhật chiều cao layout theo toàn bộ khung.
- Tạo lại đủ bảy quân đen theo cùng thân gỗ nghiêng của bộ quân đỏ/kem, đổi vòng và chữ sang đen (`車 馬 象 士 將 炮 卒`); mọi quân hai bên cùng hiển thị 54×57px.
- Làm rõ bộ quân đen: đổi chữ và vòng trong sang đen sâu, nét sắc và tương phản hơn; giữ nguyên thân gỗ, kích thước 54×57px và nền trong suốt.
- Xóa nét viền đen ngoài cùng khỏi toàn bộ quân đen; giữ vòng tròn trong/chữ đen rõ và thay mép ngoài bằng màu gỗ tự nhiên.
- Tăng độ tương phản hiển thị quân đen để chữ sắc, rõ hơn ở kích thước 54×57px; giảm riêng bóng đổ quân đen từ 72% xuống 48% và thu gọn độ lệch/độ nhòe.
- Khôi phục bộ quân đen được tạo trực tiếp theo thân quân đỏ (bản v1/v2), bỏ filter tăng tương phản; tiếp tục giữ bóng quân đen nhẹ ở 48%.
- Giảm bóng toàn bộ quân đỏ xuống cùng thông số với quân đen: lệch 3×5px, blur 1px và opacity 48%.
- 2026-09-23: Tạo lại đủ bảy quân đen từ chính khung/thân của từng quân đỏ tương ứng; giữ nguyên màu gỗ, ánh sáng, hình dáng và chỉ thay vòng/chữ thành mực đen (`車 馬 象 士 將 炮 卒`). Giữ kích thước hiển thị 54×57px và bóng 48%.
- 2026-09-23: Làm sạch viền răng cưa của bảy quân đen bằng alpha mép ngoài tròn, loại pixel bán trong suốt rời và vẽ lại vòng trong chống răng cưa; giữ nguyên thân gỗ, chữ, kích thước và bóng.
- 2026-09-23: Thay cả 14 loại quân bằng PNG cắt trực tiếp từ ảnh gốc c7ad3098, nền ngoài alpha trong suốt, giữ màu/chữ/vòng lệch lên theo mẫu. Lưu tọa độ và script tái tạo tại docs/crop-reference-pieces.ps1; bóng UI mềm 4×6px/3px/48%, kích thước bàn giữ 54×57px. Bóng tái tạo gần mẫu, không phải tách nguyên bóng nền ảnh.
- 2026-09-23: Cắt sát lại mép trái bảy quân đen, thu mask 3px nguồn và chuyển sang source-cut-v2; quân đỏ và bóng giữ nguyên.
- 2026-09-23: Căn lại vùng sáng nền bàn cờ vào chính giữa bằng asset `maple-xiangqi-board-v3-centered-light.png`; giữ nguyên lưới, vân gỗ, khung và kích thước bàn.
- 2026-09-23: Tăng bóng toàn bộ quân cờ từ 48% lên 60% và giảm blur từ 3px xuống 2px; giữ độ lệch 4×6px.
- 2026-09-23: Cho bàn cờ dùng trọn chiều ngang khả dụng, tăng khung trên/dưới từ 8px lên 12px và tăng quân cờ từ 54×57px lên 56×59px.
- 2026-09-23: Giảm giới hạn chiều cao hiển thị của bàn cờ 30px, giữ nguyên tỷ lệ bàn và vị trí giao điểm.
- 2026-09-24: Thay nền bàn cờ bằng `xiangqi-board-mobile-maple-v4.png` tái tạo từ ảnh mẫu mới: gỗ phong vàng nhạt, khung nâu bo nhẹ, lưới nâu mảnh và dải sông. Căn lại đủ 90 giao điểm theo nền mới; tăng quân `maple-v3` lên 104×108px trên canvas để tỷ lệ/khoảng cách sát ảnh mẫu, giữ nguyên logic và màu nguyên bản của đủ 14 quân.
- 2026-09-24: Thay đủ 14 quân bằng bộ `skin-tone-v4`: thân gỗ kem–da người bớt vàng, highlight trên-trái và bóng gọn dưới-phải theo ảnh mẫu; giữ nguyên chữ Hán/vòng đỏ-đen từ bộ đã duyệt. `ChessPiece` dùng trực tiếp asset mới, kích thước hiển thị và logic game không đổi.
- 2026-09-24: Sau khi duyệt riêng quân Tốt đỏ, thay đủ 14 quân bằng bộ `honey-gold-v5`: vàng mật ong hòa màu bàn, viền nâu cam mảnh, góc nhìn phẳng và bóng tiếp xúc gọn dưới-phải. Giữ nguyên chữ Hán đỏ/đen, kích thước hiển thị và logic game.
- 2026-09-24: Cắt lại đủ 14 quân trực tiếp từ codo.png/coden.png thành bộ codo-coden-v2, alpha sát thân và giữ nguyên màu/chữ gốc. Thay bộ cắt thử đang dùng; tái tạo bóng nâu lệch dưới-phải bằng drop-shadow, giữ kích thước và gameplay.
- 2026-09-24: Tăng quân lên 106×110px (+2px mỗi chiều trong hệ tọa độ bàn); mở rộng bóng ngoài từ 7/10/5px sang 9/13/6px, giữ màu và độ đậm.
- 2026-09-24: Tăng tiếp quân lên 108×112px, giữ nguyên tâm giao điểm và bóng ngoài.
- 2026-09-24: Làm bóng quân đậm hơn và giảm độ mờ để viền bóng gọn, rõ hơn.
- 2026-09-24: Giảm nhẹ độ đậm màu bóng quân, giữ nguyên độ gọn 4px blur.
- 2026-09-24: Đổi sắc bóng quân sang nâu nhạt hơn, không làm giảm opacity.
- 2026-09-24: Thiết kế lại danh sách người trong phòng theo `view.png`: người chờ ghép dùng thẻ vàng có số thứ tự và được xếp trước; người chỉ xem dùng thẻ xanh, giữ thứ tự vào trong từng nhóm; bộ đếm mắt chỉ đếm người xem.
- 2026-09-24: Tách khung vàng/xanh sạch từ mẫu `view.png`, trim sát alpha và dùng 9-slice để thẻ người trong phòng co giãn theo tên; thu chiều cao thẻ từ 68px xuống 56px cùng avatar/chữ.
- 2026-09-24: Thay nền bằng banco-inner-clean-v1 từ banco.png, phục hồi các vùng bị quân/bóng che và cắt bỏ khung tối ngoài. Căn lại 90 giao điểm, thay chữ sông bằng HOANGBBCG in nghiêng căn giữa.
- 2026-09-25: Sửa flex sizing của PlayerCard theo vị trí cột để quân Đỏ ở cột chat không chiếm chiều cao toàn cột; chat giữ được chiều cao và trạng thái mở/thu ổn định khi bắt đầu trận. Thêm regression test cho người chơi cầm Đen; test mục tiêu đạt.
- 2026-09-25: Đối chiếu ảnh `src/assets/mau.png`; dùng dấu trắng cho chấm nước hợp lệ, góc chọn/ăn quân, chấm ô cũ, vòng quanh quân mới và quầng chọn. Giữ nguyên màu asset quân/nền bàn; thêm regression cho dấu chọn và ô ăn quân.
- 2026-09-25: Đổi nút camera từ chụp riêng bàn cờ sang chụp toàn bộ vùng game bằng html-to-image sẵn có, giữ cả các điều khiển và tải PNG về máy; thêm kiểm thử tiện ích tải ảnh.
- 2026-09-25: Kiểm tra dấu chọn theo mau.png: tests/chess-piece.test.tsx đạt 20/20; npm.cmd run build thành công.
- 2026-09-25: Bỏ quầng sáng khỏi các dấu nước đi/chọn quân; giữ dấu trắng phẳng và vòng quanh quân không glow. chess-piece.test.tsx đạt 20/20, npm.cmd run build thành công.
- 2026-09-25: Tinh chỉnh lại độ sáng theo ảnh mẫu: thêm quầng trắng nhẹ cho chấm nước, dấu góc và vòng nước trước/mới, không phát sáng mạnh lên quân. chess-piece.test.tsx đạt 20/20; build thành công.
- 2026-09-25: Tăng nhẹ độ sáng dấu chọn theo ảnh và kiểm tra tâm chấm nằm đúng giao điểm bàn. chess-piece.test.tsx đạt 20/20; build thành công.
- 2026-09-25: Thay chấm nước đi và chấm ô cũ bằng asset PNG trong suốt `src/assets/move-indicator-dot.png`, căn tâm tại giao điểm bàn; chess-piece.test.tsx đạt 20/20, build thành công.
- 2026-09-25: Thay sprite chấm nước bằng mẫu chấm phát sáng mềm người dùng gửi, dùng cho nước hợp lệ và ô cũ; asset alpha crop 96×95, hiển thị 32px và canh giữa giao điểm. Test 20/20; build thành công.
- 2026-09-25: Khôi phục trực tiếp pixel gốc của ảnh chấm người dùng chọn, chỉ crop vùng trong suốt thành 480×475 và không resize/nội suy asset; test 20/20, build thành công.
- 2026-09-25: Đổi tên asset chấm sang `move-indicator-dot-user.png` để tránh cache bản cũ và tăng kích thước hiển thị từ 32px lên 48px, giữ nguyên pixel ảnh người dùng chọn; test 20/20, build thành công.
- 2026-09-25: Dùng trực tiếp `src/assets/otron.png` cho chấm nước đi và chấm ô cũ theo chỉ định; giữ nguyên tỷ lệ asset và canh tâm tại giao điểm. Test 20/20; build thành công.
- 2026-09-25: Tăng kích thước hiển thị `otron.png` từ 48px lên 60px để phần chấm nhìn lớn thêm khoảng 5px; giữ tâm tại giao điểm.
- 2026-09-25: Tăng vùng hiển thị `otron.png` lên 120px để bù khoảng trong suốt bên trong asset và scale của bàn, giữ tâm đúng giao điểm.
- 2026-09-25: Tăng vùng hiển thị `otron.png` nhẹ từ 120px lên 140px theo phản hồi; giữ tâm đúng giao điểm.
- 2026-09-25: Tăng vùng hiển thị `otron.png` nhẹ từ 140px lên 155px theo phản hồi; giữ tâm đúng giao điểm.
- 2026-09-25: Thêm quầng trắng nhẹ quanh dấu `otron.png` cho chấm nước đi và ô cũ.

- 2026-09-26: Căn mã phòng 123456 thành 6 ô cùng độ rộng với cỡ chữ 16px và số dạng lining/tabular để các chữ số thẳng hàng; build/typecheck PASS.

- 2026-09-26: Sửa lỗi chụp game do bộ lọc html-to-image nhận cả text node; chỉ đọc thuộc tính sau khi xác nhận node là Element. Build/typecheck PASS.

- 2026-09-26: Tăng tốc chụp DOM: giảm pixelRatio cố định về 1, tắt cacheBust và chuẩn bị/cache CSS font sau khi font tải xong để không quét/nhúng lại font khi bấm mỗi lần; đo riêng thời gian chuẩn bị font, tạo PNG và click-to-download. Build/typecheck PASS; chưa đo runtime trong Chrome.

- 2026-09-26: Hoàn tác chụp DOM theo yêu cầu; khôi phục snapshot theo version và render PNG qua Worker/OffscreenCanvas, gỡ `html-to-image`. Gameplay/UI giữ nguyên.

- 2026-09-26: TEST B debug: thêm cờ dev-only bỏ qua `hasAnyLegalMove`/chiếu bí sau nước đi trong local game; kiểm tra nước đi cơ bản vẫn chạy, server và production giữ nguyên. Build/typecheck PASS.

- 2026-09-26: Phân tích khựng khi đi quân: bỏ hai lần kiểm tra hợp lệ dư trong luồng local (giữ một lần tại applyMove), và chỉ pause intro ở lần đổi nước đầu tiên của ván; giữ nguyên âm thanh bước/ăn quân. Build/typecheck PASS.
- 2026-09-27: Cập nhật hiệu ứng bật quân trong Board thành 3 preset 8/12/16px (480/560/640ms), bóng lệch X/Y 1:1 theo độ bay, nở/nhòe khi lơ lửng và thu về bóng gọn hiện rõ khi tiếp đất. Preview chạy lần lượt ba mẫu; chiếu bí dùng mẫu vừa. `npm.cmd run build` (gồm typecheck) PASS; chưa chạy browser QA.
- 2026-09-27: Thêm bảng 6 reaction emoji dạng dọc, hover/focus mở đè lên nút like, dùng tông viền/nền/bo góc từ emoji picker chat và cao 3/4 giới hạn khung chat theo desktop/compact. Chọn emoji tạo bubble bay tương ứng, vẫn dùng giới hạn like hiện tại. `npm.cmd run build` (typecheck + Vite) PASS.
- 2026-09-27: Chỉnh hiệu ứng quân theo ảnh tham chiếu: preview chỉ bật đúng một lần bằng mẫu vừa; bóng lớn và mềm hơn, dịch chéo xuống phải cùng độ bay. Giữ ba preset trong code để chọn khi cần. `npm.cmd run build` (typecheck + Vite) PASS.
- 2026-09-27: Chỉnh thời gian bật quân thành tổng 600ms: bay lên 100ms, giữ 400ms, hạ xuống 100ms; bóng dùng cùng các mốc pha. Build/typecheck PASS.
- 2026-09-27: Làm avatar hai bên PlayerCard có thể mở chung ProfileDialog của Home; dialog hiển thị tên người chơi được chọn, backdrop tối/mờ giữ đúng style hồ sơ gốc. Nút liên kết tài khoản hiện thông báo placeholder như Home. Build/typecheck PASS.
- 2026-09-27: Tăng độ bật của preset vừa cho animation quân từ 12px lên 14px; thời lượng 600ms và độ lệch bóng 1:1 giữ nguyên. Build/typecheck PASS.
- 2026-09-27: Theo ý người dùng, trả độ bay của mẫu vừa về 12px và tăng nhẹ kích thước/độ đậm bóng (scale, opacity); thời lượng/pha 600ms và tỷ lệ lệch bóng không đổi. Build/typecheck PASS.
- 2026-09-27: Nới trục hẹp của bóng ở trạng thái bay/tiếp đất (scaleY), giữ nguyên trục dài (scaleX), độ bay và thời lượng. Build/typecheck PASS.
- 2026-09-27: Tăng thêm trục hẹp của bóng preset vừa (scaleY 1→1.18) và opacity khi bay 0.34→0.38; chiều dài, thời lượng và độ bay giữ nguyên. Build/typecheck PASS.
- 2026-09-27: Thêm tia sét SVG hội tụ vào Tướng đối phương trong 200ms, kích hoạt khi animation bật quân chiếu bí kết thúc/đáp đất. Ở nước chiếu bí dừng tiếng nước đi/ăn quân/chiếu tướng và phát clip check hiện có tại mốc đáp đất; các nước thường giữ âm cũ. `npm.cmd run build` (typecheck + Vite) PASS.
- 2026-09-27: Thay asset âm thanh chiếu bí bằng clip `1790480222523_2137874395677077050_7229889354659670468.mp4`, phát tại thời điểm quân chiếu bí đáp xuống; âm thanh nước đi thường giữ nguyên.
- 2026-09-27: Làm hiệu ứng sét chiếu bí rõ hơn: các tia xanh/trắng được vẽ lao vào Tướng trong 160ms, chớp theo animation tổng 200ms khi quân đáp xuống; giữ nguyên asset và gameplay.
- 2026-09-27: Giới hạn animation bật quân vào chiếu bí; bỏ hiệu ứng preview đầu ván. Đồng bộ tia sét và âm thanh vào onfinish của quân vừa chiếu bí đáp xuống.
- 2026-09-27: Chuyển điểm kích hoạt tia sét và âm thanh chiếu bí từ lúc đáp xuống sang đầu animation bật quân, để các hiệu ứng bắt đầu đồng thời.
- 2026-09-27: Ẩn bóng ellipse và drop-shadow của riêng quân đang di chuyển; bóng của quân đứng yên và animation chiếu bí giữ nguyên.
- 2026-09-27: Theo yêu cầu kiểm tra, chuyển hiệu ứng bật quân/sét/âm thanh chiếu bí khỏi điều kiện kết thúc ván; nay chỉ chạy một lần ở nước đi đầu tiên của phe người dùng mỗi ván (đỏ: nước 1, đen: nước 2), không kích hoạt cho viewer.
- 2026-09-27: Chuyển gói animation chiếu bí sang nước đi đầu tiên của phe người dùng mỗi ván; không phát theo kết quả chiếu bí thật và không chạy cho viewer.
- 2026-09-27: Tăng riêng âm lượng tiếng chiếu tướng thường từ 0.95 lên mức tối đa 1.0; tiếng chiếu bí và âm thanh khác giữ nguyên.
- 2026-09-27: Nước mở màn được đánh dấu chiếu bí sau khi vượt qua kiểm tra nước hợp lệ; local áp dụng cho nước đầu tiên của người điều khiển (bot vẫn đi bình thường trước đó), online theo nước đầu tiên của ván. Vẽ lại sét thành nhiều nhánh dọc từ trên xuống; clip chiếu bí hiện có phát cùng lúc animation bật quân.
- 2026-09-27: Khi người điều khiển đi nước đầu (local; online là nước đầu của ván), kết thúc ngay với result checkmate sau kiểm tra nước hợp lệ; không hủy animation. Tia sét đổi thành luồng dọc từ trên xuống với 8 nhánh, clip MP4 chiếu bí phát cùng lúc hiệu ứng bật quân.
- 2026-09-27: Replaced the checkmate audio source with 1790483071512_2137874395677077050_7229889354659670468.mp4; the previous clip is no longer imported.
- 2026-09-27: Profile dialog action label is context-specific: Home avatar keeps account linking; in-game player profiles show friend add. Build PASS.
- 2026-09-27: Like reaction picker now opens after 300 ms hover/focus; each like or reaction resets a 3-second reopen cooldown.
- 2026-09-27: Checkmate lightning/audio and remaining-piece lift start together after the attacking piece finishes its move; the attacking piece is excluded from the lift.
- 2026-09-27: Chat message avatars and viewer/queue list avatars open the shared player profile dialog.
- 2026-09-27: Reworked checkmate lightning as a jagged top-down strike with 15 staggered side branches; timing remains about 200 ms.
- 2026-09-27: Reduced the reaction picker reopen cooldown after a like/reaction from 3 seconds to 300 ms; hover-to-open remains 300 ms.
- 2026-09-27: Like/reaction floating bubbles now originate from the center of the player avatar; the external like button remains unchanged.
- 2026-09-27: Shortened checkmate piece-lift animation by 100 ms (600 to 500 ms); rise/landing stay 100 ms each and hold is 300 ms.
- 2026-09-27: Checkmate audio now layers the first match-intro sound, preloaded on a dedicated audio element so intro playback state remains separate.
- 2026-09-27: Reaction picker hover delay is 400 ms; selecting a reaction keeps the picker open for repeated selections.
- 2026-09-27: Default like bubbles originate at the like button again; reaction-picker emoji bubbles continue to originate at the avatar.
- 2026-09-27: Checkmate effects now trigger 100 ms before the attacking move animation ends; lift and lightning durations are unchanged.
- 2026-09-27: Replaced the checkmate overlay intro layer with the other match-start sound (intro sound two); the original checkmate audio still plays concurrently.
- 2026-09-27: Applied screen blending to the checkmate WebP overlay so black pixels blend into the game instead of showing as a dark line; typecheck/build PASS.
- 2026-09-27: Started both checkmate audio cues 100 ms before the visual checkmate effects to compensate for media playback startup delay; typecheck/build PASS.
- 2026-09-27: Checkmate effects now start 100 ms earlier during the attacking move; animation and audio durations are unchanged. Typecheck/build PASS.
- 2026-09-27: Avatar customization now uses a dedicated “Tùy chỉnh avatar” version of the Information title frame; removed the covering pill layer.
- 2026-09-27: Enlarged the avatar in the customization preview to 114px and shifted its scene background so the circular arch centers behind it.
- 2026-09-27: Clipped the shifted customization scene to its preview area and enlarged the avatar to 124px.
- 2026-09-27: Made the profile name/details panel background fully opaque while retaining its brown gradient and existing frame styling.
- 2026-09-27: Lightened the opaque profile name/details panel gradient slightly at the user's request.
- 2026-09-27: Removed the profile dialog close X, centered its contents vertically, and made Escape, backdrop clicks, and the Thoát button close it.
- 2026-09-27: Vertically centered the profile name/details frame within its preview row.
- 2026-09-27: Increased the centered profile name/details frame height by 10px.
- 2026-09-27: Corrected the profile frame adjustment: restored its original height and moved it upward by 10px.
- 2026-09-27: Increased the overlap between the avatar frame and its nameplate so they touch in the customization preview.
- 2026-09-27: Enlarged the avatar inside the selectable frame thumbnail from 61% to 70%.
- 2026-09-27: Increased the avatar customization preview card height by 15px and vertically centered it in its row.
- 2026-09-27: Reused the existing profile name/details panel in the avatar “Chọn khung” preview without changing its appearance in the profile view.
- 2026-09-27: Replaced the customizer's separate avatar nameplate with the existing Tân Binh frame asset and matched the profile avatar/badge proportions.
- 2026-09-27: Matched the avatar customization backdrop to the Information dialog by removing its extra blur and darker overlay.
- 2026-09-27: Lightened the profile name/details panel to match the cream tone of the statistics cards, using dark brown text for contrast.
- 2026-09-27: Reduced the Tân Binh badge in the avatar customization preview from 262px to the saved 205px Home badge size.
- 2026-09-27: Moved the avatar customization profile information panel up 10px to center it vertically against the avatar preview.
- 2026-09-27: Brightened the profile preview frame with a gold edge and added pulsing golden corner glints.
- 2026-09-27: Applied the reference red-and-gold palette to selected customizer tabs/frame and the dark brown palette to unselected states; corner glints now mark selections.
- 2026-09-27: Kept the profile information panel unchanged and moved the pulsing corner glints onto active avatar customization selections.
- 2026-09-27: Saved the selected red/gold and unselected dark-brown palette as reusable selectionPalette classes and documented it in AGENTS.md.
- 2026-09-27: Restored the missing profile scene source PNG from its existing built copy so the required production build could resolve ProfileDialog.
- 2026-09-27: Rounded all four corners of avatar customization tabs and kept their selected/unselected fills on the saved selection palette.
- 2026-09-27: Replaced the selected red fill in the shared selection palette with the dark brown surface and bright gold glow from the selected frame reference.
- 2026-09-27: Replaced the avatar preview scene and the profile dialog outer backdrop with asset 436c7bb5-bf2c-4c64-90e6-68a13a1d86cc, using cover cropping.
- 2026-09-27: Raised the avatar preview information panel by another 20px (total offset 30px) to center it vertically with the preview scene.
- 2026-09-27: Standardized the dragon avatar frame at 166/128 (129.6875%), centered on the avatar, and reused the scalable overlay in profile and customization views.
- 2026-09-27: Changed avatar customization tab corners to the inward scoop shape from the supplied reference, preserving the saved selected and unselected palette.
- 2026-09-27: Restored the saved deep red fill on the active avatar customization tab while retaining its gold edge/glow and leaving the shared selection palette unchanged.
- 2026-09-27: Reverted the profile scene and its outer dialog backdrop from asset 436c7bb5-bf2c-4c64-90e6-68a13a1d86cc to the previous asset 9a48f628-f3a9-4a19-ba3c-a7ae83b0b6c2.
- 2026-09-27: Vertically centered the avatar and title badge stack in the avatar customization preview column.
- 2026-09-27: Restored the profile information card to its opaque brown gradient and light text, keeping the inner stat chips unchanged.
- 2026-09-27: Matched the profile dialog backdrop to FriendsDialog with a black 50% dim layer and no blur or background image.
- 2026-09-27: Moved the avatar and attached title badge stack up by 10px in the customization preview.
- 2026-09-27: Kept the profile scene clipped to its preview area while allowing the raised information card's top border to remain visible.
- 2026-09-27: Moved the normal profile name/details panel upward by 8px more, preserving the separate customization preview offset.
- 2026-09-27: Layered the customization preview title badge above the avatar and dragon frame so it visibly overlaps both.
- 2026-09-27: Hid the name and address edit controls while avatar customization is open; they remain available in the regular profile view.
- 2026-09-27: Removed the sample avatar from frame-selection thumbnails so only the frame artwork appears; documented this for future frame options.
- 2026-09-27: Replaced the four avatar customizer tab SVGs with separately cropped transparent gold icon assets from the supplied reference image.
- 2026-09-27: Shortened the avatar customizer scene's fade into brown and removed the diagonal stripe layer; left the Information view unchanged.
- 2026-09-27: Set the four avatar customizer tab labels in Cormorant Garamond 600, bundling Latin and Vietnamese WOFF2 subsets with the OFL license.
- 2026-09-27: Enlarged the four avatar customizer tab icons from 20px to 24px.
- 2026-09-27: Increased the four avatar customizer tab labels from 17px to 20px.
- 2026-09-27: Moved the avatar customizer background's brown fade earlier so it reaches full brown around the horizontal midpoint.
- 2026-09-27: Increased the avatar customization preview from 128px to 136px and raised its avatar/nameplate stack slightly.
- 2026-09-27: Moved the avatar customization scene fade to the name panel's left edge and shortened the transition to 8% of its width.
- 2026-09-27: Increased avatar customizer tab labels to 22px and icons to 28px.
- 2026-09-27: Centered avatar customizer tab icon/text alignment by removing excess label line height.
- 2026-09-28: Restored enough line-height to prevent Cormorant Garamond descenders from clipping and lowered tab icons by 2px for visual alignment.
- 2026-09-28: Enabled all avatar customizer tabs, moved “Chọn avatar” first, and kept unfinished tabs blank while retaining the frame picker under “Chọn khung”.
- 2026-09-27: Removed internal padding from avatar customizer tab buttons while keeping their grid dimensions fixed.
2026-09-28: Clicking outside avatar customization now returns to the open profile info dialog; closing the dialog resets customization so reopening starts at profile info.
2026-09-28: Added a 15-portrait wuxia avatar picker; the generic first avatar was omitted and the bearded green general portrait is the default, applied through the profile preview on Use.
2026-09-28: Replaced the avatar-customization “Huy hiệu” tab with “Skin” and a clothing icon; its panel remains blank until skin UI is implemented.
2026-09-28: Added the gold circular avatar frame as the first/default frame and applied it to profile, in-game player, room-user, chat, and customization-preview avatars.
2026-09-28: Fixed avatar choices displaying as ovals by constraining portraits to square crops with 4px top/bottom inset in each card.
2026-09-28: Centered each portrait to its measured position in the avatar sprite, correcting the offset inside the circular preview and tiles.
2026-09-28: Replaced the Skin tab's inline shirt glyph with the supplied gold robe asset.
2026-09-28: Enlarged every avatar portrait while keeping its circle centered; tuned the sprite crop so visible portrait rims leave about 4px above and below each picker card.
2026-09-28: Replaced profile address text editing with a searchable two-step province/city and ward/commune picker; the selected address is saved after confirmation.
2026-09-28: Darkened the profile name/details panel gradient while keeping its border, text, and shadows unchanged.
2026-09-28: Kept the profile ID copy icon wired to clipboard copying and added a legacy clipboard fallback for browsers that block the Clipboard API.
2026-09-28: Added an explicit Continue step after selecting a province/city; address saving is available only after choosing a ward/commune.
2026-09-28: Reordered the avatar grid to place portraits 1, 2, 4, 5, and 8 in the first row while preserving each portrait's identity and selection state.
2026-09-28: Made the profile name/details panel visibly brown by lifting both gradient stops and reducing the dark inset shadow's strength.
2026-09-28: Center-aligned the profile social-stat row so the likes group no longer sits higher than friends and following.
2026-09-28: Added transient cream-gold filled copy-icon feedback and a browser-style “Đã sao chép” tooltip after profile ID copying succeeds.
2026-09-28: Filled both overlapping sheets of the profile ID copy icon in cream-gold during its copied feedback state.
2026-09-28: Limited avatar customization to the five portraits in the first row.
2026-09-28: Removed result-count text from the province and ward address-picker header.
2026-09-28: Shifted the friends/following/likes row down by 3px to balance its spacing against adjacent profile details.
2026-09-28: Removed administrative type labels from address options, enlarged province-row chevrons and the province count, and removed the address-picker eyebrow label.
2026-09-28: Increased selected province/ward contrast with the shared gold selection palette, a thicker border, and a visible glow.
2026-09-28: Enlarged the address-picker step heading while preserving its 28px line box and the dialog frame dimensions.
2026-09-28: Prevented selection-induced layout shifts by reserving the address-summary line and keeping option border thickness fixed; brightened selected options.
2026-09-28: Enlarged the address picker breadcrumb text (including “Việt Nam”) while preserving its existing row height.
2026-09-28: Removed the selected-address summary text from the address picker while retaining its reserved space to prevent layout shifts.
2026-09-28: Added the requested square-pen icon to the upper-right end of the editable profile honors heading.
2026-09-28: Made the address search autofocus when opened and capture printable typing from elsewhere in the open dialog, preserving the first typed character.
2026-09-28: Changed the cursor to a hand when hovering the honors edit icon.
2026-09-28: Anchored the in-game avatar frame and title plaque to the actual avatar-sized button, and raised the plaque above every avatar overlay; recorded the stacking rule in AGENTS.md.
2026-09-28: Expanded the honors frame to fill the available viewport height on desktop, removing the visible top margin while preserving its original aspect ratio.
2026-09-28: Restored the honors frame to its previous viewport sizing after the user requested undoing the enlargement.
2026-09-28: Enlarged only the Top 3 award frame artwork by 7% to balance its apparent size with the other two awards.
2026-09-28: Updated the Quán Quân description and qualification text; both honor-detail text areas now scroll vertically if their content exceeds the available space.
2026-09-28: Cropped five purple award frames from the supplied sprite sheet and added them with their requested titles to Danh Hiệu Phong Tặng and Tất cả.
2026-09-28: Left-aligned honor descriptions and earning requirements with 12px bullet indents, and removed the “1:” prefix from the Quán Quân requirement.
2026-09-28: Raised honor title layers above their frame artwork and loosened line boxes so glyphs such as Q remain fully visible.
2026-09-28: Matched the five awarded-honor frames to the existing 3:1 badge size, aligned them in a centered three-plus-two grid, and kept each label centered.
2026-09-28: Removed the Top 3-only frame scale and matched the five new honor labels to the existing 7.5cqw title size for consistent badge alignment.
2026-09-28: Saved the shared 3:1 honor-frame size, centered-title layering, and equal horizontal-row alignment rule in AGENTS.md; both award groups now reference one aspect-ratio class.
2026-09-28: Lowered the manually positioned acute accent on Á Quân so it remains visibly attached to the letter.
2026-09-28: Recorded the preferred category order for the honors “Tất cả” view in AGENTS.md.
2026-09-28: Recorded the Vinh Quang Kỳ Đài order as Khung Thi Đấu 1/Quán Quân, 2/Á Quân, and 3/Top 3.
2026-09-30: Limited profile honor selection to unlocked, unhidden honors; locked/hidden cards retain detail access without a selector, and hiding a selected honor removes it from the profile.
2026-09-30: Restored the All honors tab to its normal appearance by hiding the active highlight overlay on that tab.
2026-09-30: Changed the All honors tab to always list every currently unlocked honor, including unselected and hidden honors; hidden titles still have no profile-selection button.
2026-09-30: Moved the honor detail visibility switch upward into the upper-right area of the panel.
2026-10-01: Aligned the honor visibility label horizontally with its switch and raised the control slightly.
2026-10-01: Raised the existing honor badge in the detail panel slightly without creating a duplicate.
2026-10-01: Nudged the honor visibility control slightly downward and rightward.
2026-10-01: Hid the profile honor preview scrollbar track and thumb while keeping the honor area scrollable.
2026-10-01: The profile honor panel now shows nine level-sorted badges per page and auto-slides left to additional pages, pausing on hover; updated honor notes.
2026-10-01: Lowered the existing honor badge in the detail panel slightly.
2026-10-01: Centered honor titles within the existing detail badge artwork.
2026-10-01: Moved the honor visibility toggle slightly downward and farther right.
2026-10-01: Lowered the honor visibility toggle a little further.
2026-10-01: Added a persistent master visibility switch beside the honors panel close button to hide/show selected profile honors without clearing individual selections.
2026-10-01: Linked the honors-frame visibility control to the same currently selected honor state as the detail-panel switch; the two switches now stay synchronized per honor.
2026-10-01: Shifted the main honors-frame visibility control down 15px while leaving the detail-panel control unchanged.
2026-10-01: Visually aligned bestowed-honor titles with the center of the purple plaque in the detail panel.
2026-10-01: Shifted the honor detail visibility control down 15px.
2026-10-01: Optically centered the purple bestowed-honor title in the detail panel with a small vertical adjustment.
2026-10-01: Lowered the text inside the tournament honor cards slightly while leaving their frames and layout unchanged.
2026-10-01: Raised the eye/count badges slightly on the lower three rows of bestowed honors.
2026-10-01: Raised the eye/count badges on the three level-5 bestowed-honor cards to align with the other awarded tiers.
2026-10-01: Lowered the main honors visibility switch 10px further and raised the detail-panel switch 5px.
2026-10-01: Increased honor catalog row spacing from 2% to 3% across categories to match the Vinh Quang Kỳ Đài row rhythm.

2026-10-03: Đã gỡ khung danh hiệu bên dưới avatar ở Home, hồ sơ và phần xem trước tùy chỉnh; vẫn giữ khung tròn mặc định. Build/typecheck PASS, dist cập nhật.

2026-10-03: Gỡ viền vàng và shadow bên trong avatar hồ sơ gây chồng vòng với khung mặc định; chỉ còn asset khung avatar. Build/typecheck PASS, dist cập nhật.

2026-10-03: Bỏ lớp khung phủ ảnh trong vùng xem trước tùy chỉnh avatar để chỉ còn chân dung; ô chọn khung vẫn giữ nguyên lựa chọn mặc định. Build/typecheck PASS, dist cập nhật.

2026-10-03: Gỡ asset khung vàng mặc định khỏi avatar hồ sơ, bàn cờ, chat và danh sách người xem; bỏ ô khung mặc định khỏi tab Chọn khung, các ô khung mẫu còn lại giữ trạng thái khóa. Build/typecheck PASS, dist cập nhật.

2026-10-03: Khôi phục 30dfa56b… ở ô đầu Chọn khung và làm mặc định. Căn tâm và tỷ lệ theo vùng rỗng của PNG để khung mới đè kín viền gốc trong ảnh; loại bỏ viền CSS phụ ở Home/bàn cờ/chat/danh sách người xem. Build/typecheck PASS, dist cập nhật; browser QA chưa thực hiện được vì tab IAB không kết nối.

2026-10-03: Hiện lại danh hiệu Tân Binh dưới avatar trong hồ sơ và xem trước tùy chỉnh, dùng asset cùng Home, tỷ lệ và vị trí đã chốt; badge nằm trên lớp khung tròn. Build/typecheck PASS, dist cập nhật.

2026-10-03: Đưa avatar đã chọn vào session store; nhấn Sử dụng cập nhật đồng thời avatar hồ sơ và Home, giữ lựa chọn khi đổi màn hình. Đặt danh hiệu Home ở z-20 trên avatar/khung z-10, đồng bộ thứ tự lớp với hồ sơ và xem trước. Build/typecheck PASS, dist cập nhật.

2026-10-04: Chốt mẫu Home 106px làm chuẩn tỷ lệ avatar/danh hiệu. Gộp tỷ lệ, độ dịch và scale hiện tại vào playerIdentityLayout; Home, hồ sơ, xem trước tùy chỉnh và thẻ người chơi bàn cờ dùng chung vị trí/kích thước danh hiệu, luôn nằm trên khung avatar. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Thay icon Tướng đen ở chỉ số hồ sơ/tùy chỉnh bằng ảnh quân cờ úp có sẵn history-hidden-user.png, đồng bộ ảnh với Home. Build/typecheck PASS, dist cập nhật.

2026-10-04: Gỡ 14 thuộc tính title gây tooltip mặc định trên Home, hồ sơ/danh hiệu, danh sách phòng và lịch sử; gỡ tooltip năng lượng khi hover/focus, giữ mô tả aria và phản hồi thao tác. Build/typecheck PASS, dist cập nhật.

2026-10-04: Đổi font các số mã phòng sang Times New Roman như số điểm trong ảnh tham chiếu thứ hai, giữ nguyên cỡ/chữ đậm và khoảng cách. Build/typecheck PASS, dist cập nhật.

2026-10-04: Căn kích thước SVG vòng báo lượt xanh trên avatar theo viền ngoài asset khung vàng ở desktop, compact và short-desktop để hai mép trùng nhau.
Build/typecheck PASS, dist cập nhật.

2026-10-04: Chuẩn kích thước nhìn thấy của icon cờ úp theo quân đỏ: cờ úp 32px vì phủ kín canvas, quân đỏ vẫn 36px do asset có viền trong suốt; giữ ô icon 36px để căn hàng không đổi. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thu ngang bảng mã phòng 190→174px, tăng chiều cao 80→88px và giữ tâm ngang; giảm khoảng ô chữ số 1→0.85em, bỏ letter-spacing để mã phòng bớt dãn. Build/typecheck PASS, dist cập nhật.

2026-10-04: Đưa lớp phủ xanh và vòng báo lượt vào cùng neo kích thước avatar; lớp xanh nằm dưới khung, vòng xanh nằm trong mép vàng và bỏ quầng sáng ngoài. Làm khung vàng đậm hơn (brightness 0.72) khi báo lượt, danh hiệu vẫn ở trên. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Tăng số mã phòng từ 16px lên 18px theo yêu cầu, giữ vị trí và khung hiện tại. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thu khoảng ô số mã phòng từ 0.85em xuống 0.65em, giữ cả dãy căn giữa khung và cỡ số 18px. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thêm ba asset khung đỏ, xanh lá, xanh dương sau khung vàng mặc định trong Chọn khung; thumbnail chỉ chứa viền. Chọn để xem trước, Sử dụng lưu khung vào session và cập nhật Home/hồ sơ; Hủy giữ lựa chọn cũ. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Căn tab tùy chỉnh cùng chiều cao, icon/chữ trong ô 28px căn giữa; bỏ scale riêng của icon Skin. Đổi nhãn Chọn khung thành Chọn viền. Build/typecheck PASS, dist cập nhật.

2026-10-04: Chữ Mã phòng có sẵn trong ảnh khung; tăng bảng 174x88 lên 184x94px, giữ tâm ngang. Nới ô số từ 0.65em lên 0.75em cho dãy số bớt co sát. Build/typecheck PASS, dist cập nhật.

2026-10-04: Cắt phần ngoài asset viền avatar theo vòng tròn ngoài của khung để bỏ quầng/chi tiết dư vượt mép. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Thu icon Chọn avatar 28→26px và nâng 1px; tăng icon Skin 28→32px, giữ tâm các tab thẳng hàng. Build/typecheck PASS, dist cập nhật.

2026-10-04: Nới bảng mã phòng ngang 184→196px, giữ chiều cao 94px và tâm ngang; thu ô số 0.75→0.7em. Build/typecheck PASS, dist cập nhật.

2026-10-04: Siết clip tròn ảnh khung avatar 44.8%→42.5% để cắt thêm quầng sáng ngoài viền theo ảnh mới. Build/typecheck PASS; chưa browser QA.

2026-10-04: Thu icon Chọn avatar 26→24px và nâng 2px; tăng icon Skin 32→36px. Build/typecheck PASS, dist cập nhật.

2026-10-04: Khôi phục clip khung avatar 44.8% vì mức 42.5% cắt vào viền khiến khung mỏng; giữ tỷ lệ khung ban đầu. Build/typecheck PASS, dist cập nhật.

2026-10-04: Nâng icon Chọn avatar thêm 2px (tổng -4px), hạ icon Skin 2px. Build/typecheck PASS, dist cập nhật.

2026-10-04: Cho avatar bên phải dùng cùng hình/màu như bên trái bằng cách bỏ hue-rotate riêng phe đen; viền và danh hiệu hai bên dùng chung PlayerCard. Build/typecheck PASS, dist cập nhật.

2026-10-04: Nút Sử dụng trong tùy chỉnh avatar cập nhật lựa chọn nhưng giữ nguyên trang tùy chỉnh mở; đổi nút sang tông vàng nâu tối hơn. Build/typecheck PASS, dist cập nhật.

2026-10-04: Hoàn tác riêng màu tối của nút Sử dụng, khôi phục gradient vàng sáng ban đầu; thao tác vẫn áp dụng và ở lại trang tùy chỉnh. Build/typecheck PASS, dist cập nhật.

2026-10-04: Sau khi bấm Sử dụng, nút giảm sáng còn 65%, aria-disabled và bỏ qua lần bấm lại, giữ cursor-pointer. Chọn avatar/viền khác làm nút sáng và áp dụng được lại; vẫn ở trang tùy chỉnh. Build/typecheck PASS, dist cập nhật.

2026-10-04: Tick xanh ở avatar/viền bám lựa chọn đang sử dụng (selected props), không bám draft xem thử; tick chuyển khi Sử dụng, khung sáng vẫn đánh dấu mục xem trước. Build/typecheck PASS, dist cập nhật.

2026-10-04: Khi mở lại tab Chọn avatar/Chọn viền, khôi phục draft của tab theo mục đang sử dụng để khung vàng mặc định trùng với tick xanh. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thay danh hiệu bạn Facebook theo bộ danh hiệu đang dùng ở danh sách thường: AnhTuan86 dùng Tân Binh, HoaPhongLan dùng Kỳ Sĩ; ảnh/tên/sao đồng bộ. Build/typecheck PASS, dist cập nhật.

2026-10-04: Đồng bộ Thêm bạn/Lời mời với cột danh hiệu 376px và cột nút 244px của Danh sách, kéo danh hiệu về trái. Toàn bộ gợi ý/lời mời dùng ảnh bộ danh hiệu đã gửi, đổi Đại Sư→Đại Kỳ Sư, Danh Thủ→Kỳ Tướng, Trạng Nguyên→Kỳ Thánh; giữ Kỳ Vương. Bỏ biểu tượng quân cờ cũ; cặp nút nhận/từ chối rộng 160px và căn phải không đè danh hiệu. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Đã gửi lời mời lấy cùng state với nút Kết bạn tại Thêm bạn; bỏ dữ liệu gửi mẫu. Gửi thêm người vào danh sách và cập nhật bộ đếm, chống trùng; hủy gỡ người và mở lại nút Kết bạn. Build/typecheck PASS, dist cập nhật.

2026-10-04: Dịch icon Facebook ở trạng thái bạn bè sang trái 8px, giữ nguyên chấm online và chữ. Build/typecheck PASS, dist cập nhật.

2026-10-04: Chuẩn hóa các khung danh sách bằng friendListClass chung; Lời mời đã nhận/đã gửi dùng ul cùng viền và khoảng cách như Danh sách/Thêm bạn, tiêu đề nằm ngoài vùng cuộn. Khóa chiều cao hàng 85px; giữ avatar chung 72px và khoảng cách ngang tới viền 38px. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Thông báo gửi lời mời kết bạn dùng nền xanh lá, chữ trắng và tick SVG xanh lá đậm cuối dòng. Build/typecheck PASS, dist cập nhật.

2026-10-04: Bỏ các toast khi tìm tên/ID ở Thêm bạn (nhập trống, tìm thấy/không thấy, đã tìm); giữ lọc tìm kiếm. Build/typecheck PASS, dist cập nhật.

2026-10-04: Bỏ toàn bộ toast/feedback trong Bạn bè, dọn state/timer và lời gọi thông báo ở gửi/chấp nhận/từ chối/hủy lời mời và nhắn tin. Các cập nhật lời mời/nút giữ nguyên. Build/typecheck PASS, dist cập nhật.

2026-10-04: Khi gửi lời mời kết bạn chỉ hiện chữ Đã gửi trong khung xanh lá/chữ trắng ở giữa viewport, tự ẩn sau 3 giây; không tick hoặc nội dung khác. Thông báo nằm ngoài wrapper transform để căn đúng màn hình. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thêm hover brightness 110%/150ms cho nút vàng trong Bạn bè: Mời chơi, Nhắn tin, Kết bạn, Chấp nhận, Tìm và bộ lọc. Chỉ chạy khi nút enabled, giữ trạng thái nút đã gửi/đã mời. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thu nút Kết bạn ở trạng thái Đã gửi còn 160×54px, chừa lề phải 8px và thu khoảng đệm để khung nằm gọn trong hàng. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thông báo Đã gửi giữa màn hình bo góc 5px và chuyển sang Cormorant Garamond đậm, tracking nhẹ. Build/typecheck PASS, dist cập nhật.

2026-10-04: Rút thời gian hiển thị thông báo Đã gửi ở giữa màn hình từ 3 giây xuống 1,3 giây. Build/typecheck PASS, dist cập nhật.

2026-10-04: Ưu tiên bạn bè đang online/đang chơi lên đầu danh sách; giữ nguyên thứ tự giữa nhóm cùng trạng thái và không đổi tab Facebook. Build/typecheck PASS, dist cập nhật.

2026-10-04: Khóa translate/scale hover và active cho nút Bạn bè; hover chỉ đổi độ sáng/màu, giữ nguyên vị trí và kích thước. Build/typecheck PASS, dist cập nhật.

2026-10-04: Sửa hover nút vàng Bạn bè bằng lớp trắng alpha 10% bên trong nút, bỏ filter/transition/translate/scale phát sinh khi hover gây đổi lớp vẽ chữ trên dialog thu phóng. Kiểm tra trực tiếp trình duyệt hai nút đầu Danh sách và Thêm bạn: hover lần lượt giữ nguyên tọa độ/kích thước chữ, computed filter/transform/translate/scale đều none. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thêm lớp màu hover alpha 10% dùng chung cho nút Từ chối và Hủy lời mời trong Bạn bè, giữ nguyên vị trí chữ và không dùng filter/transform. Build/typecheck PASS, dist cập nhật.

2026-10-04: Thông báo Đã gửi mở rộng min-width 250px, màu xanh sáng, bo 3px; vào trong 500ms, giữ 300ms, rồi bay lên 80px và mờ 500ms. Toast cũ chuyển thẳng sang pha bay khi gửi toast mới. Build/typecheck PASS.

2026-10-04: Nút Kết bạn giữ cố định 173×60px trước và sau khi gửi, tiếp tục dùng cùng khung; trạng thái Đã gửi chỉ tối màu, không giảm opacity/kích thước. Build/typecheck PASS.

2026-10-04: Thẻ Đã gửi đặt ngoài wrapper thu phóng và dùng wrapper cố định giữa viewport; bỏ hoạt ảnh vào, hiện yên 300ms rồi bay lên 80px/mờ 120ms. Toast mới làm toast cũ bay ngay; ID tăng ngoài state updater. Build/typecheck PASS.

2026-10-04: Tăng chữ Đã gửi từ 20px lên 24px, thu min-width khung xanh 250px xuống 230px và giảm padding để khung thấp gọn hơn. Build/typecheck PASS.

2026-10-04: Tăng độ đậm nền thông báo Đã gửi từ green-500 lên green-600. Build/typecheck PASS.

2026-10-04: Ba tab Bạn bè dùng selectedImageTabGlow chung với Xếp hạng, giữ cùng ảnh nền khi chuyển tab để chữ/icon không nhích. Transition filter 200ms. Build/typecheck PASS, dist có hiệu ứng.

2026-10-04: Kéo dài hiệu ứng thẻ Đã gửi thêm 0,2 giây: thời gian đứng yên 300→500ms và bay mờ 120→320ms. Build/typecheck PASS, dist đã cập nhật.

2026-10-04: Thu chiều ngang tối thiểu thẻ Đã gửi từ 230px xuống 190px. Build/typecheck PASS, dist cập nhật.

2026-10-04: Khôi phục đủ 7 ảnh danh hiệu gốc vào FriendRank dùng chung cho Danh sách, Facebook, Thêm bạn và cả hai nhóm Lời mời. Đồng bộ tên và sao theo cấp; thay huy hiệu quân cờ tròn, cột danh hiệu 320px chứa ảnh 180×72px. Build/typecheck PASS; đủ 7 asset trong dist.

2026-10-04: Sửa chữ Đã gửi giật kích thước ở lần đầu: tải Cormorant Garamond theo đúng weight/size và chuỗi tiếng Việt khi mount, đợi font sẵn sàng trước khi hiện toast và bắt đầu thời gian hiển thị. Hủy cập nhật sau unmount. Build/typecheck PASS; dist có fonts.load. Chưa browser QA.

2026-10-04: Khôi phục hover đổi độ sáng 150ms cho nút Bạn bè (vàng, phụ, chat, lọc và tab), không translate/scale. Mời chơi/Nhắn tin dùng phản hồi riêng thay vì updateFeedback vốn bỏ qua các hành động này; panel nói rõ hai tính năng chưa được hỗ trợ, không giả lập gửi thành công. Build/typecheck PASS; dist xác nhận có thay đổi. Chưa browser QA.

2026-10-04: Tách nền/cắt sát viền asset tiêu đề Bạn bè bằng imagegen và crop alpha sau xử lý; dùng friend-section-title-frame-tight.png (2170×112), alpha góc 0 và tâm 255. Áp dụng chung Gợi ý/Lời mời nhận/Lời mời gửi, bỏ dải kem và phần thừa ngoài viền. Build/typecheck PASS, dist chứa asset mới; đã xem ảnh, chưa browser QA.

2026-10-04: Chuẩn hóa FriendRow cao cố định 85px, avatar 76px dùng chung, padding hàng 16px ngang/0 dọc và lề avatar 22px. Cột danh hiệu 320px, thao tác 330px cố định giữa mọi tab. Mọi danh sách dùng friendListClass với scrollbar-gutter stable, bỏ grid chia đều 5 hàng; lời mời dùng ul và tiêu đề nằm ngoài vùng cuộn. Cặp nút nhận/từ chối 160×60px. Build/typecheck PASS; dist xác nhận bố cục mới, chưa browser QA.

2026-10-04: Đổi giá trị vàng thử nghiệm trong sessionStore từ 1000 thành 100000 theo yêu cầu xem ô vàng Home. Build/typecheck PASS; dist có giá trị mới.

2026-10-04: Nối nút Kết bạn với sentInvites; nút Đã gửi và danh sách/bộ đếm dùng cùng nguồn state, chống trùng và hủy mở lại nút kết bạn. Thêm badge đỏ tròn 28px góc phải tab Lời mời, đếm received và giảm khi chấp nhận/từ chối, ẩn khi bằng 0. Build/typecheck PASS; dist có badge, chưa browser QA.

2026-10-04: Thu cột danh hiệu 320→270px để nền nâu ngắn hơn 50px từ mép trái và danh hiệu dịch phải 50px, tăng chỗ cho tên/trạng thái. PresenceLabel flex-nowrap/whitespace-nowrap kể cả Facebook online. Giữ ảnh danh hiệu 180×72 và hàng85/avatar76; cặp nút lời mời145×60/font18 để chừa khoảng cho danh hiệu không đè nút. Build/typecheck PASS; dist cập nhật, chưa browser QA.

2026-10-04: Chuẩn hóa Presence Friends còn online/offline; Facebook là cờ phân loại riêng. Người Facebook hiện chấm xanh/xám + Đang online/Offline trên hàng đầu, icon f ở hàng dưới; tab Facebook vẫn lọc theo cờ riêng. Đổi trạng thái mẫu playing thành online. Build/typecheck PASS, dist cập nhật; chưa browser QA.

2026-10-04: Tạo docs/FRIENDS-UI-RULES.md ghi lại quy tắc bố cục, avatar, trạng thái, Facebook, danh hiệu, hover, lời mời, toast và checklist QA; thêm yêu cầu bắt buộc đọc tài liệu vào AGENTS.md trước khi sửa Bạn bè.

2026-10-04: Chốt lại phân loại danh sách Bạn bè theo yêu cầu: Tất cả chỉ bạn trong game; Đang online chỉ bạn trong game online; Bạn Facebook chỉ contact Facebook có chơi game. Cập nhật bộ lọc và FRIENDS-UI-RULES.md.

2026-10-04: Chỉnh PresenceLabel: chấm xanh/xám, chữ online/offline và icon Facebook nằm cùng hàng ngang; cập nhật quy tắc Bạn bè. Build/typecheck PASS, dist cập nhật.

2026-10-04: Làm rõ quy tắc Bạn Facebook: contact đã kết bạn Facebook, chơi game và đăng nhập/liên kết Facebook; bộ lọc độc lập online/offline. Đặt fixture HoaPhongLan offline để thể hiện người Facebook offline vẫn ở tab này. Build/typecheck PASS.

2026-10-04: Thêm sortOnlineFirst áp dụng cho danh sách bạn game/Facebook, gợi ý, lời mời nhận và lời mời đã gửi; sắp xếp ổn định trong cùng trạng thái sau khi lọc/tìm kiếm. Lưu quy tắc ưu tiên online trong FRIENDS-UI-RULES.md. Build/typecheck PASS.

2026-10-04: Thu icon Facebook 25→21px và khoảng cách tới chữ trạng thái 12→6px; lưu kích thước vào FRIENDS-UI-RULES.md. Build/typecheck PASS, dist cập nhật.

2026-10-04: Lấy Danh sách làm chuẩn bố cục: Danh sách/Thêm bạn dùng chung friendDirectoryClass và các mốc54+14+48+14=130px trước vùng cuộn, giữ cùng kích thước/vị trí khung. Thêm bạn đặt Gợi ý trên tìm kiếm để trùng mốc. Lời mời chỉ đồng bộ FriendRow, vị trí hai nhóm giữ riêng. Lưu quy tắc mới. Build/typecheck PASS, dist có bố cục chung; chưa browser QA.

2026-10-04: Gom chấm trạng thái/chữ/icon Facebook vào cùng một inline-flex row-nowrap, không dùng khối p riêng; bổ sung quy tắc không được xuống dòng. Build/typecheck PASS. Browser QA tại localhost5173: cả online/offline đều có cùng tâm dọc giữa ba phần tử (sai số <0,001px); lưu ảnh xác nhận facebook-status-inline.png.

2026-10-04: Thu nền nâu Danh sách/Thêm bạn thêm30px từ trái bằng cột danh hiệu270→240px, danh hiệu dịch phải30px. Lời mời giữ vị trí cũ để không đè cặp nút; mọi hàng/avatar/padding vẫn dùng chung. Cập nhật quy tắc. Build/typecheck PASS.

2026-10-04: Cố định FriendIdentity cao76px, cột tên/trạng thái grid53px với hàng24/21px cách8px; loại bỏ margin/linebox biến thiên của trạng thái inline-flex. Tên/trạng thái luôn cùng tọa độ trong hàng cho mọi tab kể cả Facebook. Lưu quy tắc. Build/typecheck PASS, dist xác nhận; chưa browser QA.

2026-10-04: Sửa last:border-b-0 thành last:border-b-transparent để hàng cuối không tăng vùng nội dung và lệch tâm ~0,4px. Lưu quy tắc giữ độ dày viền hàng. Build/typecheck PASS; browser đo Danh sách và Thêm bạn: mọi hàng có cùng độ lệch tên13,26px/trạng thái40,46px sau scale, sai số<0,001px. Ảnh friends-fixed-row-offsets.png.
2026-10-04: Triển khai rankProgression dùng chung theo Elo (bậc 1–4: 3 sao; 5–6: 4; 7: 5), các ngưỡng lên bậc 1300/1600/1900/2200/2600/3000 và giới hạn 3200. Bậc 7 tăng 1–5 sao tại 3000/3050/3100/3150/3200. Mọi hàng Bạn bè tính ảnh/tên/sao từ Elo thay sao cố định, giữ hình học hàng. Lưu docs/RANK-SYSTEM.md và cập nhật FRIENDS-UI-RULES.md. Build/typecheck PASS, xác nhận logic trong dist; chưa browser QA. Chưa triển khai cộng/trừ Elo sau trận hoặc persistence.
2026-10-04: Thêm hàng sao ảnh ab9a1b7f dưới danh hiệu Home; trim alpha ảnh thành player/rank-star.png, dùng RankStars chia đều/căn giữa theo tâm và chiều rộng khung danh hiệu, sao chưa đạt grayscale/opacity. Giữ bản xem trước Tân Binh 1/3 sao. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Browser QA Home: 3 ô sao tải thành công, cùng chiều cao 20.8px sau scale, khoảng cách đều; tâm hàng sao lệch 0px so với tâm danh hiệu, cách đáy 2.84px sau scale. Ảnh kiểm chứng lưu ở outputs/home-rank-stars.png của chat.
2026-10-04: Chuẩn hóa mốc bắt đầu 7 bậc thành 1000/1300/1600/1900/2300/2700/3200; mọi bậc mỗi 100 Elo thêm 1 sao. Số ô sao theo độ dài bậc là 3/3/3/4/4/5/5. Cập nhật tài liệu rank và Bạn bè; build/typecheck PASS, xác nhận mốc mới trong dist. Đang chờ người dùng chốt giới hạn 3600 để bậc 7 tăng tới 5 sao hoặc ngoại lệ đủ 5 sao tại 3200; hiện giữ giới hạn cũ 3200.
2026-10-04: Theo phản hồi, tăng ô sao Home từ 22px lên 28px và nâng hàng sao để chồng lên đáy khung danh hiệu 2px; vẫn chia đều/căn tâm. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Tăng tiếp kích thước mỗi ô sao Home từ 28px lên 36px; giữ vị trí, chia đều và căn giữa. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Nâng hàng sao Home thêm 6px so với vị trí trước, chồng lên đáy danh hiệu 8px; giữ size 36px và căn giữa. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Thu khoảng cách sao Home: justify-evenly thành căn giữa với gap 4px; nâng hàng lên thêm 6px (chồng vào khung 14px), giữ size 36px. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Nâng cụm danh hiệu Home và hàng sao cùng 4px, giữ nguyên khoảng cách tương đối; không đổi vị trí danh hiệu trong các màn hồ sơ khác. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Hạ cụm danh hiệu Home và hàng sao xuống 3px so với lần trước; giữ nguyên khoảng cách tương đối. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Trên Home thay khung bậc Tân Binh bằng khung Danh Hiệu Phong Tặng cấp 1 màu tím-vàng, thêm nhãn Huyền Thoại ở giữa; giữ cụm sao phía dưới. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Dịch riêng chữ Á Quân của Vinh Quang Kỳ Đài cấp 1 và 3 xuống 1px; các chữ/cấp khác giữ vị trí. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Căn riêng Hạng Ba Vinh Quang Kỳ Đài: cấp 2 lên 1px, cấp 3 xuống 1px; giữ các chỉnh lệch Á Quân trước đó. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Hạ thêm chữ Quán Quân của Vinh Quang Kỳ Đài cấp 3 xuống 1px; giữ các căn chỉnh Á Quân và Hạng Ba đã có. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Thay khung Huyền Thoại dưới avatar Home bằng danh hiệu thứ 7 Kỳ Thánh (asset 0473928b), bỏ chữ Huyền Thoại; bản xem trước bậc 7 dùng Elo 3200 và sao từ getRankProgress. Giữ kích thước/vị trí khung đã chốt. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Giới hạn vùng sao Home theo chiều rộng danh hiệu, cao 36px; tự tính size min(36px, (width - gaps)/số ô sao) để 4/5 sao thu nhỏ, không tràn. Giữ căn giữa/gap 4px, cập nhật quy tắc. Build/typecheck PASS, dist cập nhật.
2026-10-04: Đổi danh hiệu Home từ Kỳ Thánh về danh hiệu đầu tiên Tân Binh theo ảnh; cập nhật xem trước Elo1000 và 1/3 sao, giữ vị trí/vùng sao đã chốt. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Cập nhật hệ sao theo chốt mới: bảy bậc đều 3 sao; mỗi 100 Elo tăng sao; ngưỡng bậc 1000/1300/1600/1900/2200/2500/2800; sao khóa mức tại 2800 nhưng Elo vẫn giữ/tăng không giới hạn. Đồng bộ Friends và docs/RANK-SYSTEM.md. Build/typecheck PASS, dist cập nhật.
2026-10-04: Đổi danh hiệu Home về bậc cuối Kỳ Thánh, xem trước Elo2800 theo hệ sao mới; build/typecheck PASS, dist cập nhật.
2026-10-04: Đổi danh hiệu Home từ Kỳ Thánh về bậc đầu Tân Binh (Elo1000), giữ hệ sao chung; build/typecheck PASS, dist cập nhật.
2026-10-04: Chuẩn hóa sao dưới avatar theo danh hiệu 1 Tân Binh: dùng rankArtwork cho đủ 7 asset, bù mép alpha dưới mỗi ảnh để khoảng cách tới sao đồng nhất; giữ sao36px/gap4px/vùng khung. Đổi Home xem trước danh hiệu 6 Đại Kỳ Sư Elo2500. Build/typecheck PASS, dist cập nhật; chưa browser QA.
2026-10-04: Hạ hàng sao dưới avatar thêm 3px, áp dụng chung cả 7 danh hiệu qua công thức bù alpha; giữ kích thước sao. Build/typecheck PASS, dist cập nhật.
2026-10-04: Bật xem thử UI danh hiệu Home theo yêu cầu: bắt đầu bậc1, cứ2000ms chuyển bậc kế tiếp, sau7 quay lại1. State xem trước cục bộ, timer hủy khi rời Home; dùng catalog ảnh và quy tắc sao chung. Build/typecheck PASS, dist cập nhật.
2026-10-04: Khóa vị trí danh hiệu/sao Home theo bậc1: khung ảnh có chiều cao/rộng cố định, sao dùng vị trí cố định; gỡ bottomInsetRatio gây dịch hàng sao theo asset. Giữ vòng xem thử2s. Build/typecheck PASS, dist cập nhật.
2026-10-04: Tắt luân phiên danh hiệu2s, xem trước bậc4 Kỳ Tướng Elo1900. Thêm AvatarRankBadge chung cho Home, ProfileDialog, AvatarCustomization, PlayerCard để đồng bộ danh hiệu và sao dưới avatar; kích thước sao theo tỷ lệ avatar. Chỉ render sao đạt tại cả AvatarRankBadge và FriendsDialog. Tăng khu vực tùy chỉnh avatar20px để đủ chỗ hàng sao. Build/typecheck PASS, dist cập nhật.
2026-10-04: Browser QA Home, Hồ sơ, Tùy chỉnh avatar: cùng hiện Kỳ Tướng1 sao, chỉ1 ảnh sao trong DOM và tâm sao lệch dưới0.001px; tùy chỉnh không đè hàng nút. PlayerCard đã tích hợp/build, chưa kiểm tra trong bàn chơi.
2026-10-04: Đổi hàng sao AvatarRankBadge từ căn giữa sang căn trái, sao đạt xếp từ trái qua phải ở tất cả các cụm avatar/danh hiệu. Build/typecheck PASS, dist cập nhật.
2026-10-04: Nâng Elo xem trước dùng chung AvatarRankBadge từ1900 lên2100 để Kỳ Tướng hiển thị3 sao tại Home, Hồ sơ, tùy chỉnh và bàn chơi. Build/typecheck PASS, dist cập nhật.
2026-10-04: Bỏ hẳn họa tiết cuộn nâu bên trái avatar FriendRow; chỉnh lề container từ trái16/phải16 sang trái0/phải38, identity lề16, làm avatar/tên/danh hiệu/nút đều dịch trái22px và lấp chỗ trống. Build/typecheck PASS, dist cập nhật.
2026-10-04: Thay đủ bảy danh hiệu bằng bộ ảnh mới người dùng cung cấp, trim đúng bounding box alpha và lưu tại src/assets/ranks/rank-01..07-*-v2.png. Bạn bè và AvatarRankBadge dùng chung rankArtwork; giữ ô ảnh/vùng sao hiện có. Gỡ đúng bảy ảnh cũ khỏi project, chuyển bản khôi phục vào work/removed-old-rank-assets của chat. Nguồn/crop ghi tại rank-artwork-v2.md. Build/typecheck PASS; xác nhận đủ bảy ảnh mới trong dist. Chưa browser QA.
2026-10-04: Tăng nhẹ kích thước bảy danh hiệu mới: khung dưới avatar tăng 8% qua AVATA_RATIO dùng chung; hàng Bạn bè từ180×72 thành194×78px. Cập nhật quy tắc kích thước; build/typecheck PASS và dist có kích thước mới. Chưa browser QA.
2026-10-04: Căn giữa cụm sao đã đạt dưới danh hiệu trong AvatarRankBadge dùng chung; giảm kích thước sao từ29.289cqw xuống25cqw, gap từ3.254cqw xuống1.5cqw và nâng vùng sao3px theo anchor106px. Áp dụng Home/Hồ sơ/Tùy chỉnh/PlayerCard; cập nhật RANK-SYSTEM.md. Build/typecheck PASS; xác nhận thông số mới trong dist. Chưa browser QA.
2026-10-04: Dịch tâm vùng sao AvatarRankBadge sang phải3px theo anchor106px; áp dụng chung các cụm avatar/danh hiệu và ghi vào RANK-SYSTEM.md. Build/typecheck PASS; xác nhận offset trong dist. Chưa browser QA.
2026-10-04: Bật cycleRanks cho danh hiệu Home: lần lượt bậc1→7 mỗi2000ms rồi lặp; preload bảy ảnh, timer cleanup khi unmount. Giữ geometry danh hiệu/sao và dùng getRankProgress cho sao, các nơi khác giữ preview Kỳ Tướng. Build/typecheck PASS; xác nhận cycle trong dist. Chưa browser QA.
2026-10-04: Gỡ timer/cycleRanks; AvatarRankBadge mặc định Tân Binh1 sao với DEFAULT_PLAYER_ELO=1000. Session khởi tạo Elo1000; Home đọc cùng Elo cho điểm Cờ Tướng và danh hiệu, thay điểm mẫu2066. Ghi quy tắc khởi tạo người chơi mới vào RANK-SYSTEM.md (chưa có backend tài khoản). Build/typecheck PASS; xác nhận dist bỏ cycleRanks/2066. Chưa browser QA.
2026-10-04: Đổi thứ tự bậc5 thành Đại Sư (2200–2499 Elo), bậc6 thành Kỳ Vương (2500–2799 Elo); đồng bộ catalog ảnh/tên và tài liệu Bạn bè/hệ bậc. Build/typecheck PASS; xác nhận hai bậc trong dist. Chưa browser QA.
2026-10-04: Khôi phục quy tắc sao luôn xếp trái→phải bằng justify-start trong RankStars, kể cả1 sao. Giữ kích thước/gap/vùng và offset hiện có; ghi rõ sao đầu cố định và không căn giữa theo số sao trong RANK-SYSTEM.md. Build/typecheck PASS; xác nhận trong dist. Chưa browser QA.
2026-10-04: Home bật previewStars=3 trên AvatarRankBadge để xem thử Tân Binh đủ3 sao, giữ xếp trái→phải. Không đổi Elo khởi tạo1000 hoặc quy tắc sao thật; ghi rõ preview trong RANK-SYSTEM.md. Build/typecheck PASS; xác nhận previewStars:3 trong dist. Chưa browser QA.
2026-10-04: Tạo docs/PROJECT-MEMORY.md làm ghi nhớ quy tắc người dùng và lỗi cần tránh; ghi các chốt hiện tại về bậc/Elo/sao/Bạn bè, tách preview3 sao khỏi mặc định, ghi nguyên nhân lỗi chỉ khi có bằng chứng và mẫu cập nhật. AGENTS.md bắt buộc đọc ghi nhớ trước khi sửa và đối chiếu trước bàn giao. Build/typecheck PASS; dist đã cập nhật. Task chỉ đổi tài liệu.
2026-10-05: Căn giữa vùng đủ3 ô sao (78% bề rộng khung) dưới danh hiệu, wrapper cùng tâm ngang danh hiệu và bỏ offset phải3px. Sao đạt điền từ ô trái sang phải, không dịch khi số sao thay đổi; giữ kích thước/gap/vị trí dọc. Cập nhật RANK-SYSTEM và PROJECT-MEMORY, ghi lỗi STAR-02 do vùng78% nằm lệch trái trong wrapper100%. Build/typecheck PASS; xác nhận grid ô sao cố định trong dist. Chưa browser QA.
2026-10-05: Dịch vùng sao AvatarRankBadge sang phải3px theo anchor106px và khóa tọa độ theo yêu cầu. Gom offset/tỷ lệ vào RANK_STAR_LAYOUT, AVATA_RANK_STARS_STYLE; mọi consumer dùng chung. Thay sao ký tự trong FriendRank bằng RankStars ảnh trong vùng103px; không còn sao ký tự trong src. Ghi khóa tại PROGRESS gốc và PROJECT-MEMORY, cập nhật RANK-SYSTEM/FRIENDS-UI-RULES. Build/typecheck PASS; xác nhận token và vùng Bạn bè trong dist. Chưa browser QA.

2026-10-05: Thêm AvatarRankBadge dưới avatar84px trong mọi hàng Xếp hạng, cả tab Cờ Tướng/Cờ Úp; danh hiệu và sao lấy từ Elo của hàng, giữ tọa độ chung đã khóa. Tăng hàng lên156px và gap8px, vùng avatar132px để đủ cụm, danh sách cuộn dọc thay chia cứng5 hàng. Cập nhật PROJECT-MEMORY. Build/typecheck PASS; xác nhận kích thước và binding Elo trong dist. Chưa browser QA.

2026-10-05: Giảm padding dọc hàng Xếp hạng từ12 xuống6px, chiều cao156 xuống148px; giữ vùng avatar/danh hiệu/sao132px và tọa độ đã khóa. Huy hiệu thứ hạng dùng ô90×90 căn giữa cột/hàng, số hạng4+ neo tâm50%/50%. Cập nhật PROJECT-MEMORY. Build/typecheck PASS; xác nhận kích thước và căn giữa trong dist. Chưa browser QA.

2026-10-05: Thu hàng Xếp hạng148→138px, bỏ padding dọc6px→0. Đặt toàn cụm avatar xuống5px trong khối132px để vương miện không chạm viền và cân khoảng trống trên/dưới; tọa độ sao/danh hiệu tương đối avatar đã khóa giữ nguyên. Cập nhật PROJECT-MEMORY. Build/typecheck PASS; xác nhận thông số trong dist. Chưa browser QA.

2026-10-05: Xếp hạng tăng kích thước danh hiệu/sao thật20% (AvatarRankBadge sizeScale1.2) cho cả tab Cờ Tướng/Cờ Úp theo phản hồi chữ quá nhỏ/mờ. Danh hiệu khoảng126.24px theo avatar84px; hàng138→144px, khối132→138px/lề trái18px để tránh tràn và chạm huy hiệu hạng. Giữ chuẩn tương đối của RankTitleBadge; không bộ lọc động. Build/typecheck PASS; browser QA đo danh hiệu107.29px ở viewport hiện tại (trước89.41px), sao nằm trong hàng, filter none. PROJECT-MEMORY/RANK-SYSTEM cập nhật ngữ cảnh Xếp hạng.

2026-10-05: Sửa báo cáo nhấp nháy còn ở Home khi hover nhóm5 nút bên phải: homeUtilityButton bỏ brightness125/transition rộng, giữ sáng bằng gradient/viền/chữ và transition border-color,color,box-shadow; dùng chung cho Home/ComputerSetup/RoomSelection. RankTitleBadge isolate+translateZ(0)+backface hidden để lớp ảnh ổn định khi sibling hover, sao vẫn tràn đúng vùng đã chốt. Build/typecheck PASS. Browser QA hover lần lượt Thành tích/Lịch sử/Bạn bè/Bật nhạc/Toàn màn hình bằng chuột phải+Escape: filter nút none, vị trí danh hiệu x138.8086/y102.7877 và kích thước125.4973×50.18 không đổi ở cả5 lượt, opacity1/ảnh tải đủ; screenshot danh hiệu hiển thị. Ghi RANK-02, chưa xác nhận nguyên nhân compositor trên trình duyệt riêng của người dùng.

2026-10-05: Làm rõ Thắng/Thua trong Lịch sử theo yêu cầu không đổi kích thước: thay ảnh screenshot crop104×49 phóng4× bằng MatchResultBadge (nền cọ SVG vàng/xanh, text thật Alegreya italic800). Giữ ô82.77551×39px và offset Thua-2/-2, không thay hàng/cột/avatar. Component dùng chung cho hai người và cả tab Đã chơi/Đã lưu. Build/typecheck PASS; browser QA hai tab, chữ vừa ô; DOM14 nhãn có khung70.36×33.15px theo scale0.85, không tràn. Cập nhật PROJECT-MEMORY/history-crops; giữ ảnh cũ làm đối chiếu.

2026-10-05: Sửa theo chốt giữ kích thước cũ, chỉ làm rõ: bỏ sizeScale1.2 khỏi AvatarRankBadge/Xếp hạng; khôi phục hàng138px, khối132px/lề trái8px, danh hiệu khoảng105.2px theo avatar84px. RankTitleBadge dùng contrast cố định1.12/transition-none trong lớp vẽ ổn định, áp dụng chung7 danh hiệu, không thay sao hoặc ảnh nguồn. Cập nhật PROJECT-MEMORY/RANK-SYSTEM. Build/typecheck PASS; browser QA cả2 tab danh hiệu89.409px ở viewport hiện tại (đúng trước lần phóng20%), contrast1.12/transition none; Home hover Thành tích vẫn dùng lớp vẽ ổn định. Lưu quy tắc không đổi kích thước/vị trí để chữa mờ.

## Lịch sử điều chỉnh tọa độ sao Home (chuẩn hiện hành ở PROJECT-MEMORY.md)

- 2026-10-05: Người dùng cho phép mở khóa, nâng riêng sao Home thêm3px (starsYPx=-6 tổng), rồi khóa lại HOME_RANK_BADGE_OFFSETS/HOME_AVATA_RANK_STARS_STYLE. Danh hiệu Home titleYPx=-2; phần khác giữ nguyên. Cập nhật docs/project memory và RANK-SYSTEM. Build/typecheck PASS; xác nhận starsYPx:-6 trong dist. Chưa browser QA.
 

- 2026-10-05: Người dùng đồng ý mở khóa để nâng riêng danh hiệu Home2px, sao tổng6px theo anchor106px (bản đầu nâng3px, lượt sau nâng thêm3px), rồi khóa lại HOME_RANK_BADGE_OFFSETS/HOME_AVATA_RANK_STARS_STYLE. Home dùng placement=home; các nơi khác giữ tọa độ chung. Cập nhật PROJECT-MEMORY/RANK-SYSTEM. Build/typecheck PASS; xác nhận starsYPx:-6 trong dist. Chưa browser QA.


- 2026-10-05: Vị trí vùng sao dưới danh hiệu theo RANK_STAR_LAYOUT/AVATA_RANK_STARS_STYLE trong playerIdentityLayout.ts: anchor106px, offsetX3px, bottomInset14px, clusterOffsetY-1px, starWidth25cqw, gap1.5cqw. Riêng Home khóa HOME_RANK_BADGE_OFFSETS (titleY-2px, starsY-6px) và HOME_AVATA_RANK_STARS_STYLE. Không tự dịch/ghi đè tọa độ hoặc tỷ lệ; chỉ sửa sau khi người dùng đồng ý mở khóa theo AGENTS.md.

- 2026-10-05 (cập nhật): Người dùng cho phép nâng sao Home thêm5px sau khi phản hồi lần dịch3px khó thấy. Tọa độ khóa mới: HOME_RANK_BADGE_OFFSETS starsYPx=-11 (tổng nâng11px); titleYPx=-2. Build/typecheck PASS và screenshot Home từ bản build mới đã xác nhận.

- 2026-10-05: Theo đồng ý mở khóa, hạ riêng sao Home2px (`starsYPx=-9`), giữ danh hiệu `titleYPx=-2` và mọi vị trí chung khác. Khóa lại tọa độ Home sau chỉnh. Build/typecheck PASS; xác nhận asset dist có `starsYPx:-9` và không còn `starsYPx:-11`. Browser QA tại localhost:5173/?rankPreview=20261005d hiển thị cụm sao dưới danh hiệu Home.

- 2026-10-05: Người dùng cho phép thay đổi vị trí sao Home và yêu cầu hạ thêm2px: `starsYPx=-9→-7`, giữ `titleYPx=-2` và mọi tọa độ chung khác. Phạm vi offset sao Home vẫn mở để tiếp tục thay đổi theo yêu cầu. Build/typecheck PASS, asset dist xác nhận `starsYPx:-7`; browser QA tại localhost:5173/?rankPreview=20261005e hiển thị sao dưới danh hiệu Home.

- 2026-10-05: Lấy Home hiện tại làm chuẩn toàn project: thêm RankTitleBadge với RANK_TITLE_STARS_STYLE, bỏ placement/offset riêng Home. AvatarRankBadge dùng chung cho Home/Hồ sơ/Tùy chỉnh/PlayerCard/Xếp hạng; FriendRank dùng cùng component, sao dưới ảnh, cụm166×84px vừa hàng85px. Lưu quy tắc sửa mọi consumer tương ứng trong AGENTS/PROJECT-MEMORY/RANK-SYSTEM/FRIENDS-UI-RULES; ghi lỗi STAR-03. Build/typecheck PASS, dist index-G28z8FUv.js xác nhận clusterOffsetYPx:-8 và không còn starsYPx riêng Home. Browser QA Home, Hồ sơ, Tùy chỉnh, Danh sách/Thêm bạn/Lời mời và hai tab Xếp hạng; tỷ lệ vị trí sao/chiều cao khung khoảng0.642 ở mọi vùng đã đo. PlayerCard được kiểm tra qua consumer dùng chung, chưa mở ván để QA.

- 2026-10-05: Tăng độ rõ cả7 danh hiệu tại RankTitleBadge dùng chung: SVG convolution nhẹ (tổng kernel1, preserveAlpha) và giảm bóng đổ từ0/2/2 xuống0/1/0.4px. Giữ kích thước, tỷ lệ và tọa độ sao. Thử optimize-contrast gây răng cưa khi thu ảnh lớn nên đã bỏ; ghi bài học trong PROJECT-MEMORY. Browser QA Xếp hạng: ảnh tải đủ, filter áp dụng, imageRendering=auto; các danh hiệu nhỏ khoảng89px ở viewport hiện tại vẫn giới hạn chi tiết chữ. Build/typecheck PASS; kiểm tra bundle cập nhật trước bàn giao.

- 2026-10-05: Sửa báo cáo danh hiệu nhấp nháy khi rê vùng khác: gỡ useId/SVG convolution/filter URL và drop-shadow động khỏi RankTitleBadge, ảnh render trực tiếp cho mọi consumer. Giữ tọa độ danh hiệu/sao và các hiệu ứng hover của nút. Lưu lỗi RANK-01; bộ lọc là thay đổi nghi gây lỗi, chưa xác nhận compositor. Build/typecheck PASS; dist index-DM45AVNw.js không còn feConvolveMatrix/rank-artwork-. Browser QA Home: đưa con trỏ tới Thành tích và Chơi Nhanh bằng click chuột phải rồi Escape (không kích hoạt chức năng); DOM xác nhận nút đang :hover, ảnh tải đủ, opacity1/filter none, screenshot danh hiệu hiển thị ở cả hai trạng thái.

- 2026-10-05: Sửa sao bị dồn vào danh hiệu: neo từ đáy khung thêm2px theo anchor106px (top139.961945px), giữ sao25cqw/gap1.5cqw/offsetX3px và kích thước artwork. Xếp hạng nới hàng156px/khối150px; Bạn bè116px/cụm114px; Hồ sơ220px; Tùy chỉnh230px; PlayerCard tăng khoảng dành cho cụm ở desktop/short/compact. Đồng bộ token và docs, ghi STAR-04. Làm nét cả7 danh hiệu bằng SharpRankArtwork Canvas: thu nhiều bước theo độ phân giải hiển thị/DPR, contrast1.12 và unsharp mask0.65 tĩnh, giữ alpha, không CSS/SVG filter động. Không tăng kích thước danh hiệu. Chữ Thắng26→24px/tracking-0.4px, giữ ô82.77551×39 và Thua26px. Build/typecheck PASS, dist cập nhật. Browser QA hai tab Xếp hạng, hai tab Lịch sử (Thắng gọn trong nền), Bạn bè Tất cả, Hồ sơ, Tùy chỉnh, Home hover Thành tích. Đo title89.409px ở Xếp hạng, sao22.344px (25%), gap dưới khung1.339px theo scale; Bạn bè sao25%, còn4.27px trước viền dưới hàng. Canvas CSS filter none, ảnh hiển thị ở hover; chưa kiểm chứng nhấp nháy từng frame hoặc mở ván QA PlayerCard. Chi tiết chữ vẫn phụ thuộc diện tích hiển thị nhỏ; không tuyên bố khôi phục toàn bộ chi tiết gốc.
- 2026-10-05: Theo yêu cầu hoàn tác, phục hồi sao top118.961945px theo avatar106px (bottomInset14/clusterOffsetY-8), giữ tỷ lệ25%/gap1.5%/offsetX3. Khôi phục vùng chứa trước lần neo sao xuống đáy: Ranking138/132px, Friends85/84px, Profile190px, AvatarCustomization190/188/183px, PlayerCard margins78/54px và bỏ compact mb28. Giữ thay đổi làm nét Canvas và chữ Thắng vì người dùng chỉ yêu cầu hoàn tác vị trí sao. Cập nhật quy tắc hiện hành và STAR-04: không tự đổi chuẩn vị trí từ yêu cầu giữ tỷ lệ. Build/typecheck PASS; dist index-tWx-SYxJ.js xác nhận clusterOffsetYPx:-8, không còn titleGapPx:2. Chưa browser QA lượt hoàn tác.

- 2026-10-05: Cải thiện nét danh hiệu nhỏ theo yêu cầu giữ nguyên kích thước: SharpRankArtwork bỏ chuỗi giảm đôi nhiều lần làm mềm chữ, dùng lấy mẫu2x rồi thu một lần về độ phân giải hiển thị; unsharp mask1.1 cho khung≤140px/0.65 cho khung lớn, threshold1.5 và bù nét giới hạn±28 để hạn chế viền sáng. Component chung áp dụng cả7 bậc và mọi consumer. Không sửa kích thước/khung/vị trí danh hiệu hoặc sao; giữ clusterOffsetY-8. Cập nhật PROJECT-MEMORY/RANK-SYSTEM. Build/typecheck PASS, dist index-CxeKkb9u.js cập nhật. Chưa browser QA trực quan lượt này; mức rõ tối đa vẫn phụ thuộc số pixel của chữ nhỏ.

- 2026-10-05: Kiểm tra nguyên nhân mờ Xếp hạng trước sửa: parent transform matrix0.85 ở1280×720/matrix0.728205 ở960×600, không CSS zoom; danh hiệu105.188×42.063px và sao26.287/26.3px trước parent scale. Danh hiệu Canvas lại nằm trong parent scale. Nguồn rank2144×724/star1199×1219 đủ2×, avatarSVG; icon red-general60×62 thiếu2× ở43px. Đã báo nguyên nhân trước sửa. RankingDialog chuyển toàn bảng sang kích thước CSS cuối cùng/token pixel nguyên, bỏ parent scale và medal scale110; RankingRankBadge render ảnh gốc/img trực tiếp, object-contain, đọc cùng token tọa độ cũ. Không đổi asset hay các màn khác. Browser QA trước/sau1280×720 và960×600, cả2 tab; sau sửa root/ancestor ảnh transform none/scale none/zoom1, Canvas0. Ở1280: medal84×84, avatar65×65, title89×36, sao22×22; ở960: title77×31, sao19×19. Hàng117px so với117.3px trước ở1280,100px so với100.492px ở960; bề rộng hàng chênh vài pixel do làm tròn/viền, không đổi cấu trúc/cột. Ảnh trực tiếp tránh nội suy parent, chữ nhỏ vẫn giới hạn chi tiết theo số pixel. Đã reset viewport. Build/typecheck PASS; dist index-eS4U3gEw.js có token mới. Chưa đạt nguồn2× cho icon Điểm vì không được thay asset; đã báo giới hạn. Quy tắc cập nhật PROJECT-MEMORY/RANK-SYSTEM.

- 2026-10-05: Theo yêu cầu lấy khoảng cách/kích thước sao Home áp dụng toàn project, tìm mọi consumer. Home/Hồ sơ/Tùy chỉnh/PlayerCard/Bạn bè đã dùng RankStars/RANK_TITLE_STARS_STYLE chung; RankingRankBadge còn tự làm tròn sao/gap/top nên lệch nhẹ. Bỏ phần tính/render sao riêng của Ranking, dùng cùng component/style Home. Giữ tọa độ chuẩn và khung/layout hiện hành; ảnh danh hiệu Ranking vẫn render trực tiếp, parent không scale. Ưu tiên tỷ lệ25%/gap1.5% của Home hơn làm tròn từng sao. Cập nhật PROJECT-MEMORY/RANK-SYSTEM. Build/typecheck PASS, dist index-CS5d2E5R.js cập nhật. Chưa browser QA lượt này.

- 2026-10-05: Sửa rendering ảnh nhỏ toàn project theo nguyên nhân đã báo trước sửa: Home/Profile/Tùy chỉnh/Bạn bè/Lịch sử/ComputerSetup có parent transform scale; rank Canvas trung gian còn bị lấy mẫu lại; crop huy hiệu và marker layer có scale riêng. Không CSS zoom; nguồn rank/sao đủ2x, một số icon/frame Lịch sử không đủ. Thêm CrispUiImage/crispUiRendering để img native và CSS cuối cùng, pixel token nguyên; bỏ parent scale, SharpRankArtwork Canvas và GPU translateZ/backface ép buộc. Giữ contrast1.12 tĩnh, asset gốc, cấu trúc và tọa độ/tỷ lệ sao Home. FittedUiArtwork chuyển stretch huy hiệu đã duyệt sang kích thước ảnh thật, giữ crop/style; nền Game scale1.16 thành box116% tương đương. Board marker/hit layer dùng tọa độ/kích thước cuối cùng, không đổi luật/animation/quân. Đồng bộ SocialUi/RankStars/AvatarFrameOverlay/RankingRankBadge; History frame object-contain. Ghi docs/UI-IMAGE-RENDERING.md, cập nhật PROJECT-MEMORY/RANK-SYSTEM/FRIENDS-UI-RULES/HONOR-SYSTEM. Browser QA Home/Profile/Tùy chỉnh/Huy hiệu/Bạn bè/Lịch sử/ComputerSetup/Board tại1280x720 và/hoặc960x600; Xếp hạng cả2 tab ở960 và1280, title89x36 ở1280 với ancestors không scale, Canvas0. Huy hiệu arena213x82px, img chỉ translate tâm, giữ hình dáng; console error0 trong lượt đọc cuối. Đã reset viewport. Build/typecheck PASS; dist index-ZKCooTym.js. Làm tròn có sai khác dưới1px; sao/crop giữ tỷ lệ nên vẫn có kích thước phân số. Không thay ảnh nguồn nhỏ/không tuyên bố khôi phục chi tiết chữ dưới giới hạn pixel; chưa kiểm chứng nhấp nháy từng frame hoặc mọi thao tác chơi cờ.

- 2026-10-05: Theo yêu cầu dịch sao xuống2px và đồng bộ mọi nơi, đổi RANK_STAR_LAYOUT.clusterOffsetYPx từ-8 thành-6; chuẩn sao top120.961945px theo avatar106px (tự co theo tỷ lệ). RankTitleBadge/RankingRankBadge đọc RANK_TITLE_STARS_STYLE chung, áp dụng Home/Hồ sơ/Tùy chỉnh/PlayerCard/Bạn bè/Xếp hạng. Giữ danh hiệu, size/gap/offsetX và rendering. Cập nhật PROJECT-MEMORY/RANK-SYSTEM/UI-IMAGE-RENDERING. Build/typecheck PASS; dist index-DtrYrnFo.js xác nhận clusterOffsetYPx:-6. Chưa browser QA lượt này.

- 2026-10-05: Theo yêu cầu giữ Tân Binh và hạ sao ở6 danh hiệu còn lại1px, thêm getRankTitleStarsStyle(rankLevel) trong playerIdentityLayout; bậc1 trả style cũ, bậc2–7 chỉ top calc(+1px CSS). RankTitleBadge và RankingRankBadge dùng chung helper, đồng bộ mọi consumer. Không sửa vị trí/kích thước avatar, danh hiệu, thẻ hoặc UI khác; size/gap sao giữ nguyên. Cập nhật3 tài liệu quy tắc. Build/typecheck PASS; dist index-D0nu3fLi.js xác nhận +1px. Chưa browser QA lượt này.

- 2026-10-05: Thu khung đỏ Gợi ý cho bạn trong tab Thêm bạn bằng khung Lời mời: bỏ inline height54 cố định, dùng friendSectionTitle cao50px thiết kế/token responsive. Hàng chứa54px giữ mốc điều khiển cùng Danh sách. Giữ asset/chiều rộng và các hàng bạn. Cập nhật FRIENDS-UI-RULES/PROJECT-MEMORY. Build/typecheck PASS; dist index-Dpi2lHR7.js cập nhật. Chưa browser QA lượt này.

## Phạm vi khóa đang có hiệu lực

- Mốc Bạn bè hiện hành2026-10-05: nền nâu dài thêm50px responsive về bên trái, mép phải giữ mốc cũ; danh hiệu/sao/tên bậc dịch trái50px là tọa độ tham chiếu cũ, riêng khung/ảnh danh hiệu và cụm sao hiện mở khóa để thử nghiệm. Avatar, nền, cột và nhóm nút vẫn khóa; giữ nguyên bố cục hàng.

- Mở khóa đang có hiệu lực theo yêu cầu2026-10-06: toàn bộ UI Danh hiệu (catalog, popup Thông tin danh hiệu, hiển thị trong/ngoài thông tin user) và hình học ảnh/khung danh hiệu cùng cụm sao đi kèm trên mọi consumer để thử nghiệm; giữ mở đến khi người dùng yêu cầu khóa lại.

- Kích thước/vị trí avatar người chơi và khung avatar trên toàn project. Mốc responsive tại docs/PROJECT-MEMORY.md và docs/RANK-SYSTEM.md; Bạn bè tại docs/FRIENDS-UI-RULES.md. Phải hỏi mở khóa trước khi thay đổi.

- Khóa UI hiện hành của Lịch sử, Xếp hạng và toàn bộ khu vực Bạn bè, ngoại trừ hình học ảnh/khung danh hiệu và cụm sao đã được mở khóa riêng: giữ nguyên bố cục/hình học phần còn lại, kiểu chữ, màu và asset như trạng thái UI đã chốt.
- 2026-10-05: Đối chiếu Bạn bè ở viewport1280×720: khung Gợi ý cho bạn sau khi thu cao50px responsive và khung Lời mời đã nhận/đã gửi cùng43px CSS; cùng width843.2px và ảnh nền. Bọc Gợi ý nằm trong hàng54px để giữ mốc Danh sách/Thêm bạn. Screenshot hai tab xác nhận trực quan. Không cần sửa code thêm lượt này; dist đã build sau khi dùng friendSectionTitle chung.

- 2026-10-05: Icon tìm kiếm ô Danh sách dùng chung SearchIcon với ô tìm kiếm Thêm bạn: cùng hình học SVG,31px responsive và stroke3.5. Giữ màu vàng/bóng cho nền tối. Cập nhật FRIENDS-UI-RULES. Build/typecheck PASS; dist index-Bhk2LSwb.js được tạo mới. Browser QA trực quan chưa chạy vì tab localhost trước đó không còn mở sau khi nối lại phiên.

- 2026-10-05: Tăng chữ placeholder và nội dung hai ô nhập người chơi ở Danh sách/Thêm bạn từ21px lên23px qua token responsive; không đổi chiều cao ô, icon hay layout. Build/typecheck PASS; dist index-DzV7MuEB.js cập nhật. Browser QA trực quan chưa chạy vì localhost tab không còn trong phiên.

- 2026-10-05: Nút Tìm ở Thêm bạn từng dùng height56px cố định, còn ô nhập dùng --ui-p-56 responsive; khi root co theo viewport, nút cao hơn ô. Đổi height nút sang cùng var(--ui-p-56,56px), giữ các style còn lại. Cập nhật FRIENDS-UI-RULES. Build/typecheck PASS; dist index-CaRXOdxz.js cập nhật. Chưa browser QA trực quan lượt này.

- 2026-10-05: User explicitly approved one-time unlock for the Friend tabs rank-title x position. Cause was invite rows using a 270px title column vs 240px in List/Add, shifting rank groups by30px. All FriendRow now use the 240px column; action column stays330px. Browser QA at1280x720: rank/title anchor x=516.8px in List and Invites; screenshot verified. Kept avatar/badge/star dimensions unchanged and relocked the aligned position for future changes.

- 2026-10-05: Nới các hàng Danh sách/Thêm bạn/Lời mời từ85px lên90px responsive (+5px). Grid content track neo85px để giữ nguyên vị trí tương đối và kích thước avatar/khung/sao đã khóa; phần thêm chỉ tăng khoảng trống cuối hàng. Browser QA Danh sách 1280x720 xác nhận row77 CSS px theo scale0.85; cụm avatar/rank giữ trong track85. Build/typecheck PASS; dist index-BImLFixZ.js cập nhật.

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
- 2026-10-05: Thu chiều cao nền nâu nhạt quanh điểm Elo trong Xếp hạng; lề trên/dưới đặt bằng lề ngang của pill điểm (17px theo thiết kế, responsive theo layout.scale). Dùng chung cho cả Cờ Tướng/Cờ Úp, không đổi kích thước hàng hay các cột khác. Chưa chạy build hoặc browser QA.

- 2026-10-05: Sửa lỗi danh hiệu sprite méo/cắt dư: metadata có imageHeight theo kích thước nguồn/crop và cả bốn consumer render chiều cao tường minh, giữ hình học ô hiện hành. Áp dụng Chuỗi Chiến Thắng/Tổng Ván Chơi/Online Chuyên Cần và chi tiết danh hiệu. Cập nhật bài học PROJECT-MEMORY và HONOR-SYSTEM. npm run build/typecheck PASS; dist index-CQ-oopQk.js. Browser QA cả ba nhóm và chi tiết Thống Trị: viền đầy đủ, không còn lộ khung khác; ảnh đối chiếu lưu trong outputs/danh-hieu-sau-sua.jpg của phiên.

- 2026-10-05: Đồng bộ khoảng cách dọc các tab catalog Danh hiệu theo Tất cả trong HonorsFrame (ProfileDialog.tsx), chuẩn hóa rowGap theo số hàng thay vì 3% giống nhau ở mọi danh sách. Giữ hình học badge/crop và lưới ba cột. Build tạo dist index-ZtfX4uYY.js; browser QA: Tất cả và năm tab riêng cùng gap13.875px/cardHeight57.8125px tại viewport hiện tại. Lưu quy tắc trong PROJECT-MEMORY/HONOR-SYSTEM và ảnh outputs/danh-hieu-khoang-cach.jpg của phiên.

- 2026-10-05: Căn ba khung tiêu đề Bạn bè theo vị trí Gợi ý cho bạn của Thêm bạn. FriendsDialog dùng friendSectionTitleStyle top=calc((--ui-p-54 - --ui-p-50)/2), Add bỏ căn giữa riêng để giữ tọa độ mẫu; hai khung Lời mời áp dụng cùng inset. Build/typecheck PASS, dist index-DyfCCasH.js. Browser QA: mẫu Add x54.2/y186.4125/w606/h30 giữ nguyên; Lời mời nhận y184.9125→186.4125, gửi y420.2→421.7; tọa độ tất cả hàng Add và Lời mời giữ nguyên. Ảnh đối chiếu khung-ban-be-can-vi-tri.jpg trong outputs của phiên.

- 2026-10-05: Thay Thắng/Thua trong MatchResultBadge bằng hai vùng ảnh từ PNG24f07314-e511-454e-9d58-2a50197a5a34 của người dùng. Đặt nguồn vào src/assets/history, crop bằng viewBox giữ tỉ lệ/alpha/màu, ô và offset cũ. Cập nhật PROJECT-MEMORY/history-crops để thay quy tắc text cũ. Typecheck/build PASS, dist index-BtDRXcty.js. Browser QA Đã chơi14 badge/Đã lưu6 badge đều dùng nguồn mới; ô50×24px tại viewport hiện tại. Ảnh kết quả thang-thua-anh-moi.jpg trong outputs của phiên.


- 2026-10-06: Người dùng khóa phần UI hiện hành của Lịch sử, Xếp hạng, Bạn bè và màn Danh hiệu/catalog. Giữ nguyên bố cục, hình học, kích thước, vị trí, khoảng cách, kiểu chữ, màu và asset; không khóa dữ liệu/chức năng nếu không đổi UI. Ngoại lệ: thông tin chi tiết danh hiệu và danh hiệu hiển thị ngoài avatar không thuộc khóa UI này; quy tắc kích thước/vị trí avatar/khung/sao vẫn khóa riêng. Mọi tác động trực tiếp/gián tiếp cần xin mở khóa đúng phạm vi/task và khóa lại sau khi được duyệt. Ghi chú cũ loại trừ khung Gợi ý/Lời mời đã được thay thế; chúng thuộc UI Bạn bè khóa.

- 2026-10-06: Theo yêu cầu, chỉ dịch chữ bên trong khung Vinh Quang Kỳ Đài: cấp1 Á Quân nâng1px; cấp2 cả Quán Quân/Á Quân/Hạng Ba hạ2px; cấp3 cả ba chữ nâng2px. Áp dụng trong ArenaHonorTitle dùng chung cho catalog, preview và thông tin chi tiết. Giữ nguyên ảnh khung, kích thước badge, sao và bố cục khác; quyền chỉnh này chỉ cho task trên, UI khóa lại sau thay đổi.

- 2026-10-06: Theo yêu cầu, chỉ dịch chữ trong khung Phong Tặng: cấp1 hạ2px; cấp2 nâng1px; cấp4 nâng3px; cấp5 nâng4px; cấp3 không đổi. Cập nhật AwardedHonorTitle dùng chung tại catalog/preview/thông tin danh hiệu; giữ nguyên frame, kích thước, bố cục và asset. Chỉ mở khóa phần chữ cho task này, sau đó khóa UI lại.

- 2026-10-06: Theo yêu cầu, hoàn tác các offset mới khỏi catalog/preview danh hiệu và đưa chữ tại đó về vị trí trước; chỉ giữ mức dịch chữ Vinh Quang Kỳ Đài và Phong Tặng trong popup Thông tin danh hiệu. Thực hiện bằng prop riêng của hai component title, không đổi asset, frame hay kích thước. UI catalog vẫn khóa; chỉ nội dung chữ trong popup thông tin được chỉnh theo yêu cầu.

- 2026-10-06: Điều chỉnh theo yêu cầu mới, chỉ trong popup Thông tin danh hiệu: Phong Tặng cấp1 hạ1px; cấp2 giữ mức nâng1px; cấp3, 4, 5 nâng1px. Catalog/preview và mọi hình học khung giữ nguyên.

- 2026-10-06: Cập nhật mức dịch chữ trong popup Thông tin danh hiệu theo yêu cầu mới: Phong Tặng cấp1 hạ2px; cấp2 giữ nguyên mức nâng1px; cấp3 hạ1px; cấp4 và 5 nâng2px. Catalog/preview, khung và bố cục không đổi.

- 2026-10-06: Chỉ cập nhật chữ Phong Tặng trong popup Thông tin danh hiệu: cấp1 hạ1px; cấp3 nâng1px; cấp4/5 nâng2px; cấp2 giữ mức cũ. Hàm offset chỉ được truyền ở HonorDetailPopover; hai consumer catalog/preview giữ lời gọi cũ. Typecheck/build PASS, dist index-DVrH2PbW.js. Chưa kiểm tra trực quan trình duyệt lượt này.

- 2026-10-06: Sửa nguyên nhân chữ Phong Tặng không dịch: các lượt trước gán lại offset cố định nên cấp4/5 vẫn -2px. Lượt này cộng thêm từ vị trí đang hiển thị: cấp1 xuống1px (+1→+2); cấp3 lên1px (-1→-2); cấp4/5 lên2px (-2→-4). Cấp2 giữ -1px. Đo DOM trước/sau tại localhost: Kỳ Đạo +1px, Kỳ Phùng -1px, Nghĩa Hiệp/Kỳ Hữu -2px; vị trí chữ catalog và kích thước chữ đều delta0. Offset chỉ dùng trong popup Thông tin danh hiệu. Typecheck/build PASS; dist index-ZFWLaZV9.js.

- 2026-10-06: Dịch thêm chữ Phong Tặng trong popup Thông tin danh hiệu: cấp1 +1px (offset+2→+3); cấp3 +1px (-2→-1); cấp4/5 -1px (-4→-5); cấp2 giữ -1px. Đo DOM trước/sau: Kỳ Đạo/Kỳ Phùng deltaY+1px; Nghĩa Hiệp/Kỳ Hữu deltaY-1px. Vị trí catalog và kích thước chữ delta0. Typecheck/build PASS; dist index-CJgHjfOC.js.

- 2026-10-06: Dịch thêm riêng chữ Phong Tặng cấp3 trong popup Thông tin danh hiệu xuống1px (offset-1→0); các cấp khác và catalog/preview không đổi. Đo DOM Kỳ Phùng xác nhận deltaY+1px, chiều rộng/cao delta0. Typecheck/build PASS; dist index-CiIgkke5.js.

- 2026-10-06: Người dùng mở khóa toàn bộ UI Danh hiệu, khung/ảnh danh hiệu và cụm sao đi kèm trên mọi consumer để thử nghiệm; avatar người chơi/khung avatar và bố cục chung của Lịch sử, Xếp hạng, Bạn bè vẫn khóa.

- 2026-10-06: Ẩn thanh cuộn nhìn thấy trong hai danh sách chú thích/cách nhận của popup Danh hiệu bằng scrollbar-width:none và ::-webkit-scrollbar:hidden; giữ overflow-y-auto nên nội dung dài vẫn cuộn dọc. Thanh cuộn catalog vốn đã ẩn. Browser QA: list chú thích overflowY=auto, scrollHeight74>clientHeight71, scrollbarWidth=none và webkit display=none; list cách nhận cũng ẩn scrollbar. npm run build PASS, dist index-C_JCGV44.js.

- 2026-10-06: Nới khoảng cách dọc giữa các hàng danh hiệu trong preview Thông tin user từ10px lên12px thiết kế (gap-y-2.5→gap-y-3); giữ khoảng ngang và hình học/kích thước huy hiệu. Browser QA với6 danh hiệu tạm: rowGap computed8.98px ở viewport co hiện tại; đã bỏ các lựa chọn thử và khôi phục “Chưa có danh hiệu”. npm run build PASS; dist index-vPT-LDZ5.js.

- 2026-10-06: Mở các danh hiệu đang hiện ổ khóa trong Chuỗi Chiến Thắng, Tổng Ván Chơi và Online Chuyên Cần để người dùng thử: gỡ biểu tượng ổ khóa, bỏ trạng thái giảm sáng và cập nhật nhãn truy cập; không đổi điều kiện gameplay hay bố cục. `npm run build` PASS.

- 2026-10-06: Bật nút chọn cho danh hiệu thuộc cả 5 nhóm; lựa chọn được lưu trong `profile-honors:{profileId}` và hiện trong preview hồ sơ như các nhóm đã hỗ trợ trước đó. Giữ giới hạn tối đa3 danh hiệu mỗi nhóm. Mở nạp dữ liệu cũ cho các nhóm này; typecheck/build PASS, chưa xác minh thao tác trên trình duyệt.

- 2026-10-06: Sau khi người dùng báo ba tab cuối chưa có nút chọn, bỏ điều kiện dò ID trong danh sách nhóm khỏi predicate hiển thị/chọn; mọi `HonorDetail` đã thuộc union danh hiệu thì được chọn. Build PASS; chưa xác minh trực quan trên trình duyệt.

- 2026-10-06: Hoàn thiện chuyển trang danh hiệu khi đầy khung hồ sơ: giữ9 ô/trang, trượt2 giây mỗi7 giây và lặp từ trang cuối về đầu; reset trang đầu khi mở lại hoặc sửa lựa chọn. Bộ đếm chỉ chạy khi hồ sơ/preview hiện, tạm dừng trong popup chi tiết và các màn phụ; trang ẩn có aria-hidden/inert. Browser QA với15 danh hiệu xác nhận2 trang9+6, animation computed2s, trang1→2 và target quay về0, mở lại ở trang1. Đã xác nhận chọn/lưu đủ cả5 nhóm và khôi phục15 lựa chọn thử về trạng thái ban đầu “Chưa có danh hiệu”. Build/typecheck PASS; dist index-AAfaI4IC.js. Ảnh thử trong outputs/danh-hieu-chuyen-trang.png.

- 2026-10-06: Theo yêu cầu mới, thay carousel dừng/chuyển từng trang bằng Web Animations chạy liên tục tuyến tính12 giây mỗi bề rộng trang; lặp normal từ0 tới mép cuối rồi reset ngay0, không có đoạn chạy ngược. IntersectionObserver đồng bộ aria-hidden/inert theo phần trang thực sự nằm trong khung. Browser QA với10 danh hiệu9+1:5 mẫu300ms ghi x=-13.69,-25.39,-37.74,-49.43,-61.78px, xác nhận tốc độ khoảng39px/s tại viewport468px và cả hai trang tương tác khi đang hiện một phần. Khôi phục10 lựa chọn thử về trạng thái ban đầu. Build/typecheck PASS; dist index-jvXM8BGV.js. Ảnh thử outputs/danh-hieu-chay-deu.png.

- 2026-10-06: Chỉnh nhịp carousel theo xác nhận mới: giữ khung đầu2 giây, chạy tuyến tính đến mép cuối trong tổng cộng5 giây, nhảy ngay về đầu và lặp chu kỳ7 giây. Keyframe giữ translateX(0) đến mốc2/7; animation normal/infinite không chạy ngược. Chỉ sửa thời gian animation, giữ bố cục và kích thước danh hiệu. Build/typecheck PASS; dist index-DLIob0ds.js. Chưa kiểm tra trực quan nhịp mới trên trình duyệt.

- 2026-10-06: Điều chỉnh carousel hồ sơ theo nhịp mới: nghỉ đầu1,5 giây, chạy đều6 giây, nghỉ cuối0,5 giây rồi nhảy về đầu; chu kỳ8 giây. Thêm keyframe cùng vị trí cuối tại mốc7,5/8 và1 để giữ nguyên khung cuối trong0,5 giây; không đổi bố cục/kích thước. Cập nhật PROJECT-MEMORY và HONOR-SYSTEM. Build/typecheck PASS; dist index-D38HRorR.js. Chưa kiểm tra trực quan nhịp mới trên trình duyệt.

- 2026-10-06: Đổi tên danh hiệu Tổng Ván Chơi “Dày Dạn” thành “Dày Dặn” trong dữ liệu dùng chung của catalog, chi tiết và preview hồ sơ; giữ ID day-dan-2 để không mất lựa chọn đã lưu. Đồng bộ HONOR-SYSTEM. Build/typecheck PASS; dist index-MN_76LRx.js. Chưa kiểm tra trực quan trình duyệt.

- 2026-10-06: Nới ngang cụm Năng lượng và vàng ở Home từ390 lên420px thiết kế, compact300 lên320px theo yêu cầu. Cố định chiều cao theo kích thước nguồn ở bề rộng cũ; bốn lớp ảnh nền cùng h-full/w-full, kích thước icon/chữ/nút cộng giữ nguyên. Cập nhật energy-gold-source.md. Build/typecheck PASS; dist index-CH6Ot5bg.js. Chưa kiểm tra trực quan trình duyệt.

- 2026-10-06: Đổi vàng khởi tạo trong sessionStore từ1.000.000 lên10.000.000 theo yêu cầu thử hiển thị. Chỉ thay giá trị xem thử hiện trong Home. Build/typecheck PASS; dist được cập nhật. Chưa kiểm tra trực quan trình duyệt.

- 2026-10-06: Hồ sơ mở từ avatar người khác thay vùng danh hiệu bằng6 nút3 cột ×2 hàng theo thứ tự Xem thông tin, So tài, Thêm bạn/Xóa bạn; Nhắn tin, Theo dõi, Tặng quà. ProfileDialog dùng chung cho Home và GamePage; phân biệt hồ sơ chính mình và lấy nhãn kết bạn từ danh sách hiện có. Nối onOpenProfile vốn chưa được sử dụng tại avatar mọi tab Bạn bè, giữ nguyên ô76px/hình học avatar và bố cục hàng. Xem thông tin mở preview danh hiệu, Quay lại về nhóm nút; mở lại/reset tên bắt đầu ở nhóm nút. Các hành động xã hội chưa có xử lý nên hiện phản hồi chưa hỗ trợ; overlay chặn focus nền bằng inert. Browser QA: LinhMeo99 hiện Xóa bạn, ThanhVan92 hiện Thêm bạn; đo6 nút thành3 cột/2 hàng cùng cỡ, kiểm tra Xem thông tin/Quay lại, phản hồi So tài và hồ sơ Picolozz vẫn có danh hiệu. Ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build/typecheck PASS; dist index-CZMrBv_T.js. GamePage được cập nhật dùng chung, chưa kiểm tra thao tác trong bàn chơi.

- 2026-10-06: Theo yêu cầu, thu chiều cao từng ô trong lưới6 nút hồ sơ người khác khoảng16px theo thiết kế (đo ở localhost giảm từ104px xuống92px CSS viewport), căn giữa theo chiều dọc trong hàng; giữ nguyên lưới, khoảng cách và khung hồ sơ. Browser QA xác nhận cả6 ô cùng92px,2 hàng vẫn cân. Cập nhật ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build/typecheck PASS; dist index-rE2znWW1.js.

- 2026-10-06: Theo yêu cầu mới, bỏ toàn bộ6 icon trong nút, thu mỗi nút thêm20px ngang/24px dọc theo kích thước thiết kế (browser QA hiện mỗi ô135×86px), đổi chữ sang Arial đậm20px thiết kế (15px CSS viewport), căn giữa. Lưới/khung hồ sơ giữ nguyên. Ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build/typecheck PASS; dist index-7wbjQuxp.js.
- 2026-10-06: Theo yêu cầu, tăng font Arial trên6 nút hồ sơ người khác từ20px lên22px thiết kế; giảm chiều cao từ calc(100%-24px) xuống calc(100%-30px), chiều ngang giữ calc(100%-20px). Browser QA xác nhận mọi ô135×82px viewport, font16px, text đầy đủ không tràn. Ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build/typecheck PASS; dist index-Cxv_mB3u.js.
- 2026-10-06: Theo yêu cầu, làm mảnh chữ trên6 nút (Arial weight600→500) và thu chiều cao thêm20px viewport; CSS thiết kế đổi calc(100%-30px)→calc(100%-56px), chiều ngang/cỡ chữ giữ nguyên. Browser QA xác nhận6 ô đều135×62px, font16px weight500, nhãn còn nguyên. Ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build/typecheck PASS; dist index-Cq2LHDPd.js.
- 2026-10-06: Theo yêu cầu, chuyển6 nút sang nền nâu gỗ phẳng #4b3322, viền mảnh nâu vàng #9c784e; bỏ gradient, shadow và hover brightness. Thu mỗi nút thêm16px ngang/12px dọc theo kích thước thiết kế (browser QA 123×36px), giữ font22px design/weight500. Build/typecheck PASS; browser QA xác nhận màu nền rgb(75,51,34), viền rgb(156,120,78), box-shadow none; labels đầy đủ. Ảnh outputs/ho-so-nguoi-khac-6-nut.png; dist index-BG8jSX9u.js.
- 2026-10-06: Theo yêu cầu, đổi nền nút sang #43220f và tăng viền nâu vàng #9c784e từ1px lên2px thiết kế. Browser QA xác nhận màu rgb(67,34,15), viền hiển thị1.6px theo scale, kích thước123×36px. Build/typecheck PASS; dist index-CskI7ZeN.js.

- 2026-10-06: Theo yêu cầu, đổi nền6 nút thao tác hồ sơ người khác sang #875026, giảm bo góc còn4px thiết kế, tăng viền nâu vàng lên3px #9c784e và nới mỗi nút thêm8px theo chiều ngang/dọc thiết kế (ô lưới để căn giữa). Browser QA xác nhận màu rgb(135,80,38), viền2.4px và bo góc3px theo scale hiện tại; cả6 nút đồng nhất, không đổi lưới hay hình học avatar. Ảnh outputs/ho-so-nguoi-khac-6-nut.png. Build PASS; dist index-DBFNZWlP.js.

- 2026-10-06: Theo mẫu b99a1e64-d36b-41e2-8824-05088d378d56, thay nhóm6 nút hồ sơ người khác bằng bộ7 asset mới:1 khung,6 icon. Tạo bản runtime tight-crop tại src/assets/profile/actions, loại alpha nhiễu dưới8/255; giữ tỷ lệ và nguồn gốc trong source.md. Căn3×2 với icon trái/chữ Cormorant phải, không sửa hình học avatar hay các màn khóa. Browser QA6 ảnh/icon tải đủ, cả6 nhãn không tràn, tâm2 hàng ở28.1%/69.5% chiều cao panel so với mẫu28.2%/70.2%; Xem thông tin/Quay lại hoạt động. Ảnh outputs/ho-so-nut-asset-moi.png. Typecheck/build PASS; dist index-CIu3iwLG.js. Mẫu chỉ đối chiếu, không import vào runtime; nguồn được giữ để tra lại.

- 2026-10-06: Tăng icon thao tác hồ sơ người khác từ30% lên32% vùng nội dung, đổi lề trái7%→9% để dịch phải; lề phải3%, gap1%. Chữ10→10.7cqw, tracking-0.025em để nhãn dài nằm gọn. Browser QA tại viewport hiện tại:icon39.2→42.79px (+9.15%), dịch phải3.04px; font15.19→16.26px (+7%),6 nhãn không tràn, Xem thông tin cách icon2.2px. Giữ hình học khung nút, avatar và panel. Typecheck/build PASS; dist index-93CaZUgw.js; ảnh outputs/ho-so-nut-asset-moi.png.
