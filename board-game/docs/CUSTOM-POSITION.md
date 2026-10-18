# Vị trí tùy chỉnh

- 2026-10-15: Click đặt quân vào vị trí không hợp lệ báo lỗi nhưng giữ nguyên lựa chọn quân trong khay, để người dùng chọn điểm khác mà không phải chọn lại.

- 2026-10-15: Chuột phải lên quân trên bàn xóa quân đó và tự chọn khay đúng bên/loại quân vừa lấy để đặt tiếp.

- 2026-10-15: Thanh tiện ích màn chỉnh thế không hiển thị nút Lưu thế cờ; giữ Tạo từ ảnh, Âm thanh và Toàn màn hình.

- 2026-10-14: Cân màu gỗ quân Đen theo quân Đỏ bằng gamma RGB riêng trong SVG filter, mask theo độ sáng giữ chữ tối. Cùng filter cho bàn/khay/drag/animation, không sửa geometry hoặc bản A. Thay cân màu brightness nhẹ trước đó ở render.

- 2026-10-14: Căn mặt tròn bên trong quân Đỏ sang phải khoảng2% chiều rộng bằng SVG displacement trong ChessPiece, giữ nguyên thân/viền ngoài và tọa độ quân. Áp dụng chung bàn/khay/drag; hiệu ứng kết thúc giữ filter mặt. Không thay file ảnh hoặc mốc A.

- 2026-10-14: Quân mở Đỏ/Đen dùng chung ChessPiece object-fill trong khung108×112, không offset riêng Đỏ4px. Cân tông gỗ Đen bằng pieceColorFilter brightness0.985/saturate1.015 dùng chung trong render/animation/nhận diện. Khay, bàn, quân kéo và ảnh chụp DOM đồng bộ theo component.

- 2026-10-13: Khay xếp thế bỏ nhãn Quân Đen/Quân Đỏ; mỗi màu dùng nhãn1/2/3/4/5/Q/W theo thứ tự Xe/Mã/Tượng/Sĩ/Tướng/Pháo/Tốt, trái sang phải rồi hàng sau. ↑ chọn khay Đen, ↓ chọn khay Đỏ và viền vàng; bấm vào khay chọn màu và giữ lựa chọn; rê chuột chỉ hover, không đổi màu đang chọn; khay đang chọn dùng nền nâu sáng, viền vàng/outline và glow chung để nổi bật. Bấm số trên quân hoặc phím1–5/Q/W chọn quân của khay đang chọn. Quân hết vẫn khóa; không bắt phím trong ô nhập/dialog.

- 2026-10-13: Vị trí tùy chỉnh: Xóa quân xóa toàn bộ quân thường, giữ Tướng đang có trên bàn và bỏ chọn quân. Không kiểm tra Tướng đối mặt trong thao tác bấm/kéo xếp thế; Đấu ngay và server vẫn báo lỗi, chặn thế Tướng đối mặt.

- 2026-10-13: Đấu ngay chuyển xuống dưới khay quân, gap10px, căn giữa chiều dọc cả cụm khay+nút; dùng ảnh nút đỏ/kiếm/hai rồng theo mẫu, bỏ nút giữa bàn trong trình chỉnh thế.

- 2026-10-13: Vị trí tùy chỉnh: đặt/di chuyển sai vị trí báo lỗi rồi bỏ chọn quân. Kéo trực tiếp từ khay hoặc từ bàn mà không cần bấm chọn; thả trong bàn đặt vào giao điểm gần nhất theo hướng bàn và luật hiện hành, thả quân trên bàn ra ngoài thì xóa; thả quân khay ngoài bàn không thêm quân. Pointer cancel không xóa; click sau kéo bị chặn. Chỉ áp dụng trình chỉnh thế.

- 2026-10-13: Bỏ nhãn hiện Đổi bên; khay quân desktop căn giữa chiều dọc vùng từ dưới hàng tiện ích đến mép dưới. Tạo bàn cờ từ ảnh chỉ hiện Đang trong quá trình phát triển, chưa mở chọn ảnh.

- 2026-10-13: Nút Lưu Vị trí tùy chỉnh dùng đĩa mềm vàng theo mẫu mới: thân vàng đặc bo nhẹ, khe trên có chốt vàng, ô dưới kín có thanh ngang lõm; không chữ, icon32px cùng cỡ tiện ích.

- Mở từ Chơi với máy (desktop/compact), screen `position`. Dùng lại Board/ChessPiece/PlayerCard; giữ geometry avatar bên mình, không có đối thủ, chat, người xem, đồng hồ/vòng xanh hoặc thao tác ván đấu.
- Khay quân bên phải desktop, cách bàn và mép trong khung ngoài 10px. Quân trong khay không có drop-shadow, quân trên bàn giữ nguyên. Hiện đủ 7 loại mỗi màu theo 5+2 ô, không cuộn riêng khay. Compact xếp theo chiều dọc, cuộn trang khi cần.
- Chỉ có Xóa quân (thùng rác, xóa tất cả quân trừ Tướng) và Cài lại (mũi tên khôi phục, trở về khai cuộc). Chọn quân trong khay rồi bấm giao điểm để đặt; bấm lại quân đã chọn để về di chuyển, chọn quân trên bàn rồi chọn đích. Chuột phải cũng xóa quân.
- Khi chỉnh thế, mỗi bên tối đa1 Tướng,2 Sĩ,2 Tượng,2 Mã,2 Xe,2 Pháo,5 Tốt. Quân hết số lượng bị làm mờ và khóa chọn trong khay; sau khi đặt quân cuối cùng, lựa chọn quân tự tắt. Đặt/di chuyển chỉ nhận vị trí có thể tới theo luật: Tướng trong cung; Sĩ đúng5 điểm cung; Tượng ở đúng7 giao điểm có thể tới bên phần sân mình; Tốt không lùi qua hàng xuất phát và chỉ đi ngang sau sông. Cho phép hai Tướng đối mặt khi xếp thế; chỉ báo lỗi và chặn khi Đấu ngay. Xóa quân vẫn cho phép tạo thế dang dở; Đấu ngay tiếp tục kiểm tra đủ Tướng, vị trí, chiếu và nước đi.
- Đổi bên Đỏ/Đen thay vị trí mã phòng; chọn cả phe người chơi/bên đi trước và hướng bàn. Header: Lưu (đĩa mềm), Tạo từ ảnh (ảnh), Âm thanh, Toàn màn hình. Không có Camera/Bạn bè.
- Nút Đấu ngay dùng ảnh đỏ/kiếm/hai rồng dưới khay quân, cách10px; căn giữa cả cụm khay+nút theo chiều dọc vùng dưới tiện ích. Không hiện nút trên bàn trong trình chỉnh thế.
- Lưu tải tệp FEN. Chức năng nhận diện ảnh hiện tạm ngưng trên UI; mã xử lý cục bộ được giữ để phát triển tiếp: người dùng chọn giao điểm trên trái/dưới phải, xác định Đỏ ở trên nếu bàn đảo; so khớp chữ/màu với bộ quân hiện tại. Chỉ hỗ trợ ảnh rõ cùng bộ quân/kiểu bàn, không nhận diện tổng quát mọi ảnh chụp cờ. Luôn trả về trình chỉnh sửa, không tự đấu. Giới hạn15MB/32MP, nhường event loop mỗi hàng.
- Đấu ngay kiểm tra giới hạn số quân, vị trí Tướng/Sĩ/Tượng/Tốt, hai Tướng đối mặt, chiếu bên chưa tới lượt và nước hợp lệ. Quy tắc đặt tại chỗ cũng được dùng ở server khi đọc FEN. Sau đó kiểm tra Pikafish và khởi tạo ván local từ FEN; cấp độ giữ từ màn máy. Không tạo phòng online.
- gameStore giữ `initialFen` riêng lịch sử; reset thường xóa FEN, chơi lại ván tùy chỉnh nạp lại thế gốc. Client gửi FEN cùng lịch sử UCI khi cần. Server đọc/kiểm tra FEN, chuẩn hóa, dựng lại từng nước rồi gọi `position fen ... moves ...`; không nhận FEN không hợp lệ hoặc chuỗi chèn lệnh. Các search/level/cancel giữ nguyên.
- Kiểm chứng2026-10-13: 27 test custom-position/position-editor/computer/Pikafish/isolation PASS; typecheck/build PASS, dist cập nhật; QA headless1280×720:14 nút quân, không scroll khay, gap10px. Nhận diện đúng32 quân/FEN khai cuộc từ ảnh chụp của game. Chưa xác nhận ảnh bộ quân khác.

- 2026-10-14: Thông báo lỗi/trạng thái trong trình chỉnh thế hiển thị tối đa3 giây rồi tự ẩn; thông báo mới khởi động lại timer.

- 2026-10-14: Công tắc Đi tiên riêng, mặc định Đen; đổi phe cầm quân chỉ đổi hướng/phe người chơi. FEN và kiểm tra thế theo công tắc Đi tiên.

- 2026-10-14: Công tắc Đi tiên: phải/nền đỏ chọn Đỏ, trái/nền trắng vàng chọn Đen; nhãn Đi tiên thêm khoảng cách8px với cụm Đỏ/công tắc/Đen.

- 2026-10-14: Mặc định công tắc là Đỏ đi tiên; nút ⇄ dịch lên2px để căn tâm trong vòng.

- 2026-10-14: Bỏ cụm user phía dưới bộ chọn bên; chữ Đi tiên20px. Compact bỏ hàng dành cho avatar.

- 2026-10-14: Gap Chọn bên–Đi tiên10px; Đỏ/Đen hàng Đi tiên20px, switch48×24/núm18px, khung224px. Hai lựa chọn phe người cầm và bên đi trước độc lập.
- 2026-10-14: Đấu ngay từ thế tùy chỉnh mở bàn thử riêng trong GamePage; Pikafish bật sẵn, có cụm lùi/reset/tiến và tắt máy. Không hiện mã phòng, lượt xem hoặc chat, và không ghi nhánh thử vào lịch sử ván.
- 2026-10-14: Trong cụm bàn thử từ thế tùy chỉnh, nút giữa hàng trên hiển thị số nước đã đi; Reset chuyển xuống dưới khung điều khiển. Điều này không đổi cụm replay đã lưu.
- 2026-10-14: Hoàn tác yêu cầu đưa reset xuống dưới; cụm bàn thử thế tùy chỉnh giữ Reset ở giữa hàng điều khiển như trước.
- 2026-10-14: Cụm bàn thử dùng ReplayControls chung với bộ asset 6c0cdab5 cắt riêng; giữ Reset giữa hàng và Pikafish, không dùng biển Máy Cơ bản.
- 2026-10-14: Cụm thử chung hiện số nước giữa hàng điều hướng; Reset ảnh mới chuyển sang cạnh Gợi ý ở hàng dưới.

- 2026-10-15: Quy tắc máy mới do người dùng chốt: mọi chức năng máy chỉ dẫn, hướng dẫn, gợi ý, phân tích nước đi và chơi với máy ngoài chế độ đấu máy10 cấp đều dùng Pikafish mạnh nhất (không chọn sai số/hạ sức mạnh), thời gian search700ms (0,7 giây). Riêng chế độ đấu máy10 cấp giữ nguyên cấu hình từng cấp, kể cả cấp10. Thay thế các cấu hình máy cơ bản hoặc thời gian search cũ trong phạm vi trên.700ms là thời gian engine tính, không phải tổng thời gian mạng/khởi động/diễn giải. Giữ hạn chế trợ giúp trong trận người thật; không tự bật engine cho biến thể chưa được hỗ trợ. Phiên này chỉ ghi quy tắc tài liệu, chưa áp dụng code.

- 2026-10-15: Gợi ý đấu máy/bàn thử Vị trí tùy chỉnh dùng usePikafishHint riêng, Pikafish level10/search700ms từ FEN hiện tại bên người chơi; chỉ chạy khi tới lượt người chơi, chặn online/demo/replay/Cờ Úp. Không ghi store, không chọn/đi quân, không đổi lượt/history/clock hoặc bật Máy đi. Board vẽ1 mũi tên xanh opacity0.82 qua tọa độ chung/flipped, pointer-events:none. Bấm lại hủy request cũ/tính lại; đổi board/lượt/phase/reset/undo/rời hủy và bỏ kết quả cũ. Clock tick không xóa gợi ý. Phân tích vẫn đang phát triển.

- 2026-10-15: Tên hiển thị máy Pikafish đổi thành Ông Hoàng toàn ứng dụng: thiết lập desktop/compact, tên đối thủ, trạng thái suy nghĩ/kết nối, tooltip Gợi ý và thông báo lỗi frontend/server. Mã engine pikafish, API/type/path/binary và giấy phép giữ nguyên. Chặn So tài nhận cả tên mới và tên cũ để tương thích; không đổi tên người chơi/bản ghi lịch sử đã lưu.

- 2026-10-15: Avatar máy dùng ảnh6626838d-3cae-4584-b222-c511ca546742 (Ông Hoàng), nguồn ở references/uploads, runtime ở computer-setup/ong-hoang-avatar.png. Dùng computerAvatar/getComputerAvatar chung trong PlayerCard, chat bàn chơi, Thế cờ, hồ sơ máy, Tin nhắn và chân dung thiết lập desktop. Ảnh được clip tròn trong khung hiện có; không đổi kích thước/vị trí avatar/khung. Hỗ trợ tên máy cũ Pikafish và Máy; không sửa dữ liệu lịch sử.

- 2026-10-15: Theo yêu cầu mới, avatar máy dùng chân dung GIỮA ảnhc876e59c-c77c-411e-a467-31b5f5b4df21. Runtime ong-hoang-avatar-v2.svg nhúng nguyên pixel nguồn, clip circle(cx1086,cy348,r288), viewBox79860 576576 bỏ vòng vàng nguồn, ngoài tròn trong suốt; không vẽ lại ảnh. Máy chỉ giữ avatar và tên Ông Hoàng: bỏ overlay khung/danh hiệu/sao, khung tên/ELO và trang trí kết quả trên PlayerCard; hồ sơ/chat bỏ khung/huy hiệu máy; thiết lập bỏ khung biển tên. Dùng helper chung cho mọi avatar máy, gồm tên cũ. Quyền sửa này chỉ cho ảnh/trang trí máy, avatar người thật vẫn khóa. Nguồn giữ references/uploads. Typecheck/build PASS; chưa browser QA.

- 2026-10-15: Đính chính avatar máyc876e59c: giữ100% hình GIỮA gồm vòng vàng/chi tiết gốc, chỉ tách khỏi hai hình bên và trim alpha trống (bbox x737,y0,698×694); SVGv3 nhúng nguyên pixel, không circle clip. Hiển thị object-contain trong kích thước avatar hiện có, không rounded/cắt ảnh máy. Khôi phục PlayerNameplate cho tên Ông Hoàng và khung biển tên ở thiết lập máy. Khung overlay/danh hiệu/sao/ELO riêng của máy vẫn bỏ như trước. Áp dụng đồng bộ bàn chơi/chat/thế/hồ sơ/Tin nhắn/thiết lập.

- 2026-10-15: Chốt căn máy: thẻ tên Ông Hoàng dùng cùng margin/translate/breakpoint với thẻ tên người chơi, giữ ngang hàng thay margin riêng mt2. Avatar máy phóng theo đường kính HIỂN THỊ của viền mặc định (156/128×0.896=1.092), giữ nguyên ảnh nguồn và ô anchor. AVATAR_FRAME_VISIBLE_SCALE dùng chung PlayerCard/chat/hồ sơ, không đổi avatar/khung người thật. Không thêm danh hiệu/sao/ELO lại cho máy. Typecheck/build PASS, chưa browser QA.

- 2026-10-15: Ván đấu máy thông thường (computerMatch, cả Cờ Tướng/Cờ Úp) không có Lưu ván/Ghim thế, mã phòng, lượt xem/panel người xem hoặc chat (desktop/compact). showRoomFeatures dùng chung; useChat disabled cả send/listener/scroll, useMatchSaving không ghi ván máy. Bàn thử tùy chỉnh/replay giữ chức năng riêng đã chốt; online/local hai người giữ UI phòng. Không sửa avatar, khung tên hoặc engine.

- 2026-10-15: Giảm tải sau báo kém mượt: thay SVGv3 nhúng cả sheet avatar3.023.811 byte/2172×724 bằng PNG crop đúng bbox698×694/1.117.868 byte; kiểm tra484.412 pixel ARGB giống nguồn100%, giữ toàn bộ hình/viền gốc. Runtime import ong-hoang-avatar-full.png, ảnh nguồn vẫn giữ. useReplayTrial.select useCallback theo state thực để Board memo không render lại do UI khác; regression giữ callback/moves khi rerender PASS. GamePage memo kiểm tra chiếu theo board/turn/phase; useGame bỏ kiểm tra chiếu dư chỉ để trả status rỗng khi playing, giữ status kết quả.16/16 test hint/trial/animation/computer PASS; typecheck/build PASS. Đã xem PNG xuất, chưa đo FPS trên browser, không khẳng định hết mọi khựng.

- 2026-10-15: Màn Chơi với máy dùng PlayerNameplate chung cho Ông Hoàng thay khung chữ CSS cũ, desktop/compact cùng thẻ tên width250px. Desktop giữ slot top171/h53/w330 và căn giữa; avatar/cấp/phe/hành vi giữ nguyên. Typecheck/build PASS, dist index-wVJBr8a_.js có width250; chưa browser QA.

- 2026-10-15: Vị trí tùy chỉnh: kéo lấy quân từ khay tự chọn khay bên đó và loại quân đó (chooseForDrag không toggle). PositionPalette đồng bộ activeSide theo piece. Thả hợp lệ giữ chọn nếu loại đó còn trong khay, hết số lượng bỏ chọn/khóa như trước. Kéo quân trên bàn ra ngoài trả khay thì chọn đúng bên/loại vừa lấy xuống. Hover/click/phím tắt, kiểm tra đặt sai và hủy kéo giữ quy tắc hiện tại.10/10 test editor gồm đổi khay/aria-pressed/giữ chọn/hết quân PASS; typecheck/build PASS, chưa browser QA.

- 2026-10-16: Đổi bên căn giữa dọc hàng Đỏ/Đen, bỏ offset lên2px; SVG hai mũi tên đối xứng thay glyph để tâm icon trùng tâm vòng.
- 2026-10-16: Theo yêu cầu bỏ Space trong Vị trí tùy chỉnh (Chơi với máy): chặn Space kích hoạt nút đang focus tại CustomPositionPage và GamePage positionTrial. Không chặn nhập dấu cách trong input/textarea/select/contenteditable; phím khác và Space chuyển chế độ replay giữ nguyên.
